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
    public class ClsPromoD
    {

        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCPromoD(ClsPromo OPromo)
        {
            bool CreateOPromo = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCPromo", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCPromo", OPromo.Promo);

                ObjConexion.Abrircon();
                int FilasCRegime = Cmd_D.ExecuteNonQuery();
                if (FilasCRegime > 0) CreateOPromo = true;

                return CreateOPromo;
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

        public List<ClsPromo> FnRPromoD()
        {
            ClsPromo OPromo = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRPromo", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsPromo> LstPromo = new List<ClsPromo>();
                while (Dr_D.Read())
                {
                    OPromo = new ClsPromo();
                    OPromo.IdPromo = Dr_D[0].ToString();//id_Promo
                    OPromo.Promo = Dr_D[1].ToString();  //Promo     
                    LstPromo.Add(OPromo);
                }
                return LstPromo;
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

        public bool FnUPromoD(ClsPromo OPromo)
        {
            bool UpdatePromo = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUPromo", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdPromo", Convert.ToInt16(OPromo.IdPromo));
                Cmd_D.Parameters.AddWithValue("prmUPromo", OPromo.Promo);

                ObjConexion.Abrircon();
                int FilasUPromo = Cmd_D.ExecuteNonQuery();
                if (FilasUPromo > 0) UpdatePromo = true;

                return UpdatePromo;
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

        public bool FnDPromoD(ClsPromo OPromo)
        {
            bool DeletePromo = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDPromo", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdPromo", Convert.ToInt16(OPromo.IdPromo));

                ObjConexion.Abrircon();
                int FilasDPromo = Cmd_D.ExecuteNonQuery();
                if (FilasDPromo > 0) DeletePromo = true;

                return DeletePromo;
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

        public bool FnEPromoD(ClsPromo OPromo)
        {
            bool ExistePromo = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spEPromo", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdPromo", Convert.ToInt16(OPromo.IdPromo));
                Cmd_D.Parameters.AddWithValue("prmEPromo", OPromo.Promo);
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExistePromo = Convert.ToBoolean(Dr_D[0]);
                }
                return ExistePromo;
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
