<%@ Page Title="" Language="C#" MasterPageFile="~/Pm1.Master" AutoEventWireup="true" CodeBehind="vista13.aspx.cs" Inherits="CapaVista.modulo4.WebForm2" ClientIDMode="Static" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <%--css individual--%>
    <link href="/datatables/datatables.css" rel="stylesheet" />
    <%--probada ok--%>
    <link href="/datatables/Buttons-1.5.4/css/buttons.dataTables.min.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div id="navegadorMVETC" class="container-fluid">
        <div class="row">
            <div class="header">
                <h4>Navegador</h4>
                <div class="form-group">
                    <asp:LinkButton ID="lbShowTC" href="#TC" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Tipo de Elemento</asp:LinkButton>
                    <asp:LinkButton ID="lbShowE" href="#E" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Elemento</asp:LinkButton>
                    <asp:LinkButton ID="lbShowV" href="#V" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Vista</asp:LinkButton>
                    <asp:LinkButton ID="lbShoM" href="#M" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Modulo</asp:LinkButton>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row">
            <%--tabla tc--%>
            <div id="TC" class="  col-lg-6 col-md-6 col-sm-12 collapse">
                <div class="card bg-light mb-3">
                    <div class="card-header">                        
                            <h2 class="d-inline-block">Tipo de Control</h2>
                            <div class="d-inline-block pull-right">
                                <asp:LinkButton ID="lbTCN" href="#modalNueTC" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton>
                                <asp:LinkButton ID="lbMostrarTC" href="#secciontblTC" runat="server" Text="Mostrar TC" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton>
                            </div>                        
                    </div>
                  
                    <div class="card-body">
                        <div class="form">
                           
                        </div>
                        <div id="secciontblTC" class="table-responsive collapse">
                            <table id="tblTC" class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Tipo de Control</th>
                                        <th>Crtl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyTC">
                                    <!-- ajax-->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <%--fin tabla tc--%>
            <%--tabla elemento--%>
            <div id="E" class=" col-lg-6 col-md-6 col-sm-12 collapse">
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Elemento</h2>
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbEN" href="#ModCElem" data-toggle="modal" runat="server" CssClass="btn btn-success btn3d"><i class="fas fa-plus fa-2x"></i></asp:LinkButton>
                            <asp:LinkButton ID="lbMostrarE" href="#secciontblE" runat="server" Text="Mostrar TC" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="form">
                          
                        </div>
                        <div id="secciontblE" class="table-responsive collapse">
                            <table id="tblE" class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Elemento</th>
                                        <th>Asp</th>
                                        <th>Inicio</th>
                                        <th>TC</th>
                                        <th>Vista</th>
                                        <th>Crtl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyE">
                                    <!-- ajax-->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <%--fin tabla elemento--%>
            <%--tabla vista--%>
            <div id="V" class="  col-lg-6 col-md-6 col-sm-12 collapse">
                <div class="card bg-light mb-3">
                    <h2 class="card-header">Vista</h2>
                    <div class="card-body">
                        <div class="form">
                            <div class="form-group">
                                <asp:LinkButton ID="lbVN" href="#modalNueV" data-toggle="modal" runat="server" CssClass="btn btn-success btn3d"><i class="fas fa-plus fa-2x"></i></asp:LinkButton>
                                <asp:LinkButton ID="lbMostrarV" href="#secciontblV" runat="server" Text="Mostrar TC" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton>
                            </div>
                        </div>
                        <div id="secciontblV" class="table-responsive collapse">
                            <table id="tblV" class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Vista</th>
                                        <th>Inicio</th>
                                        <th>Módulo</th>
                                        <th>Asp</th>
                                        <th>Crtl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyV">
                                    <!-- ajax-->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <%--fin tabla vista--%>
            <%--tabla modulos--%>
            <div id="M" class="  col-lg-6 col-md-6 col-sm-12 collapse">
                <div class="card bg-light mb-3">
                    <h2 class="card-header">Módulo</h2>
                    <div class="card-body">
                        <div class="form">
                            <div class="form-group">
                                <asp:LinkButton ID="lbMN" href="#modalNueM" data-toggle="modal" runat="server" CssClass="btn btn-success btn3d"><i class="fas fa-plus fa-2x"></i></asp:LinkButton>
                                <asp:LinkButton ID="lbMostrarM" href="#secciontblM" runat="server" Text="Mostrar TC" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton>
                            </div>
                        </div>
                        <div id="secciontblM" class="table-responsive collapse">
                            <table id="tblM" class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Módulo</th>
                                        <th>Inicio</th>
                                        <th>Asp</th>
                                        <th>Crtl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyM">
                                    <!-- ajax-->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <%--fin tabla modulos--%>
        </div>
