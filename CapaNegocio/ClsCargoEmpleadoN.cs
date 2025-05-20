using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsCargoEmpleadoN
    {
        public bool FnCCargoEmpleadoN(ClsCargoEmpleado OCargoEmpleado)
        {
            Boolean CreateCargoEmpleado = new ClsCargoEmpleadoD().FnCCargoEmpleadoD(OCargoEmpleado);
            return CreateCargoEmpleado;
        }
        public List<ClsCargoEmpleado> FnRCargoEmpleadoN()
        {
            List<ClsCargoEmpleado> OCargoEmpleado = new ClsCargoEmpleadoD().FnRCargoEmpleadoD();
            return OCargoEmpleado;
        }
        public bool FnUCargoEmpleadoN(ClsCargoEmpleado OCargoEmpleado)
        {
            if (OCargoEmpleado.IdCargoEmpleado != "" && OCargoEmpleado.IdCargoEmpleado != null && OCargoEmpleado.ObjCargo.IdCargo != "" && OCargoEmpleado.ObjCargo.IdCargo != null)
            {
                Boolean UpdateCargoEmpleado = new ClsCargoEmpleadoD().FnUCargoEmpleadoD(OCargoEmpleado);
                return UpdateCargoEmpleado;
            }
            else
            {
                return false;
            }

        }
        public bool FnDCargoEmpleadoN(ClsCargoEmpleado OCargoEmpleado)
        {
            if (OCargoEmpleado.IdCargoEmpleado != "" && OCargoEmpleado.IdCargoEmpleado != null)
            {
                Boolean DeleteCargoEmpleado = new ClsCargoEmpleadoD().FnDCargoEmpleadoD(OCargoEmpleado);
                return DeleteCargoEmpleado;
            }
            else
            {
                return false;
            }
        }
        public bool FnECargoEmpleadoN(ClsCargoEmpleado OCargoEmpleado)
        {
            if (OCargoEmpleado.IdCargoEmpleado != "" && OCargoEmpleado.IdCargoEmpleado != null && 
                OCargoEmpleado.ObjCargo.IdCargo != "" && OCargoEmpleado.ObjCargo.IdCargo != null &&
                OCargoEmpleado.ObjEmpleado.IdEmpleado != "" && OCargoEmpleado.ObjEmpleado.IdEmpleado != null)
            {
                Boolean ExisteCargoEmpleado = new ClsCargoEmpleadoD().FnECargoEmpleadoD(OCargoEmpleado);
                return ExisteCargoEmpleado;
            }
            else
            {
                return true;
            }
        }

        #region RegCajero
        public List<ClsCargoEmpleado> FnRCajeroN()
        {
            List<ClsCargoEmpleado> OCajero = new ClsCargoEmpleadoD().FnRCajeroD();
            return OCajero;
        }
        #endregion
    }
}
