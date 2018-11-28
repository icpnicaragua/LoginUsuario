using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class Cls_Rol_Permiso
    {
        private string _Id_Rol_Permiso;
        private string _fecha_inicioRP;
        private string _estadoRP;
        private ClsRol _objRol;
        private ClsPermiso _objPermiso;
        
        public string Id_Rol_Permiso { get => _Id_Rol_Permiso; set => _Id_Rol_Permiso = value; }
        public string Fecha_inicioRP { get => _fecha_inicioRP; set => _fecha_inicioRP = value; }
        public string EstadoRP { get => _estadoRP; set => _estadoRP = value; }
        public ClsRol ObjRol { get => _objRol; set => _objRol = value; }
        public ClsPermiso ObjPermiso { get => _objPermiso; set => _objPermiso = value; }

        public Cls_Rol_Permiso()
        {
            this.ObjRol = new ClsRol();
            this.ObjPermiso = new ClsPermiso();
        }
      
    }
}
