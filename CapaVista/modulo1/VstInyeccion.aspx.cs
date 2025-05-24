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
    public partial class VstInyeccion : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e){}

        #region RegInyeccion
        [WebMethod]
        public static bool FnCInyeccionV(string IdInicioCaja, string IdCajero, string Cantidad, string IdRealizado, string Nota, string Hora)
        {
            bool CreateInyeccion = false;
            ClsInyeccion OInyeccion = new ClsInyeccion();

            OInyeccion.ObjInicioCaja.IdInicioCaja = IdInicioCaja;
            OInyeccion.ObjCajero.IdEmpleado = IdCajero;
            OInyeccion.Cantidad= Cantidad;
            OInyeccion.ObjRealizadoPor.IdEmpleado= IdRealizado;
            OInyeccion.Nota= Nota;
            OInyeccion.Hora= Hora;
            CreateInyeccion = new ClsInyeccionN().FnCInyeccionN(OInyeccion);

            return CreateInyeccion;
        }

        [WebMethod]
        public static List<ClsInyeccion> FnRInyeccionV()
        {
            List<ClsInyeccion> OInyeccion = new ClsInyeccionN().FnRInyeccionN();
            return OInyeccion;
        }

        [WebMethod]
        public static bool FnUInyeccionV(string IdInyeccion, string IdCajero, string Cantidad,string IdRealizado, string Nota)
        {
            bool UpdateInyeccion = false;
            ClsInyeccion OInyeccion = new ClsInyeccion();

            OInyeccion.IdInyeccion = IdInyeccion;
            OInyeccion.ObjCajero.IdEmpleado = IdCajero;
            OInyeccion.Cantidad = Cantidad;
            OInyeccion.ObjRealizadoPor.IdEmpleado = IdRealizado;
            OInyeccion.Nota = Nota;
            UpdateInyeccion = new ClsInyeccionN().FnUInyeccionN(OInyeccion);

            return UpdateInyeccion;
        }

        [WebMethod]
        public static bool FnDInyeccionV(string IdInyeccion)
        {
            bool DeleteInyeccion = false;
            ClsInyeccion OInyeccion = new ClsInyeccion();

            OInyeccion.IdInyeccion = IdInyeccion;

            DeleteInyeccion = new ClsInyeccionN().FnDInyeccionN(OInyeccion);

            return DeleteInyeccion;
        }

        [WebMethod]
        public static List<ClsInyeccion> FnRInyeccionICV(string IdInicioCaja)
        {
            ClsInyeccion OInyeccionV = new ClsInyeccion();
            OInyeccionV.IdInyeccion = IdInicioCaja;
            List<ClsInyeccion> OInyeccion = new ClsInyeccionN().FnRInyeccionICN(OInyeccionV);
            return OInyeccion;
        }

        #endregion

    }
}