using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsEntradas
    {
        private string _IdEntradas;
        private string _Serie;
        private string _Documento;
        private ClsProveedor _ObjProveedor;
        private string _NumeroProductos;
        private string _FechaDocumento;
        private string _FechaIngreso;
        private string _Subtotal;
        private string _Iva;
        private string _Total;
        private ClsEntrada _ObjEntrada;
        private string _Credito;
        private string _Estado;

        public string IdEntradas { get => _IdEntradas; set => _IdEntradas = value; }
        public string Serie { get => _Serie; set => _Serie = value; }
        public string Documento { get => _Documento; set => _Documento = value; }
        public ClsProveedor ObjProveedor { get => _ObjProveedor; set => _ObjProveedor = value; }
        public string NumeroProductos { get => _NumeroProductos; set => _NumeroProductos = value; }
        public string FechaDocumento { get => _FechaDocumento; set => _FechaDocumento = value; }
        public string FechaIngreso { get => _FechaIngreso; set => _FechaIngreso = value; }
        public string Subtotal { get => _Subtotal; set => _Subtotal = value; }
        public string Iva { get => _Iva; set => _Iva = value; }
        public string Total { get => _Total; set => _Total = value; }
        public ClsEntrada ObjEntrada { get => _ObjEntrada; set => _ObjEntrada = value; }
        public string Credito { get => _Credito; set => _Credito = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsEntradas()
        {
            this.ObjProveedor = new ClsProveedor();
            this.ObjEntrada = new ClsEntrada();
        }


    }
}
