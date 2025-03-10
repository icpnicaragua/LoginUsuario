using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsCxPPago
    {
        private string _IdCxPPago;
        private ClsEntrada _ObjEntrada;
        private ClsProveedor _ObjProveedor;
        private string _monto;
        private ClsTipoPago _ObjTipoPago;
        private string _Documento;
        private string _Fecha;
        private string _Nota;
        private string _Estado;

        public string IdCxPPago { get => _IdCxPPago; set => _IdCxPPago = value; }
        public ClsEntrada ObjEntrada { get => _ObjEntrada; set => _ObjEntrada = value; }
        public ClsProveedor ObjProveedor { get => _ObjProveedor; set => _ObjProveedor = value; }
        public string monto { get => _monto; set => _monto = value; }
        public ClsTipoPago ObjTipoPago { get => _ObjTipoPago; set => _ObjTipoPago = value; }
        public string Documento { get => _Documento; set => _Documento = value; }
        public string Fecha { get => _Fecha; set => _Fecha = value; }
        public string Nota { get => _Nota; set => _Nota = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsCxPPago()
        {
            this.ObjEntrada = new ClsEntrada();
            this.ObjProveedor = new ClsProveedor();
            this.ObjTipoPago = new ClsTipoPago();
        }

    }
}
