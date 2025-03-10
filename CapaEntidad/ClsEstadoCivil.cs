using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsEstadoCivil
    {
        private string _IdEstadoCivil;
        private string _EstadoCivil;
        private string _Estado;

        public string IdEstadoCivil { get => _IdEstadoCivil; set => _IdEstadoCivil = value; }
        public string EstadoCivil { get => _EstadoCivil; set => _EstadoCivil = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsEstadoCivil() { }

    }
}
