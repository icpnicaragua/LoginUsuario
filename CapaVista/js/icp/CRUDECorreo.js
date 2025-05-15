
var tablaCorreo;
var ModCCorreo = $('#modalNCorreo'); 

var VarJsCorreoId = 0;
var VarJsCorreo = "";
var VarJsIdTipoCorreo = 0;
var VarJsIdPersona = 0;

var VAlDDLCorreoTipoCorreo = "null";

var formCorreo = document.querySelector('#form1');

CRUDCorreo = "";

var VarJsColorAlertCorreo = "";
var VarJsTextoAlertCorreo = "";

var ECorreo = true;

$('#tblPersona tbody').on('click', 'tr', function () {
    var tablaPersona = $('#tblPersona').DataTable();  
    VarJsIdPersona = tablaPersona.row(this).data()[0];
    FnJsAjaxRCorreo(); 
    FnJSFillDdlCorreoTipoCorreo();
    $("#DatosPersona").attr('class', 'row collapse show');
   
})

function FnJsAjaxRCorreo() { 
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnRCorreoV",
        data: JSON.stringify({
            IdPersona: VarJsIdPersona
        }),
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowCorreo(data.d); 
        }
    }
    );
}

function AddrowCorreo(data) {

    $('#tblCorreo').DataTable().clear().destroy(); 

    tablaCorreo = $("#tblCorreo").DataTable({

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
                    id: 'colCorreo'
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
                filename: 'Correo' + "_" + FnJsDate() + "_" + FnJsHour(),
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
                                    text: 'Correo', 
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Correo' 
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
                filename: 'Correo' + "_" + FnJsDate() + "_" + FnJsHour(), 
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
    tablaCorreo.buttons().container().addClass('form-inline');

    for (var contCorreo = 0; contCorreo < data.length; contCorreo++) { 
        tablaCorreo.row.add([
            data[contCorreo].IdCorreo,
            data[contCorreo].Correo,
            data[contCorreo].ObjTipoCorreo.TipoCorreo,
            '<button value="editar" href="#modalNCorreo" data-toggle="modal" title="editar" class="btn btn-warning  btn-editCorreo"><i class="fas fa-pencil-alt"></i> </button>' +                     
            '<button value="eliminar" href="#modalNCorreo" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteCorreo"><i class="fa fa-trash" ></i> </button>'                     
        ]
        ).draw(false);
    }
}


$('#lbNCorreo').click(function (e) {
    e.preventDefault();
    FnJsCCorreo(); 
    ECorreo = true; 

    FnJsBlockCorreo(); 
    FnJSFillDdlCorreoTipoCorreo();
    CRUDCorreo = "C"; 

     
    VarJsCorreoId = 0; 
    VarJsCorreo = ""; 
    VarJsIdTipoCorreo = 0;
});
$(document).on('click', '.btn-editCorreo', function (e) {         
    e.preventDefault();
    FnJsUCorreo();         
    var dataCorreo = tablaCorreo.row($(this).parents("tr")).data();                                                
    VarJsCorreoId = dataCorreo[0];             
    $('#txtNuevoCorreo').val(dataCorreo[1]);                        
    VarJsCorreo = dataCorreo[1];                   
    VAlDDLCorreoTipoCorreo = (dataCorreo[2]);
    FnJSFillDdlCorreoTipoCorreo();
    VarJsIdTipoCorreo = $('#ddlCCorreoTipoCorreo').val();
    CRUDCorreo = "U";               
});
$(document).on('click', '.btn-deleteCorreo', function (e) {         
    e.preventDefault();
    FnJsDCorreo();         
    ECorreo = false;             


    FnJsBlockCorreo();      
    var dataCorreo = tablaCorreo.row($(this).parents("tr")).data();                                                
    VarJsCorreoId = dataCorreo[0];             
    $('#txtNuevoCorreo').val(dataCorreo[1]);                        
    VarJsCorreo = dataCorreo[1];                   
    VAlDDLCorreoTipoCorreo = (dataCorreo[2]);
    FnJSFillDdlCorreoTipoCorreo();

    CRUDCorreo = "D";
});


function FnJsCCorreo() { 
   
    $('#lblexistenuevoCorreo').text(""); 

    
    $("#DivModBorCorreo").removeAttr("class");
    $("#DivModBorCorreo").attr('class', 'modal-content border-success');
   
    $("#DivModHeaCorreo").removeAttr("class");
    $("#DivModHeaCorreo").attr('class', 'modal-header bg-success');
   
    $('#H4ModTitCorreo').text('Nuevo Correo');

    $("#btnNueCorreo").removeAttr("class");
    $("#btnNueCorreo").attr('class', 'btn btn-success pull-right'); 
    $("#btnNueCorreo i").removeAttr("class");
    $("#btnNueCorreo i").attr("class", "fa fa-save fa-2x");

    $("#ddlCCorreoTipoCorreo").removeAttr("class"); 
    $("#ddlCCorreoTipoCorreo").attr("class", "form-control border-success");
    
    $("#txtNuevoCorreo").attr('disabled', false); 
    $('#ddlCCorreoTipoCorreo').attr('disabled', false);
   
    $('#' + ModCCorreo[0].id + ' :text').val(""); 

}
function FnJsUCorreo() { 
   
    $('#lblexistenuevoCorreo').text(""); 

    
    $("#DivModBorCorreo").removeAttr("class");
    $("#DivModBorCorreo").attr('class', 'modal-content border-warning');
   
    $("#DivModHeaCorreo").removeAttr("class");
    $("#DivModHeaCorreo").attr('class', 'modal-header bg-warning');
   
    $('#H4ModTitCorreo').text('Editar Correo');

    $("#btnNueCorreo").removeAttr("class");
    $("#btnNueCorreo").attr('class', 'btn btn-warning pull-right'); 
    $("#btnNueCorreo i").removeAttr("class");
    $("#btnNueCorreo i").attr("class", "fa fa-save fa-2x");

    $("#ddlCCorreoTipoCorreo").removeAttr("class"); 
    $("#ddlCCorreoTipoCorreo").attr("class", "form-control border-warning");
    
    $("#txtNuevoCorreo").attr('disabled', false); 
    $('#ddlCCorreoTipoCorreo').attr('disabled', false);
   
    $('#' + ModCCorreo[0].id + ' :text').val(""); 

}
function FnJsDCorreo() {    
    $('#lblexistenuevoCorreo').text(""); 
    
    $("#DivModBorCorreo").removeAttr("class");
    $("#DivModBorCorreo").attr('class', 'modal-content border-danger');
   
    $("#DivModHeaCorreo").removeAttr("class");
    $("#DivModHeaCorreo").attr('class', 'modal-header bg-danger');
   
    $('#H4ModTitCorreo').text('Eliminar Correo');

    $("#btnNueCorreo").removeAttr("class");
    $("#btnNueCorreo").attr('class', 'btn btn-danger pull-right');
    
    $("#btnNueCorreo i").removeAttr("class");
    $("#btnNueCorreo i").attr("class", "fa fa-trash fa-2x");

    $("#ddlCCorreoTipoCorreo").removeAttr("class"); 
    $("#ddlCCorreoTipoCorreo").attr("class", "form-control border-danger");
    
    $("#txtNuevoCorreo").attr('disabled', true); 
    $('#ddlCCorreoTipoCorreo').attr('disabled', true);
   
    $('#' + ModCCorreo[0].id + ' :text').val(""); 
}

function FnJsBlockCorreo() {
    if (ECorreo == true) {      
        $("#btnNueCorreo").fadeOut("fast");                      
        $("#btnNueCorreo").attr('disabled', true);
    }
    else if (ECorreo == false) {      
        $("#btnNueCorreo").fadeIn("slow");                      
        $("#btnNueCorreo").attr('disabled', false);
    }
}

$('#btnNueCorreo').click(function (e) {               
    e.preventDefault();
    if (formCorreo.checkValidity()) {
        switch (CRUDCorreo) {          
            case "C":
                FnJsAjaxCCorreo();             
                break;
            case "U":
                FnJsAjaxUCorreo();            
                break;
            case "D":
                FnJsAjaxDCorreo();            
                break;
            default:
                console.log("Error en cud Correo");
        }
    }
});

function FnJsAjaxCCorreo() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnCCorreoV",                            
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({                  
            Correo: VarJsCorreo,
            IdTipoCorreo: VarJsIdTipoCorreo,
            IdPersona: VarJsIdPersona
        }),    
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Correo Agregado");                         
            }
            else {
                CRUDCorreo = "error"
                console.log("No se pudo agregar Tipo de indentificación");
            }
            FnAlertaCorreo();             
        }
    });   
}
function FnJsAjaxUCorreo() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnUCorreoV",                         
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({                  
            IdCorreo: VarJsCorreoId,
            Correo: VarJsCorreo,
            IdTipoCorreo: VarJsIdTipoCorreo
        }),    
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Correo Actualizado"); 
            }
            else {
                CRUDCorreo = "error"
                console.log("no se pudo actualizar");
            }
            FnAlertaCorreo();            
        }
    });   
}
function FnJsAjaxDCorreo() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnDCorreoV",                            
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({                  
            IdCorreo: VarJsCorreoId
        }),    
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Correo Eliminado"); 
            }
            else {
                CRUDCorreo = "error"
                console.log("No se pudo Eliminar Correo");
            }
            FnAlertaCorreo();
        }
    });   
}

