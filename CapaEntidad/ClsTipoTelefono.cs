using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsTipoTelefono
    {
        private string _IdTipoTelefono;
        private string _TipoTelefono;
        private string _Estado;

        public string IdTipoTelefono { get => _IdTipoTelefono; set => _IdTipoTelefono = value; }
        public string TipoTelefono { get => _TipoTelefono; set => _TipoTelefono = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsTipoTelefono() { }
    }
}
