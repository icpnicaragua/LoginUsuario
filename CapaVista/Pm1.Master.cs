using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using CapaEntidad;
using CapaNegocio;

namespace CapaVista
{
    public partial class Pm1 : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            
            string x;

            string PagActual;


            if (!Page.IsPostBack)
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
                        Response.Redirect("Login.aspx");
                    }

                    string[] PagActual01 = Request.FilePath.Split('/');

                    string[] PagAcual02 = PagActual01.Last().Split('.');

                    PagActual = PagAcual02.First();

                    PermisosVista(hfIDU.Value, PagActual);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }        
        }

        protected void btnCerrarSesion_Click(object sender, EventArgs e)
        {
            hfIDU.Value = "0";
            hfEU.Value = "0";
            Session.RemoveAll();
            Response.Redirect("Login.aspx?Cerrrarsesion=1");
        }

        public void PermisosVista(string idsu, string idaspvista)
        {
            List<ClsPermisos> objPermisosVista = new ClsPermisosN().PermisosVista(idsu, idaspvista);
//aqui es donde se cierran las ventanas y redirecciona al inicio
            foreach (ClsPermisos x in objPermisosVista)
            {
                if ((x.ObjV.Idaspvista == idaspvista && x.ObjE.Idaspelemento=="te")|| x.ObjV.Idaspvista == "tv")
                {
                    Response.Redirect("../inicio.aspx");
                }
            }
        }
    }
}