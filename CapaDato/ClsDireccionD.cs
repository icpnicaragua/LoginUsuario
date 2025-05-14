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
    public class ClsDireccionD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado


        #region RegPersona

        public bool FnCDireccionD(ClsDireccion ODireccion)
        {
            bool CreateODireccion = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCDireccion", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCDireccion", ODireccion.Direccion);
                Cmd_D.Parameters.AddWithValue("prmCIdTipoDireccion", Convert.ToInt16(ODireccion.ObjTipoDireccion.IdTipoDireccion));
                Cmd_D.Parameters.AddWithValue("prmCIdPersona", Convert.ToInt16(ODireccion.ObjPersona.IdPersona));
                Cmd_D.Parameters.AddWithValue("prmCIdBarrio", Convert.ToInt16(ODireccion.ObjBarrio.IdBarrio));
                
                ObjConexion.Abrircon();
                int FilasDireccion = Cmd_D.ExecuteNonQuery();
                if (FilasDireccion > 0) CreateODireccion = true;

                return CreateODireccion;
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

        public List<ClsDireccion> FnRDireccionD(ClsDireccion ODireccionD)
        {
            ClsDireccion ODireccion = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRDireccion", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmRIdPersona", Convert.ToInt16(ODireccionD.ObjPersona.IdPersona));
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsDireccion> LstDireccion = new List<ClsDireccion>();
                while (Dr_D.Read())
                {
                    ODireccion = new ClsDireccion();
                    ODireccion.IdDireccion = Dr_D[0].ToString();//id_Direccion
                    ODireccion.Direccion = Dr_D[1].ToString();  //Direccion
                    ODireccion.ObjTipoDireccion.IdTipoDireccion = Dr_D[2].ToString();//idTipoDireccion
                    ODireccion.ObjTipoDireccion.TipoDireccion = Dr_D[3].ToString();//Tipo de dirección 
                    ODireccion.ObjBarrio.IdBarrio = Dr_D[4].ToString();//idbarrio
                    ODireccion.ObjBarrio.Barrio = Dr_D[5].ToString();//barrio
                    ODireccion.ObjBarrio.ObjMunicipio.IdMunicipio = Dr_D[6].ToString();//id municipio
                    ODireccion.ObjBarrio.ObjMunicipio.Municipio=Dr_D[7].ToString();//municipío
                    ODireccion.ObjBarrio.ObjMunicipio.ObjDepartamento.IdDepartamento = Dr_D[8].ToString();//id departamento
                    ODireccion.ObjBarrio.ObjMunicipio.ObjDepartamento.Departamento=Dr_D[9].ToString();//departamento
                    LstDireccion.Add(ODireccion);
                }
                return LstDireccion;
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

        public bool FnUDireccionD(ClsDireccion ODireccion)
        {
            bool UpdateDireccion = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUDireccion", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdDireccion", Convert.ToInt16(ODireccion.IdDireccion));
                Cmd_D.Parameters.AddWithValue("prmUDireccion", ODireccion.Direccion);
                Cmd_D.Parameters.AddWithValue("prmUIdTipoDireccion", Convert.ToInt16(ODireccion.ObjTipoDireccion.IdTipoDireccion));
                Cmd_D.Parameters.AddWithValue("prmUIdBarrio", Convert.ToInt16(ODireccion.ObjBarrio.IdBarrio));
                
                ObjConexion.Abrircon();
                int FilasUDireccion = Cmd_D.ExecuteNonQuery();
                if (FilasUDireccion > 0) UpdateDireccion = true;

                return UpdateDireccion;
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

        public bool FnDDireccionD(ClsDireccion ODireccion)
        {
            bool DeleteDireccion = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDDireccion", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdDireccion", Convert.ToInt16(ODireccion.IdDireccion));

                ObjConexion.Abrircon();
                int FilasDDireccion = Cmd_D.ExecuteNonQuery();
                if (FilasDDireccion > 0) DeleteDireccion = true;

                return DeleteDireccion;
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

        public bool FnEDireccionD(ClsDireccion ODireccion)
        {
            bool ExisteDireccion = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spEDireccion", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdDireccion", Convert.ToInt16(ODireccion.IdDireccion));
                Cmd_D.Parameters.AddWithValue("prmEDireccion", ODireccion.Direccion);
                Cmd_D.Parameters.AddWithValue("prmEIdTipoDireccion", Convert.ToInt16(ODireccion.ObjTipoDireccion.IdTipoDireccion));
                Cmd_D.Parameters.AddWithValue("prmEIdPersona", Convert.ToInt16(ODireccion.ObjPersona.IdPersona));

                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteDireccion = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteDireccion;
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

        #endregion
        #region RegEmpresa
        public bool FnCDireccionEmpresaD(ClsDireccion ODireccionEmpresa)
        {
            bool CreateODireccionEmpresa = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCDireccionEmpresa", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCDireccion", ODireccionEmpresa.Direccion);
                Cmd_D.Parameters.AddWithValue("prmCIdTipoDireccion", Convert.ToInt16(ODireccionEmpresa.ObjTipoDireccion.IdTipoDireccion));
                Cmd_D.Parameters.AddWithValue("prmCIdEmpresa", Convert.ToInt16(ODireccionEmpresa.ObjEmpresa.IdEmpresa));
                Cmd_D.Parameters.AddWithValue("prmCIdBarrio", Convert.ToInt16(ODireccionEmpresa.ObjBarrio.IdBarrio));

                ObjConexion.Abrircon();
                int FilasDireccionEmpresa = Cmd_D.ExecuteNonQuery();
                if (FilasDireccionEmpresa > 0) CreateODireccionEmpresa = true;

                return CreateODireccionEmpresa;
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

        public List<ClsDireccion> FnRDireccionEmpresaD(ClsDireccion ODireccionEmpresaD)
        {
            ClsDireccion ODireccionEmpresa = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRDireccionEmpresa", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmRIdEmpresa", Convert.ToInt16(ODireccionEmpresaD.ObjEmpresa.IdEmpresa));
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsDireccion> LstDireccionEmpresa = new List<ClsDireccion>();
                while (Dr_D.Read())
                {
                    ODireccionEmpresa = new ClsDireccion();
                    ODireccionEmpresa.IdDireccion = Dr_D[0].ToString();//id_Direccion
                    ODireccionEmpresa.Direccion = Dr_D[1].ToString();  //Direccion
                    ODireccionEmpresa.ObjTipoDireccion.IdTipoDireccion = Dr_D[2].ToString();//idTipoDireccion
                    ODireccionEmpresa.ObjTipoDireccion.TipoDireccion = Dr_D[3].ToString();//Tipo de dirección 
                    ODireccionEmpresa.ObjBarrio.IdBarrio = Dr_D[4].ToString();//idbarrio
                    ODireccionEmpresa.ObjBarrio.Barrio = Dr_D[5].ToString();//barrio
                    ODireccionEmpresa.ObjBarrio.ObjMunicipio.IdMunicipio = Dr_D[6].ToString();//id municipio
                    ODireccionEmpresa.ObjBarrio.ObjMunicipio.Municipio = Dr_D[7].ToString();//municipío
                    ODireccionEmpresa.ObjBarrio.ObjMunicipio.ObjDepartamento.IdDepartamento = Dr_D[8].ToString();//id departamento
                    ODireccionEmpresa.ObjBarrio.ObjMunicipio.ObjDepartamento.Departamento = Dr_D[9].ToString();//departamento
                    LstDireccionEmpresa.Add(ODireccionEmpresa);
                }
                return LstDireccionEmpresa;
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

        public bool FnEDireccionEmpresaD(ClsDireccion ODireccionEmpresa)
        {
            bool ExisteDireccionEmpresa = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spEDireccionEmpresa", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdDireccion", Convert.ToInt16(ODireccionEmpresa.IdDireccion));
                Cmd_D.Parameters.AddWithValue("prmEDireccion", ODireccionEmpresa.Direccion);
                Cmd_D.Parameters.AddWithValue("prmEIdTipoDireccion", Convert.ToInt16(ODireccionEmpresa.ObjTipoDireccion.IdTipoDireccion));
                Cmd_D.Parameters.AddWithValue("prmEIdEmpresa", Convert.ToInt16(ODireccionEmpresa.ObjEmpresa.IdEmpresa));

                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteDireccionEmpresa = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteDireccionEmpresa;
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
        #endregion


    }
}
