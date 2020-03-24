<%@ Page Title="" Language="C#" MasterPageFile="~/Pm1.Master" AutoEventWireup="true" CodeBehind="vst12.aspx.cs" Inherits="CapaVista.modulo4.WebForm1" ClientIDMode="Static"%>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/css/hummingbird-treeview.css" rel="stylesheet" />
     <style type="text/css">

.checkdiv {
  position: relative;
  padding: 4px 8px;
  border-radius:40px;
  margin-bottom:4px;
  min-height:30px;
  padding-left:40px;
  display: flex;
  align-items: center;
}
.checkdiv:last-child {
  margin-bottom:0px;
}
.checkdiv span {
  position: relative;
  vertical-align: middle;
  line-height: normal;
}
.le-checkbox {

  position: absolute;
  top:50%;
  left:5px;
  transform:translateY(-50%);
  background-color: #F44336;
  width:30px;
  height:30px;
  border-radius:40px;
  margin:0px;
  outline: none; 
  transition:background-color .5s;
}
.le-checkbox:before {
  content:'';
  position: absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%) rotate(45deg);
  background-color:#ffffff;
  width:20px;
  height:5px;
  border-radius:40px;
  transition:all .5s;
}

.le-checkbox:after {
  content:'';
  position: absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%) rotate(-45deg);
  background-color:#ffffff;
  width:20px;
  height:5px;
  border-radius:40px;
  transition:all .5s;
}
.le-checkbox:checked {
  background-color:#4CAF50;
}
.le-checkbox:checked:before {
  content:'';
  position: absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%) translate(-4px,3px) rotate(45deg);
  background-color:#ffffff;
  width:12px;
  height:5px;
  border-radius:40px;
}

.le-checkbox:checked:after {
  content:'';
  position: absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%) translate(3px,2px) rotate(-45deg);
  background-color:#ffffff;
  width:16px;
  height:5px;
  border-radius:40px;
}
</style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div>
        <asp:Button ID="btnVerPermisos" runat="server" Text="Ver Permisos" OnClick="btnVerPermisos_Click" />
      
        <asp:TreeView ID="tvPermisos" runat="server" ShowCheckBoxes="all" OnTreeNodeCheckChanged="tvPermisos_CheckChanged" OnSelectedNodeChanged="tvPermisos_SelectedNodeChanged"></asp:TreeView>
    </div>
    <div>
          <asp:Button ID="btntreejs1" runat="server" Text="js1" />
        <asp:Button ID="prueba1" runat="server" Text="test" />
        <asp:Button ID="borrar" runat="server" Text="borrar" />
       <div id="treeview_container" class="hummingbird-treeview" style="height: 230px; overflow-y: scroll;">
    	<ul id="treeview" class="hummingbird-base">
	    <li data-id="0">
		<i class="fa fa-plus"></i>
		<label>
		    <input id="xnode-0" data-id="custom-0" type="checkbox" />Inicio</label>
		<ul>
		    <li data-id="1">
			<i class="fa fa-plus"></i>
			<label>
			    <input  id="xnode" data-id="custom-0-1" type="checkbox" /> node-0-1
			</label>
		    </li>
		</ul>
	    </li>
	</ul>
    </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphJs" runat="server" >
     <script src="/js/icp/admin_permisos.js" type="text/javascript"></script>
    <script src="/js/hummingbird-treeview.js" type="text/javascript"></script>
    
</asp:Content>
