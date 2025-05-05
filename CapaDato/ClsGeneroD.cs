using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;
using MySql.Data.MySqlClient;
using System.Data;

namespace CapaDato
{
    public class ClsGeneroD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public List<ClsGenero> FnRGeneroD()
        {
            ClsGenero OGenero = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRGenero", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsGenero> LstGenero = new List<ClsGenero>();
                while (Dr_D.Read())
                {
                    OGenero = new ClsGenero();
                    OGenero.IdGenero = Dr_D[0].ToString();//id_Genero
                    OGenero.Genero = Dr_D[1].ToString();  //Genero     
                    LstGenero.Add(OGenero);
                }
                return LstGenero;
            }
            catch (Exception ex)
            {
                return null;
                throw ex;
            }
            finally
            {
                ObjConexion.Cerrarcon();
            }
        }

    }
}
