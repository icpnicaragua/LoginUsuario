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
    public class ClsPalabraClaveD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCPalabraClaveD(ClsPalabraClave OPalabraClave)
        {
            bool CreateOPalabraClave = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCPalabraClave", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCPalabrasClave", OPalabraClave.PalabraClave);

                ObjConexion.Abrircon();
                int FilasCRegime = Cmd_D.ExecuteNonQuery();
                if (FilasCRegime > 0) CreateOPalabraClave = true;

                return CreateOPalabraClave;
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

        public List<ClsPalabraClave> FnRPalabraClaveD()
        {
            ClsPalabraClave OPalabraClave = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRPalabrasClave", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsPalabraClave> LstPalabraClave = new List<ClsPalabraClave>();
                while (Dr_D.Read())
                {
                    OPalabraClave = new ClsPalabraClave();
                    OPalabraClave.IdPalabraClave = Dr_D[0].ToString();//id_PalabraClave
                    OPalabraClave.PalabraClave = Dr_D[1].ToString();  //PalabraClave     
                    LstPalabraClave.Add(OPalabraClave);
                }
                return LstPalabraClave;
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

        public bool FnUPalabraClaveD(ClsPalabraClave OPalabraClave)
        {
            bool UpdatePalabraClave = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUPalabrasClave", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdPalabrasClave", Convert.ToInt16(OPalabraClave.IdPalabraClave));
                Cmd_D.Parameters.AddWithValue("prmUPalabrasClave", OPalabraClave.PalabraClave);

                ObjConexion.Abrircon();
                int FilasUPalabraClave = Cmd_D.ExecuteNonQuery();
                if (FilasUPalabraClave > 0) UpdatePalabraClave = true;

                return UpdatePalabraClave;
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

        public bool FnDPalabraClaveD(ClsPalabraClave OPalabraClave)
        {
            bool DeletePalabraClave = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDPalabrasClave", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdPalabrasClave", Convert.ToInt16(OPalabraClave.IdPalabraClave));

                ObjConexion.Abrircon();
                int FilasDPalabraClave = Cmd_D.ExecuteNonQuery();
                if (FilasDPalabraClave > 0) DeletePalabraClave = true;

                return DeletePalabraClave;
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

        public bool FnEPalabraClaveD(ClsPalabraClave OPalabraClave)
        {
            bool ExistePalabraClave = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spEPalabrasClave", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdPalabrasClave", Convert.ToInt16(OPalabraClave.IdPalabraClave));
                Cmd_D.Parameters.AddWithValue("prmEPalabrasClave", OPalabraClave.PalabraClave);
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExistePalabraClave = Convert.ToBoolean(Dr_D[0]);
                }
                return ExistePalabraClave;
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
