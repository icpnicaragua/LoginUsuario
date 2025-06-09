var tablaE;
var VarJsModCElem = $('#ModCElem');
var VarJsElemId=0;         
var VarJsElemento = "";
var VarJsElementoAsp = "";
var VarJsIdTipoControl = "";
var VarJsIdVista = "";

var formElemento = document.querySelector('#form1');
var CRUDElemento = "";
var VarJsColorAlertElemento = "";
var VarJsTextoAlertElemento = "";

var VarjstxtCElemAEOK;
var VarjstxtCElemElOK;

var VarJslblCElemEl = $('#lblCElemEl');
var VarJstxtCElemEl = $('#txtCElemEl');
var VarJslblCElemAs = $('#lblCElemAs');
var VarJstxtCElemAs = $('#txtCElemAs');
var VarJsDdlCElemTC = $('#DdlCElemTC');
var VarJSDdlCElemVi = $('#DdlCElemVi');
var VarJsbtnCElem = $("#btnCElemento");
var VAlDDLElementoTC = "";
var VAlDDLElementoVista = "";

var VarJsDdlCElemOK;

$('#lbMostrarE').click(function (e) {
    e.preventDefault();
    FnJsAjaxRElemento();
});

function FnJsAjaxRElemento() {
    $.ajax({
        type: "POST",
        url: "/modulo4/vst13.aspx/FnRElem",                      
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            FnJsAddrowElemento(data.d);    
        }
    }
    );
}
function FnJsAddrowElemento(data) {

    $('#tblE').DataTable().clear().destroy();                   

    tablaE = $("#tblE").DataTable({

        "retrieve": true,
        dom: 'Bfrtip',
        "order": [1, 'asc'],                                 
        "columnDefs": [
            { "targets": 6, "searchable": false },
            { "orderable": false, "targets": 6 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colvise'               
                },
                text: '<i class="fas fa-columns fa-2x"></i>',             
                className: 'btn btn-info ',       
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
                    columns: [':not(:eq(6)):visible']                
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
                    columns: [':not(:eq(6)):visible']                
                },
                titleAttr: 'PDF',
                filename: 'Elem' + "_" + FnJsDate() + "_" + FnJsHour(),
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
                                    text: 'Soaz Dt',
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte soaz'
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
                filename: 'Elem' + "_" + FnJsDate() + "_" + FnJsHour(),
                text: '<i class="far fa-file-excel fa-2x"></i>',
                className: 'btn btn-success d-none d-lg-block',
                exportOptions: {
                    columns: [':not(:eq(6)):visible']                
                },
                titleAttr: 'Excel',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')
                }



            }
        ],
        "language": FnJsEspTbl()
    });

    tablaE.buttons().container().addClass('form-inline');


    for (var contE = 0; contE < data.length; contE++) {
        tablaE.row.add([
            data[contE].Id_elemento,
            data[contE].Elemento,
            data[contE].Idaspelemento,
            data[contE].Fecha_inicioElemento,
            data[contE].ObjTipo_control.Tipocontrol,
            data[contE].ObjVista.Vista,
            '<button value="editar" href="#ModCElem" data-toggle="modal" title="editar" class="btn btn-warning  btn-editEle"><i class="fas fa-pencil-alt"></i> </button>' +
            '<button value="eliminar" href="#ModCElem" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteEle"><i class="fa fa-trash" ></i> </button>'
        ]
        ).draw(false);
    }
}

