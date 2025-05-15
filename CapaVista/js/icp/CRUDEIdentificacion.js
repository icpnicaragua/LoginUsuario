var tablaIdentificacion;   
var ModCIdentificacion = $('#modalNIdentificacion');       
var VarJsIdentificacionId = 0;
var VarJsIdentificacion = "";
var VarJsIdTipoIdentificacion = 0;
var VarJsIdPersona = 0;
var VAlDDLIdentificacionTipoIdentificacion = "null";                                       

var formIdentificacion = document.querySelector('#form1');

CRUDIdentificacion = "";
var VarJsColorAlertIdentificacion = "";
var VarJsTextoAlertIdentificacion = "";
var EIdentificacion = true;

$('#tblPersona tbody').on('click', 'tr', function () {
    var tablaPersona = $('#tblPersona').DataTable();
    console.log('iden : ' + tablaPersona.row(this).data()[0]);
    VarJsIdPersona = tablaPersona.row(this).data()[0];
    FnJsAjaxRIdentificacion();          
    FnJSFillDdlIdentificacionTipoIdentificacion();   
    $("#DatosPersona").attr('class', 'row collapse show');

})

function FnJsAjaxRIdentificacion() {                               
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnRIdentificacionV",                         
        data: JSON.stringify({                  
            IdPersona: VarJsIdPersona
        }),    
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowIdentificacion(data.d);                                        
        }
    }
    );
}

