using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
   public class ClsModulo
    {
        private string _IdModulo;
        private string _Modulo;
        private string _Fechainciomodulo;
        private string _idaspmodulo;

        public string IdModulo { get => _IdModulo; set => _IdModulo = value; }
        public string Modulo { get => _Modulo; set => _Modulo = value; }
        public string Fechainciomodulo { get => _Fechainciomodulo; set => _Fechainciomodulo = value; }
        public string Idaspmodulo { get => _idaspmodulo; set => _idaspmodulo = value; }

        public ClsModulo()
        {

        }
    }
}
