var tablaGasto;
var ModCGasto = $('#modalNGasto');
var dataGasto;
var VarJsGastoId = 0;
var VarJsFecha = "";
var VarJsHora = "";
var VarJsSerie = "";
var VarJsDocumento = "";
var VarJsCantidad = "";
var VarJsIdTipoGasto = 0;
var VarJsDescripcion = "";
var VarJsGDC = '1';
var VarJsIdAutorizado = 0;
var VarJsEstado = "";
var VarJsIdInicioCaja = "";
var VarJsEstadoInicioCaja = "";
var VAlDDLGastoTipoGasto = "null";
var VAlDDLGastoAutorizado = "null";
var formGasto = document.querySelector('#form1');
CRUDGasto = "";
var VarJsColorAlertGasto = "";
var VarJsTextoAlertGasto = "";
var EGasto = true;

$("[data-mask]").inputmask();

$('#lbMostrarInicioCajaActiva').click(function (e) {
    e.preventDefault();
    FnJsAjaxRInicioCajaActiva();
});
function FnJsAjaxRInicioCajaActiva() {
    $.ajax({
        type: "POST",
        url: "/modulo1/VstInicioCaja.aspx/FnRInicioCajaV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowInicioCajaActiva(data.d);
        }
    }
    );
}
function AddrowInicioCajaActiva(data) {
    $('#tblInicioCajaActiva').DataTable().clear().destroy();
    tablaInicioCajaActiva = $("#tblInicioCajaActiva").DataTable({
        "retrieve": true,
        select: true,
        dom: 'frtip',
        "order": [2, 'desc'],
        "columnDefs": [
            { "targets": 4, "searchable": false },
            { "orderable": false, "targets": 4 },
            { "targets": 5, "searchable": false },
            { "visible": false, "targets": 5 }
        ],
        "language": FnJsEspTbl()
    });
    tablaInicioCajaActiva.buttons().container().addClass('form-inline');
    var Btn = '';
    for (var contInicioCajaActiva = 0; contInicioCajaActiva < data.length; contInicioCajaActiva++) {
        Btn = '';
        if (data[contInicioCajaActiva].Estado == 2) {
            Btn = '<button value="ADD" href="#modalNGasto" data-toggle="modal" title="ADD" class="btn btn-success  btn-AddGasto"><i class="fa fa-link"></i> </button>';
        }
        tablaInicioCajaActiva.row.add([
            data[contInicioCajaActiva].IdInicioCaja,
            data[contInicioCajaActiva].ObjCajero.ObjPersona.Nombre1 + ' ' + data[contInicioCajaActiva].ObjCajero.ObjPersona.Apellido1,
            data[contInicioCajaActiva].Fecha,
            data[contInicioCajaActiva].Hora,
            Btn,
            data[contInicioCajaActiva].Estado
        ]
        ).draw(false);
    }
}

$('#tblInicioCajaActiva tbody').on('click', 'tr', function () {
    var tablaInicioCajaIC = $('#tblInicioCajaActiva').DataTable();
    VarJsIdInicioCaja = tablaInicioCajaIC.row(this).data()[0];
    VarJsEstadoInicioCaja = tablaInicioCajaIC.row(this).data()[5];
    FnJsAjaxRGastoIC();
    $("#GastoIC").attr('class', 'col-lg-12 col-md-12 col-sm-12 collapse show');
})

