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
    public class ClsGastoD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D;
        private MySqlCommand Cmd_D = null;

        public bool FnCGastoD(ClsGastos OGasto)
        {
            bool CreateOGasto = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCGasto", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                DateTime dateValue = DateTime.Parse(OGasto.Fecha);
                Cmd_D.Parameters.AddWithValue("prmCFecha",Convert.ToDateTime(dateValue));
                Cmd_D.Parameters.AddWithValue("prmCSerie", (OGasto.Serie));
                Cmd_D.Parameters.AddWithValue("prmCDocumento", (OGasto.Documento));
                Cmd_D.Parameters.AddWithValue("prmCCantidad", Convert.ToDecimal(OGasto.Cantidad));          
                Cmd_D.Parameters.AddWithValue("prmCIdTipoGasto", Convert.ToInt16(OGasto.ObjTipoGasto.IdTipoGasto));
                Cmd_D.Parameters.AddWithValue("prmCDescripcion", (OGasto.Descripcion));
                Cmd_D.Parameters.AddWithValue("prmCGC",Convert.ToInt16 (OGasto.GastoCaja));
                Cmd_D.Parameters.AddWithValue("prmCIdAutorizado", Convert.ToInt16 (OGasto.ObjAutorizadopor.IdEmpleado));
                Cmd_D.Parameters.AddWithValue("prmCHora", Convert.ToDateTime (OGasto.Hora));
                Cmd_D.Parameters.AddWithValue("prmCIdInicioCaja", Convert.ToInt16 (OGasto.ObjInicioCaja.IdInicioCaja));
                ObjConexion.Abrircon();
                int FilasGasto = Cmd_D.ExecuteNonQuery();
                if (FilasGasto > 0) CreateOGasto = true;
                return CreateOGasto;
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

        public List<ClsGastos> FnRGastoD()
        {
            ClsGastos OGasto = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRGasto", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsGastos> LstGasto = new List<ClsGastos>();
                while (Dr_D.Read())
                {
                    OGasto = new ClsGastos();
                    OGasto.IdGasto = Dr_D[0].ToString();
                    OGasto.Fecha = ClsCortarFechasD.getFecha( Dr_D[1].ToString());
                    OGasto.Hora = Dr_D[2].ToString();
                    OGasto.Serie = Dr_D[3].ToString();
                    OGasto.Documento= Dr_D[4].ToString();
                    OGasto.Cantidad = Dr_D[5].ToString();
                    OGasto.ObjTipoGasto.TipoGasto = Dr_D[6].ToString();
                    OGasto.Descripcion = Dr_D[7].ToString();
                    OGasto.GastoCaja = Dr_D[8].ToString();
                    OGasto.ObjAutorizadopor.ObjPersona.Nombre1 = Dr_D[9].ToString();
                    OGasto.ObjAutorizadopor.ObjPersona.Apellido1 = Dr_D[10].ToString();
                    OGasto.Estado = Dr_D[11].ToString();
               
                    LstGasto.Add(OGasto);
                }
                return LstGasto;
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

        public bool FnUGastoD(ClsGastos OGasto)
        {
            bool UpdateGasto = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUGasto", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdGasto", Convert.ToInt16(OGasto.IdGasto));
                Cmd_D.Parameters.AddWithValue("prmUSerie", OGasto.Serie);
                Cmd_D.Parameters.AddWithValue("prmUDocumento", OGasto.Documento);
                Cmd_D.Parameters.AddWithValue("prmUCantidad",Convert.ToDecimal( OGasto.Cantidad));
                Cmd_D.Parameters.AddWithValue("prmUIdTipoGasto", Convert.ToInt16(OGasto.ObjTipoGasto.IdTipoGasto));
                Cmd_D.Parameters.AddWithValue("prmUDescripcion", OGasto.Descripcion);
                Cmd_D.Parameters.AddWithValue("prmUGC",Convert.ToInt16( OGasto.GastoCaja));
                Cmd_D.Parameters.AddWithValue("prmUIdAutorizado", OGasto.ObjAutorizadopor.IdEmpleado);

                ObjConexion.Abrircon();
                int FilasUGasto = Cmd_D.ExecuteNonQuery();
                if (FilasUGasto > 0) UpdateGasto = true;

                return UpdateGasto;
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

        public bool FnDGastoD(ClsGastos OGasto)
        {
            bool DeleteGasto = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDGasto", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdGasto", Convert.ToInt16(OGasto.IdGasto));

                ObjConexion.Abrircon();
                int FilasDGasto = Cmd_D.ExecuteNonQuery();
                if (FilasDGasto > 0) DeleteGasto = true;

                return DeleteGasto;
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

        public bool FnEGastoD(ClsGastos OGasto)
        {
            bool ExisteGasto = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spEGasto", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdGasto", Convert.ToInt16(OGasto.IdGasto));
                Cmd_D.Parameters.AddWithValue("prmESerie", OGasto.Serie);
                Cmd_D.Parameters.AddWithValue("prmEDocumento", OGasto.Documento);
                Cmd_D.Parameters.AddWithValue("prmECantidad", Convert.ToDecimal(OGasto.Cantidad));

                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteGasto = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteGasto;
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

        public List<ClsGastos> FnRGastoICD(ClsGastos OGastoD)
        {
            ClsGastos OGasto = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRGastoIC", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmRIdInicioCajaIC", Convert.ToInt16(OGastoD.ObjInicioCaja.IdInicioCaja));
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsGastos> LstGasto = new List<ClsGastos>();
                while (Dr_D.Read())
                {
                    OGasto = new ClsGastos();
                    OGasto.IdGasto = Dr_D[0].ToString();
                    OGasto.Fecha = ClsCortarFechasD.getFecha(Dr_D[1].ToString());
                    OGasto.Hora = Dr_D[2].ToString();
                    OGasto.Serie = Dr_D[3].ToString();
                    OGasto.Documento = Dr_D[4].ToString();
                    OGasto.Cantidad = Dr_D[5].ToString();
                    OGasto.ObjTipoGasto.TipoGasto = Dr_D[6].ToString();
                    OGasto.Descripcion = Dr_D[7].ToString();
                    OGasto.GastoCaja = Dr_D[8].ToString();
                    OGasto.ObjAutorizadopor.ObjPersona.Nombre1 = Dr_D[9].ToString();
                    OGasto.ObjAutorizadopor.ObjPersona.Apellido1 = Dr_D[10].ToString();
                    OGasto.Estado = Dr_D[11].ToString();

                    LstGasto.Add(OGasto);
                }
                return LstGasto;
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
