using System;
using System.Collections.Generic;
using System.Data.SqlClient;
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
        private SqlDataReader Dr_D; //para leer datos de latabla 
        private SqlCommand Cmd_D = null; // ejecutamos comandos de transact o procedimiento almacenado

        public List<ClsElemento> FnRElem()
        {
            ClsElemento OElem = null;

            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new SqlCommand("spRElem", ObjConexion.Con_D);
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

        public bool FnEElemEl (ClsElemento OElem)
        {
            bool ExisteEE = false;
            try
            {
                ObjConexion = new ClsConexion();
                Cmd_D = new SqlCommand("spEElemEl", ObjConexion.Con_D);
                Cmd_D.CommandType = CommandType.StoredProcedure;
                Cmd_D.Parameters.AddWithValue("@prmEIdEl",Convert.ToInt16(OElem.Id_elemento));
                Cmd_D.Parameters.AddWithValue("@prmEElem",OElem.Elemento);// no se convierte pq viene como string
                Cmd_D.Parameters.AddWithValue("@prmEIdTC", Convert.ToInt16(OElem.ObjVista.Idvista));
                Cmd_D.Parameters.AddWithValue("@prmEIdVi", Convert.ToInt16(OElem.ObjTipo_control.Idtipocontrol));

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

    }
}
