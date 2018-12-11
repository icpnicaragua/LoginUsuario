<%@ Page Title="" Language="C#" MasterPageFile="~/Pm1.Master" AutoEventWireup="true" CodeBehind="vista14.aspx.cs" Inherits="CapaVista.modulo4.WebForm3" ClientIDMode="Static" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    vista14

    <asp:Button ID="btnmodal"  runat="server" Text="mostrarmodal" href="#modalprueba" data-toggle="modal" />
    <asp:Button ID="btnmodal2"  runat="server" Text="mostrarmodal2" href="#modalprueba2" data-toggle="modal" />
    <asp:Button ID="btnmodal3"  runat="server" Text="mostrarmodal3" href="#modalprueba3" data-toggle="modal" />
    <asp:Button ID="btnmodal4"  runat="server" Text="mostrarmodal4" href="#modalprueba4" data-toggle="modal" />

    <div class="modal fade" id="modalprueba">
        <div class="modal-dialog" role="document">
            <div class="modal-content border-danger">
                <div class="modal-header bg-danger">
                    <h4>Eliminar Tipo de Elemento</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="form11" runat="server" data-toggle="validator" role="form">
                        <div class="form-group">
                            <asp:TextBox ID="txtUsuario" runat="server" CssClass="form-control" placeholder="Usuario" data-required-error="dddd" pattern="^[_A-z0-9]{1,}$" MaxLength="20" ></asp:TextBox>
                        </div>
                        <div class="form-group">
                            <asp:TextBox ID="TxtClave" runat="server" CssClass="form-control" placeholder="Contraseña" TextMode="Password"  pattern="^[_A-z0-9]{1,}$"></asp:TextBox>
                        </div>
                        <asp:Button ID="btnpruebavalidacion" runat="server" Text="prueba" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalprueba2">
        <div class="modal-dialog" role="document">
            <div class="modal-content border-danger">
                <div class="modal-header bg-danger">
                    <h4>2</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="Div1" runat="server" data-toggle="validator" role="form">
                        <div class="input-group">
                            <asp:TextBox ID="TextBox1" runat="server" CssClass="form-control" placeholder="Usuario" data-required-error="dddd" pattern="^[_A-z0-9]{1,}$" MaxLength="20" ></asp:TextBox>
                        </div>
                        <div class="input-group">
                            <asp:TextBox ID="TextBox2" runat="server" CssClass="form-control" placeholder="Contraseña" TextMode="Password"  pattern="^[_A-z0-9]{1,}$"></asp:TextBox>
                        </div>
                        <asp:Button ID="Button1" runat="server" Text="prueba" />
                    </div>
                </div>
            </div>
        </div>
    </div>



    <div class="modal fade" id="modalprueba3">
        <div class="modal-dialog" role="document">
            <div class="modal-content border-danger">
                <div class="modal-header bg-danger">
                    <h4>3</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="Div2" runat="server" data-toggle="validator" role="form">
                        <div class="form-group">
                            <asp:TextBox ID="TextBox3" runat="server" CssClass="form-control" placeholder="Usuario" data-required-error="dddd"  pattern="^[_A-z0-9]{1,}$" MaxLength="20" ></asp:TextBox>
                        </div>
                        <div class="form-group">
                            <asp:TextBox ID="TextBox4" runat="server" CssClass="form-control" placeholder="Contraseña" TextMode="Password" maxlength="10"  pattern="^[_A-z0-9]{1,}$"></asp:TextBox>
                        </div>
                        <asp:Button ID="Button2" runat="server" Text="prueba" />
                    </div>
                </div>
            </div>
        </div>
    </div>
   
    <div class="modal fade" id="modalprueba4">
        <div class="modal-dialog" role="document">
            <div class="modal-content border-danger">
                <div class="modal-header bg-danger">
                    <h4>4</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="close"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                  
                        <div class="form-group">
                                <input type="text" id="txtCElemEld" tabindex="1" class="form-control" placeholder="Nuevo Elemento" data-required-error="dddd" pattern="^\w+(\s\w+)*$" maxlength="30" >
                        </div>
                        <div class="form-group">
                                <input type="text" id="txtCElemEl" tabindex="1" class="form-control" placeholder="Nuevo Elemento" data-required-error="dddd" pattern="^\w+(\s\w+)*$" maxlength="30" >
                        </div>
                          <button id="Button3" tabindex="5" runat="server"  class="btn btn-success pull-right" type="submit">
                                <i class="fas fa-save fa-2x"></i>
                            </button>
                       
                    
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphJs" runat="server">
    <script>
        

        $('#btnmodal').click(function (e) {
    e.preventDefault();
           
        });
           

             $('#btnmodal2').click(function (e) {
    e.preventDefault();
           
        });

             $('#btnmodal3').click(function (e) {
    e.preventDefault();
        
        });
        //var form = $('#form1');
      var form = document.querySelector('#form1');
var tico = document.querySelector('#Button3');
        tico.addEventListener('click', function (e) {
            
            if (form.checkValidity()) {
        e.preventDefault();
        console.log("ok")
  }
  else {
    //form.querySelector('input[type="submit"]').click();
  }
}, false);

        
             $('#btnmodal4').click(function (e) {
    e.preventDefault();
    
        });
    </script>
</asp:Content>
