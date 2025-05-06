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
    public class ClsIdentificacionD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCIdentificacionD(ClsIdentificacion OIdentificacion)
        {
            bool CreateOIdentificacion = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCIdentificacion", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCIdentificacion", OIdentificacion.Identificacion);
                Cmd_D.Parameters.AddWithValue("prmCIdTipoIdentificacion", Convert.ToInt16(OIdentificacion.ObjTipoIdentificacion.IdTipoIdentificacion));
                Cmd_D.Parameters.AddWithValue("prmCIdPersona", Convert.ToInt16(OIdentificacion.ObjPersona.IdPersona));

                ObjConexion.Abrircon();
                int FilasIdentificacion = Cmd_D.ExecuteNonQuery();
                if (FilasIdentificacion > 0) CreateOIdentificacion = true;

                return CreateOIdentificacion;
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

        public List<ClsIdentificacion> FnRIdentificacionD(ClsIdentificacion OIdentificacionD)
        {
            ClsIdentificacion OIdentificacion = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRIdentificacion", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmRIdPersona", Convert.ToInt16(OIdentificacionD.ObjPersona.IdPersona));
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsIdentificacion> LstIdentificacion = new List<ClsIdentificacion>();
                while (Dr_D.Read())
                {
                    OIdentificacion = new ClsIdentificacion();
                    OIdentificacion.IdIdentificacion = Dr_D[0].ToString();//id_Identificacion
                    OIdentificacion.Identificacion = Dr_D[1].ToString();  //Identificacion
                    OIdentificacion.ObjTipoIdentificacion.IdTipoIdentificacion = Dr_D[2].ToString();//idTipoIdentificacion
                    OIdentificacion.ObjTipoIdentificacion.TipoIdentificacion = Dr_D[3].ToString();//Tipo de identificacion 
                    LstIdentificacion.Add(OIdentificacion);
                }
                return LstIdentificacion;
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

        public bool FnUIdentificacionD(ClsIdentificacion OIdentificacion)
        {
            bool UpdateIdentificacion = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUIdentificacion", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdIdentificacion", Convert.ToInt16(OIdentificacion.IdIdentificacion));
                Cmd_D.Parameters.AddWithValue("prmUIdentificacion", OIdentificacion.Identificacion);
                Cmd_D.Parameters.AddWithValue("prmUIdTipoIdentificacion", Convert.ToInt16(OIdentificacion.ObjTipoIdentificacion.IdTipoIdentificacion));

                ObjConexion.Abrircon();
                int FilasUIdentificacion = Cmd_D.ExecuteNonQuery();
                if (FilasUIdentificacion > 0) UpdateIdentificacion = true;

                return UpdateIdentificacion;
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

        public bool FnDIdentificacionD(ClsIdentificacion OIdentificacion)
        {
            bool DeleteIdentificacion = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDIdentificacion", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdIdentificacion", Convert.ToInt16(OIdentificacion.IdIdentificacion));

                ObjConexion.Abrircon();
                int FilasDIdentificacion = Cmd_D.ExecuteNonQuery();
                if (FilasDIdentificacion > 0) DeleteIdentificacion = true;

                return DeleteIdentificacion;
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

        public bool FnEIdentificacionD(ClsIdentificacion OIdentificacion)
        {
            bool ExisteIdentificacion = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spEIdentificacion", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdIdentificacion", Convert.ToInt16(OIdentificacion.IdIdentificacion));
                Cmd_D.Parameters.AddWithValue("prmEIdentificacion", OIdentificacion.Identificacion);
                Cmd_D.Parameters.AddWithValue("prmEIdTipoIdentificacion", Convert.ToInt16(OIdentificacion.ObjTipoIdentificacion.IdTipoIdentificacion));

                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteIdentificacion = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteIdentificacion;
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
    }
}
