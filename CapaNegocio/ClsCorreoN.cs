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

        #region RegPersona
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
        #endregion

        #region RegEmpresa
        public bool FnCCorreoEmpresaN(ClsCorreo OCorreoEmpresa)
        {
            Boolean CreateCorreoEmpresa = new ClsCorreoD().FnCCorreoEmpresaD(OCorreoEmpresa);
            return CreateCorreoEmpresa;
        }

        public List<ClsCorreo> FnRCorreoEmpresaN(ClsCorreo OIdentifiacionEmpresaN)
        {
            List<ClsCorreo> OCorreoEmpresa = new ClsCorreoD().FnRCorreoEmpresaD(OIdentifiacionEmpresaN);
            return OCorreoEmpresa;
        }
        public bool FnECorreoEmpresaN(ClsCorreo OCorreoEmpresa)
        {
            if (OCorreoEmpresa.IdCorreo != "" && OCorreoEmpresa.IdCorreo != null && OCorreoEmpresa.ObjTipoCorreo.IdTipoCorreo != "" && OCorreoEmpresa.ObjTipoCorreo.IdTipoCorreo != null)
            {
                Boolean ExisteCorreoEmpresa = new ClsCorreoD().FnECorreoEmpresaD(OCorreoEmpresa);
                return ExisteCorreoEmpresa;
            }
            else
            {
                return true;
            }
        }

        #endregion
    }
}
