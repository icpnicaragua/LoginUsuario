using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsDevolucionProveedor
    {
        private string _IdDevolucionProveedor;
        private ClsEntradas _ObjEntradas;
        private string _FechaDevolución;
        private ClsProveedor _ObjProveedor;
        private string _Estado;

        public string IdDevolucionProveedor { get => _IdDevolucionProveedor; set => _IdDevolucionProveedor = value; }
        public ClsEntradas ObjEntradas { get => _ObjEntradas; set => _ObjEntradas = value; }
        public string FechaDevolución { get => _FechaDevolución; set => _FechaDevolución = value; }
        public ClsProveedor ObjProveedor { get => _ObjProveedor; set => _ObjProveedor = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsDevolucionProveedor()
        {
            this.ObjEntradas = new ClsEntradas();
            this.ObjProveedor = new ClsProveedor();
        }
    }
}
