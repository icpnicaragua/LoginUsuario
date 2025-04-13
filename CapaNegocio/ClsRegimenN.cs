using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsRegimenN
    {
        public bool FnCRegimenN(ClsRegimen ORegimen)
        {
            Boolean CreateRegimen = new ClsRegimenD().FnCRegimenD(ORegimen);
            return CreateRegimen;
        }
        public List<ClsRegimen> FnRRegimenN()
        {
            List<ClsRegimen> ORegimen = new ClsRegimenD().FnRRegimenD();
            return ORegimen;
        }
        public bool FnURegimenN(ClsRegimen ORegimen)
        {
            if (ORegimen.IdRegimen != "" && ORegimen.IdRegimen != null)
            {
                Boolean UpdateRegimen = new ClsRegimenD().FnURegimenD(ORegimen);
                return UpdateRegimen;
            }
            else
            {
                return false;
            }

        }
        public bool FnDRegimenN(ClsRegimen ORegimen)
        {
            if (ORegimen.IdRegimen != "" && ORegimen.IdRegimen != null)
            {
                Boolean DeleteRegimen = new ClsRegimenD().FnDRegimenD(ORegimen);
                return DeleteRegimen;
            }
            else
            {
                return false;
            }
        }
        public bool FnERegimenN(ClsRegimen ORegimen)
        {
            if (ORegimen.IdRegimen != "" && ORegimen.IdRegimen != null)
            {
                Boolean ExisteRegimen = new ClsRegimenD().FnERegimenD(ORegimen);
                return ExisteRegimen;
            }
            else
            {
                return true;
            }
        }
    }
}
