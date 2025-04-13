using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsEstadoCivilN
    {
        public bool FnCEstadoCivilN(ClsEstadoCivil OEstadoCivil)
        {
            Boolean CreateEstadoCivil = new ClsEstadoCivilD().FnCEstadoCivilD(OEstadoCivil);
            return CreateEstadoCivil;
        }
        public List<ClsEstadoCivil> FnREstadoCivilN()
        {
            List<ClsEstadoCivil> OEstadoCivil = new ClsEstadoCivilD().FnREstadoCivilD();
            return OEstadoCivil;
        }
        public bool FnUEstadoCivilN(ClsEstadoCivil OEstadoCivil)
        {
            if (OEstadoCivil.IdEstadoCivil != "" && OEstadoCivil.IdEstadoCivil != null)
            {
                Boolean UpdateEstadoCivil = new ClsEstadoCivilD().FnUEstadoCivilD(OEstadoCivil);
                return UpdateEstadoCivil;
            }
            else
            {
                return false;
            }

        }
        public bool FnDEstadoCivilN(ClsEstadoCivil OEstadoCivil)
        {
            if (OEstadoCivil.IdEstadoCivil != "" && OEstadoCivil.IdEstadoCivil != null)
            {
                Boolean DeleteEstadoCivil = new ClsEstadoCivilD().FnDEstadoCivilD(OEstadoCivil);
                return DeleteEstadoCivil;
            }
            else
            {
                return false;
            }
        }
        public bool FnEEstadoCivilN(ClsEstadoCivil OEstadoCivil)
        {
            if (OEstadoCivil.IdEstadoCivil != "" && OEstadoCivil.IdEstadoCivil != null)
            {
                Boolean ExisteEstadoCivil = new ClsEstadoCivilD().FnEEstadoCivilD(OEstadoCivil);
                return ExisteEstadoCivil;
            }
            else
            {
                return true;
            }
        }
    }
}
