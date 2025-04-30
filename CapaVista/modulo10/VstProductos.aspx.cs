using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;

namespace CapaVista.modulo10
{
    public partial class VstProductos : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        #region RegGarantia
        [WebMethod]
        public static bool FnCGarantiaV(string Garantia)
        {
            bool CreateGarantia = false;
            ClsGarantia OGarantia = new ClsGarantia();

            OGarantia.Garantia = Garantia;

            CreateGarantia = new ClsGarantiaN().FnCGarantiaN(OGarantia);

            return CreateGarantia;

        }

        [WebMethod]
        public static List<ClsGarantia> FnRGarantiaV()
        {
            List<ClsGarantia> OGarantia = new ClsGarantiaN().FnRGarantiaN();
            return OGarantia;
        }

        [WebMethod]
        public static bool FnUGarantiaV(string IdGarantia, string Garantia)
        {
            bool UpdateGarantia = false;
            ClsGarantia OGarantia = new ClsGarantia();

            OGarantia.IdGarantia = IdGarantia;
            OGarantia.Garantia = Garantia;

            UpdateGarantia = new ClsGarantiaN().FnUGarantiaN(OGarantia);

            return UpdateGarantia;

        }

        [WebMethod]
        public static bool FnDGarantiaV(string IdGarantia)
        {
            bool DeleteGarantia = false;
            ClsGarantia OGarantia = new ClsGarantia();

            OGarantia.IdGarantia = IdGarantia;

            DeleteGarantia = new ClsGarantiaN().FnDGarantiaN(OGarantia);

            return DeleteGarantia;

        }

        [WebMethod]
        public static bool FnEGarantiaV(string IdGarantia, string Garantia)
        {
            bool ExisteGarantia = false;
            ClsGarantia OGarantia = new ClsGarantia();

            OGarantia.IdGarantia = IdGarantia;
            OGarantia.Garantia = Garantia;

            ExisteGarantia = new ClsGarantiaN().FnEGarantiaN(OGarantia);

            return ExisteGarantia;

        }
        #endregion

    }
}