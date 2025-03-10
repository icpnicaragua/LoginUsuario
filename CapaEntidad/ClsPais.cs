using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public  class ClsPais
    {
        private string _IdPais;
        private string _Pais;
        private string _Alfa2;
        private string _Gentilicio;
        private string _PrefijoTelefonico;
        private ClsSubRegion _ObjSubRegion;
        private string _Alfa3;

        public string IdPais { get => _IdPais; set => _IdPais = value; }
        public string Pais { get => _Pais; set => _Pais = value; }
        public string Alfa2 { get => _Alfa2; set => _Alfa2 = value; }
        public string Gentilicio { get => _Gentilicio; set => _Gentilicio = value; }
        public string PrefijoTelefonico { get => _PrefijoTelefonico; set => _PrefijoTelefonico = value; }
        public ClsSubRegion ObjSubRegion { get => _ObjSubRegion; set => _ObjSubRegion = value; }
        public string Alfa3 { get => _Alfa3; set => _Alfa3 = value; }

        public ClsPais()
        {
            this.ObjSubRegion = new ClsSubRegion();
        }
    }
}
