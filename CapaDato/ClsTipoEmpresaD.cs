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
    public class ClsTipoEmpresaD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCTipoEmpresaD(ClsTipoEmpresa OTipoEmpresa)
        {
            bool CreateOTipoEmpresa = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCTipoEmpresa", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCTipoEmpresa", OTipoEmpresa.TipoEmpresa);

                ObjConexion.Abrircon();
                int FilasCRegime = Cmd_D.ExecuteNonQuery();
                if (FilasCRegime > 0) CreateOTipoEmpresa = true;

                return CreateOTipoEmpresa;
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

        public List<ClsTipoEmpresa> FnRTipoEmpresaD()
        {
            ClsTipoEmpresa OTipoEmpresa = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRTipoEmpresa", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsTipoEmpresa> LstTipoEmpresa = new List<ClsTipoEmpresa>();
                while (Dr_D.Read())
                {
                    OTipoEmpresa = new ClsTipoEmpresa();
                    OTipoEmpresa.IdTipoEmpresa = Dr_D[0].ToString();//id_TipoEmpresa
                    OTipoEmpresa.TipoEmpresa = Dr_D[1].ToString();  //TipoEmpresa     
                    LstTipoEmpresa.Add(OTipoEmpresa);
                }
                return LstTipoEmpresa;
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

        public bool FnUTipoEmpresaD(ClsTipoEmpresa OTipoEmpresa)
        {
            bool UpdateTipoEmpresa = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUTipoEmpresa", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdTipoEmpresa", Convert.ToInt16(OTipoEmpresa.IdTipoEmpresa));
                Cmd_D.Parameters.AddWithValue("prmUTipoEmpresa", OTipoEmpresa.TipoEmpresa);

                ObjConexion.Abrircon();
                int FilasUTipoEmpresa = Cmd_D.ExecuteNonQuery();
                if (FilasUTipoEmpresa > 0) UpdateTipoEmpresa = true;

                return UpdateTipoEmpresa;
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

        public bool FnDTipoEmpresaD(ClsTipoEmpresa OTipoEmpresa)
        {
            bool DeleteTipoEmpresa = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDTipoEmpresa", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdTipoEmpresa", Convert.ToInt16(OTipoEmpresa.IdTipoEmpresa));

                ObjConexion.Abrircon();
                int FilasDTipoEmpresa = Cmd_D.ExecuteNonQuery();
                if (FilasDTipoEmpresa > 0) DeleteTipoEmpresa = true;

                return DeleteTipoEmpresa;
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

        public bool FnETipoEmpresaD(ClsTipoEmpresa OTipoEmpresa)
        {
            bool ExisteTipoEmpresa = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spETipoEmpresa", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdTipoEmpresa", Convert.ToInt16(OTipoEmpresa.IdTipoEmpresa));
                Cmd_D.Parameters.AddWithValue("prmETipoEmpresa", OTipoEmpresa.TipoEmpresa);
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteTipoEmpresa = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteTipoEmpresa;
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
