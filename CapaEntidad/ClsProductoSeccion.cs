using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsProductoSeccion
    {
        private string _IdProductoSeccion;
        private ClsSeccion _ObjSeccion;
        private ClsProductoSeccion _ObjProductoSeccion;
        private ClsUsuario _ObjUsuario;
        private ClsDetalleEntrada _ObjDetalleEntrada;
        private string _Estado;
        private ClsProducto _ObjProducto;
        private string _FechaHora;
        private string _CantidadEntrada;
        private string _CantidadSalida;

        public string IdProductoSeccion { get => _IdProductoSeccion; set => _IdProductoSeccion = value; }
        public ClsSeccion ObjSeccion { get => _ObjSeccion; set => _ObjSeccion = value; }
        public ClsProductoSeccion ObjProductoSeccion { get => _ObjProductoSeccion; set => _ObjProductoSeccion = value; }
        public ClsUsuario ObjUsuario { get => _ObjUsuario; set => _ObjUsuario = value; }
        public ClsDetalleEntrada ObjDetalleEntrada { get => _ObjDetalleEntrada; set => _ObjDetalleEntrada = value; }
        public string Estado { get => _Estado; set => _Estado = value; }
        public ClsProducto ObjProducto { get => _ObjProducto; set => _ObjProducto = value; }
        public string FechaHora { get => _FechaHora; set => _FechaHora = value; }
        public string CantidadEntrada { get => _CantidadEntrada; set => _CantidadEntrada = value; }
        public string CantidadSalida { get => _CantidadSalida; set => _CantidadSalida = value; }

        public ClsProductoSeccion()
        {
            this.ObjSeccion = new ClsSeccion();
            this.ObjUsuario = new ClsUsuario();
            this.ObjDetalleEntrada = new ClsDetalleEntrada();
            this.ObjProducto = new ClsProducto();
            this.ObjProductoSeccion = new ClsProductoSeccion();
        }


    }
}
