using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsRangoPrecioN
    {
        public bool FnCRangoPrecioN(ClsRangoPrecio ORangoPrecio)
        {
            Boolean CreateRangoPrecio = new ClsRangoPrecioD().FnCRangoPrecioD(ORangoPrecio);
            return CreateRangoPrecio;
        }
        public List<ClsRangoPrecio> FnRRangoPrecioN()
        {
            List<ClsRangoPrecio> ORangoPrecio = new ClsRangoPrecioD().FnRRangoPrecioD();
            return ORangoPrecio;
        }
        public bool FnURangoPrecioN(ClsRangoPrecio ORangoPrecio)
        {
            if (ORangoPrecio.IdRangoPrecio != "" && ORangoPrecio.IdRangoPrecio != null)
            {
                Boolean UpdateRangoPrecio = new ClsRangoPrecioD().FnURangoPrecioD(ORangoPrecio);
                return UpdateRangoPrecio;
            }
            else
            {
                return false;
            }

        }
        public bool FnDRangoPrecioN(ClsRangoPrecio ORangoPrecio)
        {
            if (ORangoPrecio.IdRangoPrecio != "" && ORangoPrecio.IdRangoPrecio != null)
            {
                Boolean DeleteRangoPrecio = new ClsRangoPrecioD().FnDRangoPrecioD(ORangoPrecio);
                return DeleteRangoPrecio;
            }
            else
            {
                return false;
            }
        }
        public bool FnERangoPrecioN(ClsRangoPrecio ORangoPrecio)
        {
            if (ORangoPrecio.IdRangoPrecio != "" && ORangoPrecio.IdRangoPrecio != null)
            {
                Boolean ExisteRangoPrecio = new ClsRangoPrecioD().FnERangoPrecioD(ORangoPrecio);
                return ExisteRangoPrecio;
            }
            else
            {
                return true;
            }
        }
    }
}
