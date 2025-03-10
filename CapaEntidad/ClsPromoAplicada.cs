using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsPromoAplicada
    {
        private ClsPromo _ObjPromo;
        private ClsProducto _ObjProducto;
        private string _Valor;
        private string _FechaInicio;
        private string _FechaFin;
        private string _Estado;

        public ClsPromo ObjPromo { get => _ObjPromo; set => _ObjPromo = value; }
        public ClsProducto ObjProducto { get => _ObjProducto; set => _ObjProducto = value; }
        public string Valor { get => _Valor; set => _Valor = value; }
        public string FechaInicio { get => _FechaInicio; set => _FechaInicio = value; }
        public string FechaFin { get => _FechaFin; set => _FechaFin = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsPromoAplicada()
        {
            this.ObjPromo = new ClsPromo();
            this.ObjProducto = new ClsProducto();
        }


    }
}
