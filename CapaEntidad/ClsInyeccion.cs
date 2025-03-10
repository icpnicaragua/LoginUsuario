using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsInyeccion
    {
        private string _IdInyeccion;
        private ClsInicioCaja _ObjInicioCaja;
        private ClsEmpleado _ObjCajero;
        private string _Cantidad;
        private ClsEmpleado _ObjRealizadoPor;
        private string _Nota;
        private string _Estado;

        public string IdInyeccion { get => _IdInyeccion; set => _IdInyeccion = value; }
        public ClsInicioCaja ObjInicioCaja { get => _ObjInicioCaja; set => _ObjInicioCaja = value; }
        public ClsEmpleado ObjCajero { get => _ObjCajero; set => _ObjCajero = value; }
        public string Cantidad { get => _Cantidad; set => _Cantidad = value; }
        public ClsEmpleado ObjRealizadoPor { get => _ObjRealizadoPor; set => _ObjRealizadoPor = value; }
        public string Nota { get => _Nota; set => _Nota = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsInyeccion()
        {
            this.ObjInicioCaja = new ClsInicioCaja();
            this.ObjCajero = new ClsEmpleado();
            this.ObjRealizadoPor = new ClsEmpleado();
        }



    }
}
