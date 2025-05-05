using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDato;
using CapaEntidad;


namespace CapaNegocio
{
    public class ClsPersonaN
    {
        public bool FnCPersonaN(ClsPersona OPersona)
        {
            Boolean CreatePersona = new ClsPersonaD().FnCPersonaD(OPersona);
            return CreatePersona;
        }
        public List<ClsPersona> FnRPersonaN()
        {
            List<ClsPersona> OPersona = new ClsPersonaD().FnRPersonaD();
            return OPersona;
        }
        public bool FnUPersonaN(ClsPersona OPersona)
        {
            if (OPersona.IdPersona != "" && OPersona.IdPersona != null && OPersona.ObjGenero.IdGenero != "" && OPersona.ObjGenero.IdGenero != null)
            {
                Boolean UpdatePersona = new ClsPersonaD().FnUPersonaD(OPersona);
                return UpdatePersona;
            }
            else
            {
                return false;
            }

        }
        public bool FnDPersonaN(ClsPersona OPersona)
        {
            if (OPersona.IdPersona != "" && OPersona.IdPersona != null)
            {
                Boolean DeletePersona = new ClsPersonaD().FnDPersonaD(OPersona);
                return DeletePersona;
            }
            else
            {
                return false;
            }
        }
        public bool FnEPersonaN(ClsPersona OPersona)
        {
            if (OPersona.IdPersona != "" && OPersona.IdPersona != null && OPersona.ObjGenero.IdGenero != "" && OPersona.ObjGenero.IdGenero != null)
            {
                Boolean ExistePersona = new ClsPersonaD().FnEPersonaD(OPersona);
                return ExistePersona;
            }
            else
            {
                return true;
            }
        }
    }
}
