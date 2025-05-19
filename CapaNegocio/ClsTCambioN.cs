using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;


namespace CapaNegocio
{
    public class ClsTCambioN
    {
        public bool FnCTCambioN(ClsTCambio OTCambio)
        {
            Boolean CreateTCambio = new ClsTCambioD().FnCTCambioD(OTCambio);
            return CreateTCambio;
        }
        public List<ClsTCambio> FnRTCambioN()
        {
            List<ClsTCambio> OTCambio = new ClsTCambioD().FnRTCambioD();
            return OTCambio;
        }
        public bool FnUTCambioN(ClsTCambio OTCambio)
        {
            if (OTCambio.IdTCambio != "" && OTCambio.IdTCambio != null 
                && OTCambio.ObjMoneda.IdMoneda != "" && OTCambio.ObjMoneda.IdMoneda != null
                && OTCambio.Fecha != "" && OTCambio.Fecha != null
                && OTCambio.TCambio != "" && OTCambio.TCambio != null
                )
            {
                Boolean UpdateTCambio = new ClsTCambioD().FnUTCambioD(OTCambio);
                return UpdateTCambio;
            }
            else
            {
                return false;
            }

        }
        public bool FnDTCambioN(ClsTCambio OTCambio)
        {
            if (OTCambio.IdTCambio != "" && OTCambio.IdTCambio != null)
            {
                Boolean DeleteTCambio = new ClsTCambioD().FnDTCambioD(OTCambio);
                return DeleteTCambio;
            }
            else
            {
                return false;
            }
        }
        public bool FnETCambioN(ClsTCambio OTCambio)
        {
            if (OTCambio.IdTCambio != "" && OTCambio.IdTCambio != null && 
                OTCambio.ObjMoneda.IdMoneda != "" && OTCambio.ObjMoneda.IdMoneda != null &&
                OTCambio.Fecha != "" && OTCambio.Fecha != null
                )
            {
                Boolean ExisteTCambio = new ClsTCambioD().FnETCambioD(OTCambio);
                return ExisteTCambio;
            }
            else
            {
                return true;
            }
        }
    }
}
