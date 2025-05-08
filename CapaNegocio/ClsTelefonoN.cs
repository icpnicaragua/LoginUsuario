using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsTelefonoN
    {
        public bool FnCTelefonoN(ClsTelefono OTelefono)
        {
            Boolean CreateTelefono = new ClsTelefonoD().FnCTelefonoD(OTelefono);
            return CreateTelefono;
        }
        public List<ClsTelefono> FnRTelefonoN(ClsTelefono OTelefonoN)
        {
            List<ClsTelefono> OTelefono = new ClsTelefonoD().FnRTelefonoD(OTelefonoN);
            return OTelefono;
        }
        public bool FnUTelefonoN(ClsTelefono OTelefono)
        {
            if (OTelefono.IdTelefono != "" && OTelefono.IdTelefono != null && OTelefono.ObjTipoTelefono.IdTipoTelefono != "" && OTelefono.ObjTipoTelefono.IdTipoTelefono != null)
            {
                Boolean UpdateTelefono = new ClsTelefonoD().FnUTelefonoD(OTelefono);
                return UpdateTelefono;
            }
            else
            {
                return false;
            }

        }
        public bool FnDTelefonoN(ClsTelefono OTelefono)
        {
            if (OTelefono.IdTelefono != "" && OTelefono.IdTelefono != null)
            {
                Boolean DeleteTelefono = new ClsTelefonoD().FnDTelefonoD(OTelefono);
                return DeleteTelefono;
            }
            else
            {
                return false;
            }
        }
        public bool FnETelefonoN(ClsTelefono OTelefono)
        {
            if (OTelefono.IdTelefono != "" && OTelefono.IdTelefono != null && OTelefono.ObjTipoTelefono.IdTipoTelefono != "" && OTelefono.ObjTipoTelefono.IdTipoTelefono != null)
            {
                Boolean ExisteTelefono = new ClsTelefonoD().FnETelefonoD(OTelefono);
                return ExisteTelefono;
            }
            else
            {
                return true;
            }
        }

    }
}
