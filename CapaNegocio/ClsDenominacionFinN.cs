using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsDenominacionFinN
    {
        public bool FnCUEDenominacionFinN(ClsDenominacionFinCaja ODenominacionFin)
        {
            if (ODenominacionFin.ObjFinCaja.IdFinCaja != "" && ODenominacionFin.ObjFinCaja.IdFinCaja != null &&
                ODenominacionFin.Cantidad != "" && ODenominacionFin.Cantidad != null &&
                ODenominacionFin.ObjDenominacionCS.IdDenominacion != "" && ODenominacionFin.ObjDenominacionCS.IdDenominacion != null)
            {
                Boolean CreateDenominacionFin = new ClsDenominacionFinD().FnCUEDenominacionFinD(ODenominacionFin);
                return CreateDenominacionFin;
            }
            else
            {
                return false;
            }
        }
        public List<ClsDenominacionFinCaja> FnRDenominacionFinN(ClsDenominacionFinCaja ODenominacionFinN)
        {
            List<ClsDenominacionFinCaja> ODenominacionFin = new ClsDenominacionFinD().FnRDenominacionFinD(ODenominacionFinN);
            return ODenominacionFin;
        }

        public bool FnCerrarDenominacionFinN(ClsDenominacionFinCaja ODenominacionFin)
        {
            if (ODenominacionFin.ObjFinCaja.IdFinCaja != "" && ODenominacionFin.ObjFinCaja.IdFinCaja != null)
            {
                Boolean CerrarDenominacionFin = new ClsDenominacionFinD().FnCerrarDenominacionFinD(ODenominacionFin);
                return CerrarDenominacionFin;
            }
            else
            {
                return false;
            }
        }
    }
}
