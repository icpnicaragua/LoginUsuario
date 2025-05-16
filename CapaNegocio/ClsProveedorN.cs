using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsProveedorN
    {
        public bool FnCProveedorN(ClsProveedor OProveedor)
        {
            Boolean CreateProveedor = new ClsProveedorD().FnCProveedorD(OProveedor);
            return CreateProveedor;
        }
        public List<ClsProveedor> FnRProveedorN()
        {
            List<ClsProveedor> OProveedor = new ClsProveedorD().FnRProveedorD();
            return OProveedor;
        }
        public bool FnUProveedorN(ClsProveedor OProveedor)
        {
            if (OProveedor.IdProveedor != "" && OProveedor.IdProveedor != null)
            {
                Boolean UpdateProveedor = new ClsProveedorD().FnUProveedorD(OProveedor);
                return UpdateProveedor;
            }
            else
            {
                return false;
            }
        }
        public bool FnDProveedorN(ClsProveedor OProveedor)
        {
            if (OProveedor.IdProveedor != "" && OProveedor.IdProveedor != null)
            {
                Boolean DeleteProveedor = new ClsProveedorD().FnDProveedorD(OProveedor);
                return DeleteProveedor;
            }
            else
            {
                return false;
            }
        }
        public List<ClsProveedor> FnRProveedorNPersonaN()
        {
            List<ClsProveedor> OProveedor = new ClsProveedorD().FnRProveedorNPersonaD();
            return OProveedor;
        }
        public List<ClsProveedor> FnRProveedorNEmpresaN()
        {
            List<ClsProveedor> OProveedor = new ClsProveedorD().FnRProveedorNEmpresaD();
            return OProveedor;
        }
    }
}
