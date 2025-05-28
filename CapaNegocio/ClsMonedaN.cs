using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsMonedaN
    {
        public List<ClsMoneda> FnRMonedaN()
        {
            List<ClsMoneda> OMoneda = new ClsMonedaD().FnRMonedaD();
            return OMoneda;
        }

        public List<ClsMoneda> FnRALLMonedaN()
        {
            List<ClsMoneda> OMoneda = new ClsMonedaD().FnRALLMonedaD();
            return OMoneda;
        }
    }
}
