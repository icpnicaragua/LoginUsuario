using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;

namespace CapaVista
{
    public partial class Pm1 : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            
            string x;

            if(!Page.IsPostBack)
            {
                //asingar nombre de usuario
                try
                {
                    if (Session["Usuario"] != null)
                    {
                        x = "Bienvenido " + Session["Usuario"].ToString() + "!!!";
                        lblWelcome.Text = x;
                        
                        hfIDU.Value= Session["Id"].ToString();
                        hfEU.Value= Session["Estado"].ToString();
                        //ver los permisos

                    }
                    if (Session["Usuario"] == null || Session["Estado"].ToString() == "0") // si no ha entrado o está muerto
                    {
                        hfIDU.Value = "0";
                        hfEU.Value = "0";
                       
                        Response.Write("<script language=javascript>alert('Primero hay que iniciar sessión.');</script>");
                        Response.Redirect("../Login.aspx");
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }


                //en la maesta se va a bloquear todos los li ul
                //try
                //{
                //    if (Session["Usuario"] != null)
                //    {
                //        if (Session["Usuario"].ToString() == "yolanda")
                //        {
                //            lipanel2.Visible = false;
                //        }
                //    }
                //}
                //catch (Exception ex)
                //{
                //    throw ex;
                //}
            }        
        }

        protected void btnCerrarSesion_Click(object sender, EventArgs e)
        {
            hfIDU.Value = "0";
            hfEU.Value = "0";
            Session.RemoveAll();
            Response.Redirect("Login.aspx?Cerrrarsesion=1");
        }

     

    }

}