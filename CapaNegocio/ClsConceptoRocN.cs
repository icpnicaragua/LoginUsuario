using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsConceptoRocN
    {
        public bool FnCConceptoRocN(ClsConceptoRoc OConceptoRoc)
        {
            Boolean CreateConceptoRoc = new ClsConceptoRocD().FnCConceptoRocD(OConceptoRoc);
            return CreateConceptoRoc;
        }
        public List<ClsConceptoRoc> FnRConceptoRocN()
        {
            List<ClsConceptoRoc> OConceptoRoc = new ClsConceptoRocD().FnRConceptoRocD();
            return OConceptoRoc;
        }
        public bool FnUConceptoRocN(ClsConceptoRoc OConceptoRoc)
        {
            if (OConceptoRoc.IdConceptoRoc != "" && OConceptoRoc.IdConceptoRoc != null)
            {
                Boolean UpdateConceptoRoc = new ClsConceptoRocD().FnUConceptoRocD(OConceptoRoc);
                return UpdateConceptoRoc;
            }
            else
            {
                return false;
            }

        }
        public bool FnDConceptoRocN(ClsConceptoRoc OConceptoRoc)
        {
            if (OConceptoRoc.IdConceptoRoc != "" && OConceptoRoc.IdConceptoRoc != null)
            {
                Boolean DeleteConceptoRoc = new ClsConceptoRocD().FnDConceptoRocD(OConceptoRoc);
                return DeleteConceptoRoc;
            }
            else
            {
                return false;
            }
        }
        public bool FnEConceptoRocN(ClsConceptoRoc OConceptoRoc)
        {
            if (OConceptoRoc.IdConceptoRoc != "" && OConceptoRoc.IdConceptoRoc != null)
            {
                Boolean ExisteConceptoRoc = new ClsConceptoRocD().FnEConceptoRocD(OConceptoRoc);
                return ExisteConceptoRoc;
            }
            else
            {
                return true;
            }
        }
    }
}
