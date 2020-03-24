using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;
using MySql.Data.MySqlClient;
using System.Data;

namespace CapaDato.mve
{
   public class ClsModuloD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCModuloD(ClsModulo OModulo)
        {
            bool CreateModulo = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCModulo", ObjConexion.Con_D);// dos tipos de control no se pueden llamar igual dentro de una vista
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmModulo", OModulo.Modulo);
                Cmd_D.Parameters.AddWithValue("prmIdAspModulo", OModulo.Idaspmodulo);

                ObjConexion.Abrircon();
                int FilasCModulo = Cmd_D.ExecuteNonQuery();
                if (FilasCModulo > 0) CreateModulo = true;

                return CreateModulo;
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
        public List<ClsModulo> FnRModuloD()
        {
            ClsModulo OMod = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRMod", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsModulo> LstMod = new List<ClsModulo>();
                while (Dr_D.Read())
                {
                    OMod = new ClsModulo();
                    OMod.IdModulo = Dr_D[0].ToString();//id_modulo
                    OMod.Modulo = Dr_D[1].ToString();  //modulo
                    OMod.Idaspmodulo = Dr_D[2].ToString();  //id asp
                    OMod.Fechainciomodulo = Dr_D[3].ToString();  //decha
                    LstMod.Add(OMod);
                }
                return LstMod;
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
        public bool FnUModuloD(ClsModulo OModulo)
        {
            bool UpdateModulo = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUModulo", ObjConexion.Con_D);// dos tipos de control no se pueden llamar igual dentro de una vista
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmIdModulo", Convert.ToInt16(OModulo.IdModulo));
                Cmd_D.Parameters.AddWithValue("prmModulo", OModulo.Modulo);
                Cmd_D.Parameters.AddWithValue("prmIdAspmodulo", OModulo.Idaspmodulo);

                ObjConexion.Abrircon();
                int FilasUModulo = Cmd_D.ExecuteNonQuery();
                if (FilasUModulo > 0) UpdateModulo = true;

                return UpdateModulo;
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
        public bool FnDModuloD(ClsModulo OModulo)
        {
            bool DeleteModulo = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDModulo", ObjConexion.Con_D);// dos tipos de control no se pueden llamar igual dentro de una vista
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmIdModulo", Convert.ToInt16(OModulo.IdModulo));

                ObjConexion.Abrircon();
                int FilasDModulo = Cmd_D.ExecuteNonQuery();
                if (FilasDModulo > 0) DeleteModulo = true;

                return DeleteModulo;
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
        public bool FnEModuloD(ClsModulo OModulo)
        {
            bool ExisteModulo = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spEModulo", ObjConexion.Con_D);// dos tipos de control no se pueden llamar igual dentro de una vista
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmIdModulo", Convert.ToInt16(OModulo.IdModulo));
                Cmd_D.Parameters.AddWithValue("prmModulo", OModulo.Modulo);
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteModulo = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteModulo;
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
        public bool FnEModuloAspD(ClsModulo OModulo)
        {
            bool ExisteModuloAsp = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spEModuloAsp", ObjConexion.Con_D);// dos tipos de control no se pueden llamar igual dentro de una vista
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmIdModulo", Convert.ToInt16(OModulo.IdModulo));
                Cmd_D.Parameters.AddWithValue("prmModuloAsp", OModulo.Idaspmodulo);
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteModuloAsp = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteModuloAsp;
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
