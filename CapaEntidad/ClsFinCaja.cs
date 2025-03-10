using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsFinCaja
    {
        private string _IdFinCaja;
        private ClsEmpleado _ObjCajero;
        private string _FechaHora;
        private string _Estado;

        public string IdFinCaja { get => _IdFinCaja; set => _IdFinCaja = value; }
        public ClsEmpleado ObjCajero { get => _ObjCajero; set => _ObjCajero = value; }
        public string FechaHora { get => _FechaHora; set => _FechaHora = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsFinCaja()
        {
            this.ObjCajero = new ClsEmpleado();
        }

    }
}
