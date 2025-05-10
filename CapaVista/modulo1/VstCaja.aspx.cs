using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;

namespace CapaVista.modulo1
{
    public partial class VstCaja : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e) { }


        #region RegDenominacionesCS
        [WebMethod]
        public static bool FnCDenominacionesCSV(string DenominacionesCS, string Cantidad)
        {
            bool CreateDenominacionesCS = false;
            ClsDenominacionesCS ODenominacionesCS = new ClsDenominacionesCS();

            ODenominacionesCS.Nombre = DenominacionesCS;
            ODenominacionesCS.Cantidad= DenominacionesCS;

            CreateDenominacionesCS = new ClsDenominacionesCSN().FnCDenominacionesCSN(ODenominacionesCS);

            return CreateDenominacionesCS;

        }

        [WebMethod]
        public static List<ClsDenominacionesCS> FnRDenominacionesCSV()
        {
            List<ClsDenominacionesCS> ODenominacionesCS = new ClsDenominacionesCSN().FnRDenominacionesCSN();
            return ODenominacionesCS;
        }

        [WebMethod]
        public static bool FnUDenominacionesCSV(string IdDenominacionesCS, string DenominacionesCS, string Cantidad)
        {
            bool UpdateDenominacionesCS = false;
            ClsDenominacionesCS ODenominacionesCS = new ClsDenominacionesCS();

            ODenominacionesCS.IdDenominacion = IdDenominacionesCS;
            ODenominacionesCS.Nombre = DenominacionesCS;
            ODenominacionesCS.Cantidad = Cantidad;

            UpdateDenominacionesCS = new ClsDenominacionesCSN().FnUDenominacionesCSN(ODenominacionesCS);

            return UpdateDenominacionesCS;

        }

        [WebMethod]
        public static bool FnDDenominacionesCSV(string IdDenominacionesCS)
        {
            bool DeleteDenominacionesCS = false;
            ClsDenominacionesCS ODenominacionesCS = new ClsDenominacionesCS();

            ODenominacionesCS.IdDenominacion = IdDenominacionesCS;

            DeleteDenominacionesCS = new ClsDenominacionesCSN().FnDDenominacionesCSN(ODenominacionesCS);

            return DeleteDenominacionesCS;

        }

        [WebMethod]
        public static bool FnEDenominacionesCSV(string IdDenominacionesCS, string DenominacionesCS, string Cantidad)
        {
            bool ExisteDenominacionesCS = false;
            ClsDenominacionesCS ODenominacionesCS = new ClsDenominacionesCS();

            ODenominacionesCS.IdDenominacion = IdDenominacionesCS;
            ODenominacionesCS.Nombre = DenominacionesCS;
            ODenominacionesCS.Cantidad = Cantidad;

            ExisteDenominacionesCS = new ClsDenominacionesCSN().FnEDenominacionesCSN(ODenominacionesCS);

            return ExisteDenominacionesCS;

        }
        #endregion

    }
}