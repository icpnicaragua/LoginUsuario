using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsRetiro
    {
        private string _IdRetiro;
        private ClsEmpleado _ObjCajero;
        private ClsEmpleado _ObjEmpleadoRetiro;
        private string _Estado;
        public string IdRetiro { get => _IdRetiro; set => _IdRetiro = value; }
        public ClsEmpleado ObjCajero { get => _ObjCajero; set => _ObjCajero = value; }
        public ClsEmpleado ObjEmpleadoRetiro { get => _ObjEmpleadoRetiro; set => _ObjEmpleadoRetiro = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsRetiro()
        {
            this.ObjCajero = new ClsEmpleado();
            this.ObjEmpleadoRetiro = new ClsEmpleado();
        }

    }
}
