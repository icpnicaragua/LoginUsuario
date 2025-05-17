var tablaCargoEmpleado;
var ModCCargoEmpleado = $('#modalNCargoEmpleado');

var VarJsCargoEmpleadoId = 0;
var VarJsIdCargo = 0;
var VarJsIdEmpleado = 0;

var VAlDDLCargoEmpleadoCargo = "null";
var VAlDDLCargoEmpleadoEmpleado = "null";

var formCargoEmpleado = document.querySelector('#form1');

CRUDCargoEmpleado = "";

var VarJsColorAlertCargoEmpleado = "";
var VarJsTextoAlertCargoEmpleado = "";

var ECargoEmpleado = true;

$('#lbMostrarCargoEmpleado').click(function (e) {
    e.preventDefault();
    FnJsAjaxRCargoEmpleado();
    FnJSFillDdlCargoEmpleadoCargo();
    FnJSFillDdlCargoEmpleadoEmpleado();
});

function FnJsAjaxRCargoEmpleado() {
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnRCargoEmpleadoV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowCargoEmpleado(data.d);
        }
    }
    );
}

function AddrowCargoEmpleado(data) {
    $('#tblCargoEmpleado').DataTable().clear().destroy();
    tablaCargoEmpleado = $("#tblCargoEmpleado").DataTable({
        "retrieve": true,
        dom: 'Bfrtip',
        "order": [[1, 'asc'], [2, 'asc']],
        "columnDefs": [
            { "targets": 4, "searchable": false },
            { "orderable": false, "targets": 4 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colCargoEmpleado'
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
                filename: 'CargoEmpleado' + "_" + FnJsDate() + "_" + FnJsHour(),
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
                                    text: 'CargoEmpleado',
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte CargoEmpleado'
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
                filename: 'CargoEmpleado' + "_" + FnJsDate() + "_" + FnJsHour(),
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
    tablaCargoEmpleado.buttons().container().addClass('form-inline');

    for (var contCargoEmpleado = 0; contCargoEmpleado < data.length; contCargoEmpleado++) {
        tablaCargoEmpleado.row.add([
            data[contCargoEmpleado].IdCargoEmpleado,
            data[contCargoEmpleado].ObjCargo.Cargo,
            data[contCargoEmpleado].ObjEmpleado.ObjPersona.Nombre1,
            data[contCargoEmpleado].ObjEmpleado.ObjPersona.Apellido1,
            '<button value="editar" href="#modalNCargoEmpleado" data-toggle="modal" title="editar" class="btn btn-warning  btn-editCargoEmpleado"><i class="fas fa-pencil-alt"></i> </button>' +
            '<button value="eliminar" href="#modalNCargoEmpleado" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteCargoEmpleado"><i class="fa fa-trash" ></i> </button>'
        ]
        ).draw(false);
    }
}

$('#lbNCargoEmpleado').click(function (e) {
    e.preventDefault();
    FnJsCCargoEmpleado();
    ECargoEmpleado = true;

    FnJsBlockCargoEmpleado();
    FnJSFillDdlCargoEmpleadoCargo();
    FnJSFillDdlCargoEmpleadoEmpleado();
    CRUDCargoEmpleado = "C";

    VarJsCargoEmpleadoId = 0;

    VarJsIdCargo = 0;
    VarJsIdEmpleado = 0;

});
$(document).on('click', '.btn-editCargoEmpleado', function (e) {
    e.preventDefault();
    FnJsUCargoEmpleado();
    var dataCargoEmpleado = tablaCargoEmpleado.row($(this).parents("tr")).data();
    VarJsCargoEmpleadoId = dataCargoEmpleado[0];
    VAlDDLCargoEmpleadoCargo = (dataCargoEmpleado[1]);
    VAlDDLCargoEmpleadoEmpleado = (dataCargoEmpleado[2] + ' ' + dataCargoEmpleado[3]);
    FnJSFillDdlCargoEmpleadoCargo();
    FnJSFillDdlCargoEmpleadoEmpleado();
    VarJsIdCargo = $('#ddlCCargoEmpleadoCargo').val();
    VarJsIdEmpleado = $('#ddlCCargoEmpleadoEmpleado').val();
    CRUDCargoEmpleado = "U";
});
$(document).on('click', '.btn-deleteCargoEmpleado', function (e) {
    e.preventDefault();
    FnJsDCargoEmpleado();
    ECargoEmpleado = false;
    FnJsBlockCargoEmpleado();
    var dataCargoEmpleado = tablaCargoEmpleado.row($(this).parents("tr")).data();
    VarJsCargoEmpleadoId = dataCargoEmpleado[0];
 
    VAlDDLCargoEmpleadoCargo = (dataCargoEmpleado[1]);
    VAlDDLCargoEmpleadoEmpleado = (dataCargoEmpleado[2] + ' ' + dataCargoEmpleado[3]);
    FnJSFillDdlCargoEmpleadoCargo();
    FnJSFillDdlCargoEmpleadoEmpleado();

    CRUDCargoEmpleado = "D";
});


function FnJsCCargoEmpleado() {
    $('#lblexistenuevoCargoEmpleado').text("");

    $("#DivModBorCargoEmpleado").removeAttr("class");
    $("#DivModBorCargoEmpleado").attr('class', 'modal-content border-success');

    $("#DivModHeaCargoEmpleado").removeAttr("class");
    $("#DivModHeaCargoEmpleado").attr('class', 'modal-header bg-success');

    $('#H4ModTitCargoEmpleado').text('Nuevo CargoEmpleado');

    $("#btnNueCargoEmpleado").removeAttr("class");
    $("#btnNueCargoEmpleado").attr('class', 'btn btn-success pull-right');
    $("#btnNueCargoEmpleado i").removeAttr("class");
    $("#btnNueCargoEmpleado i").attr("class", "fa fa-save fa-2x");

    $("#ddlCCargoEmpleadoCargo").removeAttr("class");
    $("#ddlCCargoEmpleadoCargo").attr("class", "form-control border-success");
    $("#ddlCCargoEmpleadoEmpleado").removeAttr("class");
    $("#ddlCCargoEmpleadoEmpleado").attr("class", "form-control border-success");
  
    $('#ddlCCargoEmpleadoCargo').attr('disabled', false);
    $('#ddlCCargoEmpleadoEmpleado').attr('disabled', false);

    $('#' + ModCCargoEmpleado[0].id + ' :text').val("");

}
function FnJsUCargoEmpleado() {
    $('#lblexistenuevoCargoEmpleado').text("");

    $("#DivModBorCargoEmpleado").removeAttr("class");
    $("#DivModBorCargoEmpleado").attr('class', 'modal-content border-warning');

    $("#DivModHeaCargoEmpleado").removeAttr("class");
    $("#DivModHeaCargoEmpleado").attr('class', 'modal-header bg-warning');

    $('#H4ModTitCargoEmpleado').text('Editar CargoEmpleado');

    $("#btnNueCargoEmpleado").removeAttr("class");
    $("#btnNueCargoEmpleado").attr('class', 'btn btn-warning pull-right');
    $("#btnNueCargoEmpleado i").removeAttr("class");
    $("#btnNueCargoEmpleado i").attr("class", "fa fa-save fa-2x");

    $("#ddlCCargoEmpleadoCargo").removeAttr("class");
    $("#ddlCCargoEmpleadoCargo").attr("class", "form-control border-warning");
    $("#ddlCCargoEmpleadoEmpleado").removeAttr("class");
    $("#ddlCCargoEmpleadoEmpleado").attr("class", "form-control border-warning");

    $('#ddlCCargoEmpleadoCargo').attr('disabled', false);
    $('#ddlCCargoEmpleadoEmpleado').attr('disabled', true);

    $('#' + ModCCargoEmpleado[0].id + ' :text').val("");
}
function FnJsDCargoEmpleado() {
    $('#lblexistenuevoCargoEmpleado').text("");

    $("#DivModBorCargoEmpleado").removeAttr("class");
    $("#DivModBorCargoEmpleado").attr('class', 'modal-content border-danger');

    $("#DivModHeaCargoEmpleado").removeAttr("class");
    $("#DivModHeaCargoEmpleado").attr('class', 'modal-header bg-danger');

    $('#H4ModTitCargoEmpleado').text('Eliminar CargoEmpleado');

    $("#btnNueCargoEmpleado").removeAttr("class");
    $("#btnNueCargoEmpleado").attr('class', 'btn btn-danger pull-right');
    $("#btnNueCargoEmpleado i").removeAttr("class");
    $("#btnNueCargoEmpleado i").attr("class", "fa fa-trash fa-2x");

    $("#ddlCCargoEmpleadoCargo").removeAttr("class");
    $("#ddlCCargoEmpleadoCargo").attr("class", "form-control border-danger");
    $("#ddlCCargoEmpleadoEmpleado").removeAttr("class");
    $("#ddlCCargoEmpleadoEmpleado").attr("class", "form-control border-danger");

    $('#ddlCCargoEmpleadoCargo').attr('disabled', true);
    $('#ddlCCargoEmpleadoEmpleado').attr('disabled', true);

    $('#' + ModCCargoEmpleado[0].id + ' :text').val("");
}


function FnJsBlockCargoEmpleado() {
    if (ECargoEmpleado == true) {
        $("#btnNueCargoEmpleado").fadeOut("fast");
        $("#btnNueCargoEmpleado").attr('disabled', true);
    }
    else if (ECargoEmpleado == false) {
        $("#btnNueCargoEmpleado").fadeIn("slow");
        $("#btnNueCargoEmpleado").attr('disabled', false);
    }
}


$('#btnNueCargoEmpleado').click(function (e) {
    e.preventDefault();
    if (formCargoEmpleado.checkValidity()) {
        switch (CRUDCargoEmpleado) {
            case "C":
                FnJsAjaxCCargoEmpleado();
                break;
            case "U":
                FnJsAjaxUCargoEmpleado();
                break;
            case "D":
                FnJsAjaxDCargoEmpleado();
                break;
            default:
                console.log("Error en cud CargoEmpleado");
        }
    }
});

function FnJsAjaxCCargoEmpleado() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnCCargoEmpleadoV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdEmpleado: VarJsIdEmpleado,
            IdCargo: VarJsIdCargo
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Cargo al Empleado Agregado");
            }
            else {
                CRUDCargoEmpleado = "error"
                console.log("No se pudo agregar Cargo al Empleado");
            }
            FnAlertaCargoEmpleado();
        }
    });
}
function FnJsAjaxUCargoEmpleado() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnUCargoEmpleadoV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdCargoEmpleado: VarJsCargoEmpleadoId,
            IdCargo: VarJsIdCargo
        }), 
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Cargo al Empleado Actualizado");
            }
            else {
                CRUDCargoEmpleado = "error"
                console.log("no se pudo actualizar");
            }
            FnAlertaCargoEmpleado();
        }
    });
}
function FnJsAjaxDCargoEmpleado() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnDCargoEmpleadoV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdCargoEmpleado: VarJsCargoEmpleadoId
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Cargo al Empleado Eliminado");
            }
            else {
                CRUDCargoEmpleado = "error"
                console.log("No se pudo Eliminar Cargo al Empleado");
            }
            FnAlertaCargoEmpleado();
        }
    });
}
function FnJsAjaxECargoEmpleado() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnECargoEmpleadoV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdCargoEmpleado: VarJsCargoEmpleadoId,
            IdEmpleado: VarJsIdEmpleado,
            IdCargo: VarJsIdCargo
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                ECargoEmpleado = true;
                $('#lblexistenuevoCargoEmpleado').text("Existe Cargo asignado al Empleado");
                FnJsBlockCargoEmpleado();
            }
            else {
                ECargoEmpleado = false;
                $('#lblexistenuevoCargoEmpleado').text("");
                FnJsBlockCargoEmpleado();
            }
        }
    });
}

