using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsTipoGastoN
    {
        public bool FnCTipoGastoN(ClsTipoGasto OTipoGasto)
        {
            Boolean CreateTipoGasto = new ClsTipoGastoD().FnCTipoGastoD(OTipoGasto);
            return CreateTipoGasto;
        }
        public List<ClsTipoGasto> FnRTipoGastoN()
        {
            List<ClsTipoGasto> OTipoGasto = new ClsTipoGastoD().FnRTipoGastoD();
            return OTipoGasto;
        }
        public bool FnUTipoGastoN(ClsTipoGasto OTipoGasto)
        {
            if (OTipoGasto.IdTipoGasto != "" && OTipoGasto.IdTipoGasto != null)
            {
                Boolean UpdateTipoGasto = new ClsTipoGastoD().FnUTipoGastoD(OTipoGasto);
                return UpdateTipoGasto;
            }
            else
            {
                return false;
            }

        }
        public bool FnDTipoGastoN(ClsTipoGasto OTipoGasto)
        {
            if (OTipoGasto.IdTipoGasto != "" && OTipoGasto.IdTipoGasto != null)
            {
                Boolean DeleteTipoGasto = new ClsTipoGastoD().FnDTipoGastoD(OTipoGasto);
                return DeleteTipoGasto;
            }
            else
            {
                return false;
            }
        }
        public bool FnETipoGastoN(ClsTipoGasto OTipoGasto)
        {
            if (OTipoGasto.IdTipoGasto != "" && OTipoGasto.IdTipoGasto != null)
            {
                Boolean ExisteTipoGasto = new ClsTipoGastoD().FnETipoGastoD(OTipoGasto);
                return ExisteTipoGasto;
            }
            else
            {
                return true;
            }
        }
    }
}
