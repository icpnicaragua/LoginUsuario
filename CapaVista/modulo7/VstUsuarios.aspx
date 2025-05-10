<%@ Page Title="" Language="C#" MasterPageFile="~/Pm1.Master" AutoEventWireup="true" CodeBehind="VstUsuarios.aspx.cs" Inherits="CapaVista.modulo7.VstUsuarios" ClientIDMode="Static" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/datatables/datatables.css" rel="stylesheet" />
    <link href="/datatables/Buttons-1.5.4/css/buttons.dataTables.min.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="DivNavegadorEmpleados" class="container-fluid">
        <!-- id-->
        <div class="row">
            <div class="header">
                <h4>Navegador</h4>
                <!-- h4-->
                <div class="form-group">
                    <asp:LinkButton ID="lbArea" href="#Area" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Área</asp:LinkButton><!-- id href text-->
                    <asp:LinkButton ID="lbEmpleado" href="#Empleado" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Empleados</asp:LinkButton><!-- id href text-->
                    <asp:LinkButton ID="lbPersona" href="#Persona" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Personas</asp:LinkButton><!-- id href text-->
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphJs" runat="server">
    <script src="/datatables/datatables.min.js"></script>
    <script src="/datatables/Buttons-1.5.4/js/dataTables.buttons.min.js"></script>
    <script src="/datatables/Buttons-1.5.4/js/buttons.flash.min.js"></script>
    <script src="/datatables/pdfmake-0.1.36/pdfmake.min.js"></script>
    <script src="/datatables/pdfmake-0.1.36/vfs_fonts.js"></script>
    <script src="/js/icp/crudMVE.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDEUsuario.js" type="text/javascript"></script>
</asp:Content>