function VerificarExisteCargoEmpleado() {
    if ($('#ddlCCargoEmpleadoCargo').val() > 0 && $('#ddlCCargoEmpleadoEmpleado').val() > 0) {
        return true;
    }
    else {
        return false;
    }
}



$('#ddlCCargoEmpleadoCargo').change(function (e) {
    VarJsIdCargo = $('#ddlCCargoEmpleadoCargo').val();
    if (VerificarExisteCargoEmpleado()) {
        FnJsAjaxECargoEmpleado();
    }
});

$('#ddlCCargoEmpleadoEmpleado').change(function (e) {
    VarJsIdEmpleado = $('#ddlCCargoEmpleadoEmpleado').val();
    if (VerificarExisteCargoEmpleado()) {
        FnJsAjaxECargoEmpleado();
    }
});

function FnJSFillDdlCargoEmpleadoCargo() {
    $('#ddlCCargoEmpleadoCargo').empty();
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnRCargoV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLCargoEmpleadoCargo == "null") {
                $('#ddlCCargoEmpleadoCargo').append($("<option> </option>").val("0").html("Seleccionar Cargo"));
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLCargoEmpleadoCargo == value.Cargo) {
                        $('#ddlCCargoEmpleadoCargo').append($("<option> </option>").val(value.IdCargo).html(value.Cargo));
                        VarJsIdCargo = value.IdCargo;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCCargoEmpleadoCargo').append($("<option> </option>").val(value.IdCargo).html(value.Cargo));
            });
            VAlDDLCargoEmpleadoCargo = "null";
        }
    });
}

