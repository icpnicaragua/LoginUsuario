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
    }
}
