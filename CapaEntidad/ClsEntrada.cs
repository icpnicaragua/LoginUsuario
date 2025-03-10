using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsEntrada
    {
        private string _IdEntrada;
        private string _Entrada;
        private string _Estado;

        public string IdEntrada { get => _IdEntrada; set => _IdEntrada = value; }
        public string Entrada { get => _Entrada; set => _Entrada = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsEntrada() { }

    }
}
