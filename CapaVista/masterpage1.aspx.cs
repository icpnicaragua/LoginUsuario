using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;

namespace CapaVista
{
    public partial class masterpage1 : System.Web.UI.Page
    {
       
   


        protected void Page_Load(object sender, EventArgs e)
        {
            

        }

        [System.Web.Services.WebMethod]
        public static List<ClsPermisos> Modulos(string idsu)
        {
            List<ClsPermisos> objPermisos = new ClsPermisosN().PermisosPM(idsu);
            return objPermisos;
            
        }

   
       
    }
}