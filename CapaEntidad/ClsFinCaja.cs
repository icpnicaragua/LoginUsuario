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
        private string _Fecha;
        private string _Hora;
        private string _Estado;
        private ClsInicioCaja _ObjInicioCaja;

        public string IdFinCaja { get => _IdFinCaja; set => _IdFinCaja = value; }
        public ClsEmpleado ObjCajero { get => _ObjCajero; set => _ObjCajero = value; }
        public string Fecha { get => _Fecha; set => _Fecha = value; }
        public string Hora { get => _Hora; set => _Hora = value; }
        public string Estado { get => _Estado; set => _Estado = value; }
        public ClsInicioCaja ObjInicioCaja { get => _ObjInicioCaja; set => _ObjInicioCaja = value; }

        public ClsFinCaja()
        {
            this.ObjCajero = new ClsEmpleado();
            this.ObjInicioCaja=new ClsInicioCaja();
        }

    }
}
