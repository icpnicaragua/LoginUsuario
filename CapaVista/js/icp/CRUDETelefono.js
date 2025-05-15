var tablaTelefono;
var ModCTelefono = $('#modalNTelefono'); 

var VarJsTelefonoId = 0;
var VarJsTelefono = "";
var VarJsIdTipoTelefono = 0;
var VarJsIdPersona = 0;

var VAlDDLTelefonoTipoTelefono = "null";

var formTelefono = document.querySelector('#form1');

CRUDTelefono = "";

var VarJsColorAlertTelefono = "";
var VarJsTextoAlertTelefono = "";

var ETelefono = true;

$('#tblPersona tbody').on('click', 'tr', function () {
    var tablaPersona = $('#tblPersona').DataTable();
    console.log('desde tele: ' + tablaPersona.row(this).data()[0]);
    VarJsIdPersona = tablaPersona.row(this).data()[0];
    FnJsAjaxRTelefono(); 
    FnJSFillDdlTelefonoTipoTelefono();
    $("#DatosPersona").attr('class', 'row collapse show');

})

function FnJsAjaxRTelefono() {                               
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnRTelefonoV",                         
        data: JSON.stringify({                  
            IdPersona: VarJsIdPersona
        }),    
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowTelefono(data.d);                                        
        }
    }
    );
}

