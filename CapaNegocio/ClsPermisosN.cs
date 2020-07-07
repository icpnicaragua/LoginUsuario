using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
   public class ClsPermisosN
    {
        public List<ClsPermisos> PermisosPM(string IDU)
        {
            List<ClsPermisos> objPermisosN = new ClsPermisosD().PermisosGenerales(IDU);
            foreach(ClsPermisos x in objPermisosN)
            {
                x.ObjM.Idaspmodulo = x.ObjM.Idaspmodulo.Trim();
                x.ObjV.Idaspvista = x.ObjV.Idaspvista.Trim();
                x.ObjE.Idaspelemento = x.ObjE.Idaspelemento.Trim();
                
            }
            return objPermisosN;
        }

        public List<ClsPermisos> PermisosVista(string IDU, string IDASPVISTA)
        {
            List<ClsPermisos> _objPermisosVista = new ClsPermisosD().PermisoVIsta(IDU, IDASPVISTA);
            foreach (ClsPermisos x in _objPermisosVista)
            {
                x.ObjV.Idaspvista = x.ObjV.Idaspvista.Trim();
            }
            return _objPermisosVista;
        }

        public bool FnDPermisosN(ClsPermisos ObjPermisos)
        {
            if(ObjPermisos.ObjR.Id_rol!="" && ObjPermisos.ObjR.Id_rol != null)
            {
                bool DeletePermisos = new ClsPermisosD().FnDPermisosD(ObjPermisos);
                return DeletePermisos;
            }
            else
            {
                return false;
            }
        }

        public List<ClsPermisos> FnRPermisosN(string IdRol)
        {
            List<ClsPermisos> ObjPermisos = new ClsPermisosD().FnRPermisosD(IdRol);
            return ObjPermisos;
        }

        public bool FnUPermisosN(ClsPermisos ObjPermisos)
        {
            if (ObjPermisos.ObjR.Id_rol != "" && ObjPermisos.ObjR.Id_rol != null)
            {
                bool UpdatePermisos = new ClsPermisosD().FnUPermisosD(ObjPermisos);
                return UpdatePermisos;
            }
            else
            {
                return false;
            }
        }
    }
}
