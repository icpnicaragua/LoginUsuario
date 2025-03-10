using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsCorreo
    {
        private string _IdCorreo;
        private string _Correo;
        private string _Estado;
        private ClsPersona _ObjPersona;
        private ClsEmpresa _ObjEmpresa;

        public string IdCorreo { get => _IdCorreo; set => _IdCorreo = value; }
        public string Correo { get => _Correo; set => _Correo = value; }
        public string Estado { get => _Estado; set => _Estado = value; }
        public ClsPersona ObjPersona { get => _ObjPersona; set => _ObjPersona = value; }
        public ClsEmpresa ObjEmpresa { get => _ObjEmpresa; set => _ObjEmpresa = value; }

        public ClsCorreo()
        {
            this.ObjEmpresa = new ClsEmpresa();
            this.ObjPersona = new ClsPersona();
        }

    }
}
