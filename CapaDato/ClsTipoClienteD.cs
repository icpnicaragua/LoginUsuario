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
    public class ClsTipoClienteD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCTipoClienteD(ClsTipoCliente OTipoCliente)
        {
            bool CreateOTipoCliente = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCTipoCliente", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCTipoCliente", OTipoCliente.TipoCliente);

                ObjConexion.Abrircon();
                int FilasCRegime = Cmd_D.ExecuteNonQuery();
                if (FilasCRegime > 0) CreateOTipoCliente = true;

                return CreateOTipoCliente;
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

        public List<ClsTipoCliente> FnRTipoClienteD()
        {
            ClsTipoCliente OTipoCliente = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRTipoCliente", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsTipoCliente> LstTipoCliente = new List<ClsTipoCliente>();
                while (Dr_D.Read())
                {
                    OTipoCliente = new ClsTipoCliente();
                    OTipoCliente.IdTipoCliente = Dr_D[0].ToString();//id_TipoCliente
                    OTipoCliente.TipoCliente = Dr_D[1].ToString();  //TipoCliente     
                    LstTipoCliente.Add(OTipoCliente);
                }
                return LstTipoCliente;
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

        public bool FnUTipoClienteD(ClsTipoCliente OTipoCliente)
        {
            bool UpdateTipoCliente = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUTipoCliente", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdTipoCliente", Convert.ToInt16(OTipoCliente.IdTipoCliente));
                Cmd_D.Parameters.AddWithValue("prmUTipoCliente", OTipoCliente.TipoCliente);

                ObjConexion.Abrircon();
                int FilasUTipoCliente = Cmd_D.ExecuteNonQuery();
                if (FilasUTipoCliente > 0) UpdateTipoCliente = true;

                return UpdateTipoCliente;
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

        public bool FnDTipoClienteD(ClsTipoCliente OTipoCliente)
        {
            bool DeleteTipoCliente = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDTipoCliente", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdTipoCliente", Convert.ToInt16(OTipoCliente.IdTipoCliente));

                ObjConexion.Abrircon();
                int FilasDTipoCliente = Cmd_D.ExecuteNonQuery();
                if (FilasDTipoCliente > 0) DeleteTipoCliente = true;

                return DeleteTipoCliente;
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

        public bool FnETipoClienteD(ClsTipoCliente OTipoCliente)
        {
            bool ExisteTipoCliente = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spETipoCliente", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdTipoCliente", Convert.ToInt16(OTipoCliente.IdTipoCliente));
                Cmd_D.Parameters.AddWithValue("prmETipoCliente", OTipoCliente.TipoCliente);
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteTipoCliente = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteTipoCliente;
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
