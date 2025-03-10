using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsSucursalArea
    {
        private string _IdSucursalArea;
        private ClsSucursal _ObjSucursal;
        private ClsArea _ObjArea;
        private string _Estado;

        public string IdSucursalArea { get => _IdSucursalArea; set => _IdSucursalArea = value; }
        public ClsSucursal ObjSucursal { get => _ObjSucursal; set => _ObjSucursal = value; }
        public ClsArea ObjArea { get => _ObjArea; set => _ObjArea = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsSucursalArea()
        {
            this.ObjSucursal = new ClsSucursal();
            this.ObjArea = new ClsArea();
        }

    }
}
