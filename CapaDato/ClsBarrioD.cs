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
    public class ClsBarrioD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public List<ClsBarrio> FnRBarrioD(ClsBarrio OBarrioD)
        {
            ClsBarrio OBarrio = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRBarrio", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmRIdPersona", Convert.ToInt16(OBarrioD.ObjMunicipio.IdMunicipio));
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsBarrio> LstBarrio = new List<ClsBarrio>();
                while (Dr_D.Read())
                {
                    OBarrio = new ClsBarrio();
                    OBarrio.IdBarrio = Dr_D[0].ToString();//id_Barrio
                    OBarrio.Barrio = Dr_D[1].ToString();  //Barrio                  
                    LstBarrio.Add(OBarrio);
                }
                return LstBarrio;
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
