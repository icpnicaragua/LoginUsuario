var tablaCargo;
var ModCCargo = $('#modalNCargo');
var VarJsCargoId = 0;
var VarJsCargo = "";

var formCargo = document.querySelector('#form1');

CRUDCargo = "";
var VarJsColorAlertCargo = "";
var VarJsTextoAlertCargo = "";
var ECargo = true;

$('#lbMostrarCargo').click(function (e) {
    e.preventDefault();
    FnJsAjaxRCargo();
});

function FnJsAjaxRCargo() {
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnRCargoV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowCargo(data.d);
        }
    }
    );
}
function AddrowCargo(data) {
    $('#tblCargo').DataTable().clear().destroy();
    tablaCargo = $("#tblCargo").DataTable({
        "retrieve": true,
        dom: 'Bfrtip',
        "order": [1, 'asc'],
        "columnDefs": [
            { "targets": 2, "searchable": false },
            { "orderable": false, "targets": 2 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colCargo'
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
                    columns: [':not(:eq(2)):visible']
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
                    columns: [':not(:eq(2)):visible']
                },
                titleAttr: 'PDF',
                filename: 'Cargo' + "_" + FnJsDate() + "_" + FnJsHour(),
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
                                    text: 'Cargo',
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Cargo'
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
                filename: 'Cargo' + "_" + FnJsDate() + "_" + FnJsHour(),
                text: '<i class="far fa-file-excel fa-2x"></i>',
                className: 'btn btn-success d-none d-lg-block',
                exportOptions: {
                    columns: [':not(:eq(2)):visible']
                },
                titleAttr: 'Excel',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')
                }
            }
        ],
        "language": FnJsEspTbl()
    });
    tablaCargo.buttons().container().addClass('form-inline');
    for (var contCargo = 0; contCargo < data.length; contCargo++) {
        tablaCargo.row.add([
            data[contCargo].IdCargo,
            data[contCargo].Cargo,
            '<button value="editar" href="#modalNCargo" data-toggle="modal" title="editar" class="btn btn-warning  btn-editCargo"><i class="fas fa-pencil-alt"></i> </button>' +
            '<button value="eliminar" href="#modalNCargo" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteCargo"><i class="fa fa-trash" ></i> </button>'
        ]
        ).draw(false);
    }
}

$('#lbNCargo').click(function (e) {
    e.preventDefault();
    FnJsCCargo();
    ECargo = true;

    FnJsBlockCargo();

    CRUDCargo = "C";

    VarJsCargoId = 0;
    VarJsCargo = "";
});
$(document).on('click', '.btn-editCargo', function (e) {
    e.preventDefault();
    FnJsUCargo();
    var dataCargo = tablaCargo.row($(this).parents("tr")).data();
    VarJsCargoId = dataCargo[0];
    $('#txtNuevoCargo').val(dataCargo[1]);
    VarJsCargo = dataCargo[1];
    CRUDCargo = "U";
});
$(document).on('click', '.btn-deleteCargo', function (e) {
    e.preventDefault();
    FnJsDCargo();
    ECargo = false;

    FnJsBlockCargo();
    var dataCargo = tablaCargo.row($(this).parents("tr")).data();
    VarJsCargoId = dataCargo[0];
    $('#txtNuevoCargo').val(dataCargo[1]);

    VarJsCargo = dataCargo[1];

    CRUDCargo = "D";
});

function FnJsCCargo() {
    $('#lblexistenuevoCargo').text("");

    $("#DivModBorCargo").removeAttr("class");
    $("#DivModBorCargo").attr('class', 'modal-content border-success');
    $("#DivModHeaCargo").removeAttr("class");
    $("#DivModHeaCargo").attr('class', 'modal-header bg-success');
    $('#H4ModTitCargo').text('Nuevo Cargo');
    $("#btnNueCargo").removeAttr("class");
    $("#btnNueCargo").attr('class', 'btn btn-success pull-right');
    $("#btnNueCargo i").removeAttr("class");
    $("#btnNueCargo i").attr("class", "fa fa-save fa-2x");
    $("#txtNuevoCargo").attr('disabled', false);

    $('#' + ModCCargo[0].id + ' :text').val("");
}
function FnJsUCargo() {
    $('#lblexistenuevoCargo').text("");

    $("#DivModBorCargo").removeAttr("class");
    $("#DivModBorCargo").attr('class', 'modal-content border-warning');
    $("#DivModHeaCargo").removeAttr("class");
    $("#DivModHeaCargo").attr('class', 'modal-header bg-warning');
    $('#H4ModTitCargo').text('Editar Cargo');
    $("#btnNueCargo").removeAttr("class");
    $("#btnNueCargo").attr('class', 'btn btn-warning pull-right');
    $("#btnNueCargo i").removeAttr("class");
    $("#btnNueCargo i").attr("class", "fa fa-save fa-2x");
    $("#txtNuevoCargo").attr('disabled', false);

    $('#' + ModCCargo[0].id + ' :text').val("");
}
function FnJsDCargo() {
    $('#lblexistenuevoCargo').text("");

    $("#DivModBorCargo").removeAttr("class");
    $("#DivModBorCargo").attr('class', 'modal-content border-danger');
    $("#DivModHeaCargo").removeAttr("class");
    $("#DivModHeaCargo").attr('class', 'modal-header bg-danger');
    $('#H4ModTitCargo').text('Eliminar Cargo');
    $("#btnNueCargo").removeAttr("class");
    $("#btnNueCargo").attr('class', 'btn btn-danger pull-right');
    $("#btnNueCargo i").removeAttr("class");
    $("#btnNueCargo i").attr("class", "fa fa-trash fa-2x");
    $("#txtNuevoCargo").attr('disabled', true);

    $('#' + ModCCargo[0].id + ' :text').val("");
}

