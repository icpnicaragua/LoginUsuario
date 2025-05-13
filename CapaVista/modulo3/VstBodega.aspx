<%@ Page Title="" Language="C#" MasterPageFile="~/Pm1.Master" AutoEventWireup="true" CodeBehind="VstBodega.aspx.cs" Inherits="CapaVista.modulo3.VstBodega" ClientIDMode="Static" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/datatables/datatables.css" rel="stylesheet" />
    <link href="/datatables/Buttons-1.5.4/css/buttons.dataTables.min.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="DivNavegadorBodega" class="container-fluid">
        <!-- id-->
        <div class="row">
            <div class="header">
                <h4>Administrar Bodegas</h4>
                <!-- h4-->
                <div class="form-group">
                    <asp:LinkButton ID="lbBodega" href="#Bodega" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Bodega</asp:LinkButton><!-- id href text-->
                    <asp:LinkButton ID="lbSeccion" href="#Seccion" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Sección</asp:LinkButton><!-- id href text-->
                    <asp:LinkButton ID="lbRack" href="#Rack" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Rack</asp:LinkButton><!-- id href text-->
                    <asp:LinkButton ID="lbEstante" href="#Estante" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Estante</asp:LinkButton><!-- id href text-->
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row">
            <div id="Bodega" class="  col-lg-6 col-md-6 col-sm-12 collapse">
                <!-- id-->
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Bodega</h2>
                        <!-- h2-->
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNBodega" href="#modalNBodega" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton><!-- id href-->
                            <asp:LinkButton ID="lbMostrarBodega" href="#secciontblBodega" runat="server" Text="Mostrar Bodega" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton><!-- id href text-->
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblBodega" class="table-responsive collapse">
                            <!-- id-->
                            <table id="tblBodega" class="table table-bordered table-hover">
                                <!-- id-->
                                <thead>
                                    <tr>
                                        <!-- campos-->
                                        <th>Id</th>
                                        <th>Bodega</th>
                                        <th>Descripción</th>
                                        <th>Sucursal</th>
                                        <th>Responsable</th>
                                        <th>Ctrl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyBodega">
                                    <!-- id-->
                                    <!-- ajax-->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div id="Seccion" class="  col-lg-6 col-md-6 col-sm-12 collapse">
                <!-- id-->
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Sección</h2>
                        <!-- h2-->
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNSeccion" href="#modalNSeccion" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton><!-- id href-->
                            <asp:LinkButton ID="lbMostrarSeccion" href="#secciontblSeccion" runat="server" Text="Mostrar Sección" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton><!-- id href text-->
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblSeccion" class="table-responsive collapse">
                            <!-- id-->
                            <table id="tblSeccion" class="table table-bordered table-hover">
                                <!-- id-->
                                <thead>
                                    <tr>
                                        <!-- campos-->
                                        <th>Id</th>
                                        <th>Sección</th>
                                        <th>Bodega</th>
                                        <th>Ctrl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodySeccion">
                                    <!-- id-->
                                    <!-- ajax-->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div id="Rack" class="  col-lg-6 col-md-6 col-sm-12 collapse">
                <!-- id-->
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Rack</h2>
                        <!-- h2-->
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNRack" href="#modalNRack" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton><!-- id href-->
                            <asp:LinkButton ID="lbMostrarRack" href="#secciontblRack" runat="server" Text="Mostrar Rack" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton><!-- id href text-->
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblRack" class="table-responsive collapse">
                            <!-- id-->
                            <table id="tblRack" class="table table-bordered table-hover">
                                <!-- id-->
                                <thead>
                                    <tr>
                                        <!-- campos-->
                                        <th>Id</th>
                                        <th>Rack</th>
                                        <th>Seccion</th>
                                        <th>Ctrl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyRack">
                                    <!-- id-->
                                    <!-- ajax-->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div id="Estante" class="  col-lg-6 col-md-6 col-sm-12 collapse">
                <!-- id-->
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Estante</h2>
                        <!-- h2-->
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNEstante" href="#modalNEstante" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton><!-- id href-->
                            <asp:LinkButton ID="lbMostrarEstante" href="#secciontblEstante" runat="server" Text="Mostrar Estante" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton><!-- id href text-->
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblEstante" class="table-responsive collapse">
                            <!-- id-->
                            <table id="tblEstante" class="table table-bordered table-hover">
                                <!-- id-->
                                <thead>
                                    <tr>
                                        <!-- campos-->
                                        <th>Id</th>
                                        <th>Estante</th>
                                        <th>Rack</th>
                                        <th>Ctrl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyEstante">
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
    <div id="alertaBodega" class="modal bd-example-modal-sm" tabindex="-1" role="dialog" aria-hidden="true">
        <!-- id-->
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"></h5>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modalNBodega">
        <!-- id-->
        <div class="modal-dialog" role="document">
            <div id="DivModBorBodega" class="modal-content border-success">
                <!-- id-->
                <div id="DivModHeaBodega" class="modal-header bg-success">
                    <!-- id-->
                    <h4 id="H4ModTitBodega">Editar Palabra Clave</h4>
                    <!-- id h4-->
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueBodega" runat="server" data-toggle="validator" role="form">
                        <!-- id-->
                        <label id="lblexistenuevoBodega" for="txtNuevoBodega" runat="server" class="text-warning" text=""></label>
                        <!-- id for-->
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoBodega" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Bodega" data-required-error="dddd" pattern="[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]*$" MaxLength="45" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo345NS" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <!-- class popinfoX-->
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoDescripcion" runat="server" TabIndex="2" CssClass="form-control" placeholder="Nuevo Bodega" data-required-error="dddd" pattern="[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]*$" MaxLength="60" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo360NS" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <!-- class popinfoX-->
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCBodegaSucursal" TabIndex="3" CssClass="form-control border-success" runat="server">
                                <%--id tap xxxx--%>
                            </asp:DropDownList>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCBodegaResponsable" TabIndex="4" CssClass="form-control border-success" runat="server">
                                <%--id tap xxxx--%>
                            </asp:DropDownList>
                        </div>
                        <button id="btnNueBodega" tabindex="5" class="btn btn-success pull-right">
                            <!-- id idex(si aplica)-->
                            <i class="fas fa-save fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modalNSeccion">
        <!-- id-->
        <div class="modal-dialog" role="document">
            <div id="DivModBorSeccion" class="modal-content border-success">
                <!-- id-->
                <div id="DivModHeaSeccion" class="modal-header bg-success">
                    <!-- id-->
                    <h4 id="H4ModTitSeccion">Editar Sección</h4>
                    <!-- id h4-->
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueSeccion" runat="server" data-toggle="validator" role="form">
                        <!-- id-->
                        <label id="lblexistenuevoSeccion" for="txtNuevoSeccion" runat="server" class="text-warning" text=""></label>
                        <!-- id for-->
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoSeccion" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Seccion" data-required-error="dddd" pattern="[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]*$" MaxLength="45" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo345NS" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <!-- class popinfoX-->
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCSeccionBodega" TabIndex="2" CssClass="form-control border-success" runat="server">
                                <%--id tap xxxx--%>
                            </asp:DropDownList>
                        </div>
                        <button id="btnNueSeccion" tabindex="3" class="btn btn-success pull-right">
                            <!-- id idex(si aplica)-->
                            <i class="fas fa-save fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="modal" id="modalNRack">
        <!-- id-->
        <div class="modal-dialog" role="document">
            <div id="DivModBorRack" class="modal-content border-success">
                <!-- id-->
                <div id="DivModHeaRack" class="modal-header bg-success">
                    <!-- id-->
                    <h4 id="H4ModTitRack">Editar Rack</h4>
                    <!-- id h4-->
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueRack" runat="server" data-toggle="validator" role="form">
                        <!-- id-->
                        <label id="lblexistenuevoRack" for="txtNuevoRack" runat="server" class="text-warning" text=""></label>
                        <!-- id for-->
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoRack" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Rack" data-required-error="dddd" pattern="[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]*$" MaxLength="45" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo345NS" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <!-- class popinfoX-->
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCRackSeccion" TabIndex="2" CssClass="form-control border-success" runat="server">
                                <%--id tap xxxx--%>
                            </asp:DropDownList>
                        </div>
                        <button id="btnNueRack" tabindex="3" class="btn btn-success pull-right">
                            <!-- id idex(si aplica)-->
                            <i class="fas fa-save fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="modalNEstante">
        <!-- id-->
        <div class="modal-dialog" role="document">
            <div id="DivModBorEstante" class="modal-content border-success">
                <!-- id-->
                <div id="DivModHeaEstante" class="modal-header bg-success">
                    <!-- id-->
                    <h4 id="H4ModTitEstante">Editar Palabra Clave</h4>
                    <!-- id h4-->
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueEstante" runat="server" data-toggle="validator" role="form">
                        <!-- id-->
                        <label id="lblexistenuevoEstante" for="txtNuevoEstante" runat="server" class="text-warning" text=""></label>
                        <!-- id for-->
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoEstante" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Estante" data-required-error="dddd" pattern="[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]*$" MaxLength="45" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo345NS" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <!-- class popinfoX-->
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCEstanteRack" TabIndex="2" CssClass="form-control border-success" runat="server">
                                <%--id tap xxxx--%>
                            </asp:DropDownList>
                        </div>
                        <button id="btnNueEstante" tabindex="3" class="btn btn-success pull-right">
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

    <script src="/js/icp/CRUDEBodega.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDESeccion.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDERack.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDEEstante.js" type="text/javascript"></script>
</asp:Content>
