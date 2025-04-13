using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsPagoSobreN
    {
        public bool FnCPagoSobreN(ClsPagoSobre OPagoSobre)
        {
            Boolean CreatePagoSobre = new ClsPagoSobreD().FnCPagoSobreD(OPagoSobre);
            return CreatePagoSobre;
        }
        public List<ClsPagoSobre> FnRPagoSobreN()
        {
            List<ClsPagoSobre> OPagoSobre = new ClsPagoSobreD().FnRPagoSobreD();
            return OPagoSobre;
        }
        public bool FnUPagoSobreN(ClsPagoSobre OPagoSobre)
        {
            if (OPagoSobre.IdPagoSobre != "" && OPagoSobre.IdPagoSobre != null)
            {
                Boolean UpdatePagoSobre = new ClsPagoSobreD().FnUPagoSobreD(OPagoSobre);
                return UpdatePagoSobre;
            }
            else
            {
                return false;
            }

        }
        public bool FnDPagoSobreN(ClsPagoSobre OPagoSobre)
        {
            if (OPagoSobre.IdPagoSobre != "" && OPagoSobre.IdPagoSobre != null)
            {
                Boolean DeletePagoSobre = new ClsPagoSobreD().FnDPagoSobreD(OPagoSobre);
                return DeletePagoSobre;
            }
            else
            {
                return false;
            }
        }
        public bool FnEPagoSobreN(ClsPagoSobre OPagoSobre)
        {
            if (OPagoSobre.IdPagoSobre != "" && OPagoSobre.IdPagoSobre != null)
            {
                Boolean ExistePagoSobre = new ClsPagoSobreD().FnEPagoSobreD(OPagoSobre);
                return ExistePagoSobre;
            }
            else
            {
                return true;
            }
        }
    }
}
