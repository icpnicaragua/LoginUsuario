using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsInicioCaja
    {
        private string _IdInicioCaja;
        private ClsEmpleado _ObjCajero;
        private string _Fechahora;
        private string _Estado;

        public string IdInicioCaja { get => _IdInicioCaja; set => _IdInicioCaja = value; }
        public ClsEmpleado ObjCajero { get => _ObjCajero; set => _ObjCajero = value; }
        public string Fechahora { get => _Fechahora; set => _Fechahora = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsInicioCaja()
        {
            this.ObjCajero = new ClsEmpleado();
        }

    }
}
