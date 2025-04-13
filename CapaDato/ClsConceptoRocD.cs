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
    public class ClsConceptoRocD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCConceptoRocD(ClsConceptoRoc OConceptoRoc)
        {
            bool CreateOConceptoRoc = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCConceptoRoc", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCConceptoRoc", OConceptoRoc.ConceptoRoc);

                ObjConexion.Abrircon();
                int FilasCRegime = Cmd_D.ExecuteNonQuery();
                if (FilasCRegime > 0) CreateOConceptoRoc = true;

                return CreateOConceptoRoc;
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

        public List<ClsConceptoRoc> FnRConceptoRocD()
        {
            ClsConceptoRoc OConceptoRoc = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRConceptoRoc", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsConceptoRoc> LstConceptoRoc = new List<ClsConceptoRoc>();
                while (Dr_D.Read())
                {
                    OConceptoRoc = new ClsConceptoRoc();
                    OConceptoRoc.IdConceptoRoc = Dr_D[0].ToString();//id_ConceptoRoc
                    OConceptoRoc.ConceptoRoc = Dr_D[1].ToString();  //ConceptoRoc     
                    LstConceptoRoc.Add(OConceptoRoc);
                }
                return LstConceptoRoc;
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

        public bool FnUConceptoRocD(ClsConceptoRoc OConceptoRoc)
        {
            bool UpdateConceptoRoc = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUConceptoRoc", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdConceptoRoc", Convert.ToInt16(OConceptoRoc.IdConceptoRoc));
                Cmd_D.Parameters.AddWithValue("prmUConceptoRoc", OConceptoRoc.ConceptoRoc);

                ObjConexion.Abrircon();
                int FilasUConceptoRoc = Cmd_D.ExecuteNonQuery();
                if (FilasUConceptoRoc > 0) UpdateConceptoRoc = true;

                return UpdateConceptoRoc;
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

        public bool FnDConceptoRocD(ClsConceptoRoc OConceptoRoc)
        {
            bool DeleteConceptoRoc = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDConceptoRoc", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdConceptoRoc", Convert.ToInt16(OConceptoRoc.IdConceptoRoc));

                ObjConexion.Abrircon();
                int FilasDConceptoRoc = Cmd_D.ExecuteNonQuery();
                if (FilasDConceptoRoc > 0) DeleteConceptoRoc = true;

                return DeleteConceptoRoc;
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

        public bool FnEConceptoRocD(ClsConceptoRoc OConceptoRoc)
        {
            bool ExisteConceptoRoc = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spEConceptoRoc", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdConceptoRoc", Convert.ToInt16(OConceptoRoc.IdConceptoRoc));
                Cmd_D.Parameters.AddWithValue("prmEConceptoRoc", OConceptoRoc.ConceptoRoc);
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteConceptoRoc = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteConceptoRoc;
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