function FnJSFillDdlCargoEmpleadoEmpleado() {
    $('#ddlCCargoEmpleadoEmpleado').empty();
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnREmpleadoV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLCargoEmpleadoEmpleado == "null") {
                $('#ddlCCargoEmpleadoEmpleado').append($("<option> </option>").val("0").html("Seleccionar Empleado"));
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLCargoEmpleadoEmpleado == (value.ObjPersona.Nombre1 + ' ' + value.ObjPersona.Apellido1)) {
                        $('#ddlCCargoEmpleadoEmpleado').append($("<option> </option>").val(value.IdEmpleado).html(value.ObjPersona.Nombre1 + ' ' + value.ObjPersona.Apellido1));
                        VarJsIdEmpleado = value.IdEmpleado;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCCargoEmpleadoEmpleado').append($("<option> </option>").val(value.IdEmpleado).html(value.ObjPersona.Nombre1 + ' ' + value.ObjPersona.Apellido1));
            });
            VAlDDLCargoEmpleadoEmpleado = "null";
        }
    });
}

function FnAlertaCargoEmpleado() {

    switch (CRUDCargoEmpleado) {
        case "C":
            VarJsColorAlertCargoEmpleado = "bg-success";
            VarJsTextoAlertCargoEmpleado = "Creado";
            break;
        case "U":
            VarJsColorAlertCargoEmpleado = "bg-warning";
            VarJsTextoAlertCargoEmpleado = "Actualizado";
            break;
        case "D":
            VarJsColorAlertCargoEmpleado = "bg-danger";
            VarJsTextoAlertCargoEmpleado = "Eliminado";
            break;
        case "Error":
            VarJsColorAlertCargoEmpleado = "bg-secondary";
            VarJsTextoAlertCargoEmpleado = "No se pudo realizar la operación";
            break;
        default:
            console.log("Error CUD Cargo al Empleado Alert");
    }

    $('.bd-example-modal-sm .modal-content').addClass(VarJsColorAlertCargoEmpleado);
    $('.bd-example-modal-sm h5').text(VarJsTextoAlertCargoEmpleado);
    $('.bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.bd-example-modal-sm').modal('hide');
        $('.bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertCargoEmpleado);
    }, 1500);

    if ($("#secciontblCargoEmpleado.show").length > 0) {
        FnJsAjaxRCargoEmpleado();
    }

    $("#modalNCargoEmpleado").modal("toggle");
}