using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsFinCajaN
    {
        public bool FnCFinCajaN(ClsFinCaja OFinCaja)
        {
            Boolean CreateFinCaja = new ClsFinCajaD().FnCFinCajaD(OFinCaja);
            return CreateFinCaja;
        }
        public List<ClsFinCaja> FnRFinCajaN()
        {
            List<ClsFinCaja> OFinCaja = new ClsFinCajaD().FnRFinCajaD();
            return OFinCaja;
        }
        public bool FnUFinCajaN(ClsFinCaja OFinCaja)
        {         
                if (OFinCaja.ObjCajero.IdEmpleado != "" && OFinCaja.ObjCajero.IdEmpleado != null && OFinCaja.IdFinCaja != "" && OFinCaja.IdFinCaja != null)
                {
                    Boolean UpdateFinCaja = new ClsFinCajaD().FnUFinCajaD(OFinCaja);
                    return UpdateFinCaja;
                }
                else
                {
                    return false;
                }
         
          
        }
        public bool FnDFinCajaN(ClsFinCaja OFinCaja)
        {         
                if (OFinCaja.IdFinCaja != "" && OFinCaja.IdFinCaja != null)
                {
                    Boolean DeleteFinCaja = new ClsFinCajaD().FnDFinCajaD(OFinCaja);
                    return DeleteFinCaja;
                }
                else
                {
                    return false;
                }
          
        }
        public bool FnOFinCajaN(ClsFinCaja OFinCaja)
        {
            if (OFinCaja.IdFinCaja != "" && OFinCaja.IdFinCaja != null)
            {
                Boolean OpenFinCaja = new ClsFinCajaD().FnOFinCajaD(OFinCaja);
                return OpenFinCaja;
            }
            else
            {
                return false;
            }

        }

    }
}
