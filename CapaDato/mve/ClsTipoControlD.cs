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

        public bool ExisteTC(ClsTipoControl TCpara)
        {
            bool ExisteTC = false;
            
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new SqlCommand("spExisteTC", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("@prmTC", TCpara.Tipocontrol);
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {

                   
                    ExisteTC = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteTC;
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
    }
}
