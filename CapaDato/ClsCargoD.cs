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
    public class ClsCargoD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCCargoD(ClsCargo OCargo)
        {
            bool CreateOCargo = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCCargo", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCCargo", OCargo.Cargo);

                ObjConexion.Abrircon();
                int FilasCargo = Cmd_D.ExecuteNonQuery();
                if (FilasCargo > 0) CreateOCargo = true;

                return CreateOCargo;
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

        public List<ClsCargo> FnRCargoD()
        {
            ClsCargo OCargo = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRCargo", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsCargo> LstCargo = new List<ClsCargo>();
                while (Dr_D.Read())
                {
                    OCargo = new ClsCargo();
                    OCargo.IdCargo = Dr_D[0].ToString();
                    OCargo.Cargo = Dr_D[1].ToString();    
                    LstCargo.Add(OCargo);
                }
                return LstCargo;
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

        public bool FnUCargoD(ClsCargo OCargo)
        {
            bool UpdateCargo = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUCargo", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdCargo", Convert.ToInt16(OCargo.IdCargo));
                Cmd_D.Parameters.AddWithValue("prmUCargo", OCargo.Cargo);

                ObjConexion.Abrircon();
                int FilasUCargo = Cmd_D.ExecuteNonQuery();
                if (FilasUCargo > 0) UpdateCargo = true;

                return UpdateCargo;
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

        public bool FnDCargoD(ClsCargo OCargo)
        {
            bool DeleteCargo = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDCargo", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdCargo", Convert.ToInt16(OCargo.IdCargo));

                ObjConexion.Abrircon();
                int FilasDCargo = Cmd_D.ExecuteNonQuery();
                if (FilasDCargo > 0) DeleteCargo = true;

                return DeleteCargo;
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

        public bool FnECargoD(ClsCargo OCargo)
        {
            bool ExisteCargo = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spECargo", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdCargo", Convert.ToInt16(OCargo.IdCargo));
                Cmd_D.Parameters.AddWithValue("prmECargo", OCargo.Cargo);
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteCargo = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteCargo;
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
