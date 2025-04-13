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
namespace CapaVista.modulo1
{
    public partial class VstGastos : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        #region RegTipoGasto
        [WebMethod]
        public static bool FnCTipoGastoV(string TipoGasto)
        {
            bool CreateTipoGasto = false;
            ClsTipoGasto OTipoGasto = new ClsTipoGasto();

            OTipoGasto.TipoGasto = TipoGasto;

            CreateTipoGasto = new ClsTipoGastoN().FnCTipoGastoN(OTipoGasto);

            return CreateTipoGasto;

        }

        [WebMethod]
        public static List<ClsTipoGasto> FnRTipoGastoV()
        {
            List<ClsTipoGasto> OTipoGasto = new ClsTipoGastoN().FnRTipoGastoN();
            return OTipoGasto;
        }

        [WebMethod]
        public static bool FnUTipoGastoV(string IdTipoGasto, string TipoGasto)
        {
            bool UpdateTipoGasto = false;
            ClsTipoGasto OTipoGasto = new ClsTipoGasto();

            OTipoGasto.IdTipoGasto = IdTipoGasto;
            OTipoGasto.TipoGasto = TipoGasto;

            UpdateTipoGasto = new ClsTipoGastoN().FnUTipoGastoN(OTipoGasto);

            return UpdateTipoGasto;

        }

        [WebMethod]
        public static bool FnDTipoGastoV(string IdTipoGasto)
        {
            bool DeleteTipoGasto = false;
            ClsTipoGasto OTipoGasto = new ClsTipoGasto();

            OTipoGasto.IdTipoGasto = IdTipoGasto;

            DeleteTipoGasto = new ClsTipoGastoN().FnDTipoGastoN(OTipoGasto);

            return DeleteTipoGasto;

        }

        [WebMethod]
        public static bool FnETipoGastoV(string IdTipoGasto, string TipoGasto)
        {
            bool ExisteTipoGasto = false;
            ClsTipoGasto OTipoGasto = new ClsTipoGasto();

            OTipoGasto.IdTipoGasto = IdTipoGasto;
            OTipoGasto.TipoGasto = TipoGasto;

            ExisteTipoGasto = new ClsTipoGastoN().FnETipoGastoN(OTipoGasto);

            return ExisteTipoGasto;

        }
        #endregion
    }
}