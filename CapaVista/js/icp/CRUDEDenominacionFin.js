
var tablaDenominacionFin;

var VarJsIdFinCaja = 0;
var VarJsDenominacionFinId = 0;
var Cantidad = "";
var VarJsEstadoFinCaja = "";
CRUDDenominacionFin = "";

var VarJsColorAlertDenominacionFin = "";
var VarJsTextoAlertDenominacionFin = "";

$('#tblFinCaja tbody').on('click', 'tr', function () {
    var tablaFinCaja = $('#tblFinCaja').DataTable();
    VarJsIdFinCaja = tablaFinCaja.row(this).data()[0];
    VarJsEstadoFinCaja = tablaFinCaja.row(this).data()[5];
    FnJsAjaxRDenominacionFin();
    $("#DenominacionFinROW").attr('class', 'collapse show');
})

function FnJsAjaxRDenominacionFin() {
    $.ajax({
        type: "POST",
        url: "/modulo1/VstFinCaja.aspx/FnRDenominacionFinV",
        data: JSON.stringify({
            IdFinCaja: VarJsIdFinCaja
        }),
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowDenominacionFin(data.d);
        }
    }
    );
}

function AddrowDenominacionFin(data) {
    $('#tblDenominacionFin').DataTable().clear().destroy();
    tablaDenominacionFin = $("#tblDenominacionFin").DataTable({
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
                    id: 'colDenominacionFin'
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
                filename: 'DenominacionFin' + "_" + FnJsDate() + "_" + FnJsHour(),
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
                                    text: 'DenominacionFin',
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte DenominacionFin'
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
                filename: 'DenominacionFin' + "_" + FnJsDate() + "_" + FnJsHour(),
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
    tablaDenominacionFin.buttons().container().addClass('form-inline');
    var TotalDenominacionFin = 0.00;
    var Btn = '';
    if (VarJsEstadoFinCaja == "1" || VarJsEstadoFinCaja == "4") {
        Btn = '<button value="less" title="Remover 1" class="btn btn-danger  btn-lessDenominacionFin"><i class="fa fa-minus-circle" aria-hidden="true"></i> </button>' +
            '<button value="plus" title="Agregar 1" class="btn btn-success btn-plusDenominacionFin"><i class="fa fa-plus-circle" aria-hidden="true" ></i> </button>';
    }
    for (var contDenominacionFin = 0; contDenominacionFin < data.length; contDenominacionFin++) {
        TotalDenominacionFin = TotalDenominacionFin + parseFloat(data[contDenominacionFin].ObjDenominacionCS.Cantidad) * parseInt(data[contDenominacionFin].Cantidad, 10);
        tablaDenominacionFin.row.add([
            data[contDenominacionFin].ObjDenominacionCS.IdDenominacion,
            data[contDenominacionFin].ObjDenominacionCS.Cantidad,
            data[contDenominacionFin].Cantidad,
            parseFloat(data[contDenominacionFin].ObjDenominacionCS.Cantidad) * parseInt(data[contDenominacionFin].Cantidad, 10),
            Btn
        ]
        ).draw(false);
    }
    $('#H2DenominacionFin').text('Denominaciones Fin de Caja. ' + 'Total: C$' + TotalDenominacionFin);
}



$(document).on('click', '.btn-lessDenominacionFin', function (e) {
    e.preventDefault();
    var dataDenominacionFin = tablaDenominacionFin.row($(this).parents("tr")).data();
    VarJsDenominacionFinId = dataDenominacionFin[0];
    Cantidad = dataDenominacionFin[2];
    if (parseInt(Cantidad, 10) < 0) {
        Cantidad = 0;
    }
    else {
        Cantidad = parseInt(Cantidad, 10) - 1;
    }
    CRUDDenominacionFin = "U";
    FnJsAjaxCUEDenominacionFin();
});
$(document).on('click', '.btn-plusDenominacionFin', function (e) {
    e.preventDefault();
    var dataDenominacionFin = tablaDenominacionFin.row($(this).parents("tr")).data();
    VarJsDenominacionFinId = dataDenominacionFin[0];
    Cantidad = dataDenominacionFin[2];
    Cantidad = parseInt(Cantidad, 10) + 1;

    CRUDDenominacionFin = "U";
    FnJsAjaxCUEDenominacionFin();
});


$(document).on('click', '#lbNCerrarDenominacionFin', function (e) {
    e.preventDefault();
    CRUDDenominacionFin = "U";
    FnJsAjaxCerrarDenominacionFin();
    $("#DenominacionFinROW").attr('class', 'collapse');
});
function FnJsAjaxCUEDenominacionFin() {
    $.ajax({
        url: "/modulo1/VstFinCaja.aspx/FnCUEDenominacionFinV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdFinCaja: VarJsIdFinCaja,
            IdDenominacion: VarJsDenominacionFinId,
            Cantidad: Cantidad
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Denominacion Fin Actualizado");
            }
            else {
                CRUDDenominacionFin = "error"
                console.log("no se pudo actualizar");
            }
            FnAlertaDenominacionFin();
        }
    });
}

function FnJsAjaxCerrarDenominacionFin() {
    $.ajax({
        url: "/modulo1/VstFinCaja.aspx/FnCerrarDenominacionFinV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdFinCaja: VarJsIdFinCaja
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Denominacion Fin Actualizado");
            }
            else {
                CRUDDenominacionFin = "error"
                console.log("no se pudo actualizar");
            }
            FnAlertaDenominacionFin();
            FnJsAjaxRFinCaja();
        }
    });
}

function FnAlertaDenominacionFin() {
    switch (CRUDDenominacionFin) {
        case "C":
            VarJsColorAlertDenominacionFin = "bg-success";
            VarJsTextoAlertDenominacionFin = "Creado";
            break;
        case "U":
            VarJsColorAlertDenominacionFin = "bg-warning";
            VarJsTextoAlertDenominacionFin = "Actualizado";
            break;
        case "D":
            VarJsColorAlertDenominacionFin = "bg-danger";
            VarJsTextoAlertDenominacionFin = "Eliminado";
            break;
        case "Error":
            VarJsColorAlertDenominacionFin = "bg-secondary";
            VarJsTextoAlertDenominacionFin = "No se pudo realizar la operación";
            break;
        default:
            console.log("Error CUD DenominacionFin Alert");
    }
    FnJsAjaxRDenominacionFin();
    $('.bd-example-modal-sm .modal-content').addClass(VarJsColorAlertDenominacionFin);
    $('.bd-example-modal-sm h5').text(VarJsTextoAlertDenominacionFin);
    $('.bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.bd-example-modal-sm').modal('hide');
        $('.bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertDenominacionFin);
    }, 500);



}