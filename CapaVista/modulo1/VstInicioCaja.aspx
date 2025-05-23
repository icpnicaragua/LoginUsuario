<%@ Page Title="" Language="C#" MasterPageFile="~/Pm1.Master" AutoEventWireup="true" CodeBehind="VstInicioCaja.aspx.cs" Inherits="CapaVista.modulo1.VstInicioCaja" ClientIDMode="Static" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/datatables/datatables.css" rel="stylesheet" />
    <link href="/datatables/Buttons-1.5.4/css/buttons.dataTables.min.css" rel="stylesheet" />
    <link href="/css/datepicker/datepicker3.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="DivNavegadorInicioCaja" class="container-fluid">
        <div class="row">
            <div class="header">
                <h4>Navegador</h4>
                <div class="form-group">
                    <asp:LinkButton ID="lbInicioCaja" href="#InicioCaja" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Inicio de Caja</asp:LinkButton>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid collapse" id="InicioCaja">
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 ">
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">InicioCaja</h2>
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNInicioCaja" href="#modalNInicioCaja" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton>
                            <asp:LinkButton ID="lbMostrarInicioCaja" href="#secciontblInicioCaja" runat="server" Text="Mostrar Inicio Caja" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton>
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblInicioCaja" class="table-responsive collapse">
                            <table id="tblInicioCaja" class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Cajero</th>
                                        <th>Fecha</th>
                                        <th>Hora</th>
                                        <th title="Solo Se puede editar o eliminar si no se ha asignado denominaciones">Ctrl</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyInicioCaja">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

            <div class="collapse" id="DenominacionInicioROW">
                <div id="DenominacionInicio" class="  col-lg-12 col-md-12 col-sm-12 ">
                    <div class="card bg-light mb-3">
                        <div class="card-header">
                            <h2 id="H2DenominacionInicio"class="d-inline-block">Denominaciones Inicio de Caja</h2>
                            <div class="d-inline-block pull-right">
                                <asp:LinkButton ID="lbNCerrarDenominacionInicio" runat="server" CssClass="btn btn-success  btn3d "><i class="fa fa-floppy-o fa-2x"></i></asp:LinkButton>
                            </div>
                        </div>
                        <div class="card-body">
                            <div id="secciontblDenominacionInicio" class="table-responsive">
                                <table id="tblDenominacionInicio" class="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Denominación</th>
                                            <th>Cantidad</th>
                                            <th>Total</th>
                                            <th>Ctrl</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tblBodyDenominacionInicio">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div id="alertaInicioCaja" class="modal bd-example-modal-sm" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"></h5>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modalNInicioCaja">
        <div class="modal-dialog" role="document">
            <div id="DivModBorInicioCaja" class="modal-content border-success">
                <div id="DivModHeaInicioCaja" class="modal-header bg-success">
                    <h4 id="H4ModTitInicioCaja">Editar Inicio de Caja</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueInicioCaja" runat="server" data-toggle="validator" role="form">
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCInicioCajaCajero" TabIndex="1" CssClass="form-control border-success" runat="server">
                            </asp:DropDownList>
                        </div>
                        <label id="lblexistenuevoFecha" for="txtNuevoFecha" runat="server" class="text-warning" text=""></label>
                        <label id="lblexistenuevoInicioCaja" for="txtNuevoFecha" runat="server" class="text-warning" text=""></label>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoFecha" runat="server" TabIndex="2" CssClass="form-control" data-inputmask="'alias':'dd/mm/yyyy'" data-mask="" ClientIDMode="Static"></asp:TextBox>
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoHora" runat="server" TabIndex="3" CssClass="form-control" data-inputmask="'alias':'H:M:s'" data-mask="" ClientIDMode="Static"></asp:TextBox>
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>

                        <button id="btnNueInicioCaja" tabindex="4" class="btn btn-success pull-right">
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
    <script src="/js/plugins/input-mask/jquery.inputmask.js"></script>
    <script src="/js/plugins/input-mask/jquery.inputmask.date.extensions.js"></script>
    <script src="/js/plugins/input-mask/jquery.inputmask.extensions.js"></script>
    <script src="/js/icp/crudMVE.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDEInicioCaja.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDEDenominacionInicio.js" type="text/javascript"></script>

</asp:Content>
