var tablaCliente;
var tablaClienteNPersona;
var tablaClienteNEmpresa;
var ModCCliente = $('#modalNCliente');

var VarJsClienteId = 0;
var VarJsNombre = "";
var VarJsPlazoCredito = "";
var VarJsLimiteCredito = "";
var VarJsFechaInicio = "";
var VarJsEP = "";
var VarJsIdTipoCliente = 0;
var VarJsIdPersona = 0;
var VarJsIdEmpresa = 0;

var VAlDDLClienteTipoCliente = "null";

var formCliente = document.querySelector('#form1');

var CRUDCliente = "";
var ECliente = true;

var VarJsColorAlertCliente = "";
var VarJsTextoAlertCliente = "";

$('#lbMostrarCliente').click(function (e) {
    e.preventDefault();
    FnJsAjaxRCliente();
    FnJSFillDdlClienteTipoCliente();
});

function FnJsAjaxRCliente() {
    $.ajax({
        type: "POST",
        url: "/modulo9/VstClientes.aspx/FnRClienteV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowCliente(data.d);
        }
    }
    );
}

function AddrowCliente(data) {
    $('#tblCliente').DataTable().clear().destroy();

    tablaCliente = $("#tblCliente").DataTable({
        "retrieve": true,
        dom: 'Bfrtip',
        "order": [1, 'asc'],
        "columnDefs": [
            { "targets": 7, "searchable": false },
            { "orderable": false, "targets": 7 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colCliente'
                },
                text: '<i class="fas fa-columns fa-2x"></i>',
                className: 'btn btn-info',
                titleAttr: 'Ocultar/Mostrar Columnas',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')
                }
            },
            {
                extend: 'copy',
                text: '<i class="far fa-copy fa-2x"></i>',
                className: 'btn btn-primary d-none d-lg-block',
                exportOptions: {
                    columns: [':not(:eq(7)):visible']
                },
                titleAttr: 'Copiar',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')
                }
            },
            {
                extend: 'pdf',
                text: '<i class="far fa-file-pdf fa-2x"></i>',
                className: 'btn btn-danger',
                exportOptions: {
                    columns: [':not(:eq(7)):visible']
                },
                titleAttr: 'PDF',
                filename: 'Clientes' + "_" + FnJsDate() + "_" + FnJsHour(),
                pageSize: 'LETTER',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')
                },
                customize: function (doc) {
                    doc.content.splice(0, 1);
                    var jsDate = FnJsDate() + " " + FnJsHour();
                    var image = FnJsLogo64();
                    doc.pageMargins = [20, 60, 20, 30];
                    doc.defaultStyle.fontSize = 7;
                    doc.styles.tableHeader.fontSize = 7;
                    doc['header'] = (function () {
                        return {
                            columns: [
                                {
                                    image: image,
                                    width: 24
                                },
                                {
                                    alignment: 'left',
                                    italics: true,
                                    text: 'Cliente',
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Cliente'
                                }
                            ],
                            margin: 20
                        }
                    });
                    doc['footer'] = (function (page, pages) {
                        return {
                            columns: [
                                {
                                    alignment: 'left',
                                    text: ['Creado: ', { text: jsDate.toString() }]
                                },
                                {
                                    alignment: 'right',
                                    text: ['Pág:', { text: page.toString() }, ' de ', { text: pages.toString() }]
                                }
                            ],
                            margin: 20
                        }
                    });
                }
            },
            {
                extend: 'excel',
                filename: 'Clientes' + "_" + FnJsDate() + "_" + FnJsHour(),
                text: '<i class="far fa-file-excel fa-2x"></i>',
                className: 'btn btn-success d-none d-lg-block',
                exportOptions: {
                    columns: [':not(:eq(7)):visible']
                },
                titleAttr: 'Excel',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')
                }
            }
        ],
        "language": FnJsEspTbl()
    });
    tablaCliente.buttons().container().addClass('form-inline');
    for (var contCliente = 0; contCliente < data.length; contCliente++) {
        tablaCliente.row.add([
            data[contCliente].IdCliente,
            data[contCliente].Nombre,
            data[contCliente].EP,
            data[contCliente].ObjTipoCliente.TipoCliente,
            data[contCliente].PlazoCredito,
            data[contCliente].LimiteCredito,
            data[contCliente].Fecha_inicio,
            '<button value="editar" href="#modalNCliente" data-toggle="modal" title="editar" class="btn btn-warning  btn-editCliente"><i class="fas fa-pencil-alt"></i> </button>' +
            '<button value="eliminar" href="#modalNCliente" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteCliente"><i class="fa fa-trash" ></i> </button>'
        ]
        ).draw(false);
    }
}

