<%@ Page Title="" Language="C#" MasterPageFile="~/Pm1.Master" AutoEventWireup="true" CodeBehind="Pagina3.aspx.cs" Inherits="CapaVista.Pagina3" ClientIDMode="Static" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <%--css individual--%>
       <link href="datatables/datatables.css" rel="stylesheet" /> <%--probada ok--%>
    <link href="datatables/Buttons-1.5.4/css/buttons.dataTables.min.css" rel="stylesheet" />
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
        <div class="col-lg-12">
                <div class="table-resposive">
                    <table id="tblUsuarios" class="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>id </th>
                                <th>usuario </th>
                                <th>contra </th>
                                <th>fecha </th> 
                                <th>btn1 </th>
                                 <th>btn2 </th>
                            </tr>
                        </thead>
                        <tbody id="tblBodyUsuarios">
                            <!-- ajax -->
                           
                        </tbody>
                    </table>
                
            </div>
        </div>
    </div>
    
    
    <asp:Label ID="Label1" runat="server" Text="Label"></asp:Label>
  

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="cphJs" runat="server">
    <%--JS individual--%> 
    <script src="datatables/datatables.min.js"></script>
    <script src="datatables/Buttons-1.5.4/js/dataTables.buttons.min.js"></script>
    <script src="datatables/Buttons-1.5.4/js/buttons.flash.min.js"></script>
    <script src="datatables/pdfmake-0.1.36/pdfmake.min.js"></script>
    <script src="datatables/pdfmake-0.1.36/vfs_fonts.js"></script>
     <script src="js/icp/usuario.js" type="text/javascript"></script> <%----%>
</asp:Content>

