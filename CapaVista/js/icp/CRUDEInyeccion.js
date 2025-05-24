var tablaInyeccionIC;
var tablaInyecciones;
var tablaInicioCajaActiva;
var ModCInyeccionIC = $('#modalNInyeccionIC');

var VarJsInyeccionICId = 0;
var VarJsIdCajero = 0;
var VarJsIdInicioCaja = 0;
var VarJSCantidad = 0.0;
var VarJsIdRealizado = 0;
var VarJsNota = "";
var VarJsHora = "";
var VarJsEstadoInicioCaja = 0;

var VAlDDLInyeccionICCajero = "null";
var VAlDDLInyeccionICRealizado = "null";

var formInyeccionIC = document.querySelector('#form1');

CRUDInyeccionIC = "";

var VarJsColorAlertInyeccionIC = "";
var VarJsTextoAlertInyeccionIC = "";

var EInyeccionIC = true;
$("[data-mask]").inputmask();

$('#tblInicioCajaActiva tbody').on('click', 'tr', function () {
    var tablaInicioCajaIC = $('#tblInicioCajaActiva').DataTable();
    VarJsIdInicioCaja = tablaInicioCajaIC.row(this).data()[0];
    VarJsEstadoInicioCaja = tablaInicioCajaIC.row(this).data()[5];
    FnJsAjaxRInyeccionIC();
    $("#InyeccionIC").attr('class', 'col-lg-12 col-md-12 col-sm-12 collapse show');
})

$('#lbMostrarInyecciones').click(function (e) {
    e.preventDefault();
    FnJsAjaxRInyecciones();
});

