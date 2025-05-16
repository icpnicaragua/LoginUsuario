var tablaProveedor;
var tablaProveedorNPersona;
var tablaProveedorNEmpresa;
var ModCProveedor = $('#modalNProveedor');

var VarJsProveedorId = 0;
var VarJsNombre = "";
var VarJsPlazoCredito = "";

var VarJsEP = "";
var VarJsIdPersona = 0;
var VarJsIdEmpresa = 0;

var formProveedor = document.querySelector('#form1');

var CRUDProveedor = "";
var EProveedor = true;

var VarJsColorAlertProveedor = "";
var VarJsTextoAlertProveedor = "";

$('#lbMostrarProveedor').click(function (e) {
    e.preventDefault();
    FnJsAjaxRProveedor(); 
});

function FnJsAjaxRProveedor() {
    $.ajax({
        type: "POST",
        url: "/modulo2/VstProveedor.aspx/FnRProveedorV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowProveedor(data.d);
        }
    }
    );
}

function AddrowProveedor(data) {
    $('#tblProveedor').DataTable().clear().destroy();

    tablaProveedor = $("#tblProveedor").DataTable({
        "retrieve": true,
        dom: 'Bfrtip',
        "order": [1, 'asc'],
        "columnDefs": [
            { "targets": 4, "searchable": false },
            { "orderable": false, "targets": 4 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colProveedor'
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
                filename: 'Proveedores' + "_" + FnJsDate() + "_" + FnJsHour(),
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
                                    text: 'Proveedor',
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Proveedor'
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
                filename: 'Proveedores' + "_" + FnJsDate() + "_" + FnJsHour(),
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
    tablaProveedor.buttons().container().addClass('form-inline');
    for (var contProveedor = 0; contProveedor < data.length; contProveedor++) {
        tablaProveedor.row.add([
            data[contProveedor].IdProveedor,
            data[contProveedor].Nombre,
            data[contProveedor].EP,
            data[contProveedor].PlazoCredito,                             
            '<button value="editar" href="#modalNProveedor" data-toggle="modal" title="editar" class="btn btn-warning  btn-editProveedor"><i class="fas fa-pencil-alt"></i> </button>' +
            '<button value="eliminar" href="#modalNProveedor" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteProveedor"><i class="fa fa-trash" ></i> </button>'
        ]
        ).draw(false);
    }
}

$('#lbNProveedorPersona').click(function (e) {
    e.preventDefault();
    FnJsAjaxRProveedorNPersona();
});
$('#lbNProveedorEmpresa').click(function (e) {
    e.preventDefault();
    FnJsAjaxRProveedorNEmpresa();
});

function FnJsAjaxRProveedorNPersona() {
    $.ajax({
        type: "POST",
        url: "/modulo2/VstProveedor.aspx/FnRProveedorNPersonaV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowProveedorNPersona(data.d);
        }
    }
    );
}
function FnJsAjaxRProveedorNEmpresa() {
    $.ajax({
        type: "POST",
        url: "/modulo2/VstProveedor.aspx/FnRProveedorNEmpresaV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowProveedorNEmpresa(data.d);
        }
    }
    );
}
function AddrowProveedorNPersona(data) {
    $('#tblProveedorNPersona').DataTable().clear().destroy();

    tablaProveedorNPersona = $("#tblProveedorNPersona").DataTable({
        "retrieve": true,
        dom: 'Bfrtip',
        "order": [1, 'asc'],
        "columnDefs": [
            { "targets": 3, "searchable": false },
            { "orderable": false, "targets": 3 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colProveedorNPersona'
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
                filename: 'Lista_Posibles_Proveedores' + "_" + FnJsDate() + "_" + FnJsHour(),
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
                                    text: 'Posibles_Proveedores',
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte_Posibles_Proveedores'
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
                filename: 'Lista_Posibles_Proveedores' + "_" + FnJsDate() + "_" + FnJsHour(),
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
    tablaProveedorNPersona.buttons().container().addClass('form-inline');
    for (var contProveedorNPersona = 0; contProveedorNPersona < data.length; contProveedorNPersona++) {
        tablaProveedorNPersona.row.add([
            data[contProveedorNPersona].ObjPersona.IdPersona,
            data[contProveedorNPersona].ObjPersona.Nombre1,
            data[contProveedorNPersona].ObjPersona.Apellido1,
            '<button value="Add" href="#modalNProveedor" data-toggle="modal" title="Add" class="btn btn-success  btn-AddProveedorNPersona"><i class="fas fa-plus"></i> </button>'
        ]
        ).draw(false);
    }
}
function AddrowProveedorNEmpresa(data) {
    $('#tblProveedorNEmpresa').DataTable().clear().destroy();

    tablaProveedorNEmpresa = $("#tblProveedorNEmpresa").DataTable({
        "retrieve": true,
        dom: 'Bfrtip',
        "order": [1, 'asc'],
        "columnDefs": [
            { "targets": 4, "searchable": false },
            { "orderable": false, "targets": 4 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colProveedorNEmpresa'
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
                filename: 'Lista_Posibles_Proveedores' + "_" + FnJsDate() + "_" + FnJsHour(),
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
                                    text: 'Posibles_Proveedores',
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte_Posibles_Proveedores'
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
                filename: 'Lista_Posibles_Proveedores' + "_" + FnJsDate() + "_" + FnJsHour(),
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
    tablaProveedorNEmpresa.buttons().container().addClass('form-inline');
    for (var contProveedorNEmpresa = 0; contProveedorNEmpresa < data.length; contProveedorNEmpresa++) {
        tablaProveedorNEmpresa.row.add([
            data[contProveedorNEmpresa].ObjEmpresa.IdEmpresa,
            data[contProveedorNEmpresa].ObjEmpresa.NombreComercial,
            data[contProveedorNEmpresa].ObjEmpresa.RazonSocial,
            data[contProveedorNEmpresa].ObjEmpresa.Ruc,
            '<button value="Add" href="#modalNProveedor" data-toggle="modal" title="Add" class="btn btn-success  btn-AddProveedorNEmpresa"><i class="fas fa-plus"></i> </button>'
        ]
        ).draw(false);
    }
}

$(document).on('click', '.btn-AddProveedorNPersona', function (e) {
    e.preventDefault();
    FnJsCProveedor();
    var dataProveedorNPersona = tablaProveedorNPersona.row($(this).parents("tr")).data();
    VarJsIdPersona = dataProveedorNPersona[0];
    VarJsIdEmpresa = 0;
    VarJsNombre = dataProveedorNPersona[1] + ' ' + dataProveedorNPersona[2];
    $('#txtNuevoNombre').val(dataProveedorNPersona[1] + ' ' + dataProveedorNPersona[2]);
    VarJsPlazoCredito = "";   
  
    VarJsProveedorId = 0;
    EProveedor = true;
    FnJsBlockProveedor();
    CRUDProveedor = "C";
});

$(document).on('click', '.btn-AddProveedorNEmpresa', function (e) {
    e.preventDefault();
    FnJsCProveedor();
    var dataProveedorNEmpresa = tablaProveedorNEmpresa.row($(this).parents("tr")).data();
    VarJsIdEmpresa = dataProveedorNEmpresa[0];
    VarJsIdPersona = 0;
    VarJsNombre = dataProveedorNEmpresa[1];
    $('#txtNuevoNombre').val(dataProveedorNEmpresa[1]);
    VarJsPlazoCredito = ""; 
    VarJsProveedorId = 0;
    FnJsBlockProveedor();
    CRUDProveedor = "C";
});

$(document).on('click', '.btn-editProveedor', function (e) {
    e.preventDefault();
    FnJsUProveedor();
    var dataProveedor = tablaProveedor.row($(this).parents("tr")).data();
    VarJsProveedorId = dataProveedor[0];
    $('#txtNuevoNombre').val(dataProveedor[1]);
    VarJsPlazoCredito = dataProveedor[3];
    $('#txtNuevoPlazoCredito').val(dataProveedor[3]); 

    CRUDProveedor = "U";
});
$(document).on('click', '.btn-deleteProveedor', function (e) {
    e.preventDefault();
    FnJsDProveedor();
    EProveedor = false;
    FnJsBlockProveedor();
    var dataProveedor = tablaProveedor.row($(this).parents("tr")).data();
    VarJsProveedorId = dataProveedor[0];
    $('#txtNuevoNombre').val(dataProveedor[1]);
    VarJsPlazoCredito = dataProveedor[3];
    $('#txtNuevoPlazoCredito').val(dataProveedor[3]);  
 
    CRUDProveedor = "D";
});


function FnJsCProveedor() {
    $('#lblexistenuevoProveedor').text("");

    $("#DivModBorProveedor").removeAttr("class");
    $("#DivModBorProveedor").attr('class', 'modal-content border-success');

    $("#DivModHeaProveedor").removeAttr("class");
    $("#DivModHeaProveedor").attr('class', 'modal-header bg-success');

    $('#H4ModTitProveedor').text('Nuevo Proveedor');

    $("#btnNueProveedor").removeAttr("class");
    $("#btnNueProveedor").attr('class', 'btn btn-success pull-right');
    $("#btnNueProveedor i").removeAttr("class");
    $("#btnNueProveedor i").attr("class", "fa fa-save fa-2x");
    
    $("#txtNuevoNombre").attr('disabled', true);
    $("#txtNuevoPlazoCredito").attr('disabled', false);
    $("#txtNuevoLimiteCredito").attr('disabled', false);

    $('#' + ModCProveedor[0].id + ' :text').val("");
}
function FnJsUProveedor() {
    $('#lblexistenuevoProveedor').text("");

    $("#DivModBorProveedor").removeAttr("class");
    $("#DivModBorProveedor").attr('class', 'modal-content border-warning');

    $("#DivModHeaProveedor").removeAttr("class");
    $("#DivModHeaProveedor").attr('class', 'modal-header bg-warning');

    $('#H4ModTitProveedor').text('Editar Proveedor');

    $("#btnNueProveedor").removeAttr("class");
    $("#btnNueProveedor").attr('class', 'btn btn-warning pull-right');
    $("#btnNueProveedor i").removeAttr("class");
    $("#btnNueProveedor i").attr("class", "fa fa-save fa-2x");

    $("#txtNuevoNombre").attr('disabled', true);
    $("#txtNuevoPlazoCredito").attr('disabled', false);
    $("#txtNuevoLimiteCredito").attr('disabled', false);

    $('#' + ModCProveedor[0].id + ' :text').val("");
}
function FnJsDProveedor() {
    $('#lblexistenuevoProveedor').text("");

    $("#DivModBorProveedor").removeAttr("class");
    $("#DivModBorProveedor").attr('class', 'modal-content border-danger');

    $("#DivModHeaProveedor").removeAttr("class");
    $("#DivModHeaProveedor").attr('class', 'modal-header bg-danger');

    $('#H4ModTitProveedor').text('Eliminar Proveedor');

    $("#btnNueProveedor").removeAttr("class");
    $("#btnNueProveedor").attr('class', 'btn btn-danger pull-right');
    $("#btnNueProveedor i").removeAttr("class");
    $("#btnNueProveedor i").attr("class", "fa fa-trash fa-2x");

    $("#txtNuevoNombre").attr('disabled', true);
    $("#txtNuevoPlazoCredito").attr('disabled', true);
    $("#txtNuevoLimiteCredito").attr('disabled', true);

    $('#' + ModCProveedor[0].id + ' :text').val("");
}

function FnJsBlockProveedor() {
    if (EProveedor == true) {
        $("#btnNueProveedor").fadeOut("fast");
        $("#btnNueProveedor").attr('disabled', true);
    }
    else if (EProveedor == false) {
        $("#btnNueProveedor").fadeIn("slow");
        $("#btnNueProveedor").attr('disabled', false);
    }
}


$('#btnNueProveedor').click(function (e) {
    e.preventDefault();
    if (formProveedor.checkValidity()) {
        switch (CRUDProveedor) {
            case "C":
                FnJsAjaxCProveedor();
                break;
            case "U":
                FnJsAjaxUProveedor();
                break;
            case "D":
                FnJsAjaxDProveedor();
                break;
            default:
                console.log("Error en cud Proveedor");
        }
    }
});

function FnJsAjaxCProveedor() {
    $.ajax({
        url: "/modulo2/VstProveedor.aspx/FnCProveedorV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({            
            PlazoCredito: VarJsPlazoCredito,         
            IdPersona: VarJsIdPersona,
            IdEmpresa: VarJsIdEmpresa
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Proveedor Agregado");
            }
            else {
                CRUDProveedor = "error"
                console.log("No se pudo agregar Proveedor");
            }
            FnAlertaProveedor();
        }
    });
}
function FnJsAjaxUProveedor() {
    $.ajax({
        url: "/modulo2/VstProveedor.aspx/FnUProveedorV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdProveedor: VarJsProveedorId,            
            PlazoCredito: VarJsPlazoCredito       
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Proveedor Actualizado");
            }
            else {
                CRUDProveedor = "error"
                console.log("no se pudo actualizar");
            }
            FnAlertaProveedor();
        }
    });
}
function FnJsAjaxDProveedor() {
    $.ajax({
        url: "/modulo2/VstProveedor.aspx/FnDProveedorV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdProveedor: VarJsProveedorId
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {

                console.log("Proveedor Eliminado");
            }
            else {

                CRUDProveedor = "error"
                console.log("No se pudo Eliminar Proveedor");
            }
            FnAlertaProveedor();
        }
    });
}
function VerificarExisteProveedor() {
    if ($('#txtNuevoPlazoCredito').val().length >= 1) {
        EProveedor = false;
    }
    else {
        EProveedor = true;
    }
    FnJsBlockProveedor();
}

$('#txtNuevoPlazoCredito').keyup(function (e) {
    VarJsPlazoCredito = $(this).val();
    VerificarExisteProveedor();
});

function FnAlertaProveedor() {

    switch (CRUDProveedor) {
        case "C":
            VarJsColorAlertProveedor = "bg-success";
            VarJsTextoAlertProveedor = "Creado";
            break;
        case "U":
            VarJsColorAlertProveedor = "bg-warning";
            VarJsTextoAlertProveedor = "Actualizado";
            break;
        case "D":
            VarJsColorAlertProveedor = "bg-danger";
            VarJsTextoAlertProveedor = "Eliminado";
            break;
        case "Error":
            VarJsColorAlertProveedor = "bg-secondary";
            VarJsTextoAlertProveedor = "No se pudo realizar la operación";
            break;
        default:
            console.log("Error CUD Proveedor Alert")
    }

    $('.bd-example-modal-sm .modal-content').addClass(VarJsColorAlertProveedor);
    $('.bd-example-modal-sm h5').text(VarJsTextoAlertProveedor);
    $('.bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.bd-example-modal-sm').modal('hide');
        $('.bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertProveedor);
    }, 1500);

    if ($("#secciontblProveedor.show").length > 0) {
        FnJsAjaxRProveedor();
        FnJsAjaxRProveedorNPersona();
        FnJsAjaxRProveedorNEmpresa();
    }
    $("#modalNProveedor").modal("toggle");
}