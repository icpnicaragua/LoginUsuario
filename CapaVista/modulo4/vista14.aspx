<%@ Page Title="" Language="C#" MasterPageFile="~/Pm1.Master" AutoEventWireup="true" CodeBehind="vista14.aspx.cs" Inherits="CapaVista.modulo4.WebForm3" ClientIDMode="Static" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    vista14

    <asp:Button ID="btnmodal"  runat="server" Text="mostrarmodal" href="#modalprueba" data-toggle="modal" />

    <div class="modal fade" id="modalprueba">
        <div class="modal-dialog" role="document">
            <div class="modal-content border-danger">
                <div class="modal-header bg-danger">
                    <h4>Eliminar Tipo de Elemento</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="form1" runat="server" data-toggle="validator" role="form">
                        <div class="form-group">
                            <asp:TextBox ID="txtUsuario" runat="server" CssClass="form-control" placeholder="Usuario" data-required-error="dddd" pattern="^[_A-z0-9]{1,}$" required></asp:TextBox>
                        </div>
                        <div class="form-group">
                            <asp:TextBox ID="TxtClave" runat="server" CssClass="form-control" placeholder="Contraseña" TextMode="Password" required pattern="^[_A-z0-9]{1,}$"></asp:TextBox>
                        </div>
                        <asp:Button ID="btnpruebavalidacion" runat="server" Text="prueba" />
                    </div>
                </div>
            </div>
        </div>
    </div>



   
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphJs" runat="server">
        <script src="/js/icp/crudMVE.js" type="text/javascript"></script> <%----%>

</asp:Content>
