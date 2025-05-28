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
    public class ClsCuentaD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D;
        private MySqlCommand Cmd_D = null;

        public bool FnCCuentaD(ClsCuenta OCuenta)
        {
            bool CreateOCuenta = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCCuenta", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCCuenta", OCuenta.NumeroCuenta);
                Cmd_D.Parameters.AddWithValue("prmCIdBanco", Convert.ToInt16(OCuenta.ObjBanco.IdBanco));
                Cmd_D.Parameters.AddWithValue("prmCPropietario", OCuenta.Propietario);
                Cmd_D.Parameters.AddWithValue("prmCIdMonesa", Convert.ToInt16(OCuenta.ObjMoneda.IdMoneda));
                ObjConexion.Abrircon();
                int FilasCuenta = Cmd_D.ExecuteNonQuery();
                if (FilasCuenta > 0) CreateOCuenta = true;

                return CreateOCuenta;
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

        public List<ClsCuenta> FnRCuentaD()
        {
            ClsCuenta OCuenta = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRCuenta", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsCuenta> LstCuenta = new List<ClsCuenta>();
                while (Dr_D.Read())
                {
                    OCuenta = new ClsCuenta();
                    OCuenta.IdCuenta = Dr_D[0].ToString();
                    OCuenta.NumeroCuenta = Dr_D[1].ToString();
                    OCuenta.ObjBanco.Banco = Dr_D[2].ToString();
                    OCuenta.Propietario = Dr_D[3].ToString();
                    OCuenta.ObjMoneda.Moneda = Dr_D[4].ToString();
                    LstCuenta.Add(OCuenta);
                }
                return LstCuenta;
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

        public bool FnUCuentaD(ClsCuenta OCuenta)
        {
            bool UpdateCuenta = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUCuenta", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdCuenta", Convert.ToInt16(OCuenta.IdCuenta));
                Cmd_D.Parameters.AddWithValue("prmUCuenta", OCuenta.NumeroCuenta);
                Cmd_D.Parameters.AddWithValue("prmUIdBanco", Convert.ToInt16(OCuenta.ObjBanco.IdBanco));
                Cmd_D.Parameters.AddWithValue("prmUPropierario", OCuenta.Propietario);
                Cmd_D.Parameters.AddWithValue("prmUIdMoneda", Convert.ToInt16(OCuenta.ObjMoneda.IdMoneda));

                ObjConexion.Abrircon();
                int FilasUCuenta = Cmd_D.ExecuteNonQuery();
                if (FilasUCuenta > 0) UpdateCuenta = true;

                return UpdateCuenta;
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

        public bool FnDCuentaD(ClsCuenta OCuenta)
        {
            bool DeleteCuenta = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDCuenta", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdCuenta", Convert.ToInt16(OCuenta.IdCuenta));

                ObjConexion.Abrircon();
                int FilasDCuenta = Cmd_D.ExecuteNonQuery();
                if (FilasDCuenta > 0) DeleteCuenta = true;

                return DeleteCuenta;
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

        public bool FnECuentaD(ClsCuenta OCuenta)
        {
            bool ExisteCuenta = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spECuenta", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdCuenta", Convert.ToInt16(OCuenta.IdCuenta));
                Cmd_D.Parameters.AddWithValue("prmECuenta", OCuenta.NumeroCuenta);
                Cmd_D.Parameters.AddWithValue("prmEIdBanco", Convert.ToInt16(OCuenta.ObjBanco.IdBanco));

                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteCuenta = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteCuenta;
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
