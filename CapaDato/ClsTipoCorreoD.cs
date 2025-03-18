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
    public class ClsTipoCorreoD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCTipoCorreoD(ClsTipoCorreo OTipoCorreo)
        {
            bool CreateTipoCorreo = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCTipoCorreo", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmTipoCorreo", OTipoCorreo.TipoCorreo);

                ObjConexion.Abrircon();
                int FilasCTipoCorreo = Cmd_D.ExecuteNonQuery();
                if (FilasCTipoCorreo > 0) CreateTipoCorreo = true;

                return CreateTipoCorreo;
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

        public List<ClsTipoCorreo> FnRTipoCorreoD()
        {
            ClsTipoCorreo OTipoCorreo = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRTipoCorreo", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsTipoCorreo> LstTipoCorreo = new List<ClsTipoCorreo>();
                while (Dr_D.Read())
                {
                    OTipoCorreo = new ClsTipoCorreo();
                    OTipoCorreo.IdTipoCorreo = Dr_D[0].ToString();//id_tipoCorreo
                    OTipoCorreo.TipoCorreo = Dr_D[1].ToString();  //tipoCorreo     
                    LstTipoCorreo.Add(OTipoCorreo);
                }
                return LstTipoCorreo;
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

        public bool FnUTipoCorreoD(ClsTipoCorreo OTipoCorreo)
        {
            bool UpdateTipoCorreo = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUTipoCorreo", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdTipoCorreo", Convert.ToInt16(OTipoCorreo.IdTipoCorreo));
                Cmd_D.Parameters.AddWithValue("prmUTipoCorreo", OTipoCorreo.TipoCorreo);

                ObjConexion.Abrircon();
                int FilasUTipoCorreo = Cmd_D.ExecuteNonQuery();
                if (FilasUTipoCorreo > 0) UpdateTipoCorreo = true;

                return UpdateTipoCorreo;
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

        public bool FnDTipoCorreoD(ClsTipoCorreo OTipoCorreo)
        {
            bool DeleteTipoCorreo = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDTipoCorreo", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmIdTipoCorreo", Convert.ToInt16(OTipoCorreo.IdTipoCorreo));

                ObjConexion.Abrircon();
                int FilasDTipoCorreo = Cmd_D.ExecuteNonQuery();
                if (FilasDTipoCorreo > 0) DeleteTipoCorreo = true;

                return DeleteTipoCorreo;
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

        public bool FnETipoCorreoD(ClsTipoCorreo OTipoCorreo)
        {
            bool ExisteTipoCorreo = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spETipoCorreo", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdTipoCorreo", Convert.ToInt16(OTipoCorreo.IdTipoCorreo));
                Cmd_D.Parameters.AddWithValue("prmETipoCorreo", OTipoCorreo.TipoCorreo);
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteTipoCorreo = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteTipoCorreo;
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
