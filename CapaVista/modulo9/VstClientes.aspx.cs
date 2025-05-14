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
    public partial class VstClientes : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e){}

        #region RegEmpresa
        [WebMethod]
        public static bool FnCEmpresaV(string Empresa, string RazonSocial, string Ruc, string IdTipoEmpresa, string IdRegimen)
        {
            bool CreateEmpresa = false;
            ClsEmpresa OEmpresa = new ClsEmpresa();

            OEmpresa.NombreComercial = Empresa;
            OEmpresa.RazonSocial = RazonSocial;
            OEmpresa.Ruc = Ruc;
            OEmpresa.ObjTipoEmpresa.IdTipoEmpresa = IdTipoEmpresa;
            OEmpresa.ObjRegimen.IdRegimen = IdRegimen;

            CreateEmpresa = new ClsEmpresaN().FnCEmpresaN(OEmpresa);

            return CreateEmpresa;

        }

        [WebMethod]
        public static List<ClsEmpresa> FnREmpresaV()
        {
            List<ClsEmpresa> OEmpresa = new ClsEmpresaN().FnREmpresaN();
            return OEmpresa;
        }

        [WebMethod]
        public static bool FnUEmpresaV(string IdEmpresa, string Empresa, string RazonSocial, string Ruc, string IdTipoEmpresa, string IdRegimen)
        {
            bool UpdateEmpresa = false;
            ClsEmpresa OEmpresa = new ClsEmpresa();

            OEmpresa.IdEmpresa = IdEmpresa;
            OEmpresa.NombreComercial = Empresa;
            OEmpresa.RazonSocial = RazonSocial;
            OEmpresa.Ruc = Ruc;
            OEmpresa.ObjTipoEmpresa.IdTipoEmpresa = IdTipoEmpresa;
            OEmpresa.ObjRegimen.IdRegimen = IdRegimen;
            UpdateEmpresa = new ClsEmpresaN().FnUEmpresaN(OEmpresa);

            return UpdateEmpresa;

        }

        [WebMethod]
        public static bool FnDEmpresaV(string IdEmpresa)
        {
            bool DeleteEmpresa = false;
            ClsEmpresa OEmpresa = new ClsEmpresa();

            OEmpresa.IdEmpresa = IdEmpresa;

            DeleteEmpresa = new ClsEmpresaN().FnDEmpresaN(OEmpresa);

            return DeleteEmpresa;

        }

        [WebMethod]
        public static bool FnEEmpresaV(string IdEmpresa, string Empresa, string RazonSocial, string Ruc)
        {
            bool ExisteEmpresa = false;
            ClsEmpresa OEmpresa = new ClsEmpresa();

            OEmpresa.IdEmpresa = IdEmpresa;
            OEmpresa.NombreComercial = Empresa;
            OEmpresa.RazonSocial = RazonSocial;
            OEmpresa.Ruc = Ruc;

            ExisteEmpresa = new ClsEmpresaN().FnEEmpresaN(OEmpresa);

            return ExisteEmpresa;

        }
        #endregion

       
    }
}