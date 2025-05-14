
var tablaTelefonoEmpresa;
var ModCTelefonoEmpresa = $('#modalNTelefonoEmpresa'); 

var VarJsTelefonoEmpresaId = 0;
var VarJsTelefonoEmpresa = "";
var VarJsIdTipoTelefonoEmpresa = 0;
var VarJsIdEmpresa = 0;

var VAlDDLTelefonoEmpresaTipoTelefonoEmpresa = "null";

var formTelefonoEmpresa = document.querySelector('#form1');

CRUDTelefonoEmpresa = "";

var VarJsColorAlertTelefonoEmpresa = "";
var VarJsTextoAlertTelefonoEmpresa = "";

var ETelefonoEmpresa = true;

$('#tblEmpresa tbody').on('click', 'tr', function () {
    var tablaEmpresa = $('#tblEmpresa').DataTable();
    VarJsIdEmpresa = tablaEmpresa.row(this).data()[0];
    FnJsAjaxRTelefonoEmpresa();
    FnJSFillDdlTelefonoEmpresaTipoTelefonoEmpresa();
    $("#DatosEmpresa").attr('class', 'row collapse show');
})
function FnJsAjaxRTelefonoEmpresa() { 
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnRTelefonoEmpresaV", 
        data: JSON.stringify({
            IdEmpresa: VarJsIdEmpresa
        }), 
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowTelefonoEmpresa(data.d); 
        }
    }
    );
}
function AddrowTelefonoEmpresa(data) {

    $('#tblTelefonoEmpresa').DataTable().clear().destroy(); 

    tablaTelefonoEmpresa = $("#tblTelefonoEmpresa").DataTable({
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
                    id: 'colTelefono'
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
                filename: 'Teléfono' + "_" + FnJsDate() + "_" + FnJsHour(),
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
                                    text: 'Teléfono', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Teléfono' //tttt
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
                filename: 'Teléfono' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
                text: '<i class="far fa-file-excel fa-2x"></i>',
                className: 'btn btn-success d-none d-lg-block',
                exportOptions: {
                    columns: [':not(:eq(3)):visible'] // index de controles xxxx para no mostrar inicia en 0
                },
                titleAttr: 'Excel',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')

                }

            }
        ],
        "language": FnJsEspTbl()
    });
    tablaTelefonoEmpresa.buttons().container().addClass('form-inline');

    for (var contTelefonoEmpresa = 0; contTelefonoEmpresa < data.length; contTelefonoEmpresa++) { 
        tablaTelefonoEmpresa.row.add([
            data[contTelefonoEmpresa].IdTelefono,
            data[contTelefonoEmpresa].Telefono,
            data[contTelefonoEmpresa].ObjTipoTelefono.TipoTelefono,
            '<button value="editar" href="#modalNTelefonoEmpresa" data-toggle="modal" title="editar" class="btn btn-warning  btn-editTelefonoEmpresa"><i class="fas fa-pencil-alt"></i> </button>' +
            '<button value="eliminar" href="#modalNTelefonoEmpresa" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteTelefonoEmpresa"><i class="fa fa-trash" ></i> </button>'
        ]
        ).draw(false);
    }
}

