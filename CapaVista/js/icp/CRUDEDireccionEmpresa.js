
var tablaDireccionEmpresa;
var ModCDireccionEmpresa = $('#modalNDireccionEmpresa');

var VarJsDireccionEmpresaId = 0;
var VarJsDireccionEmpresa = "";
var VarJsIdTipoDireccionEmpresa = 0;
var VarJsIdBarrioEmpresa = 0;
var VarJsIdMunicipioEmpresa = 0;
var VarJsIdDepartamentoEmpresa = 0;
var VarJsIdEmpresa = 0;

var VAlDDLDireccionEmpresaTipoDireccionEmpresa = "null";
var VAlDDLBarrioEmpresa = "null";
var VAlDDLMunicipioEmpresa = "null";
var VAlDDLDepartamentoEmpresa = "null";

var formDireccionEmpresa = document.querySelector('#form1');

CRUDDireccionEmpresa = "";

var VarJsColorAlertDireccionEmpresa = "";
var VarJsTextoAlertDireccionEmpresa = "";

var EDireccionEmpresa = true;

$('#tblEmpresa tbody').on('click', 'tr', function () {
    var tablaEmpresa = $('#tblEmpresa').DataTable();
    VarJsIdEmpresa = tablaEmpresa.row(this).data()[0];
    FnJsAjaxRDireccionEmpresa();
    FnJSFillDdlDireccionEmpresaTipoDireccionEmpresa();
    FnJSFillDdlDepartamentoEmpresa();
    $("#DatosEmpresa").attr('class', 'row collapse show');
})
function FnJsAjaxRDireccionEmpresa() {
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnRDireccionEmpresaV",
        data: JSON.stringify({
            IdEmpresa: VarJsIdEmpresa
        }),
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowDireccionEmpresa(data.d);
        }
    }
    );
}
function AddrowDireccionEmpresa(data) {

    $('#tblDireccionEmpresa').DataTable().clear().destroy();

    tablaDireccionEmpresa = $("#tblDireccionEmpresa").DataTable({
        "retrieve": true,
        dom: 'Bfrtip',
        "order": [1, 'asc'],
        "columnDefs": [
            { "targets": 6, "searchable": false },
            { "orderable": false, "targets": 6 }
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
                filename: 'Dirección' + "_" + FnJsDate() + "_" + FnJsHour(),
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
                                    text: 'Dirección', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Dirección' //tttt
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
                filename: 'Dirección' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
                text: '<i class="far fa-file-excel fa-2x"></i>',
                className: 'btn btn-success d-none d-lg-block',
                exportOptions: {
                    columns: [':not(:eq(6)):visible'] // index de controles xxxx para no mostrar inicia en 0
                },
                titleAttr: 'Excel',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')

                }

            }
        ],
        "language": FnJsEspTbl()
    });
    tablaDireccionEmpresa.buttons().container().addClass('form-inline');

    for (var contDireccionEmpresa = 0; contDireccionEmpresa < data.length; contDireccionEmpresa++) {
        tablaDireccionEmpresa.row.add([
            data[contDireccionEmpresa].IdDireccion,
            data[contDireccionEmpresa].Direccion,
            data[contDireccionEmpresa].ObjTipoDireccion.TipoDireccion,
            data[contDireccionEmpresa].ObjBarrio.Barrio,
            data[contDireccionEmpresa].ObjBarrio.ObjMunicipio.Municipio,
            data[contDireccionEmpresa].ObjBarrio.ObjMunicipio.ObjDepartamento.Departamento,
            '<button value="editar" href="#modalNDireccionEmpresa" data-toggle="modal" title="editar" class="btn btn-warning  btn-editDireccionEmpresa"><i class="fas fa-pencil-alt"></i> </button>' +
            '<button value="eliminar" href="#modalNDireccionEmpresa" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteDireccionEmpresa"><i class="fa fa-trash" ></i> </button>'
        ]
        ).draw(false);
    }
}

