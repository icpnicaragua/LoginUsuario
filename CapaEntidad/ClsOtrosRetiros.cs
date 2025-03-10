using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsOtrosRetiros
    {
        private string _IdOtrosRetiros;
        private ClsRetiro _ObjRetiro;
        private ClsTipoPago _ObjTipoPago;
        private string _Cantidad;
        private string _Estado;

        public string IdOtrosRetiros { get => _IdOtrosRetiros; set => _IdOtrosRetiros = value; }
        public ClsRetiro ObjRetiro { get => _ObjRetiro; set => _ObjRetiro = value; }
        public ClsTipoPago ObjTipoPago { get => _ObjTipoPago; set => _ObjTipoPago = value; }
        public string Cantidad { get => _Cantidad; set => _Cantidad = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsOtrosRetiros()
        {
            this.ObjTipoPago = new ClsTipoPago();
            this.ObjRetiro = new ClsRetiro();
        }


    }
}