function AddrowTelefono(data) {
    $('#tblTelefono').DataTable().clear().destroy(); 
    tablaTelefono = $("#tblTelefono").DataTable({
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
                                    text: 'Teléfono', 
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Teléfono' 
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
                filename: 'Teléfono' + "_" + FnJsDate() + "_" + FnJsHour(), 
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
    tablaTelefono.buttons().container().addClass('form-inline');
    for (var contTelefono = 0; contTelefono < data.length; contTelefono++) { 
        tablaTelefono.row.add([
            data[contTelefono].IdTelefono,
            data[contTelefono].Telefono,
            data[contTelefono].ObjTipoTelefono.TipoTelefono,
            '<button value="editar" href="#modalNTelefono" data-toggle="modal" title="editar" class="btn btn-warning  btn-editTelefono"><i class="fas fa-pencil-alt"></i> </button>' +                     
            '<button value="eliminar" href="#modalNTelefono" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteTelefono"><i class="fa fa-trash" ></i> </button>'                     
        ]
        ).draw(false);
    }
}


$('#lbNTelefono').click(function (e) {
    e.preventDefault();
    FnJsCTelefono(); 
    ETelefono = true; 

    FnJsBlockTelefono(); 
    FnJSFillDdlTelefonoTipoTelefono();
    CRUDTelefono = "C"; 
       
    VarJsTelefonoId = 0; 
    VarJsTelefono = ""; 
    VarJsIdTipoTelefono = 0;
});
$(document).on('click', '.btn-editTelefono', function (e) {         
    e.preventDefault();
    FnJsUTelefono();         
    var dataTelefono = tablaTelefono.row($(this).parents("tr")).data();                                                
    VarJsTelefonoId = dataTelefono[0];             
    $('#txtNuevoTelefono').val(dataTelefono[1]);                        
    VarJsTelefono = dataTelefono[1];                   
    VAlDDLTelefonoTipoTelefono = (dataTelefono[2]);
    FnJSFillDdlTelefonoTipoTelefono();
    VarJsIdTipoTelefono = $('#ddlCTelefonoTipoTelefono').val();
    CRUDTelefono = "U";               
});
$(document).on('click', '.btn-deleteTelefono', function (e) {         
    e.preventDefault();
    FnJsDTelefono();         
    ETelefono = false;             


    FnJsBlockTelefono();      
    var dataTelefono = tablaTelefono.row($(this).parents("tr")).data();                                                
    VarJsTelefonoId = dataTelefono[0];             
    $('#txtNuevoTelefono').val(dataTelefono[1]);                        
    VarJsTelefono = dataTelefono[1];                   
    VAlDDLTelefonoTipoTelefono = (dataTelefono[2]);
    FnJSFillDdlTelefonoTipoTelefono();

    CRUDTelefono = "D";
});


function FnJsCTelefono() {    
    $('#lblexistenuevoTelefono').text("");    
    $("#DivModBorTelefono").removeAttr("class");
    $("#DivModBorTelefono").attr('class', 'modal-content border-success');

    $("#DivModHeaTelefono").removeAttr("class");
    $("#DivModHeaTelefono").attr('class', 'modal-header bg-success');
   
    $('#H4ModTitTelefono').text('Nuevo Teléfono');

    $("#btnNueTelefono").removeAttr("class");
    $("#btnNueTelefono").attr('class', 'btn btn-success pull-right'); 

    $("#btnNueTelefono i").removeAttr("class");
    $("#btnNueTelefono i").attr("class", "fa fa-save fa-2x");

    $("#ddlCTelefonoTipoTelefono").removeAttr("class"); 
    $("#ddlCTelefonoTipoTelefono").attr("class", "form-control border-success");
    $("#txtNuevoTelefono").attr('disabled', false); 
    $('#ddlCTelefonoTipoTelefono').attr('disabled', false);
   
    $('#' + ModCTelefono[0].id + ' :text').val(""); 
}
function FnJsUTelefono() {    
    $('#lblexistenuevoTelefono').text(""); 
        
    $("#DivModBorTelefono").removeAttr("class");
    $("#DivModBorTelefono").attr('class', 'modal-content border-warning');
   
    $("#DivModHeaTelefono").removeAttr("class");
    $("#DivModHeaTelefono").attr('class', 'modal-header bg-warning');
   
    $('#H4ModTitTelefono').text('Editar Teléfono');

    $("#btnNueTelefono").removeAttr("class");
    $("#btnNueTelefono").attr('class', 'btn btn-warning pull-right'); 
    $("#btnNueTelefono i").removeAttr("class");
    $("#btnNueTelefono i").attr("class", "fa fa-save fa-2x");

    $("#ddlCTelefonoTipoTelefono").removeAttr("class"); 
    $("#ddlCTelefonoTipoTelefono").attr("class", "form-control border-warning");
    $("#txtNuevoTelefono").attr('disabled', false); 
    $('#ddlCTelefonoTipoTelefono').attr('disabled', false);
   
    $('#' + ModCTelefono[0].id + ' :text').val(""); 
}
function FnJsDTelefono() {    
    $('#lblexistenuevoTelefono').text(""); 
        
    $("#DivModBorTelefono").removeAttr("class");
    $("#DivModBorTelefono").attr('class', 'modal-content border-danger');
   
    $("#DivModHeaTelefono").removeAttr("class");
    $("#DivModHeaTelefono").attr('class', 'modal-header bg-danger');

    $('#H4ModTitTelefono').text('Eliminar Teléfono');

    $("#btnNueTelefono").removeAttr("class");
    $("#btnNueTelefono").attr('class', 'btn btn-danger pull-right');
         
    $("#btnNueTelefono i").removeAttr("class");
    $("#btnNueTelefono i").attr("class", "fa fa-trash fa-2x");

    $("#ddlCTelefonoTipoTelefono").removeAttr("class"); 
    $("#ddlCTelefonoTipoTelefono").attr("class", "form-control border-danger");
    $("#txtNuevoTelefono").attr('disabled', true); 
    $('#ddlCTelefonoTipoTelefono').attr('disabled', true);
   
    $('#' + ModCTelefono[0].id + ' :text').val(""); 
}


function FnJsBlockTelefono() {
    if (ETelefono == true) {      
        $("#btnNueTelefono").fadeOut("fast");                      
        $("#btnNueTelefono").attr('disabled', true);
    }
    else if (ETelefono == false) {      
        $("#btnNueTelefono").fadeIn("slow");                      
        $("#btnNueTelefono").attr('disabled', false);
    }
}

$('#btnNueTelefono').click(function (e) {               
    e.preventDefault();
    if (formTelefono.checkValidity()) {
        switch (CRUDTelefono) {          
            case "C":
                FnJsAjaxCTelefono();             
                break;
            case "U":
                FnJsAjaxUTelefono();            
                break;
            case "D":
                FnJsAjaxDTelefono();            
                break;
            default:
                console.log("Error en cud Teléfono");
        }
    } 
});

function FnJsAjaxCTelefono() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnCTelefonoV",                            
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({                  
            Telefono: VarJsTelefono,
            IdTipoTelefono: VarJsIdTipoTelefono,
            IdPersona: VarJsIdPersona
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
                CRUDTelefono = "error"
                console.log("No se pudo agregar Tipo de indentificación");
            }
            FnAlertaTelefono();             
        }
    });   
}
function FnJsAjaxUTelefono() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnUTelefonoV",                         
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({                  
            IdTelefono: VarJsTelefonoId,
            Telefono: VarJsTelefono,
            IdTipoTelefono: VarJsIdTipoTelefono
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
                CRUDTelefono = "error"
                console.log("no se pudo actualizar");
            }
            FnAlertaTelefono();            
        }
    });   
}
function FnJsAjaxDTelefono() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnDTelefonoV",                            
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({                  
            IdTelefono: VarJsTelefonoId
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
                CRUDTelefono = "error"
                console.log("No se pudo Eliminar Teléfono");
            }
            FnAlertaTelefono();
        }
    });   
}

