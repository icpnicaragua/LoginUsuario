
var formVista = document.querySelector('#form1');

/*variable de tablas*/
var tablaV;/*tabla vista*/
var ModCVista = $('#ModCVista'); // modal vista
var VarJsVistaId = 0; //idvista
var VarJsVista = "";
var VarJSVistaAsp = "";
var VarJsIdModulo = 0;

//dddlist vista
var VAlDDLVistaModulo = "null";// para guardar lo que está en la tabla y luego asignar al ddl
//variables crud
CRUDVista = "";

//variables alertas
var VarJsColorAlertVista = "";
var VarJsTextoAlertVista = "";

//variables existe
var EVis = true;
var EVisAsp = true;


$('#lbMostrarV').click(function (e) {//1 evento para mostrar contenido de vista xxxx
    e.preventDefault();
    AjaxMostrarVISTA(); //llama al ajax xxxx
    FnJSFillDdlVistaModulo();//cargar ddl
});

function AjaxMostrarVISTA() { //2 pide los datos en bd de la tabla vista xxxx
    $.ajax({
        type: "POST",
        url: "/modulo4/vst13.aspx/FnRVist", // nombre de página y nombre de función xxxx
        data: {}, /*{ data: jsonString }*/
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            addrowVista(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function addrowVista(data) {//3 llenar la tabla xxxx

    $('#tblV').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaV = $("#tblV").DataTable({// nombre tabla xxxx

        "retrieve": true,
        dom: 'Bfrtip',

        "order": [1, 'asc'],//"order": [[ 0, 'asc' ], [ 1, 'desc' ]] // columna, orden xxxx comienza en 0
        "columnDefs": [
            { "targets": 2, "searchable": false },
            { "orderable": false, "targets": 2 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colvistc'//se añade el id para ocultar
                },
                text: '<i class="fas fa-columns fa-2x"></i>', // el icono a mostar
                className: 'btn btn-info', //clase para mostrar
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
                    columns: [':not(:eq(5)):visible'] /// index de controles xxxx para no mostrar comienza en 0
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
                    columns: [':not(:eq(5)):visible'] ///  index de controles xxxx para no mostrar comienza en 0
                },
                titleAttr: 'PDF',
                filename: 'Vista' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte xxxx
                pageSize: 'LETTER',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')
                },
                customize: function (doc) {
                    doc.content.splice(0, 1);
                    var jsDate = FnJsDate() + " " + FnJsHour();
                    var image = FnJsLogo64(); // funcion del logo
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
                                    text: 'Soaz Dt', //texto del reporte xxxx
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte soaz' //superior derecha xxxx
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
                filename: 'Vista' + "_" + FnJsDate() + "_" + FnJsHour(), // nombre de archivo xxxx
                text: '<i class="far fa-file-excel fa-2x"></i>',
                className: 'btn btn-success d-none d-lg-block',
                exportOptions: {
                    columns: [':not(:eq(5)):visible'] // index de controles xxxx para no mostrar inicia en 0
                },
                titleAttr: 'Excel',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')

                }

            }
        ],
        "language": FnJsEspTbl()
    });
    tablaV.buttons().container().addClass('form-inline');///nuevo
    //$('#secciontblTC .dt-buttons').addClass('form-inline');//nuevo

    for (var contv = 0; contv < data.length; contv++) { // declarar variable de recorrido de arreglo data xxxx
        tablaV.row.add([//sensitivecase:
            data[contv].Idvista,
            data[contv].Vista,
            data[contv].Fechainiciovista,
            data[contv].ObjModulo.Modulo,
            data[contv].Idaspvista,
            '<button value="editar" href="#ModCVista" data-toggle="modal" title="editar" class="btn btn-warning  btn-editV"><i class="fas fa-pencil-alt"></i> </button>'+// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#ModCVista" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteV"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

$('#lbVN').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    console.log("modal nuevo ");
    FnJsCVista();
    EVis = true;
    EVisAsp = true;
    FnJsBlockVista();
    FnJSFillDdlVistaModulo();
    CRUDVista = "C";

    VarJsVistaId = 0;
    VarJsVista = "";
     VarJSVistaAsp = "";
     VarJsIdModulo = 0;

});

function FnJsCVista() {
    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorVista").removeAttr("class");//quitar el atributo class
    $("#DivModBorVista").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeadVista").removeAttr("class");//quitar el atributo class
    $("#DivModHeadVista").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitVista').text('Nueva Vista');
    //cambiar el color icono btn
    $("#btnCVista").removeAttr("class");//quitar el atributo class
    $("#btnCVista").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnCVista i").removeAttr("class");
    $("#btnCVista i").attr("class", "fa fa-save fa-2x");
    //color ddl
    $("#ddlCVistaModulo").removeAttr("class"); //uitar propiedades
    $("#ddlCVistaModulo").attr("class", "form-control border-success");//pintr roo
    //bloquear elementos
    $("#txtCVista").attr('disabled', false);
    $("#txtCAspVista").attr('disabled', false); 
    $("#ddlCVistaModulo").attr('disabled', false); 
    //vaciar elementos text de todo el modal
  
    $('#' + ModCVista[0].id + ' :text').val("");

}

$(document).on('click', '.btn-editV', function (e) {//en este docimento en un evento click de una clase btn-edit, agarra el evento e de una funcion
    e.preventDefault(); //evitar que haga postback
     FnJsUVista();
     var dataVista = tablaV.row($(this).parents("tr")).data();// variable tabla xxxxagarra la fila, luego hay que llamar datatc con subíndice de la columna
     VarJsVistaId = dataVista[0]; //id de la fila seleccionada
     $('#txtCVista').val(dataVista[1]);// [indice columna]  de la fila seleccionada
     $('#txtCAspVista').val(dataVista[4]);// [indice columna]  de la fila seleccionada
     VAlDDLVistaModulo = (dataVista[3]);
     FnJSFillDdlVistaModulo();
     CRUDVista = "U";
    
     VarJsVista = dataVista[1];
     VarJSVistaAsp = dataVista[4];
     VarJsIdModulo = $('#ddlCVistaModulo').val();
     
});

function FnJsUVista() {
    console.log("colorear editar");
    //cambiar el color del modal borde
    $("#DivModBorVista").removeAttr("class");//quitar el atributo class
    $("#DivModBorVista").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeadVista").removeAttr("class");//quitar el atributo class
    $("#DivModHeadVista").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitVista').text('Editar Vista');
    //cambiar el color icono btn
    $("#btnCVista").removeAttr("class");//quitar el atributo class
    $("#btnCVista").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnCVista i").removeAttr("class");
    $("#btnCVista i").attr("class", "fa fa-save fa-2x");
    //color ddl
    $("#ddlCVistaModulo").removeAttr("class"); //uitar propiedades
    $("#ddlCVistaModulo").attr("class", "form-control border-warning");//pintr roo
    //bloquear elementos
    $("#txtCVista").attr('disabled', false);
    $("#txtCAspVista").attr('disabled', false);
    $("#ddlCVistaModulo").attr('disabled', false);
    //vaciar elementos text de todo el modal
    $('#' + ModCVista[0].id + ' :text').val("");
}

$(document).on('click', '.btn-deleteV', function (e) {//en este docimento en un evento click de una clase btn-edit, agarra el evento e de una funcion
    e.preventDefault(); //evitar que haga postback
    FnJsDVista();
    EVis = false;
    EVisAsp = false;
        
    FnJsBlockVista();
    var dataVista = tablaV.row($(this).parents("tr")).data();// variable tabla xxxxagarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsVistaId = dataVista[0]; //id de la fila seleccionada
    $('#txtCVista').val(dataVista[1]);// [indice columna]  de la fila seleccionada
    $('#txtCAspVista').val(dataVista[4]);// [indice columna]  de la fila seleccionada
    VAlDDLVistaModulo = (dataVista[3]);
    FnJSFillDdlVistaModulo();
  
    VarJsVista = dataVista[1];
    VarJSVistaAsp = dataVista[4];

    CRUDVista = "D";
});

function FnJsDVista() {
    console.log("colorear editar");
    //cambiar el color del modal borde
    $("#DivModBorVista").removeAttr("class");//quitar el atributo class
    $("#DivModBorVista").attr('class', 'modal-content border-danger');//poner rojo
    //cambiar el color del modal header
    $("#DivModHeadVista").removeAttr("class");//quitar el atributo class
    $("#DivModHeadVista").attr('class', 'modal-header bg-danger');//poner rojo
    //cambiar el titulo del modal header
    $('#H4ModTitVista').text('Editar Vista');
    //cambiar el color icono btn
    $("#btnCVista").removeAttr("class");//quitar el atributo class
    $("#btnCVista").attr('class', 'btn btn-danger pull-right');//poner rojo tirar a la derecha
    $("#btnCVista i").removeAttr("class");
    $("#btnCVista i").attr("class", "fa fa-trash fa-2x");
    //color ddl
    $("#ddlCVistaModulo").removeAttr("class"); //uitar propiedades
    $("#ddlCVistaModulo").attr("class", "form-control border-danger");//pintr roo
    //bloquear elementos
    $("#txtCVista").attr('disabled', true);
    $("#txtCAspVista").attr('disabled', true);
    $("#ddlCVistaModulo").attr('disabled', true);
    //vaciar elementos text de todo el modal
    $('#' + ModCVista[0].id + ' :text').val("");
}

/*quitar btn vista*/
function FnJsBlockVista() {
    
    if (EVis || EVisAsp == true) {
        $("#btnCVista").fadeOut("fast"); //efecto de fuga para desapareecer 
        $("#btnCVista").attr('disabled', true);  // se tiene que deshabilitar el btn para que no permita tap enter
    }
    else if (EVis || EVisAsp == false) {
        $("#btnCVista").fadeIn("slow"); //efecto de fuga para apareecer 
        $("#btnCVista").attr('disabled', false);  // se tiene que habilitar el btn para que  permita tap enter
    }
}

$('#txtCVista').keyup(function (e) {
    VarJsVista = $(this).val();
    if (VerificarExisteVista()) { 
        FnJsAjaxEVista();
        FnJsAjaxEVistaAsp();
    }    
});

$('#txtCAspVista').keyup(function (e) {
    VarJSVistaAsp = $(this).val();
    if (VerificarExisteVista()) {
        FnJsAjaxEVista();
        FnJsAjaxEVistaAsp();
    }
});


$('#ddlCVistaModulo').change(function (e) {
      VarJsIdModulo = $('#ddlCVistaModulo').val();
    if (VerificarExisteVista()) {
        FnJsAjaxEVista();
        FnJsAjaxEVistaAsp();
    }
});

function VerificarExisteVista() {
    if ($('#txtCVista').val().length > 3 && $('#txtCAspVista').val().length > 3 && $('#ddlCVistaModulo').val() != 0) {
        return true;
    }
    else {
        return false;
    }
}

function FnJSFillDdlVistaModulo() {
    $('#ddlCVistaModulo').empty(); // xxxx id
     $.ajax({
        type: "POST",
        url: "/modulo4/vst13.aspx/FnRModuloV", // xxxx
        data: {}, /*{ data: jsonString }*/
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLVistaModulo == "null") {
                $('#ddlCVistaModulo').append($("<option> </option>").val("0").html("Seleccionar Módulo"));  // xxxx id val html            
            }
            else {
                 $.each(data.d, function (data, value) {
                    if (VAlDDLVistaModulo == value.Modulo) {
                        $('#ddlCVistaModulo').append($("<option> </option>").val(value.IdModulo).html(value.Modulo));  // xxxx id texto
                        VarJsIdModulo = value.IdModulo;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCVistaModulo').append($("<option> </option>").val(value.IdModulo).html(value.Modulo)); // id en un val y en html el nombre
                });
            VAlDDLVistaModulo = "null";   
        }
    }); 
}

$('#btnCVista').click(function (e) {//1 evento para mostrar contenido de vista xxxx
    e.preventDefault();
    if (formVista.checkValidity()) {
        switch (CRUDVista) {
            case "C":
                FnJsAjaxCVista();
                break;
            case "U":
                FnJsAjaxUVista();
                break;
            case "D":
                FnJsAjaxDVista();
                break;
            default:
                console.log("Error en cud vista");
        }
    }
});


function FnJsAjaxEVista() {
    $.ajax({
        url: "/modulo4/vst13.aspx/FnEVistaV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdVista: VarJsVistaId,
            IDModulo: VarJsIdModulo,
            Vista: VarJsVista
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                EVis = true;
                $('#lblCVista').text("Existe Vista");
                FnJsBlockVista();
               
            }
            else {
                //mostrar btn
                EVis = false;
                $('#lblCVista').text("");
                FnJsBlockVista();
            }
        }
    });//ajax fin
}

function FnJsAjaxEVistaAsp() {
    $.ajax({
        url: "/modulo4/vst13.aspx/FnEVistaAspV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdVista: VarJsVistaId,
            IDModulo: VarJsIdModulo,
            VistaAsp: VarJSVistaAsp
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                EVisAsp = true;
                $('#lblCAspVista').text("Existe AspVIsta") ;
                FnJsBlockVista();
            }
            else {
                //mostrar btn
                EVisAsp = false;
                $('#lblCAspVista').text("");
                FnJsBlockVista();
            }
        }
    });//ajax fin
}

