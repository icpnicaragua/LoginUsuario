var tablaBanco;   
var ModCBanco = $('#modalNBanco');       
var VarJsBancoId = 0;
var VarJsBanco = "";

var formBanco = document.querySelector('#form1');

CRUDBanco = "";
var VarJsColorAlertBanco = "";
var VarJsTextoAlertBanco = "";
var EBanco = true;

$('#lbMostrarBanco').click(function (e) {                  
    e.preventDefault();
    FnJsAjaxRBanco();          
});

function FnJsAjaxRBanco() {                               
    $.ajax({
        type: "POST",
        url: "/modulo1/VstCuentasbanco.aspx/FnRBancoV",                         
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowBanco(data.d);                                        
        }
    }
    );
}
function AddrowBanco(data) {
    $('#tblBanco').DataTable().clear().destroy();
    tablaBanco = $("#tblBanco").DataTable({
        "retrieve": true,
        dom: 'Bfrtip',
        "order": [1, 'asc'],                                             
        "columnDefs": [
            { "targets": 2, "searchable": false },
            { "orderable": false, "targets": 2 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colBanco'                  
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
                    columns: [':not(:eq(2)):visible']                               
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
                    columns: [':not(:eq(2)):visible']                                  
                },
                titleAttr: 'PDF',
                filename: 'Banco' + "_" + FnJsDate() + "_" + FnJsHour(),         
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
                                    text: 'Banco', 
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Banco' 
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
                filename: 'Banco' + "_" + FnJsDate() + "_" + FnJsHour(), 
                text: '<i class="far fa-file-excel fa-2x"></i>',
                className: 'btn btn-success d-none d-lg-block',
                exportOptions: {
                    columns: [':not(:eq(2)):visible']                               
                },
                titleAttr: 'Excel',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')
                }
            }
        ],
        "language": FnJsEspTbl()
    });
    tablaBanco.buttons().container().addClass('form-inline');
    for (var contBanco = 0; contBanco < data.length; contBanco++) {                         
        tablaBanco.row.add([
            data[contBanco].IdBanco,
            data[contBanco].Banco,
            '<button value="editar" href="#modalNBanco" data-toggle="modal" title="editar" class="btn btn-warning  btn-editBanco"><i class="fas fa-pencil-alt"></i> </button>' +                     
            '<button value="eliminar" href="#modalNBanco" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteBanco"><i class="fa fa-trash" ></i> </button>'                     
        ]
        ).draw(false);
    }
}

$('#lbNBanco').click(function (e) {                  
    e.preventDefault();
    FnJsCBanco();          
    EBanco = true;       

    FnJsBlockBanco();          

    CRUDBanco = "C";          

    VarJsBancoId = 0;                      
    VarJsBanco = "";
});
$(document).on('click', '.btn-editBanco', function (e) {         
    e.preventDefault();
    FnJsUBanco();         
    var dataBanco = tablaBanco.row($(this).parents("tr")).data();                                                
    VarJsBancoId = dataBanco[0];             
    $('#txtNuevoBanco').val(dataBanco[1]);                        
    VarJsBanco = dataBanco[1];
    CRUDBanco = "U";               
});
$(document).on('click', '.btn-deleteBanco', function (e) {         
    e.preventDefault();
    FnJsDBanco();         
    EBanco = false;

    FnJsBlockBanco();      
    var dataBanco = tablaBanco.row($(this).parents("tr")).data();                                                
    VarJsBancoId = dataBanco[0];             
    $('#txtNuevoBanco').val(dataBanco[1]);                        

    VarJsBanco = dataBanco[1];                   

    CRUDBanco = "D";
});

function FnJsCBanco() {       
    $('#lblexistenuevoBanco').text("");                

    $("#DivModBorBanco").removeAttr("class");         
    $("#DivModBorBanco").attr('class', 'modal-content border-success');   
    $("#DivModHeaBanco").removeAttr("class");         
    $("#DivModHeaBanco").attr('class', 'modal-header bg-success');   
    $('#H4ModTitBanco').text('Nuevo Banco');
    $("#btnNueBanco").removeAttr("class");         
    $("#btnNueBanco").attr('class', 'btn btn-success pull-right');               
    $("#btnNueBanco i").removeAttr("class");
    $("#btnNueBanco i").attr("class", "fa fa-save fa-2x");
    $("#txtNuevoBanco").attr('disabled', false);                   

    $('#' + ModCBanco[0].id + ' :text').val("");
}
function FnJsUBanco() {       
    $('#lblexistenuevoBanco').text("");

    $("#DivModBorBanco").removeAttr("class");         
    $("#DivModBorBanco").attr('class', 'modal-content border-warning');   
    $("#DivModHeaBanco").removeAttr("class");         
    $("#DivModHeaBanco").attr('class', 'modal-header bg-warning');   
    $('#H4ModTitBanco').text('Editar Banco');
    $("#btnNueBanco").removeAttr("class");         
    $("#btnNueBanco").attr('class', 'btn btn-warning pull-right');               
    $("#btnNueBanco i").removeAttr("class");
    $("#btnNueBanco i").attr("class", "fa fa-save fa-2x");
    $("#txtNuevoBanco").attr('disabled', false);                   

    $('#' + ModCBanco[0].id + ' :text').val("");
}
function FnJsDBanco() {       
    $('#lblexistenuevoBanco').text("");                

    $("#DivModBorBanco").removeAttr("class");         
    $("#DivModBorBanco").attr('class', 'modal-content border-danger');   
    $("#DivModHeaBanco").removeAttr("class");         
    $("#DivModHeaBanco").attr('class', 'modal-header bg-danger');   
    $('#H4ModTitBanco').text('Eliminar Banco');
    $("#btnNueBanco").removeAttr("class");         
    $("#btnNueBanco").attr('class', 'btn btn-danger pull-right');               
    $("#btnNueBanco i").removeAttr("class");
    $("#btnNueBanco i").attr("class", "fa fa-trash fa-2x");
    $("#txtNuevoBanco").attr('disabled', true);                   

    $('#' + ModCBanco[0].id + ' :text').val("");
}

