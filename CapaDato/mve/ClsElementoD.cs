using System;
using System.Collections.Generic;
using MySql.Data.MySqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;
using System.Data;

namespace CapaDato.mve
{
    public class ClsElementoD
    {
        private ClsConexion ObjConexion = null;
        private MySqlDataReader Dr_D; //para leer datos de latabla 
        private MySqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public bool FnCElementoD(ClsElemento OElemento)
        {
            bool CreateElemento = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spCElemento", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmElemento", OElemento.Elemento);
                Cmd_D.Parameters.AddWithValue("prmIdAspElemento", OElemento.Idaspelemento);
                Cmd_D.Parameters.AddWithValue("prmIdTipoControl", Convert.ToInt16(OElemento.ObjTipo_control.Idtipocontrol));
                Cmd_D.Parameters.AddWithValue("prmIdVista", Convert.ToInt16(OElemento.ObjVista.Idvista));
                ObjConexion.Abrircon();
                int FilasCElemento = Cmd_D.ExecuteNonQuery();
                if (FilasCElemento > 0) CreateElemento = true;

                return CreateElemento;
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

        public List<ClsElemento> FnRElem()
        {
            ClsElemento OElem = null;

            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spRElem", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                List<ClsElemento> LstElem = new List<ClsElemento>();
                while (Dr_D.Read())
                {
                    OElem = new ClsElemento();
                    OElem.Id_elemento  = Dr_D[0].ToString();//ID_elemento
                    OElem.Elemento  = Dr_D[1].ToString();  //elemento
                    OElem.Fecha_inicioElemento  = Dr_D[2].ToString();  //fecha inicio
                    OElem.ObjTipo_control.Tipocontrol  = Dr_D[3].ToString();  //tipo control
                    OElem.ObjVista.Vista= Dr_D[4].ToString(); // vist
                    OElem.Idaspelemento = Dr_D[5].ToString(); // asp elemento
                    OElem.ObjVista.Idvista = Dr_D[6].ToString();//id vista
                    LstElem.Add(OElem);
                }
                return LstElem;
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

        public bool FnUElementoD(ClsElemento OElemento)
        {
            bool UpdateElemento = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spUElemento", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmIdElemento", Convert.ToInt16(OElemento.Id_elemento));
                Cmd_D.Parameters.AddWithValue("prmElemento", OElemento.Elemento);
                Cmd_D.Parameters.AddWithValue("prmIdAspElemento", OElemento.Idaspelemento);
                Cmd_D.Parameters.AddWithValue("prmIdTipoControl", Convert.ToInt16(OElemento.ObjTipo_control.Idtipocontrol));
                Cmd_D.Parameters.AddWithValue("prmIdVista", Convert.ToInt16(OElemento.ObjVista.Idvista));
                ObjConexion.Abrircon();
                int FilasUElemento = Cmd_D.ExecuteNonQuery();
                if (FilasUElemento > 0) UpdateElemento = true;

                return UpdateElemento;
            }
            catch (MySqlException ex)
            {
                return false;
                throw ex;
            }
            finally
            {
                ObjConexion.Cerrarcon();
            }
        }

        public bool FnDElementoD(ClsElemento OElemento)
        {
            bool DeleteElemento = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spDElemento", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmIdElemento", Convert.ToInt16(OElemento.Id_elemento));

                ObjConexion.Abrircon();
                int FilasDElemento = Cmd_D.ExecuteNonQuery();
                if (FilasDElemento > 0) DeleteElemento = true;

                return DeleteElemento;
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

        public bool FnEElemEl (ClsElemento OElem)
        {
            bool ExisteEE = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spEElemEl", ObjConexion.Con_D);// dos tipos de control no se pueden llamar igual dentro de una vista
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdEl",Convert.ToInt16(OElem.Id_elemento));
                Cmd_D.Parameters.AddWithValue("prmEElem",OElem.Elemento);// no se convierte pq viene como string
                Cmd_D.Parameters.AddWithValue("prmEIdTC", Convert.ToInt16(OElem.ObjTipo_control.Idtipocontrol));
                Cmd_D.Parameters.AddWithValue("prmEIdVi", Convert.ToInt16(OElem.ObjVista.Idvista));

                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if(Dr_D.Read())
                {
                    ExisteEE = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteEE;
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

        public bool FnEElemAE(ClsElemento OElem)
        {
            bool ExisteEA = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new MySqlCommand("spEElemAE", ObjConexion.Con_D);//si exise elemento con nombre asp dentro de la misma vista
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("prmEIdEl", Convert.ToInt16(OElem.Id_elemento));
                Cmd_D.Parameters.AddWithValue("prmEAsEl",OElem.Idaspelemento);
                Cmd_D.Parameters.AddWithValue("prmEIdVi", Convert.ToInt16(OElem.ObjVista.Idvista));

                ObjConexion.Abrircon();
                Dr_D = Cmd_D.ExecuteReader();
                if (Dr_D.Read())
                {
                    ExisteEA = Convert.ToBoolean(Dr_D[0]);
                }
                return ExisteEA;
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
