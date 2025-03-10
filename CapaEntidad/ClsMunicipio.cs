using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsMunicipio
    {
        private string _IdMunicipio;
        private string _Municipio;
        private string _CodigoPostal;
        private ClsDepartamento _ObjDepartamento;

        public string IdMunicipio { get => _IdMunicipio; set => _IdMunicipio = value; }
        public string Municipio { get => _Municipio; set => _Municipio = value; }
        public string CodigoPostal { get => _CodigoPostal; set => _CodigoPostal = value; }
        public ClsDepartamento ObjDepartamento { get => _ObjDepartamento; set => _ObjDepartamento = value; }


        public ClsMunicipio() { 
        this.ObjDepartamento= new ClsDepartamento();
        }
    }
}
