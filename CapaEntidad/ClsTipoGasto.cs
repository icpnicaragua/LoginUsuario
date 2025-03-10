using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsTipoGasto
    {
        private string _IdTipoGasto;
        private string _TipoGasto;
        private string _Estado;

        public string IdTipoGasto { get => _IdTipoGasto; set => _IdTipoGasto = value; }
        public string TipoGasto { get => _TipoGasto; set => _TipoGasto = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsTipoGasto() { }
    }
}
