using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsPalabraProducto
    {
        private string _IdPalabraProducto;
        private ClsProducto _ObjProducto;
        private ClsPalabraClave _ObjPalabra;
        private string _Estado;

        public string IdPalabraProducto { get => _IdPalabraProducto; set => _IdPalabraProducto = value; }
        public ClsProducto ObjProducto { get => _ObjProducto; set => _ObjProducto = value; }
        public ClsPalabraClave ObjPalabra { get => _ObjPalabra; set => _ObjPalabra = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsPalabraProducto()
        {
            this.ObjPalabra= new ClsPalabraClave();
            this.ObjProducto= new ClsProducto();
        }

    }
}
