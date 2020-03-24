using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;
using CapaDato.mve; // el punto hp es por la carpeta

namespace CapaNegocio
{
    public class ClsModuloN
    {
        public bool FnCModuloN(ClsModulo OModulo)
        {
            Boolean CreateModulo = new ClsModuloD().FnCModuloD(OModulo);
            return CreateModulo;
        }
        public List<ClsModulo> FnRModuloN()
        {
            List<ClsModulo> OModulo = new ClsModuloD().FnRModuloD();
            return OModulo;
        }
        public bool FnUModuloN(ClsModulo OModulo)
        {
            if (OModulo.IdModulo != "" && OModulo.IdModulo != null)
            {
                Boolean UpdateModulo = new ClsModuloD().FnUModuloD(OModulo);
                return UpdateModulo;
            }
            else
            {
                return false;
            }
                
        }
        public bool FnDModuloN(ClsModulo OModulo)
        {
            if (OModulo.IdModulo != "" && OModulo.IdModulo != null)
            {
                Boolean DeleteModulo = new ClsModuloD().FnDModuloD(OModulo);
                return DeleteModulo;
            }
            else
            {
                return false;
            }
        }
        public bool FnEModuloN(ClsModulo Omodulo)
        {
            if (Omodulo.IdModulo != "" && Omodulo.IdModulo != null)
            {
                Boolean ExisteModulo = new ClsModuloD().FnEModuloD(Omodulo);
                return ExisteModulo;
            }
            else
            {
                return true;
            }
        }
        public bool FnEModuloAspN(ClsModulo Omodulo)
        {
            if (Omodulo.IdModulo != "" && Omodulo.IdModulo != null)
            {
                Boolean ExisteModuloAsp = new ClsModuloD().FnEModuloAspD(Omodulo);
                return ExisteModuloAsp;
            }
            else
            {
                return true;
            }
        }
    }
}
