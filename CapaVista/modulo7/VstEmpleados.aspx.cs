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

namespace CapaVista.modulo7
{
    public partial class VstEmpleados : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        #region RegArea
        [WebMethod]
        public static bool FnCAreaV(string Area)
        {
            bool CreateArea = false;
            ClsArea OArea = new ClsArea();

            OArea.Area = Area;

            CreateArea = new ClsAreaN().FnCAreaN(OArea);

            return CreateArea;

        }

        [WebMethod]
        public static List<ClsArea> FnRAreaV()
        {
            List<ClsArea> OArea = new ClsAreaN().FnRAreaN();
            return OArea;
        }

        [WebMethod]
        public static bool FnUAreaV(string IdArea, string Area)
        {
            bool UpdateArea = false;
            ClsArea OArea = new ClsArea();

            OArea.IdArea = IdArea;
            OArea.Area = Area;

            UpdateArea = new ClsAreaN().FnUAreaN(OArea);

            return UpdateArea;

        }

        [WebMethod]
        public static bool FnDAreaV(string IdArea)
        {
            bool DeleteArea = false;
            ClsArea OArea = new ClsArea();

            OArea.IdArea = IdArea;

            DeleteArea = new ClsAreaN().FnDAreaN(OArea);

            return DeleteArea;

        }

        [WebMethod]
        public static bool FnEAreaV(string IdArea, string Area)
        {
            bool ExisteArea = false;
            ClsArea OArea = new ClsArea();

            OArea.IdArea = IdArea;
            OArea.Area = Area;

            ExisteArea = new ClsAreaN().FnEAreaN(OArea);

            return ExisteArea;

        }
        #endregion

    }
}