using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsEmpresaN
    {
        public bool FnCEmpresaN(ClsEmpresa OEmpresa)
        {
            Boolean CreateEmpresa = new ClsEmpresaD().FnCEmpresaD(OEmpresa);
            return CreateEmpresa;
        }
        public List<ClsEmpresa> FnREmpresaN()
        {
            List<ClsEmpresa> OEmpresa = new ClsEmpresaD().FnREmpresaD();
            return OEmpresa;
        }
        public bool FnUEmpresaN(ClsEmpresa OEmpresa)
        {
            if (OEmpresa.IdEmpresa != "" && OEmpresa.IdEmpresa != null 
                && OEmpresa.ObjTipoEmpresa.IdTipoEmpresa != "" && OEmpresa.ObjTipoEmpresa.IdTipoEmpresa != null
                && OEmpresa.ObjRegimen.IdRegimen != "" && OEmpresa.ObjRegimen.IdRegimen != null
                )
            {
                Boolean UpdateEmpresa = new ClsEmpresaD().FnUEmpresaD(OEmpresa);
                return UpdateEmpresa;
            }
            else
            {
                return false;
            }

        }
        public bool FnDEmpresaN(ClsEmpresa OEmpresa)
        {
            if (OEmpresa.IdEmpresa != "" && OEmpresa.IdEmpresa != null)
            {
                Boolean DeleteEmpresa = new ClsEmpresaD().FnDEmpresaD(OEmpresa);
                return DeleteEmpresa;
            }
            else
            {
                return false;
            }
        }
        public bool FnEEmpresaN(ClsEmpresa OEmpresa)
        {
            if (OEmpresa.IdEmpresa != "" && OEmpresa.IdEmpresa != null)
            {
                Boolean ExisteEmpresa = new ClsEmpresaD().FnEEmpresaD(OEmpresa);
                return ExisteEmpresa;
            }
            else
            {
                return true;
            }
        }
    }
}
