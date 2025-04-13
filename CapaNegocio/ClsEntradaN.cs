using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsEntradaN
    {
        public bool FnCEntradaN(ClsEntrada OEntrada)
        {
            Boolean CreateEntrada = new ClsEntradaD().FnCEntradaD(OEntrada);
            return CreateEntrada;
        }
        public List<ClsEntrada> FnREntradaN()
        {
            List<ClsEntrada> OEntrada = new ClsEntradaD().FnREntradaD();
            return OEntrada;
        }
        public bool FnUEntradaN(ClsEntrada OEntrada)
        {
            if (OEntrada.IdEntrada != "" && OEntrada.IdEntrada != null)
            {
                Boolean UpdateEntrada = new ClsEntradaD().FnUEntradaD(OEntrada);
                return UpdateEntrada;
            }
            else
            {
                return false;
            }

        }
        public bool FnDEntradaN(ClsEntrada OEntrada)
        {
            if (OEntrada.IdEntrada != "" && OEntrada.IdEntrada != null)
            {
                Boolean DeleteEntrada = new ClsEntradaD().FnDEntradaD(OEntrada);
                return DeleteEntrada;
            }
            else
            {
                return false;
            }
        }
        public bool FnEEntradaN(ClsEntrada OEntrada)
        {
            if (OEntrada.IdEntrada != "" && OEntrada.IdEntrada != null)
            {
                Boolean ExisteEntrada = new ClsEntradaD().FnEEntradaD(OEntrada);
                return ExisteEntrada;
            }
            else
            {
                return true;
            }
        }
    }
}
