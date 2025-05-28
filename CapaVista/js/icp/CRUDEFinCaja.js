var tablaFinCaja;
var ModCFinCaja = $('#modalNFinCaja');

var VarJsFinCajaId = 0;
var VarJsFecha = "";
var VarJsHora = "";
var VarJsIdCajero = 0;
var VAlDDLFinCajaCajero = "null";

var formFinCaja = document.querySelector('#form1');

CRUDFinCaja = "";

var VarJsColorAlertFinCaja = "";
var VarJsTextoAlertFinCaja = "";

var EFinCaja = true;
var EFecha = true;

$("[data-mask]").inputmask();

$('#lbMostrarFinCaja').click(function (e) {
    e.preventDefault();
    FnJsAjaxRFinCaja();
    FnJSFillDdlFinCajaCajero();
});

function FnJsAjaxRFinCaja() {
    $.ajax({
        type: "POST",
        url: "/modulo1/VstFinCaja.aspx/FnRFinCajaV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowFinCaja(data.d);
        }
    }
    );
}

function AddrowFinCaja(data) {
    $('#tblFinCaja').DataTable().clear().destroy();
    tablaFinCaja = $("#tblFinCaja").DataTable({
        "retrieve": true,
        select: true,
        dom: 'Bfrtip',
        "order": [2, 'desc'],
        "columnDefs": [
            { "targets": 4, "searchable": false },
            { "orderable": false, "targets": 4 },
            { "targets": 5, "searchable": false },
            { "visible": false, "targets": 5 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colFinCaja'
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
                filename: 'FinCaja' + "_" + FnJsDate() + "_" + FnJsHour(),
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
                                    text: 'FinCaja',
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte FinCaja'
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
                filename: 'FinCaja' + "_" + FnJsDate() + "_" + FnJsHour(),
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
    tablaFinCaja.buttons().container().addClass('form-inline');
    var Btn = '';
    for (var contFinCaja = 0; contFinCaja < data.length; contFinCaja++) {
        Btn = '';
        if (data[contFinCaja].Estado == 1 || data[contFinCaja].Estado == 4) {
            Btn = '<button value="editar" href="#modalNFinCaja" data-toggle="modal" title="editar" class="btn btn-warning  btn-editFinCaja"><i class="fas fa-pencil-alt"></i> </button>' +
                '<button value="eliminar" href="#modalNFinCaja" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteFinCaja"><i class="fa fa-trash" ></i> </button>'
        }
        tablaFinCaja.row.add([
            data[contFinCaja].IdFinCaja,
            data[contFinCaja].ObjCajero.ObjPersona.Nombre1 + ' ' + data[contFinCaja].ObjCajero.ObjPersona.Apellido1,
            data[contFinCaja].Fecha,
            data[contFinCaja].Hora,
            Btn,
            data[contFinCaja].Estado
        ]
        ).draw(false);
    }
}

$('#lbNFinCaja').click(function (e) {
    e.preventDefault();
    FnJsCFinCaja();
    EFinCaja = true;

    FnJsBlockFinCaja();
    FnJSFillDdlFinCajaCajero();
    CRUDFinCaja = "C";

    VarJsFinCajaId = 0;
    VarJsFecha = FnJsDateNow('/');
    VarJsHora = FnJsHourNow(':');
    $('#txtNuevoFecha').val(VarJsFecha);
    $('#txtNuevoHora').val(VarJsHora);
    VarJsIdCajero = 0;
});

$(document).on('click', '.btn-editFinCaja', function (e) {
    e.preventDefault();
    FnJsUFinCaja();
    var dataFinCaja = tablaFinCaja.row($(this).parents("tr")).data();
    VarJsFinCajaId = dataFinCaja[0];
    $('#txtNuevoFecha').val(dataFinCaja[2]);
    VarJsFecha = dataFinCaja[2];
    $('#txtNuevoHora').val(dataFinCaja[3]);
    VarJsHora = dataFinCaja[3];
    VAlDDLFinCajaCajero = (dataFinCaja[1]);
    FnJSFillDdlFinCajaCajero();
    VarJsIdCajero = $('#ddlCFinCajaCajero').val();

    CRUDFinCaja = "U";
});
$(document).on('click', '.btn-deleteFinCaja', function (e) {
    e.preventDefault();
    FnJsDFinCaja();
    EFinCaja = false;

    FnJsBlockFinCaja();
    var dataFinCaja = tablaFinCaja.row($(this).parents("tr")).data();
    VarJsFinCajaId = dataFinCaja[0];
    $('#txtNuevoFecha').val(dataFinCaja[2]);
    $('#txtNuevoHora').val(dataFinCaja[3]);
    VAlDDLFinCajaCajero = (dataFinCaja[1]);
    FnJSFillDdlFinCajaCajero();
    VarJsIdCajero = $('#ddlCFinCajaCajero').val();

    CRUDFinCaja = "D";
});

function FnJsCFinCaja() {
    $('#lblexistenuevoFinCaja').text("");

    $("#DivModBorFinCaja").removeAttr("class");
    $("#DivModBorFinCaja").attr('class', 'modal-content border-success');

    $("#DivModHeaFinCaja").removeAttr("class");
    $("#DivModHeaFinCaja").attr('class', 'modal-header bg-success');

    $('#H4ModTitFinCaja').text('Nuevo FinCaja');

    $("#btnNueFinCaja").removeAttr("class");
    $("#btnNueFinCaja").attr('class', 'btn btn-success pull-right');
    $("#btnNueFinCaja i").removeAttr("class");
    $("#btnNueFinCaja i").attr("class", "fa fa-save fa-2x");

    $("#ddlCFinCajaCajero").removeAttr("class");
    $("#ddlCFinCajaCajero").attr("class", "form-control border-success");

    $("#txtNuevoFecha").attr('disabled', true);
    $("#txtNuevoHora").attr('disabled', true);
    $('#ddlCFinCajaCajero').attr('disabled', false);

    $('#' + ModCFinCaja[0].id + ' :text').val("");
}
function FnJsUFinCaja() {
    $('#lblexistenuevoFinCaja').text("");

    $("#DivModBorFinCaja").removeAttr("class");
    $("#DivModBorFinCaja").attr('class', 'modal-content border-warning');

    $("#DivModHeaFinCaja").removeAttr("class");
    $("#DivModHeaFinCaja").attr('class', 'modal-header bg-warning');

    $('#H4ModTitFinCaja').text('Editar FinCaja');

    $("#btnNueFinCaja").removeAttr("class");
    $("#btnNueFinCaja").attr('class', 'btn btn-warning pull-right');
    $("#btnNueFinCaja i").removeAttr("class");
    $("#btnNueFinCaja i").attr("class", "fa fa-save fa-2x");

    $("#ddlCFinCajaCajero").removeAttr("class");
    $("#ddlCFinCajaCajero").attr("class", "form-control border-warning");

    $("#txtNuevoFecha").attr('disabled', true);
    $("#txtNuevoHora").attr('disabled', true);
    $('#ddlCFinCajaCajero').attr('disabled', false);

    $('#' + ModCFinCaja[0].id + ' :text').val("");
}
function FnJsDFinCaja() {
    $('#lblexistenuevoFinCaja').text("");

    $("#DivModBorFinCaja").removeAttr("class");
    $("#DivModBorFinCaja").attr('class', 'modal-content border-danger');

    $("#DivModHeaFinCaja").removeAttr("class");
    $("#DivModHeaFinCaja").attr('class', 'modal-header bg-danger');

    $('#H4ModTitFinCaja').text('Eliminar FinCaja');

    $("#btnNueFinCaja").removeAttr("class");
    $("#btnNueFinCaja").attr('class', 'btn btn-danger pull-right');
    $("#btnNueFinCaja i").removeAttr("class");
    $("#btnNueFinCaja i").attr("class", "fa fa-trash fa-2x");

    $("#ddlCFinCajaCajero").removeAttr("class");
    $("#ddlCFinCajaCajero").attr("class", "form-control border-danger");

    $("#txtNuevoFecha").attr('disabled', true);
    $("#txtNuevoHora").attr('disabled', true);
    $('#ddlCFinCajaCajero').attr('disabled', true);

    $('#' + ModCFinCaja[0].id + ' :text').val("");
}


function FnJsBlockFinCaja() {
    if (EFinCaja == true) {
        $("#btnNueFinCaja").fadeOut("fast");
        $("#btnNueFinCaja").attr('disabled', true);
    }
    else if (EFinCaja == false && EFecha == false) {
        $("#btnNueFinCaja").fadeIn("slow");
        $("#btnNueFinCaja").attr('disabled', false);
    }
}


$('#btnNueFinCaja').click(function (e) {
    e.preventDefault();
    if (formFinCaja.checkValidity()) {
        switch (CRUDFinCaja) {
            case "C":
                FnJsAjaxCFinCaja();
                break;
            case "U":
                FnJsAjaxUFinCaja();
                break;
            case "D":
                FnJsAjaxDFinCaja();
                break;
            default:
                console.log("Error en cud FinCaja");
        }
    }
});

function FnJsAjaxCFinCaja() {
    $.ajax({
        url: "/modulo1/VstFinCaja.aspx/FnCFinCajaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            Fecha: VarJsFecha,
            Hora: VarJsHora,
            IdCajero: VarJsIdCajero
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Fin de Caja Agregado");
            }
            else {
                CRUDFinCaja = "error"
                console.log("No se pudo agregar Fin de Caja");
            }
            FnAlertaFinCaja();
        }
    });
}
function FnJsAjaxUFinCaja() {
    $.ajax({
        url: "/modulo1/VstFinCaja.aspx/FnUFinCajaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdFinCaja: VarJsFinCajaId,
            IdCajero: VarJsIdCajero
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Fin de Caja Actualizado");
            }
            else {
                CRUDFinCaja = "error"
                console.log("no se pudo actualizar");
            }
            FnAlertaFinCaja();
        }
    });
}
function FnJsAjaxDFinCaja() {
    $.ajax({
        url: "/modulo1/VstFinCaja.aspx/FnDFinCajaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdFinCaja: VarJsFinCajaId
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {

                console.log("Fin de Caja Eliminado");
            }
            else {

                CRUDFinCaja = "error"
                console.log("No se pudo Eliminar Fin de Caja");
            }
            FnAlertaFinCaja();

        }
    });
}
function FnJsAjaxEFinCaja() {
    $.ajax({
        url: "/modulo1/VstFinCaja.aspx/FnEFinCajaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            Fecha: VarJsFecha,
            IdFinCaja: VarJsFinCajaId
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                EFinCaja = true;
                $('#lblexistenuevoFinCaja').text("Existe FinCaja");
                FnJsBlockFinCaja();
            }
            else {
                EFinCaja = false;
                $('#lblexistenuevoFinCaja').text("");
                FnJsBlockFinCaja();
            }
        }
    });
}
function VerificarExisteFinCaja() {
    if ($('#txtNuevoFecha').val().length > 0 && $('#txtNuevoHora').val().length > 0 && $('#ddlCFinCajaCajero').val() > 0) {
        return true;
    }
    else {
        return false;
    }
}

