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
    public class ClsEntradaD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCEntradaD(ClsEntrada OEntrada)
        {
            bool CreateOEntrada = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCEntrada", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCEntrada", OEntrada.Entrada);

                ObjConexion.Abrircon();
                int FilasCRegime = Cmd_D.ExecuteNonQuery();
                if (FilasCRegime > 0) CreateOEntrada = true;

                return CreateOEntrada;
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

        public List<ClsEntrada> FnREntradaD()
        {
            ClsEntrada OEntrada = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spREntrada", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsEntrada> LstEntrada = new List<ClsEntrada>();
                while (Dr_D.Read())
                {
                    OEntrada = new ClsEntrada();
                    OEntrada.IdEntrada = Dr_D[0].ToString();//id_Entrada
                    OEntrada.Entrada = Dr_D[1].ToString();  //Entrada     
                    LstEntrada.Add(OEntrada);
                }
                return LstEntrada;
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

        public bool FnUEntradaD(ClsEntrada OEntrada)
        {
            bool UpdateEntrada = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUEntrada", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdEntrada", Convert.ToInt16(OEntrada.IdEntrada));
                Cmd_D.Parameters.AddWithValue("prmUEntrada", OEntrada.Entrada);

                ObjConexion.Abrircon();
                int FilasUEntrada = Cmd_D.ExecuteNonQuery();
                if (FilasUEntrada > 0) UpdateEntrada = true;

                return UpdateEntrada;
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

        public bool FnDEntradaD(ClsEntrada OEntrada)
        {
            bool DeleteEntrada = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDEntrada", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdEntrada", Convert.ToInt16(OEntrada.IdEntrada));

                ObjConexion.Abrircon();
                int FilasDEntrada = Cmd_D.ExecuteNonQuery();
                if (FilasDEntrada > 0) DeleteEntrada = true;

                return DeleteEntrada;
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

        public bool FnEEntradaD(ClsEntrada OEntrada)
        {
            bool ExisteEntrada = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spEEntrada", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdEntrada", Convert.ToInt16(OEntrada.IdEntrada));
                Cmd_D.Parameters.AddWithValue("prmEEntrada", OEntrada.Entrada);
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteEntrada = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteEntrada;
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
