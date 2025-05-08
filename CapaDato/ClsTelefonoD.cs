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
    public class ClsTelefonoD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCTelefonoD(ClsTelefono OTelefono)
        {
            bool CreateOTelefono = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCTelefono", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCTelefono", OTelefono.Telefono);
                Cmd_D.Parameters.AddWithValue("prmCIdTipoTelefono", Convert.ToInt16(OTelefono.ObjTipoTelefono.IdTipoTelefono));
                Cmd_D.Parameters.AddWithValue("prmCIdPersona", Convert.ToInt16(OTelefono.ObjPersona.IdPersona));

                ObjConexion.Abrircon();
                int FilasTelefono = Cmd_D.ExecuteNonQuery();
                if (FilasTelefono > 0) CreateOTelefono = true;

                return CreateOTelefono;
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

        public List<ClsTelefono> FnRTelefonoD(ClsTelefono OTelefonoD)
        {
            ClsTelefono OTelefono = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRTelefono", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmRIdPersona", Convert.ToInt16(OTelefonoD.ObjPersona.IdPersona));
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsTelefono> LstTelefono = new List<ClsTelefono>();
                while (Dr_D.Read())
                {
                    OTelefono = new ClsTelefono();
                    OTelefono.IdTelefono = Dr_D[0].ToString();//id_Telefono
                    OTelefono.Telefono = Dr_D[1].ToString();  //Telefono
                    OTelefono.ObjTipoTelefono.IdTipoTelefono = Dr_D[2].ToString();//idTipoTelefono
                    OTelefono.ObjTipoTelefono.TipoTelefono = Dr_D[3].ToString();//Tipo de identificacion 
                    LstTelefono.Add(OTelefono);
                }
                return LstTelefono;
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

        public bool FnUTelefonoD(ClsTelefono OTelefono)
        {
            bool UpdateTelefono = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUTelefono", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdTelefono", Convert.ToInt16(OTelefono.IdTelefono));
                Cmd_D.Parameters.AddWithValue("prmUTelefono", OTelefono.Telefono);
                Cmd_D.Parameters.AddWithValue("prmUIdTipoTelefono", Convert.ToInt16(OTelefono.ObjTipoTelefono.IdTipoTelefono));

                ObjConexion.Abrircon();
                int FilasUTelefono = Cmd_D.ExecuteNonQuery();
                if (FilasUTelefono > 0) UpdateTelefono = true;

                return UpdateTelefono;
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

        public bool FnDTelefonoD(ClsTelefono OTelefono)
        {
            bool DeleteTelefono = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDTelefono", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdTelefono", Convert.ToInt16(OTelefono.IdTelefono));

                ObjConexion.Abrircon();
                int FilasDTelefono = Cmd_D.ExecuteNonQuery();
                if (FilasDTelefono > 0) DeleteTelefono = true;

                return DeleteTelefono;
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

        public bool FnETelefonoD(ClsTelefono OTelefono)
        {
            bool ExisteTelefono = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spETelefono", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdTelefono", Convert.ToInt16(OTelefono.IdTelefono));
                Cmd_D.Parameters.AddWithValue("prmETelefono", OTelefono.Telefono);
                Cmd_D.Parameters.AddWithValue("prmEIdTipoTelefono", Convert.ToInt16(OTelefono.ObjTipoTelefono.IdTipoTelefono));
                Cmd_D.Parameters.AddWithValue("prmEIdPersona", Convert.ToInt16(OTelefono.ObjPersona.IdPersona));

                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteTelefono = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteTelefono;
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
