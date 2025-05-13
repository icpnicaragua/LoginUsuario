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
    public class ClsSucursalD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public List<ClsSucursal> FnRSucursalD()
        {
            ClsSucursal OSucursal = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRSucursal", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsSucursal> LstSucursal = new List<ClsSucursal>();
                while (Dr_D.Read())
                {
                    OSucursal = new ClsSucursal();
                    OSucursal.IdSucursal = Dr_D[0].ToString();//id_Sucursal
                    OSucursal.Sucursal = Dr_D[1].ToString();  //Sucursal     
                    LstSucursal.Add(OSucursal);
                }
                return LstSucursal;
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
