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
    public class ClsProveedorD
    {//no hay funciòn para existe
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; 
        private MySqlCommand Cmd_D = null;

        public bool FnCProveedorD(ClsProveedor OProveedor)
        {
            bool CreateOProveedor = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCProveedor", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCPlazoCredito", OProveedor.PlazoCredito);
                Cmd_D.Parameters.AddWithValue("prmCIdPersona", Convert.ToInt16(OProveedor.ObjPersona.IdPersona));
                Cmd_D.Parameters.AddWithValue("prmCIdEmpresa", Convert.ToInt16(OProveedor.ObjEmpresa.IdEmpresa));
                ObjConexion.Abrircon();
                int FilasProveedor = Cmd_D.ExecuteNonQuery();
                if (FilasProveedor > 0) CreateOProveedor = true;

                return CreateOProveedor;
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

        public List<ClsProveedor> FnRProveedorD()
        {
            ClsProveedor OProveedor = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRProveedor", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsProveedor> LstProveedor = new List<ClsProveedor>();
                while (Dr_D.Read())
                {
                    OProveedor = new ClsProveedor();
                    OProveedor.IdProveedor = Dr_D[0].ToString();
                    OProveedor.PlazoCredito = Dr_D[1].ToString();  
                    OProveedor.Nombre = Dr_D[2].ToString();
                    OProveedor.EP = Dr_D[3].ToString();
                    LstProveedor.Add(OProveedor);
                }
                return LstProveedor;
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

        public bool FnUProveedorD(ClsProveedor OProveedor)
        {
            bool UpdateProveedor = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUProveedor", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdProveedor", Convert.ToInt16(OProveedor.IdProveedor));
                Cmd_D.Parameters.AddWithValue("prmUPlazoCredito", OProveedor.PlazoCredito);

                ObjConexion.Abrircon();
                int FilasUProveedor = Cmd_D.ExecuteNonQuery();
                if (FilasUProveedor > 0) UpdateProveedor = true;

                return UpdateProveedor;
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

        public bool FnDProveedorD(ClsProveedor OProveedor)
        {
            bool DeleteProveedor = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDProveedor", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdProveedor", Convert.ToInt16(OProveedor.IdProveedor));

                ObjConexion.Abrircon();
                int FilasDProveedor = Cmd_D.ExecuteNonQuery();
                if (FilasDProveedor > 0) DeleteProveedor = true;

                return DeleteProveedor;
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

        public List<ClsProveedor> FnRProveedorNPersonaD()
        {
            ClsProveedor OProveedor = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRProveedorNPersona", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsProveedor> LstProveedor = new List<ClsProveedor>();
                while (Dr_D.Read())
                {
                    OProveedor = new ClsProveedor();
                    OProveedor.ObjPersona.IdPersona = Dr_D[0].ToString();
                    OProveedor.ObjPersona.Nombre1 = Dr_D[1].ToString();
                    OProveedor.ObjPersona.Apellido1 = Dr_D[2].ToString();               
                    LstProveedor.Add(OProveedor);
                }
                return LstProveedor;
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

        public List<ClsProveedor> FnRProveedorNEmpresaD()
        {
            ClsProveedor OProveedor = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRProveedorNEmpresa", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsProveedor> LstProveedor = new List<ClsProveedor>();
                while (Dr_D.Read())
                {
                    OProveedor = new ClsProveedor();
                    OProveedor.ObjEmpresa.IdEmpresa = Dr_D[0].ToString();
                    OProveedor.ObjEmpresa.NombreComercial = Dr_D[1].ToString();
                    OProveedor.ObjEmpresa.RazonSocial = Dr_D[2].ToString();
                    OProveedor.ObjEmpresa.Ruc = Dr_D[3].ToString();
                    LstProveedor.Add(OProveedor);
                }
                return LstProveedor;
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
