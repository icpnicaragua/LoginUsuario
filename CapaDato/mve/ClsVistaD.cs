using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;
using System.Data;
using System.Data.SqlClient;


namespace CapaDato.mve
{
    public class ClsVistaD
    {
        private ClsConexion ObjConexion = null;
        private SqlDataReader Dr_D; //para leer datos de latabla 
        private SqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public List<ClsVista> FnRVist()
        {
            ClsVista OVist = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new SqlCommand("spRVist", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsVista> LstVist = new List<ClsVista>();
                while (Dr_D.Read())
                {
                    OVist = new ClsVista();
                    OVist.Idvista = Dr_D[0].ToString();//idvista
                    OVist.Vista = Dr_D[1].ToString();
                    OVist.Fechainiciovista = Dr_D[2].ToString();
                    OVist.ObjModulo.Modulo = Dr_D[3].ToString();
                    OVist.Idaspvista = Dr_D[4].ToString();
                    LstVist.Add(OVist);
                }
                return LstVist;

            }
            catch(Exception ex)
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
