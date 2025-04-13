<%@ Page Title="" Language="C#" MasterPageFile="~/Pm1.Master" AutoEventWireup="true" CodeBehind="VstGenerales.aspx.cs" Inherits="CapaVista.modulo7.VstGenerales" ClientIDMode="Static" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <!-- c&p-->
    <link href="/datatables/datatables.css" rel="stylesheet" />
    <link href="/datatables/Buttons-1.5.4/css/buttons.dataTables.min.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div id="DivNavegadorGenerales" class="container-fluid">
        <!-- id-->
        <div class="row">
            <div class="header">
                <h4>Navegador</h4>
                <!-- h4-->
                <div class="form-group">
                    <asp:LinkButton ID="lbTIdentificacion" href="#TIdentificacion" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Tipo de Identificacion</asp:LinkButton><!-- id href text-->
                    <asp:LinkButton ID="lbTDireccion" href="#TDireccion" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Tipo de Dirección</asp:LinkButton>
                    <asp:LinkButton ID="lbTCorreo" href="#TCorreo" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Tipo Correo</asp:LinkButton>
                    <asp:LinkButton ID="lbTTelefono" href="#TTelefono" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Tipo de Teléfono</asp:LinkButton>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row">
            <div id="TIdentificacion" class="  col-lg-6 col-md-6 col-sm-12 collapse">
                <!-- id-->
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Tipo de Identificación</h2>
                        <!-- h2-->
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNTipoIdentificacion" href="#modalNTipoIdentificacion" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton><!-- id href-->
                            <asp:LinkButton ID="lbMostrarTipoIdentificacion" href="#secciontblTipoIdentificacion" runat="server" Text="Mostrar Tipo de Identificación" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton><!-- id href text-->
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblTipoIdentificacion" class="table-responsive collapse">
                            <!-- id-->
                            <table id="tblTipoIdentificacion" class="table table-bordered table-hover">
                                <!-- id-->
                                <thead>
                                    <tr>
                                        <!-- campos-->
                                        <th>Id</th>
                                        <th>Tipo de Identificación</th>
                                        <th>Ctrl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyTipoIdentificacion">
                                    <!-- id-->
                                    <!-- ajax-->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div id="TDireccion" class="  col-lg-6 col-md-6 col-sm-12 collapse">
                <!-- id-->
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Tipo de Dirección</h2>
                        <!-- h2-->
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNTipoDireccion" href="#modalNTipoDireccion" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton><!-- id href-->
                            <asp:LinkButton ID="lblMostrarTipoDireccion" href="#secciontblTipoDireccion" runat="server" Text="Mostrar Tipo de Dirección" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton><!-- id href text-->
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblTipoDireccion" class="table-responsive collapse">
                            <!-- id-->
                            <table id="tblTipoDireccion" class="table table-bordered table-hover">
                                <!-- id-->
                                <thead>
                                    <tr>
                                        <!-- campos-->
                                        <th>Id</th>
                                        <th>Tipo de Dirección</th>
                                        <th>Crlt</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyTipoDireccion">
                                    <!-- id-->
                                    <!-- ajax-->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div id="TCorreo" class="  col-lg-6 col-md-6 col-sm-12 collapse">
                <!-- id-->
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Tipo de Correo</h2>
                        <!-- h2-->
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNTipoCorreo" href="#modalNTipoCorreo" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton><!-- id href-->
                            <asp:LinkButton ID="lblMostrarTipoCorreo" href="#secciontblTipoCorreo" runat="server" Text="Mostrar Tipo de Correo" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton><!-- id href text-->
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblTipoCorreo" class="table-responsive collapse">
                            <!-- id-->
                            <table id="tblTipoCorreo" class="table table-bordered table-hover">
                                <!-- id-->
                                <thead>
                                    <tr>
                                        <!-- campos-->
                                        <th>Id</th>
                                        <th>Tipo de Correo</th>
                                        <th>Ctrl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyTipoCorreo">
                                    <!-- id-->
                                    <!-- ajax-->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div id="TTelefono" class="  col-lg-6 col-md-6 col-sm-12 collapse">
                <!-- id-->
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Tipo de Teléfono</h2>
                        <!-- h2-->
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNTipoTelefono" href="#modalNTipoTelefono" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton><!-- id href-->
                            <asp:LinkButton ID="lbMostrarTipoTelefono" href="#secciontblTipoTelefono" runat="server" Text="Mostrar TipoTelefono" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton><!-- id href text-->
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblTipoTelefono" class="table-responsive collapse">
                            <!-- id-->
                            <table id="tblTipoTelefono" class="table table-bordered table-hover">
                                <!-- id-->
                                <thead>
                                    <tr>
                                        <!-- campos-->
                                        <th>Id</th>
                                        <th>Tipo de Teléfono</th>
                                        <th>Ctrl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyTipoTelefono">
                                    <!-- id-->
                                    <!-- ajax-->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="alerta" class="modal bd-example-modal-sm" tabindex="-1" role="dialog" aria-hidden="true">
        <!-- id-->
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"></h5>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="modalNTipoIdentificacion">
        <!-- id-->
        <div class="modal-dialog" role="document">
            <div id="DivModBorTipoIdentificacion" class="modal-content border-success">
                <!-- id-->
                <div id="DivModHeaTipoIdentificacion" class="modal-header bg-success">
                    <!-- id-->
                    <h4 id="H4ModTitTipoIdentificacion">Editar Tipo de Identifiación</h4>
                    <!-- id h4-->
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueTipoIdentificacion" runat="server" data-toggle="validator" role="form">
                        <!-- id-->
                        <label id="lblexistenuevoTipoIdentificacion" for="txtNuevoTipoIdentificacion" runat="server" class="text-warning" text=""></label>
                        <!-- id for-->
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoTipoIdentificacion" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Tipo de Identificación" data-required-error="dddd" pattern="[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]*$" MaxLength="20" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo320NS" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <!-- class popinfoX-->
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <button id="btnNueTipoIdentificacion" tabindex="2" class="btn btn-success pull-right">
                            <!-- id idex(si aplica)-->
                            <i class="fas fa-save fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="modalNTipoDireccion">
        <!-- id-->
        <div class="modal-dialog" role="document">
            <div id="DivModBorTipoDireccion" class="modal-content border-success">
                <!-- id-->
                <div id="DivModHeaTipoDireccion" class="modal-header bg-success">
                    <!-- id-->
                    <h4 id="H4ModTitTipoDireccion">Editar Tipo de Dirección</h4>
                    <!-- id h4-->
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueTipoDireccion" runat="server" data-toggle="validator" role="form">
                        <!-- id-->
                        <label id="lblexistenuevoTipoDireccion" for="txtNuevoTipoDireccion" runat="server" class="text-warning" text=""></label>
                        <!-- id for-->
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoTipoDireccion" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Tipo de Dirección" data-required-error="dddd" pattern="[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]*$" MaxLength="45" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo345NS" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <!-- class popinfoX-->
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <button id="btnNueTipoDireccion" tabindex="2" class="btn btn-success pull-right">
                            <!-- id idex(si aplica)-->
                            <i class="fas fa-save fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="modalNTipoCorreo">
        <!-- id-->
        <div class="modal-dialog" role="document">
            <div id="DivModBorTipoCorreo" class="modal-content border-success">
                <!-- id-->
                <div id="DivModHeaTipoCorreo" class="modal-header bg-success">
                    <!-- id-->
                    <h4 id="H4ModTitTipoCorreo">Editar Tipo de Correo</h4>
                    <!-- id h4-->
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueTipoCorreo" runat="server" data-toggle="validator" role="form">
                        <!-- id-->
                        <label id="lblexistenuevoTipoCorreo" for="txtNuevoTipoCorreo" runat="server" class="text-warning" text=""></label>
                        <!-- id for-->
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoTipoCorreo" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Tipo de Correo" data-required-error="dddd" pattern="[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]*$" MaxLength="45" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo345NS" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <!-- class popinfoX-->
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <button id="btnNueTipoCorreo" tabindex="2" class="btn btn-success pull-right">
                            <!-- id idex(si aplica)-->
                            <i class="fas fa-save fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="modalNTipoTelefono">
        <!-- id-->
        <div class="modal-dialog" role="document">
            <div id="DivModBorTipoTelefono" class="modal-content border-success">
                <!-- id-->
                <div id="DivModHeaTipoTelefono" class="modal-header bg-success">
                    <!-- id-->
                    <h4 id="H4ModTitTipoTelefono">Editar Tipo de Teléfono</h4>
                    <!-- id h4-->
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueTipoTelefono" runat="server" data-toggle="validator" role="form">
                        <!-- id-->
                        <label id="lblexistenuevoTipoTelefono" for="txtNuevoTipoTelefono" runat="server" class="text-warning" text=""></label>
                        <!-- id for-->
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoTipoTelefono" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Tipo de Teléfono" data-required-error="dddd" pattern="[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]*$" MaxLength="45" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo345NS" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <!-- class popinfoX-->
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <button id="btnNueTipoTelefono" tabindex="2" class="btn btn-success pull-right">
                            <!-- id idex(si aplica)-->
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
    <!-- crear para cada tabla-->
       <script src="/js/icp/CRUDETipoIdentificacion.js" type="text/javascript"></script>
       <script src="/js/icp/CRUDETipoDireccion.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDETipoCorreo.js" type="text/javascript"></script>
     <script src="/js/icp/CRUDETipoTelefono.js" type="text/javascript"></script>
</asp:Content>
