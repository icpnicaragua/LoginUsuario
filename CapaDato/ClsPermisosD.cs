using System;
using System.Collections.Generic;
using MySql.Data.MySqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;
using System.Data;

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
                    _objPermisoVista.ObjE.Idaspelemento = Dr_D["elementoasp"].ToString();
                 /*ramas odiendo */
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

        public List<ClsPermisos> FnRPermisosD(string IdRol)
        {
            ClsPermisos Objpermisos = null;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRPermisos", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmIdRol", Convert.ToInt16(IdRol));
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsPermisos> LstPermisos = new List<ClsPermisos>();
                while (Dr_D.Read())
                {
                    Objpermisos = new ClsPermisos();
                    Objpermisos.ObjM.IdModulo = Dr_D[2].ToString();//id_modulo
                    Objpermisos.ObjV.Idvista = Dr_D[3].ToString();//id_modulo
                    Objpermisos.ObjE.Id_elemento = Dr_D[4].ToString();//id_modulo
                    LstPermisos.Add(Objpermisos);
                }
                return LstPermisos;
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

        public bool FnDPermisosD(ClsPermisos ObjPermiso)
        {
            bool DeletePermisos = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDPermisos", ObjConexion.Con_D);
                Cmd_D.CommandType = System.Data.CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmIdRol", Convert.ToInt16( ObjPermiso.ObjR.Id_rol));

                ObjConexion.Abrircon();
                int FilaDPermisos = Cmd_D.ExecuteNonQuery();
                if (FilaDPermisos > 0) DeletePermisos = true;

                return DeletePermisos;
            }
            catch(Exception ex)
            {
                return false;
                throw ex;
            }
            finally
            {
                ObjConexion.Cerrarcon();
            }
            
        }

    
        public bool FnUPermisosD(ClsPermisos ObjPermiso)
        {
            bool UpdatePermisos = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUPermisos", ObjConexion.Con_D);
                Cmd_D.CommandType = System.Data.CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmIdRol", Convert.ToInt16(ObjPermiso.ObjR.Id_rol));
                Cmd_D.Parameters.AddWithValue("prmIdModulo", Convert.ToInt16(ObjPermiso.ObjM.IdModulo));
                Cmd_D.Parameters.AddWithValue("prmIdVista", Convert.ToInt16(ObjPermiso.ObjV.Idvista));
                Cmd_D.Parameters.AddWithValue("prmIdElemento", Convert.ToInt16(ObjPermiso.ObjE.Id_elemento));

                ObjConexion.Abrircon();
                int FilaUPermisos = Cmd_D.ExecuteNonQuery();
                if (FilaUPermisos > 0) UpdatePermisos = true;

                return UpdatePermisos;
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
