using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsBodega
    {
        private string _IdBodega;
        private string _NombreBodega;
        private string _Descripcion;
        private string _Estado;
        private ClsSucursal _ObjSucursal;
        private ClsEmpleado _ObjResponsable;

        public string IdBodega { get => _IdBodega; set => _IdBodega = value; }
        public string NombreBodega { get => _NombreBodega; set => _NombreBodega = value; }
        public string Descripcion { get => _Descripcion; set => _Descripcion = value; }
        public string Estado { get => _Estado; set => _Estado = value; }
        public ClsSucursal ObjSucursal { get => _ObjSucursal; set => _ObjSucursal = value; }
        public ClsEmpleado ObjResponsable { get => _ObjResponsable; set => _ObjResponsable = value; }

        public ClsBodega()
        {
            this.ObjResponsable=new ClsEmpleado();
            this.ObjSucursal=new ClsSucursal();
        }
    }
}
