var tablaPersona;
var ModCPersona = $('#modalNPersona');

var VarJsPersonaId = 0;
var VarJsNombre1 = "";
var VarJsNombre2 = "";
var VarJsApellido1 = "";
var VarJsApellido2 = "";
var VarJsIdGenero = 0;

var VAlDDLPersonaGenero = "null";

var formPersona = document.querySelector('#form1');

CRUDPersona = "";

var VarJsColorAlertPersona = "";
var VarJsTextoAlertPersona = "";

var EPersona = true;

$('#lbMostrarPersona').click(function (e) {
    e.preventDefault();
    FnJsAjaxRPersona();
    FnJSFillDdlPersonaGenero();
});

function FnJsAjaxRPersona() {
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnRPersonaV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowPersona(data.d);
        }
    }
    );
}
function AddrowPersona(data) {

    $('#tblPersona').DataTable().clear().destroy();

    tablaPersona = $("#tblPersona").DataTable({
        select: true,
        "retrieve": true,
        dom: 'Bfrtip',
        autoWidth: false,
        "order": [[2, 'asc'], [4, 'asc']],
        "columnDefs": [
            { "targets": 6, "searchable": false },
            { "orderable": false, "targets": 6 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colPersona'
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
                    columns: [':not(:eq(6)):visible']
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
                    columns: [':not(:eq(6)):visible']
                },
                titleAttr: 'PDF',
                filename: 'Persona' + "_" + FnJsDate() + "_" + FnJsHour(),
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
                                    text: 'Persona',
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Persona'
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
                filename: 'Persona' + "_" + FnJsDate() + "_" + FnJsHour(),
                text: '<i class="far fa-file-excel fa-2x"></i>',
                className: 'btn btn-success d-none d-lg-block',
                exportOptions: {
                    columns: [':not(:eq(6)):visible']
                },
                titleAttr: 'Excel',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')
                }
            }
        ],
        "language": FnJsEspTbl()
    });
    tablaPersona.buttons().container().addClass('form-inline');
    for (var contPersona = 0; contPersona < data.length; contPersona++) {
        tablaPersona.row.add([
            data[contPersona].IdPersona,
            data[contPersona].Nombre1,
            data[contPersona].Nombre2,
            data[contPersona].Apellido1,
            data[contPersona].Apellido2,
            data[contPersona].ObjGenero.Genero,
            '<button value="editar" href="#modalNPersona" data-toggle="modal" title="editar" class="btn btn-warning  btn-editPersona"><i class="fas fa-pencil-alt"></i> </button>' +
            '<button value="eliminar" href="#modalNPersona" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deletePersona"><i class="fa fa-trash" ></i> </button>'
        ]
        ).draw(false);
    }
}

$('#lbNPersona').click(function (e) {
    e.preventDefault();
    FnJsCPersona();
    EPersona = true;

    FnJsBlockPersona();
    FnJSFillDdlPersonaGenero();
    CRUDPersona = "C";

    VarJsPersonaId = 0;
    VarJsNombre1 = "";
    VarJsNombre2 = "";
    VarJsApellido1 = "";
    VarJsApellido2 = "";
    VarJsIdGenero = 0;
});

$(document).on('click', '.btn-editPersona', function (e) {
    e.preventDefault();
    FnJsUPersona();
    var dataPersona = tablaPersona.row($(this).parents("tr")).data();
    VarJsPersonaId = dataPersona[0];
    $('#txtNuevoNombre1').val(dataPersona[1]);
    $('#txtNuevoNombre2').val(dataPersona[2]);
    $('#txtNuevoApellido1').val(dataPersona[3]);
    $('#txtNuevoApellido2').val(dataPersona[4]);
    VarJsNombre1 = dataPersona[1];
    VarJsNombre2 = dataPersona[2];
    VarJsApellido1 = dataPersona[3];
    VarJsApellido2 = dataPersona[4];

    VAlDDLPersonaGenero = (dataPersona[5]);
    FnJSFillDdlPersonaGenero();
    VarJsIdGenero = $('#ddlCPersonaGenero').val();
    CRUDPersona = "U";
});
$(document).on('click', '.btn-deletePersona', function (e) {
    e.preventDefault();
    FnJsDPersona();
    EPersona = false;

    FnJsBlockPersona();
    var dataPersona = tablaPersona.row($(this).parents("tr")).data();
    VarJsPersonaId = dataPersona[0];
    $('#txtNuevoNombre1').val(dataPersona[1]);
    $('#txtNuevoNombre2').val(dataPersona[2]);
    $('#txtNuevoApellido1').val(dataPersona[3]);
    $('#txtNuevoApellido2').val(dataPersona[4]);
    VarJsNombre1 = dataPersona[1];
    VarJsNombre2 = dataPersona[2];
    VarJsApellido1 = dataPersona[3];
    VarJsApellido2 = dataPersona[4];
    VAlDDLPersonaGenero = (dataPersona[5]);
    FnJSFillDdlPersonaGenero();

    CRUDPersona = "D";
});

