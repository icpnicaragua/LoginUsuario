using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsDetalleFactura
    {
        private string _IdDetalleFactura;
        private ClsFactura _ObjFactura;
        private ClsProducto _ObjProducto;
        private string _Cantidad;
        private string _PrecioUnitario;
        private string _CostoUnitario;
        private ClsDetalleEntrada _ObjEntrada;
        private string _Iva;
        private string _Estado;

        public string IdDetalleFactura { get => _IdDetalleFactura; set => _IdDetalleFactura = value; }
        public ClsFactura ObjFactura { get => _ObjFactura; set => _ObjFactura = value; }
        public ClsProducto ObjProducto { get => _ObjProducto; set => _ObjProducto = value; }
        public string Cantidad { get => _Cantidad; set => _Cantidad = value; }
        public string PrecioUnitario { get => _PrecioUnitario; set => _PrecioUnitario = value; }
        public string CostoUnitario { get => _CostoUnitario; set => _CostoUnitario = value; }
        public ClsDetalleEntrada ObjEntrada { get => _ObjEntrada; set => _ObjEntrada = value; }
        public string Iva { get => _Iva; set => _Iva = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsDetalleFactura()
        {
            this.ObjFactura = new ClsFactura();
            this.ObjProducto = new ClsProducto();
            this.ObjEntrada = new ClsDetalleEntrada();
        }

    }
}
