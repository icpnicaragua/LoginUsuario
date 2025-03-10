using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsSeccion
    {
        private string _IdSeccion;
        private string _Seccion;
        private ClsBodega _ObjBodega;
        private string _Estado;

        public string IdSeccion { get => _IdSeccion; set => _IdSeccion = value; }
        public string Seccion { get => _Seccion; set => _Seccion = value; }
        public ClsBodega ObjBodega { get => _ObjBodega; set => _ObjBodega = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsSeccion()
        {
            this.ObjBodega = new ClsBodega();
        }



    }
}
