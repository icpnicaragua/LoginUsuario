using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsClienteN
    {
        public bool FnCClienteN(ClsCliente OCliente)
        {
            Boolean CreateCliente = new ClsClienteD().FnCClienteD(OCliente);
            return CreateCliente;
        }
        public List<ClsCliente> FnRClienteN()
        {
            List<ClsCliente> OCliente = new ClsClienteD().FnRClienteD();
            return OCliente;
        }
        public bool FnUClienteN(ClsCliente OCliente)
        {
            if (OCliente.IdCliente != "" && OCliente.IdCliente != null && 
                OCliente.ObjTipoCliente.IdTipoCliente != "" && OCliente.ObjTipoCliente.IdTipoCliente != null)
            {
                Boolean UpdateCliente = new ClsClienteD().FnUClienteD(OCliente);
                return UpdateCliente;
            }
            else
            {
                return false;
            }

        }
        public bool FnDClienteN(ClsCliente OCliente)
        {
            if (OCliente.IdCliente != "" && OCliente.IdCliente != null)
            {
                Boolean DeleteCliente = new ClsClienteD().FnDClienteD(OCliente);
                return DeleteCliente;
            }
            else
            {
                return false;
            }
        }
        public List<ClsCliente> FnRClienteNPersonaN()
        {
            List<ClsCliente> OCliente = new ClsClienteD().FnRClienteNPersonaD();
            return OCliente;
        }
        public List<ClsCliente> FnRClienteNEmpresaN()
        {
            List<ClsCliente> OCliente = new ClsClienteD().FnRClienteNEmpresaD();
            return OCliente;
        }
    }
}
