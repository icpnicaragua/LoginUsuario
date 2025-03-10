using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsNotaCredito
    {
        private string _IdNotaCredito;
        private ClsDevolucionProducto _ObjDevolucionProducto;
        private string _Total;
        private ClsCliente _ObjCliente;
        private string _Serie;
        private string _Documento;
        private string _FechaHora;
        private string _Estado;

        public string IdNotaCredito { get => _IdNotaCredito; set => _IdNotaCredito = value; }
        public ClsDevolucionProducto ObjDevolucionProducto { get => _ObjDevolucionProducto; set => _ObjDevolucionProducto = value; }
        public string Total { get => _Total; set => _Total = value; }
        public ClsCliente ObjCliente { get => _ObjCliente; set => _ObjCliente = value; }
        public string Serie { get => _Serie; set => _Serie = value; }
        public string Documento { get => _Documento; set => _Documento = value; }
        public string FechaHora { get => _FechaHora; set => _FechaHora = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsNotaCredito()
        {
            this.ObjDevolucionProducto = new ClsDevolucionProducto();
            this.ObjCliente = new ClsCliente();
        }

    }
}
