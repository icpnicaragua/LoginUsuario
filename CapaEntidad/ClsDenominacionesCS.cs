using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsDenominacionesCS
    {
        private string _IdDenominacion;
        private string _Nombre;
        private string _Cantidad;
        private string _Estado;

        public string IdDenominacion { get => _IdDenominacion; set => _IdDenominacion = value; }
        public string Nombre { get => _Nombre; set => _Nombre = value; }
        public string Cantidad { get => _Cantidad; set => _Cantidad = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsDenominacionesCS() { }


    }
}
