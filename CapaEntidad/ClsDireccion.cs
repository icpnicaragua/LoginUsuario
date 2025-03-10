using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsDireccion
    {
        private string _IdDireccion;
        private string _Direccion;
        private ClsTipoDireccion _ObjTipoDireccion;
        private ClsBarrio _ObjBarrio;
        private ClsPersona _ObjPersona;
        private ClsEmpresa _ObjEmpresa;

        public string IdDireccion { get => _IdDireccion; set => _IdDireccion = value; }
        public string Direccion { get => _Direccion; set => _Direccion = value; }
        public ClsTipoDireccion ObjTipoDireccion { get => _ObjTipoDireccion; set => _ObjTipoDireccion = value; }
        public ClsBarrio ObjBarrio { get => _ObjBarrio; set => _ObjBarrio = value; }
        public ClsPersona ObjPersona { get => _ObjPersona; set => _ObjPersona = value; }
        public ClsEmpresa ObjEmpresa { get => _ObjEmpresa; set => _ObjEmpresa = value; }

        public ClsDireccion()
        {
            this.ObjBarrio = new ClsBarrio();
            this.ObjTipoDireccion = new ClsTipoDireccion();
            this.ObjPersona = new ClsPersona();
            this.ObjEmpresa = new ClsEmpresa();
        }

    }
}
