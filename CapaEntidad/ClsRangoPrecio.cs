using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsRangoPrecio
    {
        private string _IdRangoPrecio;
        private string _Rango;
        private string _ValorMinimo;
        private string _Estado;

        public string IdRangoPrecio { get => _IdRangoPrecio; set => _IdRangoPrecio = value; }
        public string Rango { get => _Rango; set => _Rango = value; }
        public string ValorMinimo { get => _ValorMinimo; set => _ValorMinimo = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsRangoPrecio() { }
    }
}
