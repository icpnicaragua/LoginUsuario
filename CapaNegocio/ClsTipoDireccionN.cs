using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaDato.mve;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsTipoDireccionN
    {
        public bool FnCTipoDireccionN(ClsTipoDireccion OTipoDireccion)
        {
            Boolean CreateTipoDireccion = new ClsTipoDireccionD().FnCTipoDireccionD(OTipoDireccion);
            return CreateTipoDireccion;
        }
        public List<ClsTipoDireccion> FnRTipoDireccionN()
        {
            List<ClsTipoDireccion> OTipoDireccion = new ClsTipoDireccionD().FnRTipoDireccionD();
            return OTipoDireccion;
        }
        public bool FnUTipoDireccionN(ClsTipoDireccion OTipoDireccion)
        {
            if (OTipoDireccion.IdTipoDireccion != "" && OTipoDireccion.IdTipoDireccion != null)
            {
                Boolean UpdateTipoDireccion = new ClsTipoDireccionD().FnUTipoDireccionD(OTipoDireccion);
                return UpdateTipoDireccion;
            }
            else
            {
                return false;
            }

        }
        public bool FnDTipoDireccionN(ClsTipoDireccion OTipoDireccion)
        {
            if (OTipoDireccion.IdTipoDireccion != "" && OTipoDireccion.IdTipoDireccion != null)
            {
                Boolean DeleteTipoDireccion = new ClsTipoDireccionD().FnDTipoDireccionD(OTipoDireccion);
                return DeleteTipoDireccion;
            }
            else
            {
                return false;
            }
        }
        public bool FnETipoDireccionN(ClsTipoDireccion OTipoDireccion)
        {
            if (OTipoDireccion.IdTipoDireccion != "" && OTipoDireccion.IdTipoDireccion != null)
            {
                Boolean ExisteTipoDireccion = new ClsTipoDireccionD().FnETipoDireccionD(OTipoDireccion);
                return ExisteTipoDireccion;
            }
            else
            {
                return true;
            }
        }
    }
}
