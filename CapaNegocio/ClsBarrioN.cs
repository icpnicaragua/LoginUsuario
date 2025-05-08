using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsBarrioN
    {
        public List<ClsBarrio> FnRBarrioN(ClsBarrio OBarrioN)
        {
            List<ClsBarrio> OBarrio = new ClsBarrioD().FnRBarrioD(OBarrioN);
            return OBarrio;
        }
    }
}
