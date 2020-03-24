using System;
using System.Collections.Generic;
using MySql.Data.MySqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;

namespace CapaDato
{
    public class ClsPermisosD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public List<ClsPermisos> PermisosGenerales(string IDU)
        {
            ClsPermisos objPermisos= null;
            ObjConexion = new ClsConexion();
            Cmd_D = new MySqlCommand("spModulosVistasPM", ObjConexion.Con_D);
            Cmd_D.CommandType = System.Data.CommandType.StoredProcedure;
            Cmd_D.Parameters.AddWithValue("prmUsuario",Convert.ToInt16(IDU));
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
                    objPermisos.ObjM.IdModulo = Dr_D["idm"].ToString();
                    objPermisos.ObjV.Idvista = Dr_D["idv"].ToString();
                    objPermisos.ObjE.Id_elemento = Dr_D["ide"].ToString();
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

        
             public List<ClsPermisos> PermisoVIsta(string IDU, string IDASPVISTA)
        {
            ClsPermisos _objPermisoVista = null;
            ObjConexion = new ClsConexion();
            Cmd_D = new MySqlCommand("spPermisoVista", ObjConexion.Con_D);
            Cmd_D.CommandType = System.Data.CommandType.StoredProcedure;
            Cmd_D.Parameters.AddWithValue("prmidusuario", Convert.ToInt16(IDU));
            Cmd_D.Parameters.AddWithValue("prmidaspvista", IDASPVISTA);
            try
            {
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsPermisos> LST = new List<ClsPermisos>();
                while (Dr_D.Read())
                {
                    _objPermisoVista = new ClsPermisos();
                    _objPermisoVista.ObjV.Idaspvista = Dr_D["vistaasp"].ToString();
                    LST.Add(_objPermisoVista);
                }
                return LST;
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
