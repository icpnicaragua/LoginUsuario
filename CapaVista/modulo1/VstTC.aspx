<%@ Page Title="" Language="C#" MasterPageFile="~/Pm1.Master" AutoEventWireup="true" CodeBehind="VstTC.aspx.cs" Inherits="CapaVista.modulo1.VstTC" ClientIDMode="Static" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/datatables/datatables.css" rel="stylesheet" />
    <link href="/datatables/Buttons-1.5.4/css/buttons.dataTables.min.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="DivNavegadorMoneda" class="container-fluid">
        <div class="row">
            <div class="header">
                <h4>Navegador</h4>
                <div class="form-group">
                    <asp:LinkButton ID="lbTCambio" href="#TCambio" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Tipo de Cambio</asp:LinkButton>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row">
            <div id="TCambio" class="  col-lg-4 col-md-6 col-sm-12 collapse">
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">TCambio</h2>
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNTCambio" href="#modalNTCambio" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton><!-- id href-->
                            <asp:LinkButton ID="lbMostrarTCambio" href="#secciontblTCambio" runat="server" Text="Mostrar Tipo de Cambio" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton><!-- id href text-->
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblTCambio" class="table-responsive collapse">
                            <table id="tblTCambio" class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>T/C</th>
                                        <th>Moneda</th>
                                        <th>Fecha</th>
                                        <th>Ctrl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyTCambio">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <div id="alertaTCambio" class="modal bd-example-modal-sm" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"></h5>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modalNTCambio">
        <div class="modal-dialog" role="document">
            <div id="DivModBorTCambio" class="modal-content border-success">
                <div id="DivModHeaTCambio" class="modal-header bg-success">
                    <h4 id="H4ModTitTCambio">Editar Tipo de Cambio</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueTCambio" runat="server" data-toggle="validator" role="form">
                        <label id="lblexistenuevoTCambio" for="txtNuevoTCambio" runat="server" class="text-warning" text=""></label>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoTCambio" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Tipo de Cambio" data-required-error="dddd" pattern="^\d+([,.]\d{1,2})?$" MaxLength="8" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfoDecimal2" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCTCambioMoneda" TabIndex="2" CssClass="form-control border-success" runat="server">
                            </asp:DropDownList>
                        </div>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoFecha" runat="server" TabIndex="3" CssClass="form-control" placeholder="Fecha" type="Date" data-required-error="dddd" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <span class="input-group-addon">
                                    <button type="button" class="btn btn-secondary popinfoDATE" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                        <i class="fas fa-info"></i>
                                    </button>
                                </span>
                            </span>
                        </div>
                        <button id="btnNueTCambio" tabindex="4" class="btn btn-success pull-right">
                            <i class="fas fa-save fa-2x"></i>
                        </button>
                    </div>
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
    <script src="/js/icp/CRUDETCambio.js" type="text/javascript"></script>
</asp:Content>
