using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public  class ClsSubRegion
        
    {
        private string _IdSubRegion;
        private string _Region;
        private ClsContinente _ObjContinente;

        public string IdSubRegion { get => _IdSubRegion; set => _IdSubRegion = value; }
        public string Region { get => _Region; set => _Region = value; }
        public ClsContinente ObjContinente { get => _ObjContinente; set => _ObjContinente = value; }
        
        public ClsSubRegion() {
            this.ObjContinente = new ClsContinente();
        }

    }
}