function FnJsCPersona() {
    $('#lblexistenuevoPersona').text("");

    $("#DivModBorPersona").removeAttr("class");
    $("#DivModBorPersona").attr('class', 'modal-content border-success');

    $("#DivModHeaPersona").removeAttr("class");
    $("#DivModHeaPersona").attr('class', 'modal-header bg-success');

    $('#H4ModTitPersona').text('Nuevo Persona');

    $("#btnNuePersona").removeAttr("class");
    $("#btnNuePersona").attr('class', 'btn btn-success pull-right');
    $("#btnNuePersona i").removeAttr("class");
    $("#btnNuePersona i").attr("class", "fa fa-save fa-2x");

    $("#ddlCPersonaGenero").removeAttr("class");
    $("#ddlCPersonaGenero").attr("class", "form-control border-success");

    $("#txtNuevoNombre1").attr('disabled', false);
    $("#txtNuevoNombre2").attr('disabled', false);
    $("#txtNuevoApellido1").attr('disabled', false);
    $("#txtNuevoApellido2").attr('disabled', false);
    $('#ddlCPersonaGenero').attr('disabled', false);

    $('#' + ModCPersona[0].id + ' :text').val("");
}
function FnJsUPersona() {
    $('#lblexistenuevoPersona').text("");

    $("#DivModBorPersona").removeAttr("class");
    $("#DivModBorPersona").attr('class', 'modal-content border-warning');

    $("#DivModHeaPersona").removeAttr("class");
    $("#DivModHeaPersona").attr('class', 'modal-header bg-warning');

    $('#H4ModTitPersona').text('Editar Persona');

    $("#btnNuePersona").removeAttr("class");
    $("#btnNuePersona").attr('class', 'btn btn-warning pull-right');
    $("#btnNuePersona i").removeAttr("class");
    $("#btnNuePersona i").attr("class", "fa fa-save fa-2x");

    $("#ddlCPersonaGenero").removeAttr("class");
    $("#ddlCPersonaGenero").attr("class", "form-control border-warning");

    $("#txtNuevoNombre1").attr('disabled', false);
    $("#txtNuevoNombre2").attr('disabled', false);
    $("#txtNuevoApellido1").attr('disabled', false);
    $("#txtNuevoApellido2").attr('disabled', false);
    $('#ddlCPersonaGenero').attr('disabled', false);

    $('#' + ModCPersona[0].id + ' :text').val("");
}
function FnJsDPersona() {
    $('#lblexistenuevoPersona').text("");

    $("#DivModBorPersona").removeAttr("class");
    $("#DivModBorPersona").attr('class', 'modal-content border-danger');

    $("#DivModHeaPersona").removeAttr("class");
    $("#DivModHeaPersona").attr('class', 'modal-header bg-danger');

    $('#H4ModTitPersona').text('Eliminar Persona');

    $("#btnNuePersona").removeAttr("class");
    $("#btnNuePersona").attr('class', 'btn btn-danger pull-right');
    $("#btnNuePersona i").removeAttr("class");
    $("#btnNuePersona i").attr("class", "fa fa-trash fa-2x");

    $("#ddlCPersonaGenero").removeAttr("class");
    $("#ddlCPersonaGenero").attr("class", "form-control border-danger");

    $("#txtNuevoNombre1").attr('disabled', true);
    $("#txtNuevoNombre2").attr('disabled', true);
    $("#txtNuevoApellido1").attr('disabled', true);
    $("#txtNuevoApellido2").attr('disabled', true);
    $('#ddlCPersonaGenero').attr('disabled', true);

    $('#' + ModCPersona[0].id + ' :text').val("");
}

function FnJsBlockPersona() {
    if (EPersona == true) {
        $("#btnNuePersona").fadeOut("fast");
        $("#btnNuePersona").attr('disabled', true);
    }
    else if (EPersona == false) {
        $("#btnNuePersona").fadeIn("slow");
        $("#btnNuePersona").attr('disabled', false);
    }
}

$('#btnNuePersona').click(function (e) {
    e.preventDefault();
    if (formPersona.checkValidity()) {
        switch (CRUDPersona) {
            case "C":
                FnJsAjaxCPersona();
                break;
            case "U":
                FnJsAjaxUPersona();
                break;
            case "D":
                FnJsAjaxDPersona();
                break;
            default:
                console.log("Error en cud Persona");
        }
    }
});

