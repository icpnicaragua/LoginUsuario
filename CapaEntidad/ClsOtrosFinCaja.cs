using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsOtrosFinCaja
    {
        private string _IdOtrosFinCaja;
        private ClsFinCaja _ObjFinCaja;
        private ClsTipoPago _ObjTipoPago;
        private ClsDetallePago _ObjDetallePago;
        private string _Cantidad;
        private string _Estado;

        public string IdOtrosFinCaja { get => _IdOtrosFinCaja; set => _IdOtrosFinCaja = value; }
        public ClsFinCaja ObjFinCaja { get => _ObjFinCaja; set => _ObjFinCaja = value; }
        public ClsTipoPago ObjTipoPago { get => _ObjTipoPago; set => _ObjTipoPago = value; }
        public ClsDetallePago ObjDetallePago { get => _ObjDetallePago; set => _ObjDetallePago = value; }
        public string Cantidad { get => _Cantidad; set => _Cantidad = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsOtrosFinCaja()
        {
            this.ObjFinCaja = new ClsFinCaja();
            this.ObjTipoPago = new ClsTipoPago();
            this.ObjDetallePago = new ClsDetallePago();
        }
    }
}
