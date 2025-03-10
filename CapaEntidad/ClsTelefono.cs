using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsTelefono
    {
        private string _IdTelefono;
        private string _Telefono;
        private ClsTipoTelefono _ObjTipoTelefono;
        private string _Estado;
        private ClsPersona _ObjPersona;
        private ClsEmpresa _ObjEmpresa;

        public string IdTelefono { get => _IdTelefono; set => _IdTelefono = value; }
        public string Telefono { get => _Telefono; set => _Telefono = value; }
        public ClsTipoTelefono ObjTipoTelefono { get => _ObjTipoTelefono; set => _ObjTipoTelefono = value; }
        public string Estado { get => _Estado; set => _Estado = value; }
        public ClsPersona ObjPersona { get => _ObjPersona; set => _ObjPersona = value; }
        public ClsEmpresa ObjEmpresa { get => _ObjEmpresa; set => _ObjEmpresa = value; }


        public ClsTelefono()
        {
            this.ObjEmpresa = new ClsEmpresa();
            this.ObjPersona = new ClsPersona();
            this.ObjTipoTelefono= new ClsTipoTelefono();
        }
    }
}
