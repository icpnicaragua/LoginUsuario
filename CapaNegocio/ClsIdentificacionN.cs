using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsIdentificacionN
    {
        public bool FnCIdentificacionN(ClsIdentificacion OIdentificacion)
        {
            Boolean CreateIdentificacion = new ClsIdentificacionD().FnCIdentificacionD(OIdentificacion);
            return CreateIdentificacion;
        }
        public List<ClsIdentificacion> FnRIdentificacionN(ClsIdentificacion OIdentifiacionN)
        {
            List<ClsIdentificacion> OIdentificacion = new ClsIdentificacionD().FnRIdentificacionD(OIdentifiacionN);
            return OIdentificacion;
        }
        public bool FnUIdentificacionN(ClsIdentificacion OIdentificacion)
        {
            if (OIdentificacion.IdIdentificacion != "" && OIdentificacion.IdIdentificacion != null && OIdentificacion.ObjTipoIdentificacion.IdTipoIdentificacion != "" && OIdentificacion.ObjTipoIdentificacion.IdTipoIdentificacion != null)
            {
                Boolean UpdateIdentificacion = new ClsIdentificacionD().FnUIdentificacionD(OIdentificacion);
                return UpdateIdentificacion;
            }
            else
            {
                return false;
            }

        }
        public bool FnDIdentificacionN(ClsIdentificacion OIdentificacion)
        {
            if (OIdentificacion.IdIdentificacion != "" && OIdentificacion.IdIdentificacion != null)
            {
                Boolean DeleteIdentificacion = new ClsIdentificacionD().FnDIdentificacionD(OIdentificacion);
                return DeleteIdentificacion;
            }
            else
            {
                return false;
            }
        }
        public bool FnEIdentificacionN(ClsIdentificacion OIdentificacion)
        {
            if (OIdentificacion.IdIdentificacion != "" && OIdentificacion.IdIdentificacion != null && OIdentificacion.ObjTipoIdentificacion.IdTipoIdentificacion != "" && OIdentificacion.ObjTipoIdentificacion.IdTipoIdentificacion != null)
            {
                Boolean ExisteIdentificacion = new ClsIdentificacionD().FnEIdentificacionD(OIdentificacion);
                return ExisteIdentificacion;
            }
            else
            {
                return true;
            }
        }

    }
}
