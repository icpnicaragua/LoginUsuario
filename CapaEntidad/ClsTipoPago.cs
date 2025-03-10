using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsTipoPago
    {
        private string _IdTipoPago;
        private string _TipoPago;
        private string _Estado;
        public string IdTipoPago { get => _IdTipoPago; set => _IdTipoPago = value; }
        public string TipoPago { get => _TipoPago; set => _TipoPago = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsTipoPago() { }
    }
}
