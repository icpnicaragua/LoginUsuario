using System;
using System.Collections.Generic;
using MySql;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using MySql.Data.MySqlClient;

namespace CapaDato
{
    public class ClsConexion
    {
       
        public readonly   MySqlConnection Con_D = new MySqlConnection();

        public MySql.Data.MySqlClient.MySqlConnection  Abrircon()
        {
            try
            {
                Con_D.ConnectionString = "SERVER=127.0.0.1;DATABASE=icpprueba;UID=aplicacion;PWD=Aplicacion1;PORT=3306;pipe=mysql";
                if (Con_D.State == ConnectionState.Closed)
                    Con_D.Open();

                return Con_D;
            }

            catch (Exception ex)
            {
                throw ex;

            }
        }

        public MySqlConnection Cerrarcon()
        {
            try
            {
                if (Con_D.State == ConnectionState.Open)
                    Con_D.Close();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
               
            }
            return Con_D;


        }
    }
}
