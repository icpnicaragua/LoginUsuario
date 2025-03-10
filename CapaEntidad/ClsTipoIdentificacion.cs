using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsTipoIdentificacion
    {
        private string _IdTipoIdentificacion;
        private string _TipoIdentificacion;
        private string _Estado;
        public string IdTipoIdentificacion { get => _IdTipoIdentificacion; set => _IdTipoIdentificacion = value; }
        public string TipoIdentificacion { get => _TipoIdentificacion; set => _TipoIdentificacion = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsTipoIdentificacion() { }
    }
}
