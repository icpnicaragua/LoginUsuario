var tablaEmpleado;   
var tablaEmpleadoNPersona;
var ModCEmpleado = $('#modalNEmpleado');       
var VarJsEmpleadoId = 0;
var VarJsIdPersona = 0;
var VarJsEmpleadoNom1 = "";
var VarJsEmpleadoApe1 = "";
var VarJsIdArea = 0;
var VarJsArea = "";
var VarJsIdJefe = 0;
var VarJsJefeNom1 = "";
var VarJsJefeApe1 = "";

var VAlDDLEmpleadoArea = "null";                                       
var VAlDDLEmpleadoJefe = "null";
var formEmpleado = document.querySelector('#form1');

CRUDEmpleado = "";
var VarJsColorAlertEmpleado = "";
var VarJsTextoAlertEmpleado = "";
var EEmpleado = true;
var EEmpleadoPersona = true;

$('#lbMostrarEmpleado').click(function (e) {                  
    e.preventDefault();
    FnJsAjaxREmpleado();          
    FnJSFillDdlEmpleadoArea();   
    FnJSFillDdlEmpleadoJefe();   
});

$('#lbNEmpleado').click(function (e) {
    e.preventDefault();
    FnJsAjaxREmpleadoNPersona();
});

function FnJsAjaxREmpleado() {                               
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnREmpleadoV",                         
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowEmpleado(data.d);                                        
        }
    }
    );
}

function AddrowEmpleado(data) {
    $('#tblEmpleado').DataTable().clear().destroy();                            

    tablaEmpleado = $("#tblEmpleado").DataTable({
        "retrieve": true,
        dom: 'Bfrtip',
        "order": [[2, 'asc'], [1, 'asc']],                                             
        "columnDefs": [
            { "targets": 3, "searchable": false },
            { "orderable": false, "targets": 5 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colEmpleado'                  
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
                filename: 'Empleado' + "_" + FnJsDate() + "_" + FnJsHour(),         
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
                                    text: 'Empleado', 
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Empleado' 
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
                filename: 'Empleado' + "_" + FnJsDate() + "_" + FnJsHour(), 
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
    tablaEmpleado.buttons().container().addClass('form-inline');   

    for (var contEmpleado = 0; contEmpleado < data.length; contEmpleado++) {                         
        tablaEmpleado.row.add([
            data[contEmpleado].IdEmpleado,
            data[contEmpleado].ObjPersona.Nombre1,
            data[contEmpleado].ObjPersona.Apellido1,
            data[contEmpleado].ObjArea.Area,
            data[contEmpleado].ObjJefe.Nombre1 + ' ' + data[contEmpleado].ObjJefe.Apellido1,
            '<button value="editar" href="#modalNEmpleado" data-toggle="modal" title="editar" class="btn btn-warning  btn-editEmpleado"><i class="fas fa-pencil-alt"></i> </button>' +                     
            '<button value="eliminar" href="#modalNEmpleado" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteEmpleado"><i class="fa fa-trash" ></i> </button>'                     
        ]
        ).draw(false);
    }
}

function FnJsAjaxREmpleadoNPersona() {
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnREmpleadoNPersonaV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowEmpleadoNPersona(data.d);
        }
    }
    );
}
function AddrowEmpleadoNPersona(data) {
    $('#tblEmpleadoNPersona').DataTable().clear().destroy();
    tablaEmpleadoNPersona = $("#tblEmpleadoNPersona").DataTable({
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
                    id: 'colUsuario'
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
            }
        ],
        "language": FnJsEspTbl()
    });
    tablaEmpleadoNPersona.buttons().container().addClass('form-inline');

    for (var contEmpleadoNPersona = 0; contEmpleadoNPersona < data.length; contEmpleadoNPersona++) {
        tablaEmpleadoNPersona.row.add([
            data[contEmpleadoNPersona].ObjPersona.IdPersona,
            data[contEmpleadoNPersona].ObjPersona.Nombre1,
            data[contEmpleadoNPersona].ObjPersona.Apellido1,       
            '<button value="Add" href="#modalNEmpleado" data-toggle="modal" title="Add" class="btn btn-success  btn-AddEmpleado"><i class="fas fa-plus"></i> </button>'
        ]
        ).draw(false);
    }
}