$('#txtNuevoFecha').keyup(function (e) {
    VarJsFecha = $(this).val();

});

$('#ddlCFinCajaCajero').change(function (e) {
    VarJsIdCajero = $('#ddlCFinCajaCajero').val();
    if (VerificarExisteFinCaja()) {
        FnJsAjaxEFinCaja();
    }
    var actual = new Date();
    let d = $('#txtNuevoFecha').val().split("/");
    let dat = new Date(d[2] + '/' + d[1] + '/' + d[0] + ' ' + '23:59:00');
    if (!isNaN(dat)) {
        if (actual >= dat) {
            EFecha = true;
            $('#lblexistenuevoFecha').text("Solo fechas futuras");
        }
        else {
            FnJsAjaxEFinCaja();
            EFecha = false;
            $('#lblexistenuevoFecha').text("");
        }
        FnJsAjaxEFinCaja();
        FnJsBlockFinCaja();
    }
});
function FnJSFillDdlFinCajaCajero() {
    $('#ddlCFinCajaCajero').empty();
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnRCajeroV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLFinCajaCajero == "null") {
                $('#ddlCFinCajaCajero').append($("<option> </option>").val("0").html("Seleccionar Cajero"));
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLFinCajaCajero == (value.ObjEmpleado.ObjPersona.Nombre1 + ' ' + value.ObjEmpleado.ObjPersona.Apellido1)) {
                        $('#ddlCFinCajaCajero').append($("<option> </option>").val(value.ObjEmpleado.IdEmpleado).html(value.ObjEmpleado.ObjPersona.Nombre1 + ' ' + value.ObjEmpleado.ObjPersona.Apellido1));
                        VarJsIdCajero = value.ObjEmpleado.IdEmpleado;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCFinCajaCajero').append($("<option> </option>").val(value.ObjEmpleado.IdEmpleado).html(value.ObjEmpleado.ObjPersona.Nombre1 + ' ' + value.ObjEmpleado.ObjPersona.Apellido1));
            });
            VAlDDLFinCajaCajero = "null";
        }
    });
}
function FnAlertaFinCaja() {

    switch (CRUDFinCaja) {
        case "C":
            VarJsColorAlertFinCaja = "bg-success";
            VarJsTextoAlertFinCaja = "Creado";
            break;
        case "U":
            VarJsColorAlertFinCaja = "bg-warning";
            VarJsTextoAlertFinCaja = "Actualizado";
            break;
        case "D":
            VarJsColorAlertFinCaja = "bg-danger";
            VarJsTextoAlertFinCaja = "Eliminado";
            break;
        case "Error":
            VarJsColorAlertFinCaja = "bg-secondary";
            VarJsTextoAlertFinCaja = "No se pudo realizar la operación";
            break;
        default:
            console.log("Error CUD Fin de Caja Alert");
    }
    $('.bd-example-modal-sm .modal-content').addClass(VarJsColorAlertFinCaja);
    $('.bd-example-modal-sm h5').text(VarJsTextoAlertFinCaja);
    $('.bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.bd-example-modal-sm').modal('hide');
        $('.bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertFinCaja);
    }, 1500);
    if ($("#secciontblFinCaja.show").length > 0) {
        FnJsAjaxRFinCaja();
    }

    $("#modalNFinCaja").modal("toggle");
}