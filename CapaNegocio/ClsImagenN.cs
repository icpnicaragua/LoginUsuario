using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsImagenN
    {
        public bool FnCImagenN(ClsImagen OImagen)
        {
            Boolean CreateImagen = new ClsImagenD().FnCImagenD(OImagen);
            return CreateImagen;
        }
    }
}
