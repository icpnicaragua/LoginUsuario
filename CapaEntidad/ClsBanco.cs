using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsBanco
    {
        private string _IdBanco;
        private string _Banco;
        private string _Estado;

        public string IdBanco { get => _IdBanco; set => _IdBanco = value; }
        public string Banco { get => _Banco; set => _Banco = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsBanco() { }

    }
}