function FnJsAjaxRInyeccionIC() {
    $.ajax({
        type: "POST",
        url: "/modulo1/VstInyeccion.aspx/FnRInyeccionICV",
        data: JSON.stringify({
            IdInicioCaja: VarJsIdInicioCaja
        }),
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowInyeccionIC(data.d);
        }
    }
    );
}
function AddrowInyeccionIC(data) {
    $('#tblInyeccionIC').DataTable().clear().destroy();
    tablaInyeccionIC = $("#tblInyeccionIC").DataTable({
        "retrieve": true,
        dom: 'Bfrtip',
        "order": [4, 'asc'],
        "columnDefs": [
            { "targets": 7, "searchable": false },
            { "orderable": false, "targets": 7 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colInyeccionIC'
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
                filename: 'InyeccionIC' + "_" + FnJsDate() + "_" + FnJsHour(),
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
                                    text: 'InyeccionIC',
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte InyeccionIC'
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
                filename: 'InyeccionIC' + "_" + FnJsDate() + "_" + FnJsHour(),
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
    tablaInyeccionIC.buttons().container().addClass('form-inline');
    var BtnICA = '';
    for (var contInyeccionIC = 0; contInyeccionIC < data.length; contInyeccionIC++) {
        BtnICA = '';
        if (VarJsEstadoInicioCaja == 2) {
            BtnICA = '<button value="editar" href="#modalNInyeccionIC" data-toggle="modal" title="editar" class="btn btn-warning  btn-editInyeccionIC"><i class="fas fa-pencil-alt"></i> </button>' +
                '<button value="eliminar" href="#modalNInyeccionIC" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteInyeccionIC"><i class="fa fa-trash" ></i> </button>';
        }
        tablaInyeccionIC.row.add([
            data[contInyeccionIC].IdInyeccion,
            data[contInyeccionIC].ObjCajero.ObjPersona.Nombre1 + ' ' + data[contInyeccionIC].ObjCajero.ObjPersona.Apellido1,
            data[contInyeccionIC].Cantidad,
            data[contInyeccionIC].ObjRealizadoPor.ObjPersona.Nombre1 + ' ' + data[contInyeccionIC].ObjRealizadoPor.ObjPersona.Apellido1,
            data[contInyeccionIC].Nota,
            data[contInyeccionIC].Hora,
            data[contInyeccionIC].ObjInicioCaja.Fecha,
            BtnICA
        ]
        ).draw(false);
    }
}

$(document).on('click', '.btn-AddInyeccionIC', function (e) {

    e.preventDefault();
    FnJsCInyeccionIC();
    EInyeccionIC = true;
    FnJsBlockInyeccionIC();
    FnJSFillDdlInyeccionICCajero();
    FnJSFillDdlInyeccionICRealizado();
    CRUDInyeccionIC = "C";

    VarJsInyeccionICId = 0;
    VarJsIdCajero = 0;
    VarJSCantidad = 0.0;
    arJsIdRealizado = 0;
    VarJsNota = "";
    VarJsHora = FnJsHourNow(':');
    $('#txtNuevoHora').val(VarJsHora);
});

$(document).on('click', '.btn-editInyeccionIC', function (e) {
    e.preventDefault();
    FnJsUInyeccionIC();
    var dataInyeccionIC = tablaInyeccionIC.row($(this).parents("tr")).data();
    VarJsInyeccionICId = dataInyeccionIC[0];
    VAlDDLInyeccionICCajero = (dataInyeccionIC[1]);
    FnJSFillDdlInyeccionICCajero();
    VarJsIdCajero = $('#ddlCInyeccionICCajero').val();
    $('#txtNuevoCantidad').val(dataInyeccionIC[2]);
    VarJSCantidad = dataInyeccionIC[2];
    VAlDDLInyeccionICRealizado = (dataInyeccionIC[3]);
    FnJSFillDdlInyeccionICRealizado();
    VarJsIdRealizado = $('#ddlCInyeccionICRealizado').val();
    $('#txtNuevoNota').val(dataInyeccionIC[4]);
    VarJsNota = dataInyeccionIC[4];
    $('#txtNuevoHora').val(dataInyeccionIC[5]);
    VarJsHora = dataInyeccionIC[5];

    CRUDInyeccionIC = "U";
});
$(document).on('click', '.btn-deleteInyeccionIC', function (e) {
    e.preventDefault();
    FnJsDInyeccionIC();
    EInyeccionIC = false;
    FnJsBlockInyeccionIC();

    var dataInyeccionIC = tablaInyeccionIC.row($(this).parents("tr")).data();
    VarJsInyeccionICId = dataInyeccionIC[0];
    VAlDDLInyeccionICCajero = (dataInyeccionIC[1]);
    FnJSFillDdlInyeccionICCajero();
    $('#txtNuevoCantidad').val(dataInyeccionIC[2]);
    VAlDDLInyeccionICRealizado = (dataInyeccionIC[3]);
    FnJSFillDdlInyeccionICRealizado();
    $('#txtNuevoNota').val(dataInyeccionIC[4]);
    $('#txtNuevoHora').val(dataInyeccionIC[5]);

    CRUDInyeccionIC = "D";
});

function FnJsCInyeccionIC() {
    $('#lblexistenuevoInyeccionIC').text("");

    $("#DivModBorInyeccionIC").removeAttr("class");
    $("#DivModBorInyeccionIC").attr('class', 'modal-content border-success');

    $("#DivModHeaInyeccionIC").removeAttr("class");
    $("#DivModHeaInyeccionIC").attr('class', 'modal-header bg-success');

    $('#H4ModTitInyeccionIC').text('Nuevo InyeccionIC');

    $("#btnNueInyeccionIC").removeAttr("class");
    $("#btnNueInyeccionIC").attr('class', 'btn btn-success pull-right');
    $("#btnNueInyeccionIC i").removeAttr("class");
    $("#btnNueInyeccionIC i").attr("class", "fa fa-save fa-2x");

    $("#ddlCInyeccionICCajero").removeAttr("class");
    $("#ddlCInyeccionICCajero").attr("class", "form-control border-success");
    $("#ddlCInyeccionICRealizado").removeAttr("class");
    $("#ddlCInyeccionICRealizado").attr("class", "form-control border-success");

    $("#txtNuevoCantidad").attr('disabled', false);
    $("#txtNuevoNota").attr('disabled', false);
    $("#txtNuevoHora").attr('disabled', true);
    $('#ddlCInyeccionICCajero').attr('disabled', false);
    $('#ddlCInyeccionICRealizado').attr('disabled', false);

    $('#' + ModCInyeccionIC[0].id + ' :text').val("");
}
function FnJsUInyeccionIC() {
    $('#lblexistenuevoInyeccionIC').text("");

    $("#DivModBorInyeccionIC").removeAttr("class");
    $("#DivModBorInyeccionIC").attr('class', 'modal-content border-warning');

    $("#DivModHeaInyeccionIC").removeAttr("class");
    $("#DivModHeaInyeccionIC").attr('class', 'modal-header bg-warning');

    $('#H4ModTitInyeccionIC').text('Editar InyeccionIC');

    $("#btnNueInyeccionIC").removeAttr("class");
    $("#btnNueInyeccionIC").attr('class', 'btn btn-warning pull-right');
    $("#btnNueInyeccionIC i").removeAttr("class");
    $("#btnNueInyeccionIC i").attr("class", "fa fa-save fa-2x");

    $("#ddlCInyeccionICCajero").removeAttr("class");
    $("#ddlCInyeccionICCajero").attr("class", "form-control border-warning");
    $("#ddlCInyeccionICRealizado").removeAttr("class");
    $("#ddlCInyeccionICRealizado").attr("class", "form-control border-warning");

    $("#txtNuevoCantidad").attr('disabled', false);
    $("#txtNuevoNota").attr('disabled', false);
    $("#txtNuevoHora").attr('disabled', true);
    $('#ddlCInyeccionICCajero').attr('disabled', false);
    $('#ddlCInyeccionICRealizado').attr('disabled', false);

    $('#' + ModCInyeccionIC[0].id + ' :text').val("");
}
function FnJsDInyeccionIC() {
    $('#lblexistenuevoInyeccionIC').text("");

    $("#DivModBorInyeccionIC").removeAttr("class");
    $("#DivModBorInyeccionIC").attr('class', 'modal-content border-danger');

    $("#DivModHeaInyeccionIC").removeAttr("class");
    $("#DivModHeaInyeccionIC").attr('class', 'modal-header bg-danger');

    $('#H4ModTitInyeccionIC').text('Eliminar InyeccionIC');

    $("#btnNueInyeccionIC").removeAttr("class");
    $("#btnNueInyeccionIC").attr('class', 'btn btn-danger pull-right');
    $("#btnNueInyeccionIC i").removeAttr("class");
    $("#btnNueInyeccionIC i").attr("class", "fa fa-trash fa-2x");

    $("#ddlCInyeccionICCajero").removeAttr("class");
    $("#ddlCInyeccionICCajero").attr("class", "form-control border-danger");
    $("#ddlCInyeccionICRealizado").removeAttr("class");
    $("#ddlCInyeccionICRealizado").attr("class", "form-control border-danger");

    $("#txtNuevoCantidad").attr('disabled', true);
    $("#txtNuevoNota").attr('disabled', true);
    $("#txtNuevoHora").attr('disabled', true);
    $('#ddlCInyeccionICCajero').attr('disabled', true);
    $('#ddlCInyeccionICRealizado').attr('disabled', true);

    $('#' + ModCInyeccionIC[0].id + ' :text').val("");
}


function FnJsBlockInyeccionIC() {
    if (EInyeccionIC == true) {
        $("#btnNueInyeccionIC").fadeOut("fast");
        $("#btnNueInyeccionIC").attr('disabled', true);
    }
    else if (EInyeccionIC == false) {
        $("#btnNueInyeccionIC").fadeIn("slow");
        $("#btnNueInyeccionIC").attr('disabled', false);
    }
}


$('#btnNueInyeccionIC').click(function (e) {
    e.preventDefault();
    if (formInyeccionIC.checkValidity()) {
        switch (CRUDInyeccionIC) {
            case "C":
                FnJsAjaxCInyeccionIC();
                break;
            case "U":
                FnJsAjaxUInyeccionIC();
                break;
            case "D":
                FnJsAjaxDInyeccionIC();
                break;
            default:
                console.log("Error en cud InyeccionIC");
        }
    }
});

function FnJsAjaxCInyeccionIC() {
    $.ajax({
        url: "/modulo1/VstInyeccion.aspx/FnCInyeccionV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdInicioCaja: VarJsIdInicioCaja,
            IdCajero: VarJsIdCajero,
            Cantidad: VarJSCantidad,
            IdRealizado: VarJsIdRealizado,
            Nota: VarJsNota,
            Hora: VarJsHora
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Inyección Agregado");
            }
            else {
                CRUDInyeccionIC = "error"
                console.log("No se pudo agregar Inyección");
            }
            FnAlertaInyeccionIC();
        }
    });
}
function FnJsAjaxUInyeccionIC() {
    $.ajax({
        url: "/modulo1/Vstinyeccion.aspx/FnUInyeccionV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdInyeccion: VarJsInyeccionICId,
            IdCajero: VarJsIdCajero,
            Cantidad: VarJSCantidad,
            IdRealizado: VarJsIdRealizado,
            Nota: VarJsNota
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Inyección Actualizado");
            }
            else {
                CRUDInyeccionIC = "error"
                console.log("no se pudo actualizar");
            }
            FnAlertaInyeccionIC();
        }
    });
}
function FnJsAjaxDInyeccionIC() {
    $.ajax({
        url: "/modulo1/Vstinyeccion.aspx/FnDInyeccionV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdInyeccion: VarJsInyeccionICId
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Inyección Eliminado");
            }
            else {
                CRUDInyeccionIC = "error"
                console.log("No se pudo Eliminar Inyección");
            }
            FnAlertaInyeccionIC();
        }
    });
}
function VerificarExisteInyeccionIC() {
    if ($('#txtNuevoCantidad').val().length > 0 && $('#ddlCInyeccionICCajero').val() > 0 && $('#ddlCInyeccionICRealizado').val() > 0) {
        EInyeccionIC = false;
    }
    else {
        EInyeccionIC = true;
    }
    FnJsBlockInyeccionIC();
}

