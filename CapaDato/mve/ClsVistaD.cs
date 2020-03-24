using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;
using System.Data;
using MySql.Data.MySqlClient;


namespace CapaDato.mve
{
    public class ClsVistaD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public List<ClsVista> FnRVist()
        {
            ClsVista OVist = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRVist", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsVista> LstVist = new List<ClsVista>();
                while (Dr_D.Read())
                {
                    OVist = new ClsVista();
                    OVist.Idvista = Dr_D[0].ToString();//idvista
                    OVist.Vista = Dr_D[1].ToString();
                    OVist.Fechainiciovista = Dr_D[2].ToString();
                    OVist.ObjModulo.Modulo = Dr_D[3].ToString();
                    OVist.Idaspvista = Dr_D[4].ToString();
                    OVist.ObjModulo.IdModulo = Dr_D[5].ToString();
                    LstVist.Add(OVist);
                }
                return LstVist;

            }
            catch(Exception ex)
            {
                return null;
                throw ex;
            }
            finally
            {
                ObjConexion.Cerrarcon();
            }
            
        }

        public bool FnEVistaD(ClsVista OVista)
        {
            bool ExisteVista = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spEVista", ObjConexion.Con_D);// dos tipos de control no se pueden llamar igual dentro de una vista
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmIdVista", Convert.ToInt16(OVista.Idvista));
                Cmd_D.Parameters.AddWithValue("prmIdModulo", Convert.ToInt16(OVista.ObjModulo.IdModulo));
                Cmd_D.Parameters.AddWithValue("prmVista", OVista.Vista);
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteVista = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteVista;
            }
            catch(Exception ex)
            {
                return false;
                throw ex;
            }
            finally
            {
                ObjConexion.Cerrarcon();
            }
        }

        public bool FnEVistaaspD(ClsVista OVista)
        {
            bool ExisteVista = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spEVistaAsp", ObjConexion.Con_D);// dos tipos de control no se pueden llamar igual dentro de una vista
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmIdVista", Convert.ToInt16(OVista.Idvista));
                Cmd_D.Parameters.AddWithValue("prmIdModulo", Convert.ToInt16(OVista.ObjModulo.IdModulo));
                Cmd_D.Parameters.AddWithValue("prmVistaAsp", OVista.Idaspvista);
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteVista = Convert.ToBoolean(Dr_D[0]);
                  
                }
                return ExisteVista;
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

        public bool FnDVistaD(ClsVista OVista)
        {
            bool DeleteVista = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDVista", ObjConexion.Con_D);// dos tipos de control no se pueden llamar igual dentro de una vista
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmIdVista", Convert.ToInt16(OVista.Idvista));
                
                ObjConexion.Abrircon();
                int FilasDvista = Cmd_D.ExecuteNonQuery();
                if (FilasDvista > 0) DeleteVista = true;
               
                return DeleteVista;
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

        public bool FnUVistaD(ClsVista OVista)
        {
            bool UpdateVista = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUVista", ObjConexion.Con_D);// dos tipos de control no se pueden llamar igual dentro de una vista
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmIdVista", Convert.ToInt16(OVista.Idvista));
                Cmd_D.Parameters.AddWithValue("prmVista", OVista.Vista);
                Cmd_D.Parameters.AddWithValue("prmIdAspVista", OVista.Idaspvista);
                Cmd_D.Parameters.AddWithValue("prmIdModulo", Convert.ToInt16(OVista.ObjModulo.IdModulo));

                ObjConexion.Abrircon();
                int FilasUvista = Cmd_D.ExecuteNonQuery();
                if (FilasUvista > 0) UpdateVista = true;

                return UpdateVista;
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

        public bool FnCVistaD(ClsVista OVista)
        {
            bool CreateVista = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCVista", ObjConexion.Con_D);// dos tipos de control no se pueden llamar igual dentro de una vista
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmVista", OVista.Vista);
                Cmd_D.Parameters.AddWithValue("prmIdAspVista", OVista.Idaspvista);
                Cmd_D.Parameters.AddWithValue("prmIdModulo", Convert.ToInt16(OVista.ObjModulo.IdModulo));

                ObjConexion.Abrircon();
                int FilasCVista = Cmd_D.ExecuteNonQuery();
                if (FilasCVista > 0) CreateVista = true;

                return CreateVista;
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
