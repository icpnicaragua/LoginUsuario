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
    public class ClsClienteD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; 
        private MySqlCommand Cmd_D = null; 
        // no es necesario crear Existe en Clientes, ya que es seleccionado de una tabla y verifica los estados de clientes
        public bool FnCClienteD(ClsCliente OCliente)
        {
            bool CreateOCliente = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCCliente", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCPlazoCredito", Convert.ToInt16(OCliente.PlazoCredito));
                Cmd_D.Parameters.AddWithValue("prmCLimiteCredito", Convert.ToDecimal(OCliente.LimiteCredito));
                Cmd_D.Parameters.AddWithValue("prmCIdTipoCliente", Convert.ToInt16(OCliente.ObjTipoCliente.IdTipoCliente));
                Cmd_D.Parameters.AddWithValue("prmCIdPersona", Convert.ToInt16(OCliente.ObjPersona.IdPersona));
                Cmd_D.Parameters.AddWithValue("prmCIdEmpresa", Convert.ToInt16(OCliente.ObjEmpresa.IdEmpresa));

                ObjConexion.Abrircon();
                int FilasCliente = Cmd_D.ExecuteNonQuery();
                if (FilasCliente > 0) CreateOCliente = true;

                return CreateOCliente;
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

        public List<ClsCliente> FnRClienteD()
        {
            ClsCliente OCliente = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRCliente", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsCliente> LstCliente = new List<ClsCliente>();
                while (Dr_D.Read())
                {
                    OCliente = new ClsCliente();
                    OCliente.IdCliente = Dr_D[0].ToString();//id_Cliente
                    OCliente.Fecha_inicio = Dr_D[1].ToString();  //Cliente
                    OCliente.PlazoCredito = Dr_D[2].ToString();//idTipoCliente
                    OCliente.LimiteCredito = Dr_D[3].ToString();//TipoCliente 
                    OCliente.ObjTipoCliente.TipoCliente = Dr_D[4].ToString();
                    OCliente.Nombre = Dr_D[5].ToString();
                    OCliente.EP = Dr_D[6].ToString();
                    LstCliente.Add(OCliente);
                }
                return LstCliente;
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

        public bool FnUClienteD(ClsCliente OCliente)
        {
            bool UpdateCliente = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUCliente", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdCliente", Convert.ToInt16(OCliente.IdCliente));
                Cmd_D.Parameters.AddWithValue("prmUPlazoCredito", Convert.ToInt16(OCliente.PlazoCredito));
                Cmd_D.Parameters.AddWithValue("prmULimiteCredito", Convert.ToDecimal(OCliente.LimiteCredito));
                Cmd_D.Parameters.AddWithValue("prmUIdTipoCliente", Convert.ToInt16(OCliente.ObjTipoCliente.IdTipoCliente));

                ObjConexion.Abrircon();
                int FilasUCliente = Cmd_D.ExecuteNonQuery();
                if (FilasUCliente > 0) UpdateCliente = true;

                return UpdateCliente;
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

        public bool FnDClienteD(ClsCliente OCliente)
        {
            bool DeleteCliente = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDCliente", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdCliente", Convert.ToInt16(OCliente.IdCliente));

                ObjConexion.Abrircon();
                int FilasDCliente = Cmd_D.ExecuteNonQuery();
                if (FilasDCliente > 0) DeleteCliente = true;

                return DeleteCliente;
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

        public List<ClsCliente> FnRClienteNPersonaD()
        {
            ClsCliente OCliente = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRClienteNPersona", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsCliente> LstCliente = new List<ClsCliente>();
                while (Dr_D.Read())
                {
                    OCliente = new ClsCliente();
                    OCliente.ObjPersona.IdPersona = Dr_D[0].ToString();
                    OCliente.ObjPersona.Nombre1 = Dr_D[1].ToString();  
                    OCliente.ObjPersona.Apellido1 = Dr_D[2].ToString();                 
                    LstCliente.Add(OCliente);
                }
                return LstCliente;
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

        public List<ClsCliente> FnRClienteNEmpresaD()
        {
            ClsCliente OCliente = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRClienteNEmpresa", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsCliente> LstCliente = new List<ClsCliente>();
                while (Dr_D.Read())
                {
                    OCliente = new ClsCliente();
                    OCliente.ObjEmpresa.IdEmpresa = Dr_D[0].ToString();
                    OCliente.ObjEmpresa.NombreComercial = Dr_D[1].ToString();
                    OCliente.ObjEmpresa.RazonSocial = Dr_D[2].ToString();
                    OCliente.ObjEmpresa.Ruc = Dr_D[3].ToString();
                    LstCliente.Add(OCliente);
                }
                return LstCliente;
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
    }
}
