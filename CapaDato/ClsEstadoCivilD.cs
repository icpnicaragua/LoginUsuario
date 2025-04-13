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
    public class ClsEstadoCivilD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCEstadoCivilD(ClsEstadoCivil OEstadoCivil)
        {
            bool CreateOEstadoCivil = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCEstadoCivil", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCEstadoCivil", OEstadoCivil.EstadoCivil);

                ObjConexion.Abrircon();
                int FilasCRegime = Cmd_D.ExecuteNonQuery();
                if (FilasCRegime > 0) CreateOEstadoCivil = true;

                return CreateOEstadoCivil;
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

        public List<ClsEstadoCivil> FnREstadoCivilD()
        {
            ClsEstadoCivil OEstadoCivil = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spREstadoCivil", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsEstadoCivil> LstEstadoCivil = new List<ClsEstadoCivil>();
                while (Dr_D.Read())
                {
                    OEstadoCivil = new ClsEstadoCivil();
                    OEstadoCivil.IdEstadoCivil = Dr_D[0].ToString();//id_EstadoCivil
                    OEstadoCivil.EstadoCivil = Dr_D[1].ToString();  //EstadoCivil     
                    LstEstadoCivil.Add(OEstadoCivil);
                }
                return LstEstadoCivil;
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

        public bool FnUEstadoCivilD(ClsEstadoCivil OEstadoCivil)
        {
            bool UpdateEstadoCivil = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUEstadoCivil", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdEstadoCivil", Convert.ToInt16(OEstadoCivil.IdEstadoCivil));
                Cmd_D.Parameters.AddWithValue("prmUEstadoCivil", OEstadoCivil.EstadoCivil);

                ObjConexion.Abrircon();
                int FilasUEstadoCivil = Cmd_D.ExecuteNonQuery();
                if (FilasUEstadoCivil > 0) UpdateEstadoCivil = true;

                return UpdateEstadoCivil;
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

        public bool FnDEstadoCivilD(ClsEstadoCivil OEstadoCivil)
        {
            bool DeleteEstadoCivil = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDEstadoCivil", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdEstadoCivil", Convert.ToInt16(OEstadoCivil.IdEstadoCivil));

                ObjConexion.Abrircon();
                int FilasDEstadoCivil = Cmd_D.ExecuteNonQuery();
                if (FilasDEstadoCivil > 0) DeleteEstadoCivil = true;

                return DeleteEstadoCivil;
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

        public bool FnEEstadoCivilD(ClsEstadoCivil OEstadoCivil)
        {
            bool ExisteEstadoCivil = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spEEstadoCivil", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdEstadoCivil", Convert.ToInt16(OEstadoCivil.IdEstadoCivil));
                Cmd_D.Parameters.AddWithValue("prmEEstadoCivil", OEstadoCivil.EstadoCivil);
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteEstadoCivil = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteEstadoCivil;
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
