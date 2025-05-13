using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsRackN
    {
        public bool FnCRackN(ClsRack ORack)
        {
            Boolean CreateRack = new ClsRackD().FnCRackD(ORack);
            return CreateRack;
        }
        public List<ClsRack> FnRRackN()
        {
            List<ClsRack> ORack = new ClsRackD().FnRRackD();
            return ORack;
        }
        public bool FnURackN(ClsRack ORack)
        {
            if (ORack.IdRack != "" && ORack.IdRack != null && ORack.ObjSeccion.IdSeccion != "" && ORack.ObjSeccion.IdSeccion != null)
            {
                Boolean UpdateRack = new ClsRackD().FnURackD(ORack);
                return UpdateRack;
            }
            else
            {
                return false;
            }

        }
        public bool FnDRackN(ClsRack ORack)
        {
            if (ORack.IdRack != "" && ORack.IdRack != null)
            {
                Boolean DeleteRack = new ClsRackD().FnDRackD(ORack);
                return DeleteRack;
            }
            else
            {
                return false;
            }
        }
        public bool FnERackN(ClsRack ORack)
        {
            if (ORack.IdRack != "" && ORack.IdRack != null && ORack.ObjSeccion.IdSeccion != "" && ORack.ObjSeccion.IdSeccion != null)
            {
                Boolean ExisteRack = new ClsRackD().FnERackD(ORack);
                return ExisteRack;
            }
            else
            {
                return true;
            }
        }
    }
}
