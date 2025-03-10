using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsCategoria
    {
        private string _IdCategoria;
        private string _Categoria;
        private ClsFamilia _ObjFamilia;
        private string _Estado;

        public string IdCategoria { get => _IdCategoria; set => _IdCategoria = value; }
        public string Categoria { get => _Categoria; set => _Categoria = value; }
        public ClsFamilia ObjFamilia { get => _ObjFamilia; set => _ObjFamilia = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsCategoria() { 
        this.ObjFamilia=new ClsFamilia();
        }
    }
}
