using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;

namespace CapaDato
{
    public class ClsPermisosD
    {
        private ClsConexion ObjConexion = null;
        private SqlDataReader Dr_D; //para leer datos de latabla 
        private SqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public List<ClsPermisos> PermisosGenerales(string IDU)
        {
            ClsPermisos objPermisos= null;
            ObjConexion = new ClsConexion();
            Cmd_D = new SqlCommand("spModulosVistasPM", ObjConexion.Con_D);
            Cmd_D.CommandType = System.Data.CommandType.StoredProcedure;
            Cmd_D.Parameters.AddWithValue("@prmUsuario",Convert.ToInt16(IDU));
            try
            {
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsPermisos> LST = new List<ClsPermisos>();
                while (Dr_D.Read())
                {
                    objPermisos = new ClsPermisos();
                    objPermisos.ObjM.Idaspmodulo = Dr_D["moduloasp"].ToString();
                    objPermisos.ObjV.Idaspvista = Dr_D["vistaasp"].ToString();
                    objPermisos.ObjE.Idaspelemento = Dr_D["elementoasp"].ToString();
                    LST.Add(objPermisos);
                }
                return LST;
            }
            catch(Exception ex)
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
