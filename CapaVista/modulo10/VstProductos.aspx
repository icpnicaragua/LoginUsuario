<%@ Page Title="" Language="C#" MasterPageFile="~/Pm1.Master" AutoEventWireup="true" CodeBehind="VstProductos.aspx.cs" Inherits="CapaVista.modulo10.VstProductos" ClientIDMode="Static" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/datatables/datatables.css" rel="stylesheet" />
    <link href="/datatables/Buttons-1.5.4/css/buttons.dataTables.min.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="DivNavegadorProducto" class="container-fluid">
        <!-- id-->
        <div class="row">
            <div class="header">
                <h4>Navegador</h4>
                <!-- h4-->
                <div class="form-group">
                    <asp:LinkButton ID="lbGarantia" href="#Garantia" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Días de garantía</asp:LinkButton><!-- id href text-->
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row">
            <div id="Garantia" class="  col-lg-6 col-md-6 col-sm-12 collapse">
                <!-- id-->
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Días de garantía</h2>
                        <!-- h2-->
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNGarantia" href="#modalNGarantia" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton><!-- id href-->
                            <asp:LinkButton ID="lbMostrarGarantia" href="#secciontblGarantia" runat="server" Text="Días de garantía" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton><!-- id href text-->
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblGarantia" class="table-responsive collapse">
                            <!-- id-->
                            <table id="tblGarantia" class="table table-bordered table-hover">
                                <!-- id-->
                                <thead>
                                    <tr>
                                        <!-- campos-->
                                        <th>Id</th>
                                        <th>Días de garantía</th>
                                        <th>Ctrl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyGarantia">
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
    <div id="alertaProductos" class="modal bd-example-modal-sm" tabindex="-1" role="dialog" aria-hidden="true">
        <!-- id-->
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"></h5>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="modalNGarantia">
        <!-- id-->
        <div class="modal-dialog" role="document">
            <div id="DivModBorGarantia" class="modal-content border-success">
                <!-- id-->
                <div id="DivModHeaGarantia" class="modal-header bg-success">
                    <!-- id-->
                    <h4 id="H4ModTitGarantia">Editar Días de garantía</h4>
                    <!-- id h4-->
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueGarantia" runat="server" data-toggle="validator" role="form">
                        <!-- id-->
                        <label id="lblexistenuevoGarantia" for="txtNuevoGarantian" runat="server" class="text-warning" text=""></label>
                        <!-- id for-->
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoGarantia" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Días de garantía" data-required-error="dddd" pattern="\d+"  ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfoNum" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                    <!-- class popinfoX-->
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <button id="btnNueGarantia" tabindex="2" class="btn btn-success pull-right">
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
    <script src="/js/icp/CRUDEGarantia.js" type="text/javascript"></script>
</asp:Content>
