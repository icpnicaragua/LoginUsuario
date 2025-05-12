using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;

namespace CapaVista.modulo7
{
    public partial class VstUsuarios : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e) { }

        #region RegUsuario
        [WebMethod]
        public static bool FnCUsuarioV(string Usuario, string Clave, string IdEmpleado)
        {
            bool CreateUsuario = false;
            ClsUsuario OUsuario = new ClsUsuario();

            OUsuario.Usuario = Usuario;
            OUsuario.Clave = Clave;
            OUsuario.ObjEmpleado.IdEmpleado = IdEmpleado;

            CreateUsuario = new ClsUsuarioN().FnCUsuarioN(OUsuario);

            return CreateUsuario;

        }

        [WebMethod]
        public static List<ClsUsuario> FnRUsuarioV()
        {
            List<ClsUsuario> OUsuario = new ClsUsuarioN().FnRUsuarioN();
            return OUsuario;
        }

        [WebMethod]
        public static bool FnUUsuarioV(string IdUsuario, string Usuario, string Clave)
        {
            bool UpdateUsuario = false;
            ClsUsuario OUsuario = new ClsUsuario();

            OUsuario.ID_usuario = IdUsuario;
            OUsuario.Usuario = Usuario;
            OUsuario.Clave = Clave;

            UpdateUsuario = new ClsUsuarioN().FnUUsuarioN(OUsuario);

            return UpdateUsuario;

        }

        [WebMethod]
        public static bool FnDUsuarioV(string IdUsuario)
        {
            bool DeleteUsuario = false;
            ClsUsuario OUsuario = new ClsUsuario();

            OUsuario.ID_usuario = IdUsuario;

            DeleteUsuario = new ClsUsuarioN().FnDUsuarioN(OUsuario);

            return DeleteUsuario;

        }

        [WebMethod]
        public static bool FnEUsuarioV(string IdUsuario, string Usuario)
        {
            bool ExisteUsuario = false;
            ClsUsuario OUsuario = new ClsUsuario();

            OUsuario.ID_usuario = IdUsuario;
            OUsuario.Usuario = Usuario;

            ExisteUsuario = new ClsUsuarioN().FnEUsuarioN(OUsuario);

            return ExisteUsuario;

        }


        [WebMethod]
        public static List<ClsUsuario> FnRUsuarioNEmpleadoV()
        {
            List<ClsUsuario> OUsuario = new ClsUsuarioN().FnRUsuarioNEmpleadoN();
            return OUsuario;
        }

        #endregion
    }
}