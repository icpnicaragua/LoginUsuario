using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;
namespace CapaNegocio
{
    public class ClsDepartamentoN
    {
        public List<ClsDepartamento> FnRDepartamentoN( )
        {
            List<ClsDepartamento> ODepartamento = new ClsDepartamentoD().FnRDepartamentoD();
            return ODepartamento;
        }
    }
}
