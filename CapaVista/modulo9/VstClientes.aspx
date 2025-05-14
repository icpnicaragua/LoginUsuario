<%@ Page Title="" Language="C#" MasterPageFile="~/Pm1.Master" AutoEventWireup="true" CodeBehind="VstClientes.aspx.cs" Inherits="CapaVista.modulo9.VstClientes" ClientIDMode="Static" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/datatables/datatables.css" rel="stylesheet" />
    <link href="/datatables/Buttons-1.5.4/css/buttons.dataTables.min.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="DivNavegadorClientes" class="container-fluid">
        <!-- id-->
        <div class="row">
            <div class="header">
                <h4>Navegador</h4>
                <!-- h4-->
                <div class="form-group">
                    <asp:LinkButton ID="lbEmpresa" href="#Empresa" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Empresas</asp:LinkButton><!-- id href text-->
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid">
        <div class="row">
            <div id="Empresa" class="  col-lg-12 col-md-12 col-sm-12 collapse">
                <!-- id-->
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Empresas</h2>
                        <!-- h2-->
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNEmpresa" href="#modalNEmpresa" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton><!-- id href-->
                            <asp:LinkButton ID="lbMostrarEmpresa" href="#secciontblEmpresa" runat="server" Text="Mostrar Empresa" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton><!-- id href text-->
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblEmpresa" class="table-responsive collapse">
                            <!-- id-->
                            <table id="tblEmpresa" class="table table-bordered table-hover">
                                <!-- id-->
                                <thead>
                                    <tr>
                                        <!-- campos-->
                                        <th>Id</th>
                                        <th>Nombre Comercial</th>
                                        <th>Razón Social</th>
                                        <th>Ruc</th>
                                        <th>Tipo de Empresa</th>
                                        <th>Régimen</th>
                                        <th>Ctrl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyEmpresa">
                                    <!-- id-->
                                    <!-- ajax-->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
        <div class="row collapse" id="DatosEmpresa">
            <div id="TelefonoEmpresa" class="  col-lg-4 col-md-6 col-sm-12 ">
                <!-- id-->
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Teléfono</h2>
                        <!-- h2-->
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNTelefonoEmpresa" href="#modalNTelefonoEmpresa" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton><!-- id href-->
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblTelefonoEmpresa" class="table-responsive ">
                            <!-- id-->
                            <table id="tblTelefonoEmpresa" class="table table-bordered table-hover">
                                <!-- id-->
                                <thead>
                                    <tr>
                                        <!-- campos-->
                                        <th>Id</th>
                                        <th>Teléfono</th>
                                        <th>Tipo de Teléfono</th>
                                        <th>Ctrl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyTelefonoEmpresa">
                                    <!-- id-->
                                    <!-- ajax-->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div id="DireccionEmpresa" class="  col-lg-4 col-md-6 col-sm-12 ">
                <!-- id-->
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Dirección</h2>
                        <!-- h2-->
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNDireccionEmpresa" href="#modalNDireccionEmpresa" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton><!-- id href-->
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblDireccionEmpresa" class="table-responsive ">
                            <!-- id-->
                            <table id="tblDireccionEmpresa" class="table table-bordered table-hover">
                                <!-- id-->
                                <thead>
                                    <tr>
                                        <!-- campos-->
                                        <th>Id</th>
                                        <th>Dirección</th>
                                        <th>Tipo de Dirección</th>
                                        <th>Barrio</th>
                                        <th>Municipio</th>
                                        <th>Departamento</th>
                                        <th>Ctrl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyDireccionEmpresa">
                                    <!-- id-->
                                    <!-- ajax-->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div id="CorreoEmpresa" class="  col-lg-4 col-md-6 col-sm-12 ">
                <!-- id-->
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Correo</h2>
                        <!-- h2-->
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNCorreoEmpresa" href="#modalNCorreoEmpresa" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton><!-- id href-->
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblCorreoEmpresa" class="table-responsive ">
                            <!-- id-->
                            <table id="tblCorreoEmpresa" class="table table-bordered table-hover">
                                <!-- id-->
                                <thead>
                                    <tr>
                                        <!-- campos-->
                                        <th>Id</th>
                                        <th>Correo</th>
                                        <th>Tipo de Correo</th>
                                        <th>Ctrl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyCorreoEmpresa">
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
        </div>

    </div>

    <div id="alertaClientes" class="modal bd-example-modal-sm" tabindex="-1" role="dialog" aria-hidden="true">
        <!-- id-->
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"></h5>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modalNEmpresa">
        <!-- id-->
        <div class="modal-dialog" role="document">
            <div id="DivModBorEmpresa" class="modal-content border-success">
                <!-- id-->
                <div id="DivModHeaEmpresa" class="modal-header bg-success">
                    <!-- id-->
                    <h4 id="H4ModTitEmpresa">Editar Empresa</h4>
                    <!-- id h4-->
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueEmpresa" runat="server" data-toggle="validator" role="form">
                        <!-- id-->
                        <label id="lblexistenuevoEmpresa" for="txtNuevoEmpresa" runat="server" class="text-warning" text=""></label>
                        <!-- id for-->
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoEmpresa" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Nombre comercial" data-required-error="dddd" pattern="[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]*$" MaxLength="45" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo345NS" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <!-- class popinfoX-->
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoRazonSocial" runat="server" TabIndex="2" CssClass="form-control" placeholder="Nuevo Razón Social" data-required-error="dddd" pattern="[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]*$" MaxLength="45" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo345NS" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <!-- class popinfoX-->
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoRuc" runat="server" TabIndex="3" CssClass="form-control" placeholder="Nuevo RUC" data-required-error="dddd" pattern="[a-zA-Z0-9\s]*$" MaxLength="45" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo345NS" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <!-- class popinfoX-->
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCEmpresaTipoEmpresa" TabIndex="4" CssClass="form-control border-success" runat="server">
                                <%--id tap xxxx--%>
                            </asp:DropDownList>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCEmpresaRegimen" TabIndex="5" CssClass="form-control border-success" runat="server">
                                <%--id tap xxxx--%>
                            </asp:DropDownList>
                        </div>
                        <button id="btnNueEmpresa" tabindex="6" class="btn btn-success pull-right">
                            <!-- id idex(si aplica)-->
                            <i class="fas fa-save fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modalNDireccionEmpresa">
        <!-- id-->
        <div class="modal-dialog" role="document">
            <div id="DivModBorDireccionEmpresa" class="modal-content border-success">
                <!-- id-->
                <div id="DivModHeaDireccionEmpresa" class="modal-header bg-success">
                    <!-- id-->
                    <h4 id="H4ModTitDireccionEmpresa">Editar Dirección</h4>
                    <!-- id h4-->
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueDireccionEmpresa" runat="server" data-toggle="validator" role="form">
                        <!-- id-->
                        <label id="lblexistenuevoDireccionEmpresa" for="txtNuevoDireccionEmpresa" runat="server" class="text-warning" text=""></label>
                        <!-- id for-->
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoDireccionEmpresa" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Dirección" data-required-error="dddd" pattern="[a-zA-Z0-9ñÑ\s]*$" MaxLength="150" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo3150NS" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <!-- class popinfoX-->
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCDireccionEmpresaTipoDireccionEmpresa" TabIndex="2" CssClass="form-control border-success" runat="server">
                                <%--id tap xxxx--%>
                            </asp:DropDownList>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCDepartamentoEmpresa" TabIndex="3" CssClass="form-control border-success" runat="server">
                                <%--id tap xxxx--%>
                            </asp:DropDownList>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCMunicipioEmpresa" TabIndex="4" CssClass="form-control border-success" runat="server">
                                <%--id tap xxxx--%>
                            </asp:DropDownList>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCBarrioEmpresa" TabIndex="5" CssClass="form-control border-success" runat="server">
                                <%--id tap xxxx--%>
                            </asp:DropDownList>
                        </div>
                        <button id="btnNueDireccionEmpresa" tabindex="6" class="btn btn-success pull-right">
                            <!-- id idex(si aplica)-->
                            <i class="fas fa-save fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modalNTelefonoEmpresa">
        <!-- id-->
        <div class="modal-dialog" role="document">
            <div id="DivModBorTelefonoEmpresa" class="modal-content border-success">
                <!-- id-->
                <div id="DivModHeaTelefonoEmpresa" class="modal-header bg-success">
                    <!-- id-->
                    <h4 id="H4ModTitTelefonoEmpresa">Editar Teléfono</h4>
                    <!-- id h4-->
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueTelefonoEmpresa" runat="server" data-toggle="validator" role="form">
                        <!-- id-->
                        <label id="lblexistenuevoTelefonoEmpresa" for="txtNuevoTelefonoEmpresa" runat="server" class="text-warning" text=""></label>
                        <!-- id for-->
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoTelefonoEmpresa" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Teléfono" data-required-error="dddd" pattern="[0-9\s]*$" MaxLength="15" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfoNum" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <!-- class popinfoX-->
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCTelefonoEmpresaTipoTelefonoEmpresa" TabIndex="2" CssClass="form-control border-success" runat="server">
                                <%--id tap xxxx--%>
                            </asp:DropDownList>
                        </div>


                        <button id="btnNueTelefonoEmpresa" tabindex="3" class="btn btn-success pull-right">
                            <!-- id idex(si aplica)-->
                            <i class="fas fa-save fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modalNCorreoEmpresa">
        <!-- id-->
        <div class="modal-dialog" role="document">
            <div id="DivModBorCorreoEmpresa" class="modal-content border-success">
                <!-- id-->
                <div id="DivModHeaCorreoEmpresa" class="modal-header bg-success">
                    <!-- id-->
                    <h4 id="H4ModTitCorreoEmpresa">Editar Correo</h4>
                    <!-- id h4-->
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueCorreoEmpresa" runat="server" data-toggle="validator" role="form">
                        <!-- id-->
                        <label id="lblexistenuevoCorreoEmpresa" for="txtNuevoCorreoEmpresa" runat="server" class="text-warning" text=""></label>
                        <!-- id for-->
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoCorreoEmpresa" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Correo" data-required-error="dddd" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" MaxLength="50" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfoMAIL" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <!-- class popinfoX-->
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCCorreoEmpresaTipoCorreoEmpresa" TabIndex="2" CssClass="form-control border-success" runat="server">
                                <%--id tap xxxx--%>
                            </asp:DropDownList>
                        </div>
                        <button id="btnNueCorreoEmpresa" tabindex="3" class="btn btn-success pull-right">
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
    <script src="/js/icp/CRUDEEmpresa.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDETelefonoEmpresa.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDEDireccionEmpresa.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDECorreoEmpresa.js" type="text/javascript"></script>
</asp:Content>
