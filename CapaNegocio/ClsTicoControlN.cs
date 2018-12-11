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

        public bool FnETicoTC(ClsTipoControl OTico, string CUDE)
        {

            bool ExisteTCTC = false;
            if (OTico.Idtipocontrol != "" && OTico.Idtipocontrol != null)
            {
                switch (CUDE)
                {
                    case "C":
                        ExisteTCTC = new ClsTipoControlD().FnCTico(OTico);
                        break;
                    case "U":
                        ExisteTCTC = new ClsTipoControlD().FnUTico(OTico);
                        break;
                    case "D":
                        ExisteTCTC = new ClsTipoControlD().FnDTico(OTico);
                        break;
                    case "ETC":
                        ExisteTCTC = new ClsTipoControlD().FnETicoTC(OTico); // instanciar de la capa datos con el parametro del obj
                        break;
                    default:
                        ExisteTCTC = false;
                        break;
                }
                
                return ExisteTCTC; //retornar si no se pudo hacer la operación
            }
            else
            {
                return ExisteTCTC;
            }
      

        }
    }
}