$('#lbNDireccionEmpresa').click(function (e) {
    e.preventDefault();
    FnJsCDireccionEmpresa();
    EDireccionEmpresa = true;

    FnJsBlockDireccionEmpresa();
    FnJSFillDdlDireccionEmpresaTipoDireccionEmpresa();
    FnJSFillDdlDepartamentoEmpresa();
    CRUDDireccionEmpresa = "C";

    VarJsDireccionEmpresaId = 0;
    VarJsDireccionEmpresa = "";
    VarJsIdTipoDireccionEmpresa = 0;
    VarJsIdBarrioEmpresa = 0;
    VarJsIdMunicipioEmpresa = 0;
    VarJsIdDepartamentoEmpresa = 0;

});
$(document).on('click', '.btn-editDireccionEmpresa', function (e) {
    e.preventDefault();
    FnJsUDireccionEmpresa();
    var dataDireccionEmpresa = tablaDireccionEmpresa.row($(this).parents("tr")).data();
    VarJsDireccionEmpresaId = dataDireccionEmpresa[0];
    $('#txtNuevoDireccionEmpresa').val(dataDireccionEmpresa[1]);
    VarJsDireccionEmpresa = dataDireccionEmpresa[1];
    VAlDDLDireccionEmpresaTipoDireccionEmpresa = (dataDireccionEmpresa[2]);
    FnJSFillDdlDireccionEmpresaTipoDireccionEmpresa();
    VarJsIdTipoDireccionEmpresa = $('#ddlCDireccionEmpresaTipoDireccionEmpresa').val();

    VAlDDLDepartamentoEmpresa = (dataDireccionEmpresa[5]);
    FnJSFillDdlDepartamentoEmpresa();
    VarJsIdDepartamentoEmpresa = $('#ddlCDepartamentoEmpresa').val();

    VAlDDLMunicipioEmpresa = (dataDireccionEmpresa[4]);
    FnJSFillDdlMunicipioEmpresa();
    VarJsIdMunicipioEmpresa = $('#ddlCMunicipioEmpresa').val();

    VAlDDLBarrioEmpresa = (dataDireccionEmpresa[3]);
    FnJSFillDdlBarrioEmpresa();
    VarJsIdBarrioEmpresa = $('#ddlCBarrioEmpresa').val();

    CRUDDireccionEmpresa = "U";
});
$(document).on('click', '.btn-deleteDireccionEmpresa', function (e) {
    e.preventDefault();
    FnJsDDireccionEmpresa();
    EDireccionEmpresa = false;

    FnJsBlockDireccionEmpresa();
    var dataDireccionEmpresa = tablaDireccionEmpresa.row($(this).parents("tr")).data();
    VarJsDireccionEmpresaId = dataDireccionEmpresa[0];
    $('#txtNuevoDireccionEmpresa').val(dataDireccionEmpresa[1]);
    VarJsDireccionEmpresa = dataDireccionEmpresa[1];

    VAlDDLDireccionEmpresaTipoDireccionEmpresa = (dataDireccionEmpresa[2]);
    FnJSFillDdlDireccionEmpresaTipoDireccionEmpresa();

    VAlDDLDepartamentoEmpresa = (dataDireccionEmpresa[5]);
    FnJSFillDdlDepartamentoEmpresa();

    VAlDDLMunicipioEmpresa = (dataDireccionEmpresa[4]);
    FnJSFillDdlMunicipioEmpresa();

    VAlDDLBarrioEmpresa = (dataDireccionEmpresa[3]);
    FnJSFillDdlBarrioEmpresa();

    CRUDDireccionEmpresa = "D";
});
function FnJsCDireccionEmpresa() {

    $('#lblexistenuevoDireccionEmpresa').text("");

    $("#DivModBorDireccionEmpresa").removeAttr("class");
    $("#DivModBorDireccionEmpresa").attr('class', 'modal-content border-success');

    $("#DivModHeaDireccionEmpresa").removeAttr("class");
    $("#DivModHeaDireccionEmpresa").attr('class', 'modal-header bg-success');

    $('#H4ModTitDireccionEmpresa').text('Nuevo Dirección');

    $("#btnNueDireccionEmpresa").removeAttr("class");
    $("#btnNueDireccionEmpresa").attr('class', 'btn btn-success pull-right');
    $("#btnNueDireccionEmpresa i").removeAttr("class");
    $("#btnNueDireccionEmpresa i").attr("class", "fa fa-save fa-2x");

    $("#ddlCDireccionEmpresaTipoDireccionEmpresa").removeAttr("class");
    $("#ddlCDireccionEmpresaTipoDireccionEmpresa").attr("class", "form-control border-success");

    $("#ddlCDepartamentoEmpresa").removeAttr("class");
    $("#ddlCDepartamentoEmpresa").attr("class", "form-control border-success");

    $("#ddlCMunicipioEmpresa").removeAttr("class");
    $("#ddlCMunicipioEmpresa").attr("class", "form-control border-success");

    $("#ddlCBarrioEmpresa").removeAttr("class");
    $("#ddlCBarrioEmpresa").attr("class", "form-control border-success");

    $("#txtNuevoDireccionEmpresa").attr('disabled', false);

    $('#ddlCDireccionEmpresaTipoDireccionEmpresa').attr('disabled', false);
    $('#ddlCDepartamentoEmpresa').attr('disabled', false);
    $('#ddlCMunicipioEmpresa').attr('disabled', false);
    $('#ddlCBarrioEmpresa').attr('disabled', false);

    $('#' + ModCDireccionEmpresa[0].id + ' :text').val("");
}
function FnJsUDireccionEmpresa() {

    $('#lblexistenuevoDireccionEmpresa').text("");

    $("#DivModBorDireccionEmpresa").removeAttr("class");
    $("#DivModBorDireccionEmpresa").attr('class', 'modal-content border-warning');

    $("#DivModHeaDireccionEmpresa").removeAttr("class");
    $("#DivModHeaDireccionEmpresa").attr('class', 'modal-header bg-warning');

    $('#H4ModTitDireccionEmpresa').text('Editar Dirección');

    $("#btnNueDireccionEmpresa").removeAttr("class");
    $("#btnNueDireccionEmpresa").attr('class', 'btn btn-warning pull-right');
    $("#btnNueDireccionEmpresa i").removeAttr("class");
    $("#btnNueDireccionEmpresa i").attr("class", "fa fa-save fa-2x");

    $("#ddlCDireccionEmpresaTipoDireccionEmpresa").removeAttr("class");
    $("#ddlCDireccionEmpresaTipoDireccionEmpresa").attr("class", "form-control border-warning");

    $("#ddlCDepartamentoEmpresa").removeAttr("class");
    $("#ddlCDepartamentoEmpresa").attr("class", "form-control border-warning");

    $("#ddlCMunicipioEmpresa").removeAttr("class");
    $("#ddlCMunicipioEmpresa").attr("class", "form-control border-warning");

    $("#ddlCBarrioEmpresa").removeAttr("class");
    $("#ddlCBarrioEmpresa").attr("class", "form-control border-warning");

    $("#txtNuevoDireccionEmpresa").attr('disabled', false);

    $('#ddlCDireccionEmpresaTipoDireccionEmpresa').attr('disabled', false);
    $('#ddlCDepartamentoEmpresa').attr('disabled', false);
    $('#ddlCMunicipioEmpresa').attr('disabled', false);
    $('#ddlCBarrioEmpresa').attr('disabled', false);


    $('#' + ModCDireccionEmpresa[0].id + ' :text').val("");
}
function FnJsDDireccionEmpresa() {

    $('#lblexistenuevoDireccionEmpresa').text("");

    $("#DivModBorDireccionEmpresa").removeAttr("class");
    $("#DivModBorDireccionEmpresa").attr('class', 'modal-content border-danger');

    $("#DivModHeaDireccionEmpresa").removeAttr("class");
    $("#DivModHeaDireccionEmpresa").attr('class', 'modal-header bg-danger');

    $('#H4ModTitDireccionEmpresa').text('Eliminar Dirección');

    $("#btnNueDireccionEmpresa").removeAttr("class");
    $("#btnNueDireccionEmpresa").attr('class', 'btn btn-danger pull-right');
    $("#btnNueDireccionEmpresa i").removeAttr("class");
    $("#btnNueDireccionEmpresa i").attr("class", "fa fa-trash fa-2x");


    $("#ddlCDireccionEmpresaTipoDireccionEmpresa").removeAttr("class");
    $("#ddlCDireccionEmpresaTipoDireccionEmpresa").attr("class", "form-control border-danger");

    $("#ddlCDepartamentoEmpresa").removeAttr("class");
    $("#ddlCDepartamentoEmpresa").attr("class", "form-control border-danger");

    $("#ddlCMunicipioEmpresa").removeAttr("class");
    $("#ddlCMunicipioEmpresa").attr("class", "form-control border-danger");

    $("#ddlCBarrioEmpresa").removeAttr("class");
    $("#ddlCBarrioEmpresa").attr("class", "form-control border-danger");

    $("#txtNuevoDireccionEmpresa").attr('disabled', true);

    $('#ddlCDireccionEmpresaTipoDireccionEmpresa').attr('disabled', true);
    $('#ddlCDepartamentoEmpresa').attr('disabled', true);
    $('#ddlCMunicipioEmpresa').attr('disabled', true);
    $('#ddlCBarrioEmpresa').attr('disabled', true);

    $('#' + ModCDireccionEmpresa[0].id + ' :text').val("");
}