$(document).on('click', '.btn-AddEmpleado', function (e) {                  
    e.preventDefault();
    FnJsCEmpleado();   
    var dataEmpleadoNPersona = tablaEmpleadoNPersona.row($(this).parents("tr")).data();                                                
    VarJsIdPersona = dataEmpleadoNPersona[0];
    VarJsEmpleadoNom1 = dataEmpleadoNPersona[1];
    $('#txtNuevoEmpleadoNombre1').val(dataEmpleadoNPersona[1]);
    VarJsEmpleadoApe1 = dataEmpleadoNPersona[2];
    $('#txtNuevoEmpleadoApellido1').val(dataEmpleadoNPersona[2]);
    EEmpleado = true;  
    FnJsBlockEmpleado(); 
    FnJSFillDdlEmpleadoArea();
    FnJSFillDdlEmpleadoJefe();
    CRUDEmpleado = "C"; 
    VarJsEmpleadoId = 0; 
    VarJsIdArea = 0;
    VarJsArea = "";
    VarJsIdJefe = 0;
    VarJsJefeNom1 = "";
    VarJsJefeApe1 = "";   
});

$(document).on('click', '.btn-editEmpleado', function (e) {         
    e.preventDefault();
    FnJsUEmpleado();         
    var dataEmpleado = tablaEmpleado.row($(this).parents("tr")).data();                                                
    VarJsEmpleadoId = dataEmpleado[0];             
    $('#txtNuevoEmpleadoNombre1').val(dataEmpleado[1]);                        
    $('#txtNuevoEmpleadoApellido1').val(dataEmpleado[2]);
    VarJsEmpleadoNom1 = dataEmpleado[1];                   
    VarJsEmpleadoApe1 = dataEmpleado[2];
    VAlDDLEmpleadoArea = (dataEmpleado[3]);
    VAlDDLEmpleadoJefe = (dataEmpleado[4]);
    FnJSFillDdlEmpleadoArea();
    VarJsIdArea = $('#ddlCEmpleadoArea').val();
    FnJSFillDdlEmpleadoJefe();
    VarJsIdJefe = $('#ddlCEmpleadoJefe').val();

    CRUDEmpleado = "U";               
});
$(document).on('click', '.btn-deleteEmpleado', function (e) {         
    e.preventDefault();
    FnJsDEmpleado();         
    EEmpleado = false;             

    FnJsBlockEmpleado();      
    var dataEmpleado = tablaEmpleado.row($(this).parents("tr")).data();                                                
    VarJsEmpleadoId = dataEmpleado[0];             
    $('#txtNuevoEmpleadoNombre1').val(dataEmpleado[1]);                        
    $('#txtNuevoEmpleadoApellido1').val(dataEmpleado[2]);
    VarJsEmpleadoNom1 = dataEmpleado[1];                   
    VarJsEmpleadoApe1 = dataEmpleado[2];
    VAlDDLEmpleadoArea = (dataEmpleado[3]);
    VAlDDLEmpleadoJefe = (dataEmpleado[4]);
    FnJSFillDdlEmpleadoArea();
    FnJSFillDdlEmpleadoJefe();

    CRUDEmpleado = "D";
});

