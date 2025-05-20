using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsInicioCajaN
    {
        public bool FnCInicioCajaN(ClsInicioCaja OInicioCaja)
        {
            Boolean CreateInicioCaja = new ClsInicioCajaD().FnCInicioCajaD(OInicioCaja);
            return CreateInicioCaja;
        }
        public List<ClsInicioCaja> FnRInicioCajaN()
        {
            List<ClsInicioCaja> OInicioCaja = new ClsInicioCajaD().FnRInicioCajaD();
            return OInicioCaja;
        }
        public bool FnUInicioCajaN(ClsInicioCaja OInicioCaja)
        {
            if (OInicioCaja.Fecha != "" && OInicioCaja.Fecha != null && OInicioCaja.IdInicioCaja != "" && OInicioCaja.IdInicioCaja != null)
            {
                Boolean UpdateInicioCaja = new ClsInicioCajaD().FnUInicioCajaD(OInicioCaja);
                return UpdateInicioCaja;
            }
            else
            {
                return false;
            }
        }
        public bool FnDInicioCajaN(ClsInicioCaja OInicioCaja)
        {
            if (OInicioCaja.IdInicioCaja != "" && OInicioCaja.IdInicioCaja != null)
            {
                Boolean DeleteInicioCaja = new ClsInicioCajaD().FnDInicioCajaD(OInicioCaja);
                return DeleteInicioCaja;
            }
            else
            {
                return false;
            }
        }
        public bool FnEInicioCajaN(ClsInicioCaja OInicioCaja)
        {
            if (OInicioCaja.IdInicioCaja != "" && OInicioCaja.IdInicioCaja != null && OInicioCaja.Fecha != "" && OInicioCaja.Fecha != null)
            {
                Boolean ExisteInicioCaja = new ClsInicioCajaD().FnEInicioCajaD(OInicioCaja);
                return ExisteInicioCaja;
            }
            else
            {
                return true;
            }
        }
        public List<ClsInicioCaja> FnRInicioCajaEstadoN(ClsInicioCaja OInicioCajaN)
        {
            List<ClsInicioCaja> OInicioCaja = new ClsInicioCajaD().FnRInicioCajaEstadoD(OInicioCajaN);
            return OInicioCaja;
        }
    }
}
