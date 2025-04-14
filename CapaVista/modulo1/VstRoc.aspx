<%@ Page Title="" Language="C#" MasterPageFile="~/Pm1.Master" AutoEventWireup="true" CodeBehind="VstRoc.aspx.cs" Inherits="CapaVista.modulo1.VstRoc" ClientIDMode="Static" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     <link href="/datatables/datatables.css" rel="stylesheet" />
 <link href="/datatables/Buttons-1.5.4/css/buttons.dataTables.min.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<div id="DivNavegadorRoc" class="container-fluid">
    <!-- id-->
    <div class="row">
        <div class="header">
            <h4>Navegador</h4>
            <!-- h4-->
            <div class="form-group">
                <asp:LinkButton ID="lbConceptoRoc" href="#ConceptoRoc" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Concepto ROC</asp:LinkButton><!-- id href text-->
           <asp:LinkButton ID="lbPagoSobre" href="#PagoSobre" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Pago Sobre</asp:LinkButton><!-- id href text-->
            
                </div>
        </div>
    </div>
</div>
<div class="container-fluid">
    <div class="row">
        <div id="ConceptoRoc" class="  col-lg-6 col-md-6 col-sm-12 collapse">
            <!-- id-->
            <div class="card bg-light mb-3">
                <div class="card-header">
                    <h2 class="d-inline-block">ConceptoRoc</h2>
                    <!-- h2-->
                    <div class="d-inline-block pull-right">
                        <asp:LinkButton ID="lbNConceptoRoc" href="#modalNConceptoRoc" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton><!-- id href-->
                        <asp:LinkButton ID="lbMostrarConceptoRoc" href="#secciontblConceptoRoc" runat="server" Text="Mostrar Concepto ROC" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton><!-- id href text-->
                    </div>
                </div>
                <div class="card-body">
                    <div id="secciontblConceptoRoc" class="table-responsive collapse">
                        <!-- id-->
                        <table id="tblConceptoRoc" class="table table-bordered table-hover">
                            <!-- id-->
                            <thead>
                                <tr>
                                    <!-- campos-->
                                    <th>Id</th>
                                    <th>Concepto ROC</th>
                                    <th>Ctrl</th>
                                </tr>
                            </thead>
                            <tbody id="tblBodyConceptoRoc">
                                <!-- id-->
                                <!-- ajax-->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
           <div id="PagoSobre" class="  col-lg-6 col-md-6 col-sm-12 collapse">
       <!-- id-->
       <div class="card bg-light mb-3">
           <div class="card-header">
               <h2 class="d-inline-block">PagoSobre</h2>
               <!-- h2-->
               <div class="d-inline-block pull-right">
                   <asp:LinkButton ID="lbNPagoSobre" href="#modalNPagoSobre" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton><!-- id href-->
                   <asp:LinkButton ID="lbMostrarPagoSobre" href="#secciontblPagoSobre" runat="server" Text="Mostrar Pago Sobre" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton><!-- id href text-->
               </div>
           </div>
           <div class="card-body">
               <div id="secciontblPagoSobre" class="table-responsive collapse">
                   <!-- id-->
                   <table id="tblPagoSobre" class="table table-bordered table-hover">
                       <!-- id-->
                       <thead>
                           <tr>
                               <!-- campos-->
                               <th>Id</th>
                               <th>Pago Sobre</th>
                               <th>Ctrl</th>
                           </tr>
                       </thead>
                       <tbody id="tblBodyPagoSobre">
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
<div id="alertaRoc" class="modal bd-example-modal-sm" tabindex="-1" role="dialog" aria-hidden="true">
    <!-- id-->
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"></h5>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalNConceptoRoc">
    <!-- id-->
    <div class="modal-dialog" role="document">
        <div id="DivModBorConceptoRoc" class="modal-content border-success">
            <!-- id-->
            <div id="DivModHeaConceptoRoc" class="modal-header bg-success">
                <!-- id-->
                <h4 id="H4ModTitConceptoRoc">Editar Concepto ROC</h4>
                <!-- id h4-->
                <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
            </div>
            <div class="modal-body">
                <div id="frmnueConceptoRoc" runat="server" data-toggle="validator" role="form">
                    <!-- id-->
                    <label id="lblexistenuevoConceptoRoc" for="txtNuevoConceptoRocn" runat="server" class="text-warning" text=""></label>
                    <!-- id for-->
                    <div class="input-group mb-3">
                        <asp:TextBox ID="txtNuevoConceptoRoc" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo ConceptoRoc" data-required-error="dddd" pattern="[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]*$" MaxLength="45" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                        <span class="input-group-addon">
                            <button type="button" class="btn btn-secondary popinfo345NS" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                <!-- class popinfoX-->
                                <i class="fas fa-info"></i>
                            </button>
                        </span>
                    </div>
                    <button id="btnNueConceptoRoc" tabindex="2" class="btn btn-success pull-right">
                        <!-- id idex(si aplica)-->
                        <i class="fas fa-save fa-2x"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
       <div class="modal" id="modalNPagoSobre">
       <!-- id-->
       <div class="modal-dialog" role="document">
           <div id="DivModBorPagoSobre" class="modal-content border-success">
               <!-- id-->
               <div id="DivModHeaPagoSobre" class="modal-header bg-success">
                   <!-- id-->
                   <h4 id="H4ModTitPagoSobre">Editar Pago Sobre</h4>
                   <!-- id h4-->
                   <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
               </div>
               <div class="modal-body">
                   <div id="frmnuePagoSobre" runat="server" data-toggle="validator" role="form">
                       <!-- id-->
                       <label id="lblexistenuevoPagoSobre" for="txtNuevoPagoSobren" runat="server" class="text-warning" text=""></label>
                       <!-- id for-->
                       <div class="input-group mb-3">
                           <asp:TextBox ID="txtNuevoPagoSobre" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Pago Sobre" data-required-error="dddd" pattern="[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]*$" MaxLength="20" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                           <span class="input-group-addon">
                               <button type="button" class="btn btn-secondary popinfo320NS" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                                   <!-- class popinfoX-->
                                   <i class="fas fa-info"></i>
                               </button>
                           </span>
                       </div>
                       <button id="btnNuePagoSobre" tabindex="2" class="btn btn-success pull-right">
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
<script src="/js/icp/CRUDEConceptoRoc.js" type="text/javascript"></script>
    <script src="/js/icp/CRUDEPagoSobre.js" type="text/javascript"></script>
</asp:Content>