$('#lbNClientePersona').click(function (e) {
    e.preventDefault();
    FnJsAjaxRClienteNPersona();
});
$('#lbNClienteEmpresa').click(function (e) {
    e.preventDefault();
    FnJsAjaxRClienteNEmpresa();
});

function FnJsAjaxRClienteNPersona() {
    $.ajax({
        type: "POST",
        url: "/modulo9/VstClientes.aspx/FnRClienteNPersonaV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowClienteNPersona(data.d);
        }
    }
    );
}
function FnJsAjaxRClienteNEmpresa() {
    $.ajax({
        type: "POST",
        url: "/modulo9/VstClientes.aspx/FnRClienteNEmpresaV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowClienteNEmpresa(data.d);
        }
    }
    );
}
function AddrowClienteNPersona(data) {
    $('#tblClienteNPersona').DataTable().clear().destroy();

    tablaClienteNPersona = $("#tblClienteNPersona").DataTable({
        "retrieve": true,
        dom: 'Bfrtip',
        "order": [1, 'asc'],
        "columnDefs": [
            { "targets": 3, "searchable": false },
            { "orderable": false, "targets": 3 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colClienteNPersona'
                },
                text: '<i class="fas fa-columns fa-2x"></i>',
                className: 'btn btn-info',
                titleAttr: 'Ocultar/Mostrar Columnas',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')
                }
            },
            {
                extend: 'copy',
                text: '<i class="far fa-copy fa-2x"></i>',
                className: 'btn btn-primary d-none d-lg-block',
                exportOptions: {
                    columns: [':not(:eq(3)):visible']
                },
                titleAttr: 'Copiar',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')
                }
            },
            {
                extend: 'pdf',
                text: '<i class="far fa-file-pdf fa-2x"></i>',
                className: 'btn btn-danger',
                exportOptions: {
                    columns: [':not(:eq(3)):visible']
                },
                titleAttr: 'PDF',
                filename: 'Lista_Posibles_Clientes' + "_" + FnJsDate() + "_" + FnJsHour(),
                pageSize: 'LETTER',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')
                },
                customize: function (doc) {
                    doc.content.splice(0, 1);
                    var jsDate = FnJsDate() + " " + FnJsHour();
                    var image = FnJsLogo64();
                    doc.pageMargins = [20, 60, 20, 30];
                    doc.defaultStyle.fontSize = 7;
                    doc.styles.tableHeader.fontSize = 7;
                    doc['header'] = (function () {
                        return {
                            columns: [
                                {
                                    image: image,
                                    width: 24
                                },
                                {
                                    alignment: 'left',
                                    italics: true,
                                    text: 'Posibles_Clientes',
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte_Posibles_Clientes'
                                }
                            ],
                            margin: 20
                        }
                    });
                    doc['footer'] = (function (page, pages) {
                        return {
                            columns: [
                                {
                                    alignment: 'left',
                                    text: ['Creado: ', { text: jsDate.toString() }]
                                },
                                {
                                    alignment: 'right',
                                    text: ['Pág:', { text: page.toString() }, ' de ', { text: pages.toString() }]
                                }
                            ],
                            margin: 20
                        }
                    });
                }
            },
            {
                extend: 'excel',
                filename: 'Lista_Posibles_Clientes' + "_" + FnJsDate() + "_" + FnJsHour(),
                text: '<i class="far fa-file-excel fa-2x"></i>',
                className: 'btn btn-success d-none d-lg-block',
                exportOptions: {
                    columns: [':not(:eq(3)):visible']
                },
                titleAttr: 'Excel',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')
                }
            }
        ],
        "language": FnJsEspTbl()
    });
    tablaClienteNPersona.buttons().container().addClass('form-inline');
    for (var contClienteNPersona = 0; contClienteNPersona < data.length; contClienteNPersona++) {
        tablaClienteNPersona.row.add([
            data[contClienteNPersona].ObjPersona.IdPersona,
            data[contClienteNPersona].ObjPersona.Nombre1,
            data[contClienteNPersona].ObjPersona.Apellido1,
            '<button value="Add" href="#modalNCliente" data-toggle="modal" title="Add" class="btn btn-success  btn-AddClienteNPersona"><i class="fas fa-plus"></i> </button>'
        ]
        ).draw(false);
    }
}
function AddrowClienteNEmpresa(data) {
    $('#tblClienteNEmpresa').DataTable().clear().destroy();

    tablaClienteNEmpresa = $("#tblClienteNEmpresa").DataTable({
        "retrieve": true,
        dom: 'Bfrtip',
        "order": [1, 'asc'],
        "columnDefs": [
            { "targets": 3, "searchable": false },
            { "orderable": false, "targets": 4 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colClienteNEmpresa'
                },
                text: '<i class="fas fa-columns fa-2x"></i>',
                className: 'btn btn-info',
                titleAttr: 'Ocultar/Mostrar Columnas',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')
                }
            },
            {
                extend: 'copy',
                text: '<i class="far fa-copy fa-2x"></i>',
                className: 'btn btn-primary d-none d-lg-block',
                exportOptions: {
                    columns: [':not(:eq(4)):visible']
                },
                titleAttr: 'Copiar',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')
                }
            },
            {
                extend: 'pdf',
                text: '<i class="far fa-file-pdf fa-2x"></i>',
                className: 'btn btn-danger',
                exportOptions: {
                    columns: [':not(:eq(4)):visible']
                },
                titleAttr: 'PDF',
                filename: 'Lista_Posibles_Clientes' + "_" + FnJsDate() + "_" + FnJsHour(),
                pageSize: 'LETTER',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')
                },
                customize: function (doc) {
                    doc.content.splice(0, 1);
                    var jsDate = FnJsDate() + " " + FnJsHour();
                    var image = FnJsLogo64();
                    doc.pageMargins = [20, 60, 20, 30];
                    doc.defaultStyle.fontSize = 7;
                    doc.styles.tableHeader.fontSize = 7;
                    doc['header'] = (function () {
                        return {
                            columns: [
                                {
                                    image: image,
                                    width: 24
                                },
                                {
                                    alignment: 'left',
                                    italics: true,
                                    text: 'Posibles_Clientes',
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte_Posibles_Clientes'
                                }
                            ],
                            margin: 20
                        }
                    });
                    doc['footer'] = (function (page, pages) {
                        return {
                            columns: [
                                {
                                    alignment: 'left',
                                    text: ['Creado: ', { text: jsDate.toString() }]
                                },
                                {
                                    alignment: 'right',
                                    text: ['Pág:', { text: page.toString() }, ' de ', { text: pages.toString() }]
                                }
                            ],
                            margin: 20
                        }
                    });
                }
            },
            {
                extend: 'excel',
                filename: 'Lista_Posibles_Clientes' + "_" + FnJsDate() + "_" + FnJsHour(),
                text: '<i class="far fa-file-excel fa-2x"></i>',
                className: 'btn btn-success d-none d-lg-block',
                exportOptions: {
                    columns: [':not(:eq(4)):visible']
                },
                titleAttr: 'Excel',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')
                }
            }
        ],
        "language": FnJsEspTbl()
    });
    tablaClienteNEmpresa.buttons().container().addClass('form-inline');
    for (var contClienteNEmpresa = 0; contClienteNEmpresa < data.length; contClienteNEmpresa++) {
        tablaClienteNEmpresa.row.add([
            data[contClienteNEmpresa].ObjEmpresa.IdEmpresa,
            data[contClienteNEmpresa].ObjEmpresa.NombreComercial,
            data[contClienteNEmpresa].ObjEmpresa.RazonSocial,
            data[contClienteNEmpresa].ObjEmpresa.Ruc,
            '<button value="Add" href="#modalNCliente" data-toggle="modal" title="Add" class="btn btn-success  btn-AddClienteNEmpresa"><i class="fas fa-plus"></i> </button>'
        ]
        ).draw(false);
    }
}