$('#txtNuevoCantidad').keyup(function (e) {
    VarJSCantidad = $(this).val();
    VerificarExisteInyeccionIC();
});

$('#ddlCInyeccionICCajero').change(function (e) {
    VarJsIdCajero = $('#ddlCInyeccionICCajero').val();
    VerificarExisteInyeccionIC();
});

$('#ddlCInyeccionICRealizado').change(function (e) {
    VarJsIdRealizado = $('#ddlCInyeccionICRealizado').val();
    VerificarExisteInyeccionIC();
});

$('#txtNuevoNota').keyup(function (e) {
    VarJsNota = $(this).val();
    VerificarExisteInyeccionIC();
});

function FnJSFillDdlInyeccionICCajero() {
    $('#ddlCInyeccionICCajero').empty();
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnRCajeroV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLInyeccionICCajero == "null") {
                $('#ddlCInyeccionICCajero').append($("<option> </option>").val("0").html("Seleccionar Cajero"));
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLInyeccionICCajero == (value.ObjEmpleado.ObjPersona.Nombre1 + ' ' + value.ObjEmpleado.ObjPersona.Apellido1)) {
                        $('#ddlCInyeccionICCajero').append($("<option> </option>").val(value.ObjEmpleado.IdEmpleado).html((value.ObjEmpleado.ObjPersona.Nombre1 + ' ' + value.ObjEmpleado.ObjPersona.Apellido1)));
                        VarJsIdCajero = value.ObjEmpleado.IdEmpleado;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCInyeccionICCajero').append($("<option> </option>").val(value.ObjEmpleado.IdEmpleado).html((value.ObjEmpleado.ObjPersona.Nombre1 + ' ' + value.ObjEmpleado.ObjPersona.Apellido1)));
            });
            VAlDDLInyeccionICCajero = "null";
        }
    });
}

