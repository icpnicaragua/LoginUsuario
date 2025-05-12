using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsEmpleadoN
    {
        public bool FnCEmpleadoN(ClsEmpleado OEmpleado)
        {
            Boolean CreateEmpleado = new ClsEmpleadoD().FnCEmpleadoD(OEmpleado);
            return CreateEmpleado;
        }
        public List<ClsEmpleado> FnREmpleadoN()
        {
            List<ClsEmpleado> OEmpleado = new ClsEmpleadoD().FnREmpleadoD();
            return OEmpleado;
        }
        public bool FnUEmpleadoN(ClsEmpleado OEmpleado)
        {
            if (OEmpleado.IdEmpleado != "" && OEmpleado.IdEmpleado != null
                && OEmpleado.ObjArea.IdArea != "" && OEmpleado.ObjArea.IdArea != null
                )
            {
                Boolean UpdateEmpleado = new ClsEmpleadoD().FnUEmpleadoD(OEmpleado);
                return UpdateEmpleado;
            }
            else
            {
                return false;
            }

        }
        public bool FnDEmpleadoN(ClsEmpleado OEmpleado)
        {
            if (OEmpleado.IdEmpleado != "" && OEmpleado.IdEmpleado != null)
            {
                Boolean DeleteEmpleado = new ClsEmpleadoD().FnDEmpleadoD(OEmpleado);
                return DeleteEmpleado;
            }
            else
            {
                return false;
            }
        }
        public bool FnEEmpleadoN(ClsEmpleado OEmpleado)
        {
            if (OEmpleado.IdEmpleado != "" && OEmpleado.IdEmpleado != null
                 && OEmpleado.ObjArea.IdArea != "" && OEmpleado.ObjArea.IdArea != null
                && OEmpleado.ObjPersona.IdPersona != "" && OEmpleado.ObjPersona.IdPersona != null
                )
            {
                Boolean ExisteEmpleado = new ClsEmpleadoD().FnEEmpleadoD(OEmpleado);
                return ExisteEmpleado;
            }
            else
            {
                return true;
            }
        }

        public bool FnEEmpleadoPersonaN(ClsEmpleado OEmpleado)
        {
            if (OEmpleado.ObjPersona.IdPersona != "" && OEmpleado.ObjPersona.IdPersona != null)
            {
                Boolean ExisteEmpleado = new ClsEmpleadoD().FnEEmpleadoPersonaD(OEmpleado);
                return ExisteEmpleado;
            }
            else
            {
                return true;
            }
        }

    }
}
