var tablaBodega;   
var ModCBodega = $('#modalNBodega');       
var VarJsBodegaId = 0;
var VarJsBodega = "";
var VarJsIdSucursal = 0;

var VarJsDescripcion = "";
var VarJsSucursal = "";
var VarJsIdResponsable = 0;
var VarJsResponsable = "";


var VAlDDLBodegaSucursal = "null";                                       
var VAlDDLBodegaResponsable = "null";                                       

var formBodega = document.querySelector('#form1');

CRUDBodega = "";
var VarJsColorAlertBodega = "";
var VarJsTextoAlertBodega = "";
var EBodega = true;


$('#lbMostrarBodega').click(function (e) {                  
    e.preventDefault();
    FnJsAjaxRBodega();          
    FnJSFillDdlBodegaSucursal();   
});

function FnJsAjaxRBodega() {                               
    $.ajax({
        type: "POST",
        url: "/modulo3/VstBodega.aspx/FnRBodegaV",                         
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowBodega(data.d);                                        
        }
    }
    );
}

function AddrowBodega(data) {            

    $('#tblBodega').DataTable().clear().destroy();                            

    tablaBodega = $("#tblBodega").DataTable({            

        "retrieve": true,
        dom: 'Bfrtip',

        "order": [1, 'asc'],                                             
        "columnDefs": [
            { "targets": 5, "searchable": false },
            { "orderable": false, "targets": 5 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colBodega'                  
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
                filename: 'Bodega' + "_" + FnJsDate() + "_" + FnJsHour(),         
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
                                    text: 'Bodega', 
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Bodega' 
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
                filename: 'Bodega' + "_" + FnJsDate() + "_" + FnJsHour(), 
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
    tablaBodega.buttons().container().addClass('form-inline');   

    for (var contBodega = 0; contBodega < data.length; contBodega++) {                         
        tablaBodega.row.add([
            data[contBodega].IdBodega,
            data[contBodega].NombreBodega,
            data[contBodega].Descripcion,
            data[contBodega].ObjSucursal.Sucursal,
            data[contBodega].ObjResponsable.ObjPersona.Nombre1 + ' ' + data[contBodega].ObjResponsable.ObjPersona.Apellido1,
            '<button value="editar" href="#modalNBodega" data-toggle="modal" title="editar" class="btn btn-warning  btn-editBodega"><i class="fas fa-pencil-alt"></i> </button>' +                     
            '<button value="eliminar" href="#modalNBodega" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteBodega"><i class="fa fa-trash" ></i> </button>'                     
        ]
        ).draw(false);
    }
}

$('#lbNBodega').click(function (e) {                  
    e.preventDefault();
    FnJsCBodega();          
    EBodega = true;       

    FnJsBlockBodega();          
    FnJSFillDdlBodegaSucursal();
    FnJSFillDdlBodegaResponsable();
    CRUDBodega = "C";          

    VarJsBodegaId = 0;                      
    VarJsBodega = "";                      
    VarJsIdSucursal = 0;

    VarJsDescripcion = "";
    VarJsSucursal = "";
    VarJsIdResponsable = 0;
    VarJsResponsable = "";
});
$(document).on('click', '.btn-editBodega', function (e) {         
    e.preventDefault();
    FnJsUBodega();         
    var dataBodega = tablaBodega.row($(this).parents("tr")).data();                                                

    VarJsBodegaId = dataBodega[0];             

    $('#txtNuevoBodega').val(dataBodega[1]);                        
    VarJsBodega = dataBodega[1];                   

    $('#txtNuevoDescripcion').val(dataBodega[2]);                        
    VarJsDescripcion = dataBodega[2];                   

    VAlDDLBodegaSucursal = (dataBodega[3]);
    VarJsSucursal = dataBodega[3];
    FnJSFillDdlBodegaSucursal();    
    VarJsIdSucursal = $('#ddlCBodegaSucursal').val();
    
    VAlDDLBodegaResponsable = (dataBodega[4]);
    VarJsResponsable = (dataBodega[4]);
    FnJSFillDdlBodegaResponsable();
    VarJsIdResponsable = $('#ddlCBodegaResponsable').val();
        
    CRUDBodega = "U";               
});
$(document).on('click', '.btn-deleteBodega', function (e) {         
    e.preventDefault();
    FnJsDBodega();         
    EBodega = false;             


    FnJsBlockBodega();      
    var dataBodega = tablaBodega.row($(this).parents("tr")).data();                                                
    VarJsBodegaId = dataBodega[0];             

    $('#txtNuevoBodega').val(dataBodega[1]);                        
    VarJsBodega = dataBodega[1];                   

    $('#txtNuevoDescripcion').val(dataBodega[2]);                        
    VarJsDescripcion = dataBodega[2];                   

    VAlDDLBodegaSucursal = (dataBodega[3]);
    VarJsSucursal = dataBodega[3];
    FnJSFillDdlBodegaSucursal();
  
    VAlDDLBodegaResponsable = (dataBodega[4]);
    VarJsResponsable = (dataBodega[4]);
    FnJSFillDdlBodegaResponsable();
  
    CRUDBodega = "D";
});

function FnJsCBodega() {       
    $('#lblexistenuevoBodega').text("");                

    $("#DivModBorBodega").removeAttr("class");         
    $("#DivModBorBodega").attr('class', 'modal-content border-success');   
    $("#DivModHeaBodega").removeAttr("class");         
    $("#DivModHeaBodega").attr('class', 'modal-header bg-success');   
    $('#H4ModTitBodega').text('Nuevo Bodega');
    $("#btnNueBodega").removeAttr("class");         
    $("#btnNueBodega").attr('class', 'btn btn-success pull-right');               
    $("#btnNueBodega i").removeAttr("class");
    $("#btnNueBodega i").attr("class", "fa fa-save fa-2x");
    $("#ddlCBodegaSucursal").removeAttr("class");    
    $("#ddlCBodegaSucursal").attr("class", "form-control border-success");   
    $("#ddlCBodegaResponsable").removeAttr("class");    
    $("#ddlCBodegaResponsable").attr("class", "form-control border-success");   
    
    $("#txtNuevoBodega").attr('disabled', false);                   
    $("#txtNuevoDescripcion").attr('disabled', false);                   
    
    $('#ddlCBodegaSucursal').attr('disabled', false);
    $('#ddlCBodegaResponsable').attr('disabled', false);
    
    $('#' + ModCBodega[0].id + ' :text').val("");             

}
function FnJsUBodega() {       
    $('#lblexistenuevoBodega').text("");                

    console.log("colorear nuevo");
    $("#DivModBorBodega").removeAttr("class");         
    $("#DivModBorBodega").attr('class', 'modal-content border-warning');   
    $("#DivModHeaBodega").removeAttr("class");         
    $("#DivModHeaBodega").attr('class', 'modal-header bg-warning');   
    $('#H4ModTitBodega').text('Editar Bodega');
    $("#btnNueBodega").removeAttr("class");         
    $("#btnNueBodega").attr('class', 'btn btn-warning pull-right');               
    $("#btnNueBodega i").removeAttr("class");
    $("#btnNueBodega i").attr("class", "fa fa-save fa-2x");
    $("#ddlCBodegaSucursal").removeAttr("class");    
    $("#ddlCBodegaSucursal").attr("class", "form-control border-warning");   
    $("#ddlCBodegaResponsable").removeAttr("class");    
    $("#ddlCBodegaResponsable").attr("class", "form-control border-warning");   

    $("#txtNuevoBodega").attr('disabled', false);                   
    $("#txtNuevoDescripcion").attr('disabled', false);                   

    $('#ddlCBodegaSucursal').attr('disabled', false);
    $('#ddlCBodegaResponsable').attr('disabled', false);
    $('#' + ModCBodega[0].id + ' :text').val("");             

}
function FnJsDBodega() {       
    $('#lblexistenuevoBodega').text("");                

    $("#DivModBorBodega").removeAttr("class");         
    $("#DivModBorBodega").attr('class', 'modal-content border-danger');   
    $("#DivModHeaBodega").removeAttr("class");         
    $("#DivModHeaBodega").attr('class', 'modal-header bg-danger');   
    $('#H4ModTitBodega').text('Eliminar Bodega');
    $("#btnNueBodega").removeAttr("class");         
    $("#btnNueBodega").attr('class', 'btn btn-danger pull-right');               
    $("#btnNueBodega i").removeAttr("class");
    $("#btnNueBodega i").attr("class", "fa fa-trash fa-2x");
    $("#ddlCBodegaSucursal").removeAttr("class");    
    $("#ddlCBodegaSucursal").attr("class", "form-control border-danger");   
    $("#ddlCBodegaResponsable").removeAttr("class");    
    $("#ddlCBodegaResponsable").attr("class", "form-control border-danger");   

    $("#txtNuevoBodega").attr('disabled', true);                   
    $("#txtNuevoDescripcion").attr('disabled', true);                   

    $('#ddlCBodegaSucursal').attr('disabled', true);
    $('#ddlCBodegaResponsable').attr('disabled', true);
    $('#' + ModCBodega[0].id + ' :text').val("");             

}

function FnJsBlockBodega() {         

    if (EBodega == true) {      
        $("#btnNueBodega").fadeOut("fast");                      
        $("#btnNueBodega").attr('disabled', true);                                         

    }
    else if (EBodega == false) {      
        $("#btnNueBodega").fadeIn("slow");                      
        $("#btnNueBodega").attr('disabled', false);                                         


    }
}

$('#btnNueBodega').click(function (e) {               
    e.preventDefault();
    if (formBodega.checkValidity()) {
        switch (CRUDBodega) {          
            case "C":
                FnJsAjaxCBodega();             
                break;
            case "U":
                FnJsAjaxUBodega();            
                break;
            case "D":
                FnJsAjaxDBodega();            
                break;
            default:
                console.log("Error en cud Bodega");
        }
    }
    console.log(formBodega.checkValidity());
});

function FnJsAjaxCBodega() {
    $.ajax({
        url: "/modulo3/VstBodega.aspx/FnCBodegaV",                            
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({                  
            Bodega: VarJsBodega,
            Descripcion:VarJsDescripcion,
            IdSucursal: VarJsIdSucursal,
            IdResponsable: VarJsIdResponsable
        }),    
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Bodega Agregado");                         
            }
            else {
                CRUDBodega = "error"
                console.log("No se pudo agregar Bodega");
            }
            FnAlertaBodega();             
        }
    });   
}
function FnJsAjaxUBodega() {
    $.ajax({
        url: "/modulo3/VstBodega.aspx/FnUBodegaV",                         
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({                  
            IdBodega: VarJsBodegaId,
            Bodega: VarJsBodega,
            Descripcion: VarJsDescripcion,
            IdSucursal: VarJsIdSucursal,
            IdResponsable: VarJsIdResponsable

        }),    
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Bodega Actualizado"); 
            }
            else {
                CRUDBodega = "error"
                console.log("no se pudo actualizar");
            }
            FnAlertaBodega();            
        }
    });   
}
function FnJsAjaxDBodega() {
    $.ajax({
        url: "/modulo3/VstBodega.aspx/FnDBodegaV",                            
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({                  
            IdBodega: VarJsBodegaId
        }),    
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Bodega Eliminado"); 
            }
            else {
                CRUDBodega = "error"
                console.log("No se pudo Eliminar Bodega");
            }
            FnAlertaBodega();             

        }
    });   
}

