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
    public partial class VstGastos : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        #region RegTipoGasto
        [WebMethod]
        public static bool FnCTipoGastoV(string TipoGasto)
        {
            bool CreateTipoGasto = false;
            ClsTipoGasto OTipoGasto = new ClsTipoGasto();

            OTipoGasto.TipoGasto = TipoGasto;

            CreateTipoGasto = new ClsTipoGastoN().FnCTipoGastoN(OTipoGasto);

            return CreateTipoGasto;

        }

        [WebMethod]
        public static List<ClsTipoGasto> FnRTipoGastoV()
        {
            List<ClsTipoGasto> OTipoGasto = new ClsTipoGastoN().FnRTipoGastoN();
            return OTipoGasto;
        }

        [WebMethod]
        public static bool FnUTipoGastoV(string IdTipoGasto, string TipoGasto)
        {
            bool UpdateTipoGasto = false;
            ClsTipoGasto OTipoGasto = new ClsTipoGasto();

            OTipoGasto.IdTipoGasto = IdTipoGasto;
            OTipoGasto.TipoGasto = TipoGasto;

            UpdateTipoGasto = new ClsTipoGastoN().FnUTipoGastoN(OTipoGasto);

            return UpdateTipoGasto;

        }

        [WebMethod]
        public static bool FnDTipoGastoV(string IdTipoGasto)
        {
            bool DeleteTipoGasto = false;
            ClsTipoGasto OTipoGasto = new ClsTipoGasto();

            OTipoGasto.IdTipoGasto = IdTipoGasto;

            DeleteTipoGasto = new ClsTipoGastoN().FnDTipoGastoN(OTipoGasto);

            return DeleteTipoGasto;

        }

        [WebMethod]
        public static bool FnETipoGastoV(string IdTipoGasto, string TipoGasto)
        {
            bool ExisteTipoGasto = false;
            ClsTipoGasto OTipoGasto = new ClsTipoGasto();

            OTipoGasto.IdTipoGasto = IdTipoGasto;
            OTipoGasto.TipoGasto = TipoGasto;

            ExisteTipoGasto = new ClsTipoGastoN().FnETipoGastoN(OTipoGasto);

            return ExisteTipoGasto;

        }
        #endregion

        #region RegGasto
        [WebMethod]
        public static bool FnCGastoV(string Fecha, string Serie, string Documento, string Cantidad, string IdTipoGasto, string Descripcion, string GastoCaja, string IdAutorizado, string Hora, string IdInicioCaja)
        {
            bool CreateGasto = false;
            ClsGastos OGasto = new ClsGastos();

            OGasto.Fecha = Fecha;
            OGasto.Serie = Serie;
            OGasto.Documento = Documento;
            OGasto.Cantidad = Cantidad;         
            OGasto.ObjTipoGasto.IdTipoGasto = IdTipoGasto;
            OGasto.Descripcion = Descripcion;
            OGasto.GastoCaja = GastoCaja;
            OGasto.ObjAutorizadopor.IdEmpleado = IdAutorizado;
            OGasto.Hora = Hora;
            OGasto.ObjInicioCaja.IdInicioCaja= IdInicioCaja;

            CreateGasto = new ClsGastoN().FnCGastoN(OGasto);

            return CreateGasto;
        }

        [WebMethod]
        public static List<ClsGastos> FnRGastoV()
        {
            List<ClsGastos> OGasto = new ClsGastoN().FnRGastoN();
            return OGasto;
        }

        [WebMethod]
        public static bool FnUGastoV( string IdGasto,string Serie, string Documento, string Cantidad, string IdTipoGasto, string Descripcion, string GastoCaja, string IdAutorizado)
        {
            bool UpdateGasto = false;
            ClsGastos OGasto = new ClsGastos();

            OGasto.IdGasto = IdGasto;         
            OGasto.Serie = Serie;
            OGasto.Documento = Documento;
            OGasto.Cantidad = Cantidad;
            OGasto.ObjTipoGasto.IdTipoGasto = IdTipoGasto;
            OGasto.Descripcion = Descripcion;
            OGasto.GastoCaja = GastoCaja;
            OGasto.ObjAutorizadopor.IdEmpleado = IdAutorizado;
            UpdateGasto = new ClsGastoN().FnUGastoN(OGasto);

            return UpdateGasto;

        }

        [WebMethod]
        public static bool FnDGastoV(string IdGasto)
        {
            bool DeleteGasto = false;
            ClsGastos OGasto = new ClsGastos();

            OGasto.IdGasto = IdGasto;

            DeleteGasto = new ClsGastoN().FnDGastoN(OGasto);

            return DeleteGasto;

        }

        [WebMethod]
        public static bool FnEGastoV(string IdGasto, string Serie, string Documento, string Cantidad)
        {
            bool ExisteGasto = false;
            ClsGastos OGasto = new ClsGastos();

            OGasto.IdGasto = IdGasto;
            OGasto.Serie = Serie;
            OGasto.Documento = Documento;
            OGasto.Cantidad = Cantidad;

            ExisteGasto = new ClsGastoN().FnEGastoN(OGasto);

            return ExisteGasto;

        }

        [WebMethod]
        public static List<ClsGastos> FnRGastoICV(string IdInicioCaja)
        {
            ClsGastos OGastoV = new ClsGastos();
            OGastoV.ObjInicioCaja.IdInicioCaja = IdInicioCaja;
            List<ClsGastos> OGasto = new ClsGastoN().FnRGastoICN(OGastoV);
            return OGasto;
        }
        #endregion
    }
}