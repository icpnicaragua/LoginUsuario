using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsDireccionN
    {

        #region RegPersona
        public bool FnCDireccionN(ClsDireccion ODireccion)
        {
            Boolean CreateDireccion = new ClsDireccionD().FnCDireccionD(ODireccion);
            return CreateDireccion;
        }
        public List<ClsDireccion> FnRDireccionN(ClsDireccion OIdentifiacionN)
        {
            List<ClsDireccion> ODireccion = new ClsDireccionD().FnRDireccionD(OIdentifiacionN);
            return ODireccion;
        }
        public bool FnUDireccionN(ClsDireccion ODireccion)
        {
            if (ODireccion.IdDireccion != "" && ODireccion.IdDireccion != null && ODireccion.ObjTipoDireccion.IdTipoDireccion != "" && ODireccion.ObjTipoDireccion.IdTipoDireccion != null && ODireccion.ObjBarrio.IdBarrio != "" && ODireccion.ObjBarrio.IdBarrio != null)
            {
                Boolean UpdateDireccion = new ClsDireccionD().FnUDireccionD(ODireccion);
                return UpdateDireccion;
            }
            else
            {
                return false;
            }

        }
        public bool FnDDireccionN(ClsDireccion ODireccion)
        {
            if (ODireccion.IdDireccion != "" && ODireccion.IdDireccion != null)
            {
                Boolean DeleteDireccion = new ClsDireccionD().FnDDireccionD(ODireccion);
                return DeleteDireccion;
            }
            else
            {
                return false;
            }
        }
        public bool FnEDireccionN(ClsDireccion ODireccion)
        {
            if (ODireccion.IdDireccion != "" && ODireccion.IdDireccion != null && ODireccion.ObjTipoDireccion.IdTipoDireccion != "" && ODireccion.ObjTipoDireccion.IdTipoDireccion != null)
            {
                Boolean ExisteDireccion = new ClsDireccionD().FnEDireccionD(ODireccion);
                return ExisteDireccion;
            }
            else
            {
                return true;
            }
        }
        #endregion

        #region RegEmpresa
        public bool FnCDireccionEmpresaN(ClsDireccion ODireccionEmpresa)
        {
            Boolean CreateDireccionEmpresa = new ClsDireccionD().FnCDireccionEmpresaD(ODireccionEmpresa);
            return CreateDireccionEmpresa;
        }
        public List<ClsDireccion> FnRDireccionEmpresaN(ClsDireccion OIdentifiacionEmpresaN)
        {
            List<ClsDireccion> ODireccionEmpresa = new ClsDireccionD().FnRDireccionEmpresaD(OIdentifiacionEmpresaN);
            return ODireccionEmpresa;
        }
        public bool FnEDireccionEmpresaN(ClsDireccion ODireccionEmpresa)
        {
            if (ODireccionEmpresa.IdDireccion != "" && ODireccionEmpresa.IdDireccion != null && ODireccionEmpresa.ObjTipoDireccion.IdTipoDireccion != "" && ODireccionEmpresa.ObjTipoDireccion.IdTipoDireccion != null)
            {
                Boolean ExisteDireccionEmpresa = new ClsDireccionD().FnEDireccionEmpresaD(ODireccionEmpresa);
                return ExisteDireccionEmpresa;
            }
            else
            {
                return true;
            }
        }
        #endregion



    }
}
