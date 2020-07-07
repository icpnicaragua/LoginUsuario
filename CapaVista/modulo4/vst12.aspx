<%@ Page Title="" Language="C#" MasterPageFile="~/Pm1.Master" AutoEventWireup="true" CodeBehind="vst12.aspx.cs" Inherits="CapaVista.modulo4.WebForm1" ClientIDMode="Static"%>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/css/hummingbird-treeview.css" rel="stylesheet" />
    <link href="/datatables/datatables.css" rel="stylesheet" />
    <link href="/datatables/Buttons-1.5.4/css/buttons.dataTables.min.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-fluid">
        <div class="row">
            <div class="header">
                <h4>Navegador</h4>
                <div class="form-group">
                    <asp:LinkButton ID="LbShowSeccionRol" href="#DivRol" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Rol</asp:LinkButton>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row">
            <%--tabla rol--%>
            <div id="DivTVRol" class="  col-lg-6 col-md-12 col-sm-12 collapse">
                <div class="card bg-light mb-3">
             <div class="card-header">
                        <h2 id="H2Permisos" class="d-inline-block">Permiso:</h2>
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="LbUPermisos" href="#DivTVRol" data-toggle="collapse" runat="server" CssClass="btn btn-success  btn3d "><i class="far fa-save fa-2x"></i></asp:LinkButton>
                            <asp:LinkButton ID="LbXPermisos" href="#DivTVRol" runat="server" Text="Mostrar Rol" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye-slash fa-2x"></i></asp:LinkButton>
                        </div>
                    </div>
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
                                            <input id="xnode" data-id="custom-0-1" type="checkbox" />
                                            node-0-1
                                        </label>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                   
            </div>
            <div id="DivRol" class="  col-lg-6 col-md-12 col-sm-12 collapse">
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Rol</h2>
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="LbCRUDENRol" href="#ModalRol" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton>
                            <asp:LinkButton ID="LBShowRol" href="#SeccionTblRol" runat="server" Text="Mostrar Rol" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton>
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="SeccionTblRol" class="table-responsive collapse">
                            <table id="TblRol" class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Rol</th>
                                        <th>Inicio</th>
                                        <th>Crtl</th>
                                    </tr>
                                </thead>
                                <tbody id="TblBodyRol">
                                    <!-- ajax-->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>

        <div class="modal" id="ModalRol">
        <div class="modal-dialog" role="document">
            <div id="DivModBorRol" class="modal-content border-success">
                <div id="DivModHeaRol" class="modal-header bg-success">
                    <h4 id="H4ModTitRol">Editar Rol</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueRol" runat="server" data-toggle="validator" role="form">
                        <label id="lblExisteRol" for="TxtRol" runat="server" class="text-warning" text=""></label>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="TxtRol" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Rol" data-required-error="dddd" pattern="^[_A-z0-9]{3,}$" MaxLength="30" ClientIDMode="Static"></asp:TextBox>
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo2" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <button id="BtnCRUDENRol" tabindex="2" class="btn btn-success pull-right">
                            <i class="fas fa-save fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
       <div id="Alerta" class="modal bd-example-modal-sm" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"></h5>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphJs" runat="server" >
        <script src="/datatables/datatables.min.js"></script>
    <script src="/datatables/Buttons-1.5.4/js/dataTables.buttons.min.js"></script>
    <script src="/datatables/Buttons-1.5.4/js/buttons.flash.min.js"></script>
    <script src="/datatables/pdfmake-0.1.36/pdfmake.min.js"></script>
    <script src="/datatables/pdfmake-0.1.36/vfs_fonts.js"></script>
     <script src="/js/icp/admin_permisos.js" type="text/javascript"></script>
    <script src="/js/hummingbird-treeview.js" type="text/javascript"></script>
    
</asp:Content>
