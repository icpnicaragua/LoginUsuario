using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;


namespace CapaNegocio
{
    public class ClsUsuarioN
    {
        public ClsUsuario Login(string Usuario, string Clave)
        {
            ClsUsuario ObjUsuario = new ClsUsuarioD ().Login(Usuario, Clave);

            return ObjUsuario;
        }

        public bool FnCUsuarioN(ClsUsuario OUsuario)
        {
            Boolean CreateUsuario = new ClsUsuarioD().FnCUsuarioD(OUsuario);
            return CreateUsuario;
        }
        public List<ClsUsuario> FnRUsuarioN()
        {
            List<ClsUsuario> OUsuario = new ClsUsuarioD().FnRUsuarioD();
            return OUsuario;
        }
        public bool FnUUsuarioN(ClsUsuario OUsuario)
        {
            if (OUsuario.ID_usuario != "" && OUsuario.ID_usuario != null 
                && OUsuario.Clave != "" && OUsuario.Clave != null
                && OUsuario.Usuario != "" && OUsuario.Usuario != null)
            {
                Boolean UpdateUsuario = new ClsUsuarioD().FnUUsuarioD(OUsuario);
                return UpdateUsuario;
            }
            else
            {
                return false;
            }

        }
        public bool FnDUsuarioN(ClsUsuario OUsuario)
        {
            if (OUsuario.ID_usuario != "" && OUsuario.ID_usuario != null)
            {
                Boolean DeleteUsuario = new ClsUsuarioD().FnDUsuarioD(OUsuario);
                return DeleteUsuario;
            }
            else
            {
                return false;
            }
        }
        public bool FnEUsuarioN(ClsUsuario OUsuario)
        {
            if (OUsuario.ID_usuario != "" && OUsuario.ID_usuario != null)
            {
                Boolean ExisteUsuario = new ClsUsuarioD().FnEUsuarioD(OUsuario);
                return ExisteUsuario;
            }
            else
            {
                return true;
            }
        }
    }
}
