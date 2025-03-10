using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsDenominacionRetiro
    {
        private string _IdDnominacionRetiro;
        private ClsRetiro _ObjRetiro;
        private ClsDenominacionesCS _ObjDenominacionCS;
        private string _Cantidad;
        private string _Estado;

        public string IdDnominacionRetiro { get => _IdDnominacionRetiro; set => _IdDnominacionRetiro = value; }
        public ClsRetiro ObjRetiro { get => _ObjRetiro; set => _ObjRetiro = value; }
        public ClsDenominacionesCS ObjDenominacionCS { get => _ObjDenominacionCS; set => _ObjDenominacionCS = value; }
        public string IdBo_Cantidaddega { get => _Cantidad; set => _Cantidad = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsDenominacionRetiro()
        {
            this.ObjDenominacionCS = new ClsDenominacionesCS();
            this.ObjRetiro = new ClsRetiro();

        }

    }
}