function FnJsAjaxECorreo() {                  
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnECorreoV",                            
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({   
            IdCorreo: VarJsCorreoId,
            Correo: VarJsCorreo,
            IdTipoCorreo: VarJsIdTipoCorreo,
            IdPersona: VarJsIdPersona
        }),    
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                ECorreo = true;          
                $('#lblexistenuevoCorreo').text("Existe Correo");               
                FnJsBlockCorreo();
            }
            else {
                ECorreo = false;         
                $('#lblexistenuevoCorreo').text(""); 
                FnJsBlockCorreo();             
            }
        }
    });   
}


function VerificarExisteCorreo() {               
    if ($('#txtNuevoCorreo').val().length >= 3 && $('#ddlCCorreoTipoCorreo').val() > 0) {                            
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoCorreo').change(function (e) {                     
    VarJsCorreo = $(this).val();                
    if (VerificarExisteCorreo()) {            
        FnJsAjaxECorreo();
    }
});

$('#ddlCCorreoTipoCorreo').change(function (e) {
    VarJsIdTipoCorreo = $('#ddlCCorreoTipoCorreo').val();
    if (VerificarExisteCorreo()) {
        FnJsAjaxECorreo();
    }
});

function FnJSFillDdlCorreoTipoCorreo() {
    $('#ddlCCorreoTipoCorreo').empty();       
    $.ajax({
        type: "POST",
        url: "/modulo7/VstGenerales.aspx/FnRTipoCorreoV",    
        data: {},          
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLCorreoTipoCorreo == "null") {
                $('#ddlCCorreoTipoCorreo').append($("<option> </option>").val("0").html("Seleccionar Tipo Correo"));                                                  
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLCorreoTipoCorreo == value.TipoCorreo) {
                        $('#ddlCCorreoTipoCorreo').append($("<option> </option>").val(value.IdTipoCorreo).html(value.TipoCorreo));           
                        VarJsIdTipoCorreo = value.IdTipoCorreo;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCCorreoTipoCorreo').append($("<option> </option>").val(value.IdTipoCorreo).html(value.TipoCorreo));                            
            });
            VAlDDLCorreoTipoCorreo = "null";
        }
    });
}

function FnAlertaCorreo() {
    switch (CRUDCorreo) {
        case "C":
            VarJsColorAlertCorreo = "bg-success";
            VarJsTextoAlertCorreo = "Creado";            
            break;
        case "U":
            VarJsColorAlertCorreo = "bg-warning";
            VarJsTextoAlertCorreo = "Actualizado";            
            break;
        case "D":
            VarJsColorAlertCorreo = "bg-danger";
            VarJsTextoAlertCorreo = "Eliminado";            
            break;
        case "Error":
            VarJsColorAlertCorreo = "bg-secondary";
            VarJsTextoAlertCorreo = "No se pudo realizar la operación";            
            break;
        default:
            console.log("Error CUD Correo Alert");
    }
  
    $('.bd-example-modal-sm .modal-content').addClass(VarJsColorAlertCorreo);
    $('.bd-example-modal-sm h5').text(VarJsTextoAlertCorreo);            
    $('.bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.bd-example-modal-sm').modal('hide');
        $('.bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertCorreo);
    }, 1500);                                 
    if ($("#secciontblCorreo.show").length > 0) {
        FnJsAjaxRCorreo();
    }
    $("#modalNCorreo").modal("toggle");      
}