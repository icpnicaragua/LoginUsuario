using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsTipoDireccion
    {
        private string _IdTipoDireccion;
        private string _TipoDireccion;
        private string _Estado;

        public string IdTipoDireccion { get => _IdTipoDireccion; set => _IdTipoDireccion = value; }
        public string TipoDireccion { get => _TipoDireccion; set => _TipoDireccion = value; }

        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsTipoDireccion() { }
    }
}
