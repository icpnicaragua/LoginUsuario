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
    public class ClsAreaD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCAreaD(ClsArea OArea)
        {
            bool CreateOArea = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCArea", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCArea", OArea.Area);

                ObjConexion.Abrircon();
                int FilasCRegime = Cmd_D.ExecuteNonQuery();
                if (FilasCRegime > 0) CreateOArea = true;

                return CreateOArea;
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

        public List<ClsArea> FnRAreaD()
        {
            ClsArea OArea = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRArea", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsArea> LstArea = new List<ClsArea>();
                while (Dr_D.Read())
                {
                    OArea = new ClsArea();
                    OArea.IdArea = Dr_D[0].ToString();//id_Area
                    OArea.Area = Dr_D[1].ToString();  //Area     
                    LstArea.Add(OArea);
                }
                return LstArea;
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

        public bool FnUAreaD(ClsArea OArea)
        {
            bool UpdateArea = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUArea", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdArea", Convert.ToInt16(OArea.IdArea));
                Cmd_D.Parameters.AddWithValue("prmUArea", OArea.Area);

                ObjConexion.Abrircon();
                int FilasUArea = Cmd_D.ExecuteNonQuery();
                if (FilasUArea > 0) UpdateArea = true;

                return UpdateArea;
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

        public bool FnDAreaD(ClsArea OArea)
        {
            bool DeleteArea = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDArea", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdArea", Convert.ToInt16(OArea.IdArea));

                ObjConexion.Abrircon();
                int FilasDArea = Cmd_D.ExecuteNonQuery();
                if (FilasDArea > 0) DeleteArea = true;

                return DeleteArea;
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

        public bool FnEAreaD(ClsArea OArea)
        {
            bool ExisteArea = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spEArea", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdArea", Convert.ToInt16(OArea.IdArea));
                Cmd_D.Parameters.AddWithValue("prmEArea", OArea.Area);
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteArea = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteArea;
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
