using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsZona
    {
        private string _IdZona;
        private string _Zona;
       // private ClsPais _ObjPais;

        public string IdZona { get => _IdZona; set => _IdZona = value; }
        public string Zona { get => _Zona; set => _Zona = value; }
       // public ClsPais ObjPais { get => _ObjPais; set => _ObjPais = value; }

        public ClsZona() {
           // this.ObjPais = new ClsPais();
        }

    }
}
