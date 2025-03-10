using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsProductoProveedor
    {
        private string _IdProductoProveedor;
        private ClsProducto _ObjProducto;
        private ClsProveedor _ObjProveedor;
        private string _Estado;

        public string IdProductoProveedor { get => _IdProductoProveedor; set => _IdProductoProveedor = value; }
        public ClsProducto ObjProducto { get => _ObjProducto; set => _ObjProducto = value; }
        public ClsProveedor ObjProveedor { get => _ObjProveedor; set => _ObjProveedor = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsProductoProveedor()
        {
            this.ObjProducto = new ClsProducto();
            this.ObjProveedor = new ClsProveedor();
        }

    }
}
