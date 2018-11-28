using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;
using System.Data;

namespace CapaDato
{
    public class ClsUsuarioD
    {
        private ClsConexion ObjConexion = null;
        private SqlDataReader Dr_D; //para leer datos de latabla 
        private SqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public ClsUsuario Login (string Usuario, string Clave)
        {
            ClsUsuario ObjUsuario = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new SqlCommand("spLogin",ObjConexion.Con_D );
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("@prmUsuario", Usuario);
                Cmd_D.Parameters.AddWithValue("@prmClave", Clave);
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if(Dr_D.Read()){
                    ObjUsuario = new ClsUsuario();
                    ObjUsuario.ID_usuario = Dr_D["ID_usuario"].ToString();
                    ObjUsuario.Usuario = Dr_D["usuario"].ToString();
                    ObjUsuario.Clave = Dr_D["clave"].ToString();
                    //falta sacar estos datos para variables de sesión, buscar como convertir chat y date
                    ObjUsuario.Fecha_inicio = Dr_D["fecha_inicio"].ToString();
                    ObjUsuario.Estado = Dr_D["estado"].ToString();
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
