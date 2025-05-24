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
    public class ClsInyeccionD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; 
        private MySqlCommand Cmd_D = null;

        public bool FnCInyeccionD(ClsInyeccion OInyeccion)
        {
            bool CreateOInyeccion = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCInyeccion", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCIdInicioCaja", Convert.ToInt16( OInyeccion.ObjInicioCaja.IdInicioCaja));
                Cmd_D.Parameters.AddWithValue("prmCIdCajero", Convert.ToInt16(OInyeccion.ObjCajero.IdEmpleado));
                Cmd_D.Parameters.AddWithValue("prmCCantidad", Convert.ToDecimal(OInyeccion.Cantidad));
                Cmd_D.Parameters.AddWithValue("prmCIdRealizado", Convert.ToInt16(OInyeccion.ObjRealizadoPor.IdEmpleado));
                Cmd_D.Parameters.AddWithValue("prmCNota", OInyeccion.Nota);
                Cmd_D.Parameters.AddWithValue("prmCHora", Convert.ToDateTime(OInyeccion.Hora));
                ObjConexion.Abrircon();
                int FilasInyeccion = Cmd_D.ExecuteNonQuery();
                if (FilasInyeccion > 0) CreateOInyeccion = true;

                return CreateOInyeccion;
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

        public List<ClsInyeccion> FnRInyeccionD()
        {
            ClsInyeccion OInyeccion = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRInyeccion", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsInyeccion> LstInyeccion = new List<ClsInyeccion>();
                while (Dr_D.Read())
                {
                    OInyeccion = new ClsInyeccion();
                    OInyeccion.IdInyeccion = Dr_D[0].ToString();
                    OInyeccion.ObjCajero.ObjPersona.Nombre1 = Dr_D[1].ToString();  
                    OInyeccion.ObjCajero.ObjPersona.Apellido1 = Dr_D[2].ToString();  
                    OInyeccion.Cantidad = Dr_D[3].ToString();
                    OInyeccion.ObjRealizadoPor.ObjPersona.Nombre1 = Dr_D[4].ToString();
                    OInyeccion.ObjRealizadoPor.ObjPersona.Apellido1 = Dr_D[5].ToString();
                    OInyeccion.Nota = Dr_D[6].ToString();
                    OInyeccion.Hora = Dr_D[7].ToString();
                    OInyeccion.ObjInicioCaja.Fecha = ClsCortarFechasD.getFecha(Dr_D[8].ToString());
                    LstInyeccion.Add(OInyeccion);
                }
                return LstInyeccion;
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

        public bool FnUInyeccionD(ClsInyeccion OInyeccion)
        {
            bool UpdateInyeccion = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUInyeccion", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdInyeccion", Convert.ToInt16(OInyeccion.IdInyeccion));
                Cmd_D.Parameters.AddWithValue("prmUIdCajero", Convert.ToInt16( OInyeccion.ObjCajero.IdEmpleado));
                Cmd_D.Parameters.AddWithValue("prmUCantidad", Convert.ToDecimal(OInyeccion.Cantidad));
                Cmd_D.Parameters.AddWithValue("prmUIdRealizado", Convert.ToInt16(OInyeccion.ObjRealizadoPor.IdEmpleado));
                Cmd_D.Parameters.AddWithValue("prmUNota", Convert.ToInt16(OInyeccion.Nota));

                ObjConexion.Abrircon();
                int FilasUInyeccion = Cmd_D.ExecuteNonQuery();
                if (FilasUInyeccion > 0) UpdateInyeccion = true;

                return UpdateInyeccion;
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

        public bool FnDInyeccionD(ClsInyeccion OInyeccion)
        {
            bool DeleteInyeccion = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDInyeccion", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdInyeccion", Convert.ToInt16(OInyeccion.IdInyeccion));

                ObjConexion.Abrircon();
                int FilasDInyeccion = Cmd_D.ExecuteNonQuery();
                if (FilasDInyeccion > 0) DeleteInyeccion = true;

                return DeleteInyeccion;
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

        public List<ClsInyeccion> FnRInyeccionICD(ClsInyeccion OInyeccionD)
        {
            ClsInyeccion OInyeccion = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRInyeccionIC", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmRIdInicioCajaIC", Convert.ToInt16(OInyeccionD.IdInyeccion));
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsInyeccion> LstInyeccion = new List<ClsInyeccion>();
                while (Dr_D.Read())
                {
                    OInyeccion = new ClsInyeccion();
                    OInyeccion.IdInyeccion = Dr_D[0].ToString();
                    OInyeccion.ObjCajero.ObjPersona.Nombre1 = Dr_D[1].ToString();
                    OInyeccion.ObjCajero.ObjPersona.Apellido1 = Dr_D[2].ToString();
                    OInyeccion.Cantidad = Dr_D[3].ToString();
                    OInyeccion.ObjRealizadoPor.ObjPersona.Nombre1 = Dr_D[4].ToString();
                    OInyeccion.ObjRealizadoPor.ObjPersona.Apellido1 = Dr_D[5].ToString();
                    OInyeccion.Nota = Dr_D[6].ToString();
                    OInyeccion.Hora = Dr_D[7].ToString();
                    OInyeccion.ObjInicioCaja.Fecha = ClsCortarFechasD.getFecha(Dr_D[8].ToString());
                    LstInyeccion.Add(OInyeccion);
                }
                return LstInyeccion;
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
