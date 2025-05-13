using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsEstanteN
    {
        public bool FnCEstanteN(ClsEstante OEstante)
        {
            Boolean CreateEstante = new ClsEstanteD().FnCEstanteD(OEstante);
            return CreateEstante;
        }
        public List<ClsEstante> FnREstanteN()
        {
            List<ClsEstante> OEstante = new ClsEstanteD().FnREstanteD();
            return OEstante;
        }
        public bool FnUEstanteN(ClsEstante OEstante)
        {
            if (OEstante.IdEstante != "" && OEstante.IdEstante != null && OEstante.ObjRack.IdRack != "" && OEstante.ObjRack.IdRack != null)
            {
                Boolean UpdateEstante = new ClsEstanteD().FnUEstanteD(OEstante);
                return UpdateEstante;
            }
            else
            {
                return false;
            }

        }
        public bool FnDEstanteN(ClsEstante OEstante)
        {
            if (OEstante.IdEstante != "" && OEstante.IdEstante != null)
            {
                Boolean DeleteEstante = new ClsEstanteD().FnDEstanteD(OEstante);
                return DeleteEstante;
            }
            else
            {
                return false;
            }
        }
        public bool FnEEstanteN(ClsEstante OEstante)
        {
            if (OEstante.IdEstante != "" && OEstante.IdEstante != null && OEstante.ObjRack.IdRack != "" && OEstante.ObjRack.IdRack != null)
            {
                Boolean ExisteEstante = new ClsEstanteD().FnEEstanteD(OEstante);
                return ExisteEstante;
            }
            else
            {
                return true;
            }
        }
    }
}
