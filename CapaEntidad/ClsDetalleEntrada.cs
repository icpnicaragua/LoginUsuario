using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{//*************************lote************************
    public class ClsDetalleEntrada
    {
        private string _Idlote;
        private ClsEntradas _ObjEntradas;
        private ClsProducto _ObjProducto;
        private string _Cantidad;
        private string _PrecioUnitario;
        private string _Estado;
        private string _CantidadDisponible;

        public string Idlote { get => _Idlote; set => _Idlote = value; }
        public ClsEntradas ObjEntradas { get => _ObjEntradas; set => _ObjEntradas = value; }
        public ClsProducto ObjProducto { get => _ObjProducto; set => _ObjProducto = value; }
        public string Cantidad { get => _Cantidad; set => _Cantidad = value; }
        public string PrecioUnitario { get => _PrecioUnitario; set => _PrecioUnitario = value; }
        public string Estado { get => _Estado; set => _Estado = value; }
        public string CantidadDisponible { get => _CantidadDisponible; set => _CantidadDisponible = value; }


        public ClsDetalleEntrada()
        {
            this.ObjProducto = new ClsProducto();
            this.ObjEntradas = new ClsEntradas();
        }
    }
}