$(document).on('click', '.btn-AddClienteNPersona', function (e) {
    e.preventDefault();
    FnJsCCliente();
    var dataClienteNPersona = tablaClienteNPersona.row($(this).parents("tr")).data();
    VarJsIdPersona = dataClienteNPersona[0];
    VarJsIdEmpresa = 0;
    VarJsNombre = dataClienteNPersona[1] + ' ' + dataClienteNPersona[2];
    $('#txtNuevoNombre').val(dataClienteNPersona[1] + ' ' + dataClienteNPersona[2]);
    VarJsPlazoCredito = "";
    VarJsLimiteCredito = "";
    FnJSFillDdlClienteTipoCliente();
    VarJsClienteId = 0;
    ECliente = true;
    FnJsBlockCliente();
    CRUDCliente = "C";
});

$(document).on('click', '.btn-AddClienteNEmpresa', function (e) {
    e.preventDefault();
    FnJsCCliente();
    var dataClienteNEmpresa = tablaClienteNEmpresa.row($(this).parents("tr")).data();
    VarJsIdEmpresa = dataClienteNEmpresa[0];
    VarJsIdPersona = 0;
    VarJsNombre = dataClienteNEmpresa[1];
    $('#txtNuevoNombre').val(dataClienteNEmpresa[1]);
    VarJsPlazoCredito = "";
    VarJsLimiteCredito = "";
    FnJSFillDdlClienteTipoCliente();
    VarJsClienteId = 0;
    FnJsBlockCliente();
    CRUDCliente = "C";
});

