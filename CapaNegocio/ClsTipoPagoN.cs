using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsTipoPagoN
    {
        public bool FnCTipoPagoN(ClsTipoPago OTipoPago)
        {
            Boolean CreateTipoPago = new ClsTipoPagoD().FnCTipoPagoD(OTipoPago);
            return CreateTipoPago;
        }
        public List<ClsTipoPago> FnRTipoPagoN()
        {
            List<ClsTipoPago> OTipoPago = new ClsTipoPagoD().FnRTipoPagoD();
            return OTipoPago;
        }
        public bool FnUTipoPagoN(ClsTipoPago OTipoPago)
        {
            if (OTipoPago.IdTipoPago != "" && OTipoPago.IdTipoPago != null)
            {
                Boolean UpdateTipoPago = new ClsTipoPagoD().FnUTipoPagoD(OTipoPago);
                return UpdateTipoPago;
            }
            else
            {
                return false;
            }

        }
        public bool FnDTipoPagoN(ClsTipoPago OTipoPago)
        {
            if (OTipoPago.IdTipoPago != "" && OTipoPago.IdTipoPago != null)
            {
                Boolean DeleteTipoPago = new ClsTipoPagoD().FnDTipoPagoD(OTipoPago);
                return DeleteTipoPago;
            }
            else
            {
                return false;
            }
        }
        public bool FnETipoPagoN(ClsTipoPago OTipoPago)
        {
            if (OTipoPago.IdTipoPago != "" && OTipoPago.IdTipoPago != null)
            {
                Boolean ExisteTipoPago = new ClsTipoPagoD().FnETipoPagoD(OTipoPago);
                return ExisteTipoPago;
            }
            else
            {
                return true;
            }
        }
    }
}
