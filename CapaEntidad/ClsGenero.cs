using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsGenero
    {
        private string _IdGenero;
        private string _Genero;
        private string _Estado;
        public string IdGenero { get => _IdGenero; set => _IdGenero = value; }
        public string Genero { get => _Genero; set => _Genero = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsGenero() { }
    }
}
