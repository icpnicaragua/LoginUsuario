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
    public class ClsMunicipioD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public List<ClsMunicipio> FnRMunicipioD(ClsMunicipio OMunicipioD)
        {
            ClsMunicipio OMunicipio = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRMunicipio", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmRIdDepartamento", Convert.ToInt16(OMunicipioD.ObjDepartamento.IdDepartamento));
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsMunicipio> LstMunicipio = new List<ClsMunicipio>();
                while (Dr_D.Read())
                {
                    OMunicipio = new ClsMunicipio();
                    OMunicipio.IdMunicipio = Dr_D[0].ToString();//id_Municipio
                    OMunicipio.Municipio = Dr_D[1].ToString();  //Municipio                  
                    LstMunicipio.Add(OMunicipio);
                }
                return LstMunicipio;
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
