using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsPermiso
    {
        private string _Id_Permiso;
        private string _Permiso;
        private string _Fecha_inicioPermiso;
        private string _EstadoPermiso;
        private ClsModulo _objModulo;
        private ClsVista _objVista;
        private ClsElemento _objElemento;

        public string Id_Permiso { get => _Id_Permiso; set => _Id_Permiso = value; }
        public string Permiso { get => _Permiso; set => _Permiso = value; }
        public string Fecha_inicioPermiso { get => _Fecha_inicioPermiso; set => _Fecha_inicioPermiso = value; }
        public string EstadoPermiso { get => _EstadoPermiso; set => _EstadoPermiso = value; }
        public ClsModulo ObjModulo { get => _objModulo; set => _objModulo = value; }
        public ClsVista ObjVista { get => _objVista; set => _objVista = value; }
        public ClsElemento ObjElemento { get => _objElemento; set => _objElemento = value; }

        public ClsPermiso()
        {
            this.ObjModulo = new ClsModulo();
            this.ObjVista = new ClsVista();
            this.ObjElemento = new ClsElemento();

        }
    }
}
