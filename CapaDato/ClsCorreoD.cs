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
    public class ClsCorreoD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCCorreoD(ClsCorreo OCorreo)
        {
            bool CreateOCorreo = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCCorreo", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCCorreo", OCorreo.Correo);
                Cmd_D.Parameters.AddWithValue("prmCIdTipoCorreo", Convert.ToInt16(OCorreo.ObjTipoCorreo.IdTipoCorreo));
                Cmd_D.Parameters.AddWithValue("prmCIdPersona", Convert.ToInt16(OCorreo.ObjPersona.IdPersona));

                ObjConexion.Abrircon();
                int FilasCorreo = Cmd_D.ExecuteNonQuery();
                if (FilasCorreo > 0) CreateOCorreo = true;

                return CreateOCorreo;
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

        public List<ClsCorreo> FnRCorreoD(ClsCorreo OCorreoD)
        {
            ClsCorreo OCorreo = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRCorreo", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmRIdPersona", Convert.ToInt16(OCorreoD.ObjPersona.IdPersona));
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsCorreo> LstCorreo = new List<ClsCorreo>();
                while (Dr_D.Read())
                {
                    OCorreo = new ClsCorreo();
                    OCorreo.IdCorreo = Dr_D[0].ToString();//id_Correo
                    OCorreo.Correo = Dr_D[1].ToString();  //Correo
                    OCorreo.ObjTipoCorreo.IdTipoCorreo = Dr_D[2].ToString();//idTipoCorreo
                    OCorreo.ObjTipoCorreo.TipoCorreo = Dr_D[3].ToString();//Tipo de identificacion 
                    LstCorreo.Add(OCorreo);
                }
                return LstCorreo;
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

        public bool FnUCorreoD(ClsCorreo OCorreo)
        {
            bool UpdateCorreo = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUCorreo", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdCorreo", Convert.ToInt16(OCorreo.IdCorreo));
                Cmd_D.Parameters.AddWithValue("prmUCorreo", OCorreo.Correo);
                Cmd_D.Parameters.AddWithValue("prmUIdTipoCorreo", Convert.ToInt16(OCorreo.ObjTipoCorreo.IdTipoCorreo));

                ObjConexion.Abrircon();
                int FilasUCorreo = Cmd_D.ExecuteNonQuery();
                if (FilasUCorreo > 0) UpdateCorreo = true;

                return UpdateCorreo;
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

        public bool FnDCorreoD(ClsCorreo OCorreo)
        {
            bool DeleteCorreo = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDCorreo", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdCorreo", Convert.ToInt16(OCorreo.IdCorreo));

                ObjConexion.Abrircon();
                int FilasDCorreo = Cmd_D.ExecuteNonQuery();
                if (FilasDCorreo > 0) DeleteCorreo = true;

                return DeleteCorreo;
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

        public bool FnECorreoD(ClsCorreo OCorreo)
        {
            bool ExisteCorreo = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spECorreo", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdCorreo", Convert.ToInt16(OCorreo.IdCorreo));
                Cmd_D.Parameters.AddWithValue("prmECorreo", OCorreo.Correo);
                Cmd_D.Parameters.AddWithValue("prmEIdTipoCorreo", Convert.ToInt16(OCorreo.ObjTipoCorreo.IdTipoCorreo));
                Cmd_D.Parameters.AddWithValue("prmEIdPersona", Convert.ToInt16(OCorreo.ObjPersona.IdPersona));

                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteCorreo = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteCorreo;
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
