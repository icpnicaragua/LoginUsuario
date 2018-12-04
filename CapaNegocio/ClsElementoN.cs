using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;
using CapaDato.mve; // el punto hp es por la carpeta

namespace CapaNegocio
{
    public class ClsElementoN
    {
        public List<ClsElemento> FnRElem()
        {
            List<ClsElemento> OElem = new ClsElementoD().FnRElem();
            //por acá se recortarían los espacios
            return OElem;
        }

        public bool FnEElemEl(ClsElemento OElem)
        {
            if(OElem.Id_elemento != "" && OElem.Id_elemento != null)
            {
                OElem.Elemento = OElem.Elemento.Trim();//quitar espacios
                Boolean ExisteEE = new ClsElementoD().FnEElemEl(OElem); // instanciar de la capa datos con el parametro del obj
                return ExisteEE; // lo que venga de la bd
            }
            else
            {
                return true;// va a la gaver si quiere meter gol
            }
           
        }
    }
}
