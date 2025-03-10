using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsTipoCliente
    {
        private string _IdTipoCliente;
        private string _TipoCliente;
        private string _Estado;

        public string IdTipoCliente { get => _IdTipoCliente; set => _IdTipoCliente = value; }
        public string TipoCliente { get => _TipoCliente; set => _TipoCliente = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsTipoCliente() { }

    }
}