function FnJsBlockBanco() {
    if (EBanco == true) {      
        $("#btnNueBanco").fadeOut("fast");                      
        $("#btnNueBanco").attr('disabled', true);                                         
    }
    else if (EBanco == false) {      
        $("#btnNueBanco").fadeIn("slow");                      
        $("#btnNueBanco").attr('disabled', false);                                         
    }
}

$('#btnNueBanco').click(function (e) {               
    e.preventDefault();
    if (formBanco.checkValidity()) {
        switch (CRUDBanco) {          
            case "C":
                FnJsAjaxCBanco();             
                break;
            case "U":
                FnJsAjaxUBanco();            
                break;
            case "D":
                FnJsAjaxDBanco();            
                break;
            default:
                console.log("Error en cud Banco");
        }
    }    
});

function FnJsAjaxCBanco() {
    $.ajax({
        url: "/modulo1/VstCuentasbanco.aspx/FnCBancoV",                            
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({                  
            Banco: VarJsBanco
        }),    
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Banco Agregado");                         
            }
            else {
                CRUDBanco = "error"
                console.log("No se pudo agregar Banco");
            }
            FnAlertaBanco();             
        }
    });   
}
function FnJsAjaxUBanco() {
    $.ajax({
        url: "/modulo1/VstCuentasbanco.aspx/FnUBancoV",                         
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({                  
            IdBanco: VarJsBancoId,
            Banco: VarJsBanco
        }),    
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Banco Actualizado"); 
            }
            else {
                CRUDBanco = "error"
                console.log("no se pudo actualizar");
            }
            FnAlertaBanco();            
        }
    });   
}
function FnJsAjaxDBanco() {
    $.ajax({
        url: "/modulo1/VstCuentasbanco.aspx/FnDBancoV",                            
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({                  
            IdBanco: VarJsBancoId
        }),    
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Banco Eliminado"); 
            }
            else {
                CRUDBanco = "error"
                console.log("No se pudo Eliminar Banco");
            }
            FnAlertaBanco();
        }
    });   
}

function FnJsAjaxEBanco() {                  
    $.ajax({
        url: "/modulo1/VstCuentasbanco.aspx/FnEBancoV",                            
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({   
            IdBanco: VarJsBancoId,
            Banco: VarJsBanco
        }),    
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                EBanco = true;          
                $('#lblexistenuevoBanco').text("Existe Banco");               
                FnJsBlockBanco();
            }
            else {
                EBanco = false;         
                $('#lblexistenuevoBanco').text("");                
                FnJsBlockBanco();             
            }
        }
    });   
}


function VerificarExisteBanco() {               
    if ($('#txtNuevoBanco').val().length > 3) {                            
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoBanco').keyup(function (e) {                     
    VarJsBanco = $(this).val();                
    if (VerificarExisteBanco()) {            
        FnJsAjaxEBanco();
    }
});


function FnAlertaBanco() {
    switch (CRUDBanco) {               
        case "C":
            VarJsColorAlertBanco = "bg-success";            
            VarJsTextoAlertBanco = "Creado";            
            break;
        case "U":
            VarJsColorAlertBanco = "bg-warning";            
            VarJsTextoAlertBanco = "Actualizado";            
            break;
        case "D":
            VarJsColorAlertBanco = "bg-danger";            
            VarJsTextoAlertBanco = "Eliminado";            
            break;
        case "Error":
            VarJsColorAlertBanco = "bg-secondary";            
            VarJsTextoAlertBanco = "No se pudo realizar la operación";            
            break;
        default:
            console.log("Error CUD Banco Alert")
    }
    $('.bd-example-modal-sm .modal-content').addClass(VarJsColorAlertBanco);            
    $('.bd-example-modal-sm h5').text(VarJsTextoAlertBanco);            
    $('.bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.bd-example-modal-sm').modal('hide');
        $('.bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertBanco);            
    }, 1500);                           

    if ($("#secciontblBanco.show").length > 0) {      
        FnJsAjaxRBanco();                     
    }
    $("#modalNBanco").modal("toggle");      
}