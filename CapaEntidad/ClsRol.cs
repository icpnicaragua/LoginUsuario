using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsRol
    {
        private string _Id_rol;
        private string _Rol;
        private string _fecha_inicioRol;
        private string _estadoRol;

        public string Id_rol { get => _Id_rol; set => _Id_rol = value; }
        public string Rol { get => _Rol; set => _Rol = value; }
        public string Fecha_inicioRol { get => _fecha_inicioRol; set => _fecha_inicioRol = value; }
        public string EstadoRol { get => _estadoRol; set => _estadoRol = value; }

        public ClsRol()
        {

        }
    }
}