function FnJsBlockCargo() {
    if (ECargo == true) {
        $("#btnNueCargo").fadeOut("fast");
        $("#btnNueCargo").attr('disabled', true);
    }
    else if (ECargo == false) {
        $("#btnNueCargo").fadeIn("slow");
        $("#btnNueCargo").attr('disabled', false);
    }
}

$('#btnNueCargo').click(function (e) {
    e.preventDefault();
    if (formCargo.checkValidity()) {
        switch (CRUDCargo) {
            case "C":
                FnJsAjaxCCargo();
                break;
            case "U":
                FnJsAjaxUCargo();
                break;
            case "D":
                FnJsAjaxDCargo();
                break;
            default:
                console.log("Error en cud Cargo");
        }
    }
});

function FnJsAjaxCCargo() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnCCargoV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            Cargo: VarJsCargo
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Cargo Agregado");
            }
            else {
                CRUDCargo = "error"
                console.log("No se pudo agregar Cargo");
            }
            FnAlertaCargo();
        }
    });
}
function FnJsAjaxUCargo() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnUCargoV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdCargo: VarJsCargoId,
            Cargo: VarJsCargo
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Cargo Actualizado");
            }
            else {
                CRUDCargo = "error"
                console.log("no se pudo actualizar");
            }
            FnAlertaCargo();
        }
    });
}
function FnJsAjaxDCargo() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnDCargoV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdCargo: VarJsCargoId
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Cargo Eliminado");
            }
            else {
                CRUDCargo = "error"
                console.log("No se pudo Eliminar Cargo");
            }
            FnAlertaCargo();
        }
    });
}

function FnJsAjaxECargo() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnECargoV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdCargo: VarJsCargoId,
            Cargo: VarJsCargo
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                ECargo = true;
                $('#lblexistenuevoCargo').text("Existe Cargo");
                FnJsBlockCargo();
            }
            else {
                ECargo = false;
                $('#lblexistenuevoCargo').text("");
                FnJsBlockCargo();
            }
        }
    });
}


function VerificarExisteCargo() {
    if ($('#txtNuevoCargo').val().length >=3) {
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoCargo').keyup(function (e) {
    VarJsCargo = $(this).val();
    if (VerificarExisteCargo()) {
        FnJsAjaxECargo();
    }
});


function FnAlertaCargo() {
    switch (CRUDCargo) {
        case "C":
            VarJsColorAlertCargo = "bg-success";
            VarJsTextoAlertCargo = "Creado";
            break;
        case "U":
            VarJsColorAlertCargo = "bg-warning";
            VarJsTextoAlertCargo = "Actualizado";
            break;
        case "D":
            VarJsColorAlertCargo = "bg-danger";
            VarJsTextoAlertCargo = "Eliminado";
            break;
        case "Error":
            VarJsColorAlertCargo = "bg-secondary";
            VarJsTextoAlertCargo = "No se pudo realizar la operación";
            break;
        default:
            console.log("Error CUD Cargo Alert");
    }
    $('.bd-example-modal-sm .modal-content').addClass(VarJsColorAlertCargo);
    $('.bd-example-modal-sm h5').text(VarJsTextoAlertCargo);
    $('.bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.bd-example-modal-sm').modal('hide');
        $('.bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertCargo);
    }, 1500);

    if ($("#secciontblCargo.show").length > 0) {
        FnJsAjaxRCargo();
    }
    $("#modalNCargo").modal("toggle");
}