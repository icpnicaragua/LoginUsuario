using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsPalabraClave
    {
        private string _IdPalabraClave;
        private string _PalabraClave;
        private string _Estado;

        public string IdPalabraClave { get => _IdPalabraClave; set => _IdPalabraClave = value; }
        public string PalabraClave { get => _PalabraClave; set => _PalabraClave = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsPalabraClave() { }
    }
}
