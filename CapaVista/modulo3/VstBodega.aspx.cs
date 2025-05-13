using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;

namespace CapaVista.modulo3
{
    public partial class VstBodega : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e) { }

        #region RegSucursal        
        [WebMethod]
        public static List<ClsSucursal> FnRSucursalV()
        {
            List<ClsSucursal> OSucursal = new ClsSucursalN().FnRSucursalN();
            return OSucursal;
        }
        #endregion


        #region RegBodega
        [WebMethod]
        public static bool FnCBodegaV(string Bodega,string Descripcion, string IdSucursal, string IdResponsable)
        {
            bool CreateBodega = false;
            ClsBodega OBodega = new ClsBodega();

            OBodega.NombreBodega = Bodega;
            OBodega.Descripcion = Descripcion;
            OBodega.ObjSucursal.IdSucursal = IdSucursal;
            OBodega.ObjResponsable.IdEmpleado = IdResponsable;

            CreateBodega = new ClsBodegaN().FnCBodegaN(OBodega);

            return CreateBodega;

        }

        [WebMethod]
        public static List<ClsBodega> FnRBodegaV()
        {
            List<ClsBodega> OBodega = new ClsBodegaN().FnRBodegaN();
            return OBodega;
        }

        [WebMethod]
        public static bool FnUBodegaV(string IdBodega, string Bodega, string Descripcion, string IdSucursal, string IdResponsable)
        {
            bool UpdateBodega = false;
            ClsBodega OBodega = new ClsBodega();

            OBodega.IdBodega = IdBodega;
            OBodega.NombreBodega = Bodega;
            OBodega.Descripcion = Descripcion;
            OBodega.ObjSucursal.IdSucursal = IdSucursal;
            OBodega.ObjResponsable.IdEmpleado = IdResponsable;
            UpdateBodega = new ClsBodegaN().FnUBodegaN(OBodega);

            return UpdateBodega;

        }

        [WebMethod]
        public static bool FnDBodegaV(string IdBodega)
        {
            bool DeleteBodega = false;
            ClsBodega OBodega = new ClsBodega();

            OBodega.IdBodega = IdBodega;

            DeleteBodega = new ClsBodegaN().FnDBodegaN(OBodega);

            return DeleteBodega;

        }

        [WebMethod]
        public static bool FnEBodegaV(string IdBodega, string Bodega, string IdSucursal)
        {
            bool ExisteBodega = false;
            ClsBodega OBodega = new ClsBodega();

            OBodega.IdBodega = IdBodega;
            OBodega.NombreBodega = Bodega;
            OBodega.ObjSucursal.IdSucursal = IdSucursal;

            ExisteBodega = new ClsBodegaN().FnEBodegaN(OBodega);

            return ExisteBodega;

        }
        #endregion

        #region RegSeccion
        [WebMethod]
        public static bool FnCSeccionV(string Seccion, string IdBodega)
        {
            bool CreateSeccion = false;
            ClsSeccion OSeccion = new ClsSeccion();

            OSeccion.Seccion = Seccion;
            OSeccion.ObjBodega.IdBodega = IdBodega;

            CreateSeccion = new ClsSeccionN().FnCSeccionN(OSeccion);

            return CreateSeccion;

        }

        [WebMethod]
        public static List<ClsSeccion> FnRSeccionV()
        {
            List<ClsSeccion> OSeccion = new ClsSeccionN().FnRSeccionN();
            return OSeccion;
        }

        [WebMethod]
        public static bool FnUSeccionV(string IdSeccion, string Seccion, string IdBodega)
        {
            bool UpdateSeccion = false;
            ClsSeccion OSeccion = new ClsSeccion();

            OSeccion.IdSeccion = IdSeccion;
            OSeccion.Seccion = Seccion;
            OSeccion.ObjBodega.IdBodega = IdBodega;
            UpdateSeccion = new ClsSeccionN().FnUSeccionN(OSeccion);

            return UpdateSeccion;

        }

        [WebMethod]
        public static bool FnDSeccionV(string IdSeccion)
        {
            bool DeleteSeccion = false;
            ClsSeccion OSeccion = new ClsSeccion();

            OSeccion.IdSeccion = IdSeccion;

            DeleteSeccion = new ClsSeccionN().FnDSeccionN(OSeccion);

            return DeleteSeccion;

        }

        [WebMethod]
        public static bool FnESeccionV(string IdSeccion, string Seccion, string IdBodega)
        {
            bool ExisteSeccion = false;
            ClsSeccion OSeccion = new ClsSeccion();

            OSeccion.IdSeccion = IdSeccion;
            OSeccion.Seccion = Seccion;
            OSeccion.ObjBodega.IdBodega = IdBodega;

            ExisteSeccion = new ClsSeccionN().FnESeccionN(OSeccion);

            return ExisteSeccion;

        }
        #endregion

        #region RegRack
        [WebMethod]
        public static bool FnCRackV(string Rack, string IdSeccion)
        {
            bool CreateRack = false;
            ClsRack ORack = new ClsRack();

            ORack.Rack = Rack;
            ORack.ObjSeccion.IdSeccion = IdSeccion;

            CreateRack = new ClsRackN().FnCRackN(ORack);

            return CreateRack;

        }

        [WebMethod]
        public static List<ClsRack> FnRRackV()
        {
            List<ClsRack> ORack = new ClsRackN().FnRRackN();
            return ORack;
        }

        [WebMethod]
        public static bool FnURackV(string IdRack, string Rack, string IdSeccion)
        {
            bool UpdateRack = false;
            ClsRack ORack = new ClsRack();

            ORack.IdRack = IdRack;
            ORack.Rack = Rack;
            ORack.ObjSeccion.IdSeccion = IdSeccion;
            UpdateRack = new ClsRackN().FnURackN(ORack);

            return UpdateRack;

        }

        [WebMethod]
        public static bool FnDRackV(string IdRack)
        {
            bool DeleteRack = false;
            ClsRack ORack = new ClsRack();

            ORack.IdRack = IdRack;

            DeleteRack = new ClsRackN().FnDRackN(ORack);

            return DeleteRack;

        }

        [WebMethod]
        public static bool FnERackV(string IdRack, string Rack, string IdSeccion)
        {
            bool ExisteRack = false;
            ClsRack ORack = new ClsRack();

            ORack.IdRack = IdRack;
            ORack.Rack = Rack;
            ORack.ObjSeccion.IdSeccion = IdSeccion;

            ExisteRack = new ClsRackN().FnERackN(ORack);

            return ExisteRack;

        }
        #endregion

        #region RegEstante
        [WebMethod]
        public static bool FnCEstanteV(string Estante, string IdRack)
        {
            bool CreateEstante = false;
            ClsEstante OEstante = new ClsEstante();

            OEstante.Estante = Estante;
            OEstante.ObjRack.IdRack = IdRack;

            CreateEstante = new ClsEstanteN().FnCEstanteN(OEstante);

            return CreateEstante;

        }

        [WebMethod]
        public static List<ClsEstante> FnREstanteV()
        {
            List<ClsEstante> OEstante = new ClsEstanteN().FnREstanteN();
            return OEstante;
        }

        [WebMethod]
        public static bool FnUEstanteV(string IdEstante, string Estante, string IdRack)
        {
            bool UpdateEstante = false;
            ClsEstante OEstante = new ClsEstante();

            OEstante.IdEstante = IdEstante;
            OEstante.Estante = Estante;
            OEstante.ObjRack.IdRack = IdRack;
            UpdateEstante = new ClsEstanteN().FnUEstanteN(OEstante);

            return UpdateEstante;

        }

        [WebMethod]
        public static bool FnDEstanteV(string IdEstante)
        {
            bool DeleteEstante = false;
            ClsEstante OEstante = new ClsEstante();

            OEstante.IdEstante = IdEstante;

            DeleteEstante = new ClsEstanteN().FnDEstanteN(OEstante);

            return DeleteEstante;

        }

        [WebMethod]
        public static bool FnEEstanteV(string IdEstante, string Estante, string IdRack)
        {
            bool ExisteEstante = false;
            ClsEstante OEstante = new ClsEstante();

            OEstante.IdEstante = IdEstante;
            OEstante.Estante = Estante;
            OEstante.ObjRack.IdRack = IdRack;

            ExisteEstante = new ClsEstanteN().FnEEstanteN(OEstante);

            return ExisteEstante;

        }
        #endregion
    }
}