function FnJsAjaxEBodega() {                  
    $.ajax({
        url: "/modulo3/VstBodega.aspx/FnEBodegaV",                            
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({   
            IdBodega: VarJsBodegaId,
            Bodega: VarJsBodega,
            IdSucursal: VarJsIdSucursal
        }),    
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                EBodega = true;          
                $('#lblexistenuevoBodega').text("Existe Bodega");               
                FnJsBlockBodega();            

            }
            else {
                EBodega = false;         
                $('#lblexistenuevoBodega').text("");                
                FnJsBlockBodega();             
            }
        }
    });   
}


function VerificarExisteBodega() {               
    if ($('#txtNuevoBodega').val().length >= 3 && $('#ddlCBodegaSucursal').val() > 0 && $('#ddlCBodegaResponsable').val() > 0) {                            
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoBodega').keyup(function (e) {                     
    VarJsBodega = $(this).val();                
    if (VerificarExisteBodega()) {            
        FnJsAjaxEBodega();                

    }
});

$('#txtNuevoDescripcion').keyup(function (e) {                     
    VarJsDescripcion = $(this).val();                            
});

$('#ddlCBodegaSucursal').change(function (e) {
    VarJsIdSucursal = $('#ddlCBodegaSucursal').val();
    if (VerificarExisteBodega()) {
        FnJsAjaxEBodega();
    }
});



