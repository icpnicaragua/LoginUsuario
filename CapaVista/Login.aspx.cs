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
    
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            
            //si cerró sesión borra las variables de sessión
            try
            {
                if(!IsPostBack)
                {
                    if (Request.Params["Cerrrarsesion"] != null)
                    {
                        if (Request.Params["Cerrrarsesion"].ToString() == "1")
                        {
                            Session.RemoveAll();
                        }
                    }
                }
                
            }
            catch(Exception ex)
            {
                throw ex;
            }
         
        }

        protected void btnIngresar_Click(object sender, EventArgs e)
        {
            
            try
            {
                if (Session["Id"] != null)
                {
                    Response.Write("<script language=javascript>alert('xxx');</script>"); //Ya a iniciado sessión, se borrará los datos de la sesión par iniciar nuevamente 
                    Session.RemoveAll();
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }

            if (Page.IsValid)
            {
                try
                {
                    ClsUsuario ObjUsuario = new ClsUsuarioN().Login(txtUsuario.Text, TxtClave.Text);
                    if (ObjUsuario != null)
                    {
                        
                        Session["Usuario"] = ObjUsuario.Usuario;
                        Session["Id"] = ObjUsuario.ID_usuario;
                        Session["Estado"] = ObjUsuario.Estado;
                        Session.Timeout = 20;

                        Response.Redirect("Inicio.aspx");

                    }
                    else
                    {
                        Response.Write("<script language=javascript>alert('Usuario o Clave incorrecta');</script>");
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            
            
        }
    }
}