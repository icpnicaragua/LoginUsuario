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
    public class ClsFamiliaD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCFamiliaD(ClsFamilia OFamilia)
        {
            bool CreateOFamilia = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCFamilia", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCFamilia", OFamilia.Familia);

                ObjConexion.Abrircon();
                int FilasCRegime = Cmd_D.ExecuteNonQuery();
                if (FilasCRegime > 0) CreateOFamilia = true;

                return CreateOFamilia;
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

        public List<ClsFamilia> FnRFamiliaD()
        {
            ClsFamilia OFamilia = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRFamilia", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsFamilia> LstFamilia = new List<ClsFamilia>();
                while (Dr_D.Read())
                {
                    OFamilia = new ClsFamilia();
                    OFamilia.IdFamilia = Dr_D[0].ToString();//id_Familia
                    OFamilia.Familia = Dr_D[1].ToString();  //Familia     
                    LstFamilia.Add(OFamilia);
                }
                return LstFamilia;
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

        public bool FnUFamiliaD(ClsFamilia OFamilia)
        {
            bool UpdateFamilia = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUFamilia", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdFamilia", Convert.ToInt16(OFamilia.IdFamilia));
                Cmd_D.Parameters.AddWithValue("prmUFamilia", OFamilia.Familia);

                ObjConexion.Abrircon();
                int FilasUFamilia = Cmd_D.ExecuteNonQuery();
                if (FilasUFamilia > 0) UpdateFamilia = true;

                return UpdateFamilia;
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

        public bool FnDFamiliaD(ClsFamilia OFamilia)
        {
            bool DeleteFamilia = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDFamilia", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdFamilia", Convert.ToInt16(OFamilia.IdFamilia));

                ObjConexion.Abrircon();
                int FilasDFamilia = Cmd_D.ExecuteNonQuery();
                if (FilasDFamilia > 0) DeleteFamilia = true;

                return DeleteFamilia;
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

        public bool FnEFamiliaD(ClsFamilia OFamilia)
        {
            bool ExisteFamilia = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spEFamilia", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdFamilia", Convert.ToInt16(OFamilia.IdFamilia));
                Cmd_D.Parameters.AddWithValue("prmEFamilia", OFamilia.Familia);
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteFamilia = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteFamilia;
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
