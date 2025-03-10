using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsPersona
    {
        private string _IdPersona;
        private string _Nombre1;
        private string _Nombre2;
        private string _Apellido1;
        private string _Apellido2;
        private string _Estado;
        private ClsGenero _ObjGenero;

        public string IdPersona { get => _IdPersona; set => _IdPersona = value; }
        public string Nombre1 { get => _Nombre1; set => _Nombre1 = value; }
        public string Nombre2 { get => _Nombre2; set => _Nombre2 = value; }
        public string Apellido1 { get => _Apellido1; set => _Apellido1 = value; }
        public string Apellido2 { get => _Apellido2; set => _Apellido2 = value; }
        public string Estado { get => _Estado; set => _Estado = value; }
        public ClsGenero ObjGenero { get => _ObjGenero; set => _ObjGenero = value; }

        public ClsPersona() {
            this.ObjGenero = new ClsGenero();
        }
    }
}
