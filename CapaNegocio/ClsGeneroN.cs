using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsGeneroN
    {
        public List<ClsGenero> FnRGeneroN()
        {
            List<ClsGenero> OGenero = new ClsGeneroD().FnRGeneroD();
            return OGenero;
        }
    }
}
