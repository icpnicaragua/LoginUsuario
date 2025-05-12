using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsEmpleado
    {
        private string _IdEmpleado;
        private ClsPersona _ObjPersona;
        private ClsArea _ObjArea;
        private string _Estado;
        private ClsPersona _ObjJefe;

        public string IdEmpleado { get => _IdEmpleado; set => _IdEmpleado = value; }
        public ClsPersona ObjPersona { get => _ObjPersona; set => _ObjPersona = value; }
        public ClsArea ObjArea { get => _ObjArea; set => _ObjArea = value; }
        public string Estado { get => _Estado; set => _Estado = value; }
        public ClsPersona ObjJefe { get => _ObjJefe; set => _ObjJefe = value; }

        public ClsEmpleado()
        {
            this.ObjArea = new ClsArea();
            this.ObjPersona = new ClsPersona();
            this.ObjJefe=new ClsPersona();
        }
    }
}
