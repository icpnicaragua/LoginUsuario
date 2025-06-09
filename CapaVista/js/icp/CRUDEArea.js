var tablaArea;   
var ModCArea = $('#modalNArea');       
var VarJsAreaId = 0;
var VarJsArea = "";


var formArea = document.querySelector('#form1');

CRUDArea = "";
var VarJsColorAlertArea = "";
var VarJsTextoAlertArea = "";
var EArea = true;


$('#lbMostrarArea').click(function (e) {                  
    e.preventDefault();
    FnJsAjaxRArea();          
});

function FnJsAjaxRArea() {                               
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnRAreaV",                         
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowArea(data.d);                                        
        }
    }
    );
}

function AddrowArea(data) {            

    $('#tblArea').DataTable().clear().destroy();                            

    tablaArea = $("#tblArea").DataTable({            

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
                    id: 'colArea'                  
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
                filename: 'Área' + "_" + FnJsDate() + "_" + FnJsHour(),         
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
                                    text: 'Área', 
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Área' 
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
                filename: 'Área' + "_" + FnJsDate() + "_" + FnJsHour(), 
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
    tablaArea.buttons().container().addClass('form-inline');   

    for (var contArea = 0; contArea < data.length; contArea++) {                         
        tablaArea.row.add([
            data[contArea].IdArea,
            data[contArea].Area,
            '<button value="editar" href="#modalNArea" data-toggle="modal" title="editar" class="btn btn-warning  btn-editArea"><i class="fas fa-pencil-alt"></i> </button>' +                     
            '<button value="eliminar" href="#modalNArea" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteArea"><i class="fa fa-trash" ></i> </button>'                     
        ]
        ).draw(false);
    }
}

$('#lbNArea').click(function (e) {                  
    e.preventDefault();
    FnJsCArea();          
    EArea = true;       

    FnJsBlockArea();          

    CRUDArea = "C";          

    VarJsAreaId = 0;                      
    VarJsArea = "";                      

});
$(document).on('click', '.btn-editArea', function (e) {         
    e.preventDefault();
    FnJsUArea();         
    var dataArea = tablaArea.row($(this).parents("tr")).data();                                                
    VarJsAreaId = dataArea[0];             
    $('#txtNuevoArea').val(dataArea[1]);                        
    VarJsArea = dataArea[1];                   

    CRUDArea = "U";               
});
$(document).on('click', '.btn-deleteArea', function (e) {         
    e.preventDefault();
    FnJsDArea();         
    EArea = false;             


    FnJsBlockArea();      
    var dataArea = tablaArea.row($(this).parents("tr")).data();                                                
    VarJsAreaId = dataArea[0];             
    $('#txtNuevoArea').val(dataArea[1]);                        

    VarJsArea = dataArea[1];                   

    CRUDArea = "D";
});

function FnJsCArea() {       
    $('#lblexistenuevoArea').text("");                

    $("#DivModBorArea").removeAttr("class");         
    $("#DivModBorArea").attr('class', 'modal-content border-success');   
    $("#DivModHeaArea").removeAttr("class");         
    $("#DivModHeaArea").attr('class', 'modal-header bg-success');   
    $('#H4ModTitArea').text('Nuevo Área');
    $("#btnNueArea").removeAttr("class");         
    $("#btnNueArea").attr('class', 'btn btn-success pull-right');               
    $("#btnNueArea i").removeAttr("class");
    $("#btnNueArea i").attr("class", "fa fa-save fa-2x");
    $("#txtNuevoArea").attr('disabled', false);                   

    $('#' + ModCArea[0].id + ' :text').val("");             

}
function FnJsUArea() {       
    $('#lblexistenuevoArea').text("");                

    console.log("colorear nuevo");
    $("#DivModBorArea").removeAttr("class");         
    $("#DivModBorArea").attr('class', 'modal-content border-warning');   
    $("#DivModHeaArea").removeAttr("class");         
    $("#DivModHeaArea").attr('class', 'modal-header bg-warning');   
    $('#H4ModTitArea').text('Editar Área');
    $("#btnNueArea").removeAttr("class");         
    $("#btnNueArea").attr('class', 'btn btn-warning pull-right');               
    $("#btnNueArea i").removeAttr("class");
    $("#btnNueArea i").attr("class", "fa fa-save fa-2x");
    $("#txtNuevoArea").attr('disabled', false);                   

    $('#' + ModCArea[0].id + ' :text').val("");             

}
function FnJsDArea() {       
    $('#lblexistenuevoArea').text("");                

    $("#DivModBorArea").removeAttr("class");         
    $("#DivModBorArea").attr('class', 'modal-content border-danger');   
    $("#DivModHeaArea").removeAttr("class");         
    $("#DivModHeaArea").attr('class', 'modal-header bg-danger');   
    $('#H4ModTitArea').text('Eliminar Área');
    $("#btnNueArea").removeAttr("class");         
    $("#btnNueArea").attr('class', 'btn btn-danger pull-right');               
    $("#btnNueArea i").removeAttr("class");
    $("#btnNueArea i").attr("class", "fa fa-trash fa-2x");
    $("#txtNuevoArea").attr('disabled', true);                   

    $('#' + ModCArea[0].id + ' :text').val("");             

}

function FnJsBlockArea() {         

    if (EArea == true) {      
        $("#btnNueArea").fadeOut("fast");                      
        $("#btnNueArea").attr('disabled', true);                                         
    }
    else if (EArea == false) {      
        $("#btnNueArea").fadeIn("slow");                      
        $("#btnNueArea").attr('disabled', false);                                         
    }
}

$('#btnNueArea').click(function (e) {               
    e.preventDefault();
    if (formArea.checkValidity()) {
        switch (CRUDArea) {          
            case "C":
                FnJsAjaxCArea();             
                break;
            case "U":
                FnJsAjaxUArea();            
                break;
            case "D":
                FnJsAjaxDArea();            
                break;
            default:
                console.log("Error en cud Área");
        }
    }
    console.log(formArea.checkValidity());
});

function FnJsAjaxCArea() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnCAreaV",                            
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({                  
            Area: VarJsArea,

        }),    
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Área Agregado");                         
            }
            else {
                CRUDArea = "error"
                console.log("No se pudo agregar Tipo de indentificación");
            }
            FnAlertaArea();             
        }
    });   
}
function FnJsAjaxUArea() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnUAreaV",                         
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({                  
            IdArea: VarJsAreaId,
            Area: VarJsArea,


        }),    
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Área Actualizado"); 
            }
            else {
                CRUDArea = "error"
                console.log("no se pudo actualizar");
            }
            FnAlertaArea();            
        }
    });   
}
function FnJsAjaxDArea() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnDAreaV",                            
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({                  
            IdArea: VarJsAreaId
        }),    
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Área Eliminado"); 
            }
            else {
                CRUDArea = "error"
                console.log("No se pudo Eliminar Área");
            }
            FnAlertaArea();             

        }
    });   
}