$('#lbEN').click(function (e) {
    e.preventDefault();

    VarJsDdlCElemOK = true;
    VarjstxtCElemAEOK = true;
    VarjstxtCElemElOK = true;
    FnJsSbtnCelem();

    CRUDElemento = "C"

    VarJsElemId = '0';
     VarJsElemento = "";
     VarJsElementoAsp = "";
     VarJsIdTipoControl = "";
     VarJsIdVista = "";
     VAlDDLElementoTC = "";
     VAlDDLElementoVista = "";

    FnJSCUElemTC();
    FnJSCUElemVi();


    $('#FrmCElem :text').val("");   
    $('#FrmCElem label').text("");   

});
$(document).on('click', '.btn-editEle', function (e) {         
    e.preventDefault();
    FnJsUElemento();         
    var dataElemento = tablaE.row($(this).parents("tr")).data();                                                
    VarJsElemId = dataElemento[0];             
    $('#txtCElemEl').val(dataElemento[1]);                        
    $('#txtCElemAs').val(dataElemento[2]);                        
    VAlDDLElementoTC = dataElemento[4];
    VAlDDLElementoVista = dataElemento[5];
    FnJSCUElemTC();
    FnJSCUElemVi();

    CRUDElemento = "U";

    VarJsElemento = dataElemento[1];
    VarJsElementoAsp = dataElemento[2];
    VarJsIdTipoControl = $('#DdlCElemTC').val();;
    VarJsIdVista = $('#DdlCElemVi').val();;

});
$(document).on('click', '.btn-deleteEle', function (e) {         
    e.preventDefault();
    FnJsDElemento();         
    VarjstxtCElemAEOK = false;
    VarjstxtCElemElOK = false;

    FnJsSbtnCelem(); 
    var dataElemento = tablaE.row($(this).parents("tr")).data();                                                
    VarJsElemId = dataElemento[0];             
    $('#txtCElemEl').val(dataElemento[1]);                        
    $('#txtCElemAs').val(dataElemento[2]);                        

    VAlDDLElementoTC = dataElemento[4];
    VAlDDLElementoVista = dataElemento[5];

    FnJSCUElemTC();
    FnJSCUElemVi();

    CRUDElemento = "D";

    VarJsElemento = dataElemento[1];
    VarJsElementoAsp = dataElemento[2];
    VarJsIdTipoControl = $('#DdlCElemTC').val();;
    VarJsIdVista = $('#DdlCElemVi').val();;

});

function FnJsCElemento() {       
    $('#lblCElemEl').text("");                
    $('#lblCElemAs').text("");                
    $("#DivModBorElemento").removeAttr("class");         
    $("#DivModBorElemento").attr('class', 'modal-content border-success');   
    $("#DivModHeadElemento").removeAttr("class");         
    $("#DivModHeadElemento").attr('class', 'modal-header bg-success');   
    $('#H4ModTitElemento').text('Nuevo Elemento');
    $("#btnCElemento").removeAttr("class");         
    $("#btnCElemento").attr('class', 'btn btn-success pull-right');               
    $("#btnCElemento i").removeAttr("class");
    $("#btnCElemento i").attr("class", "fa fa-save fa-2x");
    $("#txtCElemEl").attr('disabled', false);                   
    $("#txtCElemAs").attr('disabled', false);                   
    $("#DdlCElemTC").attr('disabled', false);                   
    $("#DdlCElemVi").attr('disabled', false);                   
    $('#' + VarJsModCElem[0].id + ' :text').val("");             

}
function FnJsUElemento() {       

    $('#lblCElemEl').text("");                
    $('#lblCElemAs').text("");                
    $("#DivModBorElemento").removeAttr("class");         
    $("#DivModBorElemento").attr('class', 'modal-content border-warning');   
    $("#DivModHeadElemento").removeAttr("class");         
    $("#DivModHeadElemento").attr('class', 'modal-header bg-warning');   
    $('#H4ModTitElemento').text('Editar Elemento');
    $("#btnCElemento").removeAttr("class");         
    $("#btnCElemento").attr('class', 'btn btn-warning pull-right');               
    $("#btnCElemento i").removeAttr("class");
    $("#btnCElemento i").attr("class", "fa fa-save fa-2x");
    $("#txtCElemEl").attr('disabled', false);                   
    $("#txtCElemAs").attr('disabled', false);                   
    $("#DdlCElemTC").attr('disabled', false);                   
    $("#DdlCElemVi").attr('disabled', false);                   
    $('#' + VarJsModCElem[0].id + ' :text').val("");             

}
function FnJsDElemento() {       

    $('#lblCElemEl').text("");                
    $('#lblCElemAs').text("");                
    $("#DivModBorElemento").removeAttr("class");         
    $("#DivModBorElemento").attr('class', 'modal-content border-danger');   
    $("#DivModHeadElemento").removeAttr("class");         
    $("#DivModHeadElemento").attr('class', 'modal-header bg-danger');   
    $('#H4ModTitElemento').text('Eliminar Elemento');
    $("#btnCElemento").removeAttr("class");         
    $("#btnCElemento").attr('class', 'btn btn-danger pull-right');               
    $("#btnCElemento i").removeAttr("class");
    $("#btnCElemento i").attr("class", "fa fa-trash fa-2x");
    $("#txtCElemEl").attr('disabled', true);                   
    $("#txtCElemAs").attr('disabled', true);                   
    $("#DdlCElemTC").attr('disabled', true);                   
    $("#DdlCElemVi").attr('disabled', true);                   
    $('#' + VarJsModCElem[0].id + ' :text').val("");             

}

