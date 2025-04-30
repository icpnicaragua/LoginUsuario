<%@ Page Title="" Language="C#" MasterPageFile="~/Pm1.Master" AutoEventWireup="true" CodeBehind="VstFamilia.aspx.cs" Inherits="CapaVista.modulo10.VsFamilia" ClientIDMode="Static" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/datatables/datatables.css" rel="stylesheet" />
    <link href="/datatables/Buttons-1.5.4/css/buttons.dataTables.min.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="DivNavegadorFamilia" class="container-fluid">
        <!-- id-->
        <div class="row">
            <div class="header">
                <h4>Navegador</h4>
                <!-- h4-->
                <div class="form-group">
                    <asp:LinkButton ID="lbFamilia" href="#Familia" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Familia</asp:LinkButton><!-- id href text-->
                    <asp:LinkButton ID="lbCategoria" href="#Categoria" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Categoria</asp:LinkButton><!-- id href text-->

                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row">
            <div id="Familia" class="  col-lg-6 col-md-6 col-sm-12 collapse">
                <!-- id-->
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Familia</h2>
                        <!-- h2-->
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNFamilia" href="#modalNFamilia" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton><!-- id href-->
                            <asp:LinkButton ID="lbMostrarFamilia" href="#secciontblFamilia" runat="server" Text="Mostrar Familia" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton><!-- id href text-->
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblFamilia" class="table-responsive collapse">
                            <!-- id-->
                            <table id="tblFamilia" class="table table-bordered table-hover">
                                <!-- id-->
                                <thead>
                                    <tr>
                                        <!-- campos-->
                                        <th>Id</th>
                                        <th>Familia</th>
                                        <th>Ctrl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyFamilia">
                                    <!-- id-->
                                    <!-- ajax-->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div id="Categoria" class="  col-lg-6 col-md-6 col-sm-12 collapse">
                <!-- id-->
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Categoria</h2>
                        <!-- h2-->
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNCategoria" href="#modalNCategoria" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton><!-- id href-->
                            <asp:LinkButton ID="lbMostrarCategoria" href="#secciontblCategoria" runat="server" Text="Mostrar Categoria" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton><!-- id href text-->
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblCategoria" class="table-responsive collapse">
                            <!-- id-->
                            <table id="tblCategoria" class="table table-bordered table-hover">
                                <!-- id-->
                                <thead>
                                    <tr>
                                        <!-- campos-->
                                        <th>Categoria</th>
                                        <th>Familia</th>
                                        <th>Ctrl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyCategoria">
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
    <div id="alertaFamilia" class="modal bd-example-modal-sm" tabindex="-1" role="dialog" aria-hidden="true">
        <!-- id-->
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"></h5>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="modalNFamilia">
        <!-- id-->
        <div class="modal-dialog" role="document">
            <div id="DivModBorFamilia" class="modal-content border-success">
                <!-- id-->
                <div id="DivModHeaFamilia" class="modal-header bg-success">
                    <!-- id-->
                    <h4 id="H4ModTitFamilia">Editar Familia</h4>
                    <!-- id h4-->
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueFamilia" runat="server" data-toggle="validator" role="form">
                        <!-- id-->
                        <label id="lblexistenuevoFamilia" for="txtNuevoFamilian" runat="server" class="text-warning" text=""></label>
                        <!-- id for-->
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoFamilia" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Familia" data-required-error="dddd" pattern="[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]*$" MaxLength="20" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo320NS" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <!-- class popinfoX-->
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <button id="btnNueFamilia" tabindex="2" class="btn btn-success pull-right">
                            <!-- id idex(si aplica)-->
                            <i class="fas fa-save fa-2x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modalNCategoria">
        <!-- id-->
        <div class="modal-dialog" role="document">
            <div id="DivModBorCategoria" class="modal-content border-success">
                <!-- id-->
                <div id="DivModHeaCategoria" class="modal-header bg-success">
                    <!-- id-->
                    <h4 id="H4ModTitCategoria">Editar Palabra Clave</h4>
                    <!-- id h4-->
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueCategoria" runat="server" data-toggle="validator" role="form">
                        <!-- id-->
                        <label id="lblexistenuevoCategoria" for="txtNuevoCategoria" runat="server" class="text-warning" text=""></label>
                        <!-- id for-->
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoCategoria" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Categoria" data-required-error="dddd" pattern="[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]*$" MaxLength="45" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo345NS" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <!-- class popinfoX-->
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group md-3">
                            <asp:DropDownList ID="ddlCCategoriaFamilia" TabIndex="2" CssClass="form-control border-success" runat="server">
                                <%--id tap xxxx--%>
                            </asp:DropDownList>
                        </div>
                        <button id="btnNueCategoria" tabindex="3" class="btn btn-success pull-right">
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
    <script src="/js/icp/CRUDEFamilia.js" type="text/javascript"></script>
     <script src="/js/icp/CRUDECategoria.js" type="text/javascript"></script>
</asp:Content>
