var tablaSubCategoria;
var ModCSubCategoria = $('#modalNSubCategoria');

var VarJsSubCategoriaId = 0;
var VarJsSubCategoria = "";
var VarJsIdCategoria = 0;

var VAlDDLSubCategoriaCategoria = "null";

var formSubCategoria = document.querySelector('#form1');

CRUDSubCategoria = "";

var VarJsColorAlertSubCategoria = "";
var VarJsTextoAlertSubCategoria = "";

var ESubCategoria = true;

$('#lbMostrarSubCategoria').click(function (e) {
    e.preventDefault();
    FnJsAjaxRSubCategoria();
    FnJSFillDdlSubCategoriaCategoria();
});

function FnJsAjaxRSubCategoria() {
    $.ajax({
        type: "POST",
        url: "/modulo10/VstFamilia.aspx/FnRSubCategoriaV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowSubCategoria(data.d);
        }
    }
    );
}

function AddrowSubCategoria(data) {
    $('#tblSubCategoria').DataTable().clear().destroy();

    tablaSubCategoria = $("#tblSubCategoria").DataTable({

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
                    id: 'colSubCategoria'
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
                filename: 'SubCategoria' + "_" + FnJsDate() + "_" + FnJsHour(),
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
                                    text: 'SubCategoria',
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte SubCategoria'
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
                filename: 'SubCategoria' + "_" + FnJsDate() + "_" + FnJsHour(),
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
    tablaSubCategoria.buttons().container().addClass('form-inline');
    for (var contSubCategoria = 0; contSubCategoria < data.length; contSubCategoria++) {
        tablaSubCategoria.row.add([
            data[contSubCategoria].IdSubCategoria,
            data[contSubCategoria].SubCategoria,
            data[contSubCategoria].ObjCategoria.Categoria,
            '<button value="editar" href="#modalNSubCategoria" data-toggle="modal" title="editar" class="btn btn-warning  btn-editSubCategoria"><i class="fas fa-pencil-alt"></i> </button>' +
            '<button value="eliminar" href="#modalNSubCategoria" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteSubCategoria"><i class="fa fa-trash" ></i> </button>'
        ]
        ).draw(false);
    }
}

$('#lbNSubCategoria').click(function (e) {
    e.preventDefault();
    FnJsCSubCategoria();
    ESubCategoria = true;

    FnJsBlockSubCategoria();
    FnJSFillDdlSubCategoriaCategoria();
    CRUDSubCategoria = "C";

    VarJsSubCategoriaId = 0;
    VarJsSubCategoria = "";
    VarJsIdCategoria = 0;

});

$(document).on('click', '.btn-AddSubCategoria', function (e) {
    e.preventDefault();
    ESubCategoria = true;
    FnJsCSubCategoria();
    VarJsSubCategoriaId = 0;
    VarJsSubCategoria = "";
    tablaCategoria = $("#tblCategoria").DataTable();
    var dataCategoria = tablaCategoria.row($(this).parents("tr")).data();
    VAlDDLSubCategoriaCategoria = (dataCategoria[1]);
    FnJSFillDdlSubCategoriaCategoria();
    VarJsIdCategoria = $('#ddlCSubCategoriaCategoria').val();
    CRUDSubCategoria = "C";
});

$(document).on('click', '.btn-editSubCategoria', function (e) {
    e.preventDefault();
    FnJsUSubCategoria();
    var dataSubCategoria = tablaSubCategoria.row($(this).parents("tr")).data();
    VarJsSubCategoriaId = dataSubCategoria[0];
    $('#txtNuevoSubCategoria').val(dataSubCategoria[1]);
    VarJsSubCategoria = dataSubCategoria[1];
    VAlDDLSubCategoriaCategoria = (dataSubCategoria[2]);
    FnJSFillDdlSubCategoriaCategoria();
    VarJsIdCategoria = $('#ddlCSubCategoriaCategoria').val();
    CRUDSubCategoria = "U";
});
$(document).on('click', '.btn-deleteSubCategoria', function (e) {
    e.preventDefault();
    FnJsDSubCategoria();
    ESubCategoria = false;

    FnJsBlockSubCategoria();
    var dataSubCategoria = tablaSubCategoria.row($(this).parents("tr")).data();
    VarJsSubCategoriaId = dataSubCategoria[0];
    $('#txtNuevoSubCategoria').val(dataSubCategoria[1]);
    VarJsSubCategoria = dataSubCategoria[1];
    VAlDDLSubCategoriaCategoria = (dataSubCategoria[2]);
    FnJSFillDdlSubCategoriaCategoria();

    CRUDSubCategoria = "D";
});


function FnJsCSubCategoria() {
    $('#lblexistenuevoSubCategoria').text("");

    $("#DivModBorSubCategoria").removeAttr("class");
    $("#DivModBorSubCategoria").attr('class', 'modal-content border-success');

    $("#DivModHeaSubCategoria").removeAttr("class");
    $("#DivModHeaSubCategoria").attr('class', 'modal-header bg-success');

    $('#H4ModTitSubCategoria').text('Nuevo SubCategoria');

    $("#btnNueSubCategoria").removeAttr("class");
    $("#btnNueSubCategoria").attr('class', 'btn btn-success pull-right');
    $("#btnNueSubCategoria i").removeAttr("class");
    $("#btnNueSubCategoria i").attr("class", "fa fa-save fa-2x");

    $("#ddlCSubCategoriaCategoria").removeAttr("class");
    $("#ddlCSubCategoriaCategoria").attr("class", "form-control border-success");

    $("#txtNuevoSubCategoria").attr('disabled', false);
    $('#ddlCSubCategoriaCategoria').attr('disabled', false);

    $('#' + ModCSubCategoria[0].id + ' :text').val("");

}
function FnJsUSubCategoria() {
    $('#lblexistenuevoSubCategoria').text("");

    $("#DivModBorSubCategoria").removeAttr("class");
    $("#DivModBorSubCategoria").attr('class', 'modal-content border-warning');

    $("#DivModHeaSubCategoria").removeAttr("class");
    $("#DivModHeaSubCategoria").attr('class', 'modal-header bg-warning');

    $('#H4ModTitSubCategoria').text('Editar SubCategoria');

    $("#btnNueSubCategoria").removeAttr("class");
    $("#btnNueSubCategoria").attr('class', 'btn btn-warning pull-right');
    $("#btnNueSubCategoria i").removeAttr("class");
    $("#btnNueSubCategoria i").attr("class", "fa fa-save fa-2x");

    $("#ddlCSubCategoriaCategoria").removeAttr("class");
    $("#ddlCSubCategoriaCategoria").attr("class", "form-control border-warning");

    $("#txtNuevoSubCategoria").attr('disabled', false);
    $('#ddlCSubCategoriaCategoria').attr('disabled', false);

    $('#' + ModCSubCategoria[0].id + ' :text').val("");
}
function FnJsDSubCategoria() {
    $('#lblexistenuevoSubCategoria').text("");

    $("#DivModBorSubCategoria").removeAttr("class");
    $("#DivModBorSubCategoria").attr('class', 'modal-content border-danger');

    $("#DivModHeaSubCategoria").removeAttr("class");
    $("#DivModHeaSubCategoria").attr('class', 'modal-header bg-danger');

    $('#H4ModTitSubCategoria').text('Eliminar SubCategoria');

    $("#btnNueSubCategoria").removeAttr("class");
    $("#btnNueSubCategoria").attr('class', 'btn btn-danger pull-right');
    $("#btnNueSubCategoria i").removeAttr("class");
    $("#btnNueSubCategoria i").attr("class", "fa fa-trash fa-2x");

    $("#ddlCSubCategoriaCategoria").removeAttr("class");
    $("#ddlCSubCategoriaCategoria").attr("class", "form-control border-danger");

    $("#txtNuevoSubCategoria").attr('disabled', true);
    $('#ddlCSubCategoriaCategoria').attr('disabled', true);

    $('#' + ModCSubCategoria[0].id + ' :text').val("");
}


function FnJsBlockSubCategoria() {
    if (ESubCategoria == true) {
        $("#btnNueSubCategoria").fadeOut("fast");
        $("#btnNueSubCategoria").attr('disabled', true);
    }
    else if (ESubCategoria == false) {
        $("#btnNueSubCategoria").fadeIn("slow");
        $("#btnNueSubCategoria").attr('disabled', false);
    }
}


$('#btnNueSubCategoria').click(function (e) {
    e.preventDefault();
    if (formSubCategoria.checkValidity()) {
        switch (CRUDSubCategoria) {
            case "C":
                FnJsAjaxCSubCategoria();
                break;
            case "U":
                FnJsAjaxUSubCategoria();
                break;
            case "D":
                FnJsAjaxDSubCategoria();
                break;
            default:
                console.log("Error en cud SubCategoria");
        }
    }
});

function FnJsAjaxCSubCategoria() {
    $.ajax({
        url: "/modulo10/VstFamilia.aspx/FnCSubCategoriaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            SubCategoria: VarJsSubCategoria,
            IdCategoria: VarJsIdCategoria
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("SubCategoría Agregado");
            }
            else {
                CRUDSubCategoria = "error"
                console.log("No se pudo agregar SubCategoría");
            }
            FnAlertaSubCategoria();
        }
    });
}
function FnJsAjaxUSubCategoria() {
    $.ajax({
        url: "/modulo10/VstFamilia.aspx/FnUSubCategoriaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdSubCategoria: VarJsSubCategoriaId,
            SubCategoria: VarJsSubCategoria,
            IdCategoria: VarJsIdCategoria

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("SubCategoría Actualizado");
            }
            else {
                CRUDSubCategoria = "error"
                console.log("no se pudo actualizar");
            }
            FnAlertaSubCategoria();
        }
    });
}
function FnJsAjaxDSubCategoria() {
    $.ajax({
        url: "/modulo10/VstFamilia.aspx/FnDSubCategoriaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdSubCategoria: VarJsSubCategoriaId
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {

                console.log("SubCategoría Eliminado");
            }
            else {

                CRUDSubCategoria = "error"
                console.log("No se pudo Eliminar SubCategoría");
            }
            FnAlertaSubCategoria();
        }
    });
}
function FnJsAjaxESubCategoria() {
    $.ajax({
        url: "/modulo10/VstFamilia.aspx/FnESubCategoriaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdSubCategoria: VarJsSubCategoriaId,
            SubCategoria: VarJsSubCategoria,
            IdCategoria: VarJsIdCategoria
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                ESubCategoria = true;
                $('#lblexistenuevoSubCategoria').text("Existe SubCategoria");
                FnJsBlockSubCategoria();
            }
            else {
                ESubCategoria = false;
                $('#lblexistenuevoSubCategoria').text("");
                FnJsBlockSubCategoria();
            }
        }
    });
}

function VerificarExisteSubCategoria() {
    if ($('#txtNuevoSubCategoria').val().length >= 3 && $('#ddlCSubCategoriaCategoria').val() > 0) {
        return true;
    }
    else {
        return false;
    }
}

$('#txtNuevoSubCategoria').keyup(function (e) {
    VarJsSubCategoria = $(this).val();
    if (VerificarExisteSubCategoria()) {
        FnJsAjaxESubCategoria();
    }
});

$('#ddlCSubCategoriaCategoria').change(function (e) {
    VarJsIdCategoria = $('#ddlCSubCategoriaCategoria').val();
    if (VerificarExisteSubCategoria()) {
        FnJsAjaxESubCategoria();
    }
});

function FnJSFillDdlSubCategoriaCategoria() {
    $('#ddlCSubCategoriaCategoria').empty();
    $.ajax({
        type: "POST",
        url: "/modulo10/VstFamilia.aspx/FnRCategoriaV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLSubCategoriaCategoria == "null") {
                $('#ddlCSubCategoriaCategoria').append($("<option> </option>").val("0").html("Seleccionar Categoria"));
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLSubCategoriaCategoria == value.Categoria) {
                        $('#ddlCSubCategoriaCategoria').append($("<option> </option>").val(value.IdCategoria).html(value.Categoria));
                        VarJsIdCategoria = value.IdCategoria;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCSubCategoriaCategoria').append($("<option> </option>").val(value.IdCategoria).html(value.Categoria));
            });
            VAlDDLSubCategoriaCategoria = "null";
        }
    });
}

function FnAlertaSubCategoria() {

    switch (CRUDSubCategoria) {
        case "C":
            VarJsColorAlertSubCategoria = "bg-success";
            VarJsTextoAlertSubCategoria = "Creado";
            break;
        case "U":
            VarJsColorAlertSubCategoria = "bg-warning";
            VarJsTextoAlertSubCategoria = "Actualizado";
            break;
        case "D":
            VarJsColorAlertSubCategoria = "bg-danger";
            VarJsTextoAlertSubCategoria = "Eliminado";
            break;
        case "Error":
            VarJsColorAlertSubCategoria = "bg-secondary";
            VarJsTextoAlertSubCategoria = "No se pudo realizar la operación";
            break;
        default:
            console.log("Error CUD SubCategoría Alert");
    }

    $('.bd-example-modal-sm .modal-content').addClass(VarJsColorAlertSubCategoria);
    $('.bd-example-modal-sm h5').text(VarJsTextoAlertSubCategoria);
    $('.bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.bd-example-modal-sm').modal('hide');
        $('.bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertSubCategoria);
    }, 1500);

    if ($("#secciontblSubCategoria.show").length > 0) {
        FnJsAjaxRSubCategoria();
    }

    $("#modalNSubCategoria").modal("toggle");
}