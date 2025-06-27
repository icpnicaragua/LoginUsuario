<%@ Page Title="" Language="C#" MasterPageFile="~/Pm1.Master" AutoEventWireup="true" CodeBehind="VstProductos.aspx.cs" Inherits="CapaVista.modulo10.VstProductos" ClientIDMode="Static" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/datatables/datatables.css" rel="stylesheet" />
    <link href="/datatables/Buttons-1.5.4/css/buttons.dataTables.min.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="DivNavegadorProducto" class="container-fluid">
        <div class="row">
            <div class="header">
                <h4>Navegador</h4>
                <div class="form-group">
                    <asp:LinkButton ID="lbGarantia" href="#Garantia" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Días de garantía</asp:LinkButton>
                    <asp:LinkButton ID="lbProducto" href="#Producto" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Productos</asp:LinkButton>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row">
            <div id="Garantia" class="  col-lg-6 col-md-6 col-sm-12 collapse">
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Días de garantía</h2>
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNGarantia" href="#modalNGarantia" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton>
                            <asp:LinkButton ID="lbMostrarGarantia" href="#secciontblGarantia" runat="server" Text="Días de garantía" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton>
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblGarantia" class="table-responsive collapse">
                            <table id="tblGarantia" class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Días de garantía</th>
                                        <th>Ctrl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyGarantia">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <section class="content-header">
        <h1 style="text-align: center">Agregar Producto</h1>
    </section>
    <section class="content">
        <div id="DivCardsProd" class="row">
            <div class="col-md-6">
                <div id="BoxProd1" class="box box-success">
                    <label id="lblexistenuevoProducto" for="txtNuevoNombre" runat="server" class="text-warning" text=""></label>
                    <div class="form-group">
                        <label>Nombre</label>
                    </div>
                    <div class="input-group mb-3">
                        <asp:TextBox ID="txtNuevoNombre" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo xxxxxx" data-required-error="dddd" pattern="xx" ClientIDMode="Static"></asp:TextBox>
                        <span class="input-group-addon">
                            <button type="button" class="btn btn-secondary xxxxx" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                <i class="fas fa-info"></i>
                            </button>
                        </span>
                    </div>
                    <div class="form-group">
                        <label>Descripción</label>
                    </div>
                    <div class="input-group mb-3">
                        <asp:TextBox ID="txtNuevoDescripcion" runat="server" TabIndex="2" CssClass="form-control" placeholder="Nuevo xxxxxx" data-required-error="dddd" pattern="xx" ClientIDMode="Static"></asp:TextBox>
                        <span class="input-group-addon">
                            <button type="button" class="btn btn-secondary xxxxx" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                <i class="fas fa-info"></i>
                            </button>
                        </span>
                    </div>
                    <div class="form-group">
                        <label>Código de Barra</label>
                    </div>
                    <div class="input-group mb-3">
                        <asp:TextBox ID="txtNuevoBarra" runat="server" TabIndex="3" CssClass="form-control" placeholder="Nuevo xxxxxx" data-required-error="dddd" pattern="xx" ClientIDMode="Static"></asp:TextBox>
                        <span class="input-group-addon">
                            <button type="button" class="btn btn-secondary xxxxx" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                <i class="fas fa-info"></i>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div id="BoxProd2" class="boxproducto box box-success">
                    <div class="form-group">
                        <label>Unidad/Granel</label>
                    </div>
                    <div class="input-group mb-3">
                        <asp:RadioButton ID="RbtnUnidad" Text="Unidad" TabIndex="4"  Checked="True"  runat="server" GroupName="GObtUG"></asp:RadioButton>
                        <asp:RadioButton ID="RbtnGranel" Text="Granel" runat="server" GroupName="GObtUG"></asp:RadioButton>
                        <span class="input-group-addon">
                            <button type="button" class="btn btn-secondary xxxxx" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                <i class="fas fa-info"></i>
                            </button>
                        </span>
                    </div>
                    <div class="form-group">
                        <label>Iva</label>
                    </div>
                    <div class="input-group mb-3">
                        <asp:RadioButton ID="IVA" Text="IVA" TabIndex="5" runat="server" GroupName="GObtIva"></asp:RadioButton>
                        <asp:RadioButton ID="NIVA" Text="No Graba Iva" Checked="True"  runat="server" GroupName="GObtIva"></asp:RadioButton>
                        <span class="input-group-addon">
                            <button type="button" class="btn btn-secondary xxxxx" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                <i class="fas fa-info"></i>
                            </button>
                        </span>
                    </div>
                    <div class="form-group">
                        <label>Alerta Mínimo</label>
                    </div>
                    <div class="input-group mb-3">
                        <asp:TextBox ID="txtNuevoMinimo" runat="server" TabIndex="6" CssClass="form-control" placeholder="Nueva Alerta mínimo" data-required-error="dddd" pattern="xx" ClientIDMode="Static"></asp:TextBox>
                        <span class="input-group-addon">
                            <button type="button" class="btn btn-secondary xxxxx" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                <i class="fas fa-info"></i>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div id="BoxProd3" class="boxproducto box box-success">
                    <div class="form-group">
                        <label>Familia</label>
                    </div>
                    <div class="input-group mb-3">
                        <asp:DropDownList ID="ddlCProductoFamilia" TabIndex="7" CssClass="form-control border-success" runat="server">
                        </asp:DropDownList>
                    </div>
                    <div class="form-group">
                        <label>Categoría</label>
                    </div>
                    <div class="input-group mb-3">
                        <asp:DropDownList ID="ddlCProductoCategoria" TabIndex="8" CssClass="form-control border-success" runat="server">
                        </asp:DropDownList>
                    </div>
                    <div class="form-group">
                        <label>Sub Categoría</label>
                    </div>
                    <div class="input-group mb-3">
                        <asp:DropDownList ID="ddlCProductoSubCategoria" TabIndex="9" CssClass="form-control border-success" runat="server">
                        </asp:DropDownList>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <div id="BoxProd4" class="boxproducto box box-success">
                    <div class="form-group">
                        <label>Garantía</label>
                    </div>
                    <div class="input-group mb-3">
                        <asp:DropDownList ID="ddlCProductoGarantia" TabIndex="10" CssClass="form-control border-success" runat="server">
                        </asp:DropDownList>
                    </div>
                    <div class="form-group">
                        <label>Subir Imagen de produto</label>
                    </div>
                    <div class="input-group mb-3">
                        <asp:FileUpload ID="FUProducto" runat="server" />
                    </div>
                    <div class="input-group mb-3">
                        <asp:Button ID="btnSubirImgProducto" Text="Subir" CssClass="btn btn-success" OnClick="FnCImaProducto" Width="200px" runat="server"></asp:Button>

                    </div>
                    <div id="CalProducto" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#CalProducto" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                           
                            <button type="button" data-bs-target="#CalProducto" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#CalProducto" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>

                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="..." class="d-block w-100" alt="...">
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>First slide label</h5>
                                    <p>Some representative placeholder content for the first slide.</p>
                                </div>
                            </div>

                            <div class="carousel-item">
                                <img src="..." class="d-block w-100" alt="...">
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>Second slide label</h5>
                                    <p>Some representative placeholder content for the second slide.</p>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src="..." class="d-block w-100" alt="...">
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>Third slide label</h5>
                                    <p>Some representative placeholder content for the third slide.</p>
                                </div>
                            </div>
                        </div>

                        <button class="carousel-control-prev" type="button" data-bs-target="#CalProducto" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#CalProducto" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-auto">
                <table class="table table-responsive">
                    <tr>
                        <td>
                            <asp:Button ID="btnNueProducto" Text="Guardar" TabIndex="11" CssClass="btn btn-success" Width="200px" runat="server"></asp:Button>
                        </td>
                        <td>&nbsp; &nbsp; &nbsp; &nbsp;
                        </td>
                        <td>
                            <asp:Button ID="btnCancelarProducto" Text="Cancelar" TabIndex="12" CssClass="btn btn-danger" Width="200px" runat="server"></asp:Button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </section>
    <div class="container-fluid">
        <div class="row">
            <div id="Producto" class="  col-lg-12 col-md-12 col-sm-12 collapse">
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Producto</h2>
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNProducto" href="#modalNProducto" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton><!-- id href-->
                            <asp:LinkButton ID="lbMostrarProducto" href="#secciontblProducto" runat="server" Text="Mostrar Producto" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton><!-- id href text-->
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblProducto" class="table-responsive collapse">
                            <table id="tblProducto" class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                        <th>Código de Barra</th>
                                        <th>Unidad/Granel</th>
                                        <th>Iva</th>
                                        <th>Mínimo</th>
                                        <th>Familia</th>
                                        <th>Categoría</th>
                                        <th>SubCategoría</th>
                                        <th>Días Garantía</th>
                                        <th>Ctrl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyProducto">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="alertaProductos" class="modal bd-example-modal-sm" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"></h5>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modalNGarantia">
        <div class="modal-dialog" role="document">
            <div id="DivModBorGarantia" class="modal-content border-success">
                <div id="DivModHeaGarantia" class="modal-header bg-success">
                    <h4 id="H4ModTitGarantia">Editar Días de garantía</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueGarantia" runat="server" data-toggle="validator" role="form">
                        <label id="lblexistenuevoGarantia" for="txtNuevoGarantian" runat="server" class="text-warning" text=""></label>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoGarantia" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Días de garantía" data-required-error="dddd" pattern="\d+" ClientIDMode="Static"></asp:TextBox>
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfoNum" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <button id="btnNueGarantia" tabindex="2" class="btn btn-success pull-right">
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
    <script src="/js/icp/CRUDEGarantia.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDEProducto.js" type="text/javascript"></script>
</asp:Content>
