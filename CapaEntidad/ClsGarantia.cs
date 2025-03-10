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
        private string _PlazoDias;
        private string _Estado;

        public string IdGarantia { get => _IdGarantia; set => _IdGarantia = value; }
        public string PlazoDias { get => _PlazoDias; set => _PlazoDias = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsGarantia() { }
    }
}
