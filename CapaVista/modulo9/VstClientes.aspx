<%@ Page Title="" Language="C#" MasterPageFile="~/Pm1.Master" AutoEventWireup="true" CodeBehind="VstClientes.aspx.cs" Inherits="CapaVista.modulo9.VstClientes" ClientIDMode="Static" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/datatables/datatables.css" rel="stylesheet" />
    <link href="/datatables/Buttons-1.5.4/css/buttons.dataTables.min.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="DivNavegadorClientes" class="container-fluid bg-light">
        <div class="row">
            <div class="header">
                <h4>Administrar Clientes</h4>
                <div class="form-group">
                    <asp:LinkButton ID="lbCliente" href="#Cliente" data-toggle="collapse" runat="server" CssClass="btn btn-magick btn3d">Clientes</asp:LinkButton>
                </div>
            </div>
        </div>
    </div>
    <div id="DivNavegadorInfo" class="container-fluid bg-white">
        <div class="row">
            <div class="header">
                <h4>Administrar Información de Clientes</h4>
                <div class="form-group">
                    <asp:LinkButton ID="lbEmpresa" href="#Empresa" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Info Empresas</asp:LinkButton>
                    <asp:LinkButton ID="lbPersona" href="#Persona" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Info Personas</asp:LinkButton>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid" >
        <div class="row">
            <div id="Cliente" class=" col-lg-12 col-md-12 col-sm-12 collapse">
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Cliente</h2>
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNClientePersona" href="#ClienteNPersona" data-toggle="collapse" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-user fa-2x"></i></asp:LinkButton>  
                            <asp:LinkButton ID="lbNClienteEmpresa" href="#ClienteNEmpresa" data-toggle="collapse" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-suitcase fa-2x"></i></asp:LinkButton>  
                            <asp:LinkButton ID="lbMostrarCliente" href="#secciontblCliente" runat="server" Text="Mostrar Cliente" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton>   
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblCliente" class="table-responsive collapse">
                            <table id="tblCliente" class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Cliente</th>
                                        <th>E/P</th>
                                        <th>Tipo</th>
                                        <th>Días Crédito</th>
                                        <th>Crédito</th>
                                        <th>Inicio</th>
                                        <th>Ctrl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyCliente">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div id="ClienteNPersona" class="  col-lg-6 col-md-12 col-sm-12 collapse">
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Agregar Persona a Clientes</h2>
                        <div class="d-inline-block pull-right">
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblClienteNPersona" class="table-responsive ">
                            <table id="tblClienteNPersona" class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Id Persona</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Ctrl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyClienteNPersona">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div id="ClienteNEmpresa" class="  col-lg-6 col-md-12 col-sm-12 collapse">
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Agregar Empresa a Clientes</h2>
                        <div class="d-inline-block pull-right">
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblClienteNEmpresa" class="table-responsive ">
                            <table id="tblClienteNEmpresa" class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Id Persona</th>
                                        <th>Nombre Comercial</th>
                                        <th>Razón Social</th>
                                        <th>Ruc</th>
                                        <th>Ctrl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyClienteNEmpresa">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class="container-fluid bg-info">
        <div class="row">
            <div id="Empresa" class=" col-lg-12 col-md-12 col-sm-12 collapse">
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Información General de  Empresas</h2>
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNEmpresa" href="#modalNEmpresa" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton>  
                            <asp:LinkButton ID="lbMostrarEmpresa" href="#secciontblEmpresa" runat="server" Text="Mostrar Empresa" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton>   
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblEmpresa" class="table-responsive collapse">
                            <table id="tblEmpresa" class="table table-bordered table-hover">
                                <thead>
                                    <tr>
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
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="row collapse" id="DatosEmpresa">
                    <div id="TelefonoEmpresa" class="  col-lg-4 col-md-6 col-sm-12 ">
                        <div class="card bg-light mb-3">
                            <div class="card-header">
                                <h2 class="d-inline-block">Teléfono</h2>
                                <div class="d-inline-block pull-right">
                                    <asp:LinkButton ID="lbNTelefonoEmpresa" href="#modalNTelefonoEmpresa" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton>  
                                </div>
                            </div>
                            <div class="card-body">
                                <div id="secciontblTelefonoEmpresa" class="table-responsive ">
                                    <table id="tblTelefonoEmpresa" class="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Teléfono</th>
                                                <th>Tipo de Teléfono</th>
                                                <th>Ctrl</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tblBodyTelefonoEmpresa">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="DireccionEmpresa" class="  col-lg-4 col-md-6 col-sm-12 ">
                        <div class="card bg-light mb-3">
                            <div class="card-header">
                                <h2 class="d-inline-block">Dirección</h2>
                                <div class="d-inline-block pull-right">
                                    <asp:LinkButton ID="lbNDireccionEmpresa" href="#modalNDireccionEmpresa" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton>  
                                </div>
                            </div>
                            <div class="card-body">
                                <div id="secciontblDireccionEmpresa" class="table-responsive ">
                                    <table id="tblDireccionEmpresa" class="table table-bordered table-hover">
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
                                        <tbody id="tblBodyDireccionEmpresa">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="CorreoEmpresa" class="  col-lg-4 col-md-6 col-sm-12 ">
                        <div class="card bg-light mb-3">
                            <div class="card-header">
                                <h2 class="d-inline-block">Correo</h2>
                                <div class="d-inline-block pull-right">
                                    <asp:LinkButton ID="lbNCorreoEmpresa" href="#modalNCorreoEmpresa" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton>  
                                </div>
                            </div>
                            <div class="card-body">
                                <div id="secciontblCorreoEmpresa" class="table-responsive ">
                                    <table id="tblCorreoEmpresa" class="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Correo</th>
                                                <th>Tipo de Correo</th>
                                                <th>Ctrl</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tblBodyCorreoEmpresa">
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

    <div class="container-fluid bg-primary">
        <div class="row">
            <div id="Persona" class="  col-lg-12 col-md-12 col-sm-12 collapse">
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Información General de Personas</h2>
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNPersona" href="#modalNPersona" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton>  
                            <asp:LinkButton ID="lbMostrarPersona" href="#secciontblPersona" runat="server" Text="Mostrar Personas" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton>   
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblPersona" class="table-responsive collapse MostrarPersona">
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
                                <tbody id="tblBodyPersona" >
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="row collapse" id="DatosPersona">
                    <div id="Identificacion" class="  col-lg-6 col-md-6 col-sm-12 ">
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
                    <div id="Telefono" class="  col-lg-6 col-md-6 col-sm-12 ">
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
                    <div id="Direccion" class="  col-lg-6 col-md-6 col-sm-12 ">
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
                    <div id="Correo" class="  col-lg-6 col-md-6 col-sm-12 ">
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

    <div id="alertaClientes" class="modal bd-example-modal-sm" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"></h5>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="modalNCliente">
        <div class="modal-dialog" role="document">
            <div id="DivModBorCliente" class="modal-content border-success">
                <div id="DivModHeaCliente" class="modal-header bg-success">
                    <h4 id="H4ModTitCliente">Editar Cliente</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueCliente" runat="server" data-toggle="validator" role="form">
                        <label id="lblexistenuevoCliente" for="txtNuevoNombre" runat="server" class="text-warning" text=""></label>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoNombre" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Cliente" ClientIDMode="Static"></asp:TextBox>    
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoPlazoCredito" runat="server" TabIndex="2" CssClass="form-control" placeholder="Nuevo Plazo Crédito" data-required-error="dddd" pattern="[0-9]+" ClientIDMode="Static"></asp:TextBox>    
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfoNum" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoLimiteCredito" runat="server" TabIndex="3" CssClass="form-control" placeholder="Nuevo Plazo Cédito" data-required-error="dddd" pattern="[0-9]+([,\.][0-9]+)?$" ClientIDMode="Static"></asp:TextBox>    
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfoDecimal2" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCClienteTipoCliente" TabIndex="4" CssClass="form-control border-success" runat="server">
                            </asp:DropDownList>
                        </div>
                        <button id="btnNueCliente" tabindex="5" class="btn btn-success pull-right">
                            <i class="fas fa-save fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="modalNEmpresa">
        <div class="modal-dialog" role="document">
            <div id="DivModBorEmpresa" class="modal-content border-success">
                <div id="DivModHeaEmpresa" class="modal-header bg-success">
                    <h4 id="H4ModTitEmpresa">Editar Empresa</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueEmpresa" runat="server" data-toggle="validator" role="form">
                        <label id="lblexistenuevoEmpresa" for="txtNuevoEmpresa" runat="server" class="text-warning" text=""></label>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoEmpresa" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Nombre comercial" data-required-error="dddd" pattern="[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]*$" MaxLength="45" ClientIDMode="Static"></asp:TextBox>    
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo345NS" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoRazonSocial" runat="server" TabIndex="2" CssClass="form-control" placeholder="Nuevo Razón Social" data-required-error="dddd" pattern="[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]*$" MaxLength="45" ClientIDMode="Static"></asp:TextBox>    
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo345NS" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoRuc" runat="server" TabIndex="3" CssClass="form-control" placeholder="Nuevo RUC" data-required-error="dddd" pattern="[a-zA-Z0-9\s]*$" MaxLength="45" ClientIDMode="Static"></asp:TextBox>    
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo345NS" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCEmpresaTipoEmpresa" TabIndex="4" CssClass="form-control border-success" runat="server">
                            </asp:DropDownList>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCEmpresaRegimen" TabIndex="5" CssClass="form-control border-success" runat="server">
                            </asp:DropDownList>
                        </div>
                        <button id="btnNueEmpresa" tabindex="6" class="btn btn-success pull-right">
                            <i class="fas fa-save fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="modalNDireccionEmpresa">
        <div class="modal-dialog" role="document">
            <div id="DivModBorDireccionEmpresa" class="modal-content border-success">
                <div id="DivModHeaDireccionEmpresa" class="modal-header bg-success">
                    <h4 id="H4ModTitDireccionEmpresa">Editar Dirección</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueDireccionEmpresa" runat="server" data-toggle="validator" role="form">
                        <label id="lblexistenuevoDireccionEmpresa" for="txtNuevoDireccionEmpresa" runat="server" class="text-warning" text=""></label>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoDireccionEmpresa" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Dirección" data-required-error="dddd" pattern="[a-zA-Z0-9ñÑ\s]*$" MaxLength="150" ClientIDMode="Static"></asp:TextBox>    
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo3150NS" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCDireccionEmpresaTipoDireccionEmpresa" TabIndex="2" CssClass="form-control border-success" runat="server">
                            </asp:DropDownList>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCDepartamentoEmpresa" TabIndex="3" CssClass="form-control border-success" runat="server">
                            </asp:DropDownList>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCMunicipioEmpresa" TabIndex="4" CssClass="form-control border-success" runat="server">
                            </asp:DropDownList>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCBarrioEmpresa" TabIndex="5" CssClass="form-control border-success" runat="server">
                            </asp:DropDownList>
                        </div>
                        <button id="btnNueDireccionEmpresa" tabindex="6" class="btn btn-success pull-right">
                            <i class="fas fa-save fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modalNTelefonoEmpresa">
        <div class="modal-dialog" role="document">
            <div id="DivModBorTelefonoEmpresa" class="modal-content border-success">
                <div id="DivModHeaTelefonoEmpresa" class="modal-header bg-success">
                    <h4 id="H4ModTitTelefonoEmpresa">Editar Teléfono</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueTelefonoEmpresa" runat="server" data-toggle="validator" role="form">
                        <label id="lblexistenuevoTelefonoEmpresa" for="txtNuevoTelefonoEmpresa" runat="server" class="text-warning" text=""></label>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoTelefonoEmpresa" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Teléfono" data-required-error="dddd" pattern="[0-9\s]*$" MaxLength="15" ClientIDMode="Static"></asp:TextBox>    
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfoNum" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCTelefonoEmpresaTipoTelefonoEmpresa" TabIndex="2" CssClass="form-control border-success" runat="server">
                            </asp:DropDownList>
                        </div>
                        <button id="btnNueTelefonoEmpresa" tabindex="3" class="btn btn-success pull-right">
                            <i class="fas fa-save fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modalNCorreoEmpresa">
        <div class="modal-dialog" role="document">
            <div id="DivModBorCorreoEmpresa" class="modal-content border-success">
                <div id="DivModHeaCorreoEmpresa" class="modal-header bg-success">
                    <h4 id="H4ModTitCorreoEmpresa">Editar Correo</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueCorreoEmpresa" runat="server" data-toggle="validator" role="form">
                        <label id="lblexistenuevoCorreoEmpresa" for="txtNuevoCorreoEmpresa" runat="server" class="text-warning" text=""></label>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoCorreoEmpresa" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Correo" data-required-error="dddd" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" MaxLength="50" ClientIDMode="Static"></asp:TextBox>    
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfoMAIL" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCCorreoEmpresaTipoCorreoEmpresa" TabIndex="2" CssClass="form-control border-success" runat="server">
                            </asp:DropDownList>
                        </div>
                        <button id="btnNueCorreoEmpresa" tabindex="3" class="btn btn-success pull-right">
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
    <script src="/js/icp/CRUDEEmpresa.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDETelefonoEmpresa.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDEDireccionEmpresa.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDECorreoEmpresa.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDEPersona.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDECorreo.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDEDireccion.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDETelefono.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDEIdentificacion.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDECliente.js" type="text/javascript"></script>

</asp:Content>
