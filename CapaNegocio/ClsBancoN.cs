using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClsBancoN
    {
        public bool FnCBancoN(ClsBanco OBanco)
        {
            Boolean CreateBanco = new ClsBancoD().FnCBancoD(OBanco);
            return CreateBanco;
        }
        public List<ClsBanco> FnRBancoN()
        {
            List<ClsBanco> OBanco = new ClsBancoD().FnRBancoD();
            return OBanco;
        }
        public bool FnUBancoN(ClsBanco OBanco)
        {
            if (OBanco.IdBanco != "" && OBanco.IdBanco != null)
            {
                Boolean UpdateBanco = new ClsBancoD().FnUBancoD(OBanco);
                return UpdateBanco;
            }
            else
            {
                return false;
            }

        }
        public bool FnDBancoN(ClsBanco OBanco)
        {
            if (OBanco.IdBanco != "" && OBanco.IdBanco != null)
            {
                Boolean DeleteBanco = new ClsBancoD().FnDBancoD(OBanco);
                return DeleteBanco;
            }
            else
            {
                return false;
            }
        }
        public bool FnEBancoN(ClsBanco OBanco)
        {
            if (OBanco.IdBanco != "" && OBanco.IdBanco != null)
            {
                Boolean ExisteBanco = new ClsBancoD().FnEBancoD(OBanco);
                return ExisteBanco;
            }
            else
            {
                return true;
            }
        }
    }
}
