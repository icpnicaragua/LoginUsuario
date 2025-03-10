using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsSubCategoria
    {
        private string _IdSubCategoria;
        private string _SubCategoria;
        private ClsCategoria _ObjCategoria;
        private string _Estado;

        public string IdSubCategoria { get => _IdSubCategoria; set => _IdSubCategoria = value; }
        public string SubCategoria { get => _SubCategoria; set => _SubCategoria = value; }
        public ClsCategoria ObjCategoria { get => _ObjCategoria; set => _ObjCategoria = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsSubCategoria()
        {
            this.ObjCategoria = new ClsCategoria();
             }

    }
}
