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
    public class ClsTipoGastoD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCTipoGastoD(ClsTipoGasto OTipoGasto)
        {
            bool CreateOTipoGasto = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCTipoGasto", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCTipoGasto", OTipoGasto.TipoGasto);

                ObjConexion.Abrircon();
                int FilasCRegime = Cmd_D.ExecuteNonQuery();
                if (FilasCRegime > 0) CreateOTipoGasto = true;

                return CreateOTipoGasto;
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

        public List<ClsTipoGasto> FnRTipoGastoD()
        {
            ClsTipoGasto OTipoGasto = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRTipoGasto", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsTipoGasto> LstTipoGasto = new List<ClsTipoGasto>();
                while (Dr_D.Read())
                {
                    OTipoGasto = new ClsTipoGasto();
                    OTipoGasto.IdTipoGasto = Dr_D[0].ToString();//id_TipoGasto
                    OTipoGasto.TipoGasto = Dr_D[1].ToString();  //TipoGasto     
                    LstTipoGasto.Add(OTipoGasto);
                }
                return LstTipoGasto;
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

        public bool FnUTipoGastoD(ClsTipoGasto OTipoGasto)
        {
            bool UpdateTipoGasto = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUTipoGasto", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdTipoGasto", Convert.ToInt16(OTipoGasto.IdTipoGasto));
                Cmd_D.Parameters.AddWithValue("prmUTipoGasto", OTipoGasto.TipoGasto);

                ObjConexion.Abrircon();
                int FilasUTipoGasto = Cmd_D.ExecuteNonQuery();
                if (FilasUTipoGasto > 0) UpdateTipoGasto = true;

                return UpdateTipoGasto;
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

        public bool FnDTipoGastoD(ClsTipoGasto OTipoGasto)
        {
            bool DeleteTipoGasto = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDTipoGasto", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdTipoGasto", Convert.ToInt16(OTipoGasto.IdTipoGasto));

                ObjConexion.Abrircon();
                int FilasDTipoGasto = Cmd_D.ExecuteNonQuery();
                if (FilasDTipoGasto > 0) DeleteTipoGasto = true;

                return DeleteTipoGasto;
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

        public bool FnETipoGastoD(ClsTipoGasto OTipoGasto)
        {
            bool ExisteTipoGasto = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spETipoGasto", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdTipoGasto", Convert.ToInt16(OTipoGasto.IdTipoGasto));
                Cmd_D.Parameters.AddWithValue("prmETipoGasto", OTipoGasto.TipoGasto);
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteTipoGasto = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteTipoGasto;
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
