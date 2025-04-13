using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsTipoClienteN
    {
        public bool FnCTipoClienteN(ClsTipoCliente OTipoCliente)
        {
            Boolean CreateTipoCliente = new ClsTipoClienteD().FnCTipoClienteD(OTipoCliente);
            return CreateTipoCliente;
        }
        public List<ClsTipoCliente> FnRTipoClienteN()
        {
            List<ClsTipoCliente> OTipoCliente = new ClsTipoClienteD().FnRTipoClienteD();
            return OTipoCliente;
        }
        public bool FnUTipoClienteN(ClsTipoCliente OTipoCliente)
        {
            if (OTipoCliente.IdTipoCliente != "" && OTipoCliente.IdTipoCliente != null)
            {
                Boolean UpdateTipoCliente = new ClsTipoClienteD().FnUTipoClienteD(OTipoCliente);
                return UpdateTipoCliente;
            }
            else
            {
                return false;
            }

        }
        public bool FnDTipoClienteN(ClsTipoCliente OTipoCliente)
        {
            if (OTipoCliente.IdTipoCliente != "" && OTipoCliente.IdTipoCliente != null)
            {
                Boolean DeleteTipoCliente = new ClsTipoClienteD().FnDTipoClienteD(OTipoCliente);
                return DeleteTipoCliente;
            }
            else
            {
                return false;
            }
        }
        public bool FnETipoClienteN(ClsTipoCliente OTipoCliente)
        {
            if (OTipoCliente.IdTipoCliente != "" && OTipoCliente.IdTipoCliente != null)
            {
                Boolean ExisteTipoCliente = new ClsTipoClienteD().FnETipoClienteD(OTipoCliente);
                return ExisteTipoCliente;
            }
            else
            {
                return true;
            }
        }
    }
}
