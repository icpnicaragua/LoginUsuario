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
    public class ClsBancoD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCBancoD(ClsBanco OBanco)
        {
            bool CreateOBanco = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCBanco", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCBanco", OBanco.Banco);

                ObjConexion.Abrircon();
                int FilasCRegime = Cmd_D.ExecuteNonQuery();
                if (FilasCRegime > 0) CreateOBanco = true;

                return CreateOBanco;
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

        public List<ClsBanco> FnRBancoD()
        {
            ClsBanco OBanco = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRBanco", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsBanco> LstBanco = new List<ClsBanco>();
                while (Dr_D.Read())
                {
                    OBanco = new ClsBanco();
                    OBanco.IdBanco = Dr_D[0].ToString();//id_Banco
                    OBanco.Banco = Dr_D[1].ToString();  //Banco     
                    LstBanco.Add(OBanco);
                }
                return LstBanco;
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

        public bool FnUBancoD(ClsBanco OBanco)
        {
            bool UpdateBanco = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUBanco", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdBanco", Convert.ToInt16(OBanco.IdBanco));
                Cmd_D.Parameters.AddWithValue("prmUBanco", OBanco.Banco);

                ObjConexion.Abrircon();
                int FilasUBanco = Cmd_D.ExecuteNonQuery();
                if (FilasUBanco > 0) UpdateBanco = true;

                return UpdateBanco;
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

        public bool FnDBancoD(ClsBanco OBanco)
        {
            bool DeleteBanco = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDBanco", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdBanco", Convert.ToInt16(OBanco.IdBanco));

                ObjConexion.Abrircon();
                int FilasDBanco = Cmd_D.ExecuteNonQuery();
                if (FilasDBanco > 0) DeleteBanco = true;

                return DeleteBanco;
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

        public bool FnEBancoD(ClsBanco OBanco)
        {
            bool ExisteBanco = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spEBanco", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdBanco", Convert.ToInt16(OBanco.IdBanco));
                Cmd_D.Parameters.AddWithValue("prmEBanco", OBanco.Banco);
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteBanco = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteBanco;
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
