using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;


namespace CapaNegocio
{
    public class ClsTCambioN
    {
        public bool FechaActual(ClsTCambio OTCambio)
        {
            DateTime FechaOBJ = DateTime.Parse(OTCambio.Fecha);
            if (FechaOBJ < DateTime.Now)
            {
                return false;
            }
            else
            {
                return true;
            }

        }
        public bool FnCTCambioN(ClsTCambio OTCambio)
        {
            Boolean CreateTCambio;
            if (FechaActual(OTCambio))
            {
                CreateTCambio = new ClsTCambioD().FnCTCambioD(OTCambio);
            }
            else
            {
                CreateTCambio = false;
            }
            return CreateTCambio;
        }
        public List<ClsTCambio> FnRTCambioN()
        {
            DateTime f;
            List<ClsTCambio> OTCambio = new ClsTCambioD().FnRTCambioD();
            foreach (ClsTCambio Item in OTCambio)
            {
                f = DateTime.Parse(Item.Fecha);
                if (f <= DateTime.Now)
                {
                    Item.Editable = false;
                }
                else
                {
                    Item.Editable = true;
                }
            }
            return OTCambio;
        }
        public bool FnUTCambioN(ClsTCambio OTCambio)
        {
            Boolean UpdateTCambio;
            if (OTCambio.IdTCambio != "" && OTCambio.IdTCambio != null
                && OTCambio.ObjMoneda.IdMoneda != "" && OTCambio.ObjMoneda.IdMoneda != null
                && OTCambio.Fecha != "" && OTCambio.Fecha != null
                && OTCambio.TCambio != "" && OTCambio.TCambio != null
                )
            {
                if (FechaActual(OTCambio))
                {
                    UpdateTCambio = new ClsTCambioD().FnUTCambioD(OTCambio);
                }
                else
                {
                    UpdateTCambio = false;
                }
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
