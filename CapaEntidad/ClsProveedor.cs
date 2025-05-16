using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsProveedor
    {
        private string _IdProveedor;
        private string _PlazoCredito;
        private string _Nombre;
        private string _EP;
        private ClsPersona _ObjPersona;
        private ClsEmpresa _ObjEmpresa;
        private string _Estado;

        public string IdProveedor { get => _IdProveedor; set => _IdProveedor = value; }
        public string PlazoCredito { get => _PlazoCredito; set => _PlazoCredito = value; }
        public string Nombre { get => _Nombre; set => _Nombre = value; }
        public string EP { get => _EP; set => _EP = value; }
        public ClsPersona ObjPersona { get => _ObjPersona; set => _ObjPersona = value; }
        public ClsEmpresa ObjEmpresa { get => _ObjEmpresa; set => _ObjEmpresa = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsProveedor()
        {
            this.ObjEmpresa = new ClsEmpresa();
            this.ObjPersona = new ClsPersona();
        }


    }
}
