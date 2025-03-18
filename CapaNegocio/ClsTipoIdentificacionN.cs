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
    public class ClsTipoIdentificacionN
    {
        public bool FnCTipoIdentificacionN(ClsTipoIdentificacion OTipoIdentificacion)
        {
            Boolean CreateTipoIdentificacion = new ClsTipoIdentifiacionD().FnCTipoIdentificacionD(OTipoIdentificacion);
            return CreateTipoIdentificacion;
        }
        public List<ClsTipoIdentificacion> FnRTipoIdentificacionN()
        {
            List<ClsTipoIdentificacion> OTipoIdentificacion = new ClsTipoIdentifiacionD().FnRTipoIdentifiacionD();
            return OTipoIdentificacion;
        }
        public bool FnUTipoIdentificacionN(ClsTipoIdentificacion OTipoIdentificacion)
        {
            if (OTipoIdentificacion.IdTipoIdentificacion != "" && OTipoIdentificacion.IdTipoIdentificacion != null)
            {
                Boolean UpdateTipoIdentificacion = new ClsTipoIdentifiacionD().FnUTipoidentificacionD(OTipoIdentificacion);
                return UpdateTipoIdentificacion;
            }
            else
            {
                return false;
            }

        }
        public bool FnDTipoIdentificacionN(ClsTipoIdentificacion OTipoIdentificacion)
        {
            if (OTipoIdentificacion.IdTipoIdentificacion != "" && OTipoIdentificacion.IdTipoIdentificacion != null)
            {
                Boolean DeleteTipoIdentificacion = new ClsTipoIdentifiacionD().FnDTipoIdentificacionD(OTipoIdentificacion);
                return DeleteTipoIdentificacion;
            }
            else
            {
                return false;
            }
        }
        public bool FnETipoIdentificacionN(ClsTipoIdentificacion OTipoIdentificacion)
        {
            if (OTipoIdentificacion.IdTipoIdentificacion != "" && OTipoIdentificacion.IdTipoIdentificacion != null)
            {
                Boolean ExisteTipoIdentificacion = new ClsTipoIdentifiacionD().FnETipoIdentifiacion(OTipoIdentificacion);
                return ExisteTipoIdentificacion;
            }
            else
            {
                return true;
            }
        }

    }
}