function FnJsAjaxDVista() {
    $.ajax({
        url: "/modulo4/vst13.aspx/FnDVista", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdVista: VarJsVistaId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se borró
                console.log("borrado"); //
                FnAlertaVista();
            }
            else {
                //no se borró
                console.log("no se pudo");//
            }
        }
    });//ajax fin
}

function FnJsAjaxCVista() {
    $.ajax({
        url: "/modulo4/vst13.aspx/FnCVistaV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            Vista: VarJsVista,
            IdAspVista: VarJSVistaAsp,
            IdModulo: VarJsIdModulo
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se borró
                console.log("Agregado"); //
                FnAlertaVista();
            }
            else {
                //no se borró
                console.log("no se pudo agregar");//
            }
        }
    });//ajax fin
}

function FnJsAjaxUVista() {
    $.ajax({
        url: "/modulo4/vst13.aspx/FnUVistaV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdVista: VarJsVistaId,
            Vista: VarJsVista,
            IdAspVista: VarJSVistaAsp,
            IdModulo: VarJsIdModulo
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se borró
                console.log("Actualizado"); //
                FnAlertaVista();
            }
            else {
                //no se borró
                console.log("no se pudo actualizar");//
            }
        }
    });//ajax fin
}


function FnAlertaVista() {

    switch (CRUDVista) {//
        case "C":
            VarJsColorAlertVista = "bg-success";
            VarJsTextoAlertVista = "Creado";
            break;
        case "U":
            VarJsColorAlertVista = "bg-warning";
            VarJsTextoAlertVista = "Actualizado";
            break;
        case "D":
            VarJsColorAlertVista = "bg-danger";
            VarJsTextoAlertVista = "Eliminado";
            break;
        default:
            console.log("Error CUD Vista Alert")
    }
    //alerta
    $('#alerta .modal-content').addClass(VarJsColorAlertVista);
    $('#alerta h5').text(VarJsTextoAlertVista);
    $('#alerta').modal('show');
    setTimeout(function () {
        $('#alerta').modal('hide');
        $('#alerta .modal-content').removeClass(VarJsColorAlertVista);
    }, 1500);// tiempo para que aparezca la alerta crear variable ms


    if ($("#secciontblV.show").length > 0) {//si se mira la seccion tabla
        AjaxMostrarVISTA();
    }
    //cerrar modal
    $("#ModCVista").modal("toggle");
}