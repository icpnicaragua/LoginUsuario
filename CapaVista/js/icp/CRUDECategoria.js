var tablaCategoria;
var ModCCategoria = $('#modalNCategoria');

var VarJsCategoriaId = 0;
var VarJsCategoria = "";
var VarJsIdFamilia = 0;

var VAlDDLCategoriaFamilia = "null";

var formCategoria = document.querySelector('#form1');

CRUDCategoria = "";

var VarJsColorAlertCategoria = "";
var VarJsTextoAlertCategoria = "";

var ECategoria = true;

$('#lbMostrarCategoria').click(function (e) {
    e.preventDefault();
    FnJsAjaxRCategoria();
    FnJSFillDdlCategoriaFamilia();
});

function FnJsAjaxRCategoria() {
    $.ajax({
        type: "POST",
        url: "/modulo10/VstFamilia.aspx/FnRCategoriaV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowCategoria(data.d);
        }
    }
    );
}

function AddrowCategoria(data) {
    $('#tblCategoria').DataTable().clear().destroy();

    tablaCategoria = $("#tblCategoria").DataTable({

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
                    id: 'colCategoria'
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
                filename: 'Categoria' + "_" + FnJsDate() + "_" + FnJsHour(),
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
                                    text: 'Categoria',
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Categoria'
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
                filename: 'Categoria' + "_" + FnJsDate() + "_" + FnJsHour(),
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
    tablaCategoria.buttons().container().addClass('form-inline');

    for (var contCategoria = 0; contCategoria < data.length; contCategoria++) {
        tablaCategoria.row.add([
            data[contCategoria].IdCategoria,
            data[contCategoria].Categoria,
            data[contCategoria].ObjFamilia.Familia,
            '<button value="editar" href="#modalNCategoria" data-toggle="modal" title="editar" class="btn btn-warning  btn-editCategoria"><i class="fas fa-pencil-alt"></i> </button>' +
            '<button value="eliminar" href="#modalNCategoria" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteCategoria"><i class="fa fa-trash" ></i> </button>'
        ]
        ).draw(false);
    }
}

$('#lbNCategoria').click(function (e) {
    e.preventDefault();
    FnJsCCategoria();
    ECategoria = true;

    FnJsBlockCategoria();
    FnJSFillDdlCategoriaFamilia();
    CRUDCategoria = "C";

    VarJsCategoriaId = 0;
    VarJsCategoria = "";
    VarJsIdFamilia = 0;

});
$(document).on('click', '.btn-editCategoria', function (e) {
    e.preventDefault();
    FnJsUCategoria();
    var dataCategoria = tablaCategoria.row($(this).parents("tr")).data();
    VarJsCategoriaId = dataCategoria[0];
    $('#txtNuevoCategoria').val(dataCategoria[1]);
    VarJsCategoria = dataCategoria[1];
    VAlDDLCategoriaFamilia = (dataCategoria[2]);
    FnJSFillDdlCategoriaFamilia();
    VarJsIdFamilia = $('#ddlCCategoriaFamilia').val();
    CRUDCategoria = "U";
});
$(document).on('click', '.btn-deleteCategoria', function (e) {
    e.preventDefault();
    FnJsDCategoria();
    ECategoria = false;

    FnJsBlockCategoria();
    var dataCategoria = tablaCategoria.row($(this).parents("tr")).data();
    VarJsCategoriaId = dataCategoria[0];
    $('#txtNuevoCategoria').val(dataCategoria[1]);
    VarJsCategoria = dataCategoria[1];
    VAlDDLCategoriaFamilia = (dataCategoria[2]);
    FnJSFillDdlCategoriaFamilia();

    CRUDCategoria = "D";
});


function FnJsCCategoria() {
    $('#lblexistenuevoCategoria').text("");

    $("#DivModBorCategoria").removeAttr("class");
    $("#DivModBorCategoria").attr('class', 'modal-content border-success');

    $("#DivModHeaCategoria").removeAttr("class");
    $("#DivModHeaCategoria").attr('class', 'modal-header bg-success');

    $('#H4ModTitCategoria').text('Nuevo Categoria');

    $("#btnNueCategoria").removeAttr("class");
    $("#btnNueCategoria").attr('class', 'btn btn-success pull-right');
    $("#btnNueCategoria i").removeAttr("class");
    $("#btnNueCategoria i").attr("class", "fa fa-save fa-2x");

    $("#ddlCCategoriaFamilia").removeAttr("class");
    $("#ddlCCategoriaFamilia").attr("class", "form-control border-success");

    $("#txtNuevoCategoria").attr('disabled', false);
    $('#ddlCCategoriaFamilia').attr('disabled', false);

    $('#' + ModCCategoria[0].id + ' :text').val("");

}
function FnJsUCategoria() {
    $('#lblexistenuevoCategoria').text("");

    $("#DivModBorCategoria").removeAttr("class");
    $("#DivModBorCategoria").attr('class', 'modal-content border-warning');

    $("#DivModHeaCategoria").removeAttr("class");
    $("#DivModHeaCategoria").attr('class', 'modal-header bg-warning');

    $('#H4ModTitCategoria').text('Editar Categoria');

    $("#btnNueCategoria").removeAttr("class");
    $("#btnNueCategoria").attr('class', 'btn btn-warning pull-right');
    $("#btnNueCategoria i").removeAttr("class");
    $("#btnNueCategoria i").attr("class", "fa fa-save fa-2x");

    $("#ddlCCategoriaFamilia").removeAttr("class");
    $("#ddlCCategoriaFamilia").attr("class", "form-control border-warning");

    $("#txtNuevoCategoria").attr('disabled', false);
    $('#ddlCCategoriaFamilia').attr('disabled', false);

    $('#' + ModCCategoria[0].id + ' :text').val("");
}
function FnJsDCategoria() {
    $('#lblexistenuevoCategoria').text("");

    $("#DivModBorCategoria").removeAttr("class");
    $("#DivModBorCategoria").attr('class', 'modal-content border-danger');

    $("#DivModHeaCategoria").removeAttr("class");
    $("#DivModHeaCategoria").attr('class', 'modal-header bg-danger');

    $('#H4ModTitCategoria').text('Eliminar Categoria');

    $("#btnNueCategoria").removeAttr("class");
    $("#btnNueCategoria").attr('class', 'btn btn-danger pull-right');
    $("#btnNueCategoria i").removeAttr("class");
    $("#btnNueCategoria i").attr("class", "fa fa-trash fa-2x");

    $("#ddlCCategoriaFamilia").removeAttr("class");
    $("#ddlCCategoriaFamilia").attr("class", "form-control border-danger");

    $("#txtNuevoCategoria").attr('disabled', true);
    $('#ddlCCategoriaFamilia').attr('disabled', true);

    $('#' + ModCCategoria[0].id + ' :text').val("");
}


function FnJsBlockCategoria() {
    if (ECategoria == true) {
        $("#btnNueCategoria").fadeOut("fast");
        $("#btnNueCategoria").attr('disabled', true);
    }
    else if (ECategoria == false) {
        $("#btnNueCategoria").fadeIn("slow");
        $("#btnNueCategoria").attr('disabled', false);
    }
}


$('#btnNueCategoria').click(function (e) {
    e.preventDefault();
    if (formCategoria.checkValidity()) {
        switch (CRUDCategoria) {
            case "C":
                FnJsAjaxCCategoria();
                break;
            case "U":
                FnJsAjaxUCategoria();
                break;
            case "D":
                FnJsAjaxDCategoria();
                break;
            default:
                console.log("Error en cud Categoria");
        }
    }   
});

function FnJsAjaxCCategoria() {
    $.ajax({
        url: "/modulo10/VstFamilia.aspx/FnCCategoriaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            Categoria: VarJsCategoria,
            IdFamilia: VarJsIdFamilia
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Categoría Agregado");
            }
            else {
                CRUDCategoria = "error"
                console.log("No se pudo agregar Categoría");
            }
            FnAlertaCategoria();
        }
    });
}
function FnJsAjaxUCategoria() {
    $.ajax({
        url: "/modulo10/VstFamilia.aspx/FnUCategoriaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdCategoria: VarJsCategoriaId,
            Categoria: VarJsCategoria,
            IdFamilia: VarJsIdFamilia

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Categoría Actualizado");
            }
            else {
                CRUDCategoria = "error"
                console.log("no se pudo actualizar");
            }
            FnAlertaCategoria();
        }
    });
}
function FnJsAjaxDCategoria() {
    $.ajax({
        url: "/modulo10/VstFamilia.aspx/FnDCategoriaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdCategoria: VarJsCategoriaId
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {

                console.log("Categoría Eliminado");
            }
            else {

                CRUDCategoria = "error"
                console.log("No se pudo Eliminar Categoría");
            }
            FnAlertaCategoria();

        }
    });
}
function FnJsAjaxECategoria() {
    $.ajax({
        url: "/modulo10/VstFamilia.aspx/FnECategoriaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdCategoria: VarJsCategoriaId,
            Categoria: VarJsCategoria,
            IdFamilia: VarJsIdFamilia
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                ECategoria = true;
                $('#lblexistenuevoCategoria').text("Existe Categoria");
                FnJsBlockCategoria();

            }
            else {
                ECategoria = false;
                $('#lblexistenuevoCategoria').text("");
                FnJsBlockCategoria();
            }
        }
    });
}

function VerificarExisteCategoria() {
    if ($('#txtNuevoCategoria').val().length >= 3 && $('#ddlCCategoriaFamilia').val() > 0) {
        return true;
    }
    else {
        return false;
    }
}

$('#txtNuevoCategoria').keyup(function (e) {
    VarJsCategoria = $(this).val();
    if (VerificarExisteCategoria()) {
        FnJsAjaxECategoria();
    }
});

$('#ddlCCategoriaFamilia').change(function (e) {
    VarJsIdFamilia = $('#ddlCCategoriaFamilia').val();
    if (VerificarExisteCategoria()) {
        FnJsAjaxECategoria();
    }
});

function FnJSFillDdlCategoriaFamilia() {
    $('#ddlCCategoriaFamilia').empty();
    $.ajax({
        type: "POST",
        url: "/modulo10/VstFamilia.aspx/FnRFamiliaV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLCategoriaFamilia == "null") {
                $('#ddlCCategoriaFamilia').append($("<option> </option>").val("0").html("Seleccionar Familia"));
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLCategoriaFamilia == value.Familia) {
                        $('#ddlCCategoriaFamilia').append($("<option> </option>").val(value.IdFamilia).html(value.Familia));
                        VarJsIdFamilia = value.IdFamilia;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCCategoriaFamilia').append($("<option> </option>").val(value.IdFamilia).html(value.Familia));
            });
            VAlDDLCategoriaFamilia = "null";
        }
    });
}

function FnAlertaCategoria() {

    switch (CRUDCategoria) {
        case "C":
            VarJsColorAlertCategoria = "bg-success";
            VarJsTextoAlertCategoria = "Creado";
            break;
        case "U":
            VarJsColorAlertCategoria = "bg-warning";
            VarJsTextoAlertCategoria = "Actualizado";
            break;
        case "D":
            VarJsColorAlertCategoria = "bg-danger";
            VarJsTextoAlertCategoria = "Eliminado";
            break;
        case "Error":
            VarJsColorAlertCategoria = "bg-secondary";
            VarJsTextoAlertCategoria = "No se pudo realizar la operación";
            break;
        default:
            console.log("Error CUD Categoría Alert");
    }

    $('.bd-example-modal-sm .modal-content').addClass(VarJsColorAlertCategoria);
    $('.bd-example-modal-sm h5').text(VarJsTextoAlertCategoria);
    $('.bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.bd-example-modal-sm').modal('hide');
        $('.bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertCategoria);
    }, 1500);

    if ($("#secciontblCategoria.show").length > 0) {
        FnJsAjaxRCategoria();
    }

    $("#modalNCategoria").modal("toggle");
}