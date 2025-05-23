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
    public class ClsDenominacionInicioD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D;
        private MySqlCommand Cmd_D = null;

        public bool FnCUEDenominacionInicioD(ClsDenominacionInicio ODenominacionInicio)
        {
            bool CUEODenominacionInicio = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCUEDenominacionInicio", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCUEIdInicioCaja", Convert.ToInt16(ODenominacionInicio.ObjInicioCaja.IdInicioCaja));
                Cmd_D.Parameters.AddWithValue("prmCUEIdDenominacion", Convert.ToInt16(ODenominacionInicio.ObjDenominacionCS.IdDenominacion));
                Cmd_D.Parameters.AddWithValue("prmCUECantidad", Convert.ToInt16(ODenominacionInicio.Cantidad));
                ObjConexion.Abrircon();
                int FilasDenominacionInicio = Cmd_D.ExecuteNonQuery();
                if (FilasDenominacionInicio > 0) CUEODenominacionInicio = true;
                return CUEODenominacionInicio;
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

        public List<ClsDenominacionInicio> FnRDenominacionInicioD(ClsDenominacionInicio ODenominacionInicioD)
        {
            ClsDenominacionInicio ODenominacionInicio = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRDenominacionInicio", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmRIdInicioCaja", Convert.ToInt16(ODenominacionInicioD.ObjInicioCaja.IdInicioCaja));
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsDenominacionInicio> LstDenominacionInicio = new List<ClsDenominacionInicio>();
                while (Dr_D.Read())
                {
                    ODenominacionInicio = new ClsDenominacionInicio();
                    ODenominacionInicio.ObjDenominacionCS.IdDenominacion = Dr_D[0].ToString();
                    ODenominacionInicio.ObjDenominacionCS.Cantidad = Dr_D[1].ToString();
                    ODenominacionInicio.Cantidad = Dr_D[2].ToString();
                    ODenominacionInicio.Estado = Dr_D[3].ToString();
                    LstDenominacionInicio.Add(ODenominacionInicio);
                }
                return LstDenominacionInicio;
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

        public bool FnCerrarDenominacionInicioD(ClsDenominacionInicio ODenominacionInicio)
        {
            bool CERRARDenominacionInicio = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCloseDenominacionInicio", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCloseIDInicioCaja", Convert.ToInt16(ODenominacionInicio.ObjInicioCaja.IdInicioCaja));
                ObjConexion.Abrircon();
                int FilasDenominacionInicio = Cmd_D.ExecuteNonQuery();
                if (FilasDenominacionInicio > 0) CERRARDenominacionInicio = true;
                return CERRARDenominacionInicio;
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
