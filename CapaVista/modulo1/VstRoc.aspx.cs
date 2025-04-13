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
    public partial class VstRoc : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        #region RegConceptoRoc
        [WebMethod]
        public static bool FnCConceptoRocV(string ConceptoRoc)
        {
            bool CreateConceptoRoc = false;
            ClsConceptoRoc OConceptoRoc = new ClsConceptoRoc();

            OConceptoRoc.ConceptoRoc = ConceptoRoc;

            CreateConceptoRoc = new ClsConceptoRocN().FnCConceptoRocN(OConceptoRoc);

            return CreateConceptoRoc;

        }

        [WebMethod]
        public static List<ClsConceptoRoc> FnRConceptoRocV()
        {
            List<ClsConceptoRoc> OConceptoRoc = new ClsConceptoRocN().FnRConceptoRocN();
            return OConceptoRoc;
        }

        [WebMethod]
        public static bool FnUConceptoRocV(string IdConceptoRoc, string ConceptoRoc)
        {
            bool UpdateConceptoRoc = false;
            ClsConceptoRoc OConceptoRoc = new ClsConceptoRoc();

            OConceptoRoc.IdConceptoRoc = IdConceptoRoc;
            OConceptoRoc.ConceptoRoc = ConceptoRoc;

            UpdateConceptoRoc = new ClsConceptoRocN().FnUConceptoRocN(OConceptoRoc);

            return UpdateConceptoRoc;

        }

        [WebMethod]
        public static bool FnDConceptoRocV(string IdConceptoRoc)
        {
            bool DeleteConceptoRoc = false;
            ClsConceptoRoc OConceptoRoc = new ClsConceptoRoc();

            OConceptoRoc.IdConceptoRoc = IdConceptoRoc;

            DeleteConceptoRoc = new ClsConceptoRocN().FnDConceptoRocN(OConceptoRoc);

            return DeleteConceptoRoc;

        }

        [WebMethod]
        public static bool FnEConceptoRocV(string IdConceptoRoc, string ConceptoRoc)
        {
            bool ExisteConceptoRoc = false;
            ClsConceptoRoc OConceptoRoc = new ClsConceptoRoc();

            OConceptoRoc.IdConceptoRoc = IdConceptoRoc;
            OConceptoRoc.ConceptoRoc = ConceptoRoc;

            ExisteConceptoRoc = new ClsConceptoRocN().FnEConceptoRocN(OConceptoRoc);

            return ExisteConceptoRoc;

        }
        #endregion

        #region RegPagoSobre
        [WebMethod]
        public static bool FnCPagoSobreV(string PagoSobre)
        {
            bool CreatePagoSobre = false;
            ClsPagoSobre OPagoSobre = new ClsPagoSobre();

            OPagoSobre.Descripcion = PagoSobre;

            CreatePagoSobre = new ClsPagoSobreN().FnCPagoSobreN(OPagoSobre);

            return CreatePagoSobre;

        }

        [WebMethod]
        public static List<ClsPagoSobre> FnRPagoSobreV()
        {
            List<ClsPagoSobre> OPagoSobre = new ClsPagoSobreN().FnRPagoSobreN();
            return OPagoSobre;
        }

        [WebMethod]
        public static bool FnUPagoSobreV(string IdPagoSobre, string PagoSobre)
        {
            bool UpdatePagoSobre = false;
            ClsPagoSobre OPagoSobre = new ClsPagoSobre();

            OPagoSobre.IdPagoSobre = IdPagoSobre;
            OPagoSobre.Descripcion = PagoSobre;

            UpdatePagoSobre = new ClsPagoSobreN().FnUPagoSobreN(OPagoSobre);

            return UpdatePagoSobre;

        }

        [WebMethod]
        public static bool FnDPagoSobreV(string IdPagoSobre)
        {
            bool DeletePagoSobre = false;
            ClsPagoSobre OPagoSobre = new ClsPagoSobre();

            OPagoSobre.IdPagoSobre = IdPagoSobre;

            DeletePagoSobre = new ClsPagoSobreN().FnDPagoSobreN(OPagoSobre);

            return DeletePagoSobre;

        }

        [WebMethod]
        public static bool FnEPagoSobreV(string IdPagoSobre, string PagoSobre)
        {
            bool ExistePagoSobre = false;
            ClsPagoSobre OPagoSobre = new ClsPagoSobre();

            OPagoSobre.IdPagoSobre = IdPagoSobre;
            OPagoSobre.Descripcion = PagoSobre;

            ExistePagoSobre = new ClsPagoSobreN().FnEPagoSobreN(OPagoSobre);

            return ExistePagoSobre;

        }
        #endregion
    }
}