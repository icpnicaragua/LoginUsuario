using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsDenominacionInicio
    {
      
        private ClsInicioCaja _ObjInicioCaja;
        private ClsDenominacionesCS _ObjDenominacionCS;
        private string _Cantidad;
        private string _Estado;

     
        public ClsInicioCaja ObjInicioCaja { get => _ObjInicioCaja; set => _ObjInicioCaja = value; }
        public ClsDenominacionesCS ObjDenominacionCS { get => _ObjDenominacionCS; set => _ObjDenominacionCS = value; }
        public string Cantidad { get => _Cantidad; set => _Cantidad = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsDenominacionInicio()
        {
            this.ObjInicioCaja = new ClsInicioCaja();
            this.ObjDenominacionCS = new ClsDenominacionesCS();
        }

    }
}
