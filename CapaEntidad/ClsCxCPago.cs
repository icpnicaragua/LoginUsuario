using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsCxCPago
    {
        private string _IdCxCPago;
        private ClsFactura _ObjFactura;
        private ClsCliente _ObjCliente;
        private string _monto;
        private ClsTipoPago _ObjTipoPago;
        private ClsRoc _ObjRoc;
        private string _Fecha;
        private string _Nota;
        private string _Estado;

        public string IdCxCPago { get => _IdCxCPago; set => _IdCxCPago = value; }
        public ClsFactura ObjFactura { get => _ObjFactura; set => _ObjFactura = value; }
        public ClsCliente ObjCliente { get => _ObjCliente; set => _ObjCliente = value; }
        public string monto { get => _monto; set => _monto = value; }
        public ClsTipoPago ObjTipoPago { get => _ObjTipoPago; set => _ObjTipoPago = value; }
        public ClsRoc ObjRoc { get => _ObjRoc; set => _ObjRoc = value; }
        public string Fecha { get => _Fecha; set => _Fecha = value; }
        public string Nota { get => _Nota; set => _Nota = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsCxCPago()
        {
            this.ObjFactura = new ClsFactura();
            this.ObjCliente = new ClsCliente();
            this.ObjTipoPago= new ClsTipoPago();
            this.ObjRoc = new ClsRoc();
        }
    }
}
