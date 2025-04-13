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
    public partial class VstPalabrasClave : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        #region RegPalabraClave
        [WebMethod]
        public static bool FnCPalabraClaveV(string PalabraClave)
        {
            bool CreatePalabraClave = false;
            ClsPalabraClave OPalabraClave = new ClsPalabraClave();

            OPalabraClave.PalabraClave = PalabraClave;

            CreatePalabraClave = new ClsPalabraClaveN().FnCPalabraClaveN(OPalabraClave);

            return CreatePalabraClave;

        }

        [WebMethod]
        public static List<ClsPalabraClave> FnRPalabraClaveV()
        {
            List<ClsPalabraClave> OPalabraClave = new ClsPalabraClaveN().FnRPalabraClaveN();
            return OPalabraClave;
        }

        [WebMethod]
        public static bool FnUPalabraClaveV(string IdPalabraClave, string PalabraClave)
        {
            bool UpdatePalabraClave = false;
            ClsPalabraClave OPalabraClave = new ClsPalabraClave();

            OPalabraClave.IdPalabraClave = IdPalabraClave;
            OPalabraClave.PalabraClave = PalabraClave;

            UpdatePalabraClave = new ClsPalabraClaveN().FnUPalabraClaveN(OPalabraClave);

            return UpdatePalabraClave;

        }

        [WebMethod]
        public static bool FnDPalabraClaveV(string IdPalabraClave)
        {
            bool DeletePalabraClave = false;
            ClsPalabraClave OPalabraClave = new ClsPalabraClave();

            OPalabraClave.IdPalabraClave = IdPalabraClave;

            DeletePalabraClave = new ClsPalabraClaveN().FnDPalabraClaveN(OPalabraClave);

            return DeletePalabraClave;

        }

        [WebMethod]
        public static bool FnEPalabraClaveV(string IdPalabraClave, string PalabraClave)
        {
            bool ExistePalabraClave = false;
            ClsPalabraClave OPalabraClave = new ClsPalabraClave();

            OPalabraClave.IdPalabraClave = IdPalabraClave;
            OPalabraClave.PalabraClave = PalabraClave;

            ExistePalabraClave = new ClsPalabraClaveN().FnEPalabraClaveN(OPalabraClave);

            return ExistePalabraClave;

        }
        #endregion

    }
}