function FnJsCEmpleado() {       
    $('#lblexistenuevoEmpleado').text("");                

    $("#DivModBorEmpleado").removeAttr("class");         
    $("#DivModBorEmpleado").attr('class', 'modal-content border-success');   
    $("#DivModHeaEmpleado").removeAttr("class");         
    $("#DivModHeaEmpleado").attr('class', 'modal-header bg-success');   
    $('#H4ModTitEmpleado').text('Nuevo Empleado');
    $("#btnNueEmpleado").removeAttr("class");         
    $("#btnNueEmpleado").attr('class', 'btn btn-success pull-right');               
    $("#btnNueEmpleado i").removeAttr("class");
    $("#btnNueEmpleado i").attr("class", "fa fa-save fa-2x");
    $("#ddlCEmpleadoArea").removeAttr("class");    
    $("#ddlCEmpleadoArea").attr("class", "form-control border-success");   
    $("#ddlCEmpleadoJefe").removeAttr("class");    
    $("#ddlCEmpleadoJefe").attr("class", "form-control border-success");   

    $("#txtNuevoEmpleadoNombre1").attr('disabled', true);                   
    $("#txtNuevoEmpleadoApellido1").attr('disabled', true);                   
    $('#ddlCEmpleadoArea').attr('disabled', false);
    $('#ddlCEmpleadoJefe').attr('disabled', false);
    $('#' + ModCEmpleado[0].id + ' :text').val("");
}
function FnJsUEmpleado() {       
    $('#lblexistenuevoEmpleado').text("");                

    $("#DivModBorEmpleado").removeAttr("class");         
    $("#DivModBorEmpleado").attr('class', 'modal-content border-warning');   
    $("#DivModHeaEmpleado").removeAttr("class");         
    $("#DivModHeaEmpleado").attr('class', 'modal-header bg-warning');   
    $('#H4ModTitEmpleado').text('Editar Empleado');
    $("#btnNueEmpleado").removeAttr("class");         
    $("#btnNueEmpleado").attr('class', 'btn btn-warning pull-right');               
    $("#btnNueEmpleado i").removeAttr("class");
    $("#btnNueEmpleado i").attr("class", "fa fa-save fa-2x");
    $("#ddlCEmpleadoArea").removeAttr("class");    
    $("#ddlCEmpleadoArea").attr("class", "form-control border-warning");   
    $("#ddlCEmpleadoJefe").removeAttr("class");    
    $("#ddlCEmpleadoJefe").attr("class", "form-control border-warning");   

    $("#txtNuevoEmpleadoNombre1").attr('disabled', true);                   
    $("#txtNuevoEmpleadoApellido1").attr('disabled', true);                   
    $('#ddlCEmpleadoArea').attr('disabled', false);
    $('#ddlCEmpleadoJefe').attr('disabled', false);
    $('#' + ModCEmpleado[0].id + ' :text').val("");
}
function FnJsDEmpleado() {       
    $('#lblexistenuevoEmpleado').text("");                

    $("#DivModBorEmpleado").removeAttr("class");         
    $("#DivModBorEmpleado").attr('class', 'modal-content border-danger');   
    $("#DivModHeaEmpleado").removeAttr("class");         
    $("#DivModHeaEmpleado").attr('class', 'modal-header bg-danger');   
    $('#H4ModTitEmpleado').text('Eliminar Empleado');
    $("#btnNueEmpleado").removeAttr("class");         
    $("#btnNueEmpleado").attr('class', 'btn btn-danger pull-right');               
    $("#btnNueEmpleado i").removeAttr("class");
    $("#btnNueEmpleado i").attr("class", "fa fa-trash fa-2x");
    $("#ddlCEmpleadoArea").removeAttr("class");    
    $("#ddlCEmpleadoArea").attr("class", "form-control border-danger");   
    $("#ddlCEmpleadoJefe").removeAttr("class");    
    $("#ddlCEmpleadoJefe").attr("class", "form-control border-danger");   

    $("#txtNuevoEmpleadoNombre1").attr('disabled', true);                   
    $("#txtNuevoEmpleadoApellido1").attr('disabled', true);                   
    $('#ddlCEmpleadoArea').attr('disabled', true);
    $('#ddlCEmpleadoJefe').attr('disabled', true);
    $('#' + ModCEmpleado[0].id + ' :text').val("");
}

function FnJsBlockEmpleado() {
    if (EEmpleado == true) {      
        $("#btnNueEmpleado").fadeOut("fast");                      
        $("#btnNueEmpleado").attr('disabled', true);                                         
    }
    else if (EEmpleado == false) {      
        $("#btnNueEmpleado").fadeIn("slow");                      
        $("#btnNueEmpleado").attr('disabled', false);                                         
    }
}

$('#btnNueEmpleado').click(function (e) {               
    e.preventDefault();
    if (formEmpleado.checkValidity()) {
        switch (CRUDEmpleado) {          
            case "C":
                FnJsAjaxCEmpleado();             
                break;
            case "U":
                FnJsAjaxUEmpleado();            
                break;
            case "D":
                FnJsAjaxDEmpleado();            
                break;
            default:
                console.log("Error en cud Empleado");
        }
    }
});
function FnJsAjaxCEmpleado() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnCEmpleadoV",                            
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({                  
            IdArea: VarJsIdArea,
            IdPersona: VarJsIdPersona,
            IdJefe: VarJsIdJefe
        }),    
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Empleado Agregado");                         
            }
            else {
                CRUDEmpleado = "error"
                console.log("No se pudo agregar Empleado");
            }
            FnAlertaEmpleado();             
        }
    });   
}
function FnJsAjaxUEmpleado() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnUEmpleadoV",                         
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({                  
            IdEmpleado: VarJsEmpleadoId,
            IdArea: VarJsIdArea,
            IdPersona: VarJsIdPersona,
            IdJefe: VarJsIdJefe

        }),    
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Empleado Actualizado"); 
            }
            else {
                CRUDEmpleado = "error"
                console.log("no se pudo actualizar");
            }
            FnAlertaEmpleado();            
        }
    });   
}
function FnJsAjaxDEmpleado() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnDEmpleadoV",                            
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({                  
            IdEmpleado: VarJsEmpleadoId
        }),    
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Empleado Eliminado"); 
            }
            else {
                CRUDEmpleado = "error"
                console.log("No se pudo Eliminar Empleado");
            }
            FnAlertaEmpleado();
        }
    });   
}
function FnJsAjaxEEmpleado() {                  
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnEEmpleadoV",                            
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({   
            IdEmpleado: VarJsEmpleadoId,
            IdArea: VarJsIdArea,
            IdPersona: VarJsIdPersona
        }),    
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                EEmpleado = true;          
                $('#lblexistenuevoEmpleado').text("Existe Empleado");               
                FnJsBlockEmpleado();
            }
            else {
                EEmpleado = false;         
                $('#lblexistenuevoEmpleado').text("");                
                FnJsBlockEmpleado();             
            }
        }
    });   
}

