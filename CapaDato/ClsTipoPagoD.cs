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
    public class ClsTipoPagoD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCPromoD(ClsTipoPago OTipoPago)
        {
            bool CreateOTipoPago = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCTipoPago", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCTipoPago", OTipoPago.TipoPago);

                ObjConexion.Abrircon();
                int FilasCRegime = Cmd_D.ExecuteNonQuery();
                if (FilasCRegime > 0) CreateOTipoPago = true;

                return CreateOTipoPago;
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

        public List<ClsTipoPago> FnRTipoPagoD()
        {
            ClsTipoPago OTipoPago = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRTipoPago", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsTipoPago> LstTipoPago = new List<ClsTipoPago>();
                while (Dr_D.Read())
                {
                    OTipoPago = new ClsTipoPago();
                    OTipoPago.IdTipoPago = Dr_D[0].ToString();//id_TipoPago
                    OTipoPago.TipoPago = Dr_D[1].ToString();  //TipoPago     
                    LstTipoPago.Add(OTipoPago);
                }
                return LstTipoPago;
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

        public bool FnUTipoPagoD(ClsTipoPago OTipoPago)
        {
            bool UpdateTipoPago = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUTipoPago", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdTipoPago", Convert.ToInt16(OTipoPago.IdTipoPago));
                Cmd_D.Parameters.AddWithValue("prmUTipoPago", OTipoPago.TipoPago);

                ObjConexion.Abrircon();
                int FilasUTipoPago = Cmd_D.ExecuteNonQuery();
                if (FilasUTipoPago > 0) UpdateTipoPago = true;

                return UpdateTipoPago;
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

        public bool FnDTipoPagoD(ClsTipoPago OTipoPago)
        {
            bool DeleteTipoPago = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDTipoPago", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdTipoPago", Convert.ToInt16(OTipoPago.IdTipoPago));

                ObjConexion.Abrircon();
                int FilasDTipoPago = Cmd_D.ExecuteNonQuery();
                if (FilasDTipoPago > 0) DeleteTipoPago = true;

                return DeleteTipoPago;
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

        public bool FnETipoPagoD(ClsTipoPago OTipoPago)
        {
            bool ExisteTipoPago = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spETipoPago", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdTipoPago", Convert.ToInt16(OTipoPago.IdTipoPago));
                Cmd_D.Parameters.AddWithValue("prmETipoPago", OTipoPago.TipoPago);
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteTipoPago = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteTipoPago;
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
