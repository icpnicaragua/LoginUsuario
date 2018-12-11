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
    public partial class WebForm2 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
        }
        [WebMethod]
        public static List<ClsTipoControl> MostrarTC()
        {
            List<ClsTipoControl> OTC = new ClsTicoControlN().MostrarTC();
            return OTC;
        }

        [WebMethod]
        public static List<ClsElemento> FnRElem()
        {
            List<ClsElemento> OElem = new ClsElementoN().FnRElem();
            
            return OElem;
        }

        [WebMethod]
        public static List<ClsVista> FnRVist()
        {
            List<ClsVista> OVist = new ClsVistaN().FnRVist();
            return OVist;
        }

        [WebMethod]
        public static bool FnETicoTC(string id,string tc, string CUDE)
        {
            bool ExisteTCTC = false;
            ClsTipoControl OTico = new ClsTipoControl();
            OTico.Idtipocontrol = id;
            OTico.Tipocontrol = tc;
         
            ExisteTCTC= new ClsTicoControlN().FnETicoTC(OTico,CUDE);
            return ExisteTCTC;
        }

        [WebMethod]
        public static bool FnEElemEl(string EIdEl, string EElem, string EIdTC, string EIdVi)
        {
            bool ExisteEE = false;
            ClsElemento OElem = new ClsElemento();
            OElem.Id_elemento = EIdEl;
            OElem.Elemento = EElem;
            OElem.ObjTipo_control.Idtipocontrol = EIdTC;
            OElem.ObjVista.Idvista = EIdVi;

            ExisteEE = new ClsElementoN().FnEElemEl(OElem); // enviar a capa N

            return ExisteEE;
        }

        [WebMethod]
        public static bool FnEElemAE(string EIdEl, string EAspE, string EIdVi)
        {
            bool ExisteEA = false;
            ClsElemento OElem = new ClsElemento();
            OElem.Id_elemento = EIdEl;
            OElem.Idaspelemento = EAspE;
            OElem.ObjVista.Idvista = EIdVi;

            ExisteEA = new ClsElementoN().FnEElemAE(OElem); // enviar a capa N

            return ExisteEA;
        }



    }
}