function FnJsAjaxETelefono() {                  
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnETelefonoV",                            
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({   
            IdTelefono: VarJsTelefonoId,
            Telefono: VarJsTelefono,
            IdTipoTelefono: VarJsIdTipoTelefono,
            IdPersona: VarJsIdPersona
        }),    
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                ETelefono = true;          
                $('#lblexistenuevoTelefono').text("Existe Teléfono");               
                FnJsBlockTelefono();
            }
            else {
                ETelefono = false;         
                $('#lblexistenuevoTelefono').text(""); 
                FnJsBlockTelefono();             
            }
        }
    });   
}

function VerificarExisteTelefono() {               
    if ($('#txtNuevoTelefono').val().length >= 3 && $('#ddlCTelefonoTipoTelefono').val() > 0) {                            
        return true;
    }
    else {
        return false;
    }
}

$('#txtNuevoTelefono').keyup(function (e) {                     
    VarJsTelefono = $(this).val();                
    if (VerificarExisteTelefono()) {            
        FnJsAjaxETelefono();
    }
});

$('#ddlCTelefonoTipoTelefono').change(function (e) {
    VarJsIdTipoTelefono = $('#ddlCTelefonoTipoTelefono').val();
    if (VerificarExisteTelefono()) {
        FnJsAjaxETelefono();
    }
});

function FnJSFillDdlTelefonoTipoTelefono() {
    $('#ddlCTelefonoTipoTelefono').empty();       
    $.ajax({
        type: "POST",
        url: "/modulo7/VstGenerales.aspx/FnRTipoTelefonoV",    
        data: {},          
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLTelefonoTipoTelefono == "null") {
                $('#ddlCTelefonoTipoTelefono').append($("<option> </option>").val("0").html("Seleccionar Tipo Teléfono"));                                                  
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLTelefonoTipoTelefono == value.TipoTelefono) {
                        $('#ddlCTelefonoTipoTelefono').append($("<option> </option>").val(value.IdTipoTelefono).html(value.TipoTelefono));           
                        VarJsIdTipoTelefono = value.IdTipoTelefono;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCTelefonoTipoTelefono').append($("<option> </option>").val(value.IdTipoTelefono).html(value.TipoTelefono));                            
            });
            VAlDDLTelefonoTipoTelefono = "null";
        }
    });
}

function FnAlertaTelefono() {
    switch (CRUDTelefono) {
        case "C":
            VarJsColorAlertTelefono = "bg-success";
            VarJsTextoAlertTelefono = "Creado";            
            break;
        case "U":
            VarJsColorAlertTelefono = "bg-warning";
            VarJsTextoAlertTelefono = "Actualizado";            
            break;
        case "D":
            VarJsColorAlertTelefono = "bg-danger";
            VarJsTextoAlertTelefono = "Eliminado";            
            break;
        case "Error":
            VarJsColorAlertTelefono = "bg-secondary";
            VarJsTextoAlertTelefono = "No se pudo realizar la operación";            
            break;
        default:
            console.log("Error CUD Teléfono Alert")
    }  
    $('.bd-example-modal-sm .modal-content').addClass(VarJsColorAlertTelefono);
    $('.bd-example-modal-sm h5').text(VarJsTextoAlertTelefono);            
    $('.bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.bd-example-modal-sm').modal('hide');
        $('.bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertTelefono);
    }, 1500);                           
    console.log($("#secciontblTelefono.show").length)
    if ($("#secciontblTelefono.show").length > 0) {
        FnJsAjaxRTelefono();
    }   
    $("#modalNTelefono").modal("toggle");      
}