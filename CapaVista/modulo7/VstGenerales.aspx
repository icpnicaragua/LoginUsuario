<%@ Page Title="" Language="C#" MasterPageFile="~/Pm1.Master" AutoEventWireup="true" CodeBehind="VstGenerales.aspx.cs" Inherits="CapaVista.modulo7.VstGenerales" ClientIDMode="Static" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div id="DivNavegadorGenerales" class="container-fluid">
        <div class="row">
            <div class="header">
                <h4>Navegador</h4>
                <div class="form-group">
                    <asp:LinkButton ID="lbTIdentificacion" href="#TIdentificacion" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Tipo de Identificacion</asp:LinkButton>
                    <asp:LinkButton ID="lbTDireccion" href="#TDireccion" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Tipo de Dirección</asp:LinkButton>
                    <asp:LinkButton ID="lbTCorreo" href="#TCorreo" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Tipo Correo</asp:LinkButton>
                    <asp:LinkButton ID="lbTTelefono" href="#TTelefono" data-toggle="collapse" runat="server" CssClass="btn btn-info btn3d">Tipo de Teléfono</asp:LinkButton>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row">
            <div id="TIdentificacion" class="  col-lg-6 col-md-6 col-sm-12 collapse">
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <h2 class="d-inline-block">Tipo de Identificacion</h2>
                        <div class="d-inline-block pull-right">
                            <asp:LinkButton ID="lbTCN" href="#modalNueTC" data-toggle="modal" runat="server" CssClass="btn btn-success  btn3d "><i class="fas fa-plus fa-2x"></i></asp:LinkButton>
                            <asp:LinkButton ID="lbMostrarTC" href="#secciontblTC" runat="server" Text="Mostrar TC" CssClass="btn btn-info btn3d" data-toggle="collapse"><i class="far fa-eye fa-2x"></i></asp:LinkButton>
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="secciontblTC" class="table-responsive collapse">
                            <table id="tblTC" class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Tipo de Identifiación</th>
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
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphJs" runat="server">
</asp:Content>
