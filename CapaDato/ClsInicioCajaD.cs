using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;
using MySql.Data.MySqlClient;
using System.Data;
using Mysqlx.Crud;


namespace CapaDato
{
    public class ClsInicioCajaD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; 
        private MySqlCommand Cmd_D = null; 

        public bool FnCInicioCajaD(ClsInicioCaja OInicioCaja)
        {
            bool CreateOInicioCaja = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCInicioCaja", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                DateTime dateValue = DateTime.Parse(OInicioCaja.Fecha);
                Cmd_D.Parameters.AddWithValue("prmCFecha", Convert.ToDateTime(dateValue));
                Cmd_D.Parameters.AddWithValue("prmCHora", Convert.ToDateTime(OInicioCaja.Hora));
             
                Cmd_D.Parameters.AddWithValue("prmCIdCajero", Convert.ToInt16(OInicioCaja.ObjCajero.IdEmpleado));
                ObjConexion.Abrircon();
                int FilasInicioCaja = Cmd_D.ExecuteNonQuery();
                if (FilasInicioCaja > 0) CreateOInicioCaja = true;

                return CreateOInicioCaja;
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

        public List<ClsInicioCaja> FnRInicioCajaD()
        {
            ClsInicioCaja OInicioCaja = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRInicioCaja", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsInicioCaja> LstInicioCaja = new List<ClsInicioCaja>();
                while (Dr_D.Read())
                {
                    OInicioCaja = new ClsInicioCaja();
                    OInicioCaja.IdInicioCaja = Dr_D[0].ToString();
                    OInicioCaja.ObjCajero.ObjPersona.Nombre1 = Dr_D[1].ToString();  
                    OInicioCaja.ObjCajero.ObjPersona.Apellido1 = Dr_D[2].ToString();
                    OInicioCaja.Fecha =ClsCortarFechasD.getFecha( Dr_D[3].ToString());
                    OInicioCaja.Hora = Dr_D[4].ToString();
                    OInicioCaja.Estado = Dr_D[5].ToString();
                    LstInicioCaja.Add(OInicioCaja);
                }
                return LstInicioCaja;
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

        public bool FnUInicioCajaD(ClsInicioCaja OInicioCaja)
        {
            bool UpdateInicioCaja = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUInicioCaja", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdInicioCaja", Convert.ToInt16(OInicioCaja.IdInicioCaja));
                Cmd_D.Parameters.AddWithValue("prmUIdCajero", Convert.ToInt16(OInicioCaja.ObjCajero.IdEmpleado));
                ObjConexion.Abrircon();
                int FilasUInicioCaja = Cmd_D.ExecuteNonQuery();
                if (FilasUInicioCaja > 0) UpdateInicioCaja = true;

                return UpdateInicioCaja;
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

        public bool FnDInicioCajaD(ClsInicioCaja OInicioCaja)
        {
            bool DeleteInicioCaja = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDInicioCaja", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdInicioCaja", Convert.ToInt16(OInicioCaja.IdInicioCaja));

                ObjConexion.Abrircon();
                int FilasDInicioCaja = Cmd_D.ExecuteNonQuery();
                if (FilasDInicioCaja > 0) DeleteInicioCaja = true;

                return DeleteInicioCaja;
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

        public bool FnEInicioCajaD(ClsInicioCaja OInicioCaja)
        {
            bool ExisteInicioCaja = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spEInicioCaja", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEFecha",Convert.ToDateTime (OInicioCaja.Fecha));
                Cmd_D.Parameters.AddWithValue("prmEIdInicioCaja", Convert.ToInt16 (OInicioCaja.IdInicioCaja));

                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteInicioCaja = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteInicioCaja;
            }
            catch (Exception ex)
            {
                return true;
                throw ex;
            }
            finally
            {
                ObjConexion.Cerrarcon();
            }
        }

        public ClsInicioCaja FnRInicioCajaEstadoD(ClsInicioCaja OInicioCajaD)
        {
            ClsInicioCaja OInicioCaja = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRInicioCajaEstado", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmRIdInicioCaja", Convert.ToInt16(OInicioCajaD.IdInicioCaja));
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();            
                while (Dr_D.Read())
                {
                    OInicioCaja = new ClsInicioCaja();
                    OInicioCaja.Estado = Dr_D[0].ToString();
                                  
                }
                return OInicioCaja;
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
    }
}
