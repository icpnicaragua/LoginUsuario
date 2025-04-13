using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsPromoN
    {
        public bool FnCPromoN(ClsPromo OPromo)
        {
            Boolean CreatePromo = new ClsPromoD().FnCPromoD(OPromo);
            return CreatePromo;
        }
        public List<ClsPromo> FnRPromoN()
        {
            List<ClsPromo> OPromo = new ClsPromoD().FnRPromoD();
            return OPromo;
        }
        public bool FnUPromoN(ClsPromo OPromo)
        {
            if (OPromo.IdPromo != "" && OPromo.IdPromo != null)
            {
                Boolean UpdatePromo = new ClsPromoD().FnUPromoD(OPromo);
                return UpdatePromo;
            }
            else
            {
                return false;
            }

        }
        public bool FnDPromoN(ClsPromo OPromo)
        {
            if (OPromo.IdPromo != "" && OPromo.IdPromo != null)
            {
                Boolean DeletePromo = new ClsPromoD().FnDPromoD(OPromo);
                return DeletePromo;
            }
            else
            {
                return false;
            }
        }
        public bool FnEPromoN(ClsPromo OPromo)
        {
            if (OPromo.IdPromo != "" && OPromo.IdPromo != null)
            {
                Boolean ExistePromo = new ClsPromoD().FnEPromoD(OPromo);
                return ExistePromo;
            }
            else
            {
                return true;
            }
        }
    }
}
