using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;
using System.Web.Services;
using System.Net;

namespace CapaVista.modulo10
{
    public partial class VstPromo : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        #region RegPromo
        [WebMethod]
        public static bool FnCPromoV(string Promo)
        {
            bool CreatePromo = false;
            ClsPromo OPromo = new ClsPromo();

            OPromo.Promo = Promo;

            CreatePromo = new ClsPromoN().FnCPromoN(OPromo);

            return CreatePromo;

        }

        [WebMethod]
        public static List<ClsPromo> FnRPromoV()
        {
            List<ClsPromo> OPromo = new ClsPromoN().FnRPromoN();
            return OPromo;
        }

        [WebMethod]
        public static bool FnUPromoV(string IdPromo, string Promo)
        {
            bool UpdatePromo = false;
            ClsPromo OPromo = new ClsPromo();

            OPromo.IdPromo = IdPromo;
            OPromo.Promo = Promo;

            UpdatePromo = new ClsPromoN().FnUPromoN(OPromo);

            return UpdatePromo;

        }

        [WebMethod]
        public static bool FnDPromoV(string IdPromo)
        {
            bool DeletePromo = false;
            ClsPromo OPromo = new ClsPromo();

            OPromo.IdPromo = IdPromo;

            DeletePromo = new ClsPromoN().FnDPromoN(OPromo);

            return DeletePromo;

        }

        [WebMethod]
        public static bool FnEPromoV(string IdPromo, string Promo)
        {
            bool ExistePromo = false;
            ClsPromo OPromo = new ClsPromo();

            OPromo.IdPromo = IdPromo;
            OPromo.Promo = Promo;

            ExistePromo = new ClsPromoN().FnEPromoN(OPromo);

            return ExistePromo;

        }
        #endregion

    }
}