function AddrowIdentificacion(data) {

    $('#tblIdentificacion').DataTable().clear().destroy();

    tablaIdentificacion = $("#tblIdentificacion").DataTable({

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
                    id: 'colIdentificacion'
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
                filename: 'Identificación' + "_" + FnJsDate() + "_" + FnJsHour(),
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
                                    text: 'Identificación',
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Identificación'
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
                filename: 'Identificación' + "_" + FnJsDate() + "_" + FnJsHour(),
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
    tablaIdentificacion.buttons().container().addClass('form-inline');

    for (var contIdentificacion = 0; contIdentificacion < data.length; contIdentificacion++) {
        tablaIdentificacion.row.add([
            data[contIdentificacion].IdIdentificacion,
            data[contIdentificacion].Identificacion,
            data[contIdentificacion].ObjTipoIdentificacion.TipoIdentificacion,
            '<button value="editar" href="#modalNIdentificacion" data-toggle="modal" title="editar" class="btn btn-warning  btn-editIdentificacion"><i class="fas fa-pencil-alt"></i> </button>' +                     
            '<button value="eliminar" href="#modalNIdentificacion" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteIdentificacion"><i class="fa fa-trash" ></i> </button>'                     
        ]
        ).draw(false);
    }
}

$('#lbNIdentificacion').click(function (e) {
    e.preventDefault();
    FnJsCIdentificacion();
    EIdentificacion = true;

    FnJsBlockIdentificacion();
    FnJSFillDdlIdentificacionTipoIdentificacion();
    CRUDIdentificacion = "C";
    VarJsIdentificacionId = 0;
    VarJsIdentificacion = "";
    VarJsIdTipoIdentificacion = 0;             

});
$(document).on('click', '.btn-editIdentificacion', function (e) {         
    e.preventDefault();
    FnJsUIdentificacion();         
    var dataIdentificacion = tablaIdentificacion.row($(this).parents("tr")).data();                                                
    VarJsIdentificacionId = dataIdentificacion[0];             
    $('#txtNuevoIdentificacion').val(dataIdentificacion[1]);                        
    VarJsIdentificacion = dataIdentificacion[1];                   
    VAlDDLIdentificacionTipoIdentificacion = (dataIdentificacion[2]);
    FnJSFillDdlIdentificacionTipoIdentificacion();
    VarJsIdTipoIdentificacion = $('#ddlCIdentificacionTipoIdentificacion').val();
    CRUDIdentificacion = "U";               
});
$(document).on('click', '.btn-deleteIdentificacion', function (e) {         
    e.preventDefault();
    FnJsDIdentificacion();         
    EIdentificacion = false;             


    FnJsBlockIdentificacion();      
    var dataIdentificacion = tablaIdentificacion.row($(this).parents("tr")).data();                                                
    VarJsIdentificacionId = dataIdentificacion[0];             
    $('#txtNuevoIdentificacion').val(dataIdentificacion[1]);                        
    VarJsIdentificacion = dataIdentificacion[1];                   
    VAlDDLIdentificacionTipoIdentificacion = (dataIdentificacion[2]);
    FnJSFillDdlIdentificacionTipoIdentificacion();

    CRUDIdentificacion = "D";
});


function FnJsCIdentificacion() {
    $('#lblexistenuevoIdentificacion').text("");
    $("#DivModBorIdentificacion").removeAttr("class");

    $("#DivModBorIdentificacion").attr('class', 'modal-content border-success');

    $("#DivModHeaIdentificacion").removeAttr("class");
    $("#DivModHeaIdentificacion").attr('class', 'modal-header bg-success');

    $('#H4ModTitIdentificacion').text('Nuevo Identificación');

    $("#btnNueIdentificacion").removeAttr("class");
    $("#btnNueIdentificacion").attr('class', 'btn btn-success pull-right');
    $("#btnNueIdentificacion i").removeAttr("class");
    $("#btnNueIdentificacion i").attr("class", "fa fa-save fa-2x");

    $("#ddlCIdentificacionTipoIdentificacion").removeAttr("class");
    $("#ddlCIdentificacionTipoIdentificacion").attr("class", "form-control border-success");

    $("#txtNuevoIdentificacion").attr('disabled', false);
    $('#ddlCIdentificacionTipoIdentificacion').attr('disabled', false);

    $('#' + ModCIdentificacion[0].id + ' :text').val("");
}
function FnJsUIdentificacion() {
    $('#lblexistenuevoIdentificacion').text("");

    $("#DivModBorIdentificacion").removeAttr("class");
    $("#DivModBorIdentificacion").attr('class', 'modal-content border-warning');

    $("#DivModHeaIdentificacion").removeAttr("class");
    $("#DivModHeaIdentificacion").attr('class', 'modal-header bg-warning');

    $('#H4ModTitIdentificacion').text('Editar Identificación');

    $("#btnNueIdentificacion").removeAttr("class");
    $("#btnNueIdentificacion").attr('class', 'btn btn-warning pull-right');
    $("#btnNueIdentificacion i").removeAttr("class");
    $("#btnNueIdentificacion i").attr("class", "fa fa-save fa-2x");

    $("#ddlCIdentificacionTipoIdentificacion").removeAttr("class");
    $("#ddlCIdentificacionTipoIdentificacion").attr("class", "form-control border-warning");

    $("#txtNuevoIdentificacion").attr('disabled', false);
    $('#ddlCIdentificacionTipoIdentificacion').attr('disabled', false);

    $('#' + ModCIdentificacion[0].id + ' :text').val("");

}
function FnJsDIdentificacion() {

    $('#lblexistenuevoIdentificacion').text("");


    $("#DivModBorIdentificacion").removeAttr("class");
    $("#DivModBorIdentificacion").attr('class', 'modal-content border-danger');

    $("#DivModHeaIdentificacion").removeAttr("class");
    $("#DivModHeaIdentificacion").attr('class', 'modal-header bg-danger');



    $('#H4ModTitIdentificacion').text('Eliminar Identificación');

    $("#btnNueIdentificacion").removeAttr("class");
    $("#btnNueIdentificacion").attr('class', 'btn btn-danger pull-right');





    $("#btnNueIdentificacion i").removeAttr("class");
    $("#btnNueIdentificacion i").attr("class", "fa fa-trash fa-2x");

    $("#ddlCIdentificacionTipoIdentificacion").removeAttr("class");
    $("#ddlCIdentificacionTipoIdentificacion").attr("class", "form-control border-danger");

    $("#txtNuevoIdentificacion").attr('disabled', true);
    $('#ddlCIdentificacionTipoIdentificacion').attr('disabled', true);
    $('#' + ModCIdentificacion[0].id + ' :text').val("");

}
function FnJsBlockIdentificacion() {

    if (EIdentificacion == true) {      
        $("#btnNueIdentificacion").fadeOut("fast");                      
        $("#btnNueIdentificacion").attr('disabled', true);                                         
    }
    else if (EIdentificacion == false) {      
        $("#btnNueIdentificacion").fadeIn("slow");                      
        $("#btnNueIdentificacion").attr('disabled', false);                                         

    }
}
$('#btnNueIdentificacion').click(function (e) {               
    e.preventDefault();
    if (formIdentificacion.checkValidity()) {
        switch (CRUDIdentificacion) {          
            case "C":
                FnJsAjaxCIdentificacion();             
                break;
            case "U":
                FnJsAjaxUIdentificacion();            
                break;
            case "D":
                FnJsAjaxDIdentificacion();            
                break;
            default:
                console.log("Error en cud Identificación");
        }
    }
    console.log(formIdentificacion.checkValidity());
});
function FnJsAjaxCIdentificacion() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnCIdentificacionV",                            
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({                  
            Identificacion: VarJsIdentificacion,
            IdTipoIdentificacion: VarJsIdTipoIdentificacion,
            IdPersona: VarJsIdPersona
        }),    
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Identificación Agregado");                         
            }
            else {
                CRUDIdentificacion = "error"
                console.log("No se pudo agregar Tipo de indentificación");
            }
            FnAlertaIdentificacion();             
        }
    });   
}
function FnJsAjaxUIdentificacion() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnUIdentificacionV",                         
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({                  
            IdIdentificacion: VarJsIdentificacionId,
            Identificacion: VarJsIdentificacion,
            IdTipoIdentificacion: VarJsIdTipoIdentificacion

        }),    
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Identificación Actualizado"); 
            }
            else {
                CRUDIdentificacion = "error"
                console.log("no se pudo actualizar");
            }
            FnAlertaIdentificacion();            
        }
    });   
}
function FnJsAjaxDIdentificacion() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnDIdentificacionV",                            
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({                  
            IdIdentificacion: VarJsIdentificacionId
        }),    
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                   
                console.log("Identificación Eliminado"); 
            }
            else {
                CRUDIdentificacion = "error"
                console.log("No se pudo Eliminar Identificación");
            }
            FnAlertaIdentificacion();             
        }
    });   
}
function FnJsAjaxEIdentificacion() {                  
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnEIdentificacionV",                            
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({   
            IdIdentificacion: VarJsIdentificacionId,
            Identificacion: VarJsIdentificacion,
            IdTipoIdentificacion: VarJsIdTipoIdentificacion
        }),    
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                EIdentificacion = true;          
                $('#lblexistenuevoIdentificacion').text("Existe Identificación");               
                FnJsBlockIdentificacion();            

            }
            else {
                EIdentificacion = false;         
                $('#lblexistenuevoIdentificacion').text("");
                FnJsBlockIdentificacion();             
            }
        }
    });   
}


