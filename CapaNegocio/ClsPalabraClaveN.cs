using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsPalabraClaveN
    {
        public bool FnCPalabraClaveN(ClsPalabraClave OPalabraClave)
        {
            Boolean CreatePalabraClave = new ClsPalabraClaveD().FnCPalabraClaveD(OPalabraClave);
            return CreatePalabraClave;
        }
        public List<ClsPalabraClave> FnRPalabraClaveN()
        {
            List<ClsPalabraClave> OPalabraClave = new ClsPalabraClaveD().FnRPalabraClaveD();
            return OPalabraClave;
        }
        public bool FnUPalabraClaveN(ClsPalabraClave OPalabraClave)
        {
            if (OPalabraClave.IdPalabraClave != "" && OPalabraClave.IdPalabraClave != null)
            {
                Boolean UpdatePalabraClave = new ClsPalabraClaveD().FnUPalabraClaveD(OPalabraClave);
                return UpdatePalabraClave;
            }
            else
            {
                return false;
            }

        }
        public bool FnDPalabraClaveN(ClsPalabraClave OPalabraClave)
        {
            if (OPalabraClave.IdPalabraClave != "" && OPalabraClave.IdPalabraClave != null)
            {
                Boolean DeletePalabraClave = new ClsPalabraClaveD().FnDPalabraClaveD(OPalabraClave);
                return DeletePalabraClave;
            }
            else
            {
                return false;
            }
        }
        public bool FnEPalabraClaveN(ClsPalabraClave OPalabraClave)
        {
            if (OPalabraClave.IdPalabraClave != "" && OPalabraClave.IdPalabraClave != null)
            {
                Boolean ExistePalabraClave = new ClsPalabraClaveD().FnEPalabraClaveD(OPalabraClave);
                return ExistePalabraClave;
            }
            else
            {
                return true;
            }
        }
    }
}
