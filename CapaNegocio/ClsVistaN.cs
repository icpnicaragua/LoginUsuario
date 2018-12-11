using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;
using CapaDato.mve; // el punto hp es por la carpeta

namespace CapaNegocio
{
    public class ClsVistaN
    {
        public List<ClsVista> FnRVist()
        {
            List<ClsVista> OVist = new ClsVistaD().FnRVist();
            //por acá se recortarían los espacios
            return OVist;
        }
    }
}
