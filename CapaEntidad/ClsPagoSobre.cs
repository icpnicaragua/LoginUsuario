using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsPagoSobre
    {
        private string _IdPagoSobre;
        private string _Descripcion;
        private string _Estado;

        public string IdPagoSobre { get => _IdPagoSobre; set => _IdPagoSobre = value; }
        public string Descripcion { get => _Descripcion; set => _Descripcion = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsPagoSobre()
        {
        }

    }
}
