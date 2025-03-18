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
    public class ClsTipoDireccionD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCTipoDireccionD(ClsTipoDireccion OTipoDireccion)
        {
            bool CreateTipoDireccion = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCTipoDireccion", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmTipoDireccion", OTipoDireccion.TipoDireccion);

                ObjConexion.Abrircon();
                int FilasCTipoDireccion = Cmd_D.ExecuteNonQuery();
                if (FilasCTipoDireccion > 0) CreateTipoDireccion = true;

                return CreateTipoDireccion;
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

        public List<ClsTipoDireccion> FnRTipoDireccionD()
        {
            ClsTipoDireccion OTipoDireccion = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRTipoDireccion", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsTipoDireccion> LstTipoDireccion = new List<ClsTipoDireccion>();
                while (Dr_D.Read())
                {
                    OTipoDireccion = new ClsTipoDireccion();
                    OTipoDireccion.IdTipoDireccion= Dr_D[0].ToString();//id_tipodire
                    OTipoDireccion.TipoDireccion = Dr_D[1].ToString();  //tipodir    
                    LstTipoDireccion.Add(OTipoDireccion);
                }
                return LstTipoDireccion;
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

        public bool FnUTipoDireccionD(ClsTipoDireccion OTipoDireccion)
        {
            bool UpdateTipoDireccion = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUTipoDireccion", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdTipoDireccion", Convert.ToInt16(OTipoDireccion.IdTipoDireccion));
                Cmd_D.Parameters.AddWithValue("prmUTipoDireccion", OTipoDireccion.TipoDireccion);

                ObjConexion.Abrircon();
                int FilasUTipoDireccion = Cmd_D.ExecuteNonQuery();
                if (FilasUTipoDireccion > 0) UpdateTipoDireccion = true;

                return UpdateTipoDireccion;
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

        public bool FnDTipoDireccionD(ClsTipoDireccion OTipoDireccion)
        {
            bool DeleteTipoDireccion = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDTipoDireccion", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmIdTipoDireccion", Convert.ToInt16(OTipoDireccion.IdTipoDireccion));

                ObjConexion.Abrircon();
                int FilasDTipoDireccion = Cmd_D.ExecuteNonQuery();
                if (FilasDTipoDireccion > 0) DeleteTipoDireccion = true;

                return DeleteTipoDireccion;
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

        public bool FnETipoDireccionD(ClsTipoDireccion OTipoDireccion)
        {
            bool ExisteTipoDireccion = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spETipoDireccion", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdTipoDireccion", Convert.ToInt16(OTipoDireccion.IdTipoDireccion));
                Cmd_D.Parameters.AddWithValue("prmETipoDireccion", OTipoDireccion.TipoDireccion);
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteTipoDireccion = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteTipoDireccion;
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