$(document).on('click', '.btn-editCliente', function (e) {
    e.preventDefault();
    FnJsUCliente();
    var dataCliente = tablaCliente.row($(this).parents("tr")).data();
    VarJsClienteId = dataCliente[0];
    $('#txtNuevoNombre').val(dataCliente[1]);
    VarJsPlazoCredito = dataCliente[4];
    $('#txtNuevoPlazoCredito').val(dataCliente[4]);
    VarJsLimiteCredito = dataCliente[5];
    $('#txtNuevoLimiteCredito').val(dataCliente[5]);
    VAlDDLClienteTipoCliente = (dataCliente[3]);
    FnJSFillDdlClienteTipoCliente();
    VarJsIdTipoCliente = $('#ddlCClienteTipoCliente').val();
    CRUDCliente = "U";
});
$(document).on('click', '.btn-deleteCliente', function (e) {
    e.preventDefault();
    FnJsDCliente();
    ECliente = false;
    FnJsBlockCliente();
    var dataCliente = tablaCliente.row($(this).parents("tr")).data();
    VarJsClienteId = dataCliente[0];
    $('#txtNuevoNombre').val(dataCliente[1]);
    VarJsPlazoCredito = dataCliente[4];
    $('#txtNuevoPlazoCredito').val(dataCliente[4]);
    VarJsLimiteCredito = dataCliente[5];
    $('#txtNuevoLimiteCredito').val(dataCliente[5]);
    VAlDDLClienteTipoCliente = (dataCliente[3]);
    FnJSFillDdlClienteTipoCliente();
    CRUDCliente = "D";
});


