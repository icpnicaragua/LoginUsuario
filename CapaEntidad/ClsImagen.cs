using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsImagen
    {
        private string _IdImagen;
        private string _Imagen;
        private string _Estado;
        private ClsProducto _ObjProducto;

        public string IdImagen { get => _IdImagen; set => _IdImagen = value; }
        public string Imagen { get => _Imagen; set => _Imagen = value; }
        public string Estado { get => _Estado; set => _Estado = value; }
        public ClsProducto ObjProducto { get => _ObjProducto; set => _ObjProducto = value; }

        public ClsImagen()
        {
            this.ObjProducto = new ClsProducto();
        }
    }
}
