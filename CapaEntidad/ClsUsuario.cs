using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CapaEntidad
{
    public class ClsUsuario
    {
        private string _ID_usuario;
        private string _Usuario;
        private string _clave;
        private string _fecha_inicio;
        private string _estado;

        public string ID_usuario { get => _ID_usuario; set => _ID_usuario = value; }
        public string Usuario { get => _Usuario; set => _Usuario = value; }
        public string Clave { get => _clave; set => _clave = value; }
        public string Fecha_inicio { get => _fecha_inicio; set => _fecha_inicio = value; }
        public string Estado { get => _estado; set => _estado = value; }

        public ClsUsuario()
        {

        }
    }
}
