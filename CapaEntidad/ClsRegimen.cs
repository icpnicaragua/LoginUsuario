using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsRegimen
    {
        private string _IdRegimen;
        private string _Regimen;
        private string _Estado;

        public string IdRegimen { get => _IdRegimen; set => _IdRegimen = value; }
        public string Regimen { get => _Regimen; set => _Regimen = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsRegimen() { }

    }
}