function FnJsBlockDireccionEmpresa() {
    if (EDireccionEmpresa == true) {
        $("#btnNueDireccionEmpresa").fadeOut("fast");
        $("#btnNueDireccionEmpresa").attr('disabled', true);
    }
    else if (EDireccionEmpresa == false) {
        $("#btnNueDireccionEmpresa").fadeIn("slow");
        $("#btnNueDireccionEmpresa").attr('disabled', false);
    }
}

$('#btnNueDireccionEmpresa').click(function (e) {
    e.preventDefault();
    if (formDireccionEmpresa.checkValidity()) {
        switch (CRUDDireccionEmpresa) {
            case "C":
                FnJsAjaxCDireccionEmpresa();
                break;
            case "U":
                FnJsAjaxUDireccionEmpresa();
                break;
            case "D":
                FnJsAjaxDDireccionEmpresa();
                break;
            default:
                console.log("Error en cud Dirección");
        }
    }
    console.log(formDireccionEmpresa.checkValidity());
});

function FnJsAjaxCDireccionEmpresa() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnCDireccionEmpresaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            Direccion: VarJsDireccionEmpresa,
            IdTipoDireccion: VarJsIdTipoDireccionEmpresa,
            IdBarrio: VarJsIdBarrioEmpresa,
            IdEmpresa: VarJsIdEmpresa
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Dirección Agregado");
            }
            else {
                CRUDDireccionEmpresa = "error"
                console.log("No se pudo agregar Dirección");
            }
            FnAlertaDireccionEmpresa();
        }
    });//ajax fin
}
function FnJsAjaxUDireccionEmpresa() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnUDireccionV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdDireccion: VarJsDireccionEmpresaId,
            Direccion: VarJsDireccionEmpresa,
            IdTipoDireccion: VarJsIdTipoDireccionEmpresa,
            IdBarrio: VarJsIdBarrioEmpresa
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Dirección Actualizado");
            }
            else {
                CRUDDireccionEmpresa = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaDireccionEmpresa();
        }
    });
}
function FnJsAjaxDDireccionEmpresa() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnDDireccionV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdDireccion: VarJsDireccionEmpresaId
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
                CRUDDireccionEmpresa = "error"
                console.log("No se pudo Eliminar Dirección");
            }
            FnAlertaDireccionEmpresa();
        }
    });
}

