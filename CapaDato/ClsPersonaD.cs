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
    public class ClsPersonaD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCPersonaD(ClsPersona OPersona)
        {
            bool CreateOPersona = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCPersona", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCNom1", OPersona.Nombre1);
                Cmd_D.Parameters.AddWithValue("prmCNom2", OPersona.Nombre2);
                Cmd_D.Parameters.AddWithValue("prmCApe1", OPersona.Apellido1);
                Cmd_D.Parameters.AddWithValue("prmCApe2", OPersona.Apellido2);
                Cmd_D.Parameters.AddWithValue("prmCIdGenero", Convert.ToInt16(OPersona.ObjGenero.IdGenero));
                ObjConexion.Abrircon();
                int FilasPersona = Cmd_D.ExecuteNonQuery();
                if (FilasPersona > 0) CreateOPersona = true;

                return CreateOPersona;
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

        public List<ClsPersona> FnRPersonaD()
        {
            ClsPersona OPersona = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRPersona", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsPersona> LstPersona = new List<ClsPersona>();
                while (Dr_D.Read())
                {
                    OPersona = new ClsPersona();
                    OPersona.IdPersona = Dr_D[0].ToString();//id_Persona
                    OPersona.Nombre1 = Dr_D[1].ToString();  //nom1
                    OPersona.Nombre2 = Dr_D[2].ToString();  //nom2
                    OPersona.Apellido1 = Dr_D[3].ToString();  //Ape1
                    OPersona.Apellido2 = Dr_D[4].ToString();  //Ape2
                    OPersona.ObjGenero.IdGenero = Dr_D[5].ToString();//IdGenero
                    OPersona.ObjGenero.Genero = Dr_D[6].ToString();//Genero 
                    LstPersona.Add(OPersona);
                }
                return LstPersona;
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

        public bool FnUPersonaD(ClsPersona OPersona)
        {
            bool UpdatePersona = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUPersona", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdPersona", Convert.ToInt16(OPersona.IdPersona));
                Cmd_D.Parameters.AddWithValue("prmUNom1", OPersona.Nombre1);
                Cmd_D.Parameters.AddWithValue("prmUNom2", OPersona.Nombre2);
                Cmd_D.Parameters.AddWithValue("prmUApe1", OPersona.Apellido1);
                Cmd_D.Parameters.AddWithValue("prmUApe2", OPersona.Apellido2);
                Cmd_D.Parameters.AddWithValue("prmUIdGenero", Convert.ToInt16(OPersona.ObjGenero.IdGenero));

                ObjConexion.Abrircon();
                int FilasUPersona = Cmd_D.ExecuteNonQuery();
                if (FilasUPersona > 0) UpdatePersona = true;

                return UpdatePersona;
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

        public bool FnDPersonaD(ClsPersona OPersona)
        {
            bool DeletePersona = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDPersona", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdPersona", Convert.ToInt16(OPersona.IdPersona));

                ObjConexion.Abrircon();
                int FilasDPersona = Cmd_D.ExecuteNonQuery();
                if (FilasDPersona > 0) DeletePersona = true;

                return DeletePersona;
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

        public bool FnEPersonaD(ClsPersona OPersona)
        {
            bool ExistePersona = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spEPersona", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdPersona", Convert.ToInt16(OPersona.IdPersona));
                Cmd_D.Parameters.AddWithValue("prmENom1", OPersona.Nombre1);
                Cmd_D.Parameters.AddWithValue("prmENom2", OPersona.Nombre2);
                Cmd_D.Parameters.AddWithValue("prmEApe1", OPersona.Apellido1);
                Cmd_D.Parameters.AddWithValue("prmEApe2", OPersona.Apellido2);
                Cmd_D.Parameters.AddWithValue("prmEIdGenero", Convert.ToInt16(OPersona.ObjGenero.IdGenero));

                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExistePersona = Convert.ToBoolean(Dr_D[0]);
                }
                return ExistePersona;
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
