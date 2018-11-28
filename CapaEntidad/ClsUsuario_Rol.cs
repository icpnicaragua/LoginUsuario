using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsUsuario_Rol
    {
        private string _Id_Usuario_Rol;
        private string _fecha_inicio_UR;
        private string _EstadoUR;
        private ClsRol _objRol;
        private ClsUsuario _objUsuario;

        public string Id_Usuario_Rol { get => _Id_Usuario_Rol; set => _Id_Usuario_Rol = value; }
        public string Fecha_inicio_UR { get => _fecha_inicio_UR; set => _fecha_inicio_UR = value; }
        public string EstadoUR { get => _EstadoUR; set => _EstadoUR = value; }
        public ClsRol ObjRol { get => _objRol; set => _objRol = value; }
        public ClsUsuario ObjUsuario { get => _objUsuario; set => _objUsuario = value; }

        public ClsUsuario_Rol()
        {
            this.ObjRol = new ClsRol();
            this.ObjUsuario = new ClsUsuario();
        }

    }
}
