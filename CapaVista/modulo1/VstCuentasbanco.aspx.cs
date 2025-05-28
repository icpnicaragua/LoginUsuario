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
    public partial class VstCuentasbanco : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e){}

        #region RegBanco
        [WebMethod]
        public static bool FnCBancoV(string Banco)
        {
            bool CreateBanco = false;
            ClsBanco OBanco = new ClsBanco();

            OBanco.Banco = Banco;

            CreateBanco = new ClsBancoN().FnCBancoN(OBanco);

            return CreateBanco;

        }

        [WebMethod]
        public static List<ClsBanco> FnRBancoV()
        {
            List<ClsBanco> OBanco = new ClsBancoN().FnRBancoN();
            return OBanco;
        }

        [WebMethod]
        public static bool FnUBancoV(string IdBanco, string Banco)
        {
            bool UpdateBanco = false;
            ClsBanco OBanco = new ClsBanco();

            OBanco.IdBanco = IdBanco;
            OBanco.Banco = Banco;

            UpdateBanco = new ClsBancoN().FnUBancoN(OBanco);

            return UpdateBanco;

        }

        [WebMethod]
        public static bool FnDBancoV(string IdBanco)
        {
            bool DeleteBanco = false;
            ClsBanco OBanco = new ClsBanco();

            OBanco.IdBanco = IdBanco;

            DeleteBanco = new ClsBancoN().FnDBancoN(OBanco);

            return DeleteBanco;

        }

        [WebMethod]
        public static bool FnEBancoV(string IdBanco, string Banco)
        {
            bool ExisteBanco = false;
            ClsBanco OBanco = new ClsBanco();

            OBanco.IdBanco = IdBanco;
            OBanco.Banco = Banco;

            ExisteBanco = new ClsBancoN().FnEBancoN(OBanco);

            return ExisteBanco;

        }
        #endregion
        #region RegCuenta
        [WebMethod]
        public static bool FnCCuentaV(string Cuenta, string IdBanco, string Propietario, string IdMoneda)
        {
            bool CreateCuenta = false;
            ClsCuenta OCuenta = new ClsCuenta();

            OCuenta.NumeroCuenta = Cuenta;
            OCuenta.ObjBanco.IdBanco = IdBanco;
            OCuenta.Propietario = Propietario;
            OCuenta.ObjMoneda.IdMoneda = IdMoneda;

            CreateCuenta = new ClsCuentaN().FnCCuentaN(OCuenta);

            return CreateCuenta;

        }

        [WebMethod]
        public static List<ClsCuenta> FnRCuentaV()
        {
            List<ClsCuenta> OCuenta = new ClsCuentaN().FnRCuentaN();
            return OCuenta;
        }

        [WebMethod]
        public static bool FnUCuentaV(string IdCuenta, string Cuenta, string IdBanco, string Propietario, string IdMoneda)
        {
            bool UpdateCuenta = false;
            ClsCuenta OCuenta = new ClsCuenta();

            OCuenta.IdCuenta = IdCuenta;
            OCuenta.NumeroCuenta = Cuenta;
            OCuenta.ObjBanco.IdBanco = IdBanco;
            OCuenta.Propietario = Propietario;
            OCuenta.ObjMoneda.IdMoneda= IdMoneda;
            UpdateCuenta = new ClsCuentaN().FnUCuentaN(OCuenta);

            return UpdateCuenta;

        }

        [WebMethod]
        public static bool FnDCuentaV(string IdCuenta)
        {
            bool DeleteCuenta = false;
            ClsCuenta OCuenta = new ClsCuenta();

            OCuenta.IdCuenta = IdCuenta;

            DeleteCuenta = new ClsCuentaN().FnDCuentaN(OCuenta);

            return DeleteCuenta;

        }

        [WebMethod]
        public static bool FnECuentaV(string IdCuenta, string Cuenta, string IdBanco)
        {
            bool ExisteCuenta = false;
            ClsCuenta OCuenta = new ClsCuenta();

            OCuenta.IdCuenta = IdCuenta;
            OCuenta.NumeroCuenta = Cuenta;
            OCuenta.ObjBanco.IdBanco = IdBanco;

            ExisteCuenta = new ClsCuentaN().FnECuentaN(OCuenta);

            return ExisteCuenta;

        }
        #endregion
    }
}