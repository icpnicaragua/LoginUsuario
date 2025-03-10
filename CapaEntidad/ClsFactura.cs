using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsFactura
    {
        private string _IdFactura;
        private string _Serie;
        private string _Documento;
        private string _FechaHora;
        private string _Credito;
        private ClsCliente _ObjCliente;
        private ClsEmpleado _ObjVendedor;
        private string _SubTotal;
        private string _Iva;
        private string _Descuento;
        private string _Total;
        private string _Retencion;
        private ClsTipoPago _ObjTipoPago;
        private string _Nota;
        private ClsEmpleado _ObjCajero;
        private string _Estado;

        public string IdFactura { get => _IdFactura; set => _IdFactura = value; }
        public string Serie { get => _Serie; set => _Serie = value; }
        public string Documento { get => _Documento; set => _Documento = value; }
        public string FechaHora { get => _FechaHora; set => _FechaHora = value; }
        public string Credito { get => _Credito; set => _Credito = value; }
        public ClsCliente ObjCliente { get => _ObjCliente; set => _ObjCliente = value; }
        public ClsEmpleado ObjVendedor { get => _ObjVendedor; set => _ObjVendedor = value; }
        public string SubTotal { get => _SubTotal; set => _SubTotal = value; }
        public string Iva { get => _Iva; set => _Iva = value; }
        public string Descuento { get => _Descuento; set => _Descuento = value; }
        public string Total { get => _Total; set => _Total = value; }
        public string Retencion { get => _Retencion; set => _Retencion = value; }
        public ClsTipoPago ObjTipoPago { get => _ObjTipoPago; set => _ObjTipoPago = value; }
        public string Nota { get => _Nota; set => _Nota = value; }
        public ClsEmpleado ObjCajero { get => _ObjCajero; set => _ObjCajero = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsFactura()
        {
            this.ObjCajero = new ClsEmpleado();
            this.ObjCliente = new ClsCliente();
            this.ObjTipoPago = new ClsTipoPago();
            this.ObjVendedor = new ClsEmpleado();
        }
    }
}
