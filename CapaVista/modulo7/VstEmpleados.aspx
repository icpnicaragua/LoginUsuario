<%@ Page Title="" Language="C#" MasterPageFile="~/Pm1.Master" AutoEventWireup="true" CodeBehind="VstEmpleados.aspx.cs" Inherits="CapaVista.modulo7.VstEmpleados" ClientIDMode="Static" %>

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
    <div class="container-fluid">
        <div class="row">
            <div id="Area" class="  col-lg-6 col-md-6 col-sm-12 collapse">
                <!-- id-->
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Área</h2>
                        <!-- h2-->
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNArea" href="#modalNArea" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton><!-- id href-->
                            <asp:LinkButton ID="lbMostrarArea" href="#secciontblArea" runat="server" Text="Mostrar Área" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton><!-- id href text-->
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblArea" class="table-responsive collapse">
                            <!-- id-->
                            <table id="tblArea" class="table table-bordered table-hover">
                                <!-- id-->
                                <thead>
                                    <tr>
                                        <!-- campos-->
                                        <th>Id</th>
                                        <th>Área</th>
                                        <th>Ctrl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyArea">
                                    <!-- id-->
                                    <!-- ajax-->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div id="Empleado" class="  col-lg-6 col-md-6 col-sm-12 collapse">
                <!-- id-->
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Empleado</h2>
                        <!-- h2-->
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNEmpleado" href="#Persona" data-toggle="collapse" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton><!-- id href-->
                            <asp:LinkButton ID="lbMostrarEmpleado" href="#secciontblEmpleado" runat="server" Text="Mostrar Empleado" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton><!-- id href text-->
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblEmpleado" class="table-responsive collapse">
                            <!-- id-->
                            <table id="tblEmpleado" class="table table-bordered table-hover">
                                <!-- id-->
                                <thead>
                                    <tr>
                                        <!-- campos-->
                                        <th>Id</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Área</th>
                                        <th>Jefe</th>
                                        <th>Ctrl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyEmpleado">
                                    <!-- id-->
                                    <!-- ajax-->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div id="Persona" class="  col-lg-12 col-md-12 col-sm-12 collapse">
                <!-- id-->
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Personas</h2>
                        <!-- h2-->
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNPersona" href="#modalNPersona" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x collapse MostrarPersona"></i></asp:LinkButton><!-- id href-->
                            <asp:LinkButton ID="lbMostrarPersona" href="#secciontblPersona" runat="server" Text="Mostrar Personas" CssClass="btn btn-info btn3d" data-toggle="collapse" data-target=".MostrarPersona"><i class="far fa-eye fa-2x"></i></asp:LinkButton><!-- id href text-->
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblPersona" class="table-responsive collapse MostrarPersona">
                            <!-- id-->
                            <table id="tblPersona" class="table table-bordered table-hover">
                                <!-- id-->
                                <thead>
                                    <tr>
                                        <!-- campos-->
                                        <th>Id</th>
                                        <th>Nombre1</th>
                                        <th>Nombre2</th>
                                        <th>Apellido1</th>
                                        <th>Apellido2</th>
                                        <th>Género</th>
                                        <th>Ctrl</th>

                                    </tr>
                                </thead>
                                <tbody id="tblBodyPersona" data-toggle="collapse" data-target="#DatosPersona">
                                    <!-- id-->
                                    <!-- ajax-->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="row collapse" id="DatosPersona">
                    <div id="Identificacion" class="  col-lg-3 col-md-6 col-sm-12 ">
                        <!-- id-->
                        <div class="card bg-light mb-3">
                            <div class="card-header">
                                <h2 class="d-inline-block">Identificación</h2>
                                <!-- h2-->
                                <div class="d-inline-block pull-right">
                                    <asp:LinkButton ID="lbNIdentificacion" href="#modalNIdentificacion" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton><!-- id href-->
                                </div>
                            </div>
                            <div class="card-body">
                                <div id="secciontblIdentificacion" class="table-responsive ">
                                    <!-- id-->
                                    <table id="tblIdentificacion" class="table table-bordered table-hover">
                                        <!-- id-->
                                        <thead>
                                            <tr>
                                                <!-- campos-->
                                                <th>Id</th>
                                                <th>Identificación</th>
                                                <th>Tipo de Identificación</th>
                                                <th>Ctrl</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tblBodyIdentificacion">
                                            <!-- id-->
                                            <!-- ajax-->
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="Telefono" class="  col-lg-3 col-md-6 col-sm-12 ">
                        <!-- id-->
                        <div class="card bg-light mb-3">
                            <div class="card-header">
                                <h2 class="d-inline-block">Teléfono</h2>
                                <!-- h2-->
                                <div class="d-inline-block pull-right">
                                    <asp:LinkButton ID="lbNTelefono" href="#modalNTelefono" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton><!-- id href-->
                                </div>
                            </div>
                            <div class="card-body">
                                <div id="secciontblTelefono" class="table-responsive ">
                                    <!-- id-->
                                    <table id="tblTelefono" class="table table-bordered table-hover">
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
                                        <tbody id="tblBodyTelefono">
                                            <!-- id-->
                                            <!-- ajax-->
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="Direccion" class="  col-lg-3 col-md-6 col-sm-12 ">
                        <!-- id-->
                        <div class="card bg-light mb-3">
                            <div class="card-header">
                                <h2 class="d-inline-block">Dirección</h2>
                                <!-- h2-->
                                <div class="d-inline-block pull-right">
                                    <asp:LinkButton ID="lbNDireccion" href="#modalNDireccion" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton><!-- id href-->
                                </div>
                            </div>
                            <div class="card-body">
                                <div id="secciontblDireccion" class="table-responsive ">
                                    <!-- id-->
                                    <table id="tblDireccion" class="table table-bordered table-hover">
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
                                        <tbody id="tblBodyDireccion">
                                            <!-- id-->
                                            <!-- ajax-->
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="Correo" class="  col-lg-3 col-md-6 col-sm-12 ">
                        <!-- id-->
                        <div class="card bg-light mb-3">
                            <div class="card-header">
                                <h2 class="d-inline-block">Correo</h2>
                                <!-- h2-->
                                <div class="d-inline-block pull-right">
                                    <asp:LinkButton ID="lbNCorreo" href="#modalNCorreo" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton><!-- id href-->
                                </div>
                            </div>
                            <div class="card-body">
                                <div id="secciontblCorreo" class="table-responsive ">
                                    <!-- id-->
                                    <table id="tblCorreo" class="table table-bordered table-hover">
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
                                        <tbody id="tblBodyCorreo">
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
    <div id="alertaEmpleados" class="modal bd-example-modal-sm" tabindex="-1" role="dialog" aria-hidden="true">
        <!-- id-->
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"></h5>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="modalNArea">
        <!-- id-->
        <div class="modal-dialog" role="document">
            <div id="DivModBorArea" class="modal-content border-success">
                <!-- id-->
                <div id="DivModHeaArea" class="modal-header bg-success">
                    <!-- id-->
                    <h4 id="H4ModTitArea">Editar Área</h4>
                    <!-- id h4-->
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueArea" runat="server" data-toggle="validator" role="form">
                        <!-- id-->
                        <label id="lblexistenuevoArea" for="txtNuevoArean" runat="server" class="text-warning" text=""></label>
                        <!-- id for-->
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoArea" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Area" data-required-error="dddd" pattern="[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]*$" MaxLength="45" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo345NS" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <!-- class popinfoX-->
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <button id="btnNueArea" tabindex="2" class="btn btn-success pull-right">
                            <!-- id idex(si aplica)-->
                            <i class="fas fa-save fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="modalNEmpleado">
        <!-- id-->
        <div class="modal-dialog" role="document">
            <div id="DivModBorEmpleado" class="modal-content border-success">
                <!-- id-->
                <div id="DivModHeaEmpleado" class="modal-header bg-success">
                    <!-- id-->
                    <h4 id="H4ModTitEmpleado">Editar Empleado</h4>
                    <!-- id h4-->
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueEmpleado" runat="server" data-toggle="validator" role="form">
                        <!-- id-->
                        <label id="lblexistenuevoEmpleado" for="txtNuevoEmpleadoNombre1" runat="server" class="text-warning" text=""></label>
                        <!-- id for-->
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoEmpleadoNombre1" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Nombre1" data-required-error="dddd" ClientIDMode="Static"></asp:TextBox><!-- id placeholder-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <!-- class popinfoX-->
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoEmpleadoApellido1" runat="server" TabIndex="2" CssClass="form-control" placeholder="Nuevo Nombre1" data-required-error="dddd" ClientIDMode="Static"></asp:TextBox><!-- id placeholder-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <!-- class popinfoX-->
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCEmpleadoArea" TabIndex="3" CssClass="form-control border-success" runat="server">
                                <%--id tap xxxx--%>
                            </asp:DropDownList>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCEmpleadoJefe" TabIndex="4" CssClass="form-control border-success" runat="server">
                                <%--id tap xxxx--%>
                            </asp:DropDownList>
                        </div>
                        <button id="btnNueEmpleado" tabindex="5" class="btn btn-success pull-right">
                            <!-- id idex(si aplica)-->
                            <i class="fas fa-save fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="modal" id="modalNPersona">
        <!-- id-->
        <div class="modal-dialog" role="document">
            <div id="DivModBorPersona" class="modal-content border-success">
                <!-- id-->
                <div id="DivModHeaPersona" class="modal-header bg-success">
                    <!-- id-->
                    <h4 id="H4ModTitPersona">Editar Persona</h4>
                    <!-- id h4-->
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnuePersona" runat="server" data-toggle="validator" role="form">
                        <!-- id-->
                        <label id="lblexistenuevoPersona" for="txtNuevoPersona" runat="server" class="text-warning" text=""></label>
                        <!-- id for-->

                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoNombre1" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Nombre1" data-required-error="dddd" pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$" MaxLength="20" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo320S" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <!-- class popinfoX-->
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoNombre2" runat="server" TabIndex="2" CssClass="form-control" placeholder="Nuevo Nombre2" data-required-error="dddd" pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$" MaxLength="20" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo320S" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <!-- class popinfoX-->
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoApellido1" runat="server" TabIndex="3" CssClass="form-control" placeholder="Nuevo Apellido1" data-required-error="dddd" pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$" MaxLength="20" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo320S" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <!-- class popinfoX-->
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoApellido2" runat="server" TabIndex="4" CssClass="form-control" placeholder="Nuevo Apellido2" data-required-error="dddd" pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$" MaxLength="20" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo320S" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <!-- class popinfoX-->
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCPersonaGenero" TabIndex="5" CssClass="form-control border-success" runat="server">
                                <%--id tap xxxx--%>
                            </asp:DropDownList>
                        </div>

                        <button id="btnNuePersona" tabindex="6" class="btn btn-success pull-right">
                            <!-- id idex(si aplica)-->
                            <i class="fas fa-save fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modalNDireccion">
        <!-- id-->
        <div class="modal-dialog" role="document">
            <div id="DivModBorDireccion" class="modal-content border-success">
                <!-- id-->
                <div id="DivModHeaDireccion" class="modal-header bg-success">
                    <!-- id-->
                    <h4 id="H4ModTitDireccion">Editar Dirección</h4>
                    <!-- id h4-->
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueDireccion" runat="server" data-toggle="validator" role="form">
                        <!-- id-->
                        <label id="lblexistenuevoDireccion" for="txtNuevoDireccion" runat="server" class="text-warning" text=""></label>
                        <!-- id for-->
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoDireccion" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Dirección" data-required-error="dddd" pattern="[a-zA-Z0-9ñÑ\s]*$" MaxLength="150" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo3150NS" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <!-- class popinfoX-->
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group md-3">

                            <asp:DropDownList ID="ddlCDireccionTipoDireccion" TabIndex="2" CssClass="form-control border-success" runat="server">
                                <%--id tap xxxx--%>
                            </asp:DropDownList>


                        </div>
                        <div class="input-group md-3">

                            <asp:DropDownList ID="ddlCDepartamento" TabIndex="3" CssClass="form-control border-success" runat="server">
                                <%--id tap xxxx--%>
                            </asp:DropDownList>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCMunicipio" TabIndex="4" CssClass="form-control border-success" runat="server">
                                <%--id tap xxxx--%>
                            </asp:DropDownList>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCBarrio" TabIndex="5" CssClass="form-control border-success" runat="server">
                                <%--id tap xxxx--%>
                            </asp:DropDownList>
                        </div>
                        <button id="btnNueDireccion" tabindex="6" class="btn btn-success pull-right">
                            <!-- id idex(si aplica)-->
                            <i class="fas fa-save fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="modal" id="modalNIdentificacion">
        <!-- id-->
        <div class="modal-dialog" role="document">
            <div id="DivModBorIdentificacion" class="modal-content border-success">
                <!-- id-->
                <div id="DivModHeaIdentificacion" class="modal-header bg-success">
                    <!-- id-->
                    <h4 id="H4ModTitIdentificacion">Editar Identificación</h4>
                    <!-- id h4-->
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueIdentificacion" runat="server" data-toggle="validator" role="form">
                        <!-- id-->
                        <label id="lblexistenuevoIdentificacion" for="txtNuevoIdentificacion" runat="server" class="text-warning" text=""></label>
                        <!-- id for-->
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoIdentificacion" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Identifiación" data-required-error="dddd" pattern="[a-zA-Z0-9ñÑ\s]*$" MaxLength="20" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo320NS" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <!-- class popinfoX-->
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCIdentificacionTipoIdentificacion" TabIndex="2" CssClass="form-control border-success" runat="server">
                                <%--id tap xxxx--%>
                            </asp:DropDownList>
                        </div>
                        <button id="btnNueIdentificacion" tabindex="3" class="btn btn-success pull-right">
                            <!-- id idex(si aplica)-->
                            <i class="fas fa-save fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modalNTelefono">
        <!-- id-->
        <div class="modal-dialog" role="document">
            <div id="DivModBorTelefono" class="modal-content border-success">
                <!-- id-->
                <div id="DivModHeaTelefono" class="modal-header bg-success">
                    <!-- id-->
                    <h4 id="H4ModTitTelefono">Editar Teléfono</h4>
                    <!-- id h4-->
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueTelefono" runat="server" data-toggle="validator" role="form">
                        <!-- id-->
                        <label id="lblexistenuevoTelefono" for="txtNuevoTelefono" runat="server" class="text-warning" text=""></label>
                        <!-- id for-->
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoTelefono" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Teléfono" data-required-error="dddd" pattern="[0-9\s]*$" MaxLength="15" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfoNum" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <!-- class popinfoX-->
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCTelefonoTipoTelefono" TabIndex="2" CssClass="form-control border-success" runat="server">
                                <%--id tap xxxx--%>
                            </asp:DropDownList>
                        </div>


                        <button id="btnNueTelefono" tabindex="3" class="btn btn-success pull-right">
                            <!-- id idex(si aplica)-->
                            <i class="fas fa-save fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modalNCorreo">
        <!-- id-->
        <div class="modal-dialog" role="document">
            <div id="DivModBorCorreo" class="modal-content border-success">
                <!-- id-->
                <div id="DivModHeaCorreo" class="modal-header bg-success">
                    <!-- id-->
                    <h4 id="H4ModTitCorreo">Editar Correo</h4>
                    <!-- id h4-->
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueCorreo" runat="server" data-toggle="validator" role="form">
                        <!-- id-->
                        <label id="lblexistenuevoCorreo" for="txtNuevoCorreo" runat="server" class="text-warning" text=""></label>
                        <!-- id for-->
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoCorreo" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Correo" data-required-error="dddd" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" MaxLength="50" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfoMAIL" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <!-- class popinfoX-->
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCCorreoTipoCorreo" TabIndex="2" CssClass="form-control border-success" runat="server">
                                <%--id tap xxxx--%>
                            </asp:DropDownList>
                        </div>
                        <button id="btnNueCorreo" tabindex="3" class="btn btn-success pull-right">
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
    <script src="/js/icp/CRUDEArea.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDEPersonajs.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDEIdentificacion.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDETelefono.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDECorreo.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDEDireccion.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDEEmpleado.js" type="text/javascript"></script>
</asp:Content>
