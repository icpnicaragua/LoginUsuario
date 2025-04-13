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
    public partial class VstTipoCliente : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        #region RegTipoCliente
        [WebMethod]
        public static bool FnCTipoClienteV(string TipoCliente)
        {
            bool CreateTipoCliente = false;
            ClsTipoCliente OTipoCliente = new ClsTipoCliente();

            OTipoCliente.TipoCliente = TipoCliente;

            CreateTipoCliente = new ClsTipoClienteN().FnCTipoClienteN(OTipoCliente);

            return CreateTipoCliente;

        }

        [WebMethod]
        public static List<ClsTipoCliente> FnRTipoClienteV()
        {
            List<ClsTipoCliente> OTipoCliente = new ClsTipoClienteN().FnRTipoClienteN();
            return OTipoCliente;
        }

        [WebMethod]
        public static bool FnUTipoClienteV(string IdTipoCliente, string TipoCliente)
        {
            bool UpdateTipoCliente = false;
            ClsTipoCliente OTipoCliente = new ClsTipoCliente();

            OTipoCliente.IdTipoCliente = IdTipoCliente;
            OTipoCliente.TipoCliente = TipoCliente;

            UpdateTipoCliente = new ClsTipoClienteN().FnUTipoClienteN(OTipoCliente);

            return UpdateTipoCliente;

        }

        [WebMethod]
        public static bool FnDTipoClienteV(string IdTipoCliente)
        {
            bool DeleteTipoCliente = false;
            ClsTipoCliente OTipoCliente = new ClsTipoCliente();

            OTipoCliente.IdTipoCliente = IdTipoCliente;

            DeleteTipoCliente = new ClsTipoClienteN().FnDTipoClienteN(OTipoCliente);

            return DeleteTipoCliente;

        }

        [WebMethod]
        public static bool FnETipoClienteV(string IdTipoCliente, string TipoCliente)
        {
            bool ExisteTipoCliente = false;
            ClsTipoCliente OTipoCliente = new ClsTipoCliente();

            OTipoCliente.IdTipoCliente = IdTipoCliente;
            OTipoCliente.TipoCliente = TipoCliente;

            ExisteTipoCliente = new ClsTipoClienteN().FnETipoClienteN(OTipoCliente);

            return ExisteTipoCliente;

        }
        #endregion

    }
}