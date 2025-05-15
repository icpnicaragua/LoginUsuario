var tablaDireccion;
var ModCDireccion = $('#modalNDireccion');
var VarJsDireccionId = 0;
var VarJsDireccion = "";
var VarJsIdTipoDireccion = 0;
var VarJsIdPersona = 0;
var VarJsDepartamento = "";
var VarJsIdDepartamento = 0;
var VarJsMunicipio = "";
var VarJsIdMunicipio = 0;
var VarJsBarrio = "";
var VarJsIdBarrio = 0;

var VAlDDLDireccionTipoDireccion = "null";
var VAlDDLDepartamento = "null";
var VAlDDLMunicipio = "null";
var VAlDDLBarrio = "null";
var formDireccion = document.querySelector('#form1');

CRUDDireccion = "";
var VarJsColorAlertDireccion = "";
var VarJsTextoAlertDireccion = "";
var EDireccion = true;

$('#tblPersona tbody').on('click', 'tr', function () {
    var tablaPersona = $('#tblPersona').DataTable();
    console.log('dire : ' + tablaPersona.row(this).data()[0]);
    VarJsIdPersona = tablaPersona.row(this).data()[0];
    FnJsAjaxRDireccion();
    FnJSFillDdlDireccionTipoDireccion();
    $("#DatosPersona").attr('class', 'row collapse show');

})

function FnJsAjaxRDireccion() {
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnRDireccionV",
        data: JSON.stringify({
            IdPersona: VarJsIdPersona
        }),
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowDireccion(data.d);
        }
    }
    );
}

