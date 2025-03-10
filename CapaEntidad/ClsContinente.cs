using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public  class ClsContinente
    {
        private string _IdContinente;
        private string _Continente;
        private string _Estado;

        public string IdContinente { get => _IdContinente; set => _IdContinente = value; }
        public string Continente { get => _Continente; set => _Continente = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsContinente() { }


    }
}
