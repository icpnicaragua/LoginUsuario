<%@ Page Title="" Language="C#" MasterPageFile="~/Pm1.Master" AutoEventWireup="true" CodeBehind="VstGastos.aspx.cs" Inherits="CapaVista.modulo1.VstGastos" ClientIDMode="Static" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/datatables/datatables.css" rel="stylesheet" />
    <link href="/datatables/Buttons-1.5.4/css/buttons.dataTables.min.css" rel="stylesheet" />
    <link href="/css/datepicker/datepicker3.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="DivNavegadorGastos" class="container-fluid">
        <div class="row">
            <div class="header">
                <h4>Navegador</h4>
                <div class="form-group">
                    <asp:LinkButton ID="lbTipoGasto" href="#TipoGasto" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Tipo de gasto</asp:LinkButton>
                    <asp:LinkButton ID="lbRealizarGasto" href="#CajaAbierta" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Realizar Gasto de Caja</asp:LinkButton>
                    <asp:LinkButton ID="lbGasto" href="#Gasto" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Gastos</asp:LinkButton>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row">
            <div id="TipoGasto" class="  col-lg-6 col-md-6 col-sm-12 collapse">
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">TipoGasto</h2>
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNTipoGasto" href="#modalNTipoGasto" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton>
                            <asp:LinkButton ID="lbMostrarTipoGasto" href="#secciontblTipoGasto" runat="server" Text="Mostrar Tipo de gasto" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton>
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblTipoGasto" class="table-responsive collapse">
                            <table id="tblTipoGasto" class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Tipo de gasto</th>
                                        <th>Ctrl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyTipoGasto">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div id="CajaAbierta" class="  col-lg-12 col-md-12 col-sm-12 collapse">
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
                 <div id="GastoIC" class="  col-lg-12 col-md-12 col-sm-12 collapse">
     <div class="card bg-light mb-3">
         <div class="card-header">
             <h2 class="d-inline-block">Gasto de caja activa</h2>
         </div>
         <div class="card-body">
             <div id="secciontblGastoIC" class="table-responsive">
                 <table id="tblGastoIC" class="table table-bordered table-hover">
                     <thead>
                         <tr>
                             <th>Id</th>
                             <th>Fecha</th>
                             <th>Hora</th>
                             <th>Serie</th>
                             <th>Documento</th>
                             <th>Cantidad</th>
                             <th>Tipo</th>
                             <th>Descripción</th>
                             <th>Caja</th>
                             <th>Autorizado</th>
                             <th>Ctrl</th>
                             <th>Estado</th>
                         </tr>
                     </thead>
                     <tbody id="tblBodyGastoIC">
                     </tbody>
                 </table>
             </div>
         </div>
     </div>
 </div>
            </div>
           

            <div id="Gasto" class="  col-lg-12 col-md-12 col-sm-12 collapse">
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Gasto</h2>
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNGasto" href="#modalNGasto" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fa fa-chain-broken fa-2x"></i></asp:LinkButton><!-- id href-->
                            <asp:LinkButton ID="lbMostrarGasto" href="#secciontblGasto" runat="server" Text="Mostrar Gasto" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton><!-- id href text-->
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblGasto" class="table-responsive collapse">
                            <table id="tblGasto" class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Fecha</th>
                                        <th>Hora</th>
                                        <th>Serie</th>
                                        <th>Documento</th>
                                        <th>Cantidad</th>
                                        <th>Tipo</th>
                                        <th>Descripción</th>
                                        <th>Caja</th>
                                        <th>Autorizado</th>
                                        <th>Ctrl</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyGasto">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="alertaGastos" class="modal bd-example-modal-sm" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"></h5>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modalNTipoGasto">
        <div class="modal-dialog" role="document">
            <div id="DivModBorTipoGasto" class="modal-content border-success">
                <div id="DivModHeaTipoGasto" class="modal-header bg-success">
                    <h4 id="H4ModTitTipoGasto">Editar Tipo de gasto</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueTipoGasto" runat="server" data-toggle="validator" role="form">
                        <label id="lblexistenuevoTipoGasto" for="txtNuevoTipoGaston" runat="server" class="text-warning" text=""></label>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoTipoGasto" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo TipoGasto" data-required-error="dddd" pattern="[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]*$" MaxLength="20" ClientIDMode="Static"></asp:TextBox>
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo320NS" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <button id="btnNueTipoGasto" tabindex="2" class="btn btn-success pull-right">
                            <i class="fas fa-save fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modalNGasto">
        <div class="modal-dialog" role="document">
            <div id="DivModBorGasto" class="modal-content border-success">
                <div id="DivModHeaGasto" class="modal-header bg-success">
                    <h4 id="H4ModTitGasto">Editar Categoría</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueGasto" runat="server" data-toggle="validator" role="form">
                        <label id="lblexistenuevoGasto" for="txtNuevoFecha" runat="server" class="text-warning" text=""></label>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoFecha" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nueva Fecha" data-inputmask="'alias':'dd/mm/yyyy'" data-mask="" ClientIDMode="Static"></asp:TextBox>
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoHora" runat="server" TabIndex="2" CssClass="form-control" placeholder="Nueva Hora" data-inputmask="'alias':'H:M:s'" data-mask="" ClientIDMode="Static"></asp:TextBox>
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoSerie" runat="server" TabIndex="3" CssClass="form-control" placeholder="Nueva Serie" data-required-error="dddd" pattern="[a-zA-Z0-9]*$" MaxLength="3" ClientIDMode="Static"></asp:TextBox>
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo1_3N" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoDocumento" runat="server" TabIndex="4" CssClass="form-control" placeholder="Nuevo Documento" data-required-error="dddd" pattern="[a-zA-Z0-9]*$" MaxLength="20" ClientIDMode="Static"></asp:TextBox>
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo120N" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoCantidad" runat="server" TabIndex="5" CssClass="form-control" placeholder="Nueva Cantidad" data-required-error="dddd" pattern="^\d+([,.]\d{1,2})?$" MaxLength="20" ClientIDMode="Static"></asp:TextBox>
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfoDecimal2" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCGastoTipoGasto" TabIndex="6" CssClass="form-control border-success" runat="server">
                            </asp:DropDownList>
                        </div>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoDescripcion" runat="server" TabIndex="7" CssClass="form-control" placeholder="Nueva Descripción" data-required-error="dddd" pattern="[a-zA-Z0-9]*$" MaxLength="20" ClientIDMode="Static"></asp:TextBox>
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo120N" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group mb-3">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios" id="OptBCaja" value="1" tabindex="8">
                                <label class="form-check-label" for="OptBCaja">
                                    Gasto de Caja del día
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios" id="OptBFCaja" value="0" tabindex="9">
                                <label class="form-check-label" for="OptBFCaja">
                                    Fuera de Caja
                                </label>
                            </div>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCGastoAutorizado" TabIndex="10" CssClass="form-control border-success" runat="server">
                            </asp:DropDownList>
                        </div>
                        <button id="btnNueGasto" tabindex="11" class="btn btn-success pull-right">
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
    <script src="/js/icp/CRUDETipoGasto.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDEGasto.js" type="text/javascript"></script>
</asp:Content>
