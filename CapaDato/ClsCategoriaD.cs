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
    public class ClsCategoriaD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCCategoriaD(ClsCategoria OCategoria)
        {
            bool CreateOCategoria = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCCategoria", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCCategoria", OCategoria.Categoria);
                Cmd_D.Parameters.AddWithValue("prmCIdFamilia", Convert.ToInt16(OCategoria.ObjFamilia.IdFamilia));
                ObjConexion.Abrircon();
                int FilasCategoria = Cmd_D.ExecuteNonQuery();
                if (FilasCategoria > 0) CreateOCategoria = true;

                return CreateOCategoria;
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

        public List<ClsCategoria> FnRCategoriaD()
        {
            ClsCategoria OCategoria = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRCategoria", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsCategoria> LstCategoria = new List<ClsCategoria>();
                while (Dr_D.Read())
                {
                    OCategoria = new ClsCategoria();
                    OCategoria.IdCategoria = Dr_D[0].ToString();//id_Categoria
                    OCategoria.Categoria = Dr_D[1].ToString();  //Categoria
                    OCategoria.ObjFamilia.IdFamilia = Dr_D[2].ToString();//idfamilia
                    OCategoria.ObjFamilia.Familia = Dr_D[3].ToString();//familia 
                    LstCategoria.Add(OCategoria);
                }
                return LstCategoria;
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

        public bool FnUCategoriaD(ClsCategoria OCategoria)
        {
            bool UpdateCategoria = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUCategoria", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdCategoria", Convert.ToInt16(OCategoria.IdCategoria));
                Cmd_D.Parameters.AddWithValue("prmUCategoria", OCategoria.Categoria);
                Cmd_D.Parameters.AddWithValue("prmUIdFamilia", Convert.ToInt16(OCategoria.ObjFamilia.IdFamilia));

                ObjConexion.Abrircon();
                int FilasUCategoria = Cmd_D.ExecuteNonQuery();
                if (FilasUCategoria > 0) UpdateCategoria = true;

                return UpdateCategoria;
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

        public bool FnDCategoriaD(ClsCategoria OCategoria)
        {
            bool DeleteCategoria = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDCategoria", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdCategoria", Convert.ToInt16(OCategoria.IdCategoria));

                ObjConexion.Abrircon();
                int FilasDCategoria = Cmd_D.ExecuteNonQuery();
                if (FilasDCategoria > 0) DeleteCategoria = true;

                return DeleteCategoria;
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

        public bool FnECategoriaD(ClsCategoria OCategoria)
        {
            bool ExisteCategoria = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spECategoria", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdCategoria", Convert.ToInt16(OCategoria.IdCategoria));
                Cmd_D.Parameters.AddWithValue("prmECategoria", OCategoria.Categoria);
                Cmd_D.Parameters.AddWithValue("prmEIdFamilia", Convert.ToInt16(OCategoria.ObjFamilia.IdFamilia));

                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteCategoria = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteCategoria;
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
