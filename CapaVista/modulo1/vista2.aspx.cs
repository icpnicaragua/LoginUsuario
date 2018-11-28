using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;

namespace CapaVista.modulo1
{
    public partial class vista2 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {

            //se tiene que crear primero las entidades para no perder tiempo con la entidad usuario
            List<ClsUsuario> lista = new List<ClsUsuario>();
          
                ClsUsuario ObjUsuario1 = new ClsUsuario();
                ObjUsuario1.ID_usuario = "1";
                ObjUsuario1.Usuario = "modulo1";
                ObjUsuario1.Clave = null;
                ObjUsuario1.Estado = "1";
                lista.Add(ObjUsuario1);

            ClsUsuario ObjUsuario2 = new ClsUsuario();
            ObjUsuario1.ID_usuario = "1";
            ObjUsuario1.Usuario = "modulo1";
            ObjUsuario1.Clave = null;
            ObjUsuario1.Estado = "1";
            lista.Add(ObjUsuario2);

            ClsUsuario ObjUsuario3 = new ClsUsuario();
            ObjUsuario1.ID_usuario = "1";
            ObjUsuario1.Usuario = "modulo1";
            ObjUsuario1.Clave = null;
            ObjUsuario1.Estado = "1";
            lista.Add(ObjUsuario3);

            foreach(ClsUsuario rm in lista)
            {
                Response.Write(rm.ID_usuario + rm.Usuario);
                
            }

        }
    }
}