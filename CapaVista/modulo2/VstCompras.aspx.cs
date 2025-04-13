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

namespace CapaVista.modulo2
{
    public partial class VstCompras : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }


        #region RegEntrada
        [WebMethod]
        public static bool FnCEntradaV(string Entrada)
        {
            bool CreateEntrada = false;
            ClsEntrada OEntrada = new ClsEntrada();

            OEntrada.Entrada = Entrada;

            CreateEntrada = new ClsEntradaN().FnCEntradaN(OEntrada);

            return CreateEntrada;

        }

        [WebMethod]
        public static List<ClsEntrada> FnREntradaV()
        {
            List<ClsEntrada> OEntrada = new ClsEntradaN().FnREntradaN();
            return OEntrada;
        }

        [WebMethod]
        public static bool FnUEntradaV(string IdEntrada, string Entrada)
        {
            bool UpdateEntrada = false;
            ClsEntrada OEntrada = new ClsEntrada();

            OEntrada.IdEntrada = IdEntrada;
            OEntrada.Entrada = Entrada;

            UpdateEntrada = new ClsEntradaN().FnUEntradaN(OEntrada);

            return UpdateEntrada;

        }

        [WebMethod]
        public static bool FnDEntradaV(string IdEntrada)
        {
            bool DeleteEntrada = false;
            ClsEntrada OEntrada = new ClsEntrada();

            OEntrada.IdEntrada = IdEntrada;

            DeleteEntrada = new ClsEntradaN().FnDEntradaN(OEntrada);

            return DeleteEntrada;

        }

        [WebMethod]
        public static bool FnEEntradaV(string IdEntrada, string Entrada)
        {
            bool ExisteEntrada = false;
            ClsEntrada OEntrada = new ClsEntrada();

            OEntrada.IdEntrada = IdEntrada;
            OEntrada.Entrada = Entrada;

            ExisteEntrada = new ClsEntradaN().FnEEntradaN(OEntrada);

            return ExisteEntrada;

        }
        #endregion
    }
}