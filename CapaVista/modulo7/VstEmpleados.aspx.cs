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


        #region RegEmpleado
        [WebMethod]
        public static bool FnCEmpleadoV(string IdArea, string IdPersona, string IdJefe)
        {
            bool CreateEmpleado = false;
            ClsEmpleado OEmpleado = new ClsEmpleado();

            OEmpleado.ObjArea.IdArea = IdArea;
            OEmpleado.ObjPersona.IdPersona = IdPersona;
            OEmpleado.ObjJefe.IdPersona = IdJefe;

            CreateEmpleado = new ClsEmpleadoN().FnCEmpleadoN(OEmpleado);

            return CreateEmpleado;

        }

        [WebMethod]
        public static List<ClsEmpleado> FnREmpleadoV()
        {
            List<ClsEmpleado> OEmpleado = new ClsEmpleadoN().FnREmpleadoN();
            return OEmpleado;
        }

        [WebMethod]
        public static bool FnUEmpleadoV(string IdEmpleado, string IdArea, string IdPersona, string IdJefe)
        {
            bool UpdateEmpleado = false;
            ClsEmpleado OEmpleado = new ClsEmpleado();

            OEmpleado.IdEmpleado = IdEmpleado;
            OEmpleado.ObjArea.IdArea = IdArea;
            OEmpleado.ObjPersona.IdPersona = IdPersona;
            OEmpleado.ObjJefe.IdPersona = IdJefe;

            UpdateEmpleado = new ClsEmpleadoN().FnUEmpleadoN(OEmpleado);

            return UpdateEmpleado;

        }

        [WebMethod]
        public static bool FnDEmpleadoV(string IdEmpleado)
        {
            bool DeleteEmpleado = false;
            ClsEmpleado OEmpleado = new ClsEmpleado();

            OEmpleado.IdEmpleado = IdEmpleado;

            DeleteEmpleado = new ClsEmpleadoN().FnDEmpleadoN(OEmpleado);

            return DeleteEmpleado;

        }

        [WebMethod]
        public static bool FnEEmpleadoV(string IdEmpleado, string IdArea, string IdPersona)
        {
            bool ExisteEmpleado = false;
            ClsEmpleado OEmpleado = new ClsEmpleado();

            OEmpleado.IdEmpleado = IdEmpleado;
            OEmpleado.ObjArea.IdArea = IdArea;
            OEmpleado.ObjPersona.IdPersona = IdPersona;

            ExisteEmpleado = new ClsEmpleadoN().FnEEmpleadoN(OEmpleado);

            return ExisteEmpleado;

        }
        [WebMethod]
        public static bool FnEEmpleadoPersonaV(string IdPersona)
        {
            bool ExisteEmpleado = false;
            ClsEmpleado OEmpleado = new ClsEmpleado();
            OEmpleado.ObjPersona.IdPersona = IdPersona;
            ExisteEmpleado = new ClsEmpleadoN().FnEEmpleadoPersonaN(OEmpleado);

            return ExisteEmpleado;

        }

        [WebMethod]
        public static List<ClsEmpleado> FnREmpleadoNPersonaV()
        {
            List<ClsEmpleado> OEmpleado = new ClsEmpleadoN().FnREmpleadoNPersonaN();
            return OEmpleado;
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

        #region RegIdentificacion
        [WebMethod]
        public static bool FnCIdentificacionV(string Identificacion, string IdTipoIdentificacion, string IdPersona)
        {
            bool CreateIdentificacion = false;
            ClsIdentificacion OIdentificacion = new ClsIdentificacion();

            OIdentificacion.Identificacion = Identificacion;
            OIdentificacion.ObjTipoIdentificacion.IdTipoIdentificacion = IdTipoIdentificacion;
            OIdentificacion.ObjPersona.IdPersona = IdPersona;

            CreateIdentificacion = new ClsIdentificacionN().FnCIdentificacionN(OIdentificacion);

            return CreateIdentificacion;

        }

        [WebMethod]
        public static List<ClsIdentificacion> FnRIdentificacionV(string IdPersona)
        {
            ClsIdentificacion OIdentificacionV = new ClsIdentificacion();
            OIdentificacionV.ObjPersona.IdPersona = IdPersona;
            List<ClsIdentificacion> OIdentificacion = new ClsIdentificacionN().FnRIdentificacionN(OIdentificacionV);
            return OIdentificacion;
        }

        [WebMethod]
        public static bool FnUIdentificacionV(string IdIdentificacion, string Identificacion, string IdTipoIdentificacion)
        {
            bool UpdateIdentificacion = false;
            ClsIdentificacion OIdentificacion = new ClsIdentificacion();

            OIdentificacion.IdIdentificacion = IdIdentificacion;
            OIdentificacion.Identificacion = Identificacion;
            OIdentificacion.ObjTipoIdentificacion.IdTipoIdentificacion = IdTipoIdentificacion;
            UpdateIdentificacion = new ClsIdentificacionN().FnUIdentificacionN(OIdentificacion);

            return UpdateIdentificacion;

        }

        [WebMethod]
        public static bool FnDIdentificacionV(string IdIdentificacion)
        {
            bool DeleteIdentificacion = false;
            ClsIdentificacion OIdentificacion = new ClsIdentificacion();

            OIdentificacion.IdIdentificacion = IdIdentificacion;

            DeleteIdentificacion = new ClsIdentificacionN().FnDIdentificacionN(OIdentificacion);

            return DeleteIdentificacion;

        }

        [WebMethod]
        public static bool FnEIdentificacionV(string IdIdentificacion, string Identificacion, string IdTipoIdentificacion)
        {
            bool ExisteIdentificacion = false;
            ClsIdentificacion OIdentificacion = new ClsIdentificacion();

            OIdentificacion.IdIdentificacion = IdIdentificacion;
            OIdentificacion.Identificacion = Identificacion;
            OIdentificacion.ObjTipoIdentificacion.IdTipoIdentificacion = IdTipoIdentificacion;

            ExisteIdentificacion = new ClsIdentificacionN().FnEIdentificacionN(OIdentificacion);

            return ExisteIdentificacion;

        }
        #endregion

        #region RegTelefono
        [WebMethod]
        public static bool FnCTelefonoV(string Telefono, string IdTipoTelefono, string IdPersona)
        {
            bool CreateTelefono = false;
            ClsTelefono OTelefono = new ClsTelefono();

            OTelefono.Telefono = Telefono;
            OTelefono.ObjTipoTelefono.IdTipoTelefono = IdTipoTelefono;
            OTelefono.ObjPersona.IdPersona = IdPersona;

            CreateTelefono = new ClsTelefonoN().FnCTelefonoN(OTelefono);

            return CreateTelefono;

        }

        [WebMethod]
        public static List<ClsTelefono> FnRTelefonoV(string IdPersona)
        {
            ClsTelefono OTelefonoV = new ClsTelefono();
            OTelefonoV.ObjPersona.IdPersona = IdPersona;
            List<ClsTelefono> OTelefono = new ClsTelefonoN().FnRTelefonoN(OTelefonoV);
            return OTelefono;
        }

        [WebMethod]
        public static bool FnUTelefonoV(string IdTelefono, string Telefono, string IdTipoTelefono)
        {
            bool UpdateTelefono = false;
            ClsTelefono OTelefono = new ClsTelefono();

            OTelefono.IdTelefono = IdTelefono;
            OTelefono.Telefono = Telefono;
            OTelefono.ObjTipoTelefono.IdTipoTelefono = IdTipoTelefono;
            UpdateTelefono = new ClsTelefonoN().FnUTelefonoN(OTelefono);

            return UpdateTelefono;

        }

        [WebMethod]
        public static bool FnDTelefonoV(string IdTelefono)
        {
            bool DeleteTelefono = false;
            ClsTelefono OTelefono = new ClsTelefono();

            OTelefono.IdTelefono = IdTelefono;

            DeleteTelefono = new ClsTelefonoN().FnDTelefonoN(OTelefono);

            return DeleteTelefono;

        }

        [WebMethod]
        public static bool FnETelefonoV(string IdTelefono, string Telefono, string IdTipoTelefono, string IdPersona)
        {
            bool ExisteTelefono = false;
            ClsTelefono OTelefono = new ClsTelefono();

            OTelefono.IdTelefono = IdTelefono;
            OTelefono.Telefono = Telefono;
            OTelefono.ObjTipoTelefono.IdTipoTelefono = IdTipoTelefono;
            OTelefono.ObjPersona.IdPersona = IdPersona;

            ExisteTelefono = new ClsTelefonoN().FnETelefonoN(OTelefono);

            return ExisteTelefono;

        }
        #endregion

        #region RegCorreo
        [WebMethod]
        public static bool FnCCorreoV(string Correo, string IdTipoCorreo, string IdPersona)
        {
            bool CreateCorreo = false;
            ClsCorreo OCorreo = new ClsCorreo();

            OCorreo.Correo = Correo;
            OCorreo.ObjTipoCorreo.IdTipoCorreo = IdTipoCorreo;
            OCorreo.ObjPersona.IdPersona = IdPersona;

            CreateCorreo = new ClsCorreoN().FnCCorreoN(OCorreo);

            return CreateCorreo;

        }

        [WebMethod]
        public static List<ClsCorreo> FnRCorreoV(string IdPersona)
        {
            ClsCorreo OCorreoV = new ClsCorreo();
            OCorreoV.ObjPersona.IdPersona = IdPersona;
            List<ClsCorreo> OCorreo = new ClsCorreoN().FnRCorreoN(OCorreoV);
            return OCorreo;
        }

        [WebMethod]
        public static bool FnUCorreoV(string IdCorreo, string Correo, string IdTipoCorreo)
        {
            bool UpdateCorreo = false;
            ClsCorreo OCorreo = new ClsCorreo();

            OCorreo.IdCorreo = IdCorreo;
            OCorreo.Correo = Correo;
            OCorreo.ObjTipoCorreo.IdTipoCorreo = IdTipoCorreo;
            UpdateCorreo = new ClsCorreoN().FnUCorreoN(OCorreo);

            return UpdateCorreo;

        }

        [WebMethod]
        public static bool FnDCorreoV(string IdCorreo)
        {
            bool DeleteCorreo = false;
            ClsCorreo OCorreo = new ClsCorreo();

            OCorreo.IdCorreo = IdCorreo;

            DeleteCorreo = new ClsCorreoN().FnDCorreoN(OCorreo);

            return DeleteCorreo;

        }

        [WebMethod]
        public static bool FnECorreoV(string IdCorreo, string Correo, string IdTipoCorreo, string IdPersona)
        {
            bool ExisteCorreo = false;
            ClsCorreo OCorreo = new ClsCorreo();

            OCorreo.IdCorreo = IdCorreo;
            OCorreo.Correo = Correo;
            OCorreo.ObjTipoCorreo.IdTipoCorreo = IdTipoCorreo;
            OCorreo.ObjPersona.IdPersona = IdPersona;

            ExisteCorreo = new ClsCorreoN().FnECorreoN(OCorreo);

            return ExisteCorreo;

        }
        #endregion

        #region RegCorreoEmpresa
        [WebMethod]
        public static bool FnCCorreoEmpresaV(string Correo, string IdTipoCorreo, string IdEmpresa)
        {
            bool CreateCorreoEmpresa = false;
            ClsCorreo OCorreoEmpresa = new ClsCorreo();

            OCorreoEmpresa.Correo = Correo;
            OCorreoEmpresa.ObjTipoCorreo.IdTipoCorreo = IdTipoCorreo;
            OCorreoEmpresa.ObjEmpresa.IdEmpresa = IdEmpresa;

            CreateCorreoEmpresa = new ClsCorreoN().FnCCorreoEmpresaN(OCorreoEmpresa);

            return CreateCorreoEmpresa;

        }

        [WebMethod]
        public static List<ClsCorreo> FnRCorreoEmpresaV(string IdEmpresa)
        {
            ClsCorreo OCorreoEmpresaV = new ClsCorreo();
            OCorreoEmpresaV.ObjEmpresa.IdEmpresa = IdEmpresa;
            List<ClsCorreo> OCorreoEmpresa = new ClsCorreoN().FnRCorreoEmpresaN(OCorreoEmpresaV);
            return OCorreoEmpresa;
        }
        [WebMethod]
        public static bool FnECorreoEmpresaV(string IdCorreo, string Correo, string IdTipoCorreo, string IdEmpresa)
        {
            bool ExisteCorreoEmpresa = false;
            ClsCorreo OCorreoEmpresa = new ClsCorreo();

            OCorreoEmpresa.IdCorreo = IdCorreo;
            OCorreoEmpresa.Correo = Correo;
            OCorreoEmpresa.ObjTipoCorreo.IdTipoCorreo = IdTipoCorreo;
            OCorreoEmpresa.ObjEmpresa.IdEmpresa = IdEmpresa;

            ExisteCorreoEmpresa = new ClsCorreoN().FnECorreoEmpresaN(OCorreoEmpresa);

            return ExisteCorreoEmpresa;

        }


        #endregion

        #region RegDireccion
        [WebMethod]
        public static bool FnCDireccionV(string Direccion, string IdTipoDireccion, string IdPersona, string IdBarrio)
        {
            bool CreateDireccion = false;
            ClsDireccion ODireccion = new ClsDireccion();

            ODireccion.Direccion = Direccion;
            ODireccion.ObjTipoDireccion.IdTipoDireccion = IdTipoDireccion;
            ODireccion.ObjPersona.IdPersona = IdPersona;
            ODireccion.ObjBarrio.IdBarrio = IdBarrio;

            CreateDireccion = new ClsDireccionN().FnCDireccionN(ODireccion);

            return CreateDireccion;

        }

        [WebMethod]
        public static List<ClsDireccion> FnRDireccionV(string IdPersona)
        {
            ClsDireccion ODireccionV = new ClsDireccion();
            ODireccionV.ObjPersona.IdPersona = IdPersona;
            List<ClsDireccion> ODireccion = new ClsDireccionN().FnRDireccionN(ODireccionV);
            return ODireccion;
        }

        [WebMethod]
        public static bool FnUDireccionV(string IdDireccion, string Direccion, string IdTipoDireccion, string IdBarrio)
        {
            bool UpdateDireccion = false;
            ClsDireccion ODireccion = new ClsDireccion();

            ODireccion.IdDireccion = IdDireccion;
            ODireccion.Direccion = Direccion;
            ODireccion.ObjTipoDireccion.IdTipoDireccion = IdTipoDireccion;
            ODireccion.ObjBarrio.IdBarrio = IdBarrio;
            UpdateDireccion = new ClsDireccionN().FnUDireccionN(ODireccion);

            return UpdateDireccion;

        }

        [WebMethod]
        public static bool FnDDireccionV(string IdDireccion)
        {
            bool DeleteDireccion = false;
            ClsDireccion ODireccion = new ClsDireccion();

            ODireccion.IdDireccion = IdDireccion;

            DeleteDireccion = new ClsDireccionN().FnDDireccionN(ODireccion);

            return DeleteDireccion;

        }

        [WebMethod]
        public static bool FnEDireccionV(string IdDireccion, string Direccion, string IdTipoDireccion, string IdPersona)
        {
            bool ExisteDireccion = false;
            ClsDireccion ODireccion = new ClsDireccion();

            ODireccion.IdDireccion = IdDireccion;
            ODireccion.Direccion = Direccion;
            ODireccion.ObjTipoDireccion.IdTipoDireccion = IdTipoDireccion;
            ODireccion.ObjPersona.IdPersona = IdPersona;

            ExisteDireccion = new ClsDireccionN().FnEDireccionN(ODireccion);

            return ExisteDireccion;

        }
        #endregion

        #region RegDireccionEmpresa
        [WebMethod]
        public static bool FnCDireccionEmpresaV(string Direccion, string IdTipoDireccion, string IdEmpresa, string IdBarrio)
        {
            bool CreateDireccionEmpresa = false;
            ClsDireccion ODireccionEmpresa = new ClsDireccion();

            ODireccionEmpresa.Direccion = Direccion;
            ODireccionEmpresa.ObjTipoDireccion.IdTipoDireccion = IdTipoDireccion;
            ODireccionEmpresa.ObjEmpresa.IdEmpresa = IdEmpresa;
            ODireccionEmpresa.ObjBarrio.IdBarrio = IdBarrio;

            CreateDireccionEmpresa = new ClsDireccionN().FnCDireccionEmpresaN(ODireccionEmpresa);

            return CreateDireccionEmpresa;

        }

        [WebMethod]
        public static List<ClsDireccion> FnRDireccionEmpresaV(string IdEmpresa)
        {
            ClsDireccion ODireccionEmpresaV = new ClsDireccion();
            ODireccionEmpresaV.ObjEmpresa.IdEmpresa = IdEmpresa;
            List<ClsDireccion> ODireccionEmpresa = new ClsDireccionN().FnRDireccionEmpresaN(ODireccionEmpresaV);
            return ODireccionEmpresa;
        }
        [WebMethod]
        public static bool FnEDireccionEmpresaV(string IdDireccion, string Direccion, string IdTipoDireccion, string IdEmpresa)
        {
            bool ExisteDireccionEmpresa = false;
            ClsDireccion ODireccionEmpresa = new ClsDireccion();

            ODireccionEmpresa.IdDireccion = IdDireccion;
            ODireccionEmpresa.Direccion = Direccion;
            ODireccionEmpresa.ObjTipoDireccion.IdTipoDireccion = IdTipoDireccion;
            ODireccionEmpresa.ObjEmpresa.IdEmpresa = IdEmpresa;

            ExisteDireccionEmpresa = new ClsDireccionN().FnEDireccionEmpresaN(ODireccionEmpresa);

            return ExisteDireccionEmpresa;

        }
        #endregion

        #region TelefonoEmpresa
        [WebMethod]
        public static bool FnCTelefonoEmpresaV(string Telefono, string IdTipoTelefono, string IdEmpresa)
        {
            bool CreateTelefonoEmpresa = false;
            ClsTelefono OTelefonoEmpresa = new ClsTelefono();

            OTelefonoEmpresa.Telefono = Telefono;
            OTelefonoEmpresa.ObjTipoTelefono.IdTipoTelefono = IdTipoTelefono;
            OTelefonoEmpresa.ObjEmpresa.IdEmpresa = IdEmpresa;

            CreateTelefonoEmpresa = new ClsTelefonoN().FnCTelefonoEmpresaN(OTelefonoEmpresa);

            return CreateTelefonoEmpresa;

        }

        [WebMethod]
        public static List<ClsTelefono> FnRTelefonoEmpresaV(string IdEmpresa)
        {
            ClsTelefono OTelefonoEmpresaV = new ClsTelefono();
            OTelefonoEmpresaV.ObjEmpresa.IdEmpresa = IdEmpresa;
            List<ClsTelefono> OTelefonoEmpresa = new ClsTelefonoN().FnRTelefonoEmpresaN(OTelefonoEmpresaV);
            return OTelefonoEmpresa;
        }
        [WebMethod]
        public static bool FnETelefonoEmpresaV(string IdTelefono, string Telefono, string IdTipoTelefono, string IdEmpresa)
        {
            bool ExisteTelefonoEmpresa = false;
            ClsTelefono OTelefonoEmpresa = new ClsTelefono();

            OTelefonoEmpresa.IdTelefono = IdTelefono;
            OTelefonoEmpresa.Telefono = Telefono;
            OTelefonoEmpresa.ObjTipoTelefono.IdTipoTelefono = IdTipoTelefono;
            OTelefonoEmpresa.ObjEmpresa.IdEmpresa = IdEmpresa;

            ExisteTelefonoEmpresa = new ClsTelefonoN().FnETelefonoEmpresaN(OTelefonoEmpresa);

            return ExisteTelefonoEmpresa;

        }
        #endregion

    }
}