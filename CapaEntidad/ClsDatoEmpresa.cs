using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsDatoEmpresa
    {
        private string _IdDato;
        private string _Variable;
        private string _Estado;

        public string IdDato { get => _IdDato; set => _IdDato = value; }
        public string Variable { get => _Variable; set => _Variable = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsDatoEmpresa() { }

    }
}
