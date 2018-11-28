using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;
namespace CapaDato.mve
{
    public class ClsElementoD
    {
        private ClsConexion ObjConexion = null;
        private SqlDataReader Dr_D; //para leer datos de latabla 
        private SqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public List<ClsElemento> MostrarElementos()
        {
            return null;
        }
    }
}
