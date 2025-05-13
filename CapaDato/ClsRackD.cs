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
    public class ClsRackD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCRackD(ClsRack ORack)
        {
            bool CreateORack = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCRack", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCRack", ORack.Rack);
                Cmd_D.Parameters.AddWithValue("prmCIdSeccion", Convert.ToInt16(ORack.ObjSeccion.IdSeccion));
                ObjConexion.Abrircon();
                int FilasRack = Cmd_D.ExecuteNonQuery();
                if (FilasRack > 0) CreateORack = true;

                return CreateORack;
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

        public List<ClsRack> FnRRackD()
        {
            ClsRack ORack = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRRack", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsRack> LstRack = new List<ClsRack>();
                while (Dr_D.Read())
                {
                    ORack = new ClsRack();
                    ORack.IdRack = Dr_D[0].ToString();//id_Rack
                    ORack.Rack = Dr_D[1].ToString();  //Rack
                    ORack.ObjSeccion.IdSeccion = Dr_D[2].ToString();//idfamilia
                    ORack.ObjSeccion.Seccion = Dr_D[3].ToString();//familia 
                    LstRack.Add(ORack);
                }
                return LstRack;
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

        public bool FnURackD(ClsRack ORack)
        {
            bool UpdateRack = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spURack", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdRack", Convert.ToInt16(ORack.IdRack));
                Cmd_D.Parameters.AddWithValue("prmURack", ORack.Rack);
                Cmd_D.Parameters.AddWithValue("prmUIdSeccion", Convert.ToInt16(ORack.ObjSeccion.IdSeccion));

                ObjConexion.Abrircon();
                int FilasURack = Cmd_D.ExecuteNonQuery();
                if (FilasURack > 0) UpdateRack = true;

                return UpdateRack;
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

        public bool FnDRackD(ClsRack ORack)
        {
            bool DeleteRack = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDRack", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdRack", Convert.ToInt16(ORack.IdRack));

                ObjConexion.Abrircon();
                int FilasDRack = Cmd_D.ExecuteNonQuery();
                if (FilasDRack > 0) DeleteRack = true;

                return DeleteRack;
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

        public bool FnERackD(ClsRack ORack)
        {
            bool ExisteRack = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spERack", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdRack", Convert.ToInt16(ORack.IdRack));
                Cmd_D.Parameters.AddWithValue("prmERack", ORack.Rack);
                Cmd_D.Parameters.AddWithValue("prmEIdSeccion", Convert.ToInt16(ORack.ObjSeccion.IdSeccion));

                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteRack = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteRack;
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
