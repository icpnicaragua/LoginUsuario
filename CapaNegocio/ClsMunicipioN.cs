using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsMunicipioN
    {
        public List<ClsMunicipio> FnRMunicipioN(ClsMunicipio OMunicipioN)
        {
            List<ClsMunicipio> OMunicipio = new ClsMunicipioD().FnRMunicipioD(OMunicipioN);
            return OMunicipio;
        }
    }
}
