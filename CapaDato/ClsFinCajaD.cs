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
    public class ClsFinCajaD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D;
        private MySqlCommand Cmd_D = null;

        public bool FnCFinCajaD(ClsFinCaja OFinCaja)
        {
            bool CreateOFinCaja = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCFinCaja", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCIdCajero",Convert.ToInt16( OFinCaja.ObjCajero.IdEmpleado));
                Cmd_D.Parameters.AddWithValue("prmCIdInicioCaja", Convert.ToInt16(OFinCaja.ObjInicioCaja.IdInicioCaja));
                ObjConexion.Abrircon();
                int FilasFinCaja = Cmd_D.ExecuteNonQuery();
                if (FilasFinCaja > 0) CreateOFinCaja = true;

                return CreateOFinCaja;
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

        public List<ClsFinCaja> FnRFinCajaD()
        {
            ClsFinCaja OFinCaja = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRFinCaja", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsFinCaja> LstFinCaja = new List<ClsFinCaja>();
                while (Dr_D.Read())
                {
                    OFinCaja = new ClsFinCaja();
                    OFinCaja.IdFinCaja = Dr_D[0].ToString();
                    OFinCaja.ObjCajero.ObjPersona.Nombre1 = Dr_D[1].ToString();
                    OFinCaja.ObjCajero.ObjPersona.Apellido1 = Dr_D[2].ToString();
                    OFinCaja.Fecha = Dr_D[3].ToString();
                    OFinCaja.Hora = Dr_D[4].ToString();
                    OFinCaja.Estado = Dr_D[5].ToString();
                    LstFinCaja.Add(OFinCaja);
                }
                return LstFinCaja;
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

        public bool FnUFinCajaD(ClsFinCaja OFinCaja)
        {
            bool UpdateFinCaja = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUFinCaja", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdFinCaja", Convert.ToInt16(OFinCaja.IdFinCaja));
                Cmd_D.Parameters.AddWithValue("prmUIdCajero", Convert.ToInt16(OFinCaja.ObjCajero.IdEmpleado));

                ObjConexion.Abrircon();
                int FilasUFinCaja = Cmd_D.ExecuteNonQuery();
                if (FilasUFinCaja > 0) UpdateFinCaja = true;

                return UpdateFinCaja;
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

        public bool FnDFinCajaD(ClsFinCaja OFinCaja)
        {
            bool DeleteFinCaja = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDFinCaja", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdFinCaja", Convert.ToInt16(OFinCaja.IdFinCaja));

                ObjConexion.Abrircon();
                int FilasDFinCaja = Cmd_D.ExecuteNonQuery();
                if (FilasDFinCaja > 0) DeleteFinCaja = true;

                return DeleteFinCaja;
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

        public bool FnOFinCajaD(ClsFinCaja OFinCaja)
        {
            bool OpenFinCaja = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spOpenFinCaja", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmOIdFinCaja", Convert.ToInt16(OFinCaja.IdFinCaja));
                Cmd_D.Parameters.AddWithValue("prmOFecha", Convert.ToDateTime(OFinCaja.Fecha));
                Cmd_D.Parameters.AddWithValue("prmOHora", Convert.ToDateTime(OFinCaja.Hora));

                ObjConexion.Abrircon();
                int FilasOFinCaja = Cmd_D.ExecuteNonQuery();
                if (FilasOFinCaja > 0) OpenFinCaja = true;

                return OpenFinCaja;
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
