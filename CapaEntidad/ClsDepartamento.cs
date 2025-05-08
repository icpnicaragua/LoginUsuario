using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsDepartamento
    {
        private string _IdDepartamento;
        private string _Departamento;
        //private ClsZona _ObjZona;
       // private ClsMunicipio _ObjCabezera;

        public string IdDepartamento { get => _IdDepartamento; set => _IdDepartamento = value; }
        public string Departamento { get => _Departamento; set => _Departamento = value; }
       // public ClsZona ObjZona { get => _ObjZona; set => _ObjZona = value; }
       // public ClsMunicipio ObjCabezera { get => _ObjCabezera; set => _ObjCabezera = value; }


        public ClsDepartamento()
        {
        //    this.ObjZona = new ClsZona();
         //   this.ObjCabezera = new ClsMunicipio();
        }
    }
}
