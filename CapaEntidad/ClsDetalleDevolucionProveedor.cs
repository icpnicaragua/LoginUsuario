using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsDetalleDevolucionProveedor
    {
        private string _IdDetalleDevolucionProveedor;
        private ClsDevolucionProveedor _ObjDevolucionProveedor;
        private ClsProducto _ObjProducto;
        private string _PrecioUnitario;
        private ClsDetalleEntrada _ObjDetalleEntrada;//lote
        private string _Estado;

        public string IdDetalleDevolucionProveedor { get => _IdDetalleDevolucionProveedor; set => _IdDetalleDevolucionProveedor = value; }
        public ClsDevolucionProveedor ObjDevolucionProveedor { get => _ObjDevolucionProveedor; set => _ObjDevolucionProveedor = value; }
        public ClsProducto ObjProducto { get => _ObjProducto; set => _ObjProducto = value; }
        public string PrecioUnitario { get => _PrecioUnitario; set => _PrecioUnitario = value; }
        public ClsDetalleEntrada ObjDetalleEntrada { get => _ObjDetalleEntrada; set => _ObjDetalleEntrada = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsDetalleDevolucionProveedor()
        {
            this.ObjDevolucionProveedor = new ClsDevolucionProveedor();
            this.ObjProducto = new ClsProducto();
            this.ObjDetalleEntrada = new ClsDetalleEntrada();
        }

    }
}
