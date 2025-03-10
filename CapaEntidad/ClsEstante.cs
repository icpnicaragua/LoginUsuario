using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsEstante
    {
        private string _IdEstante;
        private string _Estante;
        private ClsRack _ObjRack;
        private string _Estado;

        public string IdEstante { get => _IdEstante; set => _IdEstante = value; }
        public string Estante { get => _Estante; set => _Estante = value; }
        public ClsRack ObjRack { get => _ObjRack; set => _ObjRack = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsEstante()
        {
            this.ObjRack = new ClsRack();
        }

    }
}