<%--alertas--%>

        <div id="alerta" class="modal bd-example-modal-sm" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"></h5>
                    </div>
                </div>
            </div>
        </div>
<%--        fin alertas--%>
        <%--modales mve--%>
        <%--modales tico--%>
        <div class="modal" id="modalNueTC">
            <div class="modal-dialog" role="document">
                <div id="DivModBorTico" class="modal-content border-success">
                    <div id="DivModHeaTico" class="modal-header bg-success">
                        <h4 id="H4ModTitTico">Editar Tipo de Elemento</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                    </div>
                    <div class="modal-body">
                        <div id="frmnueTC" runat="server" data-toggle="validator" role="form">
                            <label id="lblexistenuevotc" for="txtNuevoTC" runat="server" class="text-warning" text=""></label>
                            <div class="input-group mb-3">
                                <asp:TextBox ID="txtNuevoTC" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Tipo de Control" data-required-error="dddd" pattern="^[_A-z0-9]{3,}$" MaxLength="30"  ClientIDMode="Static"></asp:TextBox>
                                <span class="input-group-addon">
                                    <button type="button" class="btn btn-secondary popinfo2" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                        <i class="fas fa-info"></i>
                                    </button>
                                </span>
                            </div>
                            <button id="btnNueTC" tabindex="2" class="btn btn-success pull-right">
                                <i class="fas fa-save fa-2x"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>   
        <%--fin modales tc--%>

        <%-- modales Elem--%>
        <%--modCElem--%>
        <div class="modal" id="ModCElem">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-success">
                    <div class="modal-header bg-success">
                        <h4>Nuevo Elemento</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                    </div>
                    <div class="modal-body">
                        <div id="FrmCElem" runat="server" data-toggle="validator" role="form">
                            <label id="lblCElemEl" for="txtCElemEl" class="text-warning"></label>
                            <div class="input-group mb-3">
                                <asp:TextBox id="txtCElemEl" tabindex="1" class="form-control" placeholder="Nuevo Elemento" data-required-error="dddd" pattern="^\w+(\s\w+)*$" maxlength="30"  runat="server"></asp:TextBox>
<%--                                <input type="text" id="txtCElemEl" tabindex="1" class="form-control" placeholder="Nuevo Elemento" data-required-error="dddd" pattern="^\w+(\s\w+)*$" maxlength="30" >--%>
                                <span class="input-group-addon">
                                    <button type="button" class="btn btn-secondary popinfo1" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                        <i class="fas fa-info"></i>
                                    </button>
                                </span>
                            </div>
                            <asp:Label ID="lblCElemAs" runat="server" for="txtCElemAs" CssClass="text-warning" Text=""></asp:Label>
                            <div class="input-group mb-3">
                                <asp:TextBox id="txtCElemAs" tabindex="2" class="form-control" placeholder="Nuevo Id Asp" data-required-error="dddd" pattern="^[_A-z0-9]{3,10}$" maxlength="10"  runat="server"></asp:TextBox>
<%--                                <input type="text" id="txtCElemAs" tabindex="2" class="form-control" placeholder="Nuevo Id Asp" data-required-error="dddd" pattern="^[_A-z0-9]{3,10}$" maxlength="10" >--%>
                                <span class="input-group-addon">
                                    <button type="button" class="btn btn-secondary popinfo2" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                        <i class="fas fa-info"></i>
                                    </button>
                                </span>
                            </div>
                            <div class="input-group md-3">
                                <asp:DropDownList ID="DdlCElemTC" TabIndex="3" CssClass="form-control border-success" runat="server">
                                </asp:DropDownList>
                            </div>
                            <div class="input-group md-3">
                                <asp:DropDownList ID="DdlCElemVi" TabIndex="4" CssClass="form-control border-success" runat="server">
                                </asp:DropDownList>
                            </div>
                            <asp:Button ID="btnCElem" tabindex="5"  class="btn btn-success pull-right" type="submit" runat="server" Text="Guardar Nuevo" />
                            <%--<button id="" tabindex="5" runat="server" class="btn btn-success pull-right" type="submit">
                                <i class="fas fa-save fa-2x"></i>
                            </button>--%>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <%--fin modales Elem--%>

        <%--fin modales mve--%>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphJs" runat="server">
    <script src="/datatables/datatables.min.js"></script>
    <script src="/datatables/Buttons-1.5.4/js/dataTables.buttons.min.js"></script>
    <script src="/datatables/Buttons-1.5.4/js/buttons.flash.min.js"></script>
    <script src="/datatables/pdfmake-0.1.36/pdfmake.min.js"></script>
    <script src="/datatables/pdfmake-0.1.36/vfs_fonts.js"></script>
    <script src="/js/icp/crudMVE.js" type="text/javascript"></script>
    <%----%>
</asp:Content>
