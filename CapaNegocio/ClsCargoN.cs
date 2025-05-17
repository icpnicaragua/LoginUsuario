using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;


namespace CapaNegocio
{
    public class ClsCargoN
    {
        public bool FnCCargoN(ClsCargo OCargo)
        {
            Boolean CreateCargo = new ClsCargoD().FnCCargoD(OCargo);
            return CreateCargo;
        }
        public List<ClsCargo> FnRCargoN()
        {
            List<ClsCargo> OCargo = new ClsCargoD().FnRCargoD();
            return OCargo;
        }
        public bool FnUCargoN(ClsCargo OCargo)
        {
            if (OCargo.IdCargo != "" && OCargo.IdCargo != null)
            {
                Boolean UpdateCargo = new ClsCargoD().FnUCargoD(OCargo);
                return UpdateCargo;
            }
            else
            {
                return false;
            }

        }
        public bool FnDCargoN(ClsCargo OCargo)
        {
            if (OCargo.IdCargo != "" && OCargo.IdCargo != null)
            {
                Boolean DeleteCargo = new ClsCargoD().FnDCargoD(OCargo);
                return DeleteCargo;
            }
            else
            {
                return false;
            }
        }
        public bool FnECargoN(ClsCargo OCargo)
        {
            if (OCargo.IdCargo != "" && OCargo.IdCargo != null)
            {
                Boolean ExisteCargo = new ClsCargoD().FnECargoD(OCargo);
                return ExisteCargo;
            }
            else
            {
                return true;
            }
        }
    }
}
