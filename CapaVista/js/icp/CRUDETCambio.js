var tablaTCambio;
var ModCTCambio = $('#modalNTCambio');

var VarJsTCambioId = 0;
var VarJsTCambio = "";
var VarJsFecha = "";
var VarJsIdMoneda = 0;

var VAlDDLTCambioMoneda = "null";

var formTCambio = document.querySelector('#form1');

CRUDTCambio = "";

var VarJsColorAlertTCambio = "";
var VarJsTextoAlertTCambio = "";

var ETCambio = true;
var EFecha = true;
$("[data-mask]").inputmask();

$('#lbMostrarTCambio').click(function (e) {
    e.preventDefault();
    FnJsAjaxRTCambio();
    FnJSFillDdlTCambioMoneda();
});

function FnJsAjaxRTCambio() {
    $.ajax({
        type: "POST",
        url: "/modulo1/VstTC.aspx/FnRTCambioV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowTCambio(data.d);
        }
    }
    );
}

function AddrowTCambio(data) {
    $('#tblTCambio').DataTable().clear().destroy();
    tablaTCambio = $("#tblTCambio").DataTable({
        "retrieve": true,
        dom: 'Bfrtip',
        "order": [[3, 'desc'], [2, 'asc']],
        "columnDefs": [
            { "targets": 4, "searchable": false },
            { "orderable": false, "targets": 4 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colTCambio'
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
                filename: 'TCambio' + "_" + FnJsDate() + "_" + FnJsHour(),
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
                                    text: 'TCambio',
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte TCambio'
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
                filename: 'TCambio' + "_" + FnJsDate() + "_" + FnJsHour(),
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
    tablaTCambio.buttons().container().addClass('form-inline');
    var Btn='';
    for (var contTCambio = 0; contTCambio < data.length; contTCambio++) {
        Btn = '';
        if (data[contTCambio].Editable) {
           Btn= '<button value="editar" href="#modalNTCambio" data-toggle="modal" title="editar" class="btn btn-warning  btn-editTCambio"><i class="fas fa-pencil-alt"></i> </button>' +
                '<button value="eliminar" href="#modalNTCambio" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteTCambio"><i class="fa fa-trash" ></i> </button>'
        }
        tablaTCambio.row.add([
            data[contTCambio].IdTCambio,
            data[contTCambio].TCambio,
            data[contTCambio].ObjMoneda.Moneda,
            data[contTCambio].Fecha,
           Btn
                 ]
        ).draw(false);
    }
}

$('#lbNTCambio').click(function (e) {
    e.preventDefault();
    FnJsCTCambio();
    ETCambio = true;

    FnJsBlockTCambio();
    FnJSFillDdlTCambioMoneda();
    CRUDTCambio = "C";

    VarJsTCambioId = 0;
    VarJsTCambio = "";
    VarJsFecha = "";
    VarJsIdMoneda = 0;

});

$(document).on('click', '.btn-AddTCambio', function (e) {
    e.preventDefault();
    ETCambio = true;
    FnJsCTCambio();
    VarJsTCambioId = 0;
    VarJsTCambio = "";
    VarJsFecha = "";
    tablaMoneda = $("#tblMoneda").DataTable();
    var dataMoneda = tablaMoneda.row($(this).parents("tr")).data();
    VAlDDLTCambioMoneda = (dataMoneda[1]);
    FnJSFillDdlTCambioMoneda();
    VarJsIdMoneda = $('#ddlCTCambioMoneda').val();
    CRUDTCambio = "C";
});

$(document).on('click', '.btn-editTCambio', function (e) {
    e.preventDefault();
    FnJsUTCambio();
    var dataTCambio = tablaTCambio.row($(this).parents("tr")).data();
    VarJsTCambioId = dataTCambio[0];
    $('#txtNuevoTCambio').val(dataTCambio[1]);
    VarJsTCambio = dataTCambio[1];
    // let d = dataTCambio[3].split("/");
    //let dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);      
    //document.getElementById('txtNuevoFecha').value = dat; 
    $('#txtNuevoFecha').val(dataTCambio[3]);
    VarJsFecha = dataTCambio[3];
    VAlDDLTCambioMoneda = (dataTCambio[2]);
    FnJSFillDdlTCambioMoneda();
    VarJsIdMoneda = $('#ddlCTCambioMoneda').val();
    CRUDTCambio = "U";
});
$(document).on('click', '.btn-deleteTCambio', function (e) {
    e.preventDefault();
    FnJsDTCambio();
    ETCambio = false;

    FnJsBlockTCambio();
    var dataTCambio = tablaTCambio.row($(this).parents("tr")).data();
    VarJsTCambioId = dataTCambio[0];
    $('#txtNuevoTCambio').val(dataTCambio[1]);
    VarJsTCambio = dataTCambio[1];
    $('#txtNuevoFecha').val(dataTCambio[3]);
    VarJsFecha = dataTCambio[3];
    VAlDDLTCambioMoneda = (dataTCambio[2]);
    FnJSFillDdlTCambioMoneda();

    CRUDTCambio = "D";
});


function FnJsCTCambio() {
    $('#lblexistenuevoTCambio').text("");

    $("#DivModBorTCambio").removeAttr("class");
    $("#DivModBorTCambio").attr('class', 'modal-content border-success');

    $("#DivModHeaTCambio").removeAttr("class");
    $("#DivModHeaTCambio").attr('class', 'modal-header bg-success');

    $('#H4ModTitTCambio').text('Nuevo TCambio');

    $("#btnNueTCambio").removeAttr("class");
    $("#btnNueTCambio").attr('class', 'btn btn-success pull-right');
    $("#btnNueTCambio i").removeAttr("class");
    $("#btnNueTCambio i").attr("class", "fa fa-save fa-2x");

    $("#ddlCTCambioMoneda").removeAttr("class");
    $("#ddlCTCambioMoneda").attr("class", "form-control border-success");

    $("#txtNuevoTCambio").attr('disabled', false);
    $("#txtNuevoFecha").attr('disabled', false);
    $('#ddlCTCambioMoneda').attr('disabled', false);

    $('#' + ModCTCambio[0].id + ' :text').val("");

}
function FnJsUTCambio() {
    $('#lblexistenuevoTCambio').text("");

    $("#DivModBorTCambio").removeAttr("class");
    $("#DivModBorTCambio").attr('class', 'modal-content border-warning');

    $("#DivModHeaTCambio").removeAttr("class");
    $("#DivModHeaTCambio").attr('class', 'modal-header bg-warning');

    $('#H4ModTitTCambio').text('Editar TCambio');

    $("#btnNueTCambio").removeAttr("class");
    $("#btnNueTCambio").attr('class', 'btn btn-warning pull-right');
    $("#btnNueTCambio i").removeAttr("class");
    $("#btnNueTCambio i").attr("class", "fa fa-save fa-2x");

    $("#ddlCTCambioMoneda").removeAttr("class");
    $("#ddlCTCambioMoneda").attr("class", "form-control border-warning");

    $("#txtNuevoTCambio").attr('disabled', false);
    $("#txtNuevoFecha").attr('disabled', false);
    $('#ddlCTCambioMoneda').attr('disabled', false);

    $('#' + ModCTCambio[0].id + ' :text').val("");
}
function FnJsDTCambio() {
    $('#lblexistenuevoTCambio').text("");

    $("#DivModBorTCambio").removeAttr("class");
    $("#DivModBorTCambio").attr('class', 'modal-content border-danger');

    $("#DivModHeaTCambio").removeAttr("class");
    $("#DivModHeaTCambio").attr('class', 'modal-header bg-danger');

    $('#H4ModTitTCambio').text('Eliminar TCambio');

    $("#btnNueTCambio").removeAttr("class");
    $("#btnNueTCambio").attr('class', 'btn btn-danger pull-right');
    $("#btnNueTCambio i").removeAttr("class");
    $("#btnNueTCambio i").attr("class", "fa fa-trash fa-2x");

    $("#ddlCTCambioMoneda").removeAttr("class");
    $("#ddlCTCambioMoneda").attr("class", "form-control border-danger");

    $("#txtNuevoTCambio").attr('disabled', true);
    $("#txtNuevoFecha").attr('disabled', true);
    $('#ddlCTCambioMoneda').attr('disabled', true);

    $('#' + ModCTCambio[0].id + ' :text').val("");
}


function FnJsBlockTCambio() {
    if (ETCambio == true ) {
        $("#btnNueTCambio").fadeOut("fast");
        $("#btnNueTCambio").attr('disabled', true);
    }
    else if (ETCambio == false && EFecha==false) {
        $("#btnNueTCambio").fadeIn("slow");
        $("#btnNueTCambio").attr('disabled', false);
    }
}


$('#btnNueTCambio').click(function (e) {
    e.preventDefault();
    if (formTCambio.checkValidity()) {
        switch (CRUDTCambio) {
            case "C":
                FnJsAjaxCTCambio();
                break;
            case "U":
                FnJsAjaxUTCambio();
                break;
            case "D":
                FnJsAjaxDTCambio();
                break;
            default:
                console.log("Error en cud TCambio");
        }
    }
});

function FnJsAjaxCTCambio() {
    $.ajax({
        url: "/modulo1/VstTC.aspx/FnCTCambioV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            TCambio: VarJsTCambio,
            IdMoneda: VarJsIdMoneda,
            Fecha: VarJsFecha
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Tipo de Cambio Agregado");
            }
            else {
                CRUDTCambio = "error"
                console.log("No se pudo agregar Tipo de Cambio");
            }
            FnAlertaTCambio();
        }
    });
}
function FnJsAjaxUTCambio() {
    $.ajax({
        url: "/modulo1/VstTC.aspx/FnUTCambioV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdTCambio: VarJsTCambioId,
            TCambio: VarJsTCambio,
            IdMoneda: VarJsIdMoneda,
            Fecha: VarJsFecha

        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Tipo de Cambio Actualizado");
            }
            else {
                CRUDTCambio = "error"
                console.log("no se pudo actualizar");
            }
            FnAlertaTCambio();
        }
    });
}
function FnJsAjaxDTCambio() {
    $.ajax({
        url: "/modulo1/VstTC.aspx/FnDTCambioV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdTCambio: VarJsTCambioId
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {

                console.log("Tipo de Cambio Eliminado");
            }
            else {

                CRUDTCambio = "error"
                console.log("No se pudo Eliminar Tipo de Cambio");
            }
            FnAlertaTCambio();

        }
    });
}
function FnJsAjaxETCambio() {
    $.ajax({
        url: "/modulo1/VstTC.aspx/FnETCambioV",
        contentType: 'application/json; charser=utf-8',

        data: JSON.stringify({
            IdTCambio: VarJsTCambioId,
            Fecha: VarJsFecha,
            IdMoneda: VarJsIdMoneda
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                ETCambio = true;
                $('#lblexistenuevoTCambio').text("Existe TCambio");
                FnJsBlockTCambio();
            }
            else {
                ETCambio = false;
                $('#lblexistenuevoTCambio').text("");
                FnJsBlockTCambio();
            }
        }
    });
}
function VerificarExisteTCambio() {
    if ($('#txtNuevoTCambio').val().length > 0 && $('#txtNuevoFecha').val().length > 0 && $('#ddlCTCambioMoneda').val() > 0) {
        return true;
    }
    else {
        return false;
    }
}

$('#txtNuevoTCambio').keyup(function (e) {
    VarJsTCambio = $(this).val();
    if (VerificarExisteTCambio()) {
        FnJsAjaxETCambio();
    }
});


$('#txtNuevoFecha').keyup(function (e) {
    VarJsFecha = $(this).val(); 
    var actual = new Date();
    let d = $('#txtNuevoFecha').val().split("/");
    let dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);     
    if (!isNaN(dat)) {       
        if (actual > dat) {
            EFecha = true;           
            $('#lblFechaAnterior').text("Solo fechas futuras");          
        }
        else {     
            FnJsAjaxETCambio();
            EFecha = false;                 
            $('#lblFechaAnterior').text("");         
        }
        FnJsAjaxETCambio();
        FnJsBlockTCambio();
    }       
});

$('#ddlCTCambioMoneda').change(function (e) {
    VarJsIdMoneda = $('#ddlCTCambioMoneda').val();
    if (VerificarExisteTCambio()) {
        FnJsAjaxETCambio();
    }
});

function FnJSFillDdlTCambioMoneda() {
    $('#ddlCTCambioMoneda').empty();
    $.ajax({
        type: "POST",
        url: "/modulo1/VstTC.aspx/FnRMonedaV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLTCambioMoneda == "null") {
                $('#ddlCTCambioMoneda').append($("<option> </option>").val("0").html("Seleccionar Moneda"));
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLTCambioMoneda == value.Moneda) {
                        $('#ddlCTCambioMoneda').append($("<option> </option>").val(value.IdMoneda).html(value.Moneda));
                        VarJsIdMoneda = value.IdMoneda;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCTCambioMoneda').append($("<option> </option>").val(value.IdMoneda).html(value.Moneda));
            });
            VAlDDLTCambioMoneda = "null";
        }
    });
}

function FnAlertaTCambio() {

    switch (CRUDTCambio) {
        case "C":
            VarJsColorAlertTCambio = "bg-success";
            VarJsTextoAlertTCambio = "Creado";
            break;
        case "U":
            VarJsColorAlertTCambio = "bg-warning";
            VarJsTextoAlertTCambio = "Actualizado";
            break;
        case "D":
            VarJsColorAlertTCambio = "bg-danger";
            VarJsTextoAlertTCambio = "Eliminado";
            break;
        case "Error":
            VarJsColorAlertTCambio = "bg-secondary";
            VarJsTextoAlertTCambio = "No se pudo realizar la operación";
            break;
        default:
            console.log("Error CUD Tipo de Cambio Alert");
    }

    $('.bd-example-modal-sm .modal-content').addClass(VarJsColorAlertTCambio);
    $('.bd-example-modal-sm h5').text(VarJsTextoAlertTCambio);
    $('.bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.bd-example-modal-sm').modal('hide');
        $('.bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertTCambio);
    }, 1500);

    if ($("#secciontblTCambio.show").length > 0) {
        FnJsAjaxRTCambio();
    }

    $("#modalNTCambio").modal("toggle");
}