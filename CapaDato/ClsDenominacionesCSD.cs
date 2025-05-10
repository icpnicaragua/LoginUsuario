using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;
using MySql.Data.MySqlClient;
using System.Data;
using MySql.Data.Types;

namespace CapaDato
{
    public class ClsDenominacionesCSD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCDenominacionesCSD(ClsDenominacionesCS ODenominacionesCS)
        {
            bool CreateODenominacionesCS = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCDenominacionesCS", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCDenominacionesCS", ODenominacionesCS.Nombre);
                Cmd_D.Parameters.AddWithValue("prmCCantidad",Convert.ToDecimal( ODenominacionesCS.Cantidad));
                ObjConexion.Abrircon();
                int FilasCDenominacionesCS = Cmd_D.ExecuteNonQuery();
                if (FilasCDenominacionesCS > 0) CreateODenominacionesCS = true;

                return CreateODenominacionesCS;
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

        public List<ClsDenominacionesCS> FnRDenominacionesCSD()
        {
            ClsDenominacionesCS ODenominacionesCS = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRDenominacionesCS", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsDenominacionesCS> LstDenominacionesCS = new List<ClsDenominacionesCS>();
                while (Dr_D.Read())
                {
                    ODenominacionesCS = new ClsDenominacionesCS();
                    ODenominacionesCS.IdDenominacion = Dr_D[0].ToString();//id_DenominacionesCS
                    ODenominacionesCS.Nombre = Dr_D[1].ToString();  //DenominacionesCS     
                    ODenominacionesCS.Cantidad = Dr_D[2].ToString();  //cantidad
                    LstDenominacionesCS.Add(ODenominacionesCS);
                }
                return LstDenominacionesCS;
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

        public bool FnUDenominacionesCSD(ClsDenominacionesCS ODenominacionesCS)
        {
            bool UpdateDenominacionesCS = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUDenominacionesCS", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdDenominacionesCS", Convert.ToInt16(ODenominacionesCS.IdDenominacion));
                Cmd_D.Parameters.AddWithValue("prmUDenominacionesCS", ODenominacionesCS.Nombre);
                Cmd_D.Parameters.AddWithValue("prmUCantidad", Convert.ToDecimal(ODenominacionesCS.Cantidad)); //
              //  Cmd_D.Parameters.Add(new MySqlParameter("prmUCantidad", MySqlDbType.Decimal) {Precision=10, Scale=2, Value= Convert.ToDecimal(ODenominacionesCS.Cantidad) });
                ObjConexion.Abrircon();
                int FilasUDenominacionesCS = Cmd_D.ExecuteNonQuery();
                if (FilasUDenominacionesCS > 0) UpdateDenominacionesCS = true;

                return UpdateDenominacionesCS;
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

        public bool FnDDenominacionesCSD(ClsDenominacionesCS ODenominacionesCS)
        {
            bool DeleteDenominacionesCS = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDDenominacionesCS", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdDenominacionesCS", Convert.ToInt16(ODenominacionesCS.IdDenominacion));

                ObjConexion.Abrircon();
                int FilasDDenominacionesCS = Cmd_D.ExecuteNonQuery();
                if (FilasDDenominacionesCS > 0) DeleteDenominacionesCS = true;

                return DeleteDenominacionesCS;
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

        public bool FnEDenominacionesCSD(ClsDenominacionesCS ODenominacionesCS)
        {
            bool ExisteDenominacionesCS = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spEDenominacionesCS", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdDenominacionesCS", Convert.ToInt16(ODenominacionesCS.IdDenominacion));
                Cmd_D.Parameters.AddWithValue("prmEDenominacionesCS", ODenominacionesCS.Nombre);
                Cmd_D.Parameters.AddWithValue("prmECantidad",Convert.ToDecimal( ODenominacionesCS.Cantidad));
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteDenominacionesCS = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteDenominacionesCS;
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