$('#ddlCBodegaResponsable').change(function (e) {
    VarJsIdResponsable = $('#ddlCBodegaResponsable').val();
    if (VerificarExisteBodega()) {
        FnJsAjaxEBodega();
    }
});

function FnJSFillDdlBodegaSucursal() {
    $('#ddlCBodegaSucursal').empty();       
    $.ajax({
        type: "POST",
        url: "/modulo3/VstBodega.aspx/FnRSucursalV",    
        data: {},          
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLBodegaSucursal == "null") {
                $('#ddlCBodegaSucursal').append($("<option> </option>").val("0").html("Seleccionar Sucursal"));                                                  
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLBodegaSucursal == value.Sucursal) {
                        $('#ddlCBodegaSucursal').append($("<option> </option>").val(value.IdSucursal).html(value.Sucursal));           
                        VarJsIdSucursal = value.IdSucursal;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCBodegaSucursal').append($("<option> </option>").val(value.IdSucursal).html(value.Sucursal));                            
            });
            VAlDDLBodegaSucursal = "null";
        }
    });
}

function FnJSFillDdlBodegaResponsable() {
    $('#ddlCBodegaResponsable').empty();       
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnREmpleadoV",    
        data: {},          
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLBodegaResponsable == "null") {
                $('#ddlCBodegaResponsable').append($("<option> </option>").val("0").html("Seleccionar Responsable"));                                                  
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLBodegaResponsable == value.ObjPersona.Nombre1 + ' ' + value.ObjPersona.Apellido1) {
                        $('#ddlCBodegaResponsable').append($("<option> </option>").val(value.IdEmpleado).html(value.ObjPersona.Nombre1 + ' ' + value.ObjPersona.Apellido1));           
                        VarJsIdResponsable = value.IdEmpleado;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCBodegaResponsable').append($("<option> </option>").val(value.IdEmpleado).html(value.ObjPersona.Nombre1 + ' ' + value.ObjPersona.Apellido1));                            
            });
            VAlDDLBodegaResponsable = "null";
        }
    });
}

