using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsTipoTelefonoN
    {
        public bool FnCTipoTelefonoN(ClsTipoTelefono OTipoTelefono)
        {
            Boolean CreateTipoTelefono = new ClsTipoTelefonoD().FnCTipoTelefonoD(OTipoTelefono);
            return CreateTipoTelefono;
        }
        public List<ClsTipoTelefono> FnRTipoTelefonoN()
        {
            List<ClsTipoTelefono> OTipoTelefono = new ClsTipoTelefonoD().FnRTipoTelefonoD();
            return OTipoTelefono;
        }
        public bool FnUTipoTelefonoN(ClsTipoTelefono OTipoTelefono)
        {
            if (OTipoTelefono.IdTipoTelefono != "" && OTipoTelefono.IdTipoTelefono != null)
            {
                Boolean UpdateTipoTelefono = new ClsTipoTelefonoD().FnUTipoTelefonoD(OTipoTelefono);
                return UpdateTipoTelefono;
            }
            else
            {
                return false;
            }

        }
        public bool FnDTipoTelefonoN(ClsTipoTelefono OTipoTelefono)
        {
            if (OTipoTelefono.IdTipoTelefono != "" && OTipoTelefono.IdTipoTelefono != null)
            {
                Boolean DeleteTipoTelefono = new ClsTipoTelefonoD().FnDTipoTelefonoD(OTipoTelefono);
                return DeleteTipoTelefono;
            }
            else
            {
                return false;
            }
        }
        public bool FnETipoTelefonoN(ClsTipoTelefono OTipoTelefono)
        {
            if (OTipoTelefono.IdTipoTelefono != "" && OTipoTelefono.IdTipoTelefono != null)
            {
                Boolean ExisteTipoTelefono = new ClsTipoTelefonoD().FnETipoTelefonoD(OTipoTelefono);
                return ExisteTipoTelefono;
            }
            else
            {
                return true;
            }
        }
    }
}
