using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsRolN
    {

        public bool FnCRolN(ClsRol ORol)
        {
            bool CreateRol = new ClsRolD().FnCRolD(ORol);
            return CreateRol;
        }
        public List<ClsRol> FnRRolN()
        {
            List<ClsRol> ORol = new ClsRolD().FnRRolD();
            return ORol;
        }
        public bool FnURolN(ClsRol ORol)
        {
            bool UpdateRol = new ClsRolD().FnURolD(ORol);
            return UpdateRol;
        }
        public bool FnDRolN(ClsRol ORol)
        {
            bool DeleteRol = new ClsRolD().FnDRolD(ORol);
            return DeleteRol;
        }
        public bool FnERolN(ClsRol ORol)
        {
            bool ExistRol = new ClsRolD().FnERolD(ORol);
            return ExistRol;
        }
        public bool FnNRolN(ClsRol ORol)
        {
            bool CloneRol = new ClsRolD().FnNRolD(ORol);
            return CloneRol;
        }


    }
}
