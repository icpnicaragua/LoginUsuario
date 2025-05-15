using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsCliente
    {
        private string _IdCliente;
        private string _Fecha_inicio;
        private string _PlazoCredito;
        private string _LimiteCredito;
        private string _Nombre;
        private string _EP;
        private ClsTipoCliente _ObjTipoCliente;
        private ClsEmpresa _ObjEmpresa;
        private ClsPersona _ObjPersona;
        private string _Estado;

        public string IdCliente { get => _IdCliente; set => _IdCliente = value; }
        public string Fecha_inicio { get => _Fecha_inicio; set => _Fecha_inicio = value; }
        public string PlazoCredito { get => _PlazoCredito; set => _PlazoCredito = value; }
        public string LimiteCredito { get => _LimiteCredito; set => _LimiteCredito = value; }
        public string Nombre { get => _Nombre; set => _Nombre = value; }
        public string EP { get => _EP; set => _EP = value; }
        public ClsTipoCliente ObjTipoCliente { get => _ObjTipoCliente; set => _ObjTipoCliente = value; }
        public ClsEmpresa ObjEmpresa { get => _ObjEmpresa; set => _ObjEmpresa = value; }
        public ClsPersona ObjPersona { get => _ObjPersona; set => _ObjPersona = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsCliente()
        {
            this.ObjTipoCliente = new ClsTipoCliente();
            this.ObjEmpresa = new ClsEmpresa();
            this.ObjPersona = new ClsPersona();
        }
    }
}
