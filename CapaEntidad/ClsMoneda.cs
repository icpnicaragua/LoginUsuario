using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsMoneda
    {
        private string _IdMoneda;
        private string _Moneda;
        private string _Simbolo;
        private string _Division;
        private string _Iso4217;
        private string _UnidadFranccionaria;
        private string _Estado;

        public string IdMoneda { get => _IdMoneda; set => _IdMoneda = value; }
        public string Moneda { get => _Moneda; set => _Moneda = value; }
        public string Simbolo { get => _Simbolo; set => _Simbolo = value; }
        public string Division { get => _Division; set => _Division = value; }
        public string Iso4217 { get => _Iso4217; set => _Iso4217 = value; }
        public string UnidadFranccionaria { get => _UnidadFranccionaria; set => _UnidadFranccionaria = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsMoneda() { }

    }
}
