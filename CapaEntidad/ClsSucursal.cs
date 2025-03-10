using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsSucursal
    {
        private string _IdSucursal;
        private string _Sucursal;
        private string _Estado;

        public string IdSucursal { get => _IdSucursal; set => _IdSucursal = value; }
        public string Sucursal { get => _Sucursal; set => _Sucursal = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsSucursal() { }
    }
}
