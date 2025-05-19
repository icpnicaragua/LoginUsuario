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
    public partial class VstTC : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e){}

        #region RegTCambio
        [WebMethod]
        public static bool FnCTCambioV(string TCambio, string IdMoneda, string Fecha)
        {
            bool CreateTCambio = false;
            ClsTCambio OTCambio = new ClsTCambio();

            OTCambio.TCambio = TCambio;
            OTCambio.ObjMoneda.IdMoneda = IdMoneda;
            OTCambio.Fecha = Fecha;

            CreateTCambio = new ClsTCambioN().FnCTCambioN(OTCambio);

            return CreateTCambio;

        }

        [WebMethod]
        public static List<ClsTCambio> FnRTCambioV()
        {
            List<ClsTCambio> OTCambio = new ClsTCambioN().FnRTCambioN();
            return OTCambio;
        }

        [WebMethod]
        public static bool FnUTCambioV(string IdTCambio, string TCambio, string IdMoneda, string Fecha)
        {
            bool UpdateTCambio = false;
            ClsTCambio OTCambio = new ClsTCambio();

            OTCambio.IdTCambio = IdTCambio;
            OTCambio.TCambio = TCambio;
            OTCambio.ObjMoneda.IdMoneda = IdMoneda;
            OTCambio.Fecha = Fecha;
            UpdateTCambio = new ClsTCambioN().FnUTCambioN(OTCambio);

            return UpdateTCambio;
        }

        [WebMethod]
        public static bool FnDTCambioV(string IdTCambio)
        {
            bool DeleteTCambio = false;
            ClsTCambio OTCambio = new ClsTCambio();

            OTCambio.IdTCambio = IdTCambio;

            DeleteTCambio = new ClsTCambioN().FnDTCambioN(OTCambio);

            return DeleteTCambio;

        }

        [WebMethod]
        public static bool FnETCambioV(string IdTCambio, string IdMoneda,string Fecha)
        {
            bool ExisteTCambio = false;
            ClsTCambio OTCambio = new ClsTCambio();

            OTCambio.IdTCambio = IdTCambio;
            OTCambio.Fecha = Fecha;
            OTCambio.ObjMoneda.IdMoneda = IdMoneda;

            ExisteTCambio = new ClsTCambioN().FnETCambioN(OTCambio);

            return ExisteTCambio;

        }
        #endregion
    }
}