var tablaInicioCaja;
var ModCInicioCaja = $('#modalNInicioCaja');

var VarJsInicioCajaId = 0;
var VarJsFecha = "";
var VarJsHora = "";
var VarJsIdCajero = 0;

var VAlDDLInicioCajaCajero = "null";

var formInicioCaja = document.querySelector('#form1');

CRUDInicioCaja = "";

var VarJsColorAlertInicioCaja = "";
var VarJsTextoAlertInicioCaja = "";

var EInicioCaja = true;
var EFecha = true;

$("[data-mask]").inputmask();

$('#lbMostrarInicioCaja').click(function (e) {
    e.preventDefault();
    FnJsAjaxRInicioCaja();
    FnJSFillDdlInicioCajaCajero();
});

function FnJsAjaxRInicioCaja() {
    $.ajax({
        type: "POST",
        url: "/modulo1/VstInicioCaja.aspx/FnRInicioCajaV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowInicioCaja(data.d);
        }
    }
    );
}

function AddrowInicioCaja(data) {
    $('#tblInicioCaja').DataTable().clear().destroy();
    tablaInicioCaja = $("#tblInicioCaja").DataTable({
        "retrieve": true,
        dom: 'Bfrtip',
        "order": [2, 'desc'],
        "columnDefs": [
            { "targets": 4, "searchable": false },
            { "orderable": false, "targets": 4 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colInicioCaja'
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
                filename: 'InicioCaja' + "_" + FnJsDate() + "_" + FnJsHour(),
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
                                    text: 'InicioCaja',
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte InicioCaja'
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
                filename: 'InicioCaja' + "_" + FnJsDate() + "_" + FnJsHour(),
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
    tablaInicioCaja.buttons().container().addClass('form-inline');
    var Btn = '';
    for (var contInicioCaja = 0; contInicioCaja < data.length; contInicioCaja++) {
        Btn = '';
        if (data[contInicioCaja].Estado == 1 || data[contInicioCaja].Estado == 4 ) {
            Btn = '<button value="editar" href="#modalNInicioCaja" data-toggle="modal" title="editar" class="btn btn-warning  btn-editInicioCaja"><i class="fas fa-pencil-alt"></i> </button>' +
                '<button value="eliminar" href="#modalNInicioCaja" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteInicioCaja"><i class="fa fa-trash" ></i> </button>'
       }
        tablaInicioCaja.row.add([
            data[contInicioCaja].IdInicioCaja,
            data[contInicioCaja].ObjCajero.ObjPersona.Nombre1 + ' ' + data[contInicioCaja].ObjCajero.ObjPersona.Apellido1,
            data[contInicioCaja].Fecha,
            data[contInicioCaja].Hora,
            Btn
               ]
        ).draw(false);
    }
}

$('#lbNInicioCaja').click(function (e) {
    e.preventDefault();
    FnJsCInicioCaja();
    EInicioCaja = true;

    FnJsBlockInicioCaja();
    FnJSFillDdlInicioCajaCajero();
    CRUDInicioCaja = "C";

    VarJsInicioCajaId = 0;
    VarJsFecha = FnJsDateNow('/');
    VarJsHora = FnJsHourNow(':');
    $('#txtNuevoFecha').val(VarJsFecha); 
    $('#txtNuevoHora').val(VarJsHora);
    VarJsIdCajero = 0;
});

$(document).on('click', '.btn-editInicioCaja', function (e) {
    e.preventDefault();
    FnJsUInicioCaja();
    var dataInicioCaja = tablaInicioCaja.row($(this).parents("tr")).data();
    VarJsInicioCajaId = dataInicioCaja[0];
    $('#txtNuevoFecha').val(dataInicioCaja[2]);
    VarJsFecha = dataInicioCaja[2];
    $('#txtNuevoHora').val(dataInicioCaja[3]);
    VarJsHora = dataInicioCaja[3];
    VAlDDLInicioCajaCajero = (dataInicioCaja[1]);   
    FnJSFillDdlInicioCajaCajero();
    VarJsIdCajero = $('#ddlCInicioCajaCajero').val();    
       
    CRUDInicioCaja = "U";
});
$(document).on('click', '.btn-deleteInicioCaja', function (e) {
    e.preventDefault();
    FnJsDInicioCaja();
    EInicioCaja = false;

    FnJsBlockInicioCaja();
    var dataInicioCaja = tablaInicioCaja.row($(this).parents("tr")).data();
    VarJsInicioCajaId = dataInicioCaja[0];
    $('#txtNuevoFecha').val(dataInicioCaja[2]); 
    $('#txtNuevoHora').val(dataInicioCaja[3]);    
    VAlDDLInicioCajaCajero = (dataInicioCaja[1]);
    FnJSFillDdlInicioCajaCajero();
    VarJsIdCajero = $('#ddlCInicioCajaCajero').val();    

    CRUDInicioCaja = "D";
});

function FnJsCInicioCaja() {
    $('#lblexistenuevoInicioCaja').text("");

    $("#DivModBorInicioCaja").removeAttr("class");
    $("#DivModBorInicioCaja").attr('class', 'modal-content border-success');

    $("#DivModHeaInicioCaja").removeAttr("class");
    $("#DivModHeaInicioCaja").attr('class', 'modal-header bg-success');

    $('#H4ModTitInicioCaja').text('Nuevo InicioCaja');

    $("#btnNueInicioCaja").removeAttr("class");
    $("#btnNueInicioCaja").attr('class', 'btn btn-success pull-right');
    $("#btnNueInicioCaja i").removeAttr("class");
    $("#btnNueInicioCaja i").attr("class", "fa fa-save fa-2x");

    $("#ddlCInicioCajaCajero").removeAttr("class");
    $("#ddlCInicioCajaCajero").attr("class", "form-control border-success");

    $("#txtNuevoFecha").attr('disabled', true);
    $("#txtNuevoHora").attr('disabled', true);
    $('#ddlCInicioCajaCajero').attr('disabled', false);

    $('#' + ModCInicioCaja[0].id + ' :text').val("");
}
function FnJsUInicioCaja() {
    $('#lblexistenuevoInicioCaja').text("");

    $("#DivModBorInicioCaja").removeAttr("class");
    $("#DivModBorInicioCaja").attr('class', 'modal-content border-warning');

    $("#DivModHeaInicioCaja").removeAttr("class");
    $("#DivModHeaInicioCaja").attr('class', 'modal-header bg-warning');

    $('#H4ModTitInicioCaja').text('Editar InicioCaja');

    $("#btnNueInicioCaja").removeAttr("class");
    $("#btnNueInicioCaja").attr('class', 'btn btn-warning pull-right');
    $("#btnNueInicioCaja i").removeAttr("class");
    $("#btnNueInicioCaja i").attr("class", "fa fa-save fa-2x");

    $("#ddlCInicioCajaCajero").removeAttr("class");
    $("#ddlCInicioCajaCajero").attr("class", "form-control border-warning");

    $("#txtNuevoFecha").attr('disabled', true);
    $("#txtNuevoHora").attr('disabled', true);
    $('#ddlCInicioCajaCajero').attr('disabled', false);

    $('#' + ModCInicioCaja[0].id + ' :text').val("");
}
function FnJsDInicioCaja() {
    $('#lblexistenuevoInicioCaja').text("");

    $("#DivModBorInicioCaja").removeAttr("class");
    $("#DivModBorInicioCaja").attr('class', 'modal-content border-danger');

    $("#DivModHeaInicioCaja").removeAttr("class");
    $("#DivModHeaInicioCaja").attr('class', 'modal-header bg-danger');

    $('#H4ModTitInicioCaja').text('Eliminar InicioCaja');

    $("#btnNueInicioCaja").removeAttr("class");
    $("#btnNueInicioCaja").attr('class', 'btn btn-danger pull-right');
    $("#btnNueInicioCaja i").removeAttr("class");
    $("#btnNueInicioCaja i").attr("class", "fa fa-trash fa-2x");

    $("#ddlCInicioCajaCajero").removeAttr("class");
    $("#ddlCInicioCajaCajero").attr("class", "form-control border-danger");

    $("#txtNuevoFecha").attr('disabled', true);
    $("#txtNuevoHora").attr('disabled', true);
    $('#ddlCInicioCajaCajero').attr('disabled', true);

    $('#' + ModCInicioCaja[0].id + ' :text').val("");
}


function FnJsBlockInicioCaja() {
    if (EInicioCaja == true) {
        $("#btnNueInicioCaja").fadeOut("fast");
        $("#btnNueInicioCaja").attr('disabled', true);
    }
    else if (EInicioCaja == false && EFecha==false) {
        $("#btnNueInicioCaja").fadeIn("slow");
        $("#btnNueInicioCaja").attr('disabled', false);
    }
}


$('#btnNueInicioCaja').click(function (e) {
    e.preventDefault();
    if (formInicioCaja.checkValidity()) {
        switch (CRUDInicioCaja) {
            case "C":
                FnJsAjaxCInicioCaja();
                break;
            case "U":
                FnJsAjaxUInicioCaja();
                break;
            case "D":
                FnJsAjaxDInicioCaja();
                break;
            default:
                console.log("Error en cud InicioCaja");
        }
    }
});

function FnJsAjaxCInicioCaja() {
    $.ajax({
        url: "/modulo1/VstInicioCaja.aspx/FnCInicioCajaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            Fecha: VarJsFecha,
            Hora: VarJsHora,
            IdCajero: VarJsIdCajero
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Inicio de Caja Agregado");
            }
            else {
                CRUDInicioCaja = "error"
                console.log("No se pudo agregar Inicio de Caja");
            }
            FnAlertaInicioCaja();
        }
    });
}
function FnJsAjaxUInicioCaja() {
    $.ajax({
        url: "/modulo1/VstInicioCaja.aspx/FnUInicioCajaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdInicioCaja: VarJsInicioCajaId,           
            IdCajero: VarJsIdCajero
        }), 
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Inicio de Caja Actualizado");
            }
            else {
                CRUDInicioCaja = "error"
                console.log("no se pudo actualizar");
            }
            FnAlertaInicioCaja();
        }
    });
}
function FnJsAjaxDInicioCaja() {
    $.ajax({
        url: "/modulo1/VstInicioCaja.aspx/FnDInicioCajaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdInicioCaja: VarJsInicioCajaId
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {

                console.log("Inicio de Caja Eliminado");
            }
            else {

                CRUDInicioCaja = "error"
                console.log("No se pudo Eliminar Inicio de Caja");
            }
            FnAlertaInicioCaja();

        }
    });
}
function FnJsAjaxEInicioCaja() {
    $.ajax({
        url: "/modulo1/VstInicioCaja.aspx/FnEInicioCajaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({          
            Fecha: VarJsFecha,
            IdInicioCaja: VarJsInicioCajaId
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                EInicioCaja = true;
                $('#lblexistenuevoInicioCaja').text("Existe InicioCaja");
                FnJsBlockInicioCaja();
            }
            else {
                EInicioCaja = false;
                $('#lblexistenuevoInicioCaja').text("");
                FnJsBlockInicioCaja();
            }
        }
    });
}
function VerificarExisteInicioCaja() {
    if ($('#txtNuevoFecha').val().length > 0 && $('#txtNuevoHora').val().length > 0 && $('#ddlCInicioCajaCajero').val() > 0) {
        return true;
    }
    else {
        return false;
    }
}

$('#txtNuevoFecha').keyup(function (e) {
    VarJsFecha = $(this).val();

});

$('#ddlCInicioCajaCajero').change(function (e) {
    VarJsIdCajero = $('#ddlCInicioCajaCajero').val();
    if (VerificarExisteInicioCaja()) {
        FnJsAjaxEInicioCaja();
    }
    var actual = new Date();
    let d = $('#txtNuevoFecha').val().split("/");
    let dat = new Date(d[2] + '/' + d[1] + '/' + d[0]+' '+ '23:59:00');
    if (!isNaN(dat)) {
        if (actual >= dat) {
            EFecha = true;
            $('#lblexistenuevoFecha').text("Solo fechas futuras");
        }
        else {
            FnJsAjaxEInicioCaja();
            EFecha = false;
            $('#lblexistenuevoFecha').text("");
        }
        FnJsAjaxEInicioCaja();
        FnJsBlockInicioCaja();
    }
});
function FnJSFillDdlInicioCajaCajero() {
    $('#ddlCInicioCajaCajero').empty();
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnRCajeroV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLInicioCajaCajero == "null") {
                $('#ddlCInicioCajaCajero').append($("<option> </option>").val("0").html("Seleccionar Cajero"));
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLInicioCajaCajero == (value.ObjEmpleado.ObjPersona.Nombre1 + ' ' + value.ObjEmpleado.ObjPersona.Apellido1)) {
                        $('#ddlCInicioCajaCajero').append($("<option> </option>").val(value.ObjEmpleado.IdEmpleado).html(value.ObjEmpleado.ObjPersona.Nombre1 + ' ' + value.ObjEmpleado.ObjPersona.Apellido1));
                        VarJsIdCajero = value.ObjEmpleado.IdEmpleado;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCInicioCajaCajero').append($("<option> </option>").val(value.ObjEmpleado.IdEmpleado).html(value.ObjEmpleado.ObjPersona.Nombre1 + ' ' + value.ObjEmpleado.ObjPersona.Apellido1));
            });
            VAlDDLInicioCajaCajero = "null";
        }
    });
}
function FnAlertaInicioCaja() {

    switch (CRUDInicioCaja) {
        case "C":
            VarJsColorAlertInicioCaja = "bg-success";
            VarJsTextoAlertInicioCaja = "Creado";
            break;
        case "U":
            VarJsColorAlertInicioCaja = "bg-warning";
            VarJsTextoAlertInicioCaja = "Actualizado";
            break;
        case "D":
            VarJsColorAlertInicioCaja = "bg-danger";
            VarJsTextoAlertInicioCaja = "Eliminado";
            break;
        case "Error":
            VarJsColorAlertInicioCaja = "bg-secondary";
            VarJsTextoAlertInicioCaja = "No se pudo realizar la operación";
            break;
        default:
            console.log("Error CUD Inicio de Caja Alert");
    }
    $('.bd-example-modal-sm .modal-content').addClass(VarJsColorAlertInicioCaja);
    $('.bd-example-modal-sm h5').text(VarJsTextoAlertInicioCaja);
    $('.bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.bd-example-modal-sm').modal('hide');
        $('.bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertInicioCaja);
    }, 1500);
    if ($("#secciontblInicioCaja.show").length > 0) {
        FnJsAjaxRInicioCaja();    }

    $("#modalNInicioCaja").modal("toggle");
}