<%@ Page Title="" Language="C#" MasterPageFile="~/Pm1.Master" AutoEventWireup="true" CodeBehind="VstInyeccion.aspx.cs" Inherits="CapaVista.modulo1.VstInyeccion" ClientIDMode="Static" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/datatables/datatables.css" rel="stylesheet" />
    <link href="/datatables/Buttons-1.5.4/css/buttons.dataTables.min.css" rel="stylesheet" />
    <link href="/css/datepicker/datepicker3.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="DivNavegadorinyeccion" class="container-fluid">
        <div class="row">
            <div class="header">
                <h4>Inyecciones a Caja</h4>
                <div class="form-group">
                    <asp:LinkButton ID="lbRealizarInyeccion" href="#Inyeccion" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Realizar Inyección</asp:LinkButton>
                    <asp:LinkButton ID="lbVerInyecciones" href="#Inyecciones" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Ver Inyecciones</asp:LinkButton>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row">
            <div id="Inyeccion" class="  col-lg-12 col-md-12 col-sm-12 collapse">
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Caja Activa</h2>
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbMostrarInicioCajaActiva" href="#secciontblInicioCajaActiva" runat="server" Text="Mostrar Caja Activa" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton>
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblInicioCajaActiva" class="table-responsive collapse">
                            <table id="tblInicioCajaActiva" class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Cajero</th>
                                        <th>Fecha</th>
                                        <th>Hora</th>
                                        <th>Ctrl</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyInicioCajaActiva">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div id="InyeccionIC" class="  col-lg-12 col-md-12 col-sm-12 collapse">
                    <div class="card bg-light mb-3">
                        <div class="card-header">
                            <h2 class="d-inline-block">Inyecciones de Caja Activa</h2>
                        </div>
                        <div class="card-body">
                            <div id="secciontblInyeccionIC" class="table-responsive">
                                <table id="tblInyeccionIC" class="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Cajero</th>
                                            <th>Cantidad</th>
                                            <th>Realizado</th>
                                            <th>Nota</th>
                                            <th>Hora</th>
                                            <th>Fecha Inicio Caja</th>
                                            <th>Ctrl</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tblBodyInyeccionIC">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row">
            <div id="Inyecciones" class="  col-lg-12 col-md-12 col-sm-12 collapse">
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Todas las Inyecciones</h2>
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbMostrarInyecciones" href="#secciontblInyecciones" runat="server" Text="Mostrar Inyeccion" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton><!-- id href text-->
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblInyecciones" class="table-responsive collapse">
                            <table id="tblInyecciones" class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Cajero</th>
                                        <th>Cantidad</th>
                                        <th>Realizado</th>
                                        <th>Nota</th>
                                        <th>Hora</th>
                                        <th>Fecha Inicio Caja</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyInyecciones">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="alertaInyeccion" class="modal bd-example-modal-sm" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"></h5>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modalNInyeccionIC">
        <div class="modal-dialog" role="document">
            <div id="DivModBorInyeccionIC" class="modal-content border-success">
                <div id="DivModHeaInyeccionIC" class="modal-header bg-success">
                    <h4 id="H4ModTitInyeccionIC">Editar Inyección</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueInyeccionIC" runat="server" data-toggle="validator" role="form">
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoCantidad" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Cantidad" data-required-error="dddd" pattern="^\d+([,.]\d{1,2})?$" MaxLength="8" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfoDecimal2" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCInyeccionICCajero" TabIndex="2" CssClass="form-control border-success" runat="server">
                            </asp:DropDownList>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCInyeccionICRealizado" TabIndex="3" CssClass="form-control border-success" runat="server">
                            </asp:DropDownList>
                        </div>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoNota" runat="server" TabIndex="4" CssClass="form-control" placeholder="Nuevo Nota" data-required-error="dddd" pattern="[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]*$" MaxLength="45" ClientIDMode="Static"></asp:TextBox>
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo345N" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoHora" runat="server" TabIndex="5" CssClass="form-control" data-inputmask="'alias':'H:M:s'" data-mask="" ClientIDMode="Static"></asp:TextBox>
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary" data-container="body" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <button id="btnNueInyeccionIC" tabindex="6" class="btn btn-success pull-right">
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
    <script src="/js/plugins/input-mask/jquery.inputmask.js"></script>
    <script src="/js/plugins/input-mask/jquery.inputmask.date.extensions.js"></script>
    <script src="/js/plugins/input-mask/jquery.inputmask.extensions.js"></script>
    <script src="/js/icp/CRUDEInyeccion.js" type="text/javascript"></script>
</asp:Content>
