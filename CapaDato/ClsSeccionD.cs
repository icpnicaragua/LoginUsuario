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
    public class ClsSeccionD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCSeccionD(ClsSeccion OSeccion)
        {
            bool CreateOSeccion = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCSeccion", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCSeccion", OSeccion.Seccion);
                Cmd_D.Parameters.AddWithValue("prmCIdBodega", Convert.ToInt16(OSeccion.ObjBodega.IdBodega));
                ObjConexion.Abrircon();
                int FilasSeccion = Cmd_D.ExecuteNonQuery();
                if (FilasSeccion > 0) CreateOSeccion = true;

                return CreateOSeccion;
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

        public List<ClsSeccion> FnRSeccionD()
        {
            ClsSeccion OSeccion = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRSeccion", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsSeccion> LstSeccion = new List<ClsSeccion>();
                while (Dr_D.Read())
                {
                    OSeccion = new ClsSeccion();
                    OSeccion.IdSeccion = Dr_D[0].ToString();//id_Seccion
                    OSeccion.Seccion = Dr_D[1].ToString();  //Seccion
                    OSeccion.ObjBodega.IdBodega = Dr_D[2].ToString();//idfamilia
                    OSeccion.ObjBodega.NombreBodega = Dr_D[3].ToString();//familia 
                    LstSeccion.Add(OSeccion);
                }
                return LstSeccion;
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

        public bool FnUSeccionD(ClsSeccion OSeccion)
        {
            bool UpdateSeccion = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUSeccion", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdSeccion", Convert.ToInt16(OSeccion.IdSeccion));
                Cmd_D.Parameters.AddWithValue("prmUSeccion", OSeccion.Seccion);
                Cmd_D.Parameters.AddWithValue("prmUIdBodega", Convert.ToInt16(OSeccion.ObjBodega.IdBodega));

                ObjConexion.Abrircon();
                int FilasUSeccion = Cmd_D.ExecuteNonQuery();
                if (FilasUSeccion > 0) UpdateSeccion = true;

                return UpdateSeccion;
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

        public bool FnDSeccionD(ClsSeccion OSeccion)
        {
            bool DeleteSeccion = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDSeccion", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdSeccion", Convert.ToInt16(OSeccion.IdSeccion));

                ObjConexion.Abrircon();
                int FilasDSeccion = Cmd_D.ExecuteNonQuery();
                if (FilasDSeccion > 0) DeleteSeccion = true;

                return DeleteSeccion;
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

        public bool FnESeccionD(ClsSeccion OSeccion)
        {
            bool ExisteSeccion = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spESeccion", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdSeccion", Convert.ToInt16(OSeccion.IdSeccion));
                Cmd_D.Parameters.AddWithValue("prmESeccion", OSeccion.Seccion);
                Cmd_D.Parameters.AddWithValue("prmEIdBodega", Convert.ToInt16(OSeccion.ObjBodega.IdBodega));

                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteSeccion = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteSeccion;
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
