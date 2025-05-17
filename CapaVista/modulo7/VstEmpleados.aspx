<%@ Page Title="" Language="C#" MasterPageFile="~/Pm1.Master" AutoEventWireup="true" CodeBehind="VstEmpleados.aspx.cs" Inherits="CapaVista.modulo7.VstEmpleados" ClientIDMode="Static" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/datatables/datatables.css" rel="stylesheet" />
    <link href="/datatables/Buttons-1.5.4/css/buttons.dataTables.min.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="DivNavegadorEmpleados" class="container-fluid">
        <div class="row">
            <div class="header">
                <h4>Administrar Empleados</h4>
                <div class="form-group">
                    <asp:LinkButton ID="lbArea" href="#Area" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Área</asp:LinkButton>
                    <asp:LinkButton ID="lbCargo" href="#Cargo" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Cargo</asp:LinkButton>
                    <asp:LinkButton ID="lbEmpleado" href="#Empleado" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Empleados</asp:LinkButton>
                    <asp:LinkButton ID="lbCargoEmpleado" href="#CargoEmpleado" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Cargo del Empleado</asp:LinkButton>
                </div>
            </div>
        </div>
    </div>
    <div id="DivNavegadorInfo" class="container-fluid">
        <div class="row">
            <div class="header">
                <h4>Administrar Datos personales de Personas</h4>
                <div class="form-group">
                    <asp:LinkButton ID="lbPersona" href="#Persona" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Personas</asp:LinkButton>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row">
            <div id="Area" class="col-lg-6 col-md-6 col-sm-12 collapse bg-info">
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Área</h2>
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNArea" href="#modalNArea" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton>
                            <asp:LinkButton ID="lbMostrarArea" href="#secciontblArea" runat="server" Text="Mostrar Área" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton>
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblArea" class="table-responsive collapse">
                            <table id="tblArea" class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Área</th>
                                        <th>Ctrl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyArea">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div id="Cargo" class="  col-lg-6 col-md-6 col-sm-12 collapse">
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Cargo</h2>
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNCargo" href="#modalNCargo" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton><!-- id href-->
                            <asp:LinkButton ID="lbMostrarCargo" href="#secciontblCargo" runat="server" Text="Mostrar Cargo" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton><!-- id href text-->
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblCargo" class="table-responsive collapse">
                            <table id="tblCargo" class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Cargo</th>
                                        <th>Ctrl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyCargo">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div id="CargoEmpleado" class="  col-lg-6 col-md-6 col-sm-12 collapse">
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Cargo del Empleado</h2>
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNCargoEmpleado" href="#modalNCargoEmpleado" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton><!-- id href-->
                            <asp:LinkButton ID="lbMostrarCargoEmpleado" href="#secciontblCargoEmpleado" runat="server" Text="Mostrar CargoEmpleado" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton><!-- id href text-->
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblCargoEmpleado" class="table-responsive collapse">
                            <table id="tblCargoEmpleado" class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Cargo</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Ctrl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyCargoEmpleado">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div id="Empleado" class="col-lg-6 col-md-6 col-sm-12 collapse bg-success">
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Empleado</h2>
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNEmpleado" href="#EmpleadoNPersona" data-toggle="collapse" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton>
                            <asp:LinkButton ID="lbMostrarEmpleado" href="#secciontblEmpleado" runat="server" Text="Mostrar Empleado" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton>
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblEmpleado" class="table-responsive collapse">
                            <table id="tblEmpleado" class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Área</th>
                                        <th>Jefe</th>
                                        <th>Ctrl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyEmpleado">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div id="EmpleadoNPersona" class="  col-lg-12 col-md-12 col-sm-12 collapse">
                        <div class="card bg-light mb-3">
                            <div class="card-header">
                                <h2 class="d-inline-block">Agregar Personas a Empleado</h2>
                                <div class="d-inline-block pull-right">
                                </div>
                            </div>
                            <div class="card-body">
                                <div id="secciontblEmpleadoNPersona" class="table-responsive">
                                    <table id="tblEmpleadoNPersona" class="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Nombre1</th>
                                                <th>Apellido1</th>
                                                <th>Ctrl</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tblBodyEmpleadoNPersona">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div id="Persona" class="col-lg-12 col-md-12 col-sm-12 collapse bg-primary">
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Personas</h2>
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNPersona" href="#modalNPersona" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton>
                            <asp:LinkButton ID="lbMostrarPersona" href="#secciontblPersona" runat="server" Text="Mostrar Personas" CssClass="btn btn-info btn3d" data-toggle="collapse" data-target=".MostrarPersona"><i class="far fa-eye fa-2x"></i></asp:LinkButton>
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblPersona" class="table-responsive">
                            <table id="tblPersona" class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nombre1</th>
                                        <th>Nombre2</th>
                                        <th>Apellido1</th>
                                        <th>Apellido2</th>
                                        <th>Género</th>
                                        <th>Ctrl</th>

                                    </tr>
                                </thead>
                                <tbody id="tblBodyPersona">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="row collapse" id="DatosPersona">
                    <div id="Identificacion" class="  col-lg-3 col-md-6 col-sm-12 ">
                        <div class="card bg-light mb-3">
                            <div class="card-header">
                                <h2 class="d-inline-block">Identificación</h2>
                                <div class="d-inline-block pull-right">
                                    <asp:LinkButton ID="lbNIdentificacion" href="#modalNIdentificacion" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton>
                                </div>
                            </div>
                            <div class="card-body">
                                <div id="secciontblIdentificacion" class="table-responsive ">
                                    <table id="tblIdentificacion" class="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Identificación</th>
                                                <th>Tipo de Identificación</th>
                                                <th>Ctrl</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tblBodyIdentificacion">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="Telefono" class="  col-lg-3 col-md-6 col-sm-12 ">
                        <div class="card bg-light mb-3">
                            <div class="card-header">
                                <h2 class="d-inline-block">Teléfono</h2>
                                <div class="d-inline-block pull-right">
                                    <asp:LinkButton ID="lbNTelefono" href="#modalNTelefono" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton>
                                </div>
                            </div>
                            <div class="card-body">
                                <div id="secciontblTelefono" class="table-responsive ">
                                    <table id="tblTelefono" class="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Teléfono</th>
                                                <th>Tipo de Teléfono</th>
                                                <th>Ctrl</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tblBodyTelefono">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="Direccion" class="  col-lg-3 col-md-6 col-sm-12 ">
                        <div class="card bg-light mb-3">
                            <div class="card-header">
                                <h2 class="d-inline-block">Dirección</h2>
                                <div class="d-inline-block pull-right">
                                    <asp:LinkButton ID="lbNDireccion" href="#modalNDireccion" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton>
                                </div>
                            </div>
                            <div class="card-body">
                                <div id="secciontblDireccion" class="table-responsive ">
                                    <table id="tblDireccion" class="table table-bordered table-hover">
                                        <thead>
                                            <tr>
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
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="Correo" class="  col-lg-3 col-md-6 col-sm-12 ">
                        <div class="card bg-light mb-3">
                            <div class="card-header">
                                <h2 class="d-inline-block">Correo</h2>
                                <div class="d-inline-block pull-right">
                                    <asp:LinkButton ID="lbNCorreo" href="#modalNCorreo" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton>
                                </div>
                            </div>
                            <div class="card-body">
                                <div id="secciontblCorreo" class="table-responsive ">
                                    <table id="tblCorreo" class="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Correo</th>
                                                <th>Tipo de Correo</th>
                                                <th>Ctrl</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tblBodyCorreo">
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
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"></h5>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="modalNArea">
        <div class="modal-dialog" role="document">
            <div id="DivModBorArea" class="modal-content border-success">
                <div id="DivModHeaArea" class="modal-header bg-success">
                    <h4 id="H4ModTitArea">Editar Área</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueArea" runat="server" data-toggle="validator" role="form">
                        <label id="lblexistenuevoArea" for="txtNuevoArean" runat="server" class="text-warning" text=""></label>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoArea" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Area" data-required-error="dddd" pattern="[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]*$" MaxLength="45" ClientIDMode="Static"></asp:TextBox>
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo345NS" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <button id="btnNueArea" tabindex="2" class="btn btn-success pull-right">
                            <i class="fas fa-save fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modalNCargo">
        <div class="modal-dialog" role="document">
            <div id="DivModBorCargo" class="modal-content border-success">
                <div id="DivModHeaCargo" class="modal-header bg-success">
                    <h4 id="H4ModTitCargo">Editar Cargo</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueCargo" runat="server" data-toggle="validator" role="form">
                        <label id="lblexistenuevoCargo" for="txtNuevoCargo" runat="server" class="text-warning" text=""></label>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoCargo" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Cargo" data-required-error="dddd" pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$" MaxLength="45" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo45" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <button id="btnNueCargo" tabindex="2" class="btn btn-success pull-right">
                            <i class="fas fa-save fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modalNCargoEmpleado">
        <div class="modal-dialog" role="document">
            <div id="DivModBorCargoEmpleado" class="modal-content border-success">
                <div id="DivModHeaCargoEmpleado" class="modal-header bg-success">
                    <h4 id="H4ModTitCargoEmpleado">Editar Cargo del Empleado</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueCargoEmpleado" runat="server" data-toggle="validator" role="form">
                        <label id="lblexistenuevoCargoEmpleado" for="ddlCCargoEmpleadoCargo" runat="server" class="text-warning" text=""></label>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCCargoEmpleadoCargo" TabIndex="1" CssClass="form-control border-success" runat="server">
                            </asp:DropDownList>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCCargoEmpleadoEmpleado" TabIndex="2" CssClass="form-control border-success" runat="server">
                            </asp:DropDownList>
                        </div>
                        <button id="btnNueCargoEmpleado" tabindex="3" class="btn btn-success pull-right">
                            <i class="fas fa-save fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="modal" id="modalNEmpleado">
        <div class="modal-dialog" role="document">
            <div id="DivModBorEmpleado" class="modal-content border-success">
                <div id="DivModHeaEmpleado" class="modal-header bg-success">
                    <h4 id="H4ModTitEmpleado">Editar Empleado</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueEmpleado" runat="server" data-toggle="validator" role="form">
                        <label id="lblexistenuevoEmpleado" for="txtNuevoEmpleadoNombre1" runat="server" class="text-warning" text=""></label>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoEmpleadoNombre1" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Nombre1" data-required-error="dddd" ClientIDMode="Static"></asp:TextBox>
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoEmpleadoApellido1" runat="server" TabIndex="2" CssClass="form-control" placeholder="Nuevo Nombre1" data-required-error="dddd" ClientIDMode="Static"></asp:TextBox>
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCEmpleadoArea" TabIndex="3" CssClass="form-control border-success" runat="server">
                            </asp:DropDownList>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCEmpleadoJefe" TabIndex="4" CssClass="form-control border-success" runat="server">
                            </asp:DropDownList>
                        </div>
                        <button id="btnNueEmpleado" tabindex="5" class="btn btn-success pull-right">
                            <i class="fas fa-save fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modalNPersona">
        <div class="modal-dialog" role="document">
            <div id="DivModBorPersona" class="modal-content border-success">
                <div id="DivModHeaPersona" class="modal-header bg-success">
                    <h4 id="H4ModTitPersona">Editar Persona</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnuePersona" runat="server" data-toggle="validator" role="form">
                        <label id="lblexistenuevoPersona" for="txtNuevoPersona" runat="server" class="text-warning" text=""></label>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoNombre1" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Nombre1" data-required-error="dddd" pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$" MaxLength="20" ClientIDMode="Static"></asp:TextBox>
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo320S" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoNombre2" runat="server" TabIndex="2" CssClass="form-control" placeholder="Nuevo Nombre2" data-required-error="dddd" pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$" MaxLength="20" ClientIDMode="Static"></asp:TextBox>
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo320S" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoApellido1" runat="server" TabIndex="3" CssClass="form-control" placeholder="Nuevo Apellido1" data-required-error="dddd" pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$" MaxLength="20" ClientIDMode="Static"></asp:TextBox>
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo320S" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoApellido2" runat="server" TabIndex="4" CssClass="form-control" placeholder="Nuevo Apellido2" data-required-error="dddd" pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$" MaxLength="20" ClientIDMode="Static"></asp:TextBox>
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo320S" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCPersonaGenero" TabIndex="5" CssClass="form-control border-success" runat="server">
                            </asp:DropDownList>
                        </div>

                        <button id="btnNuePersona" tabindex="6" class="btn btn-success pull-right">
                            <i class="fas fa-save fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="modalNDireccion">
        <div class="modal-dialog" role="document">
            <div id="DivModBorDireccion" class="modal-content border-success">
                <div id="DivModHeaDireccion" class="modal-header bg-success">
                    <h4 id="H4ModTitDireccion">Editar Dirección</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueDireccion" runat="server" data-toggle="validator" role="form">
                        <label id="lblexistenuevoDireccion" for="txtNuevoDireccion" runat="server" class="text-warning" text=""></label>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoDireccion" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Dirección" data-required-error="dddd" pattern="[a-zA-Z0-9ñÑ\s]*$" MaxLength="150" ClientIDMode="Static"></asp:TextBox>
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo3150NS" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group md-3">

                            <asp:DropDownList ID="ddlCDireccionTipoDireccion" TabIndex="2" CssClass="form-control border-success" runat="server">
                            </asp:DropDownList>


                        </div>
                        <div class="input-group md-3">

                            <asp:DropDownList ID="ddlCDepartamento" TabIndex="3" CssClass="form-control border-success" runat="server">
                            </asp:DropDownList>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCMunicipio" TabIndex="4" CssClass="form-control border-success" runat="server">
                            </asp:DropDownList>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCBarrio" TabIndex="5" CssClass="form-control border-success" runat="server">
                            </asp:DropDownList>
                        </div>
                        <button id="btnNueDireccion" tabindex="6" class="btn btn-success pull-right">
                            <i class="fas fa-save fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="modal" id="modalNIdentificacion">
        <div class="modal-dialog" role="document">
            <div id="DivModBorIdentificacion" class="modal-content border-success">
                <div id="DivModHeaIdentificacion" class="modal-header bg-success">
                    <h4 id="H4ModTitIdentificacion">Editar Identificación</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueIdentificacion" runat="server" data-toggle="validator" role="form">
                        <label id="lblexistenuevoIdentificacion" for="txtNuevoIdentificacion" runat="server" class="text-warning" text=""></label>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoIdentificacion" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Identifiación" data-required-error="dddd" pattern="[a-zA-Z0-9ñÑ\s]*$" MaxLength="20" ClientIDMode="Static"></asp:TextBox>
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo320NS" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCIdentificacionTipoIdentificacion" TabIndex="2" CssClass="form-control border-success" runat="server">
                            </asp:DropDownList>
                        </div>
                        <button id="btnNueIdentificacion" tabindex="3" class="btn btn-success pull-right">
                            <i class="fas fa-save fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modalNTelefono">
        <div class="modal-dialog" role="document">
            <div id="DivModBorTelefono" class="modal-content border-success">
                <div id="DivModHeaTelefono" class="modal-header bg-success">
                    <h4 id="H4ModTitTelefono">Editar Teléfono</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueTelefono" runat="server" data-toggle="validator" role="form">
                        <label id="lblexistenuevoTelefono" for="txtNuevoTelefono" runat="server" class="text-warning" text=""></label>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoTelefono" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Teléfono" data-required-error="dddd" pattern="[0-9\s]*$" MaxLength="15" ClientIDMode="Static"></asp:TextBox>
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfoNum" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCTelefonoTipoTelefono" TabIndex="2" CssClass="form-control border-success" runat="server">
                            </asp:DropDownList>
                        </div>


                        <button id="btnNueTelefono" tabindex="3" class="btn btn-success pull-right">
                            <i class="fas fa-save fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modalNCorreo">
        <div class="modal-dialog" role="document">
            <div id="DivModBorCorreo" class="modal-content border-success">
                <div id="DivModHeaCorreo" class="modal-header bg-success">
                    <h4 id="H4ModTitCorreo">Editar Correo</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueCorreo" runat="server" data-toggle="validator" role="form">
                        <label id="lblexistenuevoCorreo" for="txtNuevoCorreo" runat="server" class="text-warning" text=""></label>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoCorreo" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Correo" data-required-error="dddd" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" MaxLength="50" ClientIDMode="Static"></asp:TextBox>
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfoMAIL" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCCorreoTipoCorreo" TabIndex="2" CssClass="form-control border-success" runat="server">
                            </asp:DropDownList>
                        </div>
                        <button id="btnNueCorreo" tabindex="3" class="btn btn-success pull-right">
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
    <script src="/js/icp/CRUDEArea.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDECargo.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDECargoEmpleado.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDEPersona.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDEIdentificacion.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDETelefono.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDECorreo.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDEDireccion.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDEEmpleado.js" type="text/javascript"></script>
</asp:Content>
