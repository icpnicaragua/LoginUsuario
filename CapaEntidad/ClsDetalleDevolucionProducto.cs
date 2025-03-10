using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsDetalleDevolucionProducto
    {
        private string _IdDetalleDevolucionProducto;
        private ClsProducto _ObjProducto;
        private string _Cantidad;
        private ClsDetalleEntrada _ObjDetalleEntrada;
        private string _PrecioUnitario;
        private ClsDevolucionProducto _ObjDevolucionProducto;
        private string _Estado;

        public string IdDetalleDevolucionProducto { get => _IdDetalleDevolucionProducto; set => _IdDetalleDevolucionProducto = value; }
        public ClsProducto ObjProducto { get => _ObjProducto; set => _ObjProducto = value; }
        public string Cantidad { get => _Cantidad; set => _Cantidad = value; }
        public ClsDetalleEntrada ObjDetalleEntrada { get => _ObjDetalleEntrada; set => _ObjDetalleEntrada = value; }
        public string PrecioUnitario { get => _PrecioUnitario; set => _PrecioUnitario = value; }
        public ClsDevolucionProducto ObjDevolucionProducto { get => _ObjDevolucionProducto; set => _ObjDevolucionProducto = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsDetalleDevolucionProducto()
        {
            this.ObjProducto = new ClsProducto();
            this.ObjDevolucionProducto = new ClsDevolucionProducto();
            this.ObjDetalleEntrada = new ClsDetalleEntrada();
        }

    }
}
