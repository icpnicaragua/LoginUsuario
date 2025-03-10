using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsRetencion
    {
        private string _IdRetencion;
        private ClsFactura _ObjFactura;
        private string _Cantidad;
        private string _Fecha;
        private string _Serie;
        private string _Documento;
        private ClsCliente _ObjCliente;
        private string _Estado;

        public string IdRetencion { get => _IdRetencion; set => _IdRetencion = value; }
        public ClsFactura ObjFactura { get => _ObjFactura; set => _ObjFactura = value; }
        public string Cantidad { get => _Cantidad; set => _Cantidad = value; }
        public string Fecha { get => _Fecha; set => _Fecha = value; }
        public string Serie { get => _Serie; set => _Serie = value; }
        public string Documento { get => _Documento; set => _Documento = value; }
        public ClsCliente ObjCliente { get => _ObjCliente; set => _ObjCliente = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsRetencion()
        {
            this.ObjFactura = new ClsFactura();
            this.ObjCliente = new ClsCliente();
        }

    }
}
