using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsArea
    {
        private string _IdArea;
        private string _Area;
        private string _Estado;

        public string IdArea { get => _IdArea; set => _IdArea = value; }
        public string Area { get => _Area; set => _Area = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsArea() { }    

    }
}