function FnJsCCliente() {
    $('#lblexistenuevoCliente').text("");

    $("#DivModBorCliente").removeAttr("class");
    $("#DivModBorCliente").attr('class', 'modal-content border-success');

    $("#DivModHeaCliente").removeAttr("class");
    $("#DivModHeaCliente").attr('class', 'modal-header bg-success');

    $('#H4ModTitCliente').text('Nuevo Cliente');

    $("#btnNueCliente").removeAttr("class");
    $("#btnNueCliente").attr('class', 'btn btn-success pull-right');
    $("#btnNueCliente i").removeAttr("class");
    $("#btnNueCliente i").attr("class", "fa fa-save fa-2x");

    $("#ddlCClienteTipoCliente").removeAttr("class");
    $("#ddlCClienteTipoCliente").attr("class", "form-control border-success");

    $("#txtNuevoNombre").attr('disabled', true);
    $("#txtNuevoPlazoCredito").attr('disabled', false);
    $("#txtNuevoLimiteCredito").attr('disabled', false);
    $('#ddlCClienteTipoCliente').attr('disabled', false);

    $('#' + ModCCliente[0].id + ' :text').val("");
}
function FnJsUCliente() {
    $('#lblexistenuevoCliente').text("");

    $("#DivModBorCliente").removeAttr("class");
    $("#DivModBorCliente").attr('class', 'modal-content border-warning');

    $("#DivModHeaCliente").removeAttr("class");
    $("#DivModHeaCliente").attr('class', 'modal-header bg-warning');

    $('#H4ModTitCliente').text('Editar Cliente');

    $("#btnNueCliente").removeAttr("class");
    $("#btnNueCliente").attr('class', 'btn btn-warning pull-right');
    $("#btnNueCliente i").removeAttr("class");
    $("#btnNueCliente i").attr("class", "fa fa-save fa-2x");

    $("#ddlCClienteTipoCliente").removeAttr("class");
    $("#ddlCClienteTipoCliente").attr("class", "form-control border-warning");

    $("#txtNuevoNombre").attr('disabled', true);
    $("#txtNuevoPlazoCredito").attr('disabled', false);
    $("#txtNuevoLimiteCredito").attr('disabled', false);
    $('#ddlCClienteTipoCliente').attr('disabled', false);

    $('#' + ModCCliente[0].id + ' :text').val("");
}
function FnJsDCliente() {
    $('#lblexistenuevoCliente').text("");

    $("#DivModBorCliente").removeAttr("class");
    $("#DivModBorCliente").attr('class', 'modal-content border-danger');

    $("#DivModHeaCliente").removeAttr("class");
    $("#DivModHeaCliente").attr('class', 'modal-header bg-danger');

    $('#H4ModTitCliente').text('Eliminar Cliente');

    $("#btnNueCliente").removeAttr("class");
    $("#btnNueCliente").attr('class', 'btn btn-danger pull-right');
    $("#btnNueCliente i").removeAttr("class");
    $("#btnNueCliente i").attr("class", "fa fa-trash fa-2x");

    $("#ddlCClienteTipoCliente").removeAttr("class");
    $("#ddlCClienteTipoCliente").attr("class", "form-control border-danger");

    $("#txtNuevoNombre").attr('disabled', true);
    $("#txtNuevoPlazoCredito").attr('disabled', true);
    $("#txtNuevoLimiteCredito").attr('disabled', true);
    $('#ddlCClienteTipoCliente').attr('disabled', true);

    $('#' + ModCCliente[0].id + ' :text').val("");
}

function FnJsBlockCliente() {
    if (ECliente == true) {
        $("#btnNueCliente").fadeOut("fast");
        $("#btnNueCliente").attr('disabled', true);
    }
    else if (ECliente == false) {
        $("#btnNueCliente").fadeIn("slow");
        $("#btnNueCliente").attr('disabled', false);
    }
}


$('#btnNueCliente').click(function (e) {
    e.preventDefault();
    if (formCliente.checkValidity()) {
        switch (CRUDCliente) {
            case "C":
                FnJsAjaxCCliente();
                break;
            case "U":
                FnJsAjaxUCliente();
                break;
            case "D":
                FnJsAjaxDCliente();
                break;
            default:
                console.log("Error en cud Cliente");
        }
    }
});