function VerificarExisteEmpleado() {               
    if ($('#ddlCEmpleadoJefe').val() > 0 && $('#ddlCEmpleadoArea').val() > 0) {                            
        return true;
    }
    else {
        return false;
    }
}

$('#ddlCEmpleadoArea').change(function (e) {
    VarJsIdArea = $('#ddlCEmpleadoArea').val();
    if (VerificarExisteEmpleado()) {
        FnJsAjaxEEmpleado();
    }
});

$('#ddlCEmpleadoJefe').change(function (e) {
    VarJsIdJefe = $('#ddlCEmpleadoJefe').val();
    if (VerificarExisteEmpleado()) {
        FnJsAjaxEEmpleado();
    }
});

function FnJSFillDdlEmpleadoArea() {
    $('#ddlCEmpleadoArea').empty();       
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnRAreaV",    
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLEmpleadoArea == "null") {
                $('#ddlCEmpleadoArea').append($("<option> </option>").val("0").html("Seleccionar Área"));                                                  
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLEmpleadoArea == value.Area) {
                        $('#ddlCEmpleadoArea').append($("<option> </option>").val(value.IdArea).html(value.Area));           
                        VarJsIdArea = value.IdArea;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCEmpleadoArea').append($("<option> </option>").val(value.IdArea).html(value.Area));                            
            });
            VAlDDLEmpleadoArea = "null";
        }
    });
}

function FnJSFillDdlEmpleadoJefe() {
    $('#ddlCEmpleadoJefe').empty();       
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnREmpleadoV",    
        data: {},          
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLEmpleadoJefe == "null") {
                $('#ddlCEmpleadoJefe').append($("<option> </option>").val("0").html("Seleccionar Jefe"));                                                  
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLEmpleadoJefe == (value.ObjPersona.Nombre1 + ' ' + value.ObjPersona.Apellido1)) {
                        $('#ddlCEmpleadoJefe').append($("<option> </option>").val(value.IdEmpleado).html(value.ObjPersona.Nombre1 + ' ' + value.ObjPersona.Apellido1));           
                        VarJsIdJefe = value.IdEmpleado;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCEmpleadoJefe').append($("<option> </option>").val(value.IdEmpleado).html(value.ObjPersona.Nombre1 + ' ' + value.ObjPersona.Apellido1));                            
            });
            VAlDDLEmpleadoJefe = "null";
        }
    });
}
function FnAlertaEmpleado() {
    switch (CRUDEmpleado) {               
        case "C":
            VarJsColorAlertEmpleado = "bg-success";            
            VarJsTextoAlertEmpleado = "Creado";            
            break;
        case "U":
            VarJsColorAlertEmpleado = "bg-warning";            
            VarJsTextoAlertEmpleado = "Actualizado";            
            break; 
        case "D":
            VarJsColorAlertEmpleado = "bg-danger";            
            VarJsTextoAlertEmpleado = "Eliminado";            
            break;
        case "Error":
            VarJsColorAlertEmpleado = "bg-secondary";            
            VarJsTextoAlertEmpleado = "No se pudo realizar la operación";            
            break;
        default:
            console.log("Error CUD Empleado Alert");
    }
    $('.bd-example-modal-sm .modal-content').addClass(VarJsColorAlertEmpleado);            
    $('.bd-example-modal-sm h5').text(VarJsTextoAlertEmpleado);            
    $('.bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.bd-example-modal-sm').modal('hide');
        $('.bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertEmpleado);            
    }, 1500);
    if ($("#secciontblEmpleado.show").length > 0) {      
        FnJsAjaxREmpleado();  
        FnJsAjaxREmpleadoNPersona();
    }
    $("#modalNEmpleado").modal("toggle");      
}