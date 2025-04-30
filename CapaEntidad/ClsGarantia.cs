using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsGarantia
    {
        private string _IdGarantia;
        private string _Garantia;
        private string _Estado;

        public string IdGarantia { get => _IdGarantia; set => _IdGarantia = value; }
        public string Garantia { get => _Garantia; set => _Garantia = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsGarantia() { }
    }
}
