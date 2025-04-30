using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsGarantiaN
    {
        public bool FnCGarantiaN(ClsGarantia OGarantia)
        {
            Boolean CreateGarantia = new ClsGarantiaD().FnCGarantiaD(OGarantia);
            return CreateGarantia;
        }
        public List<ClsGarantia> FnRGarantiaN()
        {
            List<ClsGarantia> OGarantia = new ClsGarantiaD().FnRGarantiaD();
            return OGarantia;
        }
        public bool FnUGarantiaN(ClsGarantia OGarantia)
        {
            if (OGarantia.IdGarantia != "" && OGarantia.IdGarantia != null)
            {
                Boolean UpdateGarantia = new ClsGarantiaD().FnUGarantiaD(OGarantia);
                return UpdateGarantia;
            }
            else
            {
                return false;
            }

        }
        public bool FnDGarantiaN(ClsGarantia OGarantia)
        {
            if (OGarantia.IdGarantia != "" && OGarantia.IdGarantia != null)
            {
                Boolean DeleteGarantia = new ClsGarantiaD().FnDGarantiaD(OGarantia);
                return DeleteGarantia;
            }
            else
            {
                return false;
            }
        }
        public bool FnEGarantiaN(ClsGarantia OGarantia)
        {
            if (OGarantia.IdGarantia != "" && OGarantia.IdGarantia != null)
            {
                Boolean ExisteGarantia = new ClsGarantiaD().FnEGarantiaD(OGarantia);
                return ExisteGarantia;
            }
            else
            {
                return true;
            }
        }
    }
}
