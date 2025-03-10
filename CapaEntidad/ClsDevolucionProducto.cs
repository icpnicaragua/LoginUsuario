using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsDevolucionProducto
    {
        private string _IdDevolucionProducto;
        private ClsFactura _ObjFactura;
        private string _FechaDevolucion;
        private ClsCliente _ObjCliente;
        private string _Estado;

        public string IdDevolucionProducto { get => _IdDevolucionProducto; set => _IdDevolucionProducto = value; }
        public ClsFactura ObjFactura { get => _ObjFactura; set => _ObjFactura = value; }
        public string FechaDevolucion { get => _FechaDevolucion; set => _FechaDevolucion = value; }
        public ClsCliente ObjCliente { get => _ObjCliente; set => _ObjCliente = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsDevolucionProducto()
        {

            this.ObjFactura = new ClsFactura();
            this.ObjCliente = new ClsCliente();
        }

    }
}
