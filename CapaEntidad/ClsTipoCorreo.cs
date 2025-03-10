using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsTipoCorreo
    {
        private string _IdTipoCorreo;
        private string _TipoCorreo;
        private string _Estado;

        public string IdTipoCorreo { get => _IdTipoCorreo; set => _IdTipoCorreo = value; }
        public string TipoCorreo { get => _TipoCorreo; set => _TipoCorreo = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsTipoCorreo() { }
    }
}
