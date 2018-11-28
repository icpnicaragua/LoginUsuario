<%@ Page Title="" Language="C#" MasterPageFile="~/Pm1.Master" AutoEventWireup="true" CodeBehind="vista13.aspx.cs" Inherits="CapaVista.modulo4.WebForm2" ClientIDMode="Static" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <%--css individual--%>
       <link href="/datatables/datatables.css" rel="stylesheet" /> <%--probada ok--%>
    <link href="/datatables/Buttons-1.5.4/css/buttons.dataTables.min.css" rel="stylesheet" />
           


</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div id="navegadorMVETC" class="container-fluid">
        <div class="row">
            <div class="header">
                <h4>Navegador</h4>
                <div class="form-group">
                    <asp:LinkButton ID="lbShowTC" href="#TC" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Tipo de Elemento</asp:LinkButton>
                    <asp:LinkButton ID="lbShowE" href="#E" data-toggle="collapse" runat="server" CssClass="btn btn-danger btn3d">Elemento</asp:LinkButton>
                    <asp:LinkButton ID="lbShowV" href="#V" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Vista</asp:LinkButton>
                    <asp:LinkButton ID="lbShoM" href="#M" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Modulo</asp:LinkButton>
                    <asp:LinkButton ID="lbhide"  href="#" data-toggle="offcanvas" runat="server" CssClass="btn btn-info ">orr</asp:LinkButton>
                </div>
            </div>
        </div>
    </div>

        
        
        
    <div class="container-fluid">
            <div class="row"> <%--tc--%>
                <div id="TC" class="  col-lg-6 col-md-6 col-sm-12 collapse">
                    <div class="card bg-light mb-3">
                        <h2 class="card-header">Tipo de Control</h2>
                        <div class="card-body">
                            <div class="form">
                                <div class="form-group">
                                    <asp:LinkButton ID="lbTCN" href="#modalNueTC" data-toggle="modal" runat="server" CssClass="btn btn-success btn3d"><i class="fas fa-plus fa-2x"></i></asp:LinkButton>
                                    <asp:LinkButton ID="lbMostrarTC" href="#secciontblTC" runat="server" Text="Mostrar TC" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton>
                                </div>
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
                <%--modaltc--%>
                <div class="modal fade" id="modalNueTC">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content border-success">
                            <div class="modal-header bg-success">
                                <h4>Editar Tipo de Elemento</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                            </div>
                            <div class="modal-body">

                                <div id="frmnueTC" runat="server" data-toggle="validator" role="form">
                        <div class="form-group">
                            <asp:TextBox ID="txtNuevoTC" runat="server" CssClass="form-control" placeholder="Nuevo Tipo de Control" data-required-error="dddd" pattern="^[_A-z0-9]{3,}$" required ClientIDMode="Static"></asp:TextBox>
                            <asp:Label ID="lblexistenuevotc" runat="server" CssClass="text-muted" Text=""></asp:Label>
                        </div>
                        
                        <asp:Button ID="btnNueTC" runat="server" cssclass="btn btn-success pull-right" Text="guardar" />
                    </div>

                            </div>
                        </div>
                    </div>
                </div>
                <%--editartc--%>
                <div class="modal fade" id="modalEdiTC">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content border-warning">
                            <div class="modal-header bg-warning">
                                <h4>Editar Tipo de Elemento</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                            </div>
                            <div class="modal-body">
                                <div class="form" data-toggle="validator" role="form">
                                    <div class="form-group">
                                        <asp:Label ID="lblEditTE" runat="server" Text="Tipo de Elemento"></asp:Label>
                                    </div>
                                    <div class="form-group">
                                        <asp:TextBox ID="txtEditarTC" runat="server" CssClass="form-control border-warning" pattern="^[_A-z0-9]{1,}$" required></asp:TextBox>
                                    </div>
                                    <asp:LinkButton ID="lbGuaCamTC" class="close" data-dismiss="modal" runat="server" CssClass="btn btn-primary pull-right"><i class="fa fa-save fa-2x"></i></asp:LinkButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <%--eliinartc --%>
                <div class="modal fade" id="modaldelTC">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content border-danger">
                            <div class="modal-header bg-danger">
                                <h4>Eliminar Tipo de Elemento</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                            </div>
                            <div class="modal-body">
                                <div class="form" data-toggle="validator" role="form">
                                    <div class="form-group">
                                        <asp:Label ID="Label1" runat="server" Text="Tipo de Elemento"></asp:Label>
                                    </div>
                                    <div class="form-group">
                                        <asp:Label ID="lbleliTC" runat="server" Text=""></asp:Label>
                                    </div>
                                    <asp:LinkButton ID="lbelimTC" class="close" data-dismiss="modal" runat="server" CssClass="btn btn-danger pull-right"><i class="fa fa-trash fa-2x"></i></asp:LinkButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           
                 <div id="E" class=" col-lg-6 col-md-6 col-sm-12 collapse">
                    <div class="card bg-light mb-3">
                        <h2 class="card-header">Elemento</h2>
                        <div class="card-body">
                            <div class="form">
                                <div class="form-group">
                                    <asp:LinkButton ID="LinkButton1" href="#modalNueTC" data-toggle="modal" runat="server" CssClass="btn btn-success"><i class="fas fa-plus fa-2x"></i></asp:LinkButton>
                                    <asp:LinkButton ID="LinkButton2" href="#secciontblTC" runat="server" Text="Mostrar TC" CssClass="btn btn-info " data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton>
                                </div>
                            </div>
                            <div id="secciontblE" class="table-responsive collapse">
                                <table id="tblE" class="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Tipo de Control</th>
                                            <th></th>
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
            </div>
        <%--la otra tabla--%>
           
                <%--modaltc--%>
        </div>


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphJs" runat="server">
   <script src="/datatables/datatables.min.js"></script>
    <script src="/datatables/Buttons-1.5.4/js/dataTables.buttons.min.js"></script>
    <script src="/datatables/Buttons-1.5.4/js/buttons.flash.min.js"></script>
    <script src="/datatables/pdfmake-0.1.36/pdfmake.min.js"></script>
    <script src="/datatables/pdfmake-0.1.36/vfs_fonts.js"></script>
 

    <script src="/js/icp/crudMVE.js" type="text/javascript"></script> <%----%>
</asp:Content>