function FnJsAjaxRGastoIC() {
    $.ajax({
        type: "POST",
        url: "/modulo1/VstGastos.aspx/FnRGastoICV",
        data: JSON.stringify({
            IdInicioCaja: VarJsIdInicioCaja
        }),
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowGastoIC(data.d);
        }
    }
    );
}
function AddrowGastoIC(data) {
    $('#tblGastoIC').DataTable().clear().destroy();
    tablaGastoIC = $("#tblGastoIC").DataTable({
        "retrieve": true,
        dom: 'Bfrtip',
        "order": [1, 'asc'],
        "columnDefs": [
            { "targets": 10, "searchable": false },
            { "orderable": false, "targets": 10 },
            { "targets": 11, "searchable": false },
            { "visible": false, "targets": 11 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colGastoIC'
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
                    columns: [':not(:eq(10)):visible']
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
                    columns: [':not(:eq(10)):visible']
                },
                titleAttr: 'PDF',
                filename: 'Gastos' + "_" + FnJsDate() + "_" + FnJsHour(),
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
                                    text: 'Gasto',
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Gasto'
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
                filename: 'Gastos' + "_" + FnJsDate() + "_" + FnJsHour(),
                text: '<i class="far fa-file-excel fa-2x"></i>',
                className: 'btn btn-success d-none d-lg-block',
                exportOptions: {
                    columns: [':not(:eq(10)):visible']
                },
                titleAttr: 'Excel',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')
                }
            }
        ],
        "language": FnJsEspTbl()
    });
    tablaGastoIC.buttons().container().addClass('form-inline');
    var Btn = '';
    for (var contGastoIC = 0; contGastoIC < data.length; contGastoIC++) {
        Btn = '';
        if (VarJsEstadoInicioCaja == 2) {
            Btn = '<button value="editar" href="#modalNGasto" data-toggle="modal" title="editar" class="btn btn-warning  btn-editGastoIC"><i class="fas fa-pencil-alt"></i> </button>' +
                '<button value="eliminar" href="#modalNGasto" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteGastoIC"><i class="fa fa-trash" ></i> </button>'
        }
        tablaGastoIC.row.add([
            data[contGastoIC].IdGasto,
            data[contGastoIC].Fecha,
            data[contGastoIC].Hora,
            data[contGastoIC].Serie,
            data[contGastoIC].Documento,
            data[contGastoIC].Cantidad,
            data[contGastoIC].ObjTipoGasto.TipoGasto,
            data[contGastoIC].Descripcion,
            data[contGastoIC].GastoCaja == 1 ? 'Sí' : 'No',
            data[contGastoIC].ObjAutorizadopor.ObjPersona.Nombre1 + ' ' + data[contGastoIC].ObjAutorizadopor.ObjPersona.Apellido1,
            Btn,
            data[contGastoIC].Estado
        ]
        ).draw(false);
    }
}

$('#lbMostrarGasto').click(function (e) {
    e.preventDefault();
    FnJsAjaxRGasto();
    FnJSFillDdlGastoTipoGasto();
    FnJSFillDdlGastoAutorizado();
});

function FnJsAjaxRGasto() {
    $.ajax({
        type: "POST",
        url: "/modulo1/VstGastos.aspx/FnRGastoV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowGasto(data.d);
        }
    }
    );
}
function AddrowGasto(data) {
    $('#tblGasto').DataTable().clear().destroy();
    tablaGasto = $("#tblGasto").DataTable({
        "retrieve": true,
        dom: 'Bfrtip',
        "order": [1, 'asc'],
        "columnDefs": [
            { "targets": 10, "searchable": false },
            { "orderable": false, "targets": 10 },
            { "targets": 11, "searchable": false },
            { "visible": false, "targets": 11 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colGasto'
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
                    columns: [':not(:eq(10)):visible']
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
                    columns: [':not(:eq(10)):visible']
                },
                titleAttr: 'PDF',
                filename: 'Gastos' + "_" + FnJsDate() + "_" + FnJsHour(),
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
                                    text: 'Gasto',
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Gasto'
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
                filename: 'Gastos' + "_" + FnJsDate() + "_" + FnJsHour(),
                text: '<i class="far fa-file-excel fa-2x"></i>',
                className: 'btn btn-success d-none d-lg-block',
                exportOptions: {
                    columns: [':not(:eq(10)):visible']
                },
                titleAttr: 'Excel',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')
                }
            }
        ],
        "language": FnJsEspTbl()
    });
    tablaGasto.buttons().container().addClass('form-inline');
    var Btn = '';
    for (var contGasto = 0; contGasto < data.length; contGasto++) {
        Btn = '';
        if (data[contGasto].Estado == 2) {
            Btn = '<button value="editar" href="#modalNGasto" data-toggle="modal" title="editar" class="btn btn-warning  btn-editGasto"><i class="fas fa-pencil-alt"></i> </button>' +
                '<button value="eliminar" href="#modalNGasto" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteGasto"><i class="fa fa-trash" ></i> </button>'
        }
        tablaGasto.row.add([
            data[contGasto].IdGasto,
            data[contGasto].Fecha,
            data[contGasto].Hora,
            data[contGasto].Serie,
            data[contGasto].Documento,
            data[contGasto].Cantidad,
            data[contGasto].ObjTipoGasto.TipoGasto,
            data[contGasto].Descripcion,
            data[contGasto].GastoCaja == 1 ? 'Sí' : 'No',
            data[contGasto].ObjAutorizadopor.ObjPersona.Nombre1 + ' ' + data[contGasto].ObjAutorizadopor.ObjPersona.Apellido1,
            Btn,
            data[contGasto].Estado
        ]
        ).draw(false);
    }
}

