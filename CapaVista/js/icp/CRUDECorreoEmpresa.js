
var tablaCorreoEmpresa;
var ModCCorreoEmpresa = $('#modalNCorreoEmpresa');

var VarJsCorreoEmpresaId = 0;
var VarJsCorreoEmpresa = "";
var VarJsIdTipoCorreoEmpresa = 0;
var VarJsIdEmpresa = 0;

var VAlDDLCorreoEmpresaTipoCorreoEmpresa = "null";

var formCorreoEmpresa = document.querySelector('#form1');

CRUDCorreoEmpresa = "";

var VarJsColorAlertCorreoEmpresa = "";
var VarJsTextoAlertCorreoEmpresa = "";

var ECorreoEmpresa = true;

$('#tblEmpresa tbody').on('click', 'tr', function () {
    var tablaEmpresa = $('#tblEmpresa').DataTable();
    VarJsIdEmpresa = tablaEmpresa.row(this).data()[0];
    FnJsAjaxRCorreoEmpresa();
    FnJSFillDdlCorreoEmpresaTipoCorreoEmpresa();
    $("#DatosEmpresa").attr('class', 'row collapse show');
})
function FnJsAjaxRCorreoEmpresa() {
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnRCorreoEmpresaV",
        data: JSON.stringify({
            IdEmpresa: VarJsIdEmpresa
        }),
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowCorreoEmpresa(data.d);
        }
    }
    );
}
function AddrowCorreoEmpresa(data) {

    $('#tblCorreoEmpresa').DataTable().clear().destroy();

    tablaCorreoEmpresa = $("#tblCorreoEmpresa").DataTable({
        "retrieve": true,
        dom: 'Bfrtip',
        "order": [[2, 'asc'], [1, 'asc']],
        "columnDefs": [
            { "targets": 3, "searchable": false },
            { "orderable": false, "targets": 3 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colCorreo'
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
                filename: 'Correo' + "_" + FnJsDate() + "_" + FnJsHour(),
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
                                    text: 'Correo', 
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Correo' 
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
                filename: 'Correo' + "_" + FnJsDate() + "_" + FnJsHour(), 
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
    tablaCorreoEmpresa.buttons().container().addClass('form-inline');

    for (var contCorreoEmpresa = 0; contCorreoEmpresa < data.length; contCorreoEmpresa++) {
        tablaCorreoEmpresa.row.add([
            data[contCorreoEmpresa].IdCorreo,
            data[contCorreoEmpresa].Correo,
            data[contCorreoEmpresa].ObjTipoCorreo.TipoCorreo,
            '<button value="editar" href="#modalNCorreoEmpresa" data-toggle="modal" title="editar" class="btn btn-warning  btn-editCorreoEmpresa"><i class="fas fa-pencil-alt"></i> </button>' +
            '<button value="eliminar" href="#modalNCorreoEmpresa" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteCorreoEmpresa"><i class="fa fa-trash" ></i> </button>'
        ]
        ).draw(false);
    }
}

$('#lbNCorreoEmpresa').click(function (e) {
    e.preventDefault();
    FnJsCCorreoEmpresa();
    ECorreoEmpresa = true;

    FnJsBlockCorreoEmpresa();
    FnJSFillDdlCorreoEmpresaTipoCorreoEmpresa();
    CRUDCorreoEmpresa = "C";

    VarJsCorreoEmpresaId = 0;
    VarJsCorreoEmpresa = "";
    VarJsIdTipoCorreoEmpresa = 0;
});
$(document).on('click', '.btn-editCorreoEmpresa', function (e) {
    e.preventDefault();
    FnJsUCorreoEmpresa();
    var dataCorreoEmpresa = tablaCorreoEmpresa.row($(this).parents("tr")).data();
    VarJsCorreoEmpresaId = dataCorreoEmpresa[0];
    $('#txtNuevoCorreoEmpresa').val(dataCorreoEmpresa[1]);
    VarJsCorreoEmpresa = dataCorreoEmpresa[1];
    VAlDDLCorreoEmpresaTipoCorreoEmpresa = (dataCorreoEmpresa[2]);
    FnJSFillDdlCorreoEmpresaTipoCorreoEmpresa();
    VarJsIdTipoCorreoEmpresa = $('#ddlCCorreoEmpresaTipoCorreoEmpresa').val();
    CRUDCorreoEmpresa = "U";
});
$(document).on('click', '.btn-deleteCorreoEmpresa', function (e) {
    e.preventDefault();
    FnJsDCorreoEmpresa();
    ECorreoEmpresa = false;


    FnJsBlockCorreoEmpresa();
    var dataCorreoEmpresa = tablaCorreoEmpresa.row($(this).parents("tr")).data();
    VarJsCorreoEmpresaId = dataCorreoEmpresa[0];
    $('#txtNuevoCorreoEmpresa').val(dataCorreoEmpresa[1]);
    VarJsCorreoEmpresa = dataCorreoEmpresa[1];
    VAlDDLCorreoEmpresaTipoCorreoEmpresa = (dataCorreoEmpresa[2]);
    FnJSFillDdlCorreoEmpresaTipoCorreoEmpresa();

    CRUDCorreoEmpresa = "D";
});
function FnJsCCorreoEmpresa() {

    $('#lblexistenuevoCorreoEmpresa').text("");

    $("#DivModBorCorreoEmpresa").removeAttr("class");
    $("#DivModBorCorreoEmpresa").attr('class', 'modal-content border-success');

    $("#DivModHeaCorreoEmpresa").removeAttr("class");
    $("#DivModHeaCorreoEmpresa").attr('class', 'modal-header bg-success');

    $('#H4ModTitCorreoEmpresa').text('Nuevo Correo');

    $("#btnNueCorreoEmpresa").removeAttr("class");
    $("#btnNueCorreoEmpresa").attr('class', 'btn btn-success pull-right');
    $("#btnNueCorreoEmpresa i").removeAttr("class");
    $("#btnNueCorreoEmpresa i").attr("class", "fa fa-save fa-2x");

    $("#ddlCCorreoEmpresaTipoCorreoEmpresa").removeAttr("class");
    $("#ddlCCorreoEmpresaTipoCorreoEmpresa").attr("class", "form-control border-success");

    $("#txtNuevoCorreoEmpresa").attr('disabled', false);
    $('#ddlCCorreoEmpresaTipoCorreoEmpresa').attr('disabled', false);

    $('#' + ModCCorreoEmpresa[0].id + ' :text').val("");
}
function FnJsUCorreoEmpresa() {

    $('#lblexistenuevoCorreoEmpresa').text("");

    $("#DivModBorCorreoEmpresa").removeAttr("class");
    $("#DivModBorCorreoEmpresa").attr('class', 'modal-content border-warning');

    $("#DivModHeaCorreoEmpresa").removeAttr("class");
    $("#DivModHeaCorreoEmpresa").attr('class', 'modal-header bg-warning');

    $('#H4ModTitCorreoEmpresa').text('Editar Correo');

    $("#btnNueCorreoEmpresa").removeAttr("class");
    $("#btnNueCorreoEmpresa").attr('class', 'btn btn-warning pull-right');
    $("#btnNueCorreoEmpresa i").removeAttr("class");
    $("#btnNueCorreoEmpresa i").attr("class", "fa fa-save fa-2x");

    $("#ddlCCorreoEmpresaTipoCorreoEmpresa").removeAttr("class");
    $("#ddlCCorreoEmpresaTipoCorreoEmpresa").attr("class", "form-control border-warning");

    $("#txtNuevoCorreoEmpresa").attr('disabled', false);
    $('#ddlCCorreoEmpresaTipoCorreoEmpresa').attr('disabled', false);

    $('#' + ModCCorreoEmpresa[0].id + ' :text').val("");
}
function FnJsDCorreoEmpresa() {

    $('#lblexistenuevoCorreoEmpresa').text("");

    $("#DivModBorCorreoEmpresa").removeAttr("class");
    $("#DivModBorCorreoEmpresa").attr('class', 'modal-content border-danger');

    $("#DivModHeaCorreoEmpresa").removeAttr("class");
    $("#DivModHeaCorreoEmpresa").attr('class', 'modal-header bg-danger');

    $('#H4ModTitCorreoEmpresa').text('Eliminar Correo');

    $("#btnNueCorreoEmpresa").removeAttr("class");
    $("#btnNueCorreoEmpresa").attr('class', 'btn btn-danger pull-right');
    $("#btnNueCorreoEmpresa i").removeAttr("class");
    $("#btnNueCorreoEmpresa i").attr("class", "fa fa-trash fa-2x");

    $("#ddlCCorreoEmpresaTipoCorreoEmpresa").removeAttr("class");
    $("#ddlCCorreoEmpresaTipoCorreoEmpresa").attr("class", "form-control border-danger");

    $("#txtNuevoCorreoEmpresa").attr('disabled', true);
    $('#ddlCCorreoEmpresaTipoCorreoEmpresa').attr('disabled', true);

    $('#' + ModCCorreoEmpresa[0].id + ' :text').val("");
}

function FnJsBlockCorreoEmpresa() {
    if (ECorreoEmpresa == true) {
        $("#btnNueCorreoEmpresa").fadeOut("fast");
        $("#btnNueCorreoEmpresa").attr('disabled', true);
    }
    else if (ECorreoEmpresa == false) {
        $("#btnNueCorreoEmpresa").fadeIn("slow");
        $("#btnNueCorreoEmpresa").attr('disabled', false);
    }
}

$('#btnNueCorreoEmpresa').click(function (e) {
    e.preventDefault();
    if (formCorreoEmpresa.checkValidity()) {
        switch (CRUDCorreoEmpresa) {
            case "C":
                FnJsAjaxCCorreoEmpresa();
                break;
            case "U":
                FnJsAjaxUCorreoEmpresa();
                break;
            case "D":
                FnJsAjaxDCorreoEmpresa();
                break;
            default:
                console.log("Error en cud Correo");
        }
    }
    console.log('valido '+formCorreoEmpresa.checkValidity());
});

function FnJsAjaxCCorreoEmpresa() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnCCorreoEmpresaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            Correo: VarJsCorreoEmpresa,
            IdTipoCorreo: VarJsIdTipoCorreoEmpresa,
            IdEmpresa: VarJsIdEmpresa
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Correo Agregado");
            }
            else {
                CRUDCorreoEmpresa = "error"
                console.log("No se pudo agregar Correo");
            }
            FnAlertaCorreoEmpresa();
        }
    });   
}
function FnJsAjaxUCorreoEmpresa() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnUCorreoV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdCorreo: VarJsCorreoEmpresaId,
            Correo: VarJsCorreoEmpresa,
            IdTipoCorreo: VarJsIdTipoCorreoEmpresa
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Correo Actualizado");
            }
            else {
                CRUDCorreoEmpresa = "error"
                console.log("no se pudo actualizar");
            }
            FnAlertaCorreoEmpresa();
        }
    });
}
function FnJsAjaxDCorreoEmpresa() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnDCorreoV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdCorreo: VarJsCorreoEmpresaId
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Correo Eliminado");
            }
            else {
                CRUDCorreoEmpresa = "error"
                console.log("No se pudo Eliminar Correo");
            }
            FnAlertaCorreoEmpresa();
        }
    });
}

function FnJsAjaxECorreoEmpresa() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnECorreoEmpresaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdCorreo: VarJsCorreoEmpresaId,
            Correo: VarJsCorreoEmpresa,
            IdTipoCorreo: VarJsIdTipoCorreoEmpresa,
            IdEmpresa: VarJsIdEmpresa
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                ECorreoEmpresa = true;
                $('#lblexistenuevoCorreoEmpresa').text("Existe Correo");
                FnJsBlockCorreoEmpresa();
            }
            else {
                ECorreoEmpresa = false;
                $('#lblexistenuevoCorreoEmpresa').text("");
                FnJsBlockCorreoEmpresa();
            }
        }
    });
}
function VerificarExisteCorreoEmpresa() {
    if ($('#txtNuevoCorreoEmpresa').val().length >= 3 && $('#ddlCCorreoEmpresaTipoCorreoEmpresa').val() > 0) {
        return true;
    }
    else {
        return false;
    }
}
$('#txtNuevoCorreoEmpresa').change(function (e) {
    VarJsCorreoEmpresa = $(this).val();
    if (VerificarExisteCorreoEmpresa()) {
        FnJsAjaxECorreoEmpresa();
    }
});

$('#ddlCCorreoEmpresaTipoCorreoEmpresa').change(function (e) {
    VarJsIdTipoCorreoEmpresa = $('#ddlCCorreoEmpresaTipoCorreoEmpresa').val();
    if (VerificarExisteCorreoEmpresa()) {
        FnJsAjaxECorreoEmpresa();
    }
});

function FnJSFillDdlCorreoEmpresaTipoCorreoEmpresa() {
    $('#ddlCCorreoEmpresaTipoCorreoEmpresa').empty();
    $.ajax({
        type: "POST",
        url: "/modulo7/VstGenerales.aspx/FnRTipoCorreoV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLCorreoEmpresaTipoCorreoEmpresa == "null") {
                $('#ddlCCorreoEmpresaTipoCorreoEmpresa').append($("<option> </option>").val("0").html("Seleccionar Tipo Correo"));
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLCorreoEmpresaTipoCorreoEmpresa == value.TipoCorreo) {
                        $('#ddlCCorreoEmpresaTipoCorreoEmpresa').append($("<option> </option>").val(value.IdTipoCorreo).html(value.TipoCorreo));
                        VarJsIdTipoCorreoEmpresa = value.IdTipoCorreo;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCCorreoEmpresaTipoCorreoEmpresa').append($("<option> </option>").val(value.IdTipoCorreo).html(value.TipoCorreo));
            });
            VAlDDLCorreoEmpresaTipoCorreoEmpresa = "null";
        }
    });
}

function FnAlertaCorreoEmpresa() {

    switch (CRUDCorreoEmpresa) {
        case "C":
            VarJsColorAlertCorreoEmpresa = "bg-success";
            VarJsTextoAlertCorreoEmpresa = "Creado";
            break;
        case "U":
            VarJsColorAlertCorreoEmpresa = "bg-warning";
            VarJsTextoAlertCorreoEmpresa = "Actualizado";
            break;
        case "D":
            VarJsColorAlertCorreoEmpresa = "bg-danger";
            VarJsTextoAlertCorreoEmpresa = "Eliminado";
            break;
        case "Error":
            VarJsColorAlertCorreoEmpresa = "bg-secondary";
            VarJsTextoAlertCorreoEmpresa = "No se pudo realizar la operación";
            break;
        default:
            console.log("Error CUD Correo Alert");
    }
  
    $('.bd-example-modal-sm .modal-content').addClass(VarJsColorAlertCorreoEmpresa);
    $('.bd-example-modal-sm h5').text(VarJsTextoAlertCorreoEmpresa);
    $('.bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.bd-example-modal-sm').modal('hide');
        $('.bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertCorreoEmpresa);
    }, 1500);
    FnJsAjaxRCorreoEmpresa();
    $("#modalNCorreoEmpresa").modal("toggle");
}