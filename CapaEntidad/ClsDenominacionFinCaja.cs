using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsDenominacionFinCaja
    {
        private string _IdDenominacionFinCaja;
        private ClsFinCaja _ObjFinCaja;
        private ClsDenominacionesCS _ObjDenominacionCS;
        private string _Cantidad;
        private string _Estado;

        public string IdDenominacionFinCaja { get => _IdDenominacionFinCaja; set => _IdDenominacionFinCaja = value; }
        public ClsFinCaja ObjFinCaja { get => _ObjFinCaja; set => _ObjFinCaja = value; }
        public ClsDenominacionesCS ObjDenominacionCS { get => _ObjDenominacionCS; set => _ObjDenominacionCS = value; }
        public string Cantidad { get => _Cantidad; set => _Cantidad = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsDenominacionFinCaja()
        {
            this.ObjFinCaja = new ClsFinCaja();
            this.ObjDenominacionCS = new ClsDenominacionesCS();
        }

    }
}
