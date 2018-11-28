using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CapaVista
{
    public partial class Pagina1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            /// asingar valor a la etiqueta de maestra
            //string x;
            //if (Session["Usuario"] != null)
            //{
            //    x = "Bienvenido " + Session["Usuario"].ToString() + "!!!";
            //    Label mplaber = (Label)Master.FindControl("lblWelcome");
            //    mplaber.Text = x;
            //}

            ///

            //Response.Write("<script language=javascript>alert('Usuario o Clave"+Session["Id"].ToString()+" incorrecta');</script>");
            
        }
    }
}