using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsCuentaN
    {
        public bool FnCCuentaN(ClsCuenta OCuenta)
        {
            Boolean CreateCuenta = new ClsCuentaD().FnCCuentaD(OCuenta);
            return CreateCuenta;
        }
        public List<ClsCuenta> FnRCuentaN()
        {
            List<ClsCuenta> OCuenta = new ClsCuentaD().FnRCuentaD();
            return OCuenta;
        }
        public bool FnUCuentaN(ClsCuenta OCuenta)
        {
            if (OCuenta.IdCuenta != "" && OCuenta.IdCuenta != null && 
                OCuenta.ObjBanco.IdBanco != "" && OCuenta.ObjBanco.IdBanco != null &&
                OCuenta.ObjMoneda.IdMoneda != "" && OCuenta.ObjMoneda.IdMoneda != null)
            {
                Boolean UpdateCuenta = new ClsCuentaD().FnUCuentaD(OCuenta);
                return UpdateCuenta;
            }
            else
            {
                return false;
            }

        }
        public bool FnDCuentaN(ClsCuenta OCuenta)
        {
            if (OCuenta.IdCuenta != "" && OCuenta.IdCuenta != null)
            {
                Boolean DeleteCuenta = new ClsCuentaD().FnDCuentaD(OCuenta);
                return DeleteCuenta;
            }
            else
            {
                return false;
            }
        }
        public bool FnECuentaN(ClsCuenta OCuenta)
        {
            if (OCuenta.IdCuenta != "" && OCuenta.IdCuenta != null && OCuenta.ObjBanco.IdBanco != "" && OCuenta.ObjBanco.IdBanco != null)
            {
                Boolean ExisteCuenta = new ClsCuentaD().FnECuentaD(OCuenta);
                return ExisteCuenta;
            }
            else
            {
                return true;
            }
        }
    }
}
