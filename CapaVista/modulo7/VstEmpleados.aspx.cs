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

namespace CapaVista.modulo7
{
    public partial class VstEmpleados : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        #region RegArea
        [WebMethod]
        public static bool FnCAreaV(string Area)
        {
            bool CreateArea = false;
            ClsArea OArea = new ClsArea();

            OArea.Area = Area;

            CreateArea = new ClsAreaN().FnCAreaN(OArea);

            return CreateArea;

        }

        [WebMethod]
        public static List<ClsArea> FnRAreaV()
        {
            List<ClsArea> OArea = new ClsAreaN().FnRAreaN();
            return OArea;
        }

        [WebMethod]
        public static bool FnUAreaV(string IdArea, string Area)
        {
            bool UpdateArea = false;
            ClsArea OArea = new ClsArea();

            OArea.IdArea = IdArea;
            OArea.Area = Area;

            UpdateArea = new ClsAreaN().FnUAreaN(OArea);

            return UpdateArea;

        }

        [WebMethod]
        public static bool FnDAreaV(string IdArea)
        {
            bool DeleteArea = false;
            ClsArea OArea = new ClsArea();

            OArea.IdArea = IdArea;

            DeleteArea = new ClsAreaN().FnDAreaN(OArea);

            return DeleteArea;

        }

        [WebMethod]
        public static bool FnEAreaV(string IdArea, string Area)
        {
            bool ExisteArea = false;
            ClsArea OArea = new ClsArea();

            OArea.IdArea = IdArea;
            OArea.Area = Area;

            ExisteArea = new ClsAreaN().FnEAreaN(OArea);

            return ExisteArea;

        }
        #endregion

        #region RegPersona
        [WebMethod]
        public static bool FnCPersonaV(string Nombre1, string Nombre2, string Apellido1, string Apellido2, string IdGenero)
        {
            bool CreatePersona = false;
            ClsPersona OPersona = new ClsPersona();

            OPersona.Nombre1 = Nombre1;
            OPersona.Nombre2 = Nombre2;
            OPersona.Apellido1 = Apellido1;
            OPersona.Apellido2 = Apellido2;
            OPersona.ObjGenero.IdGenero = IdGenero;

            CreatePersona = new ClsPersonaN().FnCPersonaN(OPersona);

            return CreatePersona;

        }

        [WebMethod]
        public static List<ClsPersona> FnRPersonaV()
        {
            List<ClsPersona> OPersona = new ClsPersonaN().FnRPersonaN();
            return OPersona;
        }

        [WebMethod]
        public static bool FnUPersonaV(string IdPersona, string Nombre1, string Nombre2, string Apellido1, string Apellido2, string IdGenero)
        {
            bool UpdatePersona = false;
            ClsPersona OPersona = new ClsPersona();

            OPersona.IdPersona = IdPersona;
            OPersona.Nombre1 = Nombre1;
            OPersona.Nombre2 = Nombre2;
            OPersona.Apellido1 = Apellido1;
            OPersona.Apellido2 = Apellido2;
            OPersona.ObjGenero.IdGenero = IdGenero;
            UpdatePersona = new ClsPersonaN().FnUPersonaN(OPersona);

            return UpdatePersona;

        }

        [WebMethod]
        public static bool FnDPersonaV(string IdPersona)
        {
            bool DeletePersona = false;
            ClsPersona OPersona = new ClsPersona();

            OPersona.IdPersona = IdPersona;

            DeletePersona = new ClsPersonaN().FnDPersonaN(OPersona);

            return DeletePersona;

        }

        [WebMethod]
        public static bool FnEPersonaV(string IdPersona, string Nombre1, string Nombre2, string Apellido1, string Apellido2, string IdGenero)
        {
            bool ExistePersona = false;
            ClsPersona OPersona = new ClsPersona();

            OPersona.IdPersona = IdPersona;
            OPersona.Nombre1 = Nombre1;
            OPersona.Nombre2 = Nombre2;
            OPersona.Apellido1 = Apellido1;
            OPersona.Apellido2 = Apellido2;
            OPersona.ObjGenero.IdGenero = IdGenero;

            ExistePersona = new ClsPersonaN().FnEPersonaN(OPersona);

            return ExistePersona;

        }
        #endregion


    }
}