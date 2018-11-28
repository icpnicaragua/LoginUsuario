<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="masterpage1.aspx.cs" Inherits="CapaVista.masterpage1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePageMethods="true"></asp:ScriptManager>
            <asp:HiddenField ID="hdIU" runat="server" />
        </div>
    </form>
</body>
</html>
