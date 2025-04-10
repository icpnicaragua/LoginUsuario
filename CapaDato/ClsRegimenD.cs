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
    public class ClsRegimenD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCRegimenD(ClsRegimen ORegimen)
        {
            bool CreateORegimen = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCRegimen", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCRegimen", ORegimen.Regimen);

                ObjConexion.Abrircon();
                int FilasCRegime = Cmd_D.ExecuteNonQuery();
                if (FilasCRegime > 0) CreateORegimen = true;

                return CreateORegimen;
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

        public List<ClsRegimen> FnRRegimenD()
        {
            ClsRegimen ORegimen = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRRegimen", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsRegimen> LstRegimen = new List<ClsRegimen>();
                while (Dr_D.Read())
                {
                    ORegimen = new ClsRegimen();
                    ORegimen.IdRegimen = Dr_D[0].ToString();//id_Regimen
                    ORegimen.Regimen = Dr_D[1].ToString();  //Regimen     
                    LstRegimen.Add(ORegimen);
                }
                return LstRegimen;
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

        public bool FnURegimenD(ClsRegimen ORegimen)
        {
            bool UpdateRegimen = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spURegimen", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdRegimen", Convert.ToInt16(ORegimen.IdRegimen));
                Cmd_D.Parameters.AddWithValue("prmURegimen", ORegimen.Regimen);
                
                ObjConexion.Abrircon();
                int FilasURegimen = Cmd_D.ExecuteNonQuery();
                if (FilasURegimen > 0) UpdateRegimen = true;

                return UpdateRegimen;
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

        public bool FnDRegimenD(ClsRegimen ORegimen)
        {
            bool DeleteRegimen = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDRegimen", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdRegimen", Convert.ToInt16(ORegimen.IdRegimen));

                ObjConexion.Abrircon();
                int FilasDRegimen = Cmd_D.ExecuteNonQuery();
                if (FilasDRegimen > 0) DeleteRegimen = true;

                return DeleteRegimen;
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

        public bool FnERegimenD(ClsRegimen ORegimen)
        {
            bool ExisteRegimen = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spERegimen", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdRegimen", Convert.ToInt16(ORegimen.IdRegimen));
                Cmd_D.Parameters.AddWithValue("prmERegimen", ORegimen.Regimen);
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteRegimen = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteRegimen;
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
