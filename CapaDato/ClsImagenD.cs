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
    public class ClsImagenD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D;
        private MySqlCommand Cmd_D = null;
        public bool FnCImagenD(ClsImagen OImagen)
        {
            bool CreateOImagen = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCImagen", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCImagen", OImagen.Imagen);
                Cmd_D.Parameters.AddWithValue("prmCIdProducto", Convert.ToInt16(OImagen.ObjProducto.IdProducto));
                ObjConexion.Abrircon();
                int FilasImagen = Cmd_D.ExecuteNonQuery();
                if (FilasImagen > 0) CreateOImagen = true;

                return CreateOImagen;
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
    }
}
