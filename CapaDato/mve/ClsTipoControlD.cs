using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;
using MySql.Data.MySqlClient;
using System.Data;

namespace CapaDato.mve
{
    public class ClsTipoControlD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado
        
        public List<ClsTipoControl> MostrarTC()
        {
            ClsTipoControl OTC = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spVerTC", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsTipoControl> LstTC = new List<ClsTipoControl>();
                while (Dr_D.Read())
                {
                    OTC = new ClsTipoControl();
                    OTC.Idtipocontrol = Dr_D[0].ToString();//ID_tipo_control
                    OTC.Tipocontrol= Dr_D[1].ToString();  //tipo_control
                    LstTC.Add(OTC);
                }
                return LstTC;
            }
            catch(Exception ex)
            {
                return null;
                throw ex;
            }
            finally
            {
                ObjConexion.Cerrarcon();
            }
           
        }

        public bool FnCTico (ClsTipoControl OTico)
        {
            bool CreateTico = false;

            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCTico", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCTico", OTico.Tipocontrol);
                ObjConexion.Abrircon();
                int FilasCTiCo = Cmd_D.ExecuteNonQuery();
                if (FilasCTiCo>0)CreateTico = true;
                
                return CreateTico;
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

        public bool FnUTico(ClsTipoControl OTico)
        {
            bool UpdateTIco = false;

            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUTico", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdTC",Convert.ToInt16(OTico.Idtipocontrol));
                Cmd_D.Parameters.AddWithValue("prmUTico", OTico.Tipocontrol);
                ObjConexion.Abrircon();
                int FilasNTiCo = Cmd_D.ExecuteNonQuery();
                if (FilasNTiCo > 0) UpdateTIco = true;
                return UpdateTIco;
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

        public bool FnDTico(ClsTipoControl OTico)
        {
            bool DeleteTico = false;

            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDTico", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdTC", Convert.ToInt16(OTico.Idtipocontrol));
                ObjConexion.Abrircon();
                int FilasDTiCo = Cmd_D.ExecuteNonQuery();
                if (FilasDTiCo > 0) DeleteTico = true;
                return DeleteTico;
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

        public bool FnETicoTC(ClsTipoControl OTico)
        {
            bool ExisteTCTC = false;
            
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spETicoTC", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdTC", Convert.ToInt16(OTico.Idtipocontrol));
                Cmd_D.Parameters.AddWithValue("prmETCTC", OTico.Tipocontrol);
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                { 
                    ExisteTCTC = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteTCTC;
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
