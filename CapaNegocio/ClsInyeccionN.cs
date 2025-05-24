using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;
namespace CapaNegocio
{
    public class ClsInyeccionN
    {
        public bool FnCInyeccionN(ClsInyeccion OInyeccion)
        {
            if (OInyeccion.ObjInicioCaja.IdInicioCaja != "" && OInyeccion.ObjInicioCaja.IdInicioCaja != null &&
                OInyeccion.ObjCajero.IdEmpleado != "" && OInyeccion.ObjCajero.IdEmpleado != null &&
                OInyeccion.Cantidad != "" && OInyeccion.Cantidad != null &&
                OInyeccion.ObjRealizadoPor.IdEmpleado != "" && OInyeccion.ObjRealizadoPor.IdEmpleado != null &&
                OInyeccion.Hora != "" && OInyeccion.Hora != null)
            {
                Boolean CreateInyeccion = new ClsInyeccionD().FnCInyeccionD(OInyeccion);
            return CreateInyeccion;
            }
            else
            {
                return false;
            }
        }
        public List<ClsInyeccion> FnRInyeccionN()
        {
            List<ClsInyeccion> OInyeccion = new ClsInyeccionD().FnRInyeccionD();
            return OInyeccion;
        }
        public bool FnUInyeccionN(ClsInyeccion OInyeccion)
        {
            if (OInyeccion.IdInyeccion != "" && OInyeccion.IdInyeccion != null &&
                OInyeccion.ObjCajero.IdEmpleado != "" && OInyeccion.ObjCajero.IdEmpleado != null &&
                OInyeccion.Cantidad != "" && OInyeccion.Cantidad != null &&
                OInyeccion.ObjRealizadoPor.IdEmpleado != "" && OInyeccion.ObjRealizadoPor.IdEmpleado != null)
            {
                Boolean UpdateInyeccion = new ClsInyeccionD().FnUInyeccionD(OInyeccion);
                return UpdateInyeccion;
            }
            else
            {
                return false;
            }

        }
        public bool FnDInyeccionN(ClsInyeccion OInyeccion)
        {
            if (OInyeccion.IdInyeccion != "" && OInyeccion.IdInyeccion != null)
            {
                Boolean DeleteInyeccion = new ClsInyeccionD().FnDInyeccionD(OInyeccion);
                return DeleteInyeccion;
            }
            else
            {
                return false;
            }
        }

        public List<ClsInyeccion> FnRInyeccionICN(ClsInyeccion OInyeccionN)
        {
            List<ClsInyeccion> OInyeccion = new ClsInyeccionD().FnRInyeccionICD(OInyeccionN);
            return OInyeccion;
        }
    }
}

