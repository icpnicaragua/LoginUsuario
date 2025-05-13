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
            OBodega.ObjResponsable.IdEmpleado = IdSucursal;
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

    }
}