function FnJsAjaxEDireccionEmpresa() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnEDireccionEmpresaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdDireccion: VarJsDireccionEmpresaId,
            Direccion: VarJsDireccionEmpresa,
            IdTipoDireccion: VarJsIdTipoDireccionEmpresa,
            IdEmpresa: VarJsIdEmpresa
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                EDireccionEmpresa = true;
                $('#lblexistenuevoDireccionEmpresa').text("Existe Dirección");
                FnJsBlockDireccionEmpresa();
            }
            else {
                EDireccionEmpresa = false;
                $('#lblexistenuevoDireccionEmpresa').text("");
                FnJsBlockDireccionEmpresa();
            }
        }
    });
}
function VerificarExisteDireccionEmpresa() {
    if ($('#txtNuevoDireccionEmpresa').val().length >= 3 && $('#ddlCDireccionEmpresaTipoDireccionEmpresa').val() > 0 && $('#ddlCBarrioEmpresa').val() > 0) {
        return true;
    }
    else {
        return false;
    }
}

$('#txtNuevoDireccionEmpresa').keyup(function (e) {
    VarJsDireccionEmpresa = $(this).val();
    if (VerificarExisteDireccionEmpresa()) {
        FnJsAjaxEDireccionEmpresa();
    }
});

$('#ddlCDireccionEmpresaTipoDireccionEmpresa').change(function (e) {
    VarJsIdTipoDireccionEmpresa = $('#ddlCDireccionEmpresaTipoDireccionEmpresa').val();
    if (VerificarExisteDireccionEmpresa()) {
        FnJsAjaxEDireccionEmpresa();
    }
});