function VerificarExisteIdentificacion() {               
    if ($('#txtNuevoIdentificacion').val().length >= 3 && $('#ddlCIdentificacionTipoIdentificacion').val() > 0) {                            
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoIdentificacion').keyup(function (e) {                     
    VarJsIdentificacion = $(this).val();                
    if (VerificarExisteIdentificacion()) {            
        FnJsAjaxEIdentificacion();                

    }
});

$('#ddlCIdentificacionTipoIdentificacion').change(function (e) {
    VarJsIdTipoIdentificacion = $('#ddlCIdentificacionTipoIdentificacion').val();
    if (VerificarExisteIdentificacion()) {
        FnJsAjaxEIdentificacion();
    }
});

function FnJSFillDdlIdentificacionTipoIdentificacion() {
    $('#ddlCIdentificacionTipoIdentificacion').empty();       
    $.ajax({
        type: "POST",
        url: "/modulo7/VstGenerales.aspx/FnRTipoIdentificacionV",    
        data: {},          
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLIdentificacionTipoIdentificacion == "null") {
                $('#ddlCIdentificacionTipoIdentificacion').append($("<option> </option>").val("0").html("Seleccionar Tipo Identificación"));                                                  
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLIdentificacionTipoIdentificacion == value.TipoIdentificacion) {
                        $('#ddlCIdentificacionTipoIdentificacion').append($("<option> </option>").val(value.IdTipoIdentificacion).html(value.TipoIdentificacion));           
                        VarJsIdTipoIdentificacion = value.IdTipoIdentificacion;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCIdentificacionTipoIdentificacion').append($("<option> </option>").val(value.IdTipoIdentificacion).html(value.TipoIdentificacion));                            
            });
            VAlDDLIdentificacionTipoIdentificacion = "null";
        }
    });
}
function FnAlertaIdentificacion() {

    switch (CRUDIdentificacion) {
        case "C":
            VarJsColorAlertIdentificacion = "bg-success";
            VarJsTextoAlertIdentificacion = "Creado";            
            break;
        case "U":
            VarJsColorAlertIdentificacion = "bg-warning";
            VarJsTextoAlertIdentificacion = "Actualizado";            
            break;
        case "D":
            VarJsColorAlertIdentificacion = "bg-danger";
            VarJsTextoAlertIdentificacion = "Eliminado";            
            break;
        case "Error":
            VarJsColorAlertIdentificacion = "bg-secondary";
            VarJsTextoAlertIdentificacion = "No se pudo realizar la operación";            
            break;
        default:
            console.log("Error CUD Identificación Alert");
    }

    $('.bd-example-modal-sm .modal-content').addClass(VarJsColorAlertIdentificacion);
    $('.bd-example-modal-sm h5').text(VarJsTextoAlertIdentificacion);            
    $('.bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.bd-example-modal-sm').modal('hide');
        $('.bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertIdentificacion);
    }, 1500);                           
    console.log($("#secciontblIdentificacion.show").length)
    if ($("#secciontblIdentificacion.show").length > 0) {
        FnJsAjaxRIdentificacion();
    }
       
    $("#modalNIdentificacion").modal("toggle");      
}