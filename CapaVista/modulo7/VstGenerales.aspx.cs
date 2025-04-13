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
    public partial class VstGenerales : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        #region RegEstadoCivil
        [WebMethod]
        public static bool FnCEstadoCivilV(string EstadoCivil )
        { 
            bool CreateEstadoCivil = false;
            ClsEstadoCivil OEstadoCivil = new ClsEstadoCivil();

            OEstadoCivil.EstadoCivil=EstadoCivil;

            CreateEstadoCivil = new ClsEstadoCivilN().FnCEstadoCivilN(OEstadoCivil);

            return CreateEstadoCivil;

        }

        [WebMethod]
        public static List<ClsEstadoCivil> FnREstadoCivilV()
        {
            List<ClsEstadoCivil> OEstadoCivil = new ClsEstadoCivilN().FnREstadoCivilN();
            return OEstadoCivil;
        }

        [WebMethod]
        public static bool FnUEstadoCivilV(string IdEstadoCivil, string EstadoCivil)
        {
            bool UpdateEstadoCivil = false;
            ClsEstadoCivil OEstadoCivil = new ClsEstadoCivil();

            OEstadoCivil.IdEstadoCivil = IdEstadoCivil;
            OEstadoCivil.EstadoCivil = EstadoCivil;

            UpdateEstadoCivil = new ClsEstadoCivilN().FnUEstadoCivilN(OEstadoCivil);

            return UpdateEstadoCivil;

        }

        [WebMethod]
        public static bool FnDEstadoCivilV(string IdEstadoCivil)
        {
            bool DeleteEstadoCivil = false;
            ClsEstadoCivil OEstadoCivil = new ClsEstadoCivil();

            OEstadoCivil.IdEstadoCivil = IdEstadoCivil;
            
            DeleteEstadoCivil = new ClsEstadoCivilN().FnDEstadoCivilN(OEstadoCivil);

            return DeleteEstadoCivil;

        }

        [WebMethod]
        public static bool FnEEstadoCivilV(string IdEstadoCivil, string EstadoCivil)
        {
            bool ExisteEstadoCivil = false;
            ClsEstadoCivil OEstadoCivil = new ClsEstadoCivil();

            OEstadoCivil.IdEstadoCivil = IdEstadoCivil;
            OEstadoCivil.EstadoCivil = EstadoCivil;

            ExisteEstadoCivil = new ClsEstadoCivilN().FnEEstadoCivilN(OEstadoCivil);

            return ExisteEstadoCivil;

        }
        #endregion

        #region RegTipoDireccion
        [WebMethod]
        public static bool FnCTipoDireccionV(string TipoDireccion)
        {
            bool CreateTipoDireccion = false;
            ClsTipoDireccion OTipoDireccion = new ClsTipoDireccion();

            OTipoDireccion.TipoDireccion = TipoDireccion;

            CreateTipoDireccion = new ClsTipoDireccionN().FnCTipoDireccionN(OTipoDireccion);

            return CreateTipoDireccion;

        }

        [WebMethod]
        public static List<ClsTipoDireccion> FnRTipoDireccionV()
        {
            List<ClsTipoDireccion> OTipoDireccion = new ClsTipoDireccionN().FnRTipoDireccionN();
            return OTipoDireccion;
        }

        [WebMethod]
        public static bool FnUTipoDireccionV(string IdTipoDireccion, string TipoDireccion)
        {
            bool UpdateTipoDireccion = false;
            ClsTipoDireccion OTipoDireccion = new ClsTipoDireccion();

            OTipoDireccion.IdTipoDireccion = IdTipoDireccion;
            OTipoDireccion.TipoDireccion = TipoDireccion;

            UpdateTipoDireccion = new ClsTipoDireccionN().FnUTipoDireccionN(OTipoDireccion);

            return UpdateTipoDireccion;

        }

        [WebMethod]
        public static bool FnDTipoDireccionV(string IdTipoDireccion)
        {
            bool DeleteTipoDireccion = false;
            ClsTipoDireccion OTipoDireccion = new ClsTipoDireccion();

            OTipoDireccion.IdTipoDireccion = IdTipoDireccion;

            DeleteTipoDireccion = new ClsTipoDireccionN().FnDTipoDireccionN(OTipoDireccion);

            return DeleteTipoDireccion;

        }

        [WebMethod]
        public static bool FnETipoDireccionV(string IdTipoDireccion, string TipoDireccion)
        {
            bool ExisteTipoDireccion = false;
            ClsTipoDireccion OTipoDireccion = new ClsTipoDireccion();

            OTipoDireccion.IdTipoDireccion = IdTipoDireccion;
            OTipoDireccion.TipoDireccion = TipoDireccion;

            ExisteTipoDireccion = new ClsTipoDireccionN().FnETipoDireccionN(OTipoDireccion);

            return ExisteTipoDireccion;

        }
        #endregion

        #region RegTipoCorreo
        [WebMethod]
        public static bool FnCTipoCorreoV(string TipoCorreo)
        {
            bool CreateTipoCorreo = false;
            ClsTipoCorreo OTipoCorreo = new ClsTipoCorreo();

            OTipoCorreo.TipoCorreo = TipoCorreo;

            CreateTipoCorreo = new ClsTipoCorreoN().FnCTipoCorreoN(OTipoCorreo);

            return CreateTipoCorreo;

        }

        [WebMethod]
        public static List<ClsTipoCorreo> FnRTipoCorreoV()
        {
            List<ClsTipoCorreo> OTipoCorreo = new ClsTipoCorreoN().FnRTipoCorreoN();
            return OTipoCorreo;
        }

        [WebMethod]
        public static bool FnUTipoCorreoV(string IdTipoCorreo, string TipoCorreo)
        {
            bool UpdateTipoCorreo = false;
            ClsTipoCorreo OTipoCorreo = new ClsTipoCorreo();

            OTipoCorreo.IdTipoCorreo = IdTipoCorreo;
            OTipoCorreo.TipoCorreo = TipoCorreo;

            UpdateTipoCorreo = new ClsTipoCorreoN().FnUTipoCorreoN(OTipoCorreo);

            return UpdateTipoCorreo;

        }

        [WebMethod]
        public static bool FnDTipoCorreoV(string IdTipoCorreo)
        {
            bool DeleteTipoCorreo = false;
            ClsTipoCorreo OTipoCorreo = new ClsTipoCorreo();

            OTipoCorreo.IdTipoCorreo = IdTipoCorreo;

            DeleteTipoCorreo = new ClsTipoCorreoN().FnDTipoCorreoN(OTipoCorreo);

            return DeleteTipoCorreo;

        }

        [WebMethod]
        public static bool FnETipoCorreoV(string IdTipoCorreo, string TipoCorreo)
        {
            bool ExisteTipoCorreo = false;
            ClsTipoCorreo OTipoCorreo = new ClsTipoCorreo();

            OTipoCorreo.IdTipoCorreo = IdTipoCorreo;
            OTipoCorreo.TipoCorreo = TipoCorreo;

            ExisteTipoCorreo = new ClsTipoCorreoN().FnETipoCorreoN(OTipoCorreo);

            return ExisteTipoCorreo;

        }
        #endregion

        #region RegTipoTelefono
        [WebMethod]
        public static bool FnCTipoTelefonoV(string TipoTelefono)
        {
            bool CreateTipoTelefono = false;
            ClsTipoTelefono OTipoTelefono = new ClsTipoTelefono();

            OTipoTelefono.TipoTelefono = TipoTelefono;

            CreateTipoTelefono = new ClsTipoTelefonoN().FnCTipoTelefonoN(OTipoTelefono);

            return CreateTipoTelefono;

        }

        [WebMethod]
        public static List<ClsTipoTelefono> FnRTipoTelefonoV()
        {
            List<ClsTipoTelefono> OTipoTelefono = new ClsTipoTelefonoN().FnRTipoTelefonoN();
            return OTipoTelefono;
        }

        [WebMethod]
        public static bool FnUTipoTelefonoV(string IdTipoTelefono, string TipoTelefono)
        {
            bool UpdateTipoTelefono = false;
            ClsTipoTelefono OTipoTelefono = new ClsTipoTelefono();

            OTipoTelefono.IdTipoTelefono = IdTipoTelefono;
            OTipoTelefono.TipoTelefono = TipoTelefono;

            UpdateTipoTelefono = new ClsTipoTelefonoN().FnUTipoTelefonoN(OTipoTelefono);

            return UpdateTipoTelefono;

        }

        [WebMethod]
        public static bool FnDTipoTelefonoV(string IdTipoTelefono)
        {
            bool DeleteTipoTelefono = false;
            ClsTipoTelefono OTipoTelefono = new ClsTipoTelefono();

            OTipoTelefono.IdTipoTelefono = IdTipoTelefono;

            DeleteTipoTelefono = new ClsTipoTelefonoN().FnDTipoTelefonoN(OTipoTelefono);

            return DeleteTipoTelefono;

        }

        [WebMethod]
        public static bool FnETipoTelefonoV(string IdTipoTelefono, string TipoTelefono)
        {
            bool ExisteTipoTelefono = false;
            ClsTipoTelefono OTipoTelefono = new ClsTipoTelefono();

            OTipoTelefono.IdTipoTelefono = IdTipoTelefono;
            OTipoTelefono.TipoTelefono = TipoTelefono;

            ExisteTipoTelefono = new ClsTipoTelefonoN().FnETipoTelefonoN(OTipoTelefono);

            return ExisteTipoTelefono;

        }
        #endregion

        #region RegTipoIdentificacion
        [WebMethod]
        public static bool FnCTipoIdentificacionV(string TipoIdentificacion)
        {
            bool CreateTipoIdentificacion = false;
            ClsTipoIdentificacion OTipoIdentificacion = new ClsTipoIdentificacion();

            OTipoIdentificacion.TipoIdentificacion = TipoIdentificacion;

            CreateTipoIdentificacion = new ClsTipoIdentificacionN().FnCTipoIdentificacionN(OTipoIdentificacion);

            return CreateTipoIdentificacion;

        }

        [WebMethod]
        public static List<ClsTipoIdentificacion> FnRTipoIdentificacionV()
        {
            List<ClsTipoIdentificacion> OTipoIdentificacion = new ClsTipoIdentificacionN().FnRTipoIdentificacionN();
            return OTipoIdentificacion;
        }

        [WebMethod]
        public static bool FnUTipoIdentificacionV(string IdTipoIdentificacion, string TipoIdentificacion)
        {
            bool UpdateTipoIdentificacion = false;
            ClsTipoIdentificacion OTipoIdentificacion = new ClsTipoIdentificacion();

            OTipoIdentificacion.IdTipoIdentificacion = IdTipoIdentificacion;
            OTipoIdentificacion.TipoIdentificacion = TipoIdentificacion;

            UpdateTipoIdentificacion = new ClsTipoIdentificacionN().FnUTipoIdentificacionN(OTipoIdentificacion);

            return UpdateTipoIdentificacion;

        }

        [WebMethod]
        public static bool FnDTipoIdentificacionV(string IdTipoIdentificacion)
        {
            bool DeleteTipoIdentificacion = false;
            ClsTipoIdentificacion OTipoIdentificacion = new ClsTipoIdentificacion();

            OTipoIdentificacion.IdTipoIdentificacion = IdTipoIdentificacion;

            DeleteTipoIdentificacion = new ClsTipoIdentificacionN().FnDTipoIdentificacionN(OTipoIdentificacion);

            return DeleteTipoIdentificacion;

        }

        [WebMethod]
        public static bool FnETipoIdentificacionV(string IdTipoIdentificacion, string TipoIdentificacion)
        {
            bool ExisteTipoIdentificacion = false;
            ClsTipoIdentificacion OTipoIdentificacion = new ClsTipoIdentificacion();

            OTipoIdentificacion.IdTipoIdentificacion = IdTipoIdentificacion;
            OTipoIdentificacion.TipoIdentificacion = TipoIdentificacion;

            ExisteTipoIdentificacion = new ClsTipoIdentificacionN().FnETipoIdentificacionN(OTipoIdentificacion);

            return ExisteTipoIdentificacion;

        }
        #endregion


    }
}