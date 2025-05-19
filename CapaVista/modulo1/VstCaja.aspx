<%@ Page Title="" Language="C#" MasterPageFile="~/Pm1.Master" AutoEventWireup="true" CodeBehind="VstCaja.aspx.cs" Inherits="CapaVista.modulo1.VstCaja" ClientIDMode="Static" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/datatables/datatables.css" rel="stylesheet" />
    <link href="/datatables/Buttons-1.5.4/css/buttons.dataTables.min.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="DivNavegadorCaja" class="container-fluid">   
        <div class="row">
            <div class="header">
                <h4>Navegador</h4>            
                <div class="form-group">
                    <asp:LinkButton ID="lbDenominacionesCS" href="#DenominacionesCS" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Denomincaciones Córdobas</asp:LinkButton><!-- id href text-->
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row">
            <div id="DenominacionesCS" class="  col-lg-6 col-md-6 col-sm-12 collapse">           
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Denominaciones Córdobas</h2>                 
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbNDenominacionesCS" href="#modalNDenominacionesCS" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton><!-- id href-->
                            <asp:LinkButton ID="lbMostrarDenominacionesCS" href="#secciontblDenominacionesCS" runat="server" Text="Mostrar Denominaciones Córdobas" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton><!-- id href text-->
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblDenominacionesCS" class="table-responsive collapse">                    
                            <table id="tblDenominacionesCS" class="table table-bordered table-hover">                             
                                <thead>
                                    <tr>                                   
                                        <th>Id</th>
                                        <th>Nombre</th>
                                        <th>Cantidad</th>
                                        <th>Ctrl</th>
                                    </tr>
                                </thead>
                                <tbody id="tblBodyDenominacionesCS">                              
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="Caja" class="modal bd-example-modal-sm" tabindex="-1" role="dialog" aria-hidden="true">
       
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"></h5>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="modalNDenominacionesCS">    
        <div class="modal-dialog" role="document">
            <div id="DivModBorDenominacionesCS" class="modal-content border-success">              
                <div id="DivModHeaDenominacionesCS" class="modal-header bg-success">                  
                    <h4 id="H4ModTitDenominacionesCS">Editar Denominaciones Córdobas</h4>                   
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="frmnueDenominacionesCS" runat="server" data-toggle="validator" role="form">              
                        <label id="lblexistenuevoDenominacionesCS" for="txtNuevoDenominacionesCS" runat="server" class="text-warning" text=""></label>                    
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoDenominacionesCS" runat="server" TabIndex="1" CssClass="form-control" placeholder="Nuevo Nombre" data-required-error="dddd" pattern="[a-zA-Z0-9\,.s]*$" MaxLength="5" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfo3_5NS" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                             
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <div class="input-group mb-3">
                            <asp:TextBox ID="txtNuevoValor" runat="server" TabIndex="2" CssClass="form-control" placeholder="Nuevo Valor" data-required-error="dddd" pattern="^\d+([,.]\d{1,2})?$" MaxLength="8" ClientIDMode="Static"></asp:TextBox><!-- id placeholder pattern maxlen-->
                            <span class="input-group-addon">
                                <button type="button" class="btn btn-secondary popinfoDecimal2" data-container="body" data-toggle="popover" data-placement="top" data-content="">
                              
                                    <i class="fas fa-info"></i>
                                </button>
                            </span>
                        </div>
                        <button id="btnNueDenominacionesCS" tabindex="3" class="btn btn-success pull-right">
                   
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
    <script src="/js/icp/CRUDEDenominacionesCS.js" type="text/javascript"></script>

</asp:Content>