function FnJsAjaxCPersona() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnCPersonaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            Nombre1: VarJsNombre1,
            Nombre2: VarJsNombre2,
            Apellido1: VarJsApellido1,
            Apellido2: VarJsApellido2,
            IdGenero: VarJsIdGenero
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Persona Agregado");
            }
            else {
                CRUDPersona = "error"
                console.log("No se pudo agregar Persona");
            }
            FnAlertaPersona();
        }
    });
}
function FnJsAjaxUPersona() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnUPersonaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdPersona: VarJsPersonaId,
            Nombre1: VarJsNombre1,
            Nombre2: VarJsNombre2,
            Apellido1: VarJsApellido1,
            Apellido2: VarJsApellido2,
            IdGenero: VarJsIdGenero

        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Persona Actualizado");
            }
            else {
                CRUDPersona = "error"
                console.log("no se pudo actualizar");
            }
            FnAlertaPersona();
        }
    });
}
function FnJsAjaxDPersona() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnDPersonaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdPersona: VarJsPersonaId
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Persona Eliminado");
            }
            else {
                CRUDPersona = "error"
                console.log("No se pudo Eliminar Persona");
            }
            FnAlertaPersona();
        }
    });
}

function FnJsAjaxEPersona() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnEPersonaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdPersona: VarJsPersonaId,
            Nombre1: VarJsNombre1,
            Nombre2: VarJsNombre2,
            Apellido1: VarJsApellido1,
            Apellido2: VarJsApellido2,
            IdGenero: VarJsIdGenero
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                EPersona = true;
                $('#lblexistenuevoPersona').text("Existe Persona");
                FnJsBlockPersona();
            }
            else {
                EPersona = false;
                $('#lblexistenuevoPersona').text("");
                FnJsBlockPersona();
            }
        }
    });
}

function VerificarExistePersona() {
    if ($('#txtNuevoNombre1').val().length >= 3 && $('#txtNuevoApellido1').val().length >= 3 && $('#ddlCPersonaGenero').val() > 0) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}

$('#txtNuevoNombre1').keyup(function (e) {
    VarJsNombre1 = $(this).val();
    if (VerificarExistePersona()) {
        FnJsAjaxEPersona();
    }
});

$('#txtNuevoNombre2').keyup(function (e) {
    VarJsNombre2 = $(this).val();
    if (VerificarExistePersona()) {
        FnJsAjaxEPersona();
    }
});

$('#txtNuevoApellido1').keyup(function (e) {
    VarJsApellido1 = $(this).val();
    if (VerificarExistePersona()) {
        FnJsAjaxEPersona();
    }
});
$('#txtNuevoApellido2').keyup(function (e) {
    VarJsApellido2 = $(this).val();
    if (VerificarExistePersona()) {
        FnJsAjaxEPersona();
    }
});

$('#ddlCPersonaGenero').change(function (e) {
    VarJsIdGenero = $('#ddlCPersonaGenero').val();
    if (VerificarExistePersona()) {
        FnJsAjaxEPersona();
    }
});

function FnJSFillDdlPersonaGenero() {
    $('#ddlCPersonaGenero').empty();
    $.ajax({
        type: "POST",
        url: "/modulo7/VstGenerales.aspx/FnRGeneroV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLPersonaGenero == "null") {
                $('#ddlCPersonaGenero').append($("<option> </option>").val("0").html("Seleccionar Género"));  // xxxx id val html            
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLPersonaGenero == value.Genero) {
                        $('#ddlCPersonaGenero').append($("<option> </option>").val(value.IdGenero).html(value.Genero));  // xxxx id texto
                        VarJsIdGenero = value.IdGenero;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCPersonaGenero').append($("<option> </option>").val(value.IdGenero).html(value.Genero)); // id en un val y en html el nombre
            });
            VAlDDLPersonaGenero = "null";
        }
    });
}

function FnAlertaPersona() {
    switch (CRUDPersona) {
        case "C":
            VarJsColorAlertPersona = "bg-success";
            VarJsTextoAlertPersona = "Creado";
            break;
        case "U":
            VarJsColorAlertPersona = "bg-warning";
            VarJsTextoAlertPersona = "Actualizado";
            break;
        case "D":
            VarJsColorAlertPersona = "bg-danger";
            VarJsTextoAlertPersona = "Eliminado";
            break;
        case "Error":
            VarJsColorAlertPersona = "bg-secondary";
            VarJsTextoAlertPersona = "No se pudo realizar la operación";
            break;
        default:
            console.log("Error CUD Persona Alert")
    }

    $('.bd-example-modal-sm .modal-content').addClass(VarJsColorAlertPersona);
    $('.bd-example-modal-sm h5').text(VarJsTextoAlertPersona);
    $('.bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.bd-example-modal-sm').modal('hide');
        $('.bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertPersona);
    }, 1500);

    if ($("#secciontblPersona.show").length > 0) {
        FnJsAjaxRPersona();
    }
   
    $("#modalNPersona").modal("toggle");
}