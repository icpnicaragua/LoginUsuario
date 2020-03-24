<%@ Page Title="" Language="C#" MasterPageFile="~/Pm1.Master" AutoEventWireup="true" CodeBehind="vst2.aspx.cs" Inherits="CapaVista.modulo1.vista2" ClientIDMode="Static" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    vista2
    <br />
    <h1 class="alert-primary"> treeview </h1>
    <asp:Button ID="Button1" class="btn " runat="server" Text="Button" OnClick="Button1_Click" />
    <asp:TreeView ID="TreeView1" runat="server"></asp:TreeView>
   
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphJs" runat="server">
</asp:Content>
