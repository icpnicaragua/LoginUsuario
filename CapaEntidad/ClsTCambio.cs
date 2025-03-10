using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsTCambio
    {
        private string _IdTC;
        private ClsMoneda _ObjMoneda;
        private string _CsMoneda;
        private string _FechaHora;
        private string _Estado;

        public string IdTC { get => _IdTC; set => _IdTC = value; }
        public ClsMoneda ObjMoneda { get => _ObjMoneda; set => _ObjMoneda = value; }
        public string CsMoneda { get => _CsMoneda; set => _CsMoneda = value; }
        public string FechaHora { get => _FechaHora; set => _FechaHora = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsTCambio()
        {
            this.ObjMoneda = new ClsMoneda();
        }


    }
}
