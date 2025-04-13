using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsFamiliaN
    {
        public bool FnCFamiliaN(ClsFamilia OFamilia)
        {
            Boolean CreateFamilia = new ClsFamiliaD().FnCFamiliaD(OFamilia);
            return CreateFamilia;
        }
        public List<ClsFamilia> FnRFamiliaN()
        {
            List<ClsFamilia> OFamilia = new ClsFamiliaD().FnRFamiliaD();
            return OFamilia;
        }
        public bool FnUFamiliaN(ClsFamilia OFamilia)
        {
            if (OFamilia.IdFamilia != "" && OFamilia.IdFamilia != null)
            {
                Boolean UpdateFamilia = new ClsFamiliaD().FnUFamiliaD(OFamilia);
                return UpdateFamilia;
            }
            else
            {
                return false;
            }

        }
        public bool FnDFamiliaN(ClsFamilia OFamilia)
        {
            if (OFamilia.IdFamilia != "" && OFamilia.IdFamilia != null)
            {
                Boolean DeleteFamilia = new ClsFamiliaD().FnDFamiliaD(OFamilia);
                return DeleteFamilia;
            }
            else
            {
                return false;
            }
        }
        public bool FnEFamiliaN(ClsFamilia OFamilia)
        {
            if (OFamilia.IdFamilia != "" && OFamilia.IdFamilia != null)
            {
                Boolean ExisteFamilia = new ClsFamiliaD().FnEFamiliaD(OFamilia);
                return ExisteFamilia;
            }
            else
            {
                return true;
            }
        }
    }
}