function FnJSFillDdlInyeccionICRealizado() {
    $('#ddlCInyeccionICRealizado').empty();
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnREmpleadoV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLInyeccionICRealizado == "null") {
                $('#ddlCInyeccionICRealizado').append($("<option> </option>").val("0").html("Realizado por:"));
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLInyeccionICRealizado == (value.ObjPersona.Nombre1 + ' ' + value.ObjPersona.Apellido1)) {
                        $('#ddlCInyeccionICRealizado').append($("<option> </option>").val(value.IdEmpleado).html((value.ObjPersona.Nombre1 + ' ' + value.ObjPersona.Apellido1)));
                        VarJsIdRealizado = value.IdEmpleado;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCInyeccionICRealizado').append($("<option> </option>").val(value.IdEmpleado).html((value.ObjPersona.Nombre1 + ' ' + value.ObjPersona.Apellido1)));
            });
            VAlDDLInyeccionICRealizado = "null";
        }
    });
}
function FnAlertaInyeccionIC() {

    switch (CRUDInyeccionIC) {
        case "C":
            VarJsColorAlertInyeccionIC = "bg-success";
            VarJsTextoAlertInyeccionIC = "Creado";
            break;
        case "U":
            VarJsColorAlertInyeccionIC = "bg-warning";
            VarJsTextoAlertInyeccionIC = "Actualizado";
            break;
        case "D":
            VarJsColorAlertInyeccionIC = "bg-danger";
            VarJsTextoAlertInyeccionIC = "Eliminado";
            break;
        case "Error":
            VarJsColorAlertInyeccionIC = "bg-secondary";
            VarJsTextoAlertInyeccionIC = "No se pudo realizar la operación";
            break;
        default:
            console.log("Error CUD Inyección Alert");
    }
    FnJsAjaxRInyeccionIC();
    $('.bd-example-modal-sm .modal-content').addClass(VarJsColorAlertInyeccionIC);
    $('.bd-example-modal-sm h5').text(VarJsTextoAlertInyeccionIC);
    $('.bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.bd-example-modal-sm').modal('hide');
        $('.bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertInyeccionIC);
    }, 1500);
    $("#modalNInyeccionIC").modal("toggle");
}

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
            Btn = '<button value="ADD" href="#modalNInyeccionIC" data-toggle="modal" title="ADD" class="btn btn-success  btn-AddInyeccionIC"><i class="fa fa-line-chart"></i> </button>';
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

