var tablaFamilia;
var ModCFamilia = $('#modalNFamilia');
var VarJsFamiliaId = 0;
var VarJsFamilia = "";

var formFamilia = document.querySelector('#form1');

CRUDFamilia = "";
var VarJsColorAlertFamilia = "";
var VarJsTextoAlertFamilia = "";
var EFamilia = true;

$('#lbMostrarFamilia').click(function (e) {
    e.preventDefault();
    FnJsAjaxRFamilia();
});

function FnJsAjaxRFamilia() {
    $.ajax({
        type: "POST",
        url: "/modulo10/VstFamilia.aspx/FnRFamiliaV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowFamilia(data.d);
        }
    }
    );
}

function AddrowFamilia(data) {
    $('#tblFamilia').DataTable().clear().destroy();
    tablaFamilia = $("#tblFamilia").DataTable({
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
                    id: 'colFamilia'
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
                filename: 'Tipo de Familia' + "_" + FnJsDate() + "_" + FnJsHour(),
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
                                    text: 'Tipo de Familia',
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Tipo de Familia'
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
                filename: 'Tipo de Familia' + "_" + FnJsDate() + "_" + FnJsHour(),
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
    tablaFamilia.buttons().container().addClass('form-inline');
    for (var contFamilia = 0; contFamilia < data.length; contFamilia++) {
        tablaFamilia.row.add([
            data[contFamilia].IdFamilia,
            data[contFamilia].Familia,
            '<button value="editar" href="#modalNFamilia" data-toggle="modal" title="editar" class="btn btn-warning  btn-editFamilia"><i class="fas fa-pencil-alt"></i> </button>' +
            '<button value="eliminar" href="#modalNFamilia" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteFamilia"><i class="fa fa-trash" ></i> </button>'+
            '<button value="add" href="#modalNCategoria" data-toggle="modal" title="Agregar Categoría" class="btn btn-success btn-AddCategoria"><i class="fa fa-plus-square-o" ></i> </button>'
        ]
        ).draw(false);
    }
}

$('#lbNFamilia').click(function (e) {
    e.preventDefault();
    FnJsCFamilia();
    EFamilia = true;
    FnJsBlockFamilia();
    CRUDFamilia = "C";
    VarJsFamiliaId = 0;
    VarJsFamilia = "";
});
$(document).on('click', '.btn-editFamilia', function (e) {
    e.preventDefault();
    FnJsUFamilia();
    var dataFamilia = tablaFamilia.row($(this).parents("tr")).data();
    VarJsFamiliaId = dataFamilia[0];
    $('#txtNuevoFamilia').val(dataFamilia[1]);
    VarJsFamilia = dataFamilia[1];
    CRUDFamilia = "U";
});
$(document).on('click', '.btn-deleteFamilia', function (e) {
    e.preventDefault();
    FnJsDFamilia();
    EFamilia = false;
    FnJsBlockFamilia();
    var dataFamilia = tablaFamilia.row($(this).parents("tr")).data();
    VarJsFamiliaId = dataFamilia[0];
    $('#txtNuevoFamilia').val(dataFamilia[1]);
    VarJsFamilia = dataFamilia[1];
    CRUDFamilia = "D";
});

function FnJsCFamilia() {
    $('#lblexistenuevoFamilia').text("");
    $("#DivModBorFamilia").removeAttr("class");
    $("#DivModBorFamilia").attr('class', 'modal-content border-success');
    $("#DivModHeaFamilia").removeAttr("class");
    $("#DivModHeaFamilia").attr('class', 'modal-header bg-success');
    $('#H4ModTitFamilia').text('Nuevo Tipo de Familia');
    $("#btnNueFamilia").removeAttr("class");
    $("#btnNueFamilia").attr('class', 'btn btn-success pull-right');
    $("#btnNueFamilia i").removeAttr("class");
    $("#btnNueFamilia i").attr("class", "fa fa-save fa-2x");
    $("#txtNuevoFamilia").attr('disabled', false);
    $('#' + ModCFamilia[0].id + ' :text').val("");
}
function FnJsUFamilia() {
    $('#lblexistenuevoFamilia').text("");
    $("#DivModBorFamilia").removeAttr("class");
    $("#DivModBorFamilia").attr('class', 'modal-content border-warning');
    $("#DivModHeaFamilia").removeAttr("class");
    $("#DivModHeaFamilia").attr('class', 'modal-header bg-warning');
    $('#H4ModTitFamilia').text('Editar Tipo de Familia');
    $("#btnNueFamilia").removeAttr("class");
    $("#btnNueFamilia").attr('class', 'btn btn-warning pull-right');
    $("#btnNueFamilia i").removeAttr("class");
    $("#btnNueFamilia i").attr("class", "fa fa-save fa-2x");
    $("#txtNuevoFamilia").attr('disabled', false);
    $('#' + ModCFamilia[0].id + ' :text').val("");
}
function FnJsDFamilia() {
    $('#lblexistenuevoFamilia').text("");
    $("#DivModBorFamilia").removeAttr("class");
    $("#DivModBorFamilia").attr('class', 'modal-content border-danger');
    $("#DivModHeaFamilia").removeAttr("class");
    $("#DivModHeaFamilia").attr('class', 'modal-header bg-danger');
    $('#H4ModTitFamilia').text('Eliminar Tipo de Familia');
    $("#btnNueFamilia").removeAttr("class");
    $("#btnNueFamilia").attr('class', 'btn btn-danger pull-right');
    $("#btnNueFamilia i").removeAttr("class");
    $("#btnNueFamilia i").attr("class", "fa fa-trash fa-2x");
    $("#txtNuevoFamilia").attr('disabled', true);
    $('#' + ModCFamilia[0].id + ' :text').val("");
}

function FnJsBlockFamilia() {
    if (EFamilia == true) {
        $("#btnNueFamilia").fadeOut("fast");
        $("#btnNueFamilia").attr('disabled', true);
    }
    else if (EFamilia == false) {
        $("#btnNueFamilia").fadeIn("slow");
        $("#btnNueFamilia").attr('disabled', false);
    }
}

$('#btnNueFamilia').click(function (e) {
    e.preventDefault();
    if (formFamilia.checkValidity()) {
        switch (CRUDFamilia) {
            case "C":
                FnJsAjaxCFamilia();
                break;
            case "U":
                FnJsAjaxUFamilia();
                break;
            case "D":
                FnJsAjaxDFamilia();
                break;
            default:
                console.log("Error en cud Tipo de Familia");
        }
    }
});

function FnJsAjaxCFamilia() {
    $.ajax({
        url: "/modulo10/VstFamilia.aspx/FnCFamiliaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            Familia: VarJsFamilia
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Tipo de Familia Agregado");
            }
            else {
                CRUDFamilia = "error"
                console.log("No se pudo agregar Tipo de Familia");
            }
            FnAlertaFamilia();
        }
    });
}
function FnJsAjaxUFamilia() {
    $.ajax({
        url: "/modulo10/VstFamilia.aspx/FnUFamiliaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdFamilia: VarJsFamiliaId,
            Familia: VarJsFamilia
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Tipo de Familia Actualizado");
            }
            else {
                CRUDFamilia = "error"
                console.log("no se pudo actualizar");
            }
            FnAlertaFamilia();
        }
    });
}
function FnJsAjaxDFamilia() {
    $.ajax({
        url: "/modulo10/VstFamilia.aspx/FnDFamiliaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdFamilia: VarJsFamiliaId
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Tipo de Familia Eliminado");
            }
            else {
                CRUDFamilia = "error"
                console.log("No se pudo Eliminar Tipo de Familia");
            }
            FnAlertaFamilia();
        }
    });
}

function FnJsAjaxEFamilia() {
    $.ajax({
        url: "/modulo10/VstFamilia.aspx/FnEFamiliaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdFamilia: VarJsFamiliaId,
            Familia: VarJsFamilia
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                EFamilia = true;
                $('#lblexistenuevoFamilia').text("Existe Tipo de Familia");
                FnJsBlockFamilia();
            }
            else {
                EFamilia = false;
                $('#lblexistenuevoFamilia').text("");
                FnJsBlockFamilia();
            }
        }
    });
}


function VerificarExisteFamilia() {
    if ($('#txtNuevoFamilia').val().length > 3) {
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoFamilia').keyup(function (e) {
    VarJsFamilia = $(this).val();
    if (VerificarExisteFamilia()) {
        FnJsAjaxEFamilia();
    }
});


function FnAlertaFamilia() {
    switch (CRUDFamilia) {
        case "C":
            VarJsColorAlertFamilia = "bg-success";
            VarJsTextoAlertFamilia = "Creado";
            break;
        case "U":
            VarJsColorAlertFamilia = "bg-warning";
            VarJsTextoAlertFamilia = "Actualizado";
            break;
        case "D":
            VarJsColorAlertFamilia = "bg-danger";
            VarJsTextoAlertFamilia = "Eliminado";
            break;
        case "Error":
            VarJsColorAlertFamilia = "bg-secondary";
            VarJsTextoAlertFamilia = "No se pudo realizar la operación";
            break;
        default:
            console.log("Error CUD Tipo de Familia Alert")
    }
    $('.bd-example-modal-sm .modal-content').addClass(VarJsColorAlertFamilia);
    $('.bd-example-modal-sm h5').text(VarJsTextoAlertFamilia);
    $('.bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.bd-example-modal-sm').modal('hide');
        $('.bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertFamilia);
    }, 1500);

    if ($("#secciontblFamilia.show").length > 0) {
        FnJsAjaxRFamilia();
    }
    $("#modalNFamilia").modal("toggle");
}