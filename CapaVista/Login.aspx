<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="CapaVista.Login" %>

<!DOCTYPE html>

<html class="bg-black" xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
   
    <%--importante poner esto--%>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/> 
    <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css"/>
     <link rel="stylesheet" href="css/Admin.css" type="text/css" />
    <link rel="stylesheet" href="css/font-awesome.css" type="text/css"/>
    <%--importante poner esto--%>
    <title>Login</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    
</head>
<body class="bg-black" >
     <noscript>
  <meta http-equiv="refresh" content="0;url=errores/NoJava.aspx"/>
</noscript>
    <div class="form-box " id="loginbox">
        <div class="header bg-black" >Iniciar Sesión</div>
<form id="form1" runat="server" data-toggle="validator" role="form">
        <div class="body bg-blue-gradient">
            <div class="form-group">
            <asp:TextBox ID="txtUsuario" runat="server" CssClass="form-control" placeholder="Usuario" data-required-error="dddd" pattern="^[_A-z0-9]{1,}$" required></asp:TextBox>
                <asp:RequiredFieldValidator ID="rfvusuario" runat="server" ErrorMessage="Campo Requerido" ControlToValidate="txtUsuario" Display="Dynamic" EnableClientScript="False"></asp:RequiredFieldValidator>
            </div>
            <div class="form-group">
            <asp:TextBox ID="TxtClave" runat="server" CssClass="form-control" placeholder="Contraseña" TextMode="Password" required pattern="^[_A-z0-9]{1,}$" ></asp:TextBox>
               <asp:RequiredFieldValidator ID="rfvclave" runat="server" ErrorMessage="Campo Requerido" ControlToValidate="TxtClave" Display="Dynamic" EnableClientScript="False"></asp:RequiredFieldValidator> 
            </div>
            <div class="footer">
            <asp:Button ID="btnIngresar" type="submit" runat="server" Text="Ingresar" OnClick="btnIngresar_Click" cssclass="btn bg-black btn-block"/>
                </div>
        </div>
</form>
    </div>

    <!-- Footer -->
<footer class="page-footer font-small special-color-dark pt-4">

    <!-- Footer Elements -->
    <div class="container">

      <!-- Social buttons -->
      <ul class="list-unstyled list-inline text-center">
        <li class="list-inline-item">
          <a class="btn-floating btn-fb mx-1">
            <i class="fa fa-facebook"> </i>
          </a>
        </li>

        <li class="list-inline-item">
          <a class="btn-floating btn-gplus mx-1">
            <i class="fa fa-google-plus"> </i>
          </a>
        </li>
        <li class="list-inline-item">
          <a class="btn-floating btn-li mx-1">
            <i class="fa fa-linkedin"> </i>
          </a>
        </li>
 
      </ul>
      <!-- Social buttons -->

    </div>
    <!-- Footer Elements -->

    <!-- Copyright -->
    <div class="footer-copyright text-center py-3">© 2018 Copyright:
      <a href="#"> ICP Nicaragua</a>
    </div>
    <!-- Copyright -->

  </footer>
  <!-- Footer -->

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>


    <%--<script src="js/Admin/app.js" type="text/javascript"></script>--%>
</body>
</html>
