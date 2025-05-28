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
    public partial class VstFinCaja : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e){}

        #region RegFinCaja
        [WebMethod]
        public static bool FnCFinCajaV( string IdCajero, string IdInicioCaja)
        {
            bool CreateFinCaja = false;
            ClsFinCaja OFinCaja = new ClsFinCaja();

            OFinCaja.ObjInicioCaja.IdInicioCaja = IdInicioCaja;           
            OFinCaja.ObjCajero.IdEmpleado = IdCajero;

            CreateFinCaja = new ClsFinCajaN().FnCFinCajaN(OFinCaja);

            return CreateFinCaja;

        }

        [WebMethod]
        public static List<ClsFinCaja> FnRFinCajaV()
        {
            List<ClsFinCaja> OFinCaja = new ClsFinCajaN().FnRFinCajaN();
            return OFinCaja;
        }

        [WebMethod]
        public static bool FnUFinCajaV(string IdFinCaja, string IdCajero)
        {
            bool UpdateFinCaja = false;
            ClsFinCaja OFinCaja = new ClsFinCaja();

            OFinCaja.IdFinCaja = IdFinCaja;
            OFinCaja.ObjCajero.IdEmpleado = IdCajero;
            UpdateFinCaja = new ClsFinCajaN().FnUFinCajaN(OFinCaja);

            return UpdateFinCaja;

        }

        [WebMethod]
        public static bool FnDFinCajaV(string IdFinCaja)
        {
            bool DeleteFinCaja = false;
            ClsFinCaja OFinCaja = new ClsFinCaja();

            OFinCaja.IdFinCaja = IdFinCaja;

            DeleteFinCaja = new ClsFinCajaN().FnDFinCajaN(OFinCaja);

            return DeleteFinCaja;

        }

        [WebMethod]
        public static bool FnOFinCajaV(string IdFinCaja, string Fecha, string Hora)
        {
            bool OpenFinCaja = false;
            ClsFinCaja OFinCaja = new ClsFinCaja();

            OFinCaja.IdFinCaja = IdFinCaja;
            OFinCaja.Fecha = Fecha;
            OFinCaja.Hora = Hora;
            OpenFinCaja = new ClsFinCajaN().FnOFinCajaN(OFinCaja);

            return OpenFinCaja;

        }

        #endregion

        #region RegDenominacionFin
        [WebMethod]
        public static bool FnCUEDenominacionFinV(string IdFinCaja, string IdDenominacion, string Cantidad)
        {
            bool CUEDenominacionIncio = false;
            ClsDenominacionFinCaja ODenominacionFin = new ClsDenominacionFinCaja();

            ODenominacionFin.ObjFinCaja.IdFinCaja = IdFinCaja;
            ODenominacionFin.ObjDenominacionCS.IdDenominacion = IdDenominacion;
            ODenominacionFin.Cantidad = Cantidad;

            CUEDenominacionIncio = new ClsDenominacionFinN().FnCUEDenominacionFinN(ODenominacionFin);

            return CUEDenominacionIncio;
        }

        [WebMethod]
        public static List<ClsDenominacionFinCaja> FnRDenominacionFinV(string IdFinCaja)
        {
            ClsDenominacionFinCaja ODenominacionFinV = new ClsDenominacionFinCaja();
            ODenominacionFinV.ObjFinCaja.IdFinCaja = IdFinCaja;
            List<ClsDenominacionFinCaja> ODenominacionFin = new ClsDenominacionFinN().FnRDenominacionFinN(ODenominacionFinV);
            return ODenominacionFin;
        }



        [WebMethod]
        public static bool FnCerrarDenominacionFinV(string IdFinCaja)
        {
            bool CerrarDenominacionIncio = false;
            ClsDenominacionFinCaja ODenominacionFin = new ClsDenominacionFinCaja();
            ODenominacionFin.ObjFinCaja.IdFinCaja = IdFinCaja;
            CerrarDenominacionIncio = new ClsDenominacionFinN().FnCerrarDenominacionFinN(ODenominacionFin);
            return CerrarDenominacionIncio;
        }
        #endregion

    }
}