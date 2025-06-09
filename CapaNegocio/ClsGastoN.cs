using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsGastoN
    {
        public bool FnCGastoN(ClsGastos OGasto)
        {
            Boolean CreateGasto = new ClsGastoD().FnCGastoD(OGasto);
            return CreateGasto;
        }
        public List<ClsGastos> FnRGastoN()
        {
            List<ClsGastos> OGasto = new ClsGastoD().FnRGastoD();
            return OGasto;
        }
        public bool FnUGastoN(ClsGastos OGasto)
        {
            if (OGasto.IdGasto != "" && OGasto.IdGasto != null &&
                OGasto.ObjTipoGasto.IdTipoGasto != "" && OGasto.ObjTipoGasto.IdTipoGasto != null &&
                OGasto.ObjAutorizadopor.IdEmpleado != "" && OGasto.ObjAutorizadopor.IdEmpleado != null
                )
            {
                Boolean UpdateGasto = new ClsGastoD().FnUGastoD(OGasto);
                return UpdateGasto;
            }
            else
            {
                return false;
            }

        }
        public bool FnDGastoN(ClsGastos OGasto)
        {
            if (OGasto.IdGasto != "" && OGasto.IdGasto != null)
            {
                Boolean DeleteGasto = new ClsGastoD().FnDGastoD(OGasto);
                return DeleteGasto;
            }
            else
            {
                return false;
            }
        }
        public bool FnEGastoN(ClsGastos OGasto)
        {
            if (OGasto.IdGasto != "" && OGasto.IdGasto != null)
            {
                Boolean ExisteGasto = new ClsGastoD().FnEGastoD(OGasto);
                return ExisteGasto;
            }
            else
            {
                return true;
            }
        }

        public List<ClsGastos> FnRGastoICN(ClsGastos OGastoN)
        {
            List<ClsGastos> OGasto = new ClsGastoD().FnRGastoICD(OGastoN);
            return OGasto;
        }
    }
}