function FnJsSbtnCelem() {
    if (VarJsDdlCElemOK == true || VarjstxtCElemAEOK == true || VarjstxtCElemElOK == true) {
        VarJsbtnCElem.fadeOut("fast");                
        VarJsbtnCElem.attr('disabled', true);                                      
    }
    else if (VarJsDdlCElemOK == false && VarjstxtCElemAEOK == false && VarjstxtCElemElOK == false) {
        VarJsbtnCElem.fadeIn("slow");                
        VarJsbtnCElem.attr('disabled', false);                                      
    }
}

VarJsbtnCElem[0].addEventListener('click', function (e) {
    e.preventDefault();
    if (formElemento.checkValidity()) {
        switch (CRUDElemento) {          
            case "C":
                FnJsAjaxCElemento();             
                break;
            case "U":
                FnJsAjaxUElemento();            
                break;
            case "D":
                FnJsAjaxDElemento();            
                break;
            default:
                console.log("Error en cud Elemento");
        } 
    }
}, false);


function FnJsAjaxCElemento() {
    $.ajax({
        url: "/modulo4/vst13.aspx/FnCElementoV",                            
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({                  
            Elemento: VarJsElemento,
            ElementoAsp: VarJsElementoAsp,
            IdTipoControl: VarJsIdTipoControl,
            IdVista: VarJsIdVista
        }),    
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Elemento Agregado");                                        
            }
            else {
                CRUDElemento = "Error"
                console.log("No se pudo agregar el Elemento");
            }
            FnAlertaElemento();             
        }
    });   
}
function FnJsAjaxUElemento() {
    $.ajax({
        url: "/modulo4/vst13.aspx/FnUElementoV",                            
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({                  
            IdElemento: VarJsElemId,
            Elemento: VarJsElemento,
            ElementoAsp: VarJsElementoAsp,
            IdTipoControl: VarJsIdTipoControl,
            IdVista: VarJsIdVista
        }),    
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Elemento Actualizado");                                        
            }
            else {
                CRUDElemento = "Error"
                console.log("No se pudo Actualizar el Elemento");
            }
            FnAlertaElemento();             
        }
    });   
}
function FnJsAjaxDElemento() {
    $.ajax({
        url: "/modulo4/vst13.aspx/FnDElementoV",                            
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({                  
            IdElemento: VarJsElemId           
        }),    
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Elemento Eliminado");                                        
            }
            else {
                CRUDElemento = "Error"
                console.log("No se pudo Eliminar el Elemento");
            }
            FnAlertaElemento();             
        }
    });   
}
function FnAlertaElemento() {            

    switch (CRUDElemento) {               
        case "C":
            VarJsColorAlertElemento = "bg-success";            
            VarJsTextoAlertElemento = "Creado";            
            break;
        case "U":
            VarJsColorAlertElemento = "bg-warning";            
            VarJsTextoAlertElemento = "Actualizado";            
            break;
        case "D":
            VarJsColorAlertElemento = "bg-danger";            
            VarJsTextoAlertElemento = "Eliminado";            
            break;
        case "Error":
            VarJsColorAlertElemento = "bg-secondary";            
            VarJsTextoAlertElemento = "No se pudo realizar la operación";            
            break;
        default:
            console.log("Error CUD Elemento Alert")
    }
    $('#alerta .modal-content').addClass(VarJsColorAlertElemento);            
    $('#alerta h5').text(VarJsTextoAlertElemento);            
    $('#alerta').modal('show');
    setTimeout(function () {
        $('#alerta').modal('hide');
        $('#alerta .modal-content').removeClass(VarJsColorAlertElemento);            
    }, 1500);                           

    if ($("#secciontblE.show").length > 0) {      
        FnJsAjaxRElemento();                     
    }
    $("#ModCElem").modal("toggle");      
}