function AddrowDireccion(data) {
    $('#tblDireccion').DataTable().clear().destroy();

    tablaDireccion = $("#tblDireccion").DataTable({

        "retrieve": true,
        dom: 'Bfrtip',

        "order": [[2, 'asc'], [1, 'asc']],
        "columnDefs": [
            { "targets": 6, "searchable": false },
            { "orderable": false, "targets": 3 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colDireccion'
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
                filename: 'Direccion' + "_" + FnJsDate() + "_" + FnJsHour(),
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
                                    text: 'Direccion',
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Direccion'
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
                filename: 'Dirección' + "_" + FnJsDate() + "_" + FnJsHour(),
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
    tablaDireccion.buttons().container().addClass('form-inline');

    for (var contDireccion = 0; contDireccion < data.length; contDireccion++) {
        tablaDireccion.row.add([
            data[contDireccion].IdDireccion,
            data[contDireccion].Direccion,
            data[contDireccion].ObjTipoDireccion.TipoDireccion,
            data[contDireccion].ObjBarrio.Barrio,
            data[contDireccion].ObjBarrio.ObjMunicipio.Municipio,
            data[contDireccion].ObjBarrio.ObjMunicipio.ObjDepartamento.Departamento,
            '<button value="editar" href="#modalNDireccion" data-toggle="modal" title="editar" class="btn btn-warning  btn-editDireccion"><i class="fas fa-pencil-alt"></i> </button>' +
            '<button value="eliminar" href="#modalNDireccion" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteDireccion"><i class="fa fa-trash" ></i> </button>'
        ]
        ).draw(false);
    }
}

$('#lbNDireccion').click(function (e) {
    e.preventDefault();
    FnJsCDireccion();
    EDireccion = true;

    FnJsBlockDireccion();
    FnJSFillDdlDireccionTipoDireccion();
    CRUDDireccion = "C";
    FnJSFillDdlDepartamento();

    VarJsDireccionId = 0;
    VarJsDireccion = "";
    VarJsIdTipoDireccion = 0;
    VarJsIdDepartamento = 0;
    VarJsIdMunicipio = 0;
    VarJsIdBarrio = 0;

});
$(document).on('click', '.btn-editDireccion', function (e) {
    e.preventDefault();
    FnJsUDireccion();
    var dataDireccion = tablaDireccion.row($(this).parents("tr")).data();
    VarJsDireccionId = dataDireccion[0];
    $('#txtNuevoDireccion').val(dataDireccion[1]);
    VarJsDireccion = dataDireccion[1];
    VAlDDLDireccionTipoDireccion = (dataDireccion[2]);
    FnJSFillDdlDireccionTipoDireccion();

    VAlDDLDepartamento = (dataDireccion[5]);
    VAlDDLMunicipio = (dataDireccion[4]);
    VAlDDLBarrio = (dataDireccion[3]);
    FnJSFillDdlDepartamento();

    VarJsIdTipoDireccion = $('#ddlCDireccionTipoDireccion').val();
    VarJsIdDepartamento = $('#ddlCDepartamento').val();
    VarJsIdMunicipio = $('#ddlCMunicipio').val();
    VarJsIdBarrio = $('#ddlCBarrio').val();
    CRUDDireccion = "U";
});
$(document).on('click', '.btn-deleteDireccion', function (e) {
    e.preventDefault();
    FnJsDDireccion();
    EDireccion = false;


    FnJsBlockDireccion();
    var dataDireccion = tablaDireccion.row($(this).parents("tr")).data();
    VarJsDireccionId = dataDireccion[0];
    $('#txtNuevoDireccion').val(dataDireccion[1]);
    VarJsDireccion = dataDireccion[1];
    VAlDDLDireccionTipoDireccion = (dataDireccion[2]);
    FnJSFillDdlDireccionTipoDireccion();

    VAlDDLDepartamento = (dataDireccion[5]);
    VAlDDLMunicipio = (dataDireccion[4]);
    VAlDDLBarrio = (dataDireccion[3]);
    FnJSFillDdlDepartamento();

    CRUDDireccion = "D";
});

function FnJsCDireccion() {
    $('#lblexistenuevoDireccion').text("");

    $("#DivModBorDireccion").removeAttr("class");
    $("#DivModBorDireccion").attr('class', 'modal-content border-success');

    $("#DivModHeaDireccion").removeAttr("class");
    $("#DivModHeaDireccion").attr('class', 'modal-header bg-success');

    $('#H4ModTitDireccion').text('Nuevo Direccion');

    $("#btnNueDireccion").removeAttr("class");
    $("#btnNueDireccion").attr('class', 'btn btn-success pull-right');
    $("#btnNueDireccion i").removeAttr("class");
    $("#btnNueDireccion i").attr("class", "fa fa-save fa-2x");

    $("#ddlCDireccionTipoDireccion").removeAttr("class");
    $("#ddlCDireccionTipoDireccion").attr("class", "form-control border-success");
    $("#ddlCDepartamento").removeAttr("class");
    $("#ddlCDepartamento").attr("class", "form-control border-success");
    $("#ddlCMunicipio").removeAttr("class");
    $("#ddlCMunicipio").attr("class", "form-control border-success");

    $('#ddlCMunicipio').append($("<option> </option>").val("0").html("Seleccionar Departamento antes..."));
    $('#ddlCBarrio').append($("<option> </option>").val("0").html("Seleccionar Municipio antes..."));

    $("#ddlCBarrio").removeAttr("class");
    $("#ddlCBarrio").attr("class", "form-control border-success");
    $("#txtNuevoDireccion").attr('disabled', false);
    $('#ddlCDireccionTipoDireccion').attr('disabled', false);
    $("#ddlCDepartamento").attr('disabled', false);
    $("#ddlCMunicipio").attr('disabled', false);
    $("#ddlCBarrio").attr('disabled', false);

    $('#' + ModCDireccion[0].id + ' :text').val("");
}
function FnJsUDireccion() {
    $('#lblexistenuevoDireccion').text("");

    $("#DivModBorDireccion").removeAttr("class");
    $("#DivModBorDireccion").attr('class', 'modal-content border-warning');

    $("#DivModHeaDireccion").removeAttr("class");
    $("#DivModHeaDireccion").attr('class', 'modal-header bg-warning');

    $('#H4ModTitDireccion').text('Editar Direccion');

    $("#btnNueDireccion").removeAttr("class");
    $("#btnNueDireccion").attr('class', 'btn btn-warning pull-right');
    $("#btnNueDireccion i").removeAttr("class");
    $("#btnNueDireccion i").attr("class", "fa fa-save fa-2x");

    $("#ddlCDireccionTipoDireccion").removeAttr("class");
    $("#ddlCDireccionTipoDireccion").attr("class", "form-control border-warning");
    $("#ddlCDepartamento").removeAttr("class");
    $("#ddlCDepartamento").attr("class", "form-control border-warning");
    $("#ddlCMunicipio").removeAttr("class");
    $("#ddlCMunicipio").attr("class", "form-control border-warning");
    $("#ddlCBarrio").removeAttr("class");
    $("#ddlCBarrio").attr("class", "form-control border-warning");
    $("#txtNuevoDireccion").attr('disabled', false);
    $('#ddlCDireccionTipoDireccion').attr('disabled', false);
    $("#ddlCDepartamento").attr('disabled', false);
    $("#ddlCMunicipio").attr('disabled', false);
    $("#ddlCBarrio").attr('disabled', false);

    $('#' + ModCDireccion[0].id + ' :text').val("");
}
function FnJsDDireccion() {
    $('#lblexistenuevoDireccion').text("");

    $("#DivModBorDireccion").removeAttr("class");

    $("#DivModBorDireccion").attr('class', 'modal-content border-danger');

    $("#DivModHeaDireccion").removeAttr("class");
    $("#DivModHeaDireccion").attr('class', 'modal-header bg-danger');

    $('#H4ModTitDireccion').text('Eliminar Direccion');

    $("#btnNueDireccion").removeAttr("class");
    $("#btnNueDireccion").attr('class', 'btn btn-danger pull-right');
    $("#btnNueDireccion i").removeAttr("class");
    $("#btnNueDireccion i").attr("class", "fa fa-trash fa-2x");

    $("#ddlCDireccionTipoDireccion").removeAttr("class");
    $("#ddlCDireccionTipoDireccion").attr("class", "form-control border-danger");
    $("#ddlCDepartamento").removeAttr("class");
    $("#ddlCDepartamento").attr("class", "form-control border-danger");
    $("#ddlCMunicipio").removeAttr("class");
    $("#ddlCMunicipio").attr("class", "form-control border-danger");
    $("#ddlCBarrio").removeAttr("class");
    $("#ddlCBarrio").attr("class", "form-control border-danger");
    $("#txtNuevoDireccion").attr('disabled', true);
    $('#ddlCDireccionTipoDireccion').attr('disabled', true);
    $('#ddlCDepartamento').attr('disabled', true);
    $('#ddlCMunicipio').attr('disabled', true);
    $('#ddlCBarrio').attr('disabled', true);

    $('#' + ModCDireccion[0].id + ' :text').val("");
}


function FnJsBlockDireccion() {

    if (EDireccion == true) {
        $("#btnNueDireccion").fadeOut("fast");
        $("#btnNueDireccion").attr('disabled', true);
    }
    else if (EDireccion == false) {
        $("#btnNueDireccion").fadeIn("slow");
        $("#btnNueDireccion").attr('disabled', false);
    }
}

$('#btnNueDireccion').click(function (e) {
    e.preventDefault();
    if (formDireccion.checkValidity()) {
        switch (CRUDDireccion) {
            case "C":
                FnJsAjaxCDireccion();
                break;
            case "U":
                FnJsAjaxUDireccion();
                break;
            case "D":
                FnJsAjaxDDireccion();
                break;
            default:
                console.log("Error en cud Direccion");
        }
    }
});

function FnJsAjaxCDireccion() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnCDireccionV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            Direccion: VarJsDireccion,
            IdTipoDireccion: VarJsIdTipoDireccion,
            IdPersona: VarJsIdPersona,
            IdBarrio: VarJsIdBarrio
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Direccion Agregado");
            }
            else {
                CRUDDireccion = "error"
                console.log("No se pudo agregar Tipo de indentificación");
            }
            FnAlertaDireccion();
        }
    });
}
function FnJsAjaxUDireccion() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnUDireccionV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdDireccion: VarJsDireccionId,
            Direccion: VarJsDireccion,
            IdTipoDireccion: VarJsIdTipoDireccion,
            IdBarrio: VarJsIdBarrio

        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Direccion Actualizado");
            }
            else {
                CRUDDireccion = "error"
                console.log("no se pudo actualizar");
            }
            FnAlertaDireccion();
        }
    });
}
function FnJsAjaxDDireccion() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnDDireccionV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdDireccion: VarJsDireccionId
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Dirección Eliminado");
            }
            else {
                CRUDDireccion = "error"
                console.log("No se pudo Eliminar Dirección");
            }
            FnAlertaDireccion();
        }
    });
}

