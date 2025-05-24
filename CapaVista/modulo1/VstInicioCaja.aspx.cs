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
    public partial class VstInicioCaja : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e){}
        #region RegInicioCaja
        [WebMethod]
        public static bool FnCInicioCajaV(string Fecha, string Hora, string IdCajero)
        {
            bool CreateInicioCaja = false;
            ClsInicioCaja OInicioCaja = new ClsInicioCaja();

            OInicioCaja.Fecha = Fecha;
            OInicioCaja.Hora = Hora;
            OInicioCaja.ObjCajero.IdEmpleado = IdCajero;

            CreateInicioCaja = new ClsInicioCajaN().FnCInicioCajaN(OInicioCaja);

            return CreateInicioCaja;

        }

        [WebMethod]
        public static List<ClsInicioCaja> FnRInicioCajaV()
        {
            List<ClsInicioCaja> OInicioCaja = new ClsInicioCajaN().FnRInicioCajaN();
            return OInicioCaja;
        }

        [WebMethod]
        public static bool FnUInicioCajaV(string IdInicioCaja, string IdCajero)
        {
            bool UpdateInicioCaja = false;
            ClsInicioCaja OInicioCaja = new ClsInicioCaja();

            OInicioCaja.IdInicioCaja = IdInicioCaja;          
            OInicioCaja.ObjCajero.IdEmpleado = IdCajero;
            UpdateInicioCaja = new ClsInicioCajaN().FnUInicioCajaN(OInicioCaja);

            return UpdateInicioCaja;

        }

        [WebMethod]
        public static bool FnDInicioCajaV(string IdInicioCaja)
        {
            bool DeleteInicioCaja = false;
            ClsInicioCaja OInicioCaja = new ClsInicioCaja();

            OInicioCaja.IdInicioCaja = IdInicioCaja;

            DeleteInicioCaja = new ClsInicioCajaN().FnDInicioCajaN(OInicioCaja);

            return DeleteInicioCaja;

        }

        [WebMethod]
        public static bool FnEInicioCajaV(string IdInicioCaja,string Fecha)
        {
            bool ExisteInicioCaja = false;
            ClsInicioCaja OInicioCaja = new ClsInicioCaja();
                     
            OInicioCaja.Fecha = Fecha;
            OInicioCaja.IdInicioCaja = IdInicioCaja;

            ExisteInicioCaja = new ClsInicioCajaN().FnEInicioCajaN(OInicioCaja);

            return ExisteInicioCaja;
        }
        [WebMethod]
        public static ClsInicioCaja FnRInicioCajaEstadoV(string IdInicioCaja)
        {
            ClsInicioCaja OInicioCajaN = new ClsInicioCaja();
            OInicioCajaN.IdInicioCaja = IdInicioCaja;
            ClsInicioCaja OInicioCaja = new ClsInicioCajaN().FnRInicioCajaEstadoN(OInicioCajaN);
            return OInicioCaja;
        }

        [WebMethod]
        public static List<ClsInicioCaja> FnRAInicioCajaV()
        {
            List<ClsInicioCaja> OInicioCaja = new ClsInicioCajaN().FnRAInicioCajaN();
            return OInicioCaja;
        }

        #endregion

        #region RegDenominacionInicio
        [WebMethod]
        public static bool FnCUEDenominacionInicioV(string IdInicioCaja, string IdDenominacion, string Cantidad)
        {
            bool CUEDenominacionIncio = false;
            ClsDenominacionInicio ODenominacionInicio = new ClsDenominacionInicio();

            ODenominacionInicio.ObjInicioCaja.IdInicioCaja = IdInicioCaja;
            ODenominacionInicio.ObjDenominacionCS.IdDenominacion = IdDenominacion;
            ODenominacionInicio.Cantidad = Cantidad;

            CUEDenominacionIncio = new ClsDenominacionInicioN().FnCUEDenominacionInicioN(ODenominacionInicio);

            return CUEDenominacionIncio;
        }

        [WebMethod]
        public static List<ClsDenominacionInicio> FnRDenominacionInicioV(string IdInicioCaja)
        {
            ClsDenominacionInicio ODenominacionInicioV = new ClsDenominacionInicio();
            ODenominacionInicioV.ObjInicioCaja.IdInicioCaja = IdInicioCaja;
            List<ClsDenominacionInicio> ODenominacionInicio = new ClsDenominacionInicioN().FnRDenominacionInicioN(ODenominacionInicioV);
            return ODenominacionInicio;
        }


    
        [WebMethod]
        public static bool FnCerrarDenominacionInicioV(string IdInicioCaja)
        {
            bool CerrarDenominacionIncio = false;
            ClsDenominacionInicio ODenominacionInicio = new ClsDenominacionInicio();
            ODenominacionInicio.ObjInicioCaja.IdInicioCaja = IdInicioCaja;          
            CerrarDenominacionIncio = new ClsDenominacionInicioN().FnCerrarDenominacionInicioN(ODenominacionInicio);
            return CerrarDenominacionIncio;
        }
        #endregion


    }
}