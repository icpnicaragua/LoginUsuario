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
    public class ClsTipoIdentifiacionD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCTipoIdentificacionD(ClsTipoIdentificacion OTipoIdentifiacion)
        {
            bool CreateTipoIdentifiacion = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCTipoIdentificacion", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmTipoIdentificacion", OTipoIdentifiacion.TipoIdentificacion);

                ObjConexion.Abrircon();
                int FilasCTipoIdentifiacion = Cmd_D.ExecuteNonQuery();
                if (FilasCTipoIdentifiacion > 0) CreateTipoIdentifiacion = true;

                return CreateTipoIdentifiacion;
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

        public List<ClsTipoIdentificacion> FnRTipoIdentifiacionD()
        {
            ClsTipoIdentificacion OTipoIdentifiacion = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRTipoIdentificacion", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsTipoIdentificacion> LstTipoIdentifiacion = new List<ClsTipoIdentificacion>();
                while (Dr_D.Read())
                {
                    OTipoIdentifiacion = new ClsTipoIdentificacion();
                    OTipoIdentifiacion.IdTipoIdentificacion = Dr_D[0].ToString();//id_tipoIdent
                    OTipoIdentifiacion.TipoIdentificacion = Dr_D[1].ToString();  //tipoIden    
                    LstTipoIdentifiacion.Add(OTipoIdentifiacion);
                }
                return LstTipoIdentifiacion;
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

        public bool FnUTipoidentificacionD(ClsTipoIdentificacion OTipoIdentifiacion)
        {
            bool UpdateTipoidentifiacion = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUTipoIdentifiacion", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdTipoIdentificacion", Convert.ToInt16(OTipoIdentifiacion.IdTipoIdentificacion));
                Cmd_D.Parameters.AddWithValue("prmUTipoIdentificacion", OTipoIdentifiacion.TipoIdentificacion);

                ObjConexion.Abrircon();
                int FilasUTipoidentifiacion = Cmd_D.ExecuteNonQuery();
                if (FilasUTipoidentifiacion > 0) UpdateTipoidentifiacion = true;

                return UpdateTipoidentifiacion;
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

        public bool FnDTipoIdentificacionD(ClsTipoIdentificacion OTipoIdentifiacion)
        {
            bool DeleteTipoIdentifiacion = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDTipoIdentificacion", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmIdTipoIdentificacion", Convert.ToInt16(OTipoIdentifiacion.IdTipoIdentificacion));

                ObjConexion.Abrircon();
                int FilasDTipoIdentificacion = Cmd_D.ExecuteNonQuery();
                if (FilasDTipoIdentificacion > 0) DeleteTipoIdentifiacion = true;

                return DeleteTipoIdentifiacion;
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

        public bool FnETipoIdentifiacion(ClsTipoIdentificacion OTipoIdentifiacion)
        {
            bool ExisteTipoIdentificacion = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spETipoIdentificacion", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdTIpoIdentifiacion", Convert.ToInt16(OTipoIdentifiacion.IdTipoIdentificacion));
                Cmd_D.Parameters.AddWithValue("prmETipoIdentifiacion", OTipoIdentifiacion.TipoIdentificacion);
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteTipoIdentificacion = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteTipoIdentificacion;
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
