using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsIdentificacion
    {
        private string _IdIdentificacion;
        private string _Identificacion;
        private string _Estado;
        private ClsTipoIdentificacion _ObjTipoIdentificacion;
        private ClsPersona _ObjPersona;

        public string IdIdentificacion { get => _IdIdentificacion; set => _IdIdentificacion = value; }
        public string Identificacion { get => _Identificacion; set => _Identificacion = value; }
        public string Estado { get => _Estado; set => _Estado = value; }
        public ClsTipoIdentificacion ObjTipoIdentificacion { get => _ObjTipoIdentificacion; set => _ObjTipoIdentificacion = value; }
        public ClsPersona ObjPersona { get => _ObjPersona; set => _ObjPersona = value; }

        public ClsIdentificacion()
        {
            this.ObjPersona = new ClsPersona();
            this.ObjTipoIdentificacion = new ClsTipoIdentificacion();
        }

    }
}
