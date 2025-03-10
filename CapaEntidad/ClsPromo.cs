using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsPromo
    {
        private string _IdPromo;
        private string _Promo;
        private string _Estado;

        public string IdPromo { get => _IdPromo; set => _IdPromo = value; }
        public string Promo { get => _Promo; set => _Promo = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsPromo() { }

    }
}
