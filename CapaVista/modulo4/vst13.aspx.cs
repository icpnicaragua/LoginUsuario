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
        public static bool FnDVista(string IdVista)
        {
            bool ok = false;
            ClsVista OVista = new ClsVista();

            OVista.Idvista = IdVista;
            ok = new ClsVistaN().FnDVistaN(OVista);   
            return ok;
        }

        [WebMethod]
        public static bool FnCVistaV(string Vista, string IdAspVista, string IdModulo)
        {
            bool CreateVista = false;
            ClsVista OVista = new ClsVista();

            OVista.Vista =Vista;
            OVista.Idaspvista = IdAspVista;
            OVista.ObjModulo.IdModulo = IdModulo;

            CreateVista = new ClsVistaN().FnCVistaN(OVista);

            return CreateVista;
        }

        [WebMethod]
        public static bool FnUVistaV(string IdVista, string Vista, string IdAspVista, string IdModulo)
        {
            bool UpdateVista = false;
            ClsVista OVista = new ClsVista();

            OVista.Idvista = IdVista;
            OVista.Vista = Vista;
            OVista.Idaspvista = IdAspVista;
            OVista.ObjModulo.IdModulo = IdModulo;

            UpdateVista = new ClsVistaN().FnUVistaN(OVista);

            return UpdateVista;
        }

        [WebMethod]
        public static bool FnEVistaV(string IdVista, string IDModulo, string Vista)
        {
            bool ExisteVista = true;
            ClsVista Ovista = new ClsVista();
            Ovista.Idvista = IdVista;
            Ovista.ObjModulo.IdModulo = IDModulo;
            Ovista.Vista = Vista;

            ExisteVista = new ClsVistaN().FnEVistaN(Ovista);
            return ExisteVista;
        }

        [WebMethod]
        public static bool FnEVistaAspV(string IdVista, string IDModulo, string VistaAsp)
        {
            bool ExisteVistaasp = true;
            ClsVista Ovista = new ClsVista();
            Ovista.Idvista = IdVista;
            Ovista.ObjModulo.IdModulo = IDModulo;
            Ovista.Idaspvista = VistaAsp;

            ExisteVistaasp = new ClsVistaN().FnEVistaAspN(Ovista);
            return ExisteVistaasp;
        }


        [WebMethod]
        public static bool FnCElementoV(string Elemento, string ElementoAsp, string IdTipoControl,string IdVista)
        {
            bool CreateElemento = false;
            ClsElemento OElemento = new ClsElemento();

            OElemento.Elemento = Elemento;
            OElemento.Idaspelemento = ElementoAsp;
            OElemento.ObjTipo_control.Idtipocontrol = IdTipoControl;
            OElemento.ObjVista.Idvista = IdVista;

            CreateElemento = new ClsElementoN().FnCElementoN(OElemento);

            return CreateElemento;
        }
        [WebMethod]
        public static List<ClsElemento> FnRElem()
        {
            List<ClsElemento> OElem = new ClsElementoN().FnRElem();

            return OElem;
        }
        [WebMethod]
        public static bool FnUElementoV(string IdElemento,string Elemento, string ElementoAsp, string IdTipoControl, string IdVista)
        {
            bool UpdateElemento = false;
            ClsElemento OElemento = new ClsElemento();

            OElemento.Id_elemento = IdElemento;
            OElemento.Elemento = Elemento;
            OElemento.Idaspelemento = ElementoAsp;
            OElemento.ObjTipo_control.Idtipocontrol = IdTipoControl;
            OElemento.ObjVista.Idvista = IdVista;

            UpdateElemento = new ClsElementoN().FnUElementoN(OElemento);

            return UpdateElemento;
        }
        [WebMethod]
        public static bool FnDElementoV(string IdElemento)
        {
            bool DeleteElemento = false;
            ClsElemento OElemento = new ClsElemento();

            OElemento.Id_elemento = IdElemento;

            DeleteElemento = new ClsElementoN().FnDElementoN(OElemento);

            return DeleteElemento;
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





        [WebMethod]
        public static bool FnCModuloV(string Modulo, string ModuloAsp)
        {
            bool CreateModulo = false;
            ClsModulo OModulo = new ClsModulo();

            OModulo.Modulo=Modulo;
            OModulo.Idaspmodulo= ModuloAsp;

            CreateModulo = new ClsModuloN().FnCModuloN(OModulo);

            return CreateModulo;
        }

        [WebMethod]
        public static List<ClsModulo> FnRModuloV()
        {
            List<ClsModulo> OModulo = new ClsModuloN().FnRModuloN();
            return OModulo;
        }

        [WebMethod]
        public static bool FnUModuloV(string IdModulo,string Modulo, string ModuloAsp)
        {
            bool UpdateModulo = false;
            ClsModulo OModulo = new ClsModulo();
            
            OModulo.IdModulo = IdModulo;
            OModulo.Modulo = Modulo;
            OModulo.Idaspmodulo = ModuloAsp;

            UpdateModulo = new ClsModuloN().FnUModuloN(OModulo);

            return UpdateModulo;
        }

        [WebMethod]
        public static bool FnDModuloV(string IdModulo)
        {
            bool DeleteModulo = false;
            ClsModulo OModulo = new ClsModulo();

            OModulo.IdModulo = IdModulo;
            DeleteModulo = new ClsModuloN().FnDModuloN(OModulo);
            return DeleteModulo;
        }

        [WebMethod]
        public static bool FnEModuloV(string IdModulo, string Modulo)
        {
            bool ExisteModulo = true;
            ClsModulo Omodulo = new ClsModulo();
            Omodulo.IdModulo = IdModulo;
            Omodulo.Modulo = Modulo;
            ExisteModulo = new ClsModuloN().FnEModuloN(Omodulo);
            return ExisteModulo;
        }

        [WebMethod]
        public static bool FnEModuloAspV(string IdModulo, string ModuloAsp)
        {
            bool ExisteModuloAsp = true;
            ClsModulo Omodulo = new ClsModulo();
            Omodulo.IdModulo = IdModulo;
            Omodulo.Idaspmodulo = ModuloAsp;
            ExisteModuloAsp = new ClsModuloN().FnEModuloAspN(Omodulo);
            return ExisteModuloAsp;
        }
    }
}