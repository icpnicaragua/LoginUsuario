using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;

namespace CapaVista
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            ClsUsuario ObjUsuario = new ClsUsuarioN().Login("icp", "1234");
            if (ObjUsuario != null)
            {

                Label1.Text = "conectado";

            }
            else
            {

                Label1.Text = "desconectado";
            }

        }
    }
}