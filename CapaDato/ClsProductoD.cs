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
    public class ClsProductoD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D;
        private MySqlCommand Cmd_D = null;

        public bool FnCProductoD(ClsProducto OProducto)
        {
            bool CreateOProducto = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCProducto", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCNombre", OProducto.Nombre);
                Cmd_D.Parameters.AddWithValue("prmCDescripcion", OProducto.Descripcion);
                Cmd_D.Parameters.AddWithValue("prmCBarra", OProducto.Barra);
                Cmd_D.Parameters.AddWithValue("prmCUG", OProducto.UnidadGranel);
                Cmd_D.Parameters.AddWithValue("prmCIVA", OProducto.GrabaIva);
                Cmd_D.Parameters.AddWithValue("prmCMinimo", OProducto.AlertaMinimo);
                Cmd_D.Parameters.AddWithValue("prmCIdSubCategoria", OProducto.ObjSubCategoria.IdSubCategoria);              
                Cmd_D.Parameters.AddWithValue("prmCIdGarantia", Convert.ToInt16(OProducto.ObjGarantia.IdGarantia));
                ObjConexion.Abrircon();
                int FilasProducto = Cmd_D.ExecuteNonQuery();
                if (FilasProducto > 0) CreateOProducto = true;

                return CreateOProducto;
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

        public List<ClsProducto> FnRProductoD()
        {
            ClsProducto OProducto = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRProducto", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsProducto> LstProducto = new List<ClsProducto>();
                while (Dr_D.Read())
                {
                    OProducto = new ClsProducto();
                    OProducto.IdProducto = Dr_D[0].ToString();
                    OProducto.Nombre = Dr_D[1].ToString();
                    OProducto.Descripcion = Dr_D[2].ToString();
                    OProducto.Barra = Dr_D[3].ToString();
                    OProducto.UnidadGranel = Dr_D[4].ToString();
                    OProducto.GrabaIva = Dr_D[5].ToString();
                    OProducto.AlertaMinimo = Dr_D[6].ToString();
                    OProducto.ObjSubCategoria.ObjCategoria.ObjFamilia.Familia = Dr_D[7].ToString();
                    OProducto.ObjSubCategoria.ObjCategoria.Categoria = Dr_D[8].ToString();
                    OProducto.ObjSubCategoria.SubCategoria = Dr_D[9].ToString();
                    OProducto.ObjGarantia.Garantia = Dr_D[10].ToString();
                    LstProducto.Add(OProducto);
                }
                return LstProducto;
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

        public bool FnUProductoD(ClsProducto OProducto)
        {
            bool UpdateProducto = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUProducto", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdProducto", Convert.ToInt16(OProducto.IdProducto));
                Cmd_D.Parameters.AddWithValue("prmUNombre", OProducto.Nombre);
                Cmd_D.Parameters.AddWithValue("prmUDescripcion", OProducto.Descripcion);
                Cmd_D.Parameters.AddWithValue("prmUBarra", OProducto.Barra);
                Cmd_D.Parameters.AddWithValue("prmUUG", OProducto.UnidadGranel);
                Cmd_D.Parameters.AddWithValue("prmUIVA", OProducto.GrabaIva);
                Cmd_D.Parameters.AddWithValue("prmUMinimo", OProducto.AlertaMinimo);
                Cmd_D.Parameters.AddWithValue("prmUIdSubCategoria", OProducto.ObjSubCategoria.IdSubCategoria);
                Cmd_D.Parameters.AddWithValue("prmUIdGarantia", Convert.ToInt16(OProducto.ObjGarantia.IdGarantia));

                ObjConexion.Abrircon();
                int FilasUProducto = Cmd_D.ExecuteNonQuery();
                if (FilasUProducto > 0) UpdateProducto = true;

                return UpdateProducto;
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

        public bool FnDProductoD(ClsProducto OProducto)
        {
            bool DeleteProducto = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDProducto", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdProducto", Convert.ToInt16(OProducto.IdProducto));

                ObjConexion.Abrircon();
                int FilasDProducto = Cmd_D.ExecuteNonQuery();
                if (FilasDProducto > 0) DeleteProducto = true;

                return DeleteProducto;
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

        public bool FnEProductoD(ClsProducto OProducto)
        {
            bool ExisteProducto = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spEProducto", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdProducto", Convert.ToInt16(OProducto.IdProducto));
                Cmd_D.Parameters.AddWithValue("prmENombre", OProducto.Nombre);
                Cmd_D.Parameters.AddWithValue("prmEBarra", OProducto.Barra);

                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteProducto = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteProducto;
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
