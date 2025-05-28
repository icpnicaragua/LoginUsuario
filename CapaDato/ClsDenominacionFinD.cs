using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;
using MySql.Data.MySqlClient;
using System.Data;

namespace CapaDato
{
    public class ClsDenominacionFinD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D;
        private MySqlCommand Cmd_D = null;

        public bool FnCUEDenominacionFinD(ClsDenominacionFinCaja ODenominacionFin)
        {
            bool CUEODenominacionFin = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCUEDenominacionFin", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCUEIdFinCaja", Convert.ToInt16(ODenominacionFin.ObjFinCaja.IdFinCaja));
                Cmd_D.Parameters.AddWithValue("prmCUEIdDenominacion", Convert.ToInt16(ODenominacionFin.ObjDenominacionCS.IdDenominacion));
                Cmd_D.Parameters.AddWithValue("prmCUECantidad", Convert.ToInt16(ODenominacionFin.Cantidad));
                ObjConexion.Abrircon();
                int FilasDenominacionFin = Cmd_D.ExecuteNonQuery();
                if (FilasDenominacionFin > 0) CUEODenominacionFin = true;
                return CUEODenominacionFin;
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
            finally
            {
                ObjConexion.Cerrarcon();
            }
        }

        public List<ClsDenominacionFinCaja> FnRDenominacionFinD(ClsDenominacionFinCaja ODenominacionFinD)
        {
            ClsDenominacionFinCaja ODenominacionFin = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRDenominacionFinCaja", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmRIdFinCaja", Convert.ToInt16(ODenominacionFinD.ObjFinCaja.IdFinCaja));
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsDenominacionFinCaja> LstDenominacionFin = new List<ClsDenominacionFinCaja>();
                while (Dr_D.Read())
                {
                    ODenominacionFin = new ClsDenominacionFinCaja();
                    ODenominacionFin.ObjDenominacionCS.IdDenominacion = Dr_D[0].ToString();
                    ODenominacionFin.ObjDenominacionCS.Cantidad = Dr_D[1].ToString();
                    ODenominacionFin.Cantidad = Dr_D[2].ToString();
                    ODenominacionFin.Estado = Dr_D[3].ToString();
                    LstDenominacionFin.Add(ODenominacionFin);
                }
                return LstDenominacionFin;
            }
            catch (Exception ex)
            {
                return null;
                throw ex;
            }
            finally
            {
                ObjConexion.Cerrarcon();
            }
        }

        public bool FnCerrarDenominacionFinD(ClsDenominacionFinCaja ODenominacionFin)
        {
            bool CERRARDenominacionFin = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCloseDenominacionFin", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCloseIdFinCaja", Convert.ToInt16(ODenominacionFin.ObjFinCaja.IdFinCaja));
                ObjConexion.Abrircon();
                int FilasDenominacionFin = Cmd_D.ExecuteNonQuery();
                if (FilasDenominacionFin > 0) CERRARDenominacionFin = true;
                return CERRARDenominacionFin;
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
            finally
            {
                ObjConexion.Cerrarcon();
            }
        }
    }
}
