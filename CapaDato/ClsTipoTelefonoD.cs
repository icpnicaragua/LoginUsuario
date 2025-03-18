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
    public class ClsTipoTelefonoD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCTipoTelefonoD(ClsTipoTelefono OTipoTelefono)
        {
            bool CreateTipoTelefono = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCTipoTelefono", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmTipoTelefono", OTipoTelefono.TipoTelefono);
              
                ObjConexion.Abrircon();
                int FilasCTipoTelefono = Cmd_D.ExecuteNonQuery();
                if (FilasCTipoTelefono > 0) CreateTipoTelefono = true;

                return CreateTipoTelefono;
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

        public List<ClsTipoTelefono> FnRTipoTelefonoD()
        {
            ClsTipoTelefono OTipoTelefono = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRTipoTelef", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsTipoTelefono> LstTipoTelefono = new List<ClsTipoTelefono>();
                while (Dr_D.Read())
                {
                    OTipoTelefono = new ClsTipoTelefono();
                    OTipoTelefono.IdTipoTelefono = Dr_D[0].ToString();//id_tipotel
                    OTipoTelefono.TipoTelefono = Dr_D[1].ToString();  //tipotel      
                    LstTipoTelefono.Add(OTipoTelefono);
                }
                return LstTipoTelefono;
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

        public bool FnUTipoTelefonoD(ClsTipoTelefono OTipoTelefono)
        {
            bool UpdateTipoTelefono = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUTipoTelef", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdTipoTelef", Convert.ToInt16(OTipoTelefono.IdTipoTelefono));
                Cmd_D.Parameters.AddWithValue("prmUTipoTelef", OTipoTelefono.TipoTelefono);
                
                ObjConexion.Abrircon();
                int FilasUTipoTelefono = Cmd_D.ExecuteNonQuery();
                if (FilasUTipoTelefono > 0) UpdateTipoTelefono = true;

                return UpdateTipoTelefono;
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

        public bool FnDTipoTelefonoD(ClsTipoTelefono OTipoTelefono)
        {
            bool DeleteTipoTelefono = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDTipoTelefono", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmIdTipoTelefono", Convert.ToInt16(OTipoTelefono.IdTipoTelefono));

                ObjConexion.Abrircon();
                int FilasDTipoTelefono = Cmd_D.ExecuteNonQuery();
                if (FilasDTipoTelefono > 0) DeleteTipoTelefono = true;

                return DeleteTipoTelefono;
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

        public bool FnETipoTelefonoD(ClsTipoTelefono OTipoTelefono)
        {
            bool ExisteTipoTelefono = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spETipoTelef", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdTipoTelef", Convert.ToInt16(OTipoTelefono.IdTipoTelefono));
                Cmd_D.Parameters.AddWithValue("prmETipoTelef", OTipoTelefono.TipoTelefono);
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteTipoTelefono = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteTipoTelefono;
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
