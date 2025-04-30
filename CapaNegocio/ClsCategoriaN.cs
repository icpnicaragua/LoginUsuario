using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaEntidad
{
    public class ClsCategoriaN
    {
        public bool FnCCategoriaN(ClsCategoria OCategoria)
        {
            Boolean CreateCategoria = new ClsCategoriaD().FnCCategoriaD(OCategoria);
            return CreateCategoria;
        }
        public List<ClsCategoria> FnRCategoriaN()
        {
            List<ClsCategoria> OCategoria = new ClsCategoriaD().FnRCategoriaD();
            return OCategoria;
        }
        public bool FnUCategoriaN(ClsCategoria OCategoria)
        {
            if (OCategoria.IdCategoria != "" && OCategoria.IdCategoria != null && OCategoria.ObjFamilia.IdFamilia != "" && OCategoria.ObjFamilia.IdFamilia != null)
            {
                Boolean UpdateCategoria = new ClsCategoriaD().FnUCategoriaD(OCategoria);
                return UpdateCategoria;
            }
            else
            {
                return false;
            }

        }
        public bool FnDCategoriaN(ClsCategoria OCategoria)
        {
            if (OCategoria.IdCategoria != "" && OCategoria.IdCategoria != null)
            {
                Boolean DeleteCategoria = new ClsCategoriaD().FnDCategoriaD(OCategoria);
                return DeleteCategoria;
            }
            else
            {
                return false;
            }
        }
        public bool FnECategoriaN(ClsCategoria OCategoria)
        {
            if (OCategoria.IdCategoria != "" && OCategoria.IdCategoria != null && OCategoria.ObjFamilia.IdFamilia != "" && OCategoria.ObjFamilia.IdFamilia != null)
            {
                Boolean ExisteCategoria = new ClsCategoriaD().FnECategoriaD(OCategoria);
                return ExisteCategoria;
            }
            else
            {
                return true;
            }
        }
    }
}
