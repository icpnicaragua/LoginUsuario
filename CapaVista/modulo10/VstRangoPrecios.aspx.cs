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
    public partial class VstRangoPrecios : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
        }
        #region RegRangoPrecio
        [WebMethod]
        public static bool FnCRangoPrecioV(string RangoPrecio, string ValorMinimo)
        {
            bool CreateRangoPrecio = false;
            ClsRangoPrecio ORangoPrecio = new ClsRangoPrecio();

            ORangoPrecio.Rango = RangoPrecio;
            ORangoPrecio.ValorMinimo = ValorMinimo;

            CreateRangoPrecio = new ClsRangoPrecioN().FnCRangoPrecioN(ORangoPrecio);

            return CreateRangoPrecio;

        }

        [WebMethod]
        public static List<ClsRangoPrecio> FnRRangoPrecioV()
        {
            List<ClsRangoPrecio> ORangoPrecio = new ClsRangoPrecioN().FnRRangoPrecioN();
            return ORangoPrecio;
        }

        [WebMethod]
        public static bool FnURangoPrecioV(string IdRangoPrecio, string RangoPrecio, string ValorMinimo)
        {
            bool UpdateRangoPrecio = false;
            ClsRangoPrecio ORangoPrecio = new ClsRangoPrecio();

            ORangoPrecio.IdRangoPrecio = IdRangoPrecio;
            ORangoPrecio.Rango = RangoPrecio;
            ORangoPrecio.ValorMinimo = ValorMinimo;
            UpdateRangoPrecio = new ClsRangoPrecioN().FnURangoPrecioN(ORangoPrecio);

            return UpdateRangoPrecio;

        }

        [WebMethod]
        public static bool FnDRangoPrecioV(string IdRangoPrecio)
        {
            bool DeleteRangoPrecio = false;
            ClsRangoPrecio ORangoPrecio = new ClsRangoPrecio();

            ORangoPrecio.IdRangoPrecio = IdRangoPrecio;

            DeleteRangoPrecio = new ClsRangoPrecioN().FnDRangoPrecioN(ORangoPrecio);

            return DeleteRangoPrecio;

        }

        [WebMethod]
        public static bool FnERangoPrecioV(string IdRangoPrecio, string RangoPrecio)
        {
            bool ExisteRangoPrecio = false;
            ClsRangoPrecio ORangoPrecio = new ClsRangoPrecio();

            ORangoPrecio.IdRangoPrecio = IdRangoPrecio;
            ORangoPrecio.Rango = RangoPrecio;

            ExisteRangoPrecio = new ClsRangoPrecioN().FnERangoPrecioN(ORangoPrecio);

            return ExisteRangoPrecio;

        }
        #endregion

    }
}