using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsCargo
    {
        private string _IdCargo;
        private string _Cargo;
        private string _Estado;

        public string IdCargo { get => _IdCargo; set => _IdCargo = value; }
        public string Cargo { get => _Cargo; set => _Cargo = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsCargo() { }
    }
}