function FnJsAjaxEDireccion() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnEDireccionV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdDireccion: VarJsDireccionId,
            Direccion: VarJsDireccion,
            IdTipoDireccion: VarJsIdTipoDireccion,
            IdPersona: VarJsIdPersona
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                EDireccion = true;
                $('#lblexistenuevoDireccion').text("Existe Dirección");
                FnJsBlockDireccion();

            }
            else {
                EDireccion = false;
                $('#lblexistenuevoDireccion').text("");
                FnJsBlockDireccion();
            }
        }
    });
}

function VerificarExisteDireccion() {
    if ($('#txtNuevoDireccion').val().length >= 3 && $('#ddlCDireccionTipoDireccion').val() > 0 && $('#ddlCBarrio').val() > 0) {
        return true;
    }
    else {
        return false;
    }
}

$('#txtNuevoDireccion').keyup(function (e) {
    VarJsDireccion = $(this).val();
    if (VerificarExisteDireccion()) {
        FnJsAjaxEDireccion();
    }
});

$('#ddlCDireccionTipoDireccion').change(function (e) {
    VarJsIdTipoDireccion = $('#ddlCDireccionTipoDireccion').val();
    if (VerificarExisteDireccion()) {
        FnJsAjaxEDireccion();
    }
});

$('#ddlCDepartamento').change(function (e) {
    VarJsIdDepartamento = $('#ddlCDepartamento').val();
    FnJSFillDdlMunicipio();
});

$('#ddlCMunicipio').change(function (e) {
    VarJsIdMunicipio = $('#ddlCMunicipio').val();
    FnJSFillDdlBarrio();
});

