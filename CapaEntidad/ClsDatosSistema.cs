using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsDatosSistema
    {
        private string _IdDatosSistema;
        private string _Variables;
        private string _Valor;

        public string IdDatosSistema { get => _IdDatosSistema; set => _IdDatosSistema = value; }
        public string Variables { get => _Variables; set => _Variables = value; }
        public string Valor { get => _Valor; set => _Valor = value; }

        public ClsDatosSistema()
        {

        }
    }
}
