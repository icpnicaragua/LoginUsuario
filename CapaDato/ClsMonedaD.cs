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
    public class ClsMonedaD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D;
        private MySqlCommand Cmd_D = null;

        public List<ClsMoneda> FnRMonedaD()
        {
            ClsMoneda OMoneda = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRMoneda", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsMoneda> LstMoneda = new List<ClsMoneda>();
                while (Dr_D.Read())
                {
                    OMoneda = new ClsMoneda();
                    OMoneda.IdMoneda = Dr_D[0].ToString();
                    OMoneda.Moneda = Dr_D[1].ToString();    
                    OMoneda.Simbolo = Dr_D[2].ToString();    
                    LstMoneda.Add(OMoneda);
                }
                return LstMoneda;
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
