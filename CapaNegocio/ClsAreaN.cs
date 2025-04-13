using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsAreaN
    {
        public bool FnCAreaN(ClsArea OArea)
        {
            Boolean CreateArea = new ClsAreaD().FnCAreaD(OArea);
            return CreateArea;
        }
        public List<ClsArea> FnRAreaN()
        {
            List<ClsArea> OArea = new ClsAreaD().FnRAreaD();
            return OArea;
        }
        public bool FnUAreaN(ClsArea OArea)
        {
            if (OArea.IdArea != "" && OArea.IdArea != null)
            {
                Boolean UpdateArea = new ClsAreaD().FnUAreaD(OArea);
                return UpdateArea;
            }
            else
            {
                return false;
            }

        }
        public bool FnDAreaN(ClsArea OArea)
        {
            if (OArea.IdArea != "" && OArea.IdArea != null)
            {
                Boolean DeleteArea = new ClsAreaD().FnDAreaD(OArea);
                return DeleteArea;
            }
            else
            {
                return false;
            }
        }
        public bool FnEAreaN(ClsArea OArea)
        {
            if (OArea.IdArea != "" && OArea.IdArea != null)
            {
                Boolean ExisteArea = new ClsAreaD().FnEAreaD(OArea);
                return ExisteArea;
            }
            else
            {
                return true;
            }
        }
    }
}
