using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsSubCategoriaN
    {
        public bool FnCSubCategoriaN(ClsSubCategoria OSubCategoria)
        {
            Boolean CreateSubCategoria = new ClsSubCategoriaD().FnCSubCategoriaD(OSubCategoria);
            return CreateSubCategoria;
        }
        public List<ClsSubCategoria> FnRSubCategoriaN()
        {
            List<ClsSubCategoria> OSubCategoria = new ClsSubCategoriaD().FnRSubCategoriaD();
            return OSubCategoria;
        }
        public bool FnUSubCategoriaN(ClsSubCategoria OSubCategoria)
        {
            if (OSubCategoria.IdSubCategoria != "" && OSubCategoria.IdSubCategoria != null && OSubCategoria.ObjCategoria.IdCategoria != "" && OSubCategoria.ObjCategoria.IdCategoria != null)
            {
                Boolean UpdateSubCategoria = new ClsSubCategoriaD().FnUSubCategoriaD(OSubCategoria);
                return UpdateSubCategoria;
            }
            else
            {
                return false;
            }

        }
        public bool FnDSubCategoriaN(ClsSubCategoria OSubCategoria)
        {
            if (OSubCategoria.IdSubCategoria != "" && OSubCategoria.IdSubCategoria != null)
            {
                Boolean DeleteSubCategoria = new ClsSubCategoriaD().FnDSubCategoriaD(OSubCategoria);
                return DeleteSubCategoria;
            }
            else
            {
                return false;
            }
        }
        public bool FnESubCategoriaN(ClsSubCategoria OSubCategoria)
        {
            if (OSubCategoria.IdSubCategoria != "" && OSubCategoria.IdSubCategoria != null && OSubCategoria.ObjCategoria.IdCategoria != "" && OSubCategoria.ObjCategoria.IdCategoria != null)
            {
                Boolean ExisteSubCategoria = new ClsSubCategoriaD().FnESubCategoriaD(OSubCategoria);
                return ExisteSubCategoria;
            }
            else
            {
                return true;
            }
        }
    }
}
