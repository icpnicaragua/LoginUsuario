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
    public class ClsBodegaD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCBodegaD(ClsBodega OBodega)
        {
            bool CreateOBodega = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCBodega", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmCBodega", OBodega.NombreBodega);
                Cmd_D.Parameters.AddWithValue("prmCDescripcion", OBodega.Descripcion);
                Cmd_D.Parameters.AddWithValue("prmCIdSucursal", Convert.ToInt16(OBodega.ObjSucursal.IdSucursal));
                Cmd_D.Parameters.AddWithValue("prmCIdResponsable", Convert.ToInt16(OBodega.ObjResponsable.IdEmpleado));

                ObjConexion.Abrircon();
                int FilasBodega = Cmd_D.ExecuteNonQuery();
                if (FilasBodega > 0) CreateOBodega = true;

                return CreateOBodega;
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

        public List<ClsBodega> FnRBodegaD()
        {
            ClsBodega OBodega = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRBodega", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsBodega> LstBodega = new List<ClsBodega>();
                while (Dr_D.Read())
                {
                    OBodega = new ClsBodega();
                    OBodega.IdBodega = Dr_D[0].ToString();//id_Bodega
                    OBodega.NombreBodega = Dr_D[1].ToString();  //Bodega
                    OBodega.Descripcion = Dr_D[2].ToString();  //descr
                    OBodega.ObjSucursal.Sucursal = Dr_D[3].ToString();//familia 
                    OBodega.ObjResponsable.ObjPersona.Nombre1 = Dr_D[4].ToString();
                    OBodega.ObjResponsable.ObjPersona.Apellido1 = Dr_D[5].ToString();
                    LstBodega.Add(OBodega);
                }
                return LstBodega;
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

        public bool FnUBodegaD(ClsBodega OBodega)
        {
            bool UpdateBodega = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUBodega", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmUIdBodega", Convert.ToInt16(OBodega.IdBodega));
                Cmd_D.Parameters.AddWithValue("prmUBodega", OBodega.NombreBodega);
                Cmd_D.Parameters.AddWithValue("prmUDescripcion", OBodega.Descripcion);
                Cmd_D.Parameters.AddWithValue("prmUIdSucursal", Convert.ToInt16(OBodega.ObjSucursal.IdSucursal));
                Cmd_D.Parameters.AddWithValue("prmUIdResponsable", Convert.ToInt16(OBodega.ObjResponsable.IdEmpleado));

                ObjConexion.Abrircon();
                int FilasUBodega = Cmd_D.ExecuteNonQuery();
                if (FilasUBodega > 0) UpdateBodega = true;

                return UpdateBodega;
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

        public bool FnDBodegaD(ClsBodega OBodega)
        {
            bool DeleteBodega = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDBodega", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmDIdBodega", Convert.ToInt16(OBodega.IdBodega));

                ObjConexion.Abrircon();
                int FilasDBodega = Cmd_D.ExecuteNonQuery();
                if (FilasDBodega > 0) DeleteBodega = true;

                return DeleteBodega;
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

        public bool FnEBodegaD(ClsBodega OBodega)
        {
            bool ExisteBodega = true;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spEBodega", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdBodega", Convert.ToInt16(OBodega.IdBodega));
                Cmd_D.Parameters.AddWithValue("prmEBodega", OBodega.NombreBodega);
                Cmd_D.Parameters.AddWithValue("prmEIdSucursal", Convert.ToInt16(OBodega.ObjSucursal.IdSucursal));

                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteBodega = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteBodega;
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
