using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsVista
    {
        private string _Idvista;
        private string _Vista;
        private string _Fechainiciovista;
        private ClsModulo _objModulo;
        private string _idaspvista;
        //private string _Idvista;
        public string Idvista { get => _Idvista; set => _Idvista = value; }
        public string Vista { get => _Vista; set => _Vista = value; }
        public string Fechainiciovista { get => _Fechainiciovista; set => _Fechainiciovista = value; }
        public ClsModulo ObjModulo { get => _objModulo; set => _objModulo = value; }
        public string Idaspvista { get => _idaspvista; set => _idaspvista = value; }

        public ClsVista()
        {
            //ObjModulo = new ClsModulo(); // investigar esto para no estar declarado cada vez
            this.ObjModulo = new ClsModulo();
        }

    }
}
