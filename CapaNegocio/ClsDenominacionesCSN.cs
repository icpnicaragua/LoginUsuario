using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsDenominacionesCSN
    {
        public bool FnCDenominacionesCSN(ClsDenominacionesCS ODenominacionesCS)
        {
            Boolean CreateDenominacionesCS = new ClsDenominacionesCSD().FnCDenominacionesCSD(ODenominacionesCS);
            return CreateDenominacionesCS;
        }
        public List<ClsDenominacionesCS> FnRDenominacionesCSN()
        {
            List<ClsDenominacionesCS> ODenominacionesCS = new ClsDenominacionesCSD().FnRDenominacionesCSD();
            return ODenominacionesCS;
        }
        public bool FnUDenominacionesCSN(ClsDenominacionesCS ODenominacionesCS)
        {
            if (ODenominacionesCS.IdDenominacion != "" && ODenominacionesCS.IdDenominacion != null)
            {
                Boolean UpdateDenominacionesCS = new ClsDenominacionesCSD().FnUDenominacionesCSD(ODenominacionesCS);
                return UpdateDenominacionesCS;
            }
            else
            {
                return false;
            }

        }
        public bool FnDDenominacionesCSN(ClsDenominacionesCS ODenominacionesCS)
        {
            if (ODenominacionesCS.IdDenominacion != "" && ODenominacionesCS.IdDenominacion != null)
            {
                Boolean DeleteDenominacionesCS = new ClsDenominacionesCSD().FnDDenominacionesCSD(ODenominacionesCS);
                return DeleteDenominacionesCS;
            }
            else
            {
                return false;
            }
        }
        public bool FnEDenominacionesCSN(ClsDenominacionesCS ODenominacionesCS)
        {
            if (ODenominacionesCS.IdDenominacion != "" && ODenominacionesCS.IdDenominacion != null)
            {
                Boolean ExisteDenominacionesCS = new ClsDenominacionesCSD().FnEDenominacionesCSD(ODenominacionesCS);
                return ExisteDenominacionesCS;
            }
            else
            {
                return true;
            }
        }

    }
}
