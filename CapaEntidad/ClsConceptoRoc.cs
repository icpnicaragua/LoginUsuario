using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsConceptoRoc
    {
        private string _IdConceptoRoc;
        private string _ConceptoRoc;
        private string _Estado;
        public string IdConceptoRoc { get => _IdConceptoRoc; set => _IdConceptoRoc = value; }
        public string ConceptoRoc { get => _ConceptoRoc; set => _ConceptoRoc = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsConceptoRoc() { }


    }
}
