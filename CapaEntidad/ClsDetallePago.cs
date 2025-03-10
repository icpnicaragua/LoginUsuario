using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsDetallePago
    {
        private string _IdDetallePago;
        private ClsTipoPago _ObjTipoPago;
        private ClsFactura _ObjFactura;
        private ClsRoc _ObjRoc;
        private string _Cantidad;
        private ClsPagoSobre _ObjPagosobre;
        private string _Estado;

        public string IdDetallePago { get => _IdDetallePago; set => _IdDetallePago = value; }
        public ClsTipoPago ObjTipoPago { get => _ObjTipoPago; set => _ObjTipoPago = value; }
        public ClsFactura ObjFactura { get => _ObjFactura; set => _ObjFactura = value; }
        public ClsRoc ObjRoc { get => _ObjRoc; set => _ObjRoc = value; }
        public string Cantidad { get => _Cantidad; set => _Cantidad = value; }
        public ClsPagoSobre ObjPagosobre { get => _ObjPagosobre; set => _ObjPagosobre = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsDetallePago()
        {
            this.ObjFactura = new ClsFactura();
            this.ObjTipoPago = new ClsTipoPago();
            this.ObjRoc = new ClsRoc();
            this.ObjPagosobre = new ClsPagoSobre();
        }


    }
}
