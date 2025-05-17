using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsCargoEmpleado
    {
        private string _IdCargoEmpleado;
        private ClsCargo _ObjCargo;
        private ClsEmpleado _ObjEmpleado;
        private string _Estado;

        public string IdCargoEmpleado { get => _IdCargoEmpleado; set => _IdCargoEmpleado = value; }
        public ClsCargo ObjCargo { get => _ObjCargo; set => _ObjCargo = value; }
        public ClsEmpleado ObjEmpleado { get => _ObjEmpleado; set => _ObjEmpleado = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsCargoEmpleado()
        {
            this.ObjEmpleado = new ClsEmpleado();
            this.ObjCargo = new ClsCargo();
        }
    }
}
