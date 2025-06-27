using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;
using System.Data;
using CapaEntidad;
using CapaNegocio;
using System.IO;

namespace CapaVista.modulo10
{
    public partial class VstProductos : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        #region RegGarantia
        [WebMethod]
        public static bool FnCGarantiaV(string Garantia)
        {
            bool CreateGarantia = false;
            ClsGarantia OGarantia = new ClsGarantia();

            OGarantia.Garantia = Garantia;

            CreateGarantia = new ClsGarantiaN().FnCGarantiaN(OGarantia);

            return CreateGarantia;

        }

        [WebMethod]
        public static List<ClsGarantia> FnRGarantiaV()
        {
            List<ClsGarantia> OGarantia = new ClsGarantiaN().FnRGarantiaN();
            return OGarantia;
        }

        [WebMethod]
        public static bool FnUGarantiaV(string IdGarantia, string Garantia)
        {
            bool UpdateGarantia = false;
            ClsGarantia OGarantia = new ClsGarantia();

            OGarantia.IdGarantia = IdGarantia;
            OGarantia.Garantia = Garantia;

            UpdateGarantia = new ClsGarantiaN().FnUGarantiaN(OGarantia);

            return UpdateGarantia;

        }

        [WebMethod]
        public static bool FnDGarantiaV(string IdGarantia)
        {
            bool DeleteGarantia = false;
            ClsGarantia OGarantia = new ClsGarantia();

            OGarantia.IdGarantia = IdGarantia;

            DeleteGarantia = new ClsGarantiaN().FnDGarantiaN(OGarantia);

            return DeleteGarantia;

        }

        [WebMethod]
        public static bool FnEGarantiaV(string IdGarantia, string Garantia)
        {
            bool ExisteGarantia = false;
            ClsGarantia OGarantia = new ClsGarantia();

            OGarantia.IdGarantia = IdGarantia;
            OGarantia.Garantia = Garantia;

            ExisteGarantia = new ClsGarantiaN().FnEGarantiaN(OGarantia);

            return ExisteGarantia;

        }
        #endregion

        #region RegProducto
        [WebMethod]
        public static bool FnCProductoV(string Nombre, string Descripcion, string Barra, string UnidadGranel, string GrabaIva, string Minimo, string IdSubCategoria, string IdGarantia)
        {
            bool CreateProducto = false;
            ClsProducto OProducto = new ClsProducto();

            OProducto.Nombre = Nombre;
            OProducto.Descripcion = Descripcion;
            OProducto.Barra = Barra;
            OProducto.UnidadGranel = UnidadGranel;
            OProducto.GrabaIva = GrabaIva;
            OProducto.AlertaMinimo = Minimo;
            OProducto.ObjSubCategoria.IdSubCategoria= IdSubCategoria;
            OProducto.ObjGarantia.IdGarantia = IdGarantia;

            CreateProducto = new ClsProductoN().FnCProductoN(OProducto);

            return CreateProducto;

        }

        [WebMethod]
        public static List<ClsProducto> FnRProductoV()
        {
            List<ClsProducto> OProducto = new ClsProductoN().FnRProductoN();
            return OProducto;
        }

        [WebMethod]
        public static bool FnUProductoV(string IdProducto,string Nombre, string Descripcion, string Barra, string UnidadGranel, string GrabaIva, string Minimo, string IdSubCategoria, string IdGarantia)
        {
            bool UpdateProducto = false;
            ClsProducto OProducto = new ClsProducto();

            OProducto.IdProducto = IdProducto;
            OProducto.Nombre = Nombre;
            OProducto.Descripcion = Descripcion;
            OProducto.Barra = Barra;
            OProducto.UnidadGranel = UnidadGranel;
            OProducto.GrabaIva = GrabaIva;
            OProducto.AlertaMinimo = Minimo;
            OProducto.ObjSubCategoria.IdSubCategoria = IdSubCategoria;
            OProducto.ObjGarantia.IdGarantia = IdGarantia;

            UpdateProducto = new ClsProductoN().FnUProductoN(OProducto);

            return UpdateProducto;
        }

        [WebMethod]
        public static bool FnDProductoV(string IdProducto)
        {
            bool DeleteProducto = false;
            ClsProducto OProducto = new ClsProducto();

            OProducto.IdProducto = IdProducto;

            DeleteProducto = new ClsProductoN().FnDProductoN(OProducto);

            return DeleteProducto;

        }

        [WebMethod]
        public static bool FnEProductoV(string IdProducto, string Barra, string Nombre)
        {
            bool ExisteProducto = false;
            ClsProducto OProducto = new ClsProducto();

            OProducto.IdProducto = IdProducto;
            OProducto.Nombre = Nombre;
            OProducto.Barra = Barra;

            ExisteProducto = new ClsProductoN().FnEProductoN(OProducto);

            return ExisteProducto;

        }


        #endregion

        protected void FnCImaProducto(object sender, EventArgs e)
        {
            string[] extensionespermitidas = { ".jpg", ".png" };
            if (FUProducto.HasFile)
            {
                string FileExt = Path.GetExtension(FUProducto.FileName.ToLower());
                string NuevoNombreImagen = "";
                int SizeIma = FUProducto.PostedFile.ContentLength;
                if (extensionespermitidas.Contains(FileExt))
                {
                    NuevoNombreImagen = Guid.NewGuid().ToString() + NuevoNombreImagen;//nombre: P_IDPRODUCTO_Fecha_Hora P_1_12062025_1354
                    try
                    {
                        FUProducto.PostedFile.SaveAs(Server.MapPath("~/img/productos/") + NuevoNombreImagen + FileExt);

                    }
                    catch ( Exception ex)
                    {                     
                        throw ex;
                    }
                    finally
                    {

                    }
                    
                    /*if( FnCImagenV("", ""))
                    {
                        //guardado en bd
                        Response.Write("Imagen guardada.");
                    }*/
                }
                else
                {
                    //Response.Write("Se permite solo imágenes JPG y PNG");
                    ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "alertMessage", "alert('File Extension is not allowed')", true);
                }

            }
            else
            {
                Response.Write("Seleccionar una imagen para subir");
            }
        }

        public static bool FnCImagenV(string Imagen, string IdProducto)
        {
            bool CreateImagen = false;
            ClsImagen OImagen = new ClsImagen();

            OImagen.Imagen = Imagen;
            OImagen.ObjProducto.IdProducto = IdProducto;           

            CreateImagen = new ClsImagenN().FnCImagenN(OImagen);

            return CreateImagen;          
        }
    }
}