$('#ddlCDepartamentoEmpresa').change(function (e) {
    VarJsIdDepartamentoEmpresa = $('#ddlCDepartamentoEmpresa').val();
    FnJSFillDdlMunicipioEmpresa();
});
$('#ddlCMunicipioEmpresa').change(function (e) {
    VarJsIdMunicipioEmpresa = $('#ddlCMunicipioEmpresa').val();
    FnJSFillDdlBarrioEmpresa();
});
$('#ddlCBarrioEmpresa').change(function (e) {
    VarJsIdBarrioEmpresa = $('#ddlCBarrioEmpresa').val();
    if (VerificarExisteDireccionEmpresa()) {
        FnJsAjaxEDireccionEmpresa();
    }
});

function FnJSFillDdlDireccionEmpresaTipoDireccionEmpresa() {
    $('#ddlCDireccionEmpresaTipoDireccionEmpresa').empty();
    $.ajax({
        type: "POST",
        url: "/modulo7/VstGenerales.aspx/FnRTipoDireccionV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLDireccionEmpresaTipoDireccionEmpresa == "null") {
                $('#ddlCDireccionEmpresaTipoDireccionEmpresa').append($("<option> </option>").val("0").html("Seleccionar Tipo Dirección"));
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLDireccionEmpresaTipoDireccionEmpresa == value.TipoDireccion) {
                        $('#ddlCDireccionEmpresaTipoDireccionEmpresa').append($("<option> </option>").val(value.IdTipoDireccion).html(value.TipoDireccion));
                        VarJsIdTipoDireccionEmpresa = value.IdTipoDireccion;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCDireccionEmpresaTipoDireccionEmpresa').append($("<option> </option>").val(value.IdTipoDireccion).html(value.TipoDireccion));
            });
            VAlDDLDireccionEmpresaTipoDireccionEmpresa = "null";
        }
    });
}

function FnJSFillDdlDepartamentoEmpresa() {
    $('#ddlCDepartamentoEmpresa').empty();   
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
            if (VAlDDLDepartamentoEmpresa == "null") {
                $('#ddlCDepartamentoEmpresa').append($("<option> </option>").val("0").html("Seleccionar Departamento"));  // xxxx id val html            
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLDepartamentoEmpresa == value.Departamento) {
                        $('#ddlCDepartamentoEmpresa').append($("<option> </option>").val(value.IdDepartamento).html(value.Departamento));  // xxxx id texto
                        VarJsIdDepartamentoEmpresa = value.IdDepartamento;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCDepartamentoEmpresa').append($("<option> </option>").val(value.IdDepartamento).html(value.Departamento)); // id en un val y en html el nombre
            });
            VAlDDLDepartamentoEmpresa = "null";
        }
    });

    FnJSFillDdlMunicipioEmpresa();

}

function FnJSFillDdlMunicipioEmpresa() {
    $('#ddlCMunicipioEmpresa').empty(); // xxxx id
    $.ajax({
        url: "/modulo7/VstGenerales.aspx/FnRMunicipioV", // xxxx
        async: false,
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdDepartamento: VarJsIdDepartamentoEmpresa
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLMunicipioEmpresa == "null") {
                $('#ddlCMunicipioEmpresa').append($("<option> </option>").val("0").html("Seleccionar Municipio"));  // xxxx id val html            
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLMunicipioEmpresa == value.Municipio) {
                        $('#ddlCMunicipioEmpresa').append($("<option> </option>").val(value.IdMunicipio).html(value.Municipio));  // xxxx id texto
                        VarJsIdMunicipioEmpresa = value.IdMunicipio;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCMunicipioEmpresa').append($("<option> </option>").val(value.IdMunicipio).html(value.Municipio)); // id en un val y en html el nombre
            });
            VAlDDLMunicipioEmpresa = "null";
        }
    });

    FnJSFillDdlBarrioEmpresa();
}

function FnJSFillDdlBarrioEmpresa() {
    $('#ddlCBarrioEmpresa').empty(); // xxxx id
    $.ajax({
        url: "/modulo7/VstGenerales.aspx/FnRBarrioV", // xxxx
        async: false,
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdMunicipio: VarJsIdMunicipioEmpresa
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLBarrioEmpresa == "null") {
                $('#ddlCBarrioEmpresa').append($("<option> </option>").val("0").html("Seleccionar Barrio"));  // xxxx id val html            
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLBarrioEmpresa == value.Barrio) {
                        $('#ddlCBarrioEmpresa').append($("<option> </option>").val(value.IdBarrio).html(value.Barrio));  // xxxx id texto
                        VarJsIdBarrioEmpresa = value.IdBarrio;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCBarrioEmpresa').append($("<option> </option>").val(value.IdBarrio).html(value.Barrio)); // id en un val y en html el nombre
            });
            VAlDDLBarrioEmpresa = "null";
        }
    });
}


function FnAlertaDireccionEmpresa() {

    switch (CRUDDireccionEmpresa) {
        case "C":
            VarJsColorAlertDireccionEmpresa = "bg-success";
            VarJsTextoAlertDireccionEmpresa = "Creado";
            break;
        case "U":
            VarJsColorAlertDireccionEmpresa = "bg-warning";
            VarJsTextoAlertDireccionEmpresa = "Actualizado";
            break;
        case "D":
            VarJsColorAlertDireccionEmpresa = "bg-danger";
            VarJsTextoAlertDireccionEmpresa = "Eliminado";
            break;
        case "Error":
            VarJsColorAlertDireccionEmpresa = "bg-secondary";
            VarJsTextoAlertDireccionEmpresa = "No se pudo realizar la operación";
            break;
        default:
            console.log("Error CUD Dirección Alert")
    }
    //alerta
    $('.bd-example-modal-sm .modal-content').addClass(VarJsColorAlertDireccionEmpresa);
    $('.bd-example-modal-sm h5').text(VarJsTextoAlertDireccionEmpresa);
    $('.bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.bd-example-modal-sm').modal('hide');
        $('.bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertDireccionEmpresa);
    }, 1500);
    FnJsAjaxRDireccionEmpresa();
    $("#modalNDireccionEmpresa").modal("toggle");
}