$('#lbNTelefonoEmpresa').click(function (e) {
    e.preventDefault();
    FnJsCTelefonoEmpresa(); 
    ETelefonoEmpresa = true; 

    FnJsBlockTelefonoEmpresa(); 
    FnJSFillDdlTelefonoEmpresaTipoTelefonoEmpresa();
    CRUDTelefonoEmpresa = "C"; 
        
    VarJsTelefonoEmpresaId = 0; 
    VarJsTelefonoEmpresa = ""; 
    VarJsIdTipoTelefonoEmpresa = 0;
});
$(document).on('click', '.btn-editTelefonoEmpresa', function (e) {
    e.preventDefault();
    FnJsUTelefonoEmpresa();
    var dataTelefonoEmpresa = tablaTelefonoEmpresa.row($(this).parents("tr")).data();
    VarJsTelefonoEmpresaId = dataTelefonoEmpresa[0]; 
    $('#txtNuevoTelefonoEmpresa').val(dataTelefonoEmpresa[1]);
    VarJsTelefonoEmpresa = dataTelefonoEmpresa[1]; 
    VAlDDLTelefonoEmpresaTipoTelefonoEmpresa = (dataTelefonoEmpresa[2]);
    FnJSFillDdlTelefonoEmpresaTipoTelefonoEmpresa();
    VarJsIdTipoTelefonoEmpresa = $('#ddlCTelefonoEmpresaTipoTelefonoEmpresa').val();    
    CRUDTelefonoEmpresa = "U";
});
$(document).on('click', '.btn-deleteTelefonoEmpresa', function (e) {
    e.preventDefault();
    FnJsDTelefonoEmpresa();
    ETelefonoEmpresa = false; 


    FnJsBlockTelefonoEmpresa();
    var dataTelefonoEmpresa = tablaTelefonoEmpresa.row($(this).parents("tr")).data();
    VarJsTelefonoEmpresaId = dataTelefonoEmpresa[0]; 
    $('#txtNuevoTelefonoEmpresa').val(dataTelefonoEmpresa[1]);
    VarJsTelefonoEmpresa = dataTelefonoEmpresa[1]; 
    VAlDDLTelefonoEmpresaTipoTelefonoEmpresa = (dataTelefonoEmpresa[2]);
    FnJSFillDdlTelefonoEmpresaTipoTelefonoEmpresa();

    CRUDTelefonoEmpresa = "D";
});
function FnJsCTelefonoEmpresa() { 

    $('#lblexistenuevoTelefonoEmpresa').text(""); 

    $("#DivModBorTelefonoEmpresa").removeAttr("class");
    $("#DivModBorTelefonoEmpresa").attr('class', 'modal-content border-success');

    $("#DivModHeaTelefonoEmpresa").removeAttr("class");
    $("#DivModHeaTelefonoEmpresa").attr('class', 'modal-header bg-success');

    $('#H4ModTitTelefonoEmpresa').text('Nuevo Teléfono');

    $("#btnNueTelefonoEmpresa").removeAttr("class");
    $("#btnNueTelefonoEmpresa").attr('class', 'btn btn-success pull-right');
    $("#btnNueTelefonoEmpresa i").removeAttr("class");
    $("#btnNueTelefonoEmpresa i").attr("class", "fa fa-save fa-2x");

    $("#ddlCTelefonoEmpresaTipoTelefonoEmpresa").removeAttr("class"); 
    $("#ddlCTelefonoEmpresaTipoTelefonoEmpresa").attr("class", "form-control border-success");

    $("#txtNuevoTelefonoEmpresa").attr('disabled', false); 
    $('#ddlCTelefonoEmpresaTipoTelefonoEmpresa').attr('disabled', false);

    $('#' + ModCTelefonoEmpresa[0].id + ' :text').val(""); 
}
function FnJsUTelefonoEmpresa() { 

    $('#lblexistenuevoTelefonoEmpresa').text(""); 

    $("#DivModBorTelefonoEmpresa").removeAttr("class");
    $("#DivModBorTelefonoEmpresa").attr('class', 'modal-content border-warning');

    $("#DivModHeaTelefonoEmpresa").removeAttr("class");
    $("#DivModHeaTelefonoEmpresa").attr('class', 'modal-header bg-warning');

    $('#H4ModTitTelefonoEmpresa').text('Editar Teléfono');

    $("#btnNueTelefonoEmpresa").removeAttr("class");
    $("#btnNueTelefonoEmpresa").attr('class', 'btn btn-warning pull-right');
    $("#btnNueTelefonoEmpresa i").removeAttr("class");
    $("#btnNueTelefonoEmpresa i").attr("class", "fa fa-save fa-2x");
  
    $("#ddlCTelefonoEmpresaTipoTelefonoEmpresa").removeAttr("class");
    $("#ddlCTelefonoEmpresaTipoTelefonoEmpresa").attr("class", "form-control border-warning");
 
    $("#txtNuevoTelefonoEmpresa").attr('disabled', false); 
    $('#ddlCTelefonoEmpresaTipoTelefonoEmpresa').attr('disabled', false);
 
    $('#' + ModCTelefonoEmpresa[0].id + ' :text').val(""); 
}
function FnJsDTelefonoEmpresa() { 
  
    $('#lblexistenuevoTelefonoEmpresa').text(""); 

    $("#DivModBorTelefonoEmpresa").removeAttr("class");
    $("#DivModBorTelefonoEmpresa").attr('class', 'modal-content border-danger');

    $("#DivModHeaTelefonoEmpresa").removeAttr("class");
    $("#DivModHeaTelefonoEmpresa").attr('class', 'modal-header bg-danger');
 
    $('#H4ModTitTelefonoEmpresa').text('Eliminar Teléfono');
 
    $("#btnNueTelefonoEmpresa").removeAttr("class");
    $("#btnNueTelefonoEmpresa").attr('class', 'btn btn-danger pull-right');
    $("#btnNueTelefonoEmpresa i").removeAttr("class");
    $("#btnNueTelefonoEmpresa i").attr("class", "fa fa-trash fa-2x");
  
    $("#ddlCTelefonoEmpresaTipoTelefonoEmpresa").removeAttr("class"); 
    $("#ddlCTelefonoEmpresaTipoTelefonoEmpresa").attr("class", "form-control border-danger");

    $("#txtNuevoTelefonoEmpresa").attr('disabled', true);
    $('#ddlCTelefonoEmpresaTipoTelefonoEmpresa').attr('disabled', true);
   
    $('#' + ModCTelefonoEmpresa[0].id + ' :text').val(""); 
}

function FnJsBlockTelefonoEmpresa() {
    if (ETelefonoEmpresa == true) {
        $("#btnNueTelefonoEmpresa").fadeOut("fast"); 
        $("#btnNueTelefonoEmpresa").attr('disabled', true);  
    }
    else if (ETelefonoEmpresa == false) {
        $("#btnNueTelefonoEmpresa").fadeIn("slow");
        $("#btnNueTelefonoEmpresa").attr('disabled', false);  
    }
}

$('#btnNueTelefonoEmpresa').click(function (e) {
    e.preventDefault();
    if (formTelefonoEmpresa.checkValidity()) {
        switch (CRUDTelefonoEmpresa) { 
            case "C":
                FnJsAjaxCTelefonoEmpresa(); 
                break;
            case "U":
                FnJsAjaxUTelefonoEmpresa();
                break;
            case "D":
                FnJsAjaxDTelefonoEmpresa();
                break;
            default:
                console.log("Error en cud Teléfono");
        }
    }
    console.log(formTelefonoEmpresa.checkValidity());
});

function FnJsAjaxCTelefonoEmpresa() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnCTelefonoEmpresaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            Telefono: VarJsTelefonoEmpresa,
            IdTipoTelefono: VarJsIdTipoTelefonoEmpresa,
            IdEmpresa: VarJsIdEmpresa
        }), 
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {            
                console.log("Teléfono Agregado");      
            }
            else {              
                CRUDTelefonoEmpresa = "error"
                console.log("No se pudo agregar Teléfono");
            }
            FnAlertaTelefonoEmpresa(); 
        }
    });//ajax fin
}
function FnJsAjaxUTelefonoEmpresa() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnUTelefonoV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdTelefono: VarJsTelefonoEmpresaId,
            Telefono: VarJsTelefonoEmpresa,
            IdTipoTelefono: VarJsIdTipoTelefonoEmpresa
        }), 
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {              
                console.log("Teléfono Actualizado"); 
            }
            else {                
                CRUDTelefonoEmpresa = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaTelefonoEmpresa();
        }
    });
}
function FnJsAjaxDTelefonoEmpresa() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnDTelefonoV", 
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdTelefono: VarJsTelefonoEmpresaId
        }), 
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {               
                console.log("Teléfono Eliminado"); 
            }
            else {               
                CRUDTelefonoEmpresa = "error"
                console.log("No se pudo Eliminar Teléfono");
            }
            FnAlertaTelefonoEmpresa(); 
        }
    });
}


function FnJsAjaxETelefonoEmpresa() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnETelefonoEmpresaV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdTelefono: VarJsTelefonoEmpresaId,
            Telefono: VarJsTelefonoEmpresa,
            IdTipoTelefono: VarJsIdTipoTelefonoEmpresa,
            IdEmpresa: VarJsIdEmpresa
        }), 
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {               
                ETelefonoEmpresa = true; 
                $('#lblexistenuevoTelefonoEmpresa').text("Existe Teléfono");
                FnJsBlockTelefonoEmpresa();
            }
            else {             
                ETelefonoEmpresa = false;
                $('#lblexistenuevoTelefonoEmpresa').text(""); 
                FnJsBlockTelefonoEmpresa(); 
            }
        }
    });
}
function VerificarExisteTelefonoEmpresa() {
    if ($('#txtNuevoTelefonoEmpresa').val().length >= 3 && $('#ddlCTelefonoEmpresaTipoTelefonoEmpresa').val() > 0) {
        return true;
    }
    else {
        return false;
    }
}

$('#txtNuevoTelefonoEmpresa').keyup(function (e) {
    VarJsTelefonoEmpresa = $(this).val(); 
    if (VerificarExisteTelefonoEmpresa()) {
        FnJsAjaxETelefonoEmpresa();
    }
});

$('#ddlCTelefonoEmpresaTipoTelefonoEmpresa').change(function (e) {
    VarJsIdTipoTelefonoEmpresa = $('#ddlCTelefonoEmpresaTipoTelefonoEmpresa').val();
    if (VerificarExisteTelefonoEmpresa()) {
        FnJsAjaxETelefonoEmpresa();
    }
});

function FnJSFillDdlTelefonoEmpresaTipoTelefonoEmpresa() {
    $('#ddlCTelefonoEmpresaTipoTelefonoEmpresa').empty(); 
    $.ajax({
        type: "POST",
        url: "/modulo7/VstGenerales.aspx/FnRTipoTelefonoV",
        data: {}, 
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLTelefonoEmpresaTipoTelefonoEmpresa == "null") {
                $('#ddlCTelefonoEmpresaTipoTelefonoEmpresa').append($("<option> </option>").val("0").html("Seleccionar Tipo Teléfono"));            
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLTelefonoEmpresaTipoTelefonoEmpresa == value.TipoTelefono) {
                        $('#ddlCTelefonoEmpresaTipoTelefonoEmpresa').append($("<option> </option>").val(value.IdTipoTelefono).html(value.TipoTelefono));  
                        VarJsIdTipoTelefonoEmpresa = value.IdTipoTelefono;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCTelefonoEmpresaTipoTelefonoEmpresa').append($("<option> </option>").val(value.IdTipoTelefono).html(value.TipoTelefono)); 
            });
            VAlDDLTelefonoEmpresaTipoTelefonoEmpresa = "null";
        }
    });
}

function FnAlertaTelefonoEmpresa() {

    switch (CRUDTelefonoEmpresa) {
        case "C":
            VarJsColorAlertTelefonoEmpresa = "bg-success";
            VarJsTextoAlertTelefonoEmpresa = "Creado";
            break;
        case "U":
            VarJsColorAlertTelefonoEmpresa = "bg-warning";
            VarJsTextoAlertTelefonoEmpresa = "Actualizado";
            break;
        case "D":
            VarJsColorAlertTelefonoEmpresa = "bg-danger";
            VarJsTextoAlertTelefonoEmpresa = "Eliminado";
            break;
        case "Error":
            VarJsColorAlertTelefonoEmpresa = "bg-secondary";
            VarJsTextoAlertTelefonoEmpresa = "No se pudo realizar la operación";
            break;
        default:
            console.log("Error CUD Teléfono Alert")
    }
    //alerta
    $('.bd-example-modal-sm .modal-content').addClass(VarJsColorAlertTelefonoEmpresa);
    $('.bd-example-modal-sm h5').text(VarJsTextoAlertTelefonoEmpresa);
    $('.bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.bd-example-modal-sm').modal('hide');
        $('.bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertTelefonoEmpresa);
    }, 1500);    
        FnJsAjaxRTelefonoEmpresa();      
    $("#modalNTelefonoEmpresa").modal("toggle");
}