using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsProducto
    {
        private string _IdProducto;
        private string _Nombre;
        private string _Descripcion;
        private string _Barra;
        private string _UnidadGranel;
        private string _GrabaIva;
        private string _AlertaMinimo;
        private string _Estado;
        private ClsSubCategoria _ObjSubCategoria;
        private ClsGarantia _ObjGarantia;

        public string IdProducto { get => _IdProducto; set => _IdProducto = value; }
        public string Nombre { get => _Nombre; set => _Nombre = value; }
        public string Descripcion { get => _Descripcion; set => _Descripcion = value; }
        public string Barra { get => _Barra; set => _Barra = value; }
        public string UnidadGranel { get => _UnidadGranel; set => _UnidadGranel = value; }
        public string GrabaIva { get => _GrabaIva; set => _GrabaIva = value; }
        public string AlertaMinimo { get => _AlertaMinimo; set => _AlertaMinimo = value; }
        public string Estado { get => _Estado; set => _Estado = value; }
        public ClsSubCategoria ObjSubCategoria { get => _ObjSubCategoria; set => _ObjSubCategoria = value; }
        public ClsGarantia ObjGarantia { get => _ObjGarantia; set => _ObjGarantia = value; }

        public ClsProducto()
        {
            this.ObjSubCategoria = new ClsSubCategoria();
            this.ObjGarantia = new ClsGarantia();

        }
    }
}
