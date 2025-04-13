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
    public class ClsPagoSobreD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCPagoSobreD(ClsPagoSobre OPagoSobre)
        {
            bool CreateOPagoSobre = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCPagoSobre", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCPagoSobre", OPagoSobre.Descripcion);

                ObjConexion.Abrircon();
                int FilasCRegime = Cmd_D.ExecuteNonQuery();
                if (FilasCRegime > 0) CreateOPagoSobre = true;

                return CreateOPagoSobre;
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

        public List<ClsPagoSobre> FnRPagoSobreD()
        {
            ClsPagoSobre OPagoSobre = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRPagoSobre", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsPagoSobre> LstPagoSobre = new List<ClsPagoSobre>();
                while (Dr_D.Read())
                {
                    OPagoSobre = new ClsPagoSobre();
                    OPagoSobre.IdPagoSobre = Dr_D[0].ToString();//id_PagoSobre
                    OPagoSobre.Descripcion = Dr_D[1].ToString();  //PagoSobre     
                    LstPagoSobre.Add(OPagoSobre);
                }
                return LstPagoSobre;
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

        public bool FnUPagoSobreD(ClsPagoSobre OPagoSobre)
        {
            bool UpdatePagoSobre = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUPagoSobre", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdPagoSobre", Convert.ToInt16(OPagoSobre.IdPagoSobre));
                Cmd_D.Parameters.AddWithValue("prmUPagoSobre", OPagoSobre.Descripcion);

                ObjConexion.Abrircon();
                int FilasUPagoSobre = Cmd_D.ExecuteNonQuery();
                if (FilasUPagoSobre > 0) UpdatePagoSobre = true;

                return UpdatePagoSobre;
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

        public bool FnDPagoSobreD(ClsPagoSobre OPagoSobre)
        {
            bool DeletePagoSobre = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDPagoSobre", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdPagoSobre", Convert.ToInt16(OPagoSobre.IdPagoSobre));

                ObjConexion.Abrircon();
                int FilasDPagoSobre = Cmd_D.ExecuteNonQuery();
                if (FilasDPagoSobre > 0) DeletePagoSobre = true;

                return DeletePagoSobre;
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

        public bool FnEPagoSobreD(ClsPagoSobre OPagoSobre)
        {
            bool ExistePagoSobre = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spEPagoSobre", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdPagoSobre", Convert.ToInt16(OPagoSobre.IdPagoSobre));
                Cmd_D.Parameters.AddWithValue("prmEPagoSobre", OPagoSobre.Descripcion);
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExistePagoSobre = Convert.ToBoolean(Dr_D[0]);
                }
                return ExistePagoSobre;
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
