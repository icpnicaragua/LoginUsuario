using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsCorreoN
    {
        public bool FnCCorreoN(ClsCorreo OCorreo)
        {
            Boolean CreateCorreo = new ClsCorreoD().FnCCorreoD(OCorreo);
            return CreateCorreo;
        }
        public List<ClsCorreo> FnRCorreoN(ClsCorreo OIdentifiacionN)
        {
            List<ClsCorreo> OCorreo = new ClsCorreoD().FnRCorreoD(OIdentifiacionN);
            return OCorreo;
        }
        public bool FnUCorreoN(ClsCorreo OCorreo)
        {
            if (OCorreo.IdCorreo != "" && OCorreo.IdCorreo != null && OCorreo.ObjTipoCorreo.IdTipoCorreo != "" && OCorreo.ObjTipoCorreo.IdTipoCorreo != null)
            {
                Boolean UpdateCorreo = new ClsCorreoD().FnUCorreoD(OCorreo);
                return UpdateCorreo;
            }
            else
            {
                return false;
            }

        }
        public bool FnDCorreoN(ClsCorreo OCorreo)
        {
            if (OCorreo.IdCorreo != "" && OCorreo.IdCorreo != null)
            {
                Boolean DeleteCorreo = new ClsCorreoD().FnDCorreoD(OCorreo);
                return DeleteCorreo;
            }
            else
            {
                return false;
            }
        }
        public bool FnECorreoN(ClsCorreo OCorreo)
        {
            if (OCorreo.IdCorreo != "" && OCorreo.IdCorreo != null && OCorreo.ObjTipoCorreo.IdTipoCorreo != "" && OCorreo.ObjTipoCorreo.IdTipoCorreo != null)
            {
                Boolean ExisteCorreo = new ClsCorreoD().FnECorreoD(OCorreo);
                return ExisteCorreo;
            }
            else
            {
                return true;
            }
        }
    }
}
