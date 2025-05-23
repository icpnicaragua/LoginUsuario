using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsDenominacionInicioN
    {
        public bool FnCUEDenominacionInicioN(ClsDenominacionInicio ODenominacionInicio)
        {
            if (ODenominacionInicio.ObjInicioCaja.IdInicioCaja != "" && ODenominacionInicio.ObjInicioCaja.IdInicioCaja != null &&
                ODenominacionInicio.Cantidad!= "" && ODenominacionInicio.Cantidad != null &&
                ODenominacionInicio.ObjDenominacionCS.IdDenominacion!= "" && ODenominacionInicio.ObjDenominacionCS.IdDenominacion != null)
            {
                Boolean CreateDenominacionInicio = new ClsDenominacionInicioD().FnCUEDenominacionInicioD(ODenominacionInicio);
                return CreateDenominacionInicio;
            }
            else
            {
                return false;
            }            
        }
        public List<ClsDenominacionInicio> FnRDenominacionInicioN(ClsDenominacionInicio ODenominacionIncioN)
        {
            List<ClsDenominacionInicio> ODenominacionInicio = new ClsDenominacionInicioD().FnRDenominacionInicioD(ODenominacionIncioN);
            return ODenominacionInicio;
        }
        

                public bool FnCerrarDenominacionInicioN(ClsDenominacionInicio ODenominacionInicio)
        {
            if (ODenominacionInicio.ObjInicioCaja.IdInicioCaja != "" && ODenominacionInicio.ObjInicioCaja.IdInicioCaja != null)
            {
                Boolean CerrarDenominacionInicio = new ClsDenominacionInicioD().FnCerrarDenominacionInicioD(ODenominacionInicio);
                return CerrarDenominacionInicio;
            }
            else
            {
                return false;
            }
        }
    }
}
