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
                <%--fin tabla tc--%>
                <%--tabla elemento--%>
                <div id="E" class=" col-lg-6 col-md-6 col-sm-12 collapse">
                    <div class="card bg-light mb-3">
                        <h2 class="card-header">Elemento</h2>
                        <div class="card-body">
                            <div class="form">
                                <div class="form-group">
                                    <asp:LinkButton ID="lbEN" href="#ModCElem" data-toggle="modal" runat="server" CssClass="btn btn-success btn3d"><i class="fas fa-plus fa-2x"></i></asp:LinkButton>
                                    <asp:LinkButton ID="lbMostrarE" href="#xxx" runat="server" Text="Mostrar TC" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton>
                                </div>
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
                <%--modales mve--%>
        <%--modales tico--%>
        <%--modCTiCo--%>
        <div class="modal" data-easein="flipBounceXIn"  id="modalNueTC"  tabindex="-1" role="dialog"  aria-hidden="true">
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
                            <asp:Button ID="btnNueTC" runat="server" CssClass="btn btn-success pull-right" Text="guardar" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <%--modUTiCo--%>
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
                            <asp:LinkButton ID="lbGuaCamTC" runat="server" CssClass="btn btn-primary pull-right"><i class="fa fa-save fa-2x"></i></asp:LinkButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <%--ModDTiCo --%>
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
                            <asp:LinkButton ID="lbelimTC" runat="server" CssClass="btn btn-danger pull-right"><i class="fa fa-trash fa-2x"></i></asp:LinkButton>
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
                            <div class="input-group ">
                                <input type="text" id="txtCElemEl" class="form-control" placeholder="Nuevo Elemento" data-required-error="dddd" pattern="^\w+(\s\w+)*$" maxlength="30" required>
                                <span class="input-group-addon">
                                    <button type="button" class="btn btn-secondary popinfo1" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                        <i class="fas fa-info"></i>
                                    </button>
                                </span>
                                <label id="lblCElemEl" class="text-muted"></label>
                            </div>
                            <div class="input-group">
                                <asp:TextBox ID="txtCElemAs" runat="server" CssClass="form-control" placeholder="Nuevo Id Asp" data-required-error="dddd" pattern="^[_A-z0-9]{3,10}$" MaxLength="10" required></asp:TextBox>
                                <asp:Label ID="lblCElemAs" runat="server" CssClass="text-muted" Text=""></asp:Label>
                            </div>
                            <asp:Button ID="btnCElem" runat="server" CssClass="btn btn-success pull-right" Text="Guardar" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <%--modUElem--%>
        <div class="modal fade" id="xxxxxxx">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-warning">
                    <div class="modal-header bg-warning">
                        <h4>Editar Tipo de Elemento</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                    </div>
                    <div class="modal-body">
                        <div class="form" data-toggle="validator" role="form">
                            <div class="form-group">
                                <asp:Label ID="Label3" runat="server" Text="Tipo de Elemento"></asp:Label>
                            </div>
                            <div class="form-group">
                                <asp:TextBox ID="TextBox2" runat="server" CssClass="form-control border-warning" pattern="^[_A-z0-9]{1,}$" required></asp:TextBox>
                            </div>
                            <asp:LinkButton ID="LinkButton1" runat="server" CssClass="btn btn-primary pull-right"><i class="fa fa-save fa-2x"></i></asp:LinkButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <%--ModDElem --%>
        <div class="modal fade" id="ddddddddddddd">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-danger">
                    <div class="modal-header bg-danger">
                        <h4>Eliminar Tipo de Elemento</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                    </div>
                    <div class="modal-body">
                        <div class="form" data-toggle="validator" role="form">
                            <div class="form-group">
                                <asp:Label ID="Label4" runat="server" Text="Tipo de Elemento"></asp:Label>
                            </div>
                            <div class="form-group">
                                <asp:Label ID="Label5" runat="server" Text=""></asp:Label>
                            </div>
                            <asp:LinkButton ID="LinkButton2" runat="server" CssClass="btn btn-danger pull-right"><i class="fa fa-trash fa-2x"></i></asp:LinkButton>
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
     <script src="/js/icp/crudMVE.js" type="text/javascript"></script> <%----%>
    <script>
        $(function () {
            $('[data-toggle="popover"]').popover()
        });
        $('.popinfo1').attr('data-content', "Letras y números, 1 espacio entre palabras, sin espacios al final o inicio. Mínimo 3, máximo 30 caracteres");
        $('.popinfo2').attr('data-content', "Letras y números, sin espacios entre palabras. Mínimo 3, máximo 10 caracteres");
        
    </script>
    <script>
// add the animation to the modal
$(".modal").each(function(index) {
  $(this).on('show.bs.modal', function(e) {
    var open = $(this).attr('data-easein');
    if (open == 'shake') {
      $('.modal-dialog').velocity('callout.' + open);
    } else if (open == 'pulse') {
      $('.modal-dialog').velocity('callout.' + open);
    } else if (open == 'tada') {
      $('.modal-dialog').velocity('callout.' + open);
    } else if (open == 'flash') {
      $('.modal-dialog').velocity('callout.' + open);
    } else if (open == 'bounce') {
      $('.modal-dialog').velocity('callout.' + open);
    } else if (open == 'swing') {
      $('.modal-dialog').velocity('callout.' + open);
    } else {
      $('.modal-dialog').velocity('transition.' + open);
    }

  });
});
        </script>

    
</asp:Content>
