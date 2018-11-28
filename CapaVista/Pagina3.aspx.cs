using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using System.Web.Services;

namespace CapaVista
{
    public partial class Pagina3 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]// se tiene que indicar que es para ajax
        public static List<ClsUsuario> Pruebaaa()
        {
            List<ClsUsuario> lista = new List<ClsUsuario>();
            try
            {
                ClsUsuario ObjUsuario1 = new ClsUsuario();
                ObjUsuario1.ID_usuario = "1";
                ObjUsuario1.Usuario = "u1";
                ObjUsuario1.Clave = "c1";
                ObjUsuario1.Fecha_inicio = "f1";
                lista.Add(ObjUsuario1);
                lista.Add(ObjUsuario1);
                lista.Add(ObjUsuario1);

                ClsUsuario ObjUsuario2 = new ClsUsuario();
                ObjUsuario2.ID_usuario = "2";
                ObjUsuario2.Usuario = "u2";
                ObjUsuario2.Clave = "c2";
                ObjUsuario2.Fecha_inicio = "f2";
                lista.Add(ObjUsuario2);
                lista.Add(ObjUsuario2);
                lista.Add(ObjUsuario2);


                return lista;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}