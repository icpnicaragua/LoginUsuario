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
    public class ClsEmpleadoD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCEmpleadoD(ClsEmpleado OEmpleado)
        {
            bool CreateOEmpleado = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCEmpleado", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCIdArea",Convert.ToInt32( OEmpleado.ObjArea.IdArea));
                Cmd_D.Parameters.AddWithValue("prmCIdPersona", Convert.ToInt32(OEmpleado.ObjPersona.IdPersona));
                Cmd_D.Parameters.AddWithValue("prmCIdJefe", Convert.ToInt32(OEmpleado.ObjJefe.IdPersona));

                ObjConexion.Abrircon();
                int FilasEmpleado = Cmd_D.ExecuteNonQuery();
                if (FilasEmpleado > 0) CreateOEmpleado = true;

                return CreateOEmpleado;
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

        public List<ClsEmpleado> FnREmpleadoD()
        {
            ClsEmpleado OEmpleado = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spREmpleado", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsEmpleado> LstEmpleado = new List<ClsEmpleado>();
                while (Dr_D.Read())
                {
                    OEmpleado = new ClsEmpleado();
                    OEmpleado.IdEmpleado = Dr_D[0].ToString();//id_Empleado
                    OEmpleado.ObjArea.IdArea = Dr_D[1].ToString();  //idarea
                    OEmpleado.ObjArea.Area = Dr_D[2].ToString();//area
                    OEmpleado.ObjPersona.IdPersona = Dr_D[3].ToString();//
                    OEmpleado.ObjPersona.Nombre1 = Dr_D[4].ToString();
                    OEmpleado.ObjPersona.Apellido1 = Dr_D[5].ToString();
                    OEmpleado.ObjJefe.IdPersona= Dr_D[6].ToString();
                    OEmpleado.ObjJefe.Nombre1= Dr_D[7].ToString();
                    OEmpleado.ObjJefe.Apellido1= Dr_D[8].ToString();

                    LstEmpleado.Add(OEmpleado);
                }
                return LstEmpleado;
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

        public bool FnUEmpleadoD(ClsEmpleado OEmpleado)
        {
            bool UpdateEmpleado = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUEmpleado", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdEmpleado", Convert.ToInt16(OEmpleado.IdEmpleado));
                Cmd_D.Parameters.AddWithValue("prmUIdArea", Convert.ToInt16(OEmpleado.ObjArea.IdArea));
             
                Cmd_D.Parameters.AddWithValue("prmUIdJefe", Convert.ToInt16(OEmpleado.ObjJefe.IdPersona));
                                    
                ObjConexion.Abrircon();
                int FilasUEmpleado = Cmd_D.ExecuteNonQuery();
                if (FilasUEmpleado > 0) UpdateEmpleado = true;

                return UpdateEmpleado;
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

        public bool FnDEmpleadoD(ClsEmpleado OEmpleado)
        {
            bool DeleteEmpleado = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDEmpleado", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdEmpleado", Convert.ToInt16(OEmpleado.IdEmpleado));

                ObjConexion.Abrircon();
                int FilasDEmpleado = Cmd_D.ExecuteNonQuery();
                if (FilasDEmpleado > 0) DeleteEmpleado = true;

                return DeleteEmpleado;
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

        public bool FnEEmpleadoD(ClsEmpleado OEmpleado)
        {
            bool ExisteEmpleado = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spEEmpleado", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdEmpleado", Convert.ToInt16(OEmpleado.IdEmpleado));
                Cmd_D.Parameters.AddWithValue("prmEIdPersona", OEmpleado.ObjPersona.IdPersona);
                Cmd_D.Parameters.AddWithValue("prmEIdArea", OEmpleado.ObjArea.IdArea);
                
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteEmpleado = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteEmpleado;
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
                //`spEEmpleadoPersona`(in prmEEmpleadoIdPersona int)
        public bool FnEEmpleadoPersonaD(ClsEmpleado OEmpleado)
        {
            bool ExisteEmpleado = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spEEmpleadoPersona", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEEmpleadoIdPersona", Convert.ToInt16(OEmpleado.ObjPersona.IdPersona));
               
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteEmpleado = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteEmpleado;
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
