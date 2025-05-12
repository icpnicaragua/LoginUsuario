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

        public ClsUsuario Login(string Usuario, string Clave)
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
                if (Dr_D.Read())
                {
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

        public bool FnCUsuarioD(ClsUsuario OUsuario)
        {
            bool CreateOUsuario = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCUsuario", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCUsuario", OUsuario.Usuario);
                Cmd_D.Parameters.AddWithValue("prmCPassword", OUsuario.Clave);
                Cmd_D.Parameters.AddWithValue("prmCIdEmpleado", Convert.ToInt16(OUsuario.ObjEmpleado.IdEmpleado));

                ObjConexion.Abrircon();
                int FilasUsuario = Cmd_D.ExecuteNonQuery();
                if (FilasUsuario > 0) CreateOUsuario = true;

                return CreateOUsuario;
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

        public List<ClsUsuario> FnRUsuarioD()
        {
            ClsUsuario OUsuario = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRUsuario", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsUsuario> LstUsuario = new List<ClsUsuario>();
                while (Dr_D.Read())
                {
                    OUsuario = new ClsUsuario();
                    OUsuario.ID_usuario = Dr_D[0].ToString();//id_Usuario
                    OUsuario.Usuario = Dr_D[1].ToString();  //Usuario     
                    OUsuario.Clave = Dr_D[2].ToString();
                    OUsuario.ObjEmpleado.IdEmpleado = Dr_D[3].ToString();
                    OUsuario.ObjEmpleado.ObjPersona.Nombre1 = Dr_D[4].ToString();
                    OUsuario.ObjEmpleado.ObjPersona.Apellido1 = Dr_D[5].ToString();
                    LstUsuario.Add(OUsuario);
                }
                return LstUsuario;
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

        public bool FnUUsuarioD(ClsUsuario OUsuario)
        {
            bool UpdateUsuario = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUUsuario", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdUsuario", Convert.ToInt16(OUsuario.ID_usuario));
                Cmd_D.Parameters.AddWithValue("prmUUsuario", OUsuario.Usuario);
                Cmd_D.Parameters.AddWithValue("prmUPassword", OUsuario.Clave);

                ObjConexion.Abrircon();
                int FilasUUsuario = Cmd_D.ExecuteNonQuery();
                if (FilasUUsuario > 0) UpdateUsuario = true;

                return UpdateUsuario;
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

        public bool FnDUsuarioD(ClsUsuario OUsuario)
        {
            bool DeleteUsuario = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDUsuario", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdUsuario", Convert.ToInt16(OUsuario.ID_usuario));

                ObjConexion.Abrircon();
                int FilasDUsuario = Cmd_D.ExecuteNonQuery();
                if (FilasDUsuario > 0) DeleteUsuario = true;

                return DeleteUsuario;
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

        public bool FnEUsuarioD(ClsUsuario OUsuario)
        {
            bool ExisteUsuario = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spEUsuario", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdUsuario", Convert.ToInt16(OUsuario.ID_usuario));
                Cmd_D.Parameters.AddWithValue("prmEUsuario", OUsuario.Usuario);
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteUsuario = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteUsuario;
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



        public List<ClsUsuario> FnRUsuarioNEmpleadoD()
        {
            ClsUsuario OUsuario = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRUsuarioNEmpleado", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsUsuario> LstUsuario = new List<ClsUsuario>();
                while (Dr_D.Read())
                {
                    OUsuario = new ClsUsuario();
                    OUsuario.ObjEmpleado.IdEmpleado = Dr_D[0].ToString();
                    OUsuario.ObjEmpleado.ObjPersona.Nombre1 = Dr_D[1].ToString();
                    OUsuario.ObjEmpleado.ObjPersona.Apellido1 = Dr_D[2].ToString();
                    OUsuario.ObjEmpleado.ObjArea.Area=Dr_D[3].ToString();
                    LstUsuario.Add(OUsuario);
                }
                return LstUsuario;
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
