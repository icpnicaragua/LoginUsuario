using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsProductoN
    {
        public bool FnCProductoN(ClsProducto OProducto)
        {
            Boolean CreateProducto = new ClsProductoD().FnCProductoD(OProducto);
            return CreateProducto;
        }
        public List<ClsProducto> FnRProductoN()
        {
            List<ClsProducto> OProducto = new ClsProductoD().FnRProductoD();
            return OProducto;
        }
        public bool FnUProductoN(ClsProducto OProducto)
        {
            if (OProducto.IdProducto != "" && OProducto.IdProducto != null &&
                OProducto.ObjGarantia.IdGarantia != "" && OProducto.ObjGarantia.IdGarantia != null &&
                OProducto.ObjSubCategoria.IdSubCategoria != "" && OProducto.ObjSubCategoria.IdSubCategoria != null
                )
            {
                Boolean UpdateProducto = new ClsProductoD().FnUProductoD(OProducto);
                return UpdateProducto;
            }
            else
            {
                return false;
            }

        }
        public bool FnDProductoN(ClsProducto OProducto)
        {
            if (OProducto.IdProducto != "" && OProducto.IdProducto != null)
            {
                Boolean DeleteProducto = new ClsProductoD().FnDProductoD(OProducto);
                return DeleteProducto;
            }
            else
            {
                return false;
            }
        }
        public bool FnEProductoN(ClsProducto OProducto)
        {
            if (OProducto.IdProducto != "" && OProducto.IdProducto != null &&
                OProducto.Nombre != "" && OProducto.Nombre != null)
            {
                Boolean ExisteProducto = new ClsProductoD().FnEProductoD(OProducto);
                return ExisteProducto;
            }
            else
            {
                return true;
            }
        }
    }
}
