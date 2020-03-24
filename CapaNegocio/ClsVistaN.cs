using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;
using CapaDato.mve; // el punto hp es por la carpeta

namespace CapaNegocio
{
    public class ClsVistaN
    {
        public List<ClsVista> FnRVist()
        {
            List<ClsVista> OVist = new ClsVistaD().FnRVist();
            //por acá se recortarían los espacios
            return OVist;
        }

        public bool FnEVistaN(ClsVista Ovista)
        {
            if (Ovista.Idvista != "" && Ovista.Idvista != null)
            {
                Boolean ExisteVista = new ClsVistaD().FnEVistaD(Ovista);
            return ExisteVista;       
        }
            else
            {
                return true;
            }
        }

        public bool FnEVistaAspN(ClsVista Ovista)
        {
            if (Ovista.Idvista != "" && Ovista.Idvista != null)
            {
                Boolean ExisteVistaAsp = new ClsVistaD().FnEVistaaspD(Ovista);
                return ExisteVistaAsp;
            }
            else
            {
                return true;
            }
        }

        public bool FnDVistaN(ClsVista OVista)
        {
            if (OVista.Idvista != "" && OVista.Idvista != null)
            {
                Boolean DeleteVista = new ClsVistaD().FnDVistaD(OVista);
                return DeleteVista;
            }
            else
            {
                return false;
            }

        }

        public bool FnCVistaN(ClsVista Ovista)
        {
            Boolean CreateVista = new ClsVistaD().FnCVistaD(Ovista);
            return CreateVista;
        }

        public bool FnUVistaN(ClsVista OVista)
        {
            if (OVista.Idvista != "" && OVista.Idvista != null)
            {
       
                Boolean UpdateVista = new ClsVistaD().FnUVistaD(OVista);
                return UpdateVista;
            }
            else
            {
                return false;
            }



        }

    }
}