function FnJsAjaxEArea() {                  
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnEAreaV",                            
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({   
            IdArea: VarJsAreaId,
            Area: VarJsArea
        }),    
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                EArea = true;          
                $('#lblexistenuevoArea').text("Existe Área");               
                FnJsBlockArea();            

            }
            else {
                EArea = false;         
                $('#lblexistenuevoArea').text("");                
                FnJsBlockArea();             
            }
        }
    });   
}


function VerificarExisteArea() {               
    if ($('#txtNuevoArea').val().length > 3) {                            
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoArea').keyup(function (e) {                     
    VarJsArea = $(this).val();                
    if (VerificarExisteArea()) {            
        FnJsAjaxEArea();                

    }
});


function FnAlertaArea() {            

    switch (CRUDArea) {               
        case "C":
            VarJsColorAlertArea = "bg-success";            
            VarJsTextoAlertArea = "Creado";            
            break;
        case "U":
            VarJsColorAlertArea = "bg-warning";            
            VarJsTextoAlertArea = "Actualizado";            
            break;
        case "D":
            VarJsColorAlertArea = "bg-danger";            
            VarJsTextoAlertArea = "Eliminado";            
            break;
        case "Error":
            VarJsColorAlertArea = "bg-secondary";            
            VarJsTextoAlertArea = "No se pudo realizar la operación";            
            break;
        default:
            console.log("Error CUD Área Alert")
    }
    $('#alertaEmpleados .modal-content').addClass(VarJsColorAlertArea);            
    $('#alertaEmpleados h5').text(VarJsTextoAlertArea);            
    $('#alertaEmpleados').modal('show');
    setTimeout(function () {
        $('#alertaEmpleados').modal('hide');
        $('#alertaEmpleados .modal-content').removeClass(VarJsColorAlertArea);            
    }, 1500);                           

    if ($("#secciontblArea.show").length > 0) {      
        FnJsAjaxRArea();                     
    }
    $("#modalNArea").modal("toggle");      
}