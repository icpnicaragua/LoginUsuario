using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;
using System.Data;

namespace CapaDato.mve
{
    public class ClsTipoControlD
    {
        private ClsConexion ObjConexion = null;
        private SqlDataReader Dr_D; //para leer datos de latabla 
        private SqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado
        
        public List<ClsTipoControl> MostrarTC()
        {
            ClsTipoControl OTC = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new SqlCommand("spVerTC", ObjConexion.Con_D);
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
                Cmd_D = new SqlCommand("spCTico", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("@prmCTico", OTico.Tipocontrol);
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    CreateTico = Convert.ToBoolean(Dr_D[0]);
                }
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
                Cmd_D = new SqlCommand("spUTico", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdTC",Convert.ToInt16(OTico.Idtipocontrol));
                Cmd_D.Parameters.AddWithValue("@prmUTico", OTico.Tipocontrol);
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    UpdateTIco = Convert.ToBoolean(Dr_D[0]);
                }
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
                Cmd_D = new SqlCommand("spDTico", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("@prmDIdTC", Convert.ToInt16(OTico.Idtipocontrol));
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    DeleteTico = Convert.ToBoolean(Dr_D[0]);
                }
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
                Cmd_D = new SqlCommand("spETicoTC", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("@prmEIdTC", Convert.ToInt16(OTico.Idtipocontrol));
                Cmd_D.Parameters.AddWithValue("@prmETCTC", OTico.Tipocontrol);
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
