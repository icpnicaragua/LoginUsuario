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

namespace CapaVista.modulo2
{
    public partial class VstProveedor : System.Web.UI.Page
    {protected void Page_Load(object sender, EventArgs e){}


        #region RegRegimen
        [WebMethod]
        public static bool FnCRegimenV(string Regimen)
        {
            bool CreateRegimen = false;
            ClsRegimen ORegimen = new ClsRegimen();

            ORegimen.Regimen = Regimen;

            CreateRegimen = new ClsRegimenN().FnCRegimenN(ORegimen);

            return CreateRegimen;

        }

        [WebMethod]
        public static List<ClsRegimen> FnRRegimenV()
        {
            List<ClsRegimen> ORegimen = new ClsRegimenN().FnRRegimenN();
            return ORegimen;
        }

        [WebMethod]
        public static bool FnURegimenV(string IdRegimen, string Regimen)
        {
            bool UpdateRegimen = false;
            ClsRegimen ORegimen = new ClsRegimen();

            ORegimen.IdRegimen = IdRegimen;
            ORegimen.Regimen = Regimen;

            UpdateRegimen = new ClsRegimenN().FnURegimenN(ORegimen);

            return UpdateRegimen;

        }

        [WebMethod]
        public static bool FnDRegimenV(string IdRegimen)
        {
            bool DeleteRegimen = false;
            ClsRegimen ORegimen = new ClsRegimen();

            ORegimen.IdRegimen = IdRegimen;

            DeleteRegimen = new ClsRegimenN().FnDRegimenN(ORegimen);

            return DeleteRegimen;

        }

        [WebMethod]
        public static bool FnERegimenV(string IdRegimen, string Regimen)
        {
            bool ExisteRegimen = false;
            ClsRegimen ORegimen = new ClsRegimen();

            ORegimen.IdRegimen = IdRegimen;
            ORegimen.Regimen = Regimen;

            ExisteRegimen = new ClsRegimenN().FnERegimenN(ORegimen);

            return ExisteRegimen;

        }
        #endregion

        #region RegTipoEmpresa
        [WebMethod]
        public static bool FnCTipoEmpresaV(string TipoEmpresa)
        {
            bool CreateTipoEmpresa = false;
            ClsTipoEmpresa OTipoEmpresa = new ClsTipoEmpresa();

            OTipoEmpresa.TipoEmpresa = TipoEmpresa;

            CreateTipoEmpresa = new ClsTipoEmpresaN().FnCTipoEmpresaN(OTipoEmpresa);

            return CreateTipoEmpresa;

        }

        [WebMethod]
        public static List<ClsTipoEmpresa> FnRTipoEmpresaV()
        {
            List<ClsTipoEmpresa> OTipoEmpresa = new ClsTipoEmpresaN().FnRTipoEmpresaN();
            return OTipoEmpresa;
        }

        [WebMethod]
        public static bool FnUTipoEmpresaV(string IdTipoEmpresa, string TipoEmpresa)
        {
            bool UpdateTipoEmpresa = false;
            ClsTipoEmpresa OTipoEmpresa = new ClsTipoEmpresa();

            OTipoEmpresa.IdTipoEmpresa = IdTipoEmpresa;
            OTipoEmpresa.TipoEmpresa = TipoEmpresa;

            UpdateTipoEmpresa = new ClsTipoEmpresaN().FnUTipoEmpresaN(OTipoEmpresa);

            return UpdateTipoEmpresa;

        }

        [WebMethod]
        public static bool FnDTipoEmpresaV(string IdTipoEmpresa)
        {
            bool DeleteTipoEmpresa = false;
            ClsTipoEmpresa OTipoEmpresa = new ClsTipoEmpresa();

            OTipoEmpresa.IdTipoEmpresa = IdTipoEmpresa;

            DeleteTipoEmpresa = new ClsTipoEmpresaN().FnDTipoEmpresaN(OTipoEmpresa);

            return DeleteTipoEmpresa;

        }

        [WebMethod]
        public static bool FnETipoEmpresaV(string IdTipoEmpresa, string TipoEmpresa)
        {
            bool ExisteTipoEmpresa = false;
            ClsTipoEmpresa OTipoEmpresa = new ClsTipoEmpresa();

            OTipoEmpresa.IdTipoEmpresa = IdTipoEmpresa;
            OTipoEmpresa.TipoEmpresa = TipoEmpresa;

            ExisteTipoEmpresa = new ClsTipoEmpresaN().FnETipoEmpresaN(OTipoEmpresa);

            return ExisteTipoEmpresa;

        }
        #endregion

        #region RegProveedor
        [WebMethod]
        public static bool FnCProveedorV(string PlazoCredito, string IdPersona, string IdEmpresa)
        {
            bool CreateProveedor = false;
            ClsProveedor OProveedor = new ClsProveedor();

            OProveedor.PlazoCredito = PlazoCredito;
            OProveedor.ObjPersona.IdPersona = IdPersona;
            OProveedor.ObjEmpresa.IdEmpresa = IdEmpresa;

            CreateProveedor = new ClsProveedorN().FnCProveedorN(OProveedor);

            return CreateProveedor;
        }

        [WebMethod]
        public static List<ClsProveedor> FnRProveedorV()
        {
            List<ClsProveedor> OProveedor = new ClsProveedorN().FnRProveedorN();
            return OProveedor;
        }

        [WebMethod]
        public static bool FnUProveedorV(string IdProveedor, string PlazoCredito)
        {
            bool UpdateProveedor = false;
            ClsProveedor OProveedor = new ClsProveedor();

            OProveedor.IdProveedor = IdProveedor;
            OProveedor.PlazoCredito = PlazoCredito;           
            UpdateProveedor = new ClsProveedorN().FnUProveedorN(OProveedor);

            return UpdateProveedor;
        }

        [WebMethod]
        public static bool FnDProveedorV(string IdProveedor)
        {
            bool DeleteProveedor = false;
            ClsProveedor OProveedor = new ClsProveedor();

            OProveedor.IdProveedor = IdProveedor;

            DeleteProveedor = new ClsProveedorN().FnDProveedorN(OProveedor);

            return DeleteProveedor;
        }
        [WebMethod]
        public static List<ClsProveedor> FnRProveedorNPersonaV()
        {
            List<ClsProveedor> OProveedor = new ClsProveedorN().FnRProveedorNPersonaN();
            return OProveedor;
        }
        [WebMethod]
        public static List<ClsProveedor> FnRProveedorNEmpresaV()
        {
            List<ClsProveedor> OProveedor = new ClsProveedorN().FnRProveedorNEmpresaN();
            return OProveedor;
        }

        #endregion
    }
}