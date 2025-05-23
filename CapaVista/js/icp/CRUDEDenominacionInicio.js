
var tablaDenominacionInicio;

var VarJsIdInicioCaja = 0;
var VarJsDenominacionInicioId = 0;
var Cantidad = "";
var VarJsEstadoInicioCaja = "";
CRUDDenominacionInicio = "";

var VarJsColorAlertDenominacionInicio = "";
var VarJsTextoAlertDenominacionInicio = "";

$('#tblInicioCaja tbody').on('click', 'tr', function () {
    var tablaInicioCaja = $('#tblInicioCaja').DataTable();
    VarJsIdInicioCaja = tablaInicioCaja.row(this).data()[0];
    VarJsEstadoInicioCaja = tablaInicioCaja.row(this).data()[5];
    FnJsAjaxRDenominacionInicio();
    $("#DenominacionInicioROW").attr('class', 'collapse show');
})

function FnJsAjaxRDenominacionInicio() {
    $.ajax({
        type: "POST",      
        url: "/modulo1/VstInicioCaja.aspx/FnRDenominacionInicioV",
        data: JSON.stringify({
            IdInicioCaja: VarJsIdInicioCaja
        }),
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowDenominacionInicio(data.d);
        }
    }
    );
}

function AddrowDenominacionInicio(data) {
    $('#tblDenominacionInicio').DataTable().clear().destroy();
    tablaDenominacionInicio = $("#tblDenominacionInicio").DataTable({
        "retrieve": true,
        dom: 'Bfrtip',
        pageLength: 20,
        "order": [1, 'desc'],
        "columnDefs": [
            { "targets": 4, "searchable": false },
            { "orderable": false, "targets": 4 },
            { "targets": 0, "searchable": false },
            { "visible": false, "targets": 0 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colDenominacionInicio'
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
                filename: 'DenominacionInicio' + "_" + FnJsDate() + "_" + FnJsHour(),
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
                                    text: 'DenominacionInicio',
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte DenominacionInicio'
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
                filename: 'DenominacionInicio' + "_" + FnJsDate() + "_" + FnJsHour(),
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
    tablaDenominacionInicio.buttons().container().addClass('form-inline');
    var TotalDenominacionInicio = 0.00;
    var Btn = '';
    if (VarJsEstadoInicioCaja == "1" || VarJsEstadoInicioCaja == "4") {
        Btn = '<button value="less" title="Remover 1" class="btn btn-danger  btn-lessDenominacionInicio"><i class="fa fa-minus-circle" aria-hidden="true"></i> </button>' +
            '<button value="plus" title="Agregar 1" class="btn btn-success btn-plusDenominacionInicio"><i class="fa fa-plus-circle" aria-hidden="true" ></i> </button>';
    }
    for (var contDenominacionInicio = 0; contDenominacionInicio < data.length; contDenominacionInicio++) {
        TotalDenominacionInicio = TotalDenominacionInicio + parseFloat(data[contDenominacionInicio].ObjDenominacionCS.Cantidad) * parseInt(data[contDenominacionInicio].Cantidad, 10);
        tablaDenominacionInicio.row.add([
            data[contDenominacionInicio].ObjDenominacionCS.IdDenominacion,
            data[contDenominacionInicio].ObjDenominacionCS.Cantidad,
            data[contDenominacionInicio].Cantidad,
            parseFloat(data[contDenominacionInicio].ObjDenominacionCS.Cantidad) * parseInt(data[contDenominacionInicio].Cantidad, 10),
            Btn
        ]
        ).draw(false);
    }
    $('#H2DenominacionInicio').text('Denominaciones Inicio de Caja. ' + 'Total: C$' + TotalDenominacionInicio);
}



$(document).on('click', '.btn-lessDenominacionInicio', function (e) {
    e.preventDefault();
    var dataDenominacionInicio = tablaDenominacionInicio.row($(this).parents("tr")).data();
    VarJsDenominacionInicioId = dataDenominacionInicio[0];
    Cantidad = dataDenominacionInicio[2];
    if (parseInt(Cantidad, 10) < 0) {
        Cantidad = 0;
    }
    else {
        Cantidad = parseInt(Cantidad, 10) - 1;
    }
    CRUDDenominacionInicio = "U";
    FnJsAjaxCUEDenominacionInicio();
});
$(document).on('click', '.btn-plusDenominacionInicio', function (e) {
    e.preventDefault();
    var dataDenominacionInicio = tablaDenominacionInicio.row($(this).parents("tr")).data();
    VarJsDenominacionInicioId = dataDenominacionInicio[0];
    Cantidad = dataDenominacionInicio[2];
    Cantidad = parseInt(Cantidad, 10) + 1;

    CRUDDenominacionInicio = "U";
    FnJsAjaxCUEDenominacionInicio();
});


$(document).on('click', '#lbNCerrarDenominacionInicio', function (e) {
    e.preventDefault();
    CRUDDenominacionInicio = "U";
    FnJsAjaxCerrarDenominacionInicio();
    $("#DenominacionInicioROW").attr('class', 'collapse');
});
function FnJsAjaxCUEDenominacionInicio() {
    $.ajax({
        url: "/modulo1/VstInicioCaja.aspx/FnCUEDenominacionInicioV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdInicioCaja: VarJsIdInicioCaja,
            IdDenominacion: VarJsDenominacionInicioId,
            Cantidad: Cantidad
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Denominacion Inicio Actualizado");
            }
            else {
                CRUDDenominacionInicio = "error"
                console.log("no se pudo actualizar");
            }
            FnAlertaDenominacionInicio();
        }
    });
}

function FnJsAjaxCerrarDenominacionInicio() {
    $.ajax({
        url: "/modulo1/VstInicioCaja.aspx/FnCerrarDenominacionInicioV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdInicioCaja: VarJsIdInicioCaja
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Denominacion Inicio Actualizado");
            }
            else {
                CRUDDenominacionInicio = "error"
                console.log("no se pudo actualizar");
            }
            FnAlertaDenominacionInicio();
            FnJsAjaxRInicioCaja();
        }
    });
}

function FnAlertaDenominacionInicio() {
    switch (CRUDDenominacionInicio) {
        case "C":
            VarJsColorAlertDenominacionInicio = "bg-success";
            VarJsTextoAlertDenominacionInicio = "Creado";
            break;
        case "U":
            VarJsColorAlertDenominacionInicio = "bg-warning";
            VarJsTextoAlertDenominacionInicio = "Actualizado";
            break;
        case "D":
            VarJsColorAlertDenominacionInicio = "bg-danger";
            VarJsTextoAlertDenominacionInicio = "Eliminado";
            break;
        case "Error":
            VarJsColorAlertDenominacionInicio = "bg-secondary";
            VarJsTextoAlertDenominacionInicio = "No se pudo realizar la operación";
            break;
        default:
            console.log("Error CUD DenominacionInicio Alert");
    }
    FnJsAjaxRDenominacionInicio();
    $('.bd-example-modal-sm .modal-content').addClass(VarJsColorAlertDenominacionInicio);
    $('.bd-example-modal-sm h5').text(VarJsTextoAlertDenominacionInicio);
    $('.bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.bd-example-modal-sm').modal('hide');
        $('.bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertDenominacionInicio);
    }, 500);
 
    

}