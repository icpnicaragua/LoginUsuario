using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsCuenta
    {
        private string _IdCuenta;
        private string _NumeroCuenta;
        private ClsBanco _ObjBanco;
        private string _Propietario;
        private ClsMoneda _ObjMoneda;
        private string _Estado;

        public string IdCuenta { get => _IdCuenta; set => _IdCuenta = value; }
        public string NumeroCuenta { get => _NumeroCuenta; set => _NumeroCuenta = value; }
        public ClsBanco ObjBanco { get => _ObjBanco; set => _ObjBanco = value; }
        public string Propietario { get => _Propietario; set => _Propietario = value; }
        public ClsMoneda ObjMoneda { get => _ObjMoneda; set => _ObjMoneda = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsCuenta()
        {
            this.ObjBanco = new ClsBanco();
            this.ObjMoneda= new ClsMoneda();    
        }

    }
}
