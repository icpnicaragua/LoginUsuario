using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsFamilia
    {
        private string _IdFamilia;
        private string _Familia;
        private string _Estado;

        public string IdFamilia { get => _IdFamilia; set => _IdFamilia = value; }

        public string Familia { get => _Familia; set => _Familia = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsFamilia() { }
    }
}
