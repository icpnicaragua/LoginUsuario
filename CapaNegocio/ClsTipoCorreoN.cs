using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsTipoCorreoN
    {
        public bool FnCTipoCorreoN(ClsTipoCorreo OTipoCorreo)
        {
            Boolean CreateTipoCorreo = new ClsTipoCorreoD().FnCTipoCorreoD(OTipoCorreo);
            return CreateTipoCorreo;
        }
        public List<ClsTipoCorreo> FnRTipoCorreoN()
        {
            List<ClsTipoCorreo> OTipoCorreo = new ClsTipoCorreoD().FnRTipoCorreoD();
            return OTipoCorreo;
        }
        public bool FnUTipoCorreoN(ClsTipoCorreo OTipoCorreo)
        {
            if (OTipoCorreo.IdTipoCorreo != "" && OTipoCorreo.IdTipoCorreo != null)
            {
                Boolean UpdateTipoCorreo = new ClsTipoCorreoD().FnUTipoCorreoD(OTipoCorreo);
                return UpdateTipoCorreo;
            }
            else
            {
                return false;
            }

        }
        public bool FnDTipoCorreoN(ClsTipoCorreo OTipoCorreo)
        {
            if (OTipoCorreo.IdTipoCorreo != "" && OTipoCorreo.IdTipoCorreo != null)
            {
                Boolean DeleteTipoCorreo = new ClsTipoCorreoD().FnDTipoCorreoD(OTipoCorreo);
                return DeleteTipoCorreo;
            }
            else
            {
                return false;
            }
        }
        public bool FnETipoCorreoN(ClsTipoCorreo OTipoCorreo)
        {
            if (OTipoCorreo.IdTipoCorreo != "" && OTipoCorreo.IdTipoCorreo != null)
            {
                Boolean ExisteTipoCorreo = new ClsTipoCorreoD().FnETipoCorreoD(OTipoCorreo);
                return ExisteTipoCorreo;
            }
            else
            {
                return true;
            }
        }
    }
}
