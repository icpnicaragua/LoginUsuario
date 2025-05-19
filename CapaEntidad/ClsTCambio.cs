using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsTCambio
    {
        private string _IdTCambio;
        private ClsMoneda _ObjMoneda;
        private string _TCambio;
        private string _Fecha;
        private string _Estado;

        public string IdTCambio { get => _IdTCambio; set => _IdTCambio = value; }
        public ClsMoneda ObjMoneda { get => _ObjMoneda; set => _ObjMoneda = value; }
        public string TCambio { get => _TCambio; set => _TCambio = value; }
        public string Fecha { get => _Fecha; set => _Fecha = value; }
        public string Estado { get => _Estado; set => _Estado = value; }

        public ClsTCambio()
        {
            this.ObjMoneda = new ClsMoneda();
        }


    }
}
