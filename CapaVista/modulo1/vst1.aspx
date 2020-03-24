<%@ Page Title="" Language="C#" MasterPageFile="~/Pm1.Master" AutoEventWireup="true" CodeBehind="vst1.aspx.cs" Inherits="CapaVista.modulo1.vista1" ClientIDMode="Static" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    vista1
    <asp:FileUpload ID="FileUpload1" runat="server" TabIndex="25" />
    <asp:Button ID="Button1" runat="server" Text="guardar" TabIndex="50" />
    <asp:RadioButton ID="RadioButton1" runat="server" />
    <asp:Label ID="Label1" runat="server" Text="Label"></asp:Label>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphJs" runat="server">
</asp:Content>