$('#ddlCBarrio').change(function (e) {
    VarJsIdBarrio = $('#ddlCBarrio').val();
    if (VerificarExisteDireccion()) {
        FnJsAjaxEDireccion();
    }
});

function FnJSFillDdlDireccionTipoDireccion() {
    $('#ddlCDireccionTipoDireccion').empty();
    $.ajax({
        type: "POST",
        url: "/modulo7/VstGenerales.aspx/FnRTipoDireccionV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLDireccionTipoDireccion == "null") {
                $('#ddlCDireccionTipoDireccion').append($("<option> </option>").val("0").html("Seleccionar Tipo Dirección"));
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLDireccionTipoDireccion == value.TipoDireccion) {
                        $('#ddlCDireccionTipoDireccion').append($("<option> </option>").val(value.IdTipoDireccion).html(value.TipoDireccion));
                        VarJsIdTipoDireccion = value.IdTipoDireccion;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCDireccionTipoDireccion').append($("<option> </option>").val(value.IdTipoDireccion).html(value.TipoDireccion));
            });
            VAlDDLDireccionTipoDireccion = "null";
        }
    });
}
function FnJSFillDdlDepartamento() {
    $('#ddlCDepartamento').empty();
    $.ajax({
        type: "POST",
        url: "/modulo7/VstGenerales.aspx/FnRDepartamentoV",
        async: false,
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLDepartamento == "null") {
                $('#ddlCDepartamento').append($("<option> </option>").val("0").html("Seleccionar Departamento"));
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLDepartamento == value.Departamento) {
                        $('#ddlCDepartamento').append($("<option> </option>").val(value.IdDepartamento).html(value.Departamento));
                        VarJsIdDepartamento = value.IdDepartamento;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCDepartamento').append($("<option> </option>").val(value.IdDepartamento).html(value.Departamento));
            });
            VAlDDLDepartamento = "null";
        }
    });

    FnJSFillDdlMunicipio();

}


function FnJSFillDdlMunicipio() {
    $('#ddlCMunicipio').empty();
    $.ajax({
        url: "/modulo7/VstGenerales.aspx/FnRMunicipioV",
        async: false,
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdDepartamento: VarJsIdDepartamento
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLMunicipio == "null") {
                $('#ddlCMunicipio').append($("<option> </option>").val("0").html("Seleccionar Municipio"));
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLMunicipio == value.Municipio) {
                        $('#ddlCMunicipio').append($("<option> </option>").val(value.IdMunicipio).html(value.Municipio));
                        VarJsIdMunicipio = value.IdMunicipio;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCMunicipio').append($("<option> </option>").val(value.IdMunicipio).html(value.Municipio));
            });
            VAlDDLMunicipio = "null";
        }
    });

    FnJSFillDdlBarrio();
}

function FnJSFillDdlBarrio() {
    $('#ddlCBarrio').empty();
    $.ajax({
        url: "/modulo7/VstGenerales.aspx/FnRBarrioV",
        async: false,
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdMunicipio: VarJsIdMunicipio
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLBarrio == "null") {
                $('#ddlCBarrio').append($("<option> </option>").val("0").html("Seleccionar Barrio"));
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLBarrio == value.Barrio) {
                        $('#ddlCBarrio').append($("<option> </option>").val(value.IdBarrio).html(value.Barrio));
                        VarJsIdBarrio = value.IdBarrio;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCBarrio').append($("<option> </option>").val(value.IdBarrio).html(value.Barrio));
            });
            VAlDDLBarrio = "null";
        }
    });
}

function FnAlertaDireccion() {

    switch (CRUDDireccion) {
        case "C":
            VarJsColorAlertDireccion = "bg-success";
            VarJsTextoAlertDireccion = "Creado";
            break;
        case "U":
            VarJsColorAlertDireccion = "bg-warning";
            VarJsTextoAlertDireccion = "Actualizado";
            break;
        case "D":
            VarJsColorAlertDireccion = "bg-danger";
            VarJsTextoAlertDireccion = "Eliminado";
            break;
        case "Error":
            VarJsColorAlertDireccion = "bg-secondary";
            VarJsTextoAlertDireccion = "No se pudo realizar la operación";
            break;
        default:
            console.log("Error CUD Dirección Alert");
    }

    $('.bd-example-modal-sm .modal-content').addClass(VarJsColorAlertDireccion);
    $('.bd-example-modal-sm h5').text(VarJsTextoAlertDireccion);
    $('.bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.bd-example-modal-sm').modal('hide');
        $('.bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertDireccion);
    }, 1500);
    console.log($("#secciontblDireccion.show").length)
    if ($("#secciontblDireccion.show").length > 0) {
        FnJsAjaxRDireccion();
    }
    $("#modalNDireccion").modal("toggle");
}