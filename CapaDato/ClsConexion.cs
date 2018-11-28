using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDato
{
    public class ClsConexion
    {
        public readonly SqlConnection Con_D = new SqlConnection("Data Source=DESKTOP-HV5U89A\\ICPNICARAGUAPCEP;Initial Catalog=usuario;Integrated Security=True");

        public SqlConnection Abrircon()
        {

            if (Con_D.State == ConnectionState.Closed)
                Con_D.Open();
            return Con_D;

        }

        public SqlConnection Cerrarcon()
        {

            if (Con_D.State == ConnectionState.Open)
                Con_D.Close();
            return Con_D;

        }
    }
}
