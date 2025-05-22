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
    public class ClsCargoEmpleadoD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; 
        private MySqlCommand Cmd_D = null;

        public bool FnCCargoEmpleadoD(ClsCargoEmpleado OCargoEmpleado)
        {
            bool CreateOCargoEmpleado = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCCargoEmpleado", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCIdCargo", Convert.ToInt16(OCargoEmpleado.ObjCargo.IdCargo));
                Cmd_D.Parameters.AddWithValue("prmCIdEmpleado", Convert.ToInt16(OCargoEmpleado.ObjEmpleado.IdEmpleado));
                ObjConexion.Abrircon();
                int FilasCargoEmpleado = Cmd_D.ExecuteNonQuery();
                if (FilasCargoEmpleado > 0) CreateOCargoEmpleado = true;

                return CreateOCargoEmpleado;
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

        public List<ClsCargoEmpleado> FnRCargoEmpleadoD()
        {
            ClsCargoEmpleado OCargoEmpleado = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRCargoEmpleado", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsCargoEmpleado> LstCargoEmpleado = new List<ClsCargoEmpleado>();
                while (Dr_D.Read())
                {
                    OCargoEmpleado = new ClsCargoEmpleado();
                    OCargoEmpleado.ObjCargo.Cargo = Dr_D[0].ToString();                   
                    OCargoEmpleado.ObjEmpleado.ObjPersona.Nombre1 = Dr_D[1].ToString();
                    OCargoEmpleado.ObjEmpleado.ObjPersona.Apellido1 = Dr_D[2].ToString();
                    OCargoEmpleado.IdCargoEmpleado = Dr_D[3].ToString();
                    LstCargoEmpleado.Add(OCargoEmpleado);
                }
                return LstCargoEmpleado;
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

        public bool FnUCargoEmpleadoD(ClsCargoEmpleado OCargoEmpleado)
        {
            bool UpdateCargoEmpleado = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUCargoEmpleado", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdCargoEmpleado", Convert.ToInt16(OCargoEmpleado.IdCargoEmpleado));
                Cmd_D.Parameters.AddWithValue("prmUIdCargo", Convert.ToInt16(OCargoEmpleado.ObjCargo.IdCargo));
                ObjConexion.Abrircon();
                int FilasUCargoEmpleado = Cmd_D.ExecuteNonQuery();
                if (FilasUCargoEmpleado > 0) UpdateCargoEmpleado = true;

                return UpdateCargoEmpleado;
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

        public bool FnDCargoEmpleadoD(ClsCargoEmpleado OCargoEmpleado)
        {
            bool DeleteCargoEmpleado = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDCargoEmpleado", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdCargoEmpleado", Convert.ToInt16(OCargoEmpleado.IdCargoEmpleado));

                ObjConexion.Abrircon();
                int FilasDCargoEmpleado = Cmd_D.ExecuteNonQuery();
                if (FilasDCargoEmpleado > 0) DeleteCargoEmpleado = true;

                return DeleteCargoEmpleado;
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

        public bool FnECargoEmpleadoD(ClsCargoEmpleado OCargoEmpleado)
        {
            bool ExisteCargoEmpleado = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spECargoEmpleado", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdCargoEmpleado", Convert.ToInt16(OCargoEmpleado.IdCargoEmpleado));
                Cmd_D.Parameters.AddWithValue("prmEIdCargo", Convert.ToInt16(OCargoEmpleado.ObjCargo.IdCargo));
                Cmd_D.Parameters.AddWithValue("prmEIdEmpleado", Convert.ToInt16(OCargoEmpleado.ObjEmpleado.IdEmpleado));

                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteCargoEmpleado = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteCargoEmpleado;
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

        #region REGCajero
        public List<ClsCargoEmpleado> FnRCajeroD()
        {
            ClsCargoEmpleado OCajero = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRCargoEmpleado", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsCargoEmpleado> LstCajero = new List<ClsCargoEmpleado>();
                while (Dr_D.Read())
                {
                    OCajero = new ClsCargoEmpleado();
                    OCajero.ObjEmpleado.IdEmpleado = Dr_D[3].ToString();
                    OCajero.ObjEmpleado.ObjPersona.Nombre1 = Dr_D[1].ToString();
                    OCajero.ObjEmpleado.ObjPersona.Apellido1 = Dr_D[2].ToString();                   
                    LstCajero.Add(OCajero);
                }
                return LstCajero;
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
        #endregion
    }
}