function FnJSCUElemTC() {
    VarJsDdlCElemTC.empty();
    $.ajax({
        type: "POST",
        url: "/modulo4/vst13.aspx/MostrarTC",                      
        data: {},          
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLElementoTC == "") {
                VarJsDdlCElemTC.append($("<option> </option>").val("0").html("Seleccionar Tipo De Control"));                                                  
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLElementoTC == value.Tipocontrol) {
                        VarJsDdlCElemTC.append($("<option> </option>").val(value.Idtipocontrol).html(value.Tipocontrol));
                        VarJsIdTipoControl = value.Idtipocontrol;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                VarJsDdlCElemTC.append($("<option> </option>").val(value.Idtipocontrol).html(value.Tipocontrol));
            });
            VAlDDLElementoTC = "";
        }
    });
}
function FnJSCUElemVi() {
    VarJSDdlCElemVi.empty();
    $.ajax({
        type: "POST",
        url: "/modulo4/vst13.aspx/FnRVist",                      
        data: {},          
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLElementoVista == "") {
                VarJSDdlCElemVi.append($("<option> </option>").val("0").html("Seleccionar Vista"));
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLElementoVista == value.Vista) {
                        VarJSDdlCElemVi.append($("<option> </option>").val(value.Idvista).html(value.Vista));
                        VarJsIdVista = value.Idvista;
            }
        });}
            $.each(data.d, function (data, value) {
                VarJSDdlCElemVi.append($("<option> </option>").val(value.Idvista).html(value.Vista));
        });
          VAlDDLElementoVista = "";
        }
    });
}

function FnJsEElem() {
    if (VarJSDdlCElemVi.val() != 0) {
        if (VarJstxtCElemEl.val().length > 3 && VarJsDdlCElemTC.val() != 0) {

            $.ajax({
                url: "/modulo4/vst13.aspx/FnEElemEl",                      
                contentType: 'application/json; charser=utf-8',
                data: JSON.stringify({
                    EIdEl: VarJsElemId,
                    EElem: VarJstxtCElemEl.val(),
                    EIdTC: VarJsDdlCElemTC.val().toString(),
                    EIdVi: VarJSDdlCElemVi.val().toString()
                }),    
                method: 'post',
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
                },
                success: function (data) {
                    if (data.d) {
                        VarJslblCElemEl.text("Ya Existe Elemento");             
                        VarjstxtCElemElOK = true;
                    }
                    else {
                        VarJslblCElemEl.text("");                        
                        VarjstxtCElemElOK = false;
                    }
                    FnJsSbtnCelem();   
                }
            });
        }
        if (VarJstxtCElemAs.val().length > 3) {

            $.ajax({
                url: "/modulo4/vst13.aspx/FnEElemAE",                      
                contentType: 'application/json; charser=utf-8',
                data: JSON.stringify({
                    EIdEl: VarJsElemId,
                    EAspE: VarJstxtCElemAs.val(),
                    EIdVi: VarJSDdlCElemVi.val().toString()
                }),    
                method: 'post',
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
                },
                success: function (data) {
                    if (data.d) {
                        VarJslblCElemAs.text("Ya Existe Asp");             
                        VarjstxtCElemAEOK = true;
                    }
                    else {
                        VarJslblCElemAs.text("");                        
                        VarjstxtCElemAEOK = false;
                    }
                    FnJsSbtnCelem();   
                }
            });
        }
    }

    if (VarJsDdlCElemTC.val().toString() == "0" || VarJSDdlCElemVi.val().toString() == "0" || VarJstxtCElemAs.val().length <= 3 || VarJstxtCElemEl.val().length <= 3) {
        VarJsDdlCElemOK = true;
    }
    else {
        VarJsDdlCElemOK = false;
    }

}


VarJstxtCElemEl.keyup(function (e) {
    VarJsElemento = $(this).val();
    FnJsEElem();
});
VarJstxtCElemAs.keyup(function (e) {
    VarJsElementoAsp = $(this).val();
    
    FnJsEElem();
});

VarJsDdlCElemTC.change(function (e) {
    console.log(VarJsDdlCElemTC.val());
    VarJsIdTipoControl = $(this).val();
    
    FnJsEElem();
});
VarJSDdlCElemVi.change(function (e) {
    VarJsIdVista = $(this).val();
    FnJsEElem();
});

VarJsModCElem.on('shown.bs.modal', function () {
    VarJstxtCElemEl.focus();
})