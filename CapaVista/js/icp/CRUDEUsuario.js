
var tablaUsuario;
var tablaUsuarioNEmpleado;
var ModCUsuario = $('#modalNUsuario'); 

var VarJsUsuarioId = 0;
var VarJsUsuario = "";
var VarJsClave = "";
var VarJsIdEmpleado = 0;
var VarJsNombre1 = "";
var VarJsApellido1 = "";


var formUsuario = document.querySelector('#form1');

CRUDUsuario = "";

var VarJsColorAlertUsuario = "";
var VarJsTextoAlertUsuario = "";

var EUsuario = true;


$('#lbMostrarUsuario').click(function (e) {                  
    e.preventDefault();
    FnJsAjaxRUsuario();          
});

$('#lbNUsuario').click(function (e) {
    e.preventDefault();
    FnJsAjaxRUsuarioNEmpleado();
});

function FnJsAjaxRUsuario() {                               
    $.ajax({
        type: "POST",
        url: "/modulo7/VstUsuarios.aspx/FnRUsuarioV",                         
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowUsuario(data.d);                                        
        }
    }
    );
}

function AddrowUsuario(data) {            

    $('#tblUsuario').DataTable().clear().destroy();                            

    tablaUsuario = $("#tblUsuario").DataTable({            

        "retrieve": true,
        dom: 'Bfrtip',

        "order": [3, 'asc'],                                             
        "columnDefs": [
            { "targets": 5, "searchable": false },
            { "orderable": false, "targets": 5 }
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
                filename: 'Usuarios' + "_" + FnJsDate() + "_" + FnJsHour(),         
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
                                    text: 'Usuarios', 
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Usuario' 
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
                filename: 'Usuarios' + "_" + FnJsDate() + "_" + FnJsHour(), 
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
    tablaUsuario.buttons().container().addClass('form-inline');   

    for (var contUsuario = 0; contUsuario < data.length; contUsuario++) {                         
        tablaUsuario.row.add([
            data[contUsuario].ID_usuario,
            data[contUsuario].Usuario,
            data[contUsuario].Clave,
            data[contUsuario].ObjEmpleado.ObjPersona.Nombre1,
            data[contUsuario].ObjEmpleado.ObjPersona.Apellido1,
            '<button value="editar" href="#modalNUsuario" data-toggle="modal" title="editar" class="btn btn-warning  btn-editUsuario"><i class="fas fa-pencil-alt"></i> </button>' +                     
            '<button value="eliminar" href="#modalNUsuario" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteUsuario"><i class="fa fa-trash" ></i> </button>'                     
        ]
        ).draw(false);
    }
}

function FnJsAjaxRUsuarioNEmpleado() {                               
    $.ajax({
        type: "POST",
        url: "/modulo7/VstUsuarios.aspx/FnRUsuarioNEmpleadoV",                         
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowUsuarioNEmpleado(data.d);                                        
        }
    }
    );
}

function AddrowUsuarioNEmpleado(data) {            

    $('#tblEmpleadoNUsuario').DataTable().clear().destroy();                            

    tablaUsuarioNEmpleado = $("#tblEmpleadoNUsuario").DataTable({            

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
                    columns: [':not(:eq(4)):visible']                               
                },
                titleAttr: 'Copiar',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')
                }

            }
        ],
        "language": FnJsEspTbl()
    });
    tablaUsuarioNEmpleado.buttons().container().addClass('form-inline');   

    for (var contEmpleadoNUsuario = 0; contEmpleadoNUsuario < data.length; contEmpleadoNUsuario++) {                         
        tablaUsuarioNEmpleado.row.add([
            data[contEmpleadoNUsuario].ObjEmpleado.IdEmpleado,
            data[contEmpleadoNUsuario].ObjEmpleado.ObjPersona.Nombre1,
            data[contEmpleadoNUsuario].ObjEmpleado.ObjPersona.Apellido1,
            data[contEmpleadoNUsuario].ObjEmpleado.ObjArea.Area,
            '<button value="Add" href="#modalNUsuario" data-toggle="modal" title="Add" class="btn btn-success  btn-AddUsuario"><i class="fas fa-plus"></i> </button>'                      
        ]
        ).draw(false);
    }
}


$(document).on('click', '.btn-AddUsuario', function (e) {
    e.preventDefault();
    FnJsCUsuario(); 
    var dataUsuarioNEmpleado = tablaUsuarioNEmpleado.row($(this).parents("tr")).data();
    VarJsIdEmpleado = dataUsuarioNEmpleado[0]; 
    VarJsNombre1 = dataUsuarioNEmpleado[1];
    $('#txtNuevoNombre1').val(dataUsuarioNEmpleado[1]);
    VarJsApellido1 = dataUsuarioNEmpleado[2];
    $('#txtNuevoApellido1').val(dataUsuarioNEmpleado[2]);

    EUsuario = true; 

    FnJsBlockUsuario(); 

    CRUDUsuario = "C"; 
       
    VarJsUsuarioId = 0; 
    VarJsUsuario = ""; 
    VarJsClave = "";

});
$(document).on('click', '.btn-editUsuario', function (e) {         
    e.preventDefault();
    FnJsUUsuario();         
    var dataUsuario = tablaUsuario.row($(this).parents("tr")).data();                                                
    VarJsUsuarioId = dataUsuario[0];             
    $('#txtNuevoUsuario').val(dataUsuario[1]);                        
    VarJsUsuario = dataUsuario[1];                   
    $('#txtNuevoClave').val(dataUsuario[2]);                        
    VarJsClave = dataUsuario[2];                   
    $('#txtNuevoNombre1').val(dataUsuario[3]);                        
    VarJsNombre1 = dataUsuario[3];                   
    $('#txtNuevoApellido1').val(dataUsuario[4]);                        
    VarJsApellido1 = dataUsuario[4];                   

    CRUDUsuario = "U";               
});
$(document).on('click', '.btn-deleteUsuario', function (e) {         
    e.preventDefault();
    FnJsDUsuario();
    EUsuario = false; 

    FnJsBlockUsuario();      
    var dataUsuario = tablaUsuario.row($(this).parents("tr")).data();                                                
    VarJsUsuarioId = dataUsuario[0];             
    $('#txtNuevoUsuario').val(dataUsuario[1]);                        
    VarJsUsuario = dataUsuario[1];                   
    $('#txtNuevoClave').val(dataUsuario[2]);                        
    VarJsClave = dataUsuario[2];                   
    $('#txtNuevoNombre1').val(dataUsuario[3]);                        
    VarJsNombre1 = dataUsuario[3];                   
    $('#txtNuevoApellido1').val(dataUsuario[4]);                        
    VarJsApellido1 = dataUsuario[4];                   

    CRUDUsuario = "D";
});

function FnJsCUsuario() {       
    $('#lblexistenuevoUsuario').text("");                

    $("#DivModBorUsuario").removeAttr("class");         
    $("#DivModBorUsuario").attr('class', 'modal-content border-success');   
    $("#DivModHeaUsuario").removeAttr("class");         
    $("#DivModHeaUsuario").attr('class', 'modal-header bg-success');   
    $('#H4ModTitUsuario').text('Nuevo Usuario');
    $("#btnNueUsuario").removeAttr("class");         
    $("#btnNueUsuario").attr('class', 'btn btn-success pull-right');               
    $("#btnNueUsuario i").removeAttr("class");
    $("#btnNueUsuario i").attr("class", "fa fa-save fa-2x");
    $("#txtNuevoUsuario").attr('disabled', false);                   
    $("#txtNuevoClave").attr('disabled', false);                   
    $("#txtNuevoNombre1").attr('disabled', true);                   
    $("#txtNuevoApellido1").attr('disabled', true);                   

    $('#' + ModCUsuario[0].id + ' :text').val("");             

}
function FnJsUUsuario() {       
    $('#lblexistenuevoUsuario').text("");                
      
    $("#DivModBorUsuario").removeAttr("class");         
    $("#DivModBorUsuario").attr('class', 'modal-content border-warning');   
    $("#DivModHeaUsuario").removeAttr("class");         
    $("#DivModHeaUsuario").attr('class', 'modal-header bg-warning');   
    $('#H4ModTitUsuario').text('Editar Usuario');
    $("#btnNueUsuario").removeAttr("class");         
    $("#btnNueUsuario").attr('class', 'btn btn-warning pull-right');               
    $("#btnNueUsuario i").removeAttr("class");
    $("#btnNueUsuario i").attr("class", "fa fa-save fa-2x");
    $("#txtNuevoUsuario").attr('disabled', false);                      
    $("#txtNuevoClave").attr('disabled', false);                   
    $("#txtNuevoNombre1").attr('disabled', true);                   
    $("#txtNuevoApellido1").attr('disabled', true);                   

    $('#' + ModCUsuario[0].id + ' :text').val("");             

}
function FnJsDUsuario() {       
    $('#lblexistenuevoUsuario').text("");                

    $("#DivModBorUsuario").removeAttr("class");         
    $("#DivModBorUsuario").attr('class', 'modal-content border-danger');   
    $("#DivModHeaUsuario").removeAttr("class");         
    $("#DivModHeaUsuario").attr('class', 'modal-header bg-danger');   
    $('#H4ModTitUsuario').text('Eliminar Usuario');
    $("#btnNueUsuario").removeAttr("class");         
    $("#btnNueUsuario").attr('class', 'btn btn-danger pull-right');               
    $("#btnNueUsuario i").removeAttr("class");
    $("#btnNueUsuario i").attr("class", "fa fa-trash fa-2x");
    $("#txtNuevoUsuario").attr('disabled', true);                   
    $("#txtNuevoClave").attr('disabled', true);                   
    $("#txtNuevoNombre1").attr('disabled', true);                   
    $("#txtNuevoApellido1").attr('disabled', true);                   

    $('#' + ModCUsuario[0].id + ' :text').val("");             

}


function FnJsBlockUsuario() {         

    if (EUsuario == true) {      
        $("#btnNueUsuario").fadeOut("fast");                      
        $("#btnNueUsuario").attr('disabled', true);                                         
    }
    else if (EUsuario == false) {      
        $("#btnNueUsuario").fadeIn("slow");                      
        $("#btnNueUsuario").attr('disabled', false);                                         
    }
}


$('#btnNueUsuario').click(function (e) {               
    e.preventDefault();
    if (formUsuario.checkValidity()) {
        switch (CRUDUsuario) {          
            case "C":
                FnJsAjaxCUsuario();             
                break;
            case "U":
                FnJsAjaxUUsuario();            
                break;
            case "D":
                FnJsAjaxDUsuario();            
                break;
            default:
                console.log("Error en cud Usuario");
        }
    }   
});

function FnJsAjaxCUsuario() {
    $.ajax({
        url: "/modulo7/VstUsuarios.aspx/FnCUsuarioV",                            
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({                  
            Usuario: VarJsUsuario,
            Clave: VarJsClave,
            IdEmpleado: VarJsIdEmpleado

        }),    
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Usuario Agregado");                         
            }
            else {
                CRUDUsuario = "error"
                console.log("No se pudo agregar Tipo de indentificación");
            }
            FnAlertaUsuario();             
        }
    });   
}
function FnJsAjaxUUsuario() {
    $.ajax({
        url: "/modulo7/VstUsuarios.aspx/FnUUsuarioV",                         
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({                  
            IdUsuario: VarJsUsuarioId,
            Usuario: VarJsUsuario,
            Clave: VarJsClave

        }),    
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Usuario Actualizado"); 
            }
            else {
                CRUDUsuario = "error"
                console.log("no se pudo actualizar Usuario");
            }
            FnAlertaUsuario();            
        }
    });   
}
function FnJsAjaxDUsuario() {
    $.ajax({
        url: "/modulo7/VstUsuarios.aspx/FnDUsuarioV",                            
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdUsuario: VarJsUsuarioId
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Usuario Eliminado"); 
            }
            else {
                CRUDUsuario = "error"
                console.log("No se pudo Eliminar Usuario");
            }
            FnAlertaUsuario();             

        }
    });   
}

function FnJsAjaxEUsuario() {                  
    $.ajax({
        url: "/modulo7/VstUsuarios.aspx/FnEUsuarioV",                            
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdUsuario: VarJsUsuarioId,
            Usuario: VarJsUsuario
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                EUsuario = true;          
                $('#lblexistenuevoUsuario').text("Existe Usuario");               
                FnJsBlockUsuario();            

            }
            else {
                EUsuario = false;         
                $('#lblexistenuevoUsuario').text("");                
                FnJsBlockUsuario();             
            }
        }
    });   
}

function VerificarExisteUsuario() {               
    if ($('#txtNuevoUsuario').val().length >= 3) {                            
        return true;
    }
    else {
        return false;
    }
}

$('#txtNuevoUsuario').keyup(function (e) {                     
    VarJsUsuario = $(this).val();                
    if (VerificarExisteUsuario()) {            
        FnJsAjaxEUsuario();                

    }
});

$('#txtNuevoClave').keyup(function (e) {                     
    VarJsClave = $(this).val();                            
});

function FnAlertaUsuario() {            

    switch (CRUDUsuario) {               
        case "C":
            VarJsColorAlertUsuario = "bg-success";            
            VarJsTextoAlertUsuario = "Creado";            
            break;
        case "U":
            VarJsColorAlertUsuario = "bg-warning";            
            VarJsTextoAlertUsuario = "Actualizado";            
            break;
        case "D":
            VarJsColorAlertUsuario = "bg-danger";            
            VarJsTextoAlertUsuario = "Eliminado";            
            break;
        case "Error":
            VarJsColorAlertUsuario = "bg-secondary";            
            VarJsTextoAlertUsuario = "No se pudo realizar la operación";            
            break;
        default:
            console.log("Error CUD Usuario Alert")
    }
    $('.bd-example-modal-sm .modal-content').addClass(VarJsColorAlertUsuario);            
    $('.bd-example-modal-sm h5').text(VarJsTextoAlertUsuario);            
    $('.bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.bd-example-modal-sm').modal('hide');
        $('.bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertUsuario);            
    }, 1500);                           

    if ($("#secciontblUsuario.show").length > 0) {      
        FnJsAjaxRUsuario();                     
        FnJsAjaxRUsuarioNEmpleado();

    }
    $("#modalNUsuario").modal("toggle");      
}