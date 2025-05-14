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
    public class ClsEmpresaD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCEmpresaD(ClsEmpresa OEmpresa)
        {
            bool CreateOEmpresa = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCEmpresa", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCEmpresa", OEmpresa.NombreComercial);
                Cmd_D.Parameters.AddWithValue("prmCRazonSocial", OEmpresa.RazonSocial);
                Cmd_D.Parameters.AddWithValue("prmCRuc", OEmpresa.Ruc);
                Cmd_D.Parameters.AddWithValue("prmCIdTipoEmpresa", Convert.ToInt16(OEmpresa.ObjTipoEmpresa.IdTipoEmpresa));
                Cmd_D.Parameters.AddWithValue("prmCIdRegimen", Convert.ToInt16(OEmpresa.ObjRegimen.IdRegimen));
                ObjConexion.Abrircon();
                int FilasEmpresa = Cmd_D.ExecuteNonQuery();
                if (FilasEmpresa > 0) CreateOEmpresa = true;

                return CreateOEmpresa;
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

        public List<ClsEmpresa> FnREmpresaD()
        {
            ClsEmpresa OEmpresa = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spREmpresa", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsEmpresa> LstEmpresa = new List<ClsEmpresa>();
                while (Dr_D.Read())
                {
                    OEmpresa = new ClsEmpresa();
                    OEmpresa.IdEmpresa = Dr_D[0].ToString();//id_Empresa
                    OEmpresa.NombreComercial = Dr_D[1].ToString();  //Empresa
                    OEmpresa.RazonSocial = Dr_D[2].ToString();
                    OEmpresa.Ruc = Dr_D[3].ToString();
                    OEmpresa.ObjTipoEmpresa.IdTipoEmpresa = Dr_D[4].ToString();//id
                    OEmpresa.ObjTipoEmpresa.TipoEmpresa = Dr_D[5].ToString();//tipoempresa 
                    OEmpresa.ObjRegimen.IdRegimen = Dr_D[6].ToString();
                    OEmpresa.ObjRegimen.Regimen = Dr_D[7].ToString();
                    LstEmpresa.Add(OEmpresa);
                }
                return LstEmpresa;
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

        public bool FnUEmpresaD(ClsEmpresa OEmpresa)
        {
            bool UpdateEmpresa = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUEmpresa", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdEmpresa", Convert.ToInt16(OEmpresa.IdEmpresa));
                Cmd_D.Parameters.AddWithValue("prmUEmpresa", OEmpresa.NombreComercial);
                Cmd_D.Parameters.AddWithValue("prmURazonSocial", OEmpresa.RazonSocial);
                Cmd_D.Parameters.AddWithValue("prmURuc", OEmpresa.Ruc);
                Cmd_D.Parameters.AddWithValue("prmUIdTipoEmpresa", Convert.ToInt16(OEmpresa.ObjTipoEmpresa.IdTipoEmpresa));
                Cmd_D.Parameters.AddWithValue("prmUIdRegimen", Convert.ToInt16(OEmpresa.ObjRegimen.IdRegimen));

                ObjConexion.Abrircon();
                int FilasUEmpresa = Cmd_D.ExecuteNonQuery();
                if (FilasUEmpresa > 0) UpdateEmpresa = true;

                return UpdateEmpresa;
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

        public bool FnDEmpresaD(ClsEmpresa OEmpresa)
        {
            bool DeleteEmpresa = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDEmpresa", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdEmpresa", Convert.ToInt16(OEmpresa.IdEmpresa));

                ObjConexion.Abrircon();
                int FilasDEmpresa = Cmd_D.ExecuteNonQuery();
                if (FilasDEmpresa > 0) DeleteEmpresa = true;

                return DeleteEmpresa;
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

        public bool FnEEmpresaD(ClsEmpresa OEmpresa)
        {
            bool ExisteEmpresa = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spEEmpresa", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdEmpresa", Convert.ToInt16(OEmpresa.IdEmpresa));
                Cmd_D.Parameters.AddWithValue("prmEEmpresa", OEmpresa.NombreComercial);
                Cmd_D.Parameters.AddWithValue("prmERazonSocial", OEmpresa.RazonSocial);
                Cmd_D.Parameters.AddWithValue("prmERuc", OEmpresa.Ruc);

                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteEmpresa = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteEmpresa;
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
