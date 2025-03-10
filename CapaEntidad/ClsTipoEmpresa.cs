using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsTipoEmpresa
    {
        private string _IdTipoEmpresa;
        private string _TipoEmpresa;
        private string _Estado;

        public string IdTipoEmpresa { get => _IdTipoEmpresa; set => _IdTipoEmpresa = value; }
        public string TipoEmpresa { get => _TipoEmpresa; set => _TipoEmpresa = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsTipoEmpresa() { }

    }
}
