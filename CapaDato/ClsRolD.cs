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
    public class ClsRolD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCRolD(ClsRol ORol)
        {
            bool CreateRol = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCRol", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmRol", ORol.Rol);

                ObjConexion.Abrircon();
                int FilasCRol = Cmd_D.ExecuteNonQuery();
                if (FilasCRol > 0) CreateRol = true;

                return CreateRol;
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

        public List<ClsRol> FnRRolD()
        {
            ClsRol ObjRol = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRRol", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsRol> LstRol = new List<ClsRol>();
                while (Dr_D.Read())
                {
                    ObjRol = new ClsRol();
                    ObjRol.Id_rol = Dr_D[0].ToString();
                    ObjRol.Rol = Dr_D[1].ToString();
                    ObjRol.Fecha_inicioRol = Dr_D[3].ToString();
                    LstRol.Add(ObjRol);
                }
                return LstRol;
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

        public bool FnURolD(ClsRol ORol)
        {
            bool UpdateRol = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spURol", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmIdRol", Convert.ToInt16(ORol.Id_rol));
                Cmd_D.Parameters.AddWithValue("prmRol", ORol.Rol);

                ObjConexion.Abrircon();
                int FilasURol = Cmd_D.ExecuteNonQuery();
                if (FilasURol > 0) UpdateRol = true;

                return UpdateRol;
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

        public bool FnDRolD(ClsRol ORol)
        {
            bool DeleteRol = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDRol", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmIdRol", Convert.ToInt16(ORol.Id_rol));
              
                ObjConexion.Abrircon();
                int FilasDRol = Cmd_D.ExecuteNonQuery();
                if (FilasDRol > 0) DeleteRol = true;

                return DeleteRol;
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

        public bool FnERolD(ClsRol ORol)
        {
            bool ExisteRol = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spERol", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmIdRol", Convert.ToInt16(ORol.Id_rol));
                Cmd_D.Parameters.AddWithValue("prmRol", ORol.Rol);

                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteRol = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteRol;
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

        public bool FnNRolD(ClsRol ORol)
        {
            bool CloneRol = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spNRol", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmIdRol", Convert.ToInt16(ORol.Id_rol));
          
                ObjConexion.Abrircon();
                int FilasNRol = Cmd_D.ExecuteNonQuery();
                if (FilasNRol > 0) CloneRol = true;

                return CloneRol;
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

    }
}