function FnJsAjaxRInyecciones() {
    $.ajax({
        type: "POST",
        url: "/modulo1/VstInyeccion.aspx/FnRInyeccionV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowInyecciones(data.d);
        }
    }
    );
}
function AddrowInyecciones(data) {
    $('#tblInyecciones').DataTable().clear().destroy();
    tablaInyecciones = $("#tblInyecciones").DataTable({
        "retrieve": true,
        dom: 'frtip',
        "order": [6, 'asc'],
        "columnDefs": [
         
        ],       
        "language": FnJsEspTbl()
    });
    tablaInyecciones.buttons().container().addClass('form-inline');
    for (var contInyecciones = 0; contInyecciones < data.length; contInyecciones++) {         
        tablaInyecciones.row.add([
            data[contInyecciones].IdInyeccion,
            data[contInyecciones].ObjCajero.ObjPersona.Nombre1 + ' ' + data[contInyecciones].ObjCajero.ObjPersona.Apellido1,
            data[contInyecciones].Cantidad,
            data[contInyecciones].ObjRealizadoPor.ObjPersona.Nombre1 + ' ' + data[contInyecciones].ObjRealizadoPor.ObjPersona.Apellido1,
            data[contInyecciones].Nota,
            data[contInyecciones].Hora,
            data[contInyecciones].ObjInicioCaja.Fecha   
        ]
        ).draw(false);
    }
}