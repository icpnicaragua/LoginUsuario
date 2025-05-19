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
    public class ClsSubCategoriaD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; 
        private MySqlCommand Cmd_D = null; 

        public bool FnCSubCategoriaD(ClsSubCategoria OSubCategoria)
        {
            bool CreateOSubCategoria = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCSubCategoria", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCSubCategoria", OSubCategoria.SubCategoria);
                Cmd_D.Parameters.AddWithValue("prmCIdCategoria", Convert.ToInt16(OSubCategoria.ObjCategoria.IdCategoria));
                ObjConexion.Abrircon();
                int FilasSubCategoria = Cmd_D.ExecuteNonQuery();
                if (FilasSubCategoria > 0) CreateOSubCategoria = true;

                return CreateOSubCategoria;
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

        public List<ClsSubCategoria> FnRSubCategoriaD()
        {
            ClsSubCategoria OSubCategoria = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRSubCategoria", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsSubCategoria> LstSubCategoria = new List<ClsSubCategoria>();
                while (Dr_D.Read())
                {
                    OSubCategoria = new ClsSubCategoria();
                    OSubCategoria.IdSubCategoria = Dr_D[0].ToString();//id_SubCategoria
                    OSubCategoria.SubCategoria = Dr_D[1].ToString();  //SubCategoria
                    OSubCategoria.ObjCategoria.IdCategoria = Dr_D[2].ToString();//idfamilia
                    OSubCategoria.ObjCategoria.Categoria = Dr_D[3].ToString();//familia 
                    LstSubCategoria.Add(OSubCategoria);
                }
                return LstSubCategoria;
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

        public bool FnUSubCategoriaD(ClsSubCategoria OSubCategoria)
        {
            bool UpdateSubCategoria = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUSubCategoria", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdSubCategoria", Convert.ToInt16(OSubCategoria.IdSubCategoria));
                Cmd_D.Parameters.AddWithValue("prmUSubCategoria", OSubCategoria.SubCategoria);
                Cmd_D.Parameters.AddWithValue("prmUIdCategoria", Convert.ToInt16(OSubCategoria.ObjCategoria.IdCategoria));

                ObjConexion.Abrircon();
                int FilasUSubCategoria = Cmd_D.ExecuteNonQuery();
                if (FilasUSubCategoria > 0) UpdateSubCategoria = true;

                return UpdateSubCategoria;
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

        public bool FnDSubCategoriaD(ClsSubCategoria OSubCategoria)
        {
            bool DeleteSubCategoria = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDSubCategoria", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdSubCategoria", Convert.ToInt16(OSubCategoria.IdSubCategoria));

                ObjConexion.Abrircon();
                int FilasDSubCategoria = Cmd_D.ExecuteNonQuery();
                if (FilasDSubCategoria > 0) DeleteSubCategoria = true;

                return DeleteSubCategoria;
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

        public bool FnESubCategoriaD(ClsSubCategoria OSubCategoria)
        {
            bool ExisteSubCategoria = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spESubCategoria", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdSubCategoria", Convert.ToInt16(OSubCategoria.IdSubCategoria));
                Cmd_D.Parameters.AddWithValue("prmESubCategoria", OSubCategoria.SubCategoria);
                Cmd_D.Parameters.AddWithValue("prmEIdCategoria", Convert.ToInt16(OSubCategoria.ObjCategoria.IdCategoria));

                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteSubCategoria = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteSubCategoria;
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