$(document).on('click', '.btn-AddGasto', function (e) {
    e.preventDefault();
    FnJsCGasto();
    EGasto = true;
    var tablaInicioCajaIC = $('#tblInicioCajaActiva').DataTable();
    var dataIc = tablaInicioCajaIC.row($(this).parents("tr")).data();;
    VarJsIdInicioCaja = dataIc[0];

    FnJsBlockGasto();
    FnJSFillDdlGastoTipoGasto();
    FnJSFillDdlGastoAutorizado();
    CRUDGasto = "C";

    VarJsGastoId = 0;
    VarJsFecha = FnJsDateNow('/');
    VarJsHora = FnJsHourNow(':');
    $('#txtNuevoFecha').val(VarJsFecha);
    $('#txtNuevoHora').val(VarJsHora);
    VarJsSerie = "";
    VarJsDocumento = "";
    VarJsCantidad = "";
    VarJsIdTipoGasto = 0;
    VarJsDescripcion = "";
    VarJsGDC = '1';
    FnFillOptBGDC();
    VarJsIdAutorizado = 0;
    VarJsEstado = "";

});
$('#lbNGasto').click(function (e) {
    e.preventDefault();
    FnJsCGasto();
    EGasto = true;

    FnJsBlockGasto();
    FnJSFillDdlGastoTipoGasto();
    FnJSFillDdlGastoAutorizado();
    CRUDGasto = "C";
    VarJsIdInicioCaja = "0";
    VarJsGastoId = 0;
    VarJsFecha = FnJsDateNow('/');
    VarJsHora = FnJsHourNow(':');
    $('#txtNuevoFecha').val(VarJsFecha);
    $('#txtNuevoHora').val(VarJsHora);
    VarJsSerie = "";
    VarJsDocumento = "";
    VarJsCantidad = "";
    VarJsIdTipoGasto = 0;
    VarJsDescripcion = "";
    VarJsGDC = '0';
    FnFillOptBGDC();
    VarJsIdAutorizado = 0;
    VarJsEstado = "";
});

$(document).on('click', '.btn-editGastoIC', function (e) {
    e.preventDefault();
    dataGasto = tablaGastoIC.row($(this).parents("tr")).data();
    FnJsEditGasto();
});

$(document).on('click', '.btn-editGasto', function (e) {
    e.preventDefault();
    dataGasto = tablaGasto.row($(this).parents("tr")).data();
    FnJsEditGasto();
});

function FnJsEditGasto() {
    FnJsUGasto();
    VarJsGastoId = dataGasto[0];
    $('#txtNuevoFecha').val(dataGasto[1]);
    VarJsFecha = dataGasto[1];
    $('#txtNuevoHora').val(dataGasto[2]);
    VarJsHora = dataGasto[2];
    $('#txtNuevoSerie').val(dataGasto[3]);
    VarJsSerie = dataGasto[3];
    $('#txtNuevoDocumento').val(dataGasto[4]);
    VarJsDocumento = dataGasto[4];
    $('#txtNuevoCantidad').val(dataGasto[5]);
    VarJsCantidad = dataGasto[5];
    VAlDDLGastoTipoGasto = (dataGasto[6]);
    FnJSFillDdlGastoTipoGasto();
    VarJsIdTipoGasto = $('#ddlCGastoTipoGasto').val();
    $('#txtNuevoDescripcion').val(dataGasto[7]);
    VarJsDescripcion = dataGasto[7];
    VarJsGDC = dataGasto[8] == 'Sí' ? '1' : '0';
    FnFillOptBGDC();
    VAlDDLGastoAutorizado = (dataGasto[9]);
    FnJSFillDdlGastoAutorizado();
    VarJsIdAutorizado = $('#ddlCGastoAutorizado').val();
    CRUDGasto = "U";
}

function FnFillOptBGDC() {
    if (VarJsGDC == '1') {
        $("#OptBCaja").prop('checked', true);
    }
    else {

        $("#OptBFCaja").prop('checked', true);
    }
}

$(document).on('click', '.btn-deleteGastoIC', function (e) {
    e.preventDefault();
    dataGasto = tablaGastoIC.row($(this).parents("tr")).data();
    FnJsDeleteGasto();
});
$(document).on('click', '.btn-deleteGasto', function (e) {
    e.preventDefault();
    dataGasto = tablaGasto.row($(this).parents("tr")).data();
    FnJsDeleteGasto();
});

function FnJsDeleteGasto() {
    FnJsDGasto();
    EGasto = false;
    FnJsBlockGasto();   
    VarJsGastoId = dataGasto[0];
    $('#txtNuevoFecha').val(dataGasto[1]);
    $('#txtNuevoHora').val(dataGasto[2]);
    $('#txtNuevoSerie').val(dataGasto[3]);
    $('#txtNuevoDocumento').val(dataGasto[4]);
    $('#txtNuevoCantidad').val(dataGasto[5]);
    VAlDDLGastoTipoGasto = (dataGasto[6]);
    FnJSFillDdlGastoTipoGasto();
    $('#txtNuevoDescripcion').val(dataGasto[7]);
    VarJsGDC = dataGasto[8] == 'Sí' ? '1' : '0';
    FnFillOptBGDC();
    VAlDDLGastoAutorizado = (dataGasto[9]);
    FnJSFillDdlGastoAutorizado();
    CRUDGasto = "D";
}
function FnJsCGasto() {
    $('#lblexistenuevoGasto').text("");

    $("#DivModBorGasto").removeAttr("class");
    $("#DivModBorGasto").attr('class', 'modal-content border-success');

    $("#DivModHeaGasto").removeAttr("class");
    $("#DivModHeaGasto").attr('class', 'modal-header bg-success');

    $('#H4ModTitGasto').text('Nuevo Gasto');

    $("#btnNueGasto").removeAttr("class");
    $("#btnNueGasto").attr('class', 'btn btn-success pull-right');
    $("#btnNueGasto i").removeAttr("class");
    $("#btnNueGasto i").attr("class", "fa fa-save fa-2x");

    $("#ddlCGastoTipoGasto").removeAttr("class");
    $("#ddlCGastoTipoGasto").attr("class", "form-control border-success");

    $("#ddlCGastoAutorizado").removeAttr("class");
    $("#ddlCGastoAutorizado").attr("class", "form-control border-success");

    $("#txtNuevoFecha").attr('disabled', true);
    $("#txtNuevoHora").attr('disabled', true);
    $("#txtNuevoSerie").attr('disabled', false);
    $("#txtNuevoDocumento").attr('disabled', false);
    $("#txtNuevoCantidad").attr('disabled', false);
    $("#txtNuevoDescripcion").attr('disabled', false);
    $("#OptBCaja").attr('disabled', true);
    $("#OptBFCaja").attr('disabled', true);
    $('#ddlCGastoTipoGasto').attr('disabled', false);
    $('#ddlCGastoAutorizado').attr('disabled', false);

    $('#' + ModCGasto[0].id + ' :text').val("");
}
function FnJsUGasto() {
    $('#lblexistenuevoGasto').text("");

    $("#DivModBorGasto").removeAttr("class");
    $("#DivModBorGasto").attr('class', 'modal-content border-warning');

    $("#DivModHeaGasto").removeAttr("class");
    $("#DivModHeaGasto").attr('class', 'modal-header bg-warning');

    $('#H4ModTitGasto').text('Editar Gasto');

    $("#btnNueGasto").removeAttr("class");
    $("#btnNueGasto").attr('class', 'btn btn-warning pull-right');
    $("#btnNueGasto i").removeAttr("class");
    $("#btnNueGasto i").attr("class", "fa fa-save fa-2x");

    $("#ddlCGastoTipoGasto").removeAttr("class");
    $("#ddlCGastoTipoGasto").attr("class", "form-control border-warning");

    $("#ddlCGastoAutorizado").removeAttr("class");
    $("#ddlCGastoAutorizado").attr("class", "form-control border-warning");

    $("#txtNuevoFecha").attr('disabled', true);
    $("#txtNuevoHora").attr('disabled', true);
    $("#txtNuevoSerie").attr('disabled', false);
    $("#txtNuevoDocumento").attr('disabled', false);
    $("#txtNuevoCantidad").attr('disabled', false);
    $("#txtNuevoDescripcion").attr('disabled', false);
    $("#OptBCaja").attr('disabled', true);
    $("#OptBFCaja").attr('disabled', true);
    $('#ddlCGastoTipoGasto').attr('disabled', false);
    $('#ddlCGastoAutorizado').attr('disabled', false);

    $('#' + ModCGasto[0].id + ' :text').val("");
}
function FnJsDGasto() {
    $('#lblexistenuevoGasto').text("");

    $("#DivModBorGasto").removeAttr("class");
    $("#DivModBorGasto").attr('class', 'modal-content border-danger');

    $("#DivModHeaGasto").removeAttr("class");
    $("#DivModHeaGasto").attr('class', 'modal-header bg-danger');

    $('#H4ModTitGasto').text('Eliminar Gasto');

    $("#btnNueGasto").removeAttr("class");
    $("#btnNueGasto").attr('class', 'btn btn-danger pull-right');
    $("#btnNueGasto i").removeAttr("class");
    $("#btnNueGasto i").attr("class", "fa fa-trash fa-2x");

    $("#ddlCGastoTipoGasto").removeAttr("class");
    $("#ddlCGastoTipoGasto").attr("class", "form-control border-danger");

    $("#ddlCGastoAutorizado").removeAttr("class");
    $("#ddlCGastoAutorizado").attr("class", "form-control border-danger");

    $("#txtNuevoFecha").attr('disabled', true);
    $("#txtNuevoHora").attr('disabled', true);
    $("#txtNuevoSerie").attr('disabled', true);
    $("#txtNuevoDocumento").attr('disabled', true);
    $("#txtNuevoCantidad").attr('disabled', true);
    $("#txtNuevoDescripcion").attr('disabled', true);
    $("#OptBCaja").attr('disabled', true);
    $("#OptBFCaja").attr('disabled', true);
    $('#ddlCGastoTipoGasto').attr('disabled', true);
    $('#ddlCGastoAutorizado').attr('disabled', true);

    $('#' + ModCGasto[0].id + ' :text').val("");
}

function FnJsBlockGasto() {
    if (EGasto == true) {
        $("#btnNueGasto").fadeOut("fast");
        $("#btnNueGasto").attr('disabled', true);
    }
    else if (EGasto == false) {
        $("#btnNueGasto").fadeIn("slow");
        $("#btnNueGasto").attr('disabled', false);
    }
}


$('#btnNueGasto').click(function (e) {
    e.preventDefault();
    if (formGasto.checkValidity()) {
        switch (CRUDGasto) {
            case "C":
                FnJsAjaxCGasto();
                break;
            case "U":
                FnJsAjaxUGasto();
                break;
            case "D":
                FnJsAjaxDGasto();
                break;
            default:
                console.log("Error en cud Gasto");
        }
    }
});

function FnJsAjaxCGasto() {
    $.ajax({
        url: "/modulo1/VstGastos.aspx/FnCGastoV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            Fecha: VarJsFecha,
            Hora: VarJsHora,
            Serie: VarJsSerie,
            Documento: VarJsDocumento,
            Cantidad: VarJsCantidad,
            IdTipoGasto: VarJsIdTipoGasto,
            Descripcion: VarJsDescripcion,
            GastoCaja: VarJsGDC,
            IdAutorizado: VarJsIdAutorizado,
            IdInicioCaja: VarJsIdInicioCaja
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Gasto Agregado");
            }
            else {
                CRUDGasto = "error"
                console.log("No se pudo agregar Gasto");
            }
            FnAlertaGasto();
        }
    });
}
function FnJsAjaxUGasto() {
    $.ajax({
        url: "/modulo1/VstGastos.aspx/FnUGastoV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdGasto: VarJsGastoId,
            Serie: VarJsSerie,
            Documento: VarJsDocumento,
            Cantidad: VarJsCantidad,
            IdTipoGasto: VarJsIdTipoGasto,
            Descripcion: VarJsDescripcion,
            GastoCaja: VarJsGDC,
            IdAutorizado: VarJsIdAutorizado

        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Gasto Actualizado");
            }
            else {
                CRUDGasto = "error"
                console.log("no se pudo actualizar");
            }
            FnAlertaGasto();
        }
    });
}
function FnJsAjaxDGasto() {
    $.ajax({
        url: "/modulo1/VstGastos.aspx/FnDGastoV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdGasto: VarJsGastoId
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {

                console.log("Gasto Eliminado");
            }
            else {

                CRUDGasto = "error"
                console.log("No se pudo Eliminar Gasto");
            }
            FnAlertaGasto();

        }
    });
}
function FnJsAjaxEGasto() {
    $.ajax({
        url: "/modulo1/VstGastos.aspx/FnEGastoV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdGasto: VarJsGastoId,
            Serie: VarJsSerie,
            Documento: VarJsDocumento,
            Cantidad: VarJsCantidad
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                EGasto = true;
                $('#lblexistenuevoGasto').text("Existe Gasto");
                FnJsBlockGasto();
            }
            else {
                EGasto = false;
                $('#lblexistenuevoGasto').text("");
                FnJsBlockGasto();
            }
        }
    });
}

function VerificarExisteGasto() {
    if ($('#txtNuevoSerie').val().length > 0 && $('#txtNuevoDocumento').val().length > 1 && $('#txtNuevoCantidad').val().length > 0
        && $('#ddlCGastoTipoGasto').val() > 0 && $('#ddlCGastoAutorizado').val() > 0) {
        return true;
    }
    else {
        return false;
    }
}

$('#txtNuevoSerie').keyup(function (e) {
    VarJsSerie = $(this).val();
    if (VerificarExisteGasto()) {
        FnJsAjaxEGasto();
    }
});


$('#txtNuevoDocumento').keyup(function (e) {
    VarJsDocumento = $(this).val();
    if (VerificarExisteGasto()) {
        FnJsAjaxEGasto();
    }
});

$('#txtNuevoCantidad').keyup(function (e) {
    VarJsCantidad = $(this).val();
    if (VerificarExisteGasto()) {
        FnJsAjaxEGasto();
    }
});

$('#txtNuevoDescripcion').keyup(function (e) {
    VarJsDescripcion = $(this).val();
    if (VerificarExisteGasto()) {
        FnJsAjaxEGasto();
    }
});
$('#ddlCGastoTipoGasto').change(function (e) {
    VarJsIdTipoGasto = $('#ddlCGastoTipoGasto').val();
    if (VerificarExisteGasto()) {
        FnJsAjaxEGasto();
    }
});

$('#ddlCGastoAutorizado').change(function (e) {
    VarJsIdAutorizado = $('#ddlCGastoAutorizado').val();
    if (VerificarExisteGasto()) {
        FnJsAjaxEGasto();
    }
});

$("#OptBCaja").change(function () {
    if ($(this).is(":checked")) {
        VarJsGDC = '1';
    }
});

$("#OptBFCaja").change(function () {
    if ($(this).is(":checked")) {
        VarJsGDC = '0';
    }
});
function FnJSFillDdlGastoTipoGasto() {
    $('#ddlCGastoTipoGasto').empty();
    $.ajax({
        type: "POST",
        url: "/modulo1/VstGastos.aspx/FnRTipoGastoV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLGastoTipoGasto == "null") {
                $('#ddlCGastoTipoGasto').append($("<option> </option>").val("0").html("Seleccionar Tipo de Gasto"));
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLGastoTipoGasto == value.TipoGasto) {
                        $('#ddlCGastoTipoGasto').append($("<option> </option>").val(value.IdTipoGasto).html(value.TipoGasto));
                        VarJsIdTipoGasto = value.IdTipoGasto;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCGastoTipoGasto').append($("<option> </option>").val(value.IdTipoGasto).html(value.TipoGasto));
            });
            VAlDDLGastoTipoGasto = "null";
        }
    });
}

function FnJSFillDdlGastoAutorizado() {
    $('#ddlCGastoAutorizado').empty();
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnREmpleadoV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLGastoAutorizado == "null") {
                $('#ddlCGastoAutorizado').append($("<option> </option>").val("0").html("Seleccionar Empleado que autoriza"));
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLGastoAutorizado == (value.ObjPersona.Nombre1 + ' ' + value.ObjPersona.Apellido1)) {
                        $('#ddlCGastoAutorizado').append($("<option> </option>").val(value.IdEmpleado).html(value.ObjPersona.Nombre1 + ' ' + value.ObjPersona.Apellido1));
                        VarJsIdAutorizado = value.IdEmpleado;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCGastoAutorizado').append($("<option> </option>").val(value.IdEmpleado).html(value.ObjPersona.Nombre1 + ' ' + value.ObjPersona.Apellido1));
            });
            VAlDDLGastoAutorizado = "null";
        }
    });
}
function FnAlertaGasto() {

    switch (CRUDGasto) {
        case "C":
            VarJsColorAlertGasto = "bg-success";
            VarJsTextoAlertGasto = "Creado";
            break;
        case "U":
            VarJsColorAlertGasto = "bg-warning";
            VarJsTextoAlertGasto = "Actualizado";
            break;
        case "D":
            VarJsColorAlertGasto = "bg-danger";
            VarJsTextoAlertGasto = "Eliminado";
            break;
        case "Error":
            VarJsColorAlertGasto = "bg-secondary";
            VarJsTextoAlertGasto = "No se pudo realizar la operación";
            break;
        default:
            console.log("Error CUD Gasto Alert");
    }
    $('.bd-example-modal-sm .modal-content').addClass(VarJsColorAlertGasto);
    $('.bd-example-modal-sm h5').text(VarJsTextoAlertGasto);
    $('.bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.bd-example-modal-sm').modal('hide');
        $('.bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertGasto);
    }, 1500);
    FnJsAjaxRGasto();
    FnJsAjaxRGastoIC();
    $("#modalNGasto").modal("toggle");
}