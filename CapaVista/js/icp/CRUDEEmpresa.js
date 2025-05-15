var tablaEmpresa;
var ModCEmpresa = $('#modalNEmpresa'); 

var VarJsEmpresaId = 0;
var VarJsEmpresa = "";
var VarJsRazonSocial = "";
var VarJsRuc = "";

var VarJsIdTipoEmpresa = 0;
var VarJsIdRegimen = 0;

var VAlDDLEmpresaTipoEmpresa = "null";
var VAlDDLEmpresaRegimen = "null";

var formEmpresa = document.querySelector('#form1');

CRUDEmpresa = "";

var VarJsColorAlertEmpresa = "";
var VarJsTextoAlertEmpresa = "";

var EEmpresa = true;

$('#lbMostrarEmpresa').click(function (e) {
    e.preventDefault();
    FnJsAjaxREmpresa(); 
    FnJSFillDdlEmpresaTipoEmpresa();
    FnJSFillDdlEmpresaRegimen();
});
function FnJsAjaxREmpresa() { 
    $.ajax({
        type: "POST",
        url: "/modulo9/VstClientes.aspx/FnREmpresaV", 
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowEmpresa(data.d); 
        }
    }
    );
}
function AddrowEmpresa(data) {

    $('#tblEmpresa').DataTable().clear().destroy(); 

    tablaEmpresa = $("#tblEmpresa").DataTable({
        select: true,
        "retrieve": true,
        dom: 'Bfrtip',
        "order": [1, 'asc'],
        "columnDefs": [
            { "targets": 3, "searchable": false },
            { "orderable": false, "targets": 6 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colEmpresa'
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
                filename: 'Empresa' + "_" + FnJsDate() + "_" + FnJsHour(),
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
                                    text: 'Empresa', 
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Empresa' 
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
                filename: 'Empresa' + "_" + FnJsDate() + "_" + FnJsHour(),
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
    tablaEmpresa.buttons().container().addClass('form-inline');
    for (var contEmpresa = 0; contEmpresa < data.length; contEmpresa++) { 
        tablaEmpresa.row.add([
            data[contEmpresa].IdEmpresa,
            data[contEmpresa].NombreComercial,
            data[contEmpresa].RazonSocial,
            data[contEmpresa].Ruc,
            data[contEmpresa].ObjTipoEmpresa.TipoEmpresa,
            data[contEmpresa].ObjRegimen.Regimen,
            '<button value="editar" href="#modalNEmpresa" data-toggle="modal" title="editar" class="btn btn-warning  btn-editEmpresa"><i class="fas fa-pencil-alt"></i> </button>' +
            '<button value="eliminar" href="#modalNEmpresa" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteEmpresa"><i class="fa fa-trash" ></i> </button>'
        ]
        ).draw(false);
    }
}

$('#lbNEmpresa').click(function (e) {
    e.preventDefault();
    FnJsCEmpresa(); 
    EEmpresa = true; 

    FnJsBlockEmpresa(); 
    FnJSFillDdlEmpresaTipoEmpresa();
    FnJSFillDdlEmpresaRegimen();

    CRUDEmpresa = "C";
  
    VarJsEmpresaId = 0; 
    VarJsEmpresa = ""; 
    VarJsRazonSocial = "";
    VarJsRuc = "";

    VarJsIdTipoEmpresa = 0;
    VarJsIdRegimen = 0;
});
$(document).on('click', '.btn-editEmpresa', function (e) {
    e.preventDefault();
    FnJsUEmpresa();
    var dataEmpresa = tablaEmpresa.row($(this).parents("tr")).data();
    VarJsEmpresaId = dataEmpresa[0]; 
    $('#txtNuevoEmpresa').val(dataEmpresa[1]);
    VarJsEmpresa = dataEmpresa[1]; 
    $('#txtNuevoRazonSocial').val(dataEmpresa[2]);
    VarJsRazonSocial = dataEmpresa[2]; 
    $('#txtNuevoRuc').val(dataEmpresa[3]);
    VarJsRuc = dataEmpresa[3]; 

    VAlDDLEmpresaTipoEmpresa = (dataEmpresa[4]);
    FnJSFillDdlEmpresaTipoEmpresa();
    VarJsIdTipoEmpresa = $('#ddlCEmpresaTipoEmpresa').val();
    VAlDDLEmpresaRegimen = (dataEmpresa[5]);
    FnJSFillDdlEmpresaRegimen();
    VarJsIdRegimen = $('#ddlCEmpresaRegimen').val();

    CRUDEmpresa = "U";
});
$(document).on('click', '.btn-deleteEmpresa', function (e) {
    e.preventDefault();
    FnJsDEmpresa();
    EEmpresa = false; 

    FnJsBlockEmpresa();
    var dataEmpresa = tablaEmpresa.row($(this).parents("tr")).data();
    VarJsEmpresaId = dataEmpresa[0];
    $('#txtNuevoEmpresa').val(dataEmpresa[1]);
    VarJsEmpresa = dataEmpresa[1];
    $('#txtNuevoRazonSocial').val(dataEmpresa[2]);
    VarJsRazonSocial = dataEmpresa[2]; 
    $('#txtNuevoRuc').val(dataEmpresa[3]);
    VarJsRuc = dataEmpresa[3]; 

    VAlDDLEmpresaTipoEmpresa = (dataEmpresa[4]);
    FnJSFillDdlEmpresaTipoEmpresa();
    VAlDDLEmpresaRegimen = (dataEmpresa[5]);
    FnJSFillDdlEmpresaRegimen();

    CRUDEmpresa = "D";
});

function FnJsCEmpresa() {     
    $('#lblexistenuevoEmpresa').text(""); 
    
    $("#DivModBorEmpresa").removeAttr("class");
    $("#DivModBorEmpresa").attr('class', 'modal-content border-success');
    
    $("#DivModHeaEmpresa").removeAttr("class");
    $("#DivModHeaEmpresa").attr('class', 'modal-header bg-success');
   
    $('#H4ModTitEmpresa').text('Nuevo Empresa');
   
    $("#btnNueEmpresa").removeAttr("class");
    $("#btnNueEmpresa").attr('class', 'btn btn-success pull-right');
    $("#btnNueEmpresa i").removeAttr("class");
    $("#btnNueEmpresa i").attr("class", "fa fa-save fa-2x");
    
    $("#ddlCEmpresaTipoEmpresa").removeAttr("class"); 
    $("#ddlCEmpresaTipoEmpresa").attr("class", "form-control border-success");
    $("#ddlCEmpresaRegimen").removeAttr("class");
    $("#ddlCEmpresaRegimen").attr("class", "form-control border-success");
   
    $("#txtNuevoEmpresa").attr('disabled', false);
    $("#txtNuevoRazonSocial").attr('disabled', false); 
    $("#txtNuevoRuc").attr('disabled', false); 

    $('#ddlCEmpresaTipoEmpresa').attr('disabled', false);
    $('#ddlCEmpresaRegimen').attr('disabled', false);
   
    $('#' + ModCEmpresa[0].id + ' :text').val("");
}
function FnJsUEmpresa() {     
    $('#lblexistenuevoEmpresa').text("");

    $("#DivModBorEmpresa").removeAttr("class");
    $("#DivModBorEmpresa").attr('class', 'modal-content border-warning');

    $("#DivModHeaEmpresa").removeAttr("class");
    $("#DivModHeaEmpresa").attr('class', 'modal-header bg-warning');
  
    $('#H4ModTitEmpresa').text('Editar Empresa');

    $("#btnNueEmpresa").removeAttr("class");
    $("#btnNueEmpresa").attr('class', 'btn btn-warning pull-right');
    $("#btnNueEmpresa i").removeAttr("class");
    $("#btnNueEmpresa i").attr("class", "fa fa-save fa-2x");

    $("#ddlCEmpresaTipoEmpresa").removeAttr("class"); 
    $("#ddlCEmpresaTipoEmpresa").attr("class", "form-control border-warning");
    $("#ddlCEmpresaRegimen").removeAttr("class"); 
    $("#ddlCEmpresaRegimen").attr("class", "form-control border-warning");
   
    $("#txtNuevoEmpresa").attr('disabled', false); 
    $("#txtNuevoRazonSocial").attr('disabled', false); 
    $("#txtNuevoRuc").attr('disabled', false); 

    $('#ddlCEmpresaTipoEmpresa').attr('disabled', false);
    $('#ddlCEmpresaRegimen').attr('disabled', false);
   
    $('#' + ModCEmpresa[0].id + ' :text').val(""); 
}
function FnJsDEmpresa() {   
    $('#lblexistenuevoEmpresa').text("");
   
    $("#DivModBorEmpresa").removeAttr("class");
    $("#DivModBorEmpresa").attr('class', 'modal-content border-danger');
   
    $("#DivModHeaEmpresa").removeAttr("class");
    $("#DivModHeaEmpresa").attr('class', 'modal-header bg-danger');
   
    $('#H4ModTitEmpresa').text('Eliminar Empresa');
   
    $("#btnNueEmpresa").removeAttr("class");
    $("#btnNueEmpresa").attr('class', 'btn btn-danger pull-right');
    $("#btnNueEmpresa i").removeAttr("class");
    $("#btnNueEmpresa i").attr("class", "fa fa-trash fa-2x");
   
    $("#ddlCEmpresaTipoEmpresa").removeAttr("class"); 
    $("#ddlCEmpresaTipoEmpresa").attr("class", "form-control border-danger");
    $("#ddlCEmpresaRegimen").removeAttr("class"); 
    $("#ddlCEmpresaRegimen").attr("class", "form-control border-danger");
   
    $("#txtNuevoEmpresa").attr('disabled', true); 
    $("#txtNuevoRazonSocial").attr('disabled', true); 
    $("#txtNuevoRuc").attr('disabled', true); 

    $('#ddlCEmpresaTipoEmpresa').attr('disabled', true);
    $('#ddlCEmpresaRegimen').attr('disabled', true);
    
    $('#' + ModCEmpresa[0].id + ' :text').val(""); 
}

function FnJsBlockEmpresa() {

    if (EEmpresa == true) {
        $("#btnNueEmpresa").fadeOut("fast"); 
        $("#btnNueEmpresa").attr('disabled', true);  
    }
    else if (EEmpresa == false) {
        $("#btnNueEmpresa").fadeIn("slow"); 
        $("#btnNueEmpresa").attr('disabled', false); 
    }
    if (VarJsIdRegimen == 0 || VarJsIdTipoEmpresa==0) {
        $("#btnNueEmpresa").fadeOut("fast");
        $("#btnNueEmpresa").attr('disabled', true);  
    }
}

$('#btnNueEmpresa').click(function (e) {
    e.preventDefault();
    if (formEmpresa.checkValidity()) {
        switch (CRUDEmpresa) {
            case "C":
                FnJsAjaxCEmpresa(); 
                break;
            case "U":
                FnJsAjaxUEmpresa();
                break;
            case "D":
                FnJsAjaxDEmpresa();
                break;
            default:
                console.log("Error en cud Empresa");
        }
    } 
});

function FnJsAjaxCEmpresa() {
    $.ajax({
        url: "/modulo9/VstClientes.aspx/FnCEmpresaV", 
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            Empresa: VarJsEmpresa,
            RazonSocial:VarJsRazonSocial,
            Ruc:VarJsRuc,
            IdTipoEmpresa: VarJsIdTipoEmpresa,
            IdRegimen:VarJsIdRegimen
        }), 
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {                
                console.log("Empresa Agregado"); 
            }
            else {               
                CRUDEmpresa = "error"
                console.log("No se pudo agregar Empresa");
            }
            FnAlertaEmpresa();
        }
    });
}
function FnJsAjaxUEmpresa() {
    $.ajax({
        url: "/modulo9/VstClientes.aspx/FnUEmpresaV", 
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdEmpresa: VarJsEmpresaId,
            Empresa: VarJsEmpresa,
            RazonSocial: VarJsRazonSocial,
            Ruc: VarJsRuc,
            IdTipoEmpresa: VarJsIdTipoEmpresa,
            IdRegimen: VarJsIdRegimen

        }), 
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {               
                console.log("Empresa Actualizado"); 
            }
            else {               
                CRUDEmpresa = "error"
                console.log("no se pudo actualizar");
            }
            FnAlertaEmpresa();
        }
    });
}
function FnJsAjaxDEmpresa() {
    $.ajax({
        url: "/modulo9/VstClientes.aspx/FnDEmpresaV", 
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdEmpresa: VarJsEmpresaId
        }), 
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
               
                console.log("Empresa Eliminado"); 
            }
            else {               
                CRUDEmpresa = "error"
                console.log("No se pudo Eliminar Empresa");
            }
            FnAlertaEmpresa();
        }
    });
}
function FnJsAjaxEEmpresa() {
    $.ajax({
        url: "/modulo9/VstClientes.aspx/FnEEmpresaV", 
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdEmpresa: VarJsEmpresaId,
            Empresa: VarJsEmpresa,
            RazonSocial: VarJsRazonSocial,
            Ruc: VarJsRuc            
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                
                EEmpresa = true; 
                $('#lblexistenuevoEmpresa').text("Existe Empresa");
                FnJsBlockEmpresa();

            }
            else {
                
                EEmpresa = false;
                $('#lblexistenuevoEmpresa').text(""); 
                FnJsBlockEmpresa(); 
            }
        }
    });
}
function VerificarExisteEmpresa() {
    if ($('#txtNuevoEmpresa').val().length >= 3 && $('#txtNuevoRazonSocial').val().length >= 3 && $('#txtNuevoRuc').val().length >= 3 ) { 
        return true;
    }
    else {
        return false;
    }
}

$('#txtNuevoEmpresa').keyup(function (e) {
    VarJsEmpresa = $(this).val(); 
    if (VerificarExisteEmpresa()) {
        FnJsAjaxEEmpresa(); 
    }
});

$('#txtNuevoRazonSocial').keyup(function (e) {
    VarJsRazonSocial = $(this).val(); 
    if (VerificarExisteEmpresa()) {
        FnJsAjaxEEmpresa();
    }
});

$('#txtNuevoRuc').keyup(function (e) {
    VarJsRuc = $(this).val(); 
    if (VerificarExisteEmpresa()) {
        FnJsAjaxEEmpresa();
    }
});

$('#ddlCEmpresaTipoEmpresa').change(function (e) {
    VarJsIdTipoEmpresa = $('#ddlCEmpresaTipoEmpresa').val();  
    FnJsBlockEmpresa();
});

$('#ddlCEmpresaRegimen').change(function (e) {
    VarJsIdRegimen = $('#ddlCEmpresaRegimen').val();   
    FnJsBlockEmpresa();
});
function FnJSFillDdlEmpresaTipoEmpresa() {
    $('#ddlCEmpresaTipoEmpresa').empty(); 
    $.ajax({
        type: "POST",
        url: "/modulo2/VstProveedor.aspx/FnRTipoEmpresaV", 
        data: {}, 
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLEmpresaTipoEmpresa == "null") {
                $('#ddlCEmpresaTipoEmpresa').append($("<option> </option>").val("0").html("Seleccionar TipoEmpresa"));             
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLEmpresaTipoEmpresa == value.TipoEmpresa) {
                        $('#ddlCEmpresaTipoEmpresa').append($("<option> </option>").val(value.IdTipoEmpresa).html(value.TipoEmpresa)); 
                        VarJsIdTipoEmpresa = value.IdTipoEmpresa;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCEmpresaTipoEmpresa').append($("<option> </option>").val(value.IdTipoEmpresa).html(value.TipoEmpresa)); 
            });
            VAlDDLEmpresaTipoEmpresa = "null";
        }
    });
}
function FnJSFillDdlEmpresaRegimen() {
    $('#ddlCEmpresaRegimen').empty(); 
    $.ajax({
        type: "POST",
        url: "/modulo2/VstProveedor.aspx/FnRRegimenV",
        data: {}, 
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLEmpresaRegimen == "null") {
                $('#ddlCEmpresaRegimen').append($("<option> </option>").val("0").html("Seleccionar Tipo Régimen"));  
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLEmpresaRegimen == value.Regimen) {
                        $('#ddlCEmpresaRegimen').append($("<option> </option>").val(value.IdRegimen).html(value.Regimen)); 
                        VarJsIdRegimen = value.IdRegimen;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCEmpresaRegimen').append($("<option> </option>").val(value.IdRegimen).html(value.Regimen)); 
            });
            VAlDDLEmpresaRegimen = "null";
        }
    });
}
function FnAlertaEmpresa() {

    switch (CRUDEmpresa) {
        case "C":
            VarJsColorAlertEmpresa = "bg-success";
            VarJsTextoAlertEmpresa = "Creado";
            break;
        case "U":
            VarJsColorAlertEmpresa = "bg-warning";
            VarJsTextoAlertEmpresa = "Actualizado";
            break;
        case "D":
            VarJsColorAlertEmpresa = "bg-danger";
            VarJsTextoAlertEmpresa = "Eliminado";
            break;
        case "Error":
            VarJsColorAlertEmpresa = "bg-secondary";
            VarJsTextoAlertEmpresa = "No se pudo realizar la operación";
            break;
        default:
            console.log("Error CUD Empresa Alert")
    }
   
    $('.bd-example-modal-sm .modal-content').addClass(VarJsColorAlertEmpresa);
    $('.bd-example-modal-sm h5').text(VarJsTextoAlertEmpresa);
    $('.bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.bd-example-modal-sm').modal('hide');
        $('.bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertEmpresa);
    }, 1500);

    if ($("#secciontblEmpresa.show").length > 0) {
        FnJsAjaxREmpresa();
    }
    
    $("#modalNEmpresa").modal("toggle");
}