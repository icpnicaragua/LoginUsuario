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
    public class ClsRangoPrecioD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCRangoPrecioD(ClsRangoPrecio ORangoPrecio)
        {
            bool CreateORangoPrecio = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCRangoPrecio", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCRangoPrecio", ORangoPrecio.Rango);
                Cmd_D.Parameters.AddWithValue("prmCValor_minimo", Convert.ToInt16(ORangoPrecio.ValorMinimo));

                ObjConexion.Abrircon();
                int FilasCRangoPrecio = Cmd_D.ExecuteNonQuery();
                if (FilasCRangoPrecio > 0) CreateORangoPrecio = true;

                return CreateORangoPrecio;
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
            finally
            {
                ObjConexion.Cerrarcon();
            }
        }

        public List<ClsRangoPrecio> FnRRangoPrecioD()
        {
            ClsRangoPrecio ORangoPrecio = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRRangoPrecio", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsRangoPrecio> LstRangoPrecio = new List<ClsRangoPrecio>();
                while (Dr_D.Read())
                {
                    ORangoPrecio = new ClsRangoPrecio();
                    ORangoPrecio.IdRangoPrecio = Dr_D[0].ToString();//id_RangoPrecio
                    ORangoPrecio.Rango = Dr_D[1].ToString();  //RangoPrecio     
                    ORangoPrecio.ValorMinimo = Dr_D[2].ToString();  //valorminimo 
                    LstRangoPrecio.Add(ORangoPrecio);
                }
                return LstRangoPrecio;
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

        public bool FnURangoPrecioD(ClsRangoPrecio ORangoPrecio)
        {
            bool UpdateRangoPrecio = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spURangoPrecio", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdRangoPrecio", Convert.ToInt16(ORangoPrecio.IdRangoPrecio));
                Cmd_D.Parameters.AddWithValue("prmURangoPrecio", ORangoPrecio.Rango);
                Cmd_D.Parameters.AddWithValue("prmUValorMinimo", Convert.ToInt16(ORangoPrecio.ValorMinimo));
                
                ObjConexion.Abrircon();
                int FilasURangoPrecio = Cmd_D.ExecuteNonQuery();
                if (FilasURangoPrecio > 0) UpdateRangoPrecio = true;

                return UpdateRangoPrecio;
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
            finally
            {
                ObjConexion.Cerrarcon();
            }
        }

        public bool FnDRangoPrecioD(ClsRangoPrecio ORangoPrecio)
        {
            bool DeleteRangoPrecio = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDRangoPrecio", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdRangoPrecio", Convert.ToInt16(ORangoPrecio.IdRangoPrecio));

                ObjConexion.Abrircon();
                int FilasDRangoPrecio = Cmd_D.ExecuteNonQuery();
                if (FilasDRangoPrecio > 0) DeleteRangoPrecio = true;

                return DeleteRangoPrecio;
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
            finally
            {
                ObjConexion.Cerrarcon();
            }
        }

        public bool FnERangoPrecioD(ClsRangoPrecio ORangoPrecio)
        {
            bool ExisteRangoPrecio = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spERangoPrecio", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdRangoPrecio", Convert.ToInt16(ORangoPrecio.IdRangoPrecio));
                Cmd_D.Parameters.AddWithValue("prmERangoPrecio", ORangoPrecio.Rango);
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteRangoPrecio = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteRangoPrecio;
            }
            catch (Exception ex)
            {
                return true;
                throw ex;
            }
            finally
            {
                ObjConexion.Cerrarcon();
            }
        }
    }
}
