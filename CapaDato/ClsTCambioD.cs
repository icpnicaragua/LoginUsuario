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
    public class ClsTCambioD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; 
        private MySqlCommand Cmd_D = null;

        public bool FnCTCambioD(ClsTCambio OTCambio)
        {
            bool CreateOTCambio = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCTcambio", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCTcambio", Convert.ToDecimal( OTCambio.TCambio));
                Cmd_D.Parameters.AddWithValue("prmCIdMoneda", Convert.ToInt16(OTCambio.ObjMoneda.IdMoneda));
                Cmd_D.Parameters.AddWithValue("prmCFecha", Convert.ToDateTime(OTCambio.Fecha));
                ObjConexion.Abrircon();
                int FilasTCambio = Cmd_D.ExecuteNonQuery();
                if (FilasTCambio > 0) CreateOTCambio = true;

                return CreateOTCambio;
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

        public List<ClsTCambio> FnRTCambioD()
        {
            ClsTCambio OTCambio = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRTCambio", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsTCambio> LstTCambio = new List<ClsTCambio>();
                while (Dr_D.Read())
                {
                    OTCambio = new ClsTCambio();
                    OTCambio.IdTCambio = Dr_D[0].ToString();
                    OTCambio.TCambio = Dr_D[1].ToString(); 
                    OTCambio.ObjMoneda.IdMoneda = Dr_D[2].ToString();
                    OTCambio.ObjMoneda.Moneda = Dr_D[3].ToString();
                    OTCambio.Fecha = Dr_D[4].ToString();
                    LstTCambio.Add(OTCambio);
                }
                return LstTCambio;
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

        public bool FnUTCambioD(ClsTCambio OTCambio)
        {
            bool UpdateTCambio = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUTcambio", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdTcambio", Convert.ToInt16(OTCambio.IdTCambio));
                Cmd_D.Parameters.AddWithValue("prmUTcambio",Convert.ToDecimal( OTCambio.TCambio));
                Cmd_D.Parameters.AddWithValue("prmUIdMoneda", Convert.ToInt16(OTCambio.ObjMoneda.IdMoneda));
                Cmd_D.Parameters.AddWithValue("prmUFecha", Convert.ToDateTime(OTCambio.Fecha));

                ObjConexion.Abrircon();
                int FilasUTCambio = Cmd_D.ExecuteNonQuery();
                if (FilasUTCambio > 0) UpdateTCambio = true;

                return UpdateTCambio;
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

        public bool FnDTCambioD(ClsTCambio OTCambio)
        {
            bool DeleteTCambio = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDTcambio", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdTcambio", Convert.ToInt16(OTCambio.IdTCambio));

                ObjConexion.Abrircon();
                int FilasDTCambio = Cmd_D.ExecuteNonQuery();
                if (FilasDTCambio > 0) DeleteTCambio = true;

                return DeleteTCambio;
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

        public bool FnETCambioD(ClsTCambio OTCambio)
        {
            bool ExisteTCambio = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spETcambio", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdTcambio", Convert.ToInt16(OTCambio.IdTCambio));
                Cmd_D.Parameters.AddWithValue("prmEFecha",Convert.ToDateTime( OTCambio.TCambio));
                Cmd_D.Parameters.AddWithValue("prmEIdMoneda", Convert.ToInt16(OTCambio.ObjMoneda.IdMoneda));

                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteTCambio = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteTCambio;
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
