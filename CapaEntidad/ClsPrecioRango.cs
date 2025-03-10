using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsPrecioRango
    {
        private string _IdPrecioRango;
        private ClsProducto _ObjProducto;
        private ClsRangoPrecio _ObjRangoPrecio;
        private string _Estado;
        private string _Valor;
        private string _Fecha;

        public string IdPrecioRango { get => _IdPrecioRango; set => _IdPrecioRango = value; }
        public ClsProducto ObjProducto { get => _ObjProducto; set => _ObjProducto = value; }
        public ClsRangoPrecio ObjRangoPrecio { get => _ObjRangoPrecio; set => _ObjRangoPrecio = value; }
        public string Estado { get => _Estado; set => _Estado = value; }
        public string Valor { get => _Valor; set => _Valor = value; }
        public string Fecha { get => _Fecha; set => _Fecha = value; }

        public ClsPrecioRango()
        {
            this.ObjProducto = new ClsProducto();
            this.ObjRangoPrecio = new ClsRangoPrecio();
        }

    }
}