function FnJsAjaxCCliente() {
    $.ajax({
        url: "/modulo9/VstClientes.aspx/FnCClienteV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            LimiteCredito: VarJsLimiteCredito,
            PlazoCredito: VarJsPlazoCredito,
            IdTipoCliente: VarJsIdTipoCliente,
            IdPersona: VarJsIdPersona,
            IdEmpresa: VarJsIdEmpresa
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Cliente Agregado");
            }
            else {
                CRUDCliente = "error"
                console.log("No se pudo agregar Cliente");
            }
            FnAlertaCliente();
        }
    });
}
function FnJsAjaxUCliente() {
    $.ajax({
        url: "/modulo9/VstClientes.aspx/FnUClienteV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdCliente: VarJsClienteId,
            LimiteCredito: VarJsLimiteCredito,
            PlazoCredito: VarJsPlazoCredito,
            IdTipoCliente: VarJsIdTipoCliente
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Cliente Actualizado");
            }
            else {
                CRUDCliente = "error"
                console.log("no se pudo actualizar");
            }
            FnAlertaCliente();
        }
    });
}
function FnJsAjaxDCliente() {
    $.ajax({
        url: "/modulo9/VstClientes.aspx/FnDClienteV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdCliente: VarJsClienteId
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {

                console.log("Cliente Eliminado");
            }
            else {

                CRUDCliente = "error"
                console.log("No se pudo Eliminar Cliente");
            }
            FnAlertaCliente();
        }
    });
}
function VerificarExisteCliente() {
    if ($('#ddlCClienteTipoCliente').val() > 0) {
        ECliente= false;
    }
    else {
        ECliente = true;
    }
    FnJsBlockCliente();
}

$('#txtNuevoPlazoCredito').keyup(function (e) {
    VarJsPlazoCredito = $(this).val();    
});

$('#txtNuevoLimiteCredito').keyup(function (e) {
    VarJsLimiteCredito = $(this).val();
});

$('#ddlCClienteTipoCliente').change(function (e) {
    VarJsIdTipoCliente = $('#ddlCClienteTipoCliente').val(); 
    VerificarExisteCliente();    
});

function FnJSFillDdlClienteTipoCliente() {
    $('#ddlCClienteTipoCliente').empty();
    $.ajax({
        type: "POST",
        url: "/modulo9/VstTipoCliente.aspx/FnRTipoClienteV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLClienteTipoCliente == "null") {
                $('#ddlCClienteTipoCliente').append($("<option> </option>").val("0").html("Seleccionar Tipo de Cliente"));
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLClienteTipoCliente == value.TipoCliente) {
                        $('#ddlCClienteTipoCliente').append($("<option> </option>").val(value.IdTipoCliente).html(value.TipoCliente));
                        VarJsIdTipoCliente = value.IdTipoCliente;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCClienteTipoCliente').append($("<option> </option>").val(value.IdTipoCliente).html(value.TipoCliente));
            });
            VAlDDLClienteTipoCliente = "null";
        }
    });
}

function FnAlertaCliente() {

    switch (CRUDCliente) {
        case "C":
            VarJsColorAlertCliente = "bg-success";
            VarJsTextoAlertCliente = "Creado";
            break;
        case "U":
            VarJsColorAlertCliente = "bg-warning";
            VarJsTextoAlertCliente = "Actualizado";
            break;
        case "D":
            VarJsColorAlertCliente = "bg-danger";
            VarJsTextoAlertCliente = "Eliminado";
            break;
        case "Error":
            VarJsColorAlertCliente = "bg-secondary";
            VarJsTextoAlertCliente = "No se pudo realizar la operación";
            break;
        default:
            console.log("Error CUD Cliente Alert")
    }

    $('.bd-example-modal-sm .modal-content').addClass(VarJsColorAlertCliente);
    $('.bd-example-modal-sm h5').text(VarJsTextoAlertCliente);
    $('.bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.bd-example-modal-sm').modal('hide');
        $('.bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertCliente);
    }, 1500);

    if ($("#secciontblCliente.show").length > 0) {
        FnJsAjaxRCliente();
        FnJsAjaxRClienteNPersona();
        FnJsAjaxRClienteNEmpresa();
    }
    $("#modalNCliente").modal("toggle");
}