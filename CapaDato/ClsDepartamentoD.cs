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
    public class ClsDepartamentoD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado


        public List<ClsDepartamento> FnRDepartamentoD()
        {
            ClsDepartamento ODepartamento = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRDepartamento", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsDepartamento> LstDepartamento = new List<ClsDepartamento>();
                while (Dr_D.Read())
                {
                    ODepartamento = new ClsDepartamento();
                    ODepartamento.IdDepartamento = Dr_D[0].ToString();//id_Departamento
                    ODepartamento.Departamento = Dr_D[1].ToString();  //Departamento
                    LstDepartamento.Add(ODepartamento);
                }
                return LstDepartamento;
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
