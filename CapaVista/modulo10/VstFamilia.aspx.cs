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

namespace CapaVista.modulo10
{
    public partial class VsFamilia : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        #region RegFamilia
        [WebMethod]
        public static bool FnCFamiliaV(string Familia)
        {
            bool CreateFamilia = false;
            ClsFamilia OFamilia = new ClsFamilia();

            OFamilia.Familia = Familia;

            CreateFamilia = new ClsFamiliaN().FnCFamiliaN(OFamilia);

            return CreateFamilia;

        }

        [WebMethod]
        public static List<ClsFamilia> FnRFamiliaV()
        {
            List<ClsFamilia> OFamilia = new ClsFamiliaN().FnRFamiliaN();
            return OFamilia;
        }

        [WebMethod]
        public static bool FnUFamiliaV(string IdFamilia, string Familia)
        {
            bool UpdateFamilia = false;
            ClsFamilia OFamilia = new ClsFamilia();

            OFamilia.IdFamilia = IdFamilia;
            OFamilia.Familia = Familia;

            UpdateFamilia = new ClsFamiliaN().FnUFamiliaN(OFamilia);

            return UpdateFamilia;

        }

        [WebMethod]
        public static bool FnDFamiliaV(string IdFamilia)
        {
            bool DeleteFamilia = false;
            ClsFamilia OFamilia = new ClsFamilia();

            OFamilia.IdFamilia = IdFamilia;

            DeleteFamilia = new ClsFamiliaN().FnDFamiliaN(OFamilia);

            return DeleteFamilia;

        }

        [WebMethod]
        public static bool FnEFamiliaV(string IdFamilia, string Familia)
        {
            bool ExisteFamilia = false;
            ClsFamilia OFamilia = new ClsFamilia();

            OFamilia.IdFamilia = IdFamilia;
            OFamilia.Familia = Familia;

            ExisteFamilia = new ClsFamiliaN().FnEFamiliaN(OFamilia);

            return ExisteFamilia;

        }
        #endregion

        #region RegCategoria
        [WebMethod]
        public static bool FnCCategoriaV(string Categoria, string IdFamilia)
        {
            bool CreateCategoria = false;
            ClsCategoria OCategoria = new ClsCategoria();

            OCategoria.Categoria = Categoria;
            OCategoria.ObjFamilia.IdFamilia= IdFamilia;

            CreateCategoria = new ClsCategoriaN().FnCCategoriaN(OCategoria);

            return CreateCategoria;

        }

        [WebMethod]
        public static List<ClsCategoria> FnRCategoriaV()
        {
            List<ClsCategoria> OCategoria = new ClsCategoriaN().FnRCategoriaN();
            return OCategoria;
        }

        [WebMethod]
        public static bool FnUCategoriaV(string IdCategoria, string Categoria, string IdFamilia)
        {
            bool UpdateCategoria = false;
            ClsCategoria OCategoria = new ClsCategoria();

            OCategoria.IdCategoria = IdCategoria;
            OCategoria.Categoria = Categoria;
            OCategoria.ObjFamilia.IdFamilia = IdFamilia;
            UpdateCategoria = new ClsCategoriaN().FnUCategoriaN(OCategoria);

            return UpdateCategoria;

        }

        [WebMethod]
        public static bool FnDCategoriaV(string IdCategoria)
        {
            bool DeleteCategoria = false;
            ClsCategoria OCategoria = new ClsCategoria();

            OCategoria.IdCategoria = IdCategoria;

            DeleteCategoria = new ClsCategoriaN().FnDCategoriaN(OCategoria);

            return DeleteCategoria;

        }

        [WebMethod]
        public static bool FnECategoriaV(string IdCategoria, string Categoria, string IdFamilia)
        {
            bool ExisteCategoria = false;
            ClsCategoria OCategoria = new ClsCategoria();

            OCategoria.IdCategoria = IdCategoria;
            OCategoria.Categoria = Categoria;
            OCategoria.ObjFamilia.IdFamilia = IdFamilia; 

            ExisteCategoria = new ClsCategoriaN().FnECategoriaN(OCategoria);

            return ExisteCategoria;

        }
        #endregion
    }
}