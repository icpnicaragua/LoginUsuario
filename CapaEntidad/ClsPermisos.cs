using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsPermisos
    {
        private ClsUsuario _objU;
        private ClsUsuario_Rol _objUR;
        private ClsRol _objR;
        private Cls_Rol_Permiso _objRP;
        private ClsPermiso _objP;
        private ClsModulo _objM;
        private ClsVista _objV;
        private ClsElemento _objE;
        private ClsTipoControl _objTC;

        public ClsUsuario ObjU { get => _objU; set => _objU = value; }
        public ClsUsuario_Rol ObjUR { get => _objUR; set => _objUR = value; }
        public ClsRol ObjR { get => _objR; set => _objR = value; }
        public Cls_Rol_Permiso ObjRP { get => _objRP; set => _objRP = value; }
        public ClsPermiso ObjP { get => _objP; set => _objP = value; }
        public ClsModulo ObjM { get => _objM; set => _objM = value; }
        public ClsVista ObjV { get => _objV; set => _objV = value; }
        public ClsElemento ObjE { get => _objE; set => _objE = value; }
        public ClsTipoControl ObjTC { get => _objTC; set => _objTC = value; }

        public ClsPermisos()
        {
            this.ObjU = new ClsUsuario();
            this.ObjUR = new ClsUsuario_Rol();
            this.ObjR = new ClsRol();
            this.ObjP = new ClsPermiso();
            this.ObjM = new ClsModulo();
            this.ObjV = new ClsVista();
            this.ObjE = new ClsElemento();
            this.ObjTC = new ClsTipoControl();
        }
    }
}
