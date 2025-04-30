using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;
using MySql.Data.MySqlClient;

namespace CapaDato
{
    public class ClsGarantiaD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCGarantiaD(ClsGarantia OGarantia)
        {
            bool CreateOGarantia = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCGarantia", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCPlazo_Dias", OGarantia.Garantia);

                ObjConexion.Abrircon();
                int FilasCRegime = Cmd_D.ExecuteNonQuery();
                if (FilasCRegime > 0) CreateOGarantia = true;

                return CreateOGarantia;
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

        public List<ClsGarantia> FnRGarantiaD()
        {
            ClsGarantia OGarantia = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRGarantia", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsGarantia> LstGarantia = new List<ClsGarantia>();
                while (Dr_D.Read())
                {
                    OGarantia = new ClsGarantia();
                    OGarantia.IdGarantia = Dr_D[0].ToString();//id_Garantia
                    OGarantia.Garantia = Dr_D[1].ToString();  //Garantia     
                    LstGarantia.Add(OGarantia);
                }
                return LstGarantia;
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

        public bool FnUGarantiaD(ClsGarantia OGarantia)
        {
            bool UpdateGarantia = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUGarantia", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdGarantia", Convert.ToInt16(OGarantia.IdGarantia));
                Cmd_D.Parameters.AddWithValue("prmUPlazo_Dias", Convert.ToInt16(OGarantia.Garantia));

                ObjConexion.Abrircon();
                int FilasUGarantia = Cmd_D.ExecuteNonQuery();
                if (FilasUGarantia > 0) UpdateGarantia = true;

                return UpdateGarantia;
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

        public bool FnDGarantiaD(ClsGarantia OGarantia)
        {
            bool DeleteGarantia = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDGarantia", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdGarantia", Convert.ToInt16(OGarantia.IdGarantia));

                ObjConexion.Abrircon();
                int FilasDGarantia = Cmd_D.ExecuteNonQuery();
                if (FilasDGarantia > 0) DeleteGarantia = true;

                return DeleteGarantia;
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

        public bool FnEGarantiaD(ClsGarantia OGarantia)
        {
            bool ExisteGarantia = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spEGarantia", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdGarantia", Convert.ToInt16(OGarantia.IdGarantia));
                Cmd_D.Parameters.AddWithValue("prmEPlazo_Dias", Convert.ToInt16(OGarantia.Garantia));
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteGarantia = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteGarantia;
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
