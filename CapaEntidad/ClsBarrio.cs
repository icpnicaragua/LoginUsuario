using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsBarrio
    {
        private string _IdBarrio;
        private string _Barrio;
        private string _CodigoPostal;
        private ClsMunicipio _ObjMunicipio;

        public string IdBarrio { get => _IdBarrio; set => _IdBarrio = value; }
        public string Barrio { get => _Barrio; set => _Barrio = value; }
        public string CodigoPostal { get => _CodigoPostal; set => _CodigoPostal = value; }
        public ClsMunicipio ObjMunicipio { get => _ObjMunicipio; set => _ObjMunicipio = value; }

        public ClsBarrio() { 
        this.ObjMunicipio=new ClsMunicipio();
        }



    }
}
