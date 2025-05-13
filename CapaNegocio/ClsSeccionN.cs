using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsSeccionN
    {
        public bool FnCSeccionN(ClsSeccion OSeccion)
        {
            Boolean CreateSeccion = new ClsSeccionD().FnCSeccionD(OSeccion);
            return CreateSeccion;
        }
        public List<ClsSeccion> FnRSeccionN()
        {
            List<ClsSeccion> OSeccion = new ClsSeccionD().FnRSeccionD();
            return OSeccion;
        }
        public bool FnUSeccionN(ClsSeccion OSeccion)
        {
            if (OSeccion.IdSeccion != "" && OSeccion.IdSeccion != null && OSeccion.ObjBodega.IdBodega != "" && OSeccion.ObjBodega.IdBodega != null)
            {
                Boolean UpdateSeccion = new ClsSeccionD().FnUSeccionD(OSeccion);
                return UpdateSeccion;
            }
            else
            {
                return false;
            }

        }
        public bool FnDSeccionN(ClsSeccion OSeccion)
        {
            if (OSeccion.IdSeccion != "" && OSeccion.IdSeccion != null)
            {
                Boolean DeleteSeccion = new ClsSeccionD().FnDSeccionD(OSeccion);
                return DeleteSeccion;
            }
            else
            {
                return false;
            }
        }
        public bool FnESeccionN(ClsSeccion OSeccion)
        {
            if (OSeccion.IdSeccion != "" && OSeccion.IdSeccion != null && OSeccion.ObjBodega.IdBodega != "" && OSeccion.ObjBodega.IdBodega != null)
            {
                Boolean ExisteSeccion = new ClsSeccionD().FnESeccionD(OSeccion);
                return ExisteSeccion;
            }
            else
            {
                return true;
            }
        }
    }
}
