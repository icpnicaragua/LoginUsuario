using System;
using System.Collections.Generic;
using MySql;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using MySql.Data.MySqlClient;
using CapaEntidad;

namespace CapaDato
{
    public class ClsUsuarioD
    {
        private ClsConexion ObjConexion = new ClsConexion();
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public ClsUsuario Login (string Usuario, string Clave)
        {
            ClsUsuario ObjUsuario = null;
            try
            {
               
                Cmd_D = new MySqlCommand("spLogin", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUsuario", Usuario);
                Cmd_D.Parameters.AddWithValue("prmClave", Clave);
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if(Dr_D.Read()){
                    ObjUsuario = new ClsUsuario();
                    ObjUsuario.ID_usuario = Dr_D["id_usuario"].ToString();
                    ObjUsuario.Usuario = Dr_D["usuario"].ToString();
                    ObjUsuario.Clave = Dr_D["password"].ToString();
                    //falta sacar estos datos para variables de sesión, buscar como convertir chat y date
                    ObjUsuario.Fecha_inicio = Dr_D["fecha_inicio"].ToString();
                    ObjUsuario.Estado = Dr_D["id_estado"].ToString();
                }
                return ObjUsuario;
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

    }
}
