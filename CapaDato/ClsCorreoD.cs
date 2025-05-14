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

        #region RegCorreoPersona
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
        #endregion

        #region RegCorreoEmpresa
        public bool FnCCorreoEmpresaD(ClsCorreo OCorreoEmpresa)
        {
            bool CreateOCorreoEmpresa = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCCorreoEmpresa", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCCorreo", OCorreoEmpresa.Correo);
                Cmd_D.Parameters.AddWithValue("prmCIdTipoCorreo", Convert.ToInt16(OCorreoEmpresa.ObjTipoCorreo.IdTipoCorreo));
                Cmd_D.Parameters.AddWithValue("prmCIdEmpresa", Convert.ToInt16(OCorreoEmpresa.ObjEmpresa.IdEmpresa));

                ObjConexion.Abrircon();
                int FilasCorreoEmpresa = Cmd_D.ExecuteNonQuery();
                if (FilasCorreoEmpresa > 0) CreateOCorreoEmpresa = true;

                return CreateOCorreoEmpresa;
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
        public List<ClsCorreo> FnRCorreoEmpresaD(ClsCorreo OCorreoEmpresaD)
        {
            ClsCorreo OCorreoEmpresa = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRCorreoEmpresa", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmRIdEmpresa", Convert.ToInt16(OCorreoEmpresaD.ObjEmpresa.IdEmpresa));
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsCorreo> LstCorreoEmpresa = new List<ClsCorreo>();
                while (Dr_D.Read())
                {
                    OCorreoEmpresa = new ClsCorreo();
                    OCorreoEmpresa.IdCorreo = Dr_D[0].ToString();//id_Correo
                    OCorreoEmpresa.Correo = Dr_D[1].ToString();  //Correo
                    OCorreoEmpresa.ObjTipoCorreo.IdTipoCorreo = Dr_D[2].ToString();//idTipoCorreo
                    OCorreoEmpresa.ObjTipoCorreo.TipoCorreo = Dr_D[3].ToString();//Tipo de identificacion 
                    LstCorreoEmpresa.Add(OCorreoEmpresa);
                }
                return LstCorreoEmpresa;
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
        public bool FnECorreoEmpresaD(ClsCorreo OCorreoEmpresa)
        {
            bool ExisteCorreoEmpresa = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spECorreoEmpresa", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdCorreo", Convert.ToInt16(OCorreoEmpresa.IdCorreo));
                Cmd_D.Parameters.AddWithValue("prmECorreo", OCorreoEmpresa.Correo);
                Cmd_D.Parameters.AddWithValue("prmEIdTipoCorreo", Convert.ToInt16(OCorreoEmpresa.ObjTipoCorreo.IdTipoCorreo));
                Cmd_D.Parameters.AddWithValue("prmEIdEmpresa", Convert.ToInt16(OCorreoEmpresa.ObjEmpresa.IdEmpresa));

                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteCorreoEmpresa = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteCorreoEmpresa;
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

        #endregion
    }
}
