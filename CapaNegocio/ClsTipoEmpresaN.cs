using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsTipoEmpresaN
    {
        public bool FnCTipoEmpresaN(ClsTipoEmpresa OTipoEmpresa)
        {
            Boolean CreateTipoEmpresa = new ClsTipoEmpresaD().FnCTipoEmpresaD(OTipoEmpresa);
            return CreateTipoEmpresa;
        }
        public List<ClsTipoEmpresa> FnRTipoEmpresaN()
        {
            List<ClsTipoEmpresa> OTipoEmpresa = new ClsTipoEmpresaD().FnRTipoEmpresaD();
            return OTipoEmpresa;
        }
        public bool FnUTipoEmpresaN(ClsTipoEmpresa OTipoEmpresa)
        {
            if (OTipoEmpresa.IdTipoEmpresa != "" && OTipoEmpresa.IdTipoEmpresa != null)
            {
                Boolean UpdateTipoEmpresa = new ClsTipoEmpresaD().FnUTipoEmpresaD(OTipoEmpresa);
                return UpdateTipoEmpresa;
            }
            else
            {
                return false;
            }

        }
        public bool FnDTipoEmpresaN(ClsTipoEmpresa OTipoEmpresa)
        {
            if (OTipoEmpresa.IdTipoEmpresa != "" && OTipoEmpresa.IdTipoEmpresa != null)
            {
                Boolean DeleteTipoEmpresa = new ClsTipoEmpresaD().FnDTipoEmpresaD(OTipoEmpresa);
                return DeleteTipoEmpresa;
            }
            else
            {
                return false;
            }
        }
        public bool FnETipoEmpresaN(ClsTipoEmpresa OTipoEmpresa)
        {
            if (OTipoEmpresa.IdTipoEmpresa != "" && OTipoEmpresa.IdTipoEmpresa != null)
            {
                Boolean ExisteTipoEmpresa = new ClsTipoEmpresaD().FnETipoEmpresaD(OTipoEmpresa);
                return ExisteTipoEmpresa;
            }
            else
            {
                return true;
            }
        }
    }
}
