using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;
using System.Web.Services;

namespace CapaVista.modulo4
{
    public partial class WebForm1 : System.Web.UI.Page
    {
   
        public  void FNRPermisos()
        {
            HiddenField HFIDUSER = (HiddenField)Master.FindControl("hfIDU");
            tvPermisos.Nodes.Clear();
           
            List<ClsPermisos> Permisos = new ClsPermisosN().PermisosPM(HFIDUSER.Value);

            List<ClsModulo> LM = new ClsModuloN().FnRModuloN();
                    
            List<ClsVista> LV = new ClsVistaN().FnRVist(); // List<ClsVista>();

            List<ClsElemento> LE = new ClsElementoN().FnRElem(); //List<ClsElemento>();

            bool EstadoVista;
            bool EstadoElemento;
            foreach (ClsModulo m in LM)//recorrer cada módulo
            {   
                TreeNode tnM = new TreeNode(); //declarar instancia de treenode para módulo
                tnM.Text = m.Modulo; // asignar nombre de modulo
                tnM.Checked = !(Permisos.Exists(Modulo => Modulo.ObjM.IdModulo == m.IdModulo)); // asignar estado
                foreach (ClsVista v in LV) //recorrer las vistas por cada interacción de módulo
                {
                    EstadoVista = true;
                    EstadoElemento = true;
                    if (m.IdModulo == v.ObjModulo.IdModulo ) // si la vista pertenece al módulo
                    {
                        TreeNode tnV = new TreeNode();//se instncia un nodo para la vista
                        tnV.Text = v.Vista;//se asigna el nombre de la vista
                        foreach (ClsPermisos P in Permisos)
                        {
                            if (P.ObjM.IdModulo == m.IdModulo && P.ObjV.Idvista == "1")
                            {
                                EstadoVista = false;
                                EstadoElemento = false;
                            }
                        }
                        if ((Permisos.Exists(Vista => Vista.ObjV.Idvista == v.Idvista)))
                        {
                            EstadoVista = false;
                            EstadoElemento = false;
                        }
                        tnV.Checked = EstadoVista;
                        foreach (ClsElemento el in LE) // se recorre los elementos
                        {                            
                            TreeNode tnE = new TreeNode(); // se instancia un nodo para elementos
                            if (v.Idvista == el.ObjVista.Idvista) // si el elemento pertenece a la vista
                            {
                                tnE.Text = el.Elemento;//asingar nombre del nodo elemento

                                foreach (ClsPermisos PE in Permisos)
                                {
                                    if (PE.ObjV.Idvista==v.Idvista && PE.ObjE.Id_elemento=="1")
                                    {
                                        EstadoElemento = false;
                                    }
                                }
                                if ((Permisos.Exists(Elemento => Elemento.ObjE.Id_elemento == el.Id_elemento)))
                                {
                                    EstadoElemento = false;
                                }
                                tnE.Checked = EstadoElemento; // estado del elemento
                                tnE.SelectAction = TreeNodeSelectAction.None;
                                tnV.ChildNodes.Add(tnE); //agregamos el elemento como hijo de vista
                            }
                        }
                        if (v.Idvista != "1")//no agregar tm
                        {
                            tnV.SelectAction = TreeNodeSelectAction.None;
                            tnM.ChildNodes.Add(tnV);//agregamos la vista como hijo de módulo
                        }               
                    }
                }
                if (m.IdModulo != "1")//no agregar tm
                {
                    tnM.SelectAction = TreeNodeSelectAction.None;
                    tvPermisos.Nodes.Add(tnM); // agregamos el módulo al treeview
                    int sdd = tnM.ChildNodes.Count;
                   // Response.Write("<script language=javascript>alert('" + sdd + "');</script>"); //va a al verga esto
                }
            }
            string NodoModulo = "";

            string NodoVista = "";

            string NodoElemento = "";

            foreach (TreeNode Node in tvPermisos.Nodes)
            {
                if (!Node.Checked)
                {
                    NodoModulo += Node.Value + " ";
                }

                foreach(TreeNode NodeV in Node.ChildNodes)
                {
                    if (!NodeV.Checked)
                    {
                        NodoVista += NodeV.Value + " ";
                    }
                    foreach(TreeNode NodeE in NodeV.ChildNodes)
                    {
                        if (!NodeE.Checked)
                        {
                            NodoElemento += NodeE.Value + " ";
                        }
                    }
                }
            }
           //Response.Write("<script language=javascript>alert('" + NodoModulo+ " " + NodoVista +" " + NodoElemento + "');</script>");
        }

        protected void btnVerPermisos_Click(object sender, EventArgs e)
        {
            FNRPermisos();
        }

        protected void Page_Load(object sender, EventArgs e)
        {
           
        }

      

        protected void tvPermisos_CheckChanged(object sender, EventArgs e)
        {
            Response.Write("<script language=javascript>alert(' cambio ');</script>");
        }

        protected void tvPermisos_SelectedNodeChanged(object sender, EventArgs e)
        {
            Response.Write("<script language=javascript>alert('Selección cambió  ');</script>");
        }

    

    }
}