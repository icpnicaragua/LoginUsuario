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

        #region RegCliente
        [WebMethod]
        public static bool FnCClienteV(string PlazoCredito, string LimiteCredito, string IdTipoCliente, string IdPersona,string IdEmpresa)
        {
            bool CreateCliente = false;
            ClsCliente OCliente = new ClsCliente();

            OCliente.PlazoCredito = PlazoCredito;
            OCliente.LimiteCredito = LimiteCredito;
            OCliente.ObjTipoCliente.IdTipoCliente = IdTipoCliente;
            OCliente.ObjPersona.IdPersona = IdPersona;
            OCliente.ObjEmpresa.IdEmpresa = IdEmpresa;

            CreateCliente = new ClsClienteN().FnCClienteN(OCliente);

            return CreateCliente;
        }

        [WebMethod]
        public static List<ClsCliente> FnRClienteV()
        {
            List<ClsCliente> OCliente = new ClsClienteN().FnRClienteN();
            return OCliente;
        }

        [WebMethod]
        public static bool FnUClienteV(string IdCliente, string PlazoCredito, string LimiteCredito, string IdTipoCliente )
        {
            bool UpdateCliente = false;
            ClsCliente OCliente = new ClsCliente();

            OCliente.IdCliente = IdCliente;
            OCliente.PlazoCredito = PlazoCredito;
            OCliente.LimiteCredito = LimiteCredito;
            OCliente.ObjTipoCliente.IdTipoCliente = IdTipoCliente;
            UpdateCliente = new ClsClienteN().FnUClienteN(OCliente);

            return UpdateCliente;
        }

        [WebMethod]
        public static bool FnDClienteV(string IdCliente)
        {
            bool DeleteCliente = false;
            ClsCliente OCliente = new ClsCliente();

            OCliente.IdCliente = IdCliente;

            DeleteCliente = new ClsClienteN().FnDClienteN(OCliente);

            return DeleteCliente;

        }

        [WebMethod]
        public static List<ClsCliente> FnRClienteNPersonaV()
        {
            List<ClsCliente> OCliente = new ClsClienteN().FnRClienteNPersonaN();
            return OCliente;
        }

        [WebMethod]
        public static List<ClsCliente> FnRClienteNEmpresaV()
        {
            List<ClsCliente> OCliente = new ClsClienteN().FnRClienteNEmpresaN();
            return OCliente;
        }

        #endregion

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