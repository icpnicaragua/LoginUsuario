using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;
using System.Web.Services;

namespace CapaVista.modulo4
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
           
        }


        
             [WebMethod]
        public static List<ClsPermisos> FnRPermisosV(string IdRol)
        {
            List<ClsPermisos> ObjPermisos = new ClsPermisosN().FnRPermisosN(IdRol);

            return ObjPermisos;
        }


        [WebMethod]
        public static bool FnUPermisos(List<ClsPermisos> OO,string IDR)
        {

            bool UpdatePermisos = false;
            bool DeletePermisos = false;
          
            ClsPermisos Opermisos1 = new ClsPermisos();
            Opermisos1.ObjR.Id_rol = IDR;
            DeletePermisos = new ClsPermisosN().FnDPermisosN(Opermisos1);

            foreach (ClsPermisos OO1 in OO)
            {
                ClsPermisos Opermisos = new ClsPermisos();
                Opermisos.ObjM.IdModulo = OO1.ObjM.IdModulo;
                Opermisos.ObjV.Idvista = OO1.ObjV.Idvista;
                Opermisos.ObjE.Id_elemento = OO1.ObjE.Id_elemento;
                Opermisos.ObjR.Id_rol = IDR;
                UpdatePermisos = new ClsPermisosN().FnUPermisosN(Opermisos);
            }

            return DeletePermisos & UpdatePermisos;
        }


        [WebMethod]
        public static bool FnCRolV(string Rol)
        {
            bool CreateRol = false;
            ClsRol ORol = new ClsRol();
            ORol.Rol = Rol;
            CreateRol = new ClsRolN().FnCRolN(ORol);
            return CreateRol;
        }

        [WebMethod]
        public static List<ClsRol> FnRRolV()
        {
            List<ClsRol> ORol = new ClsRolN().FnRRolN();
            return ORol;
        }

        [WebMethod]
        public static bool FnURolV(string IdRol, string Rol)
        {
            bool UpdateRol = false;
            ClsRol ORol = new ClsRol();
            ORol.Id_rol = IdRol;
            ORol.Rol = Rol;
            UpdateRol = new ClsRolN().FnURolN(ORol);
            return UpdateRol;
        }

        [WebMethod]
        public static bool FnDRolV(string IdRol)
        {
            bool DeleteRol = false;
            ClsRol ORol = new ClsRol();
            ORol.Id_rol = IdRol;

            DeleteRol = new ClsRolN().FnDRolN(ORol);
            return DeleteRol;
        }

        [WebMethod]
        public static bool FnERolV(string IdRol, string Rol)
        {
            bool ExistRol = false;
            ClsRol ORol = new ClsRol();
            ORol.Id_rol = IdRol;
            ORol.Rol = Rol;
            ExistRol = new ClsRolN().FnERolN(ORol);
            return ExistRol;
        }

        [WebMethod]
        public static bool FnNRolV(string IdRol)
        {
            bool CloneRol = false;
            ClsRol ORol = new ClsRol();
            ORol.Id_rol = IdRol;
            CloneRol = new ClsRolN().FnNRolN(ORol);
            return CloneRol;
        }

    }
}