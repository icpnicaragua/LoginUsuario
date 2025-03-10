using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsIdioma
    {
        private string _IdIdioma;
        private string _Idioma;
        private string _Estado;

        public string IdIdioma { get => _IdIdioma; set => _IdIdioma = value; }
        public string Idioma { get => _Idioma; set => _Idioma = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsIdioma() { }

    }
}
