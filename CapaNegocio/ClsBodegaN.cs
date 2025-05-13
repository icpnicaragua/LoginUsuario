using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsBodegaN
    {
        public bool FnCBodegaN(ClsBodega OBodega)
        {
            Boolean CreateBodega = new ClsBodegaD().FnCBodegaD(OBodega);
            return CreateBodega;
        }
        public List<ClsBodega> FnRBodegaN()
        {
            List<ClsBodega> OBodega = new ClsBodegaD().FnRBodegaD();
            return OBodega;
        }
        public bool FnUBodegaN(ClsBodega OBodega)
        {
            if (OBodega.IdBodega != "" && OBodega.IdBodega != null 
                && OBodega.ObjSucursal.IdSucursal != "" && OBodega.ObjSucursal.IdSucursal != null
                 && OBodega.ObjResponsable.IdEmpleado != "" && OBodega.ObjResponsable.IdEmpleado != null
                )
            {
                Boolean UpdateBodega = new ClsBodegaD().FnUBodegaD(OBodega);
                return UpdateBodega;
            }
            else
            {
                return false;
            }

        }
        public bool FnDBodegaN(ClsBodega OBodega)
        {
            if (OBodega.IdBodega != "" && OBodega.IdBodega != null)
            {
                Boolean DeleteBodega = new ClsBodegaD().FnDBodegaD(OBodega);
                return DeleteBodega;
            }
            else
            {
                return false;
            }
        }
        public bool FnEBodegaN(ClsBodega OBodega)
        {
            if (OBodega.IdBodega != "" && OBodega.IdBodega != null 
                && OBodega.ObjSucursal.IdSucursal != "" && OBodega.ObjSucursal.IdSucursal != null               
                )
            {
                Boolean ExisteBodega = new ClsBodegaD().FnEBodegaD(OBodega);
                return ExisteBodega;
            }
            else
            {
                return true;
            }
        }
    }
}
