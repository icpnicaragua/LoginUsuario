using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato.mve;// sel pone punto y la carpeta en la que se encuentra
using CapaEntidad;

namespace CapaNegocio
{
   public class ClsTicoControlN
    {
        public List<ClsTipoControl> MostrarTC()
        {
            List <ClsTipoControl> OTC = new ClsTipoControlD().MostrarTC();
            //probar si no llevan espacios en blanco
            return OTC;
        }

        public bool ExisteTC(ClsTipoControl TCpara)
        {
            TCpara.Tipocontrol = TCpara.Tipocontrol.Trim();//quitar espacios en blanco
           Boolean ExisteTc = new ClsTipoControlD().ExisteTC(TCpara); // instanciar de la capa datos con el parametro del obj
            return ExisteTc; //retornar si existe
      
        }
    }
}
