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

namespace CapaVista.modulo9
{
    public partial class VstCxC : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        #region RegTipoPago
        [WebMethod]
        public static bool FnCTipoPagoV(string TipoPago)
        {
            bool CreateTipoPago = false;
            ClsTipoPago OTipoPago = new ClsTipoPago();

            OTipoPago.TipoPago = TipoPago;

            CreateTipoPago = new ClsTipoPagoN().FnCTipoPagoN(OTipoPago);

            return CreateTipoPago;

        }

        [WebMethod]
        public static List<ClsTipoPago> FnRTipoPagoV()
        {
            List<ClsTipoPago> OTipoPago = new ClsTipoPagoN().FnRTipoPagoN();
            return OTipoPago;
        }

        [WebMethod]
        public static bool FnUTipoPagoV(string IdTipoPago, string TipoPago)
        {
            bool UpdateTipoPago = false;
            ClsTipoPago OTipoPago = new ClsTipoPago();

            OTipoPago.IdTipoPago = IdTipoPago;
            OTipoPago.TipoPago = TipoPago;

            UpdateTipoPago = new ClsTipoPagoN().FnUTipoPagoN(OTipoPago);

            return UpdateTipoPago;

        }

        [WebMethod]
        public static bool FnDTipoPagoV(string IdTipoPago)
        {
            bool DeleteTipoPago = false;
            ClsTipoPago OTipoPago = new ClsTipoPago();

            OTipoPago.IdTipoPago = IdTipoPago;

            DeleteTipoPago = new ClsTipoPagoN().FnDTipoPagoN(OTipoPago);

            return DeleteTipoPago;

        }

        [WebMethod]
        public static bool FnETipoPagoV(string IdTipoPago, string TipoPago)
        {
            bool ExisteTipoPago = false;
            ClsTipoPago OTipoPago = new ClsTipoPago();

            OTipoPago.IdTipoPago = IdTipoPago;
            OTipoPago.TipoPago = TipoPago;

            ExisteTipoPago = new ClsTipoPagoN().FnETipoPagoN(OTipoPago);

            return ExisteTipoPago;

        }
        #endregion

    }
}