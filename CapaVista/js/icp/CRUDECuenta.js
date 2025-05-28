var tablaCuenta;
var ModCCuenta = $('#modalNCuenta');

var VarJsCuentaId = 0;
var VarJsCuenta = "";
var VarJsPropietario = "";
var VarJsIdBanco = 0;
var VarJsIdMoneda = 0;

var VAlDDLCuentaBanco = "null";
var VAlDDLCuentaMoneda = "null";

var formCuenta = document.querySelector('#form1');

CRUDCuenta = "";

var VarJsColorAlertCuenta = "";
var VarJsTextoAlertCuenta = "";

var ECuenta = true;

$('#lbMostrarCuenta').click(function (e) {
    e.preventDefault();
    FnJsAjaxRCuenta();
    FnJSFillDdlCuentaBanco();
    FnJSFillDdlCuentaMoneda();
});

function FnJsAjaxRCuenta() {
    $.ajax({
        type: "POST",
        url: "/modulo1/VstCuentasBanco.aspx/FnRCuentaV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowCuenta(data.d);
        }
    }
    );
}

function AddrowCuenta(data) {
    $('#tblCuenta').DataTable().clear().destroy();
    tablaCuenta = $("#tblCuenta").DataTable({
        "retrieve": true,
        dom: 'Bfrtip',

        "order": [1, 'asc'],
        "columnDefs": [
            { "targets": 5, "searchable": false },
            { "orderable": false, "targets": 5 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colCuenta'
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
                    columns: [':not(:eq(5)):visible']
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
                    columns: [':not(:eq(5)):visible']
                },
                titleAttr: 'PDF',
                filename: 'Cuenta' + "_" + FnJsDate() + "_" + FnJsHour(),
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
                                    text: 'Cuenta',
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Cuenta'
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
                filename: 'Cuenta' + "_" + FnJsDate() + "_" + FnJsHour(),
                text: '<i class="far fa-file-excel fa-2x"></i>',
                className: 'btn btn-success d-none d-lg-block',
                exportOptions: {
                    columns: [':not(:eq(5)):visible']
                },
                titleAttr: 'Excel',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')
                }
            }
        ],
        "language": FnJsEspTbl()
    });
    tablaCuenta.buttons().container().addClass('form-inline');

    for (var contCuenta = 0; contCuenta < data.length; contCuenta++) {
        tablaCuenta.row.add([
            data[contCuenta].IdCuenta,
            data[contCuenta].NumeroCuenta,
            data[contCuenta].ObjBanco.Banco,
            data[contCuenta].Propietario,
            data[contCuenta].ObjMoneda.Moneda,
            '<button value="editar" href="#modalNCuenta" data-toggle="modal" title="editar" class="btn btn-warning  btn-editCuenta"><i class="fas fa-pencil-alt"></i> </button>' +
            '<button value="eliminar" href="#modalNCuenta" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteCuenta"><i class="fa fa-trash" ></i> </button>'
        ]
        ).draw(false);
    }
}

$('#lbNCuenta').click(function (e) {
    e.preventDefault();
    FnJsCCuenta();
    ECuenta = true;

    FnJsBlockCuenta();
    FnJSFillDdlCuentaBanco();
    FnJSFillDdlCuentaMoneda();
    CRUDCuenta = "C";

    VarJsCuentaId = 0;
    VarJsCuenta = "";
    VarJsPropietario = "";
    VarJsIdBanco = 0;
    VarJsIdMoneda = 0;
});

$(document).on('click', '.btn-editCuenta', function (e) {
    e.preventDefault();
    FnJsUCuenta();
    var dataCuenta = tablaCuenta.row($(this).parents("tr")).data();
    VarJsCuentaId = dataCuenta[0];
    $('#txtNuevoCuenta').val(dataCuenta[1]);
    VarJsCuenta = dataCuenta[1];
    $('#txtNuevoPropietario').val(dataCuenta[3]);
    VarJsPropietario = dataCuenta[3];
    VAlDDLCuentaBanco = (dataCuenta[2]);
    FnJSFillDdlCuentaBanco();
    VarJsIdBanco = $('#ddlCCuentaBanco').val();
    VAlDDLCuentaMoneda = (dataCuenta[4]);
    FnJSFillDdlCuentaMoneda();
    VarJsIdMoneda = $('#ddlCCuentaMoneda').val();
    CRUDCuenta = "U";
});
$(document).on('click', '.btn-deleteCuenta', function (e) {
    e.preventDefault();
    FnJsDCuenta();
    ECuenta = false;

    FnJsBlockCuenta();
    var dataCuenta = tablaCuenta.row($(this).parents("tr")).data();
    VarJsCuentaId = dataCuenta[0];
    $('#txtNuevoCuenta').val(dataCuenta[1]);
    VarJsCuenta = dataCuenta[1];
    $('#txtNuevoPropietario').val(dataCuenta[3]);
    VAlDDLCuentaBanco = (dataCuenta[2]);
    FnJSFillDdlCuentaBanco();
    VAlDDLCuentaMoneda = (dataCuenta[4]);
    FnJSFillDdlCuentaMoneda();

    CRUDCuenta = "D";
});


function FnJsCCuenta() {
    $('#lblexistenuevoCuenta').text("");

    $("#DivModBorCuenta").removeAttr("class");
    $("#DivModBorCuenta").attr('class', 'modal-content border-success');

    $("#DivModHeaCuenta").removeAttr("class");
    $("#DivModHeaCuenta").attr('class', 'modal-header bg-success');

    $('#H4ModTitCuenta').text('Nuevo Cuenta');

    $("#btnNueCuenta").removeAttr("class");
    $("#btnNueCuenta").attr('class', 'btn btn-success pull-right');
    $("#btnNueCuenta i").removeAttr("class");
    $("#btnNueCuenta i").attr("class", "fa fa-save fa-2x");

    $("#ddlCCuentaBanco").removeAttr("class");
    $("#ddlCCuentaBanco").attr("class", "form-control border-success");
    $("#ddlCCuentaMoneda").removeAttr("class");
    $("#ddlCCuentaMoneda").attr("class", "form-control border-success");

    $("#txtNuevoCuenta").attr('disabled', false);
    $("#txtNuevoPropietario").attr('disabled', false);
    $('#ddlCCuentaBanco').attr('disabled', false);
    $('#ddlCCuentaMoneda').attr('disabled', false);

    $('#' + ModCCuenta[0].id + ' :text').val("");

}
function FnJsUCuenta() {
    $('#lblexistenuevoCuenta').text("");

    $("#DivModBorCuenta").removeAttr("class");
    $("#DivModBorCuenta").attr('class', 'modal-content border-warning');

    $("#DivModHeaCuenta").removeAttr("class");
    $("#DivModHeaCuenta").attr('class', 'modal-header bg-warning');

    $('#H4ModTitCuenta').text('Editar Cuenta');

    $("#btnNueCuenta").removeAttr("class");
    $("#btnNueCuenta").attr('class', 'btn btn-warning pull-right');
    $("#btnNueCuenta i").removeAttr("class");
    $("#btnNueCuenta i").attr("class", "fa fa-save fa-2x");

    $("#ddlCCuentaBanco").removeAttr("class");
    $("#ddlCCuentaBanco").attr("class", "form-control border-warning");
    $("#ddlCCuentaMoneda").removeAttr("class");
    $("#ddlCCuentaMoneda").attr("class", "form-control border-warning");

    $("#txtNuevoCuenta").attr('disabled', false);
    $("#txtNuevoPropietario").attr('disabled', false);
    $('#ddlCCuentaBanco').attr('disabled', false);
    $('#ddlCCuentaMoneda').attr('disabled', false);


    $('#' + ModCCuenta[0].id + ' :text').val("");
}
function FnJsDCuenta() {
    $('#lblexistenuevoCuenta').text("");

    $("#DivModBorCuenta").removeAttr("class");
    $("#DivModBorCuenta").attr('class', 'modal-content border-danger');

    $("#DivModHeaCuenta").removeAttr("class");
    $("#DivModHeaCuenta").attr('class', 'modal-header bg-danger');

    $('#H4ModTitCuenta').text('Eliminar Cuenta');

    $("#btnNueCuenta").removeAttr("class");
    $("#btnNueCuenta").attr('class', 'btn btn-danger pull-right');
    $("#btnNueCuenta i").removeAttr("class");
    $("#btnNueCuenta i").attr("class", "fa fa-trash fa-2x");

    $("#ddlCCuentaBanco").removeAttr("class");
    $("#ddlCCuentaBanco").attr("class", "form-control border-danger");
    $("#ddlCCuentaMoneda").removeAttr("class");
    $("#ddlCCuentaMoneda").attr("class", "form-control border-danger");

    $("#txtNuevoCuenta").attr('disabled', true);
    $("#txtNuevoPropietario").attr('disabled', true);
    $('#ddlCCuentaBanco').attr('disabled', true);
    $('#ddlCCuentaMoneda').attr('disabled', true);;

    $('#' + ModCCuenta[0].id + ' :text').val("");
}


function FnJsBlockCuenta() {
    if (ECuenta == true) {
        $("#btnNueCuenta").fadeOut("fast");
        $("#btnNueCuenta").attr('disabled', true);
    }
    else if (ECuenta == false) {
        $("#btnNueCuenta").fadeIn("slow");
        $("#btnNueCuenta").attr('disabled', false);
    }
}


$('#btnNueCuenta').click(function (e) {
    e.preventDefault();
    if (formCuenta.checkValidity()) {
        switch (CRUDCuenta) {
            case "C":
                FnJsAjaxCCuenta();
                break;
            case "U":
                FnJsAjaxUCuenta();
                break;
            case "D":
                FnJsAjaxDCuenta();
                break;
            default:
                console.log("Error en cud Cuenta");
        }
    }
});

function FnJsAjaxCCuenta() {
    $.ajax({
        url: "/modulo1/VstCuentasBanco.aspx/FnCCuentaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            Cuenta: VarJsCuenta,
            IdBanco: VarJsIdBanco,
            Propietario: VarJsPropietario,
            IdMoneda: VarJsIdMoneda
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
                CRUDCuenta = "error"
                console.log("No se pudo agregar Categoría");
            }
            FnAlertaCuenta();
        }
    });
}
function FnJsAjaxUCuenta() {
    $.ajax({
        url: "/modulo1/VstCuentasBanco.aspx/FnUCuentaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdCuenta: VarJsCuentaId,
            Cuenta: VarJsCuenta,
            IdBanco: VarJsIdBanco,
            Propietario:VarJsPropietario,
            IdMoneda: VarJsIdMoneda
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Categoría Actualizado");
            }
            else {
                CRUDCuenta = "error"
                console.log("no se pudo actualizar");
            }
            FnAlertaCuenta();
        }
    });
}
function FnJsAjaxDCuenta() {
    $.ajax({
        url: "/modulo1/VstCuentasBanco.aspx/FnDCuentaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdCuenta: VarJsCuentaId
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
                CRUDCuenta = "error"
                console.log("No se pudo Eliminar Categoría");
            }
            FnAlertaCuenta();
        }
    });
}
function FnJsAjaxECuenta() {
    $.ajax({
        url: "/modulo1/VstCuentasBanco.aspx/FnECuentaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdCuenta: VarJsCuentaId,
            Cuenta: VarJsCuenta,
            IdBanco: VarJsIdBanco
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                ECuenta = true;
                $('#lblexistenuevoCuenta').text("Existe Cuenta");
                FnJsBlockCuenta();
            }
            else {
                ECuenta = false;
                $('#lblexistenuevoCuenta').text("");
                FnJsBlockCuenta();
            }
        }
    });
}

function VerificarExisteCuenta() {
    if ($('#txtNuevoCuenta').val().length >= 3 && $('#ddlCCuentaBanco').val() > 0 && $('#ddlCCuentaMoneda').val() > 0 && $('#txtNuevoPropietario').val().length >= 3) {
        return true;
    }
    else {
        return false;
    }
}

$('#txtNuevoCuenta').keyup(function (e) {
    VarJsCuenta = $(this).val();
    if (VerificarExisteCuenta()) {
        FnJsAjaxECuenta();
    }
});
$('#txtNuevoPropietario').keyup(function (e) {
    VarJsPropietario = $(this).val();
    if (VerificarExisteCuenta()) {
        FnJsAjaxECuenta();
    }
});

$('#ddlCCuentaBanco').change(function (e) {
    VarJsIdBanco = $('#ddlCCuentaBanco').val();
    if (VerificarExisteCuenta()) {
        FnJsAjaxECuenta();
    }
});
$('#ddlCCuentaMoneda').change(function (e) {
    VarJsIdMoneda = $('#ddlCCuentaMoneda').val();
    if (VerificarExisteCuenta()) {
        FnJsAjaxECuenta();
    }
});

function FnJSFillDdlCuentaBanco() {
    $('#ddlCCuentaBanco').empty();
    $.ajax({
        type: "POST",
        url: "/modulo1/VstCuentasBanco.aspx/FnRBancoV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLCuentaBanco == "null") {
                $('#ddlCCuentaBanco').append($("<option> </option>").val("0").html("Seleccionar Banco"));
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLCuentaBanco == value.Banco) {
                        $('#ddlCCuentaBanco').append($("<option> </option>").val(value.IdBanco).html(value.Banco));
                        VarJsIdBanco = value.IdBanco;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCCuentaBanco').append($("<option> </option>").val(value.IdBanco).html(value.Banco));
            });
            VAlDDLCuentaBanco = "null";
        }
    });
}

function FnJSFillDdlCuentaMoneda() {
    $('#ddlCCuentaMoneda').empty();
    $.ajax({
        type: "POST",
        url: "/modulo1/VstTC.aspx/FnRALLMonedaV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLCuentaMoneda == "null") {
                $('#ddlCCuentaMoneda').append($("<option> </option>").val("0").html("Seleccionar Moneda"));
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLCuentaMoneda == value.Moneda) {
                        $('#ddlCCuentaMoneda').append($("<option> </option>").val(value.IdMoneda).html(value.Moneda));
                        VarJsIdMoneda = value.IdMoneda;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCCuentaMoneda').append($("<option> </option>").val(value.IdMoneda).html(value.Moneda));
            });
            VAlDDLCuentaMoneda = "null";
        }
    });
}

function FnAlertaCuenta() {

    switch (CRUDCuenta) {
        case "C":
            VarJsColorAlertCuenta = "bg-success";
            VarJsTextoAlertCuenta = "Creado";
            break;
        case "U":
            VarJsColorAlertCuenta = "bg-warning";
            VarJsTextoAlertCuenta = "Actualizado";
            break;
        case "D":
            VarJsColorAlertCuenta = "bg-danger";
            VarJsTextoAlertCuenta = "Eliminado";
            break;
        case "Error":
            VarJsColorAlertCuenta = "bg-secondary";
            VarJsTextoAlertCuenta = "No se pudo realizar la operación";
            break;
        default:
            console.log("Error CUD Categoría Alert");
    }

    $('.bd-example-modal-sm .modal-content').addClass(VarJsColorAlertCuenta);
    $('.bd-example-modal-sm h5').text(VarJsTextoAlertCuenta);
    $('.bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.bd-example-modal-sm').modal('hide');
        $('.bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertCuenta);
    }, 1500);

    if ($("#secciontblCuenta.show").length > 0) {
        FnJsAjaxRCuenta();
    }

    $("#modalNCuenta").modal("toggle");
}