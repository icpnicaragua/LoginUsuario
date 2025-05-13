using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsSucursalN
    {
        public List<ClsSucursal> FnRSucursalN()
        {
            List<ClsSucursal> OSucursal = new ClsSucursalD().FnRSucursalD();
            return OSucursal;
        }
    }
}