function FnAlertaBodega() {            

    switch (CRUDBodega) {               
        case "C":
            VarJsColorAlertBodega = "bg-success";            
            VarJsTextoAlertBodega = "Creado";            
            break;
        case "U":
            VarJsColorAlertBodega = "bg-warning";            
            VarJsTextoAlertBodega = "Actualizado";            
            break;
        case "D":
            VarJsColorAlertBodega = "bg-danger";            
            VarJsTextoAlertBodega = "Eliminado";            
            break;
        case "Error":
            VarJsColorAlertBodega = "bg-secondary";            
            VarJsTextoAlertBodega = "No se pudo realizar la operación";            
            break;
        default:
            console.log("Error CUD Bodega Alert")
    }
    $('#alertaEmpleados .modal-content').addClass(VarJsColorAlertBodega);            
    $('#alertaEmpleados h5').text(VarJsTextoAlertBodega);            
    $('#alertaEmpleados').modal('show');
    setTimeout(function () {
        $('#alertaEmpleados').modal('hide');
        $('#alertaEmpleados .modal-content').removeClass(VarJsColorAlertBodega);            
    }, 1500);                           

    if ($("#secciontblBodega.show").length > 0) {      
        FnJsAjaxRBodega();                     
    }
    $("#modalNBodega").modal("toggle");      
}