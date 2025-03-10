using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsRack
    {
        private string _IdRack;
        private string _Rack;
        private ClsSeccion _ObjSeccion;
        private string _Estado;

        public string IdRack { get => _IdRack; set => _IdRack = value; }
        public string Rack { get => _Rack; set => _Rack = value; }
        public ClsSeccion ObjSeccion { get => _ObjSeccion; set => _ObjSeccion = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsRack()
        {
            this.ObjSeccion = new ClsSeccion();
        }

    }
}
