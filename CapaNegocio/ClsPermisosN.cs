using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
   public class ClsPermisosN
    {
        public List<ClsPermisos> PermisosPM(string IDU)
        {
            List<ClsPermisos> objPermisosN = new ClsPermisosD().PermisosGenerales(IDU);
            foreach(ClsPermisos x in objPermisosN)
            {
                x.ObjM.Idaspmodulo = x.ObjM.Idaspmodulo.Trim();
                x.ObjV.Idaspvista = x.ObjV.Idaspvista.Trim();
                x.ObjE.Idaspelemento = x.ObjE.Idaspelemento.Trim();
                
            }
            return objPermisosN;
        }
    }
}
