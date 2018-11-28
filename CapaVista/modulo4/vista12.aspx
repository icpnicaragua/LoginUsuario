<%@ Page Title="" Language="C#" MasterPageFile="~/Pm1.Master" AutoEventWireup="true" CodeBehind="vista12.aspx.cs" Inherits="CapaVista.modulo4.WebForm1" ClientIDMode="Static"%>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div>
        <asp:Button ID="btnVerPermisos" runat="server" Text="Ver Permisos" OnClick="btnVerPermisos_Click" />
        <asp:TreeView ID="tvPermisos" runat="server" ShowCheckBoxes="all"></asp:TreeView>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphJs" runat="server" >
</asp:Content>
