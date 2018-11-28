using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;

namespace CapaVista.modulo4
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnVerPermisos_Click(object sender, EventArgs e)
        {
            List<ClsModulo> LM = new List<ClsModulo>();

            ClsModulo oModulo = new ClsModulo();
            oModulo.IdModulo = "1";
            oModulo.Modulo = "modulo1";
            LM.Add(oModulo);
            ClsModulo oModulo2 = new ClsModulo();
            oModulo2.IdModulo = "2";
            oModulo2.Modulo = "modulo2";
            LM.Add(oModulo2);
            ClsModulo oModulo3 = new ClsModulo();
            oModulo3.IdModulo = "3";
            oModulo3.Modulo = "modulo3";
            LM.Add(oModulo3);
            ClsModulo oModulo4 = new ClsModulo();
            oModulo4.IdModulo = "4";
            oModulo4.Modulo = "modulo4";
            LM.Add(oModulo4);


            List<ClsVista> LV = new List<ClsVista>();

            ClsVista oVista = new ClsVista();
            oVista.Idvista = "1";
            oVista.Vista = "vista1";
            oVista.ObjModulo.IdModulo = "1";
            LV.Add(oVista);
            ClsVista oVista2 = new ClsVista();
            oVista2.Idvista = "2";
            oVista2.Vista = "vista2";
            oVista2.ObjModulo.IdModulo = "1";
            LV.Add(oVista2);
            ClsVista oVista3 = new ClsVista();
            oVista3.Idvista = "3";
            oVista3.Vista = "vista3";
            oVista3.ObjModulo.IdModulo = "2";
            LV.Add(oVista3);
            ClsVista oVista4 = new ClsVista();
            oVista4.Idvista = "4";
            oVista4.Vista = "vista4";
            oVista4.ObjModulo.IdModulo = "3";
            LV.Add(oVista4);
            ClsVista oVista5 = new ClsVista();
            oVista5.Idvista = "5";
            oVista5.Vista = "vista5";
            oVista5.ObjModulo.IdModulo = "4";
            LV.Add(oVista5);


            List<ClsElemento> LE = new List<ClsElemento>();

            ClsElemento oElemento = new ClsElemento();
            oElemento.Id_elemtno = "1";
            oElemento.Elemento = "ele1";
            oElemento.ObjVista.Idvista = "1";
            LE.Add(oElemento);

            foreach(ClsModulo m in LM)
            {
                TreeNode tnM = new TreeNode();
                tnM.Text = m.Modulo;
                tnM.Checked = true;
                foreach(ClsVista v in LV)
                {
                    if (m.IdModulo == v.ObjModulo.IdModulo)
                    {
                        TreeNode tnV = new TreeNode();
                        tnV.Text = v.Vista;
                        tnV.Checked = true;
                        foreach(ClsElemento el in LE)
                        {
                            TreeNode tnE = new TreeNode();
                            if (v.Idvista == el.ObjVista.Idvista)
                            {
                                tnE.Text = el.Elemento;
                                tnE.Checked = true;
                                tnV.ChildNodes.Add(tnE);
                            }
                            
                        }
                        tnM.ChildNodes.Add(tnV);
                    }
                }
                tvPermisos.Nodes.Add(tnM);
            }
            

        }
    }
}