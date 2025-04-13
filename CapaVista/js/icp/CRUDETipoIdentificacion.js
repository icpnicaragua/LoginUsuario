/*variable de tablas*/
var tablaTipoIdentificacion;/*tabla mpodulo*/
var ModCTipoIdentificacion = $('#modalNTipoIdentificacion'); // modal 
//campos de tablas
var VarJsTipoIdentificacionId = 0;
var VarJsTipoIdentificacion = "";


//igual para todos
var formTipoIdentificacion = document.querySelector('#form1');

//variables crud
CRUDTipoIdentificacion = "";
//variables alertas
var VarJsColorAlertTipoIdentificacion = "";
var VarJsTextoAlertTipoIdentificacion = "";
//variables existe
var ETipoIdentificacion = true;


$('#lbMostrarTipoIdentificacion').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    FnJsAjaxRTipoIdentificacion(); //llama al ajax xxxx
});

function FnJsAjaxRTipoIdentificacion() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo7/VstGenerales.aspx/FnRTipoIdentificacionV", // nombre de página y nombre de función xxxx
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowTipoIdentificacion(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowTipoIdentificacion(data) {//3 llenar la tabla xxxx

    $('#tblTipoIdentificacion').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaTipoIdentificacion = $("#tblTipoIdentificacion").DataTable({// variable nombre tabla xxxx

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
                    id: 'colTipoIdentificacion'//se añade el id para ocultar xxxx
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
                    columns: [':not(:eq(2)):visible'] /// index de controles xxxx para no mostrar comienza en 0
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
                    columns: [':not(:eq(2)):visible'] ///  index de controles xxxx para no mostrar comienza en 0
                },
                titleAttr: 'PDF',
                filename: 'Tipo de Identificacación' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Tipo de Identificación', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Tipo de Identificación' //tttt
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
                filename: 'Tipo de Identificación' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
                text: '<i class="far fa-file-excel fa-2x"></i>',
                className: 'btn btn-success d-none d-lg-block',
                exportOptions: {
                    columns: [':not(:eq(2)):visible'] // index de controles xxxx para no mostrar inicia en 0
                },
                titleAttr: 'Excel',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')

                }

            }
        ],
        "language": FnJsEspTbl()
    });
    tablaTipoIdentificacion.buttons().container().addClass('form-inline');///variable xxxx

    for (var contTipoIdentificacion = 0; contTipoIdentificacion < data.length; contTipoIdentificacion++) { // declarar variable de recorrido de arreglo data xxxx
        tablaTipoIdentificacion.row.add([//sensitivecase:
            data[contTipoIdentificacion].IdTipoIdentificacion,//campos
            data[contTipoIdentificacion].TipoIdentificacion,
            '<button value="editar" href="#modalNTipoIdentificacion" data-toggle="modal" title="editar" class="btn btn-warning  btn-editTipoIdentificacion"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNTipoIdentificacion" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteTipoIdentificacion"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNTipoIdentificacion').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCTipoIdentificacion(); // nombre función xxxx
    ETipoIdentificacion = true; // variable xxxx

    FnJsBlockTipoIdentificacion(); // nombre función xxxx

    CRUDTipoIdentificacion = "C"; // nombre variable xxxx

    //campos xxxx
    VarJsTipoIdentificacionId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsTipoIdentificacion = ""; // cada campo tiene una variable, inicializar xxxx

});
$(document).on('click', '.btn-editTipoIdentificacion', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUTipoIdentificacion();//nombre de función xxxx
    var dataTipoIdentificacion = tablaTipoIdentificacion.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsTipoIdentificacionId = dataTipoIdentificacion[0]; //id de la fila seleccionada
    $('#txtNuevoTipoIdentificacion').val(dataTipoIdentificacion[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsTipoIdentificacion = dataTipoIdentificacion[1]; // variable elemento, variable data, índice xxxx

    CRUDTipoIdentificacion = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteTipoIdentificacion', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDTipoIdentificacion();//nombre de función xxxx
    ETipoIdentificacion = false; // variable de existe xxxx


    FnJsBlockTipoIdentificacion();//función bloquear xxxx
    var dataTipoIdentificacion = tablaTipoIdentificacion.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsTipoIdentificacionId = dataTipoIdentificacion[0]; //id de la fila seleccionada
    $('#txtNuevoTipoIdentificacion').val(dataTipoIdentificacion[1]);// [indice columna]  de la fila seleccionada xxxx

    VarJsTipoIdentificacion = dataTipoIdentificacion[1]; // variable elemento, variable data, índice xxxx

    CRUDTipoIdentificacion = "D";
});

//pintar modal
function FnJsCTipoIdentificacion() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoTipoIdentificacion').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorTipoIdentificacion").removeAttr("class");//quitar el atributo class
    $("#DivModBorTipoIdentificacion").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaTipoIdentificacion").removeAttr("class");//quitar el atributo class
    $("#DivModHeaTipoIdentificacion").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitTipoIdentificacion').text('Nuevo Tipo de identificación');//tttt
    //cambiar el color icono btn
    $("#btnNueTipoIdentificacion").removeAttr("class");//quitar el atributo class
    $("#btnNueTipoIdentificacion").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNueTipoIdentificacion i").removeAttr("class");
    $("#btnNueTipoIdentificacion i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoTipoIdentificacion").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCTipoIdentificacion[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUTipoIdentificacion() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoTipoIdentificacion').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorTipoIdentificacion").removeAttr("class");//quitar el atributo class
    $("#DivModBorTipoIdentificacion").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaTipoIdentificacion").removeAttr("class");//quitar el atributo class
    $("#DivModHeaTipoIdentificacion").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitTipoIdentificacion').text('Editar Tipo de Identifiación');//tttt
    //cambiar el color icono btn
    $("#btnNueTipoIdentificacion").removeAttr("class");//quitar el atributo class
    $("#btnNueTipoIdentificacion").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNueTipoIdentificacion i").removeAttr("class");
    $("#btnNueTipoIdentificacion i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoTipoIdentificacion").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCTipoIdentificacion[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDTipoIdentificacion() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoTipoIdentificacion').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorTipoIdentificacion").removeAttr("class");//quitar el atributo class
    $("#DivModBorTipoIdentificacion").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaTipoIdentificacion").removeAttr("class");//quitar el atributo class
    $("#DivModHeaTipoIdentificacion").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitTipoIdentificacion').text('Eliminar Tipo de Identificación');//tttt
    //cambiar el color icono btn
    $("#btnNueTipoIdentificacion").removeAttr("class");//quitar el atributo class
    $("#btnNueTipoIdentificacion").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNueTipoIdentificacion i").removeAttr("class");
    $("#btnNueTipoIdentificacion i").attr("class", "fa fa-trash fa-2x");//ícono
    //bloquear elementos
    $("#txtNuevoTipoIdentificacion").attr('disabled', true); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCTipoIdentificacion[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockTipoIdentificacion() {// nombre función xxxx

    if (ETipoIdentificacion == true) {// variables xxxx
        $("#btnNueTipoIdentificacion").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNueTipoIdentificacion").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter
    }
    else if (ETipoIdentificacion == false) {// variables xxxx
        $("#btnNueTipoIdentificacion").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNueTipoIdentificacion").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter
    }
}

//guardar CUD
$('#btnNueTipoIdentificacion').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formTipoIdentificacion.checkValidity()) {
        switch (CRUDTipoIdentificacion) { // variable crud xxxx
            case "C":
                FnJsAjaxCTipoIdentificacion(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUTipoIdentificacion();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDTipoIdentificacion();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Tipo Identificación");/////tttt
        }
    }
});

//ajax CUD
function FnJsAjaxCTipoIdentificacion() {
    $.ajax({
        url: "/modulo7/VstGenerales.aspx/FnCTipoIdentificacionV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            TipoIdentificacion: VarJsTipoIdentificacion,

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Tipo de identificación Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDTipoIdentificacion = "error"
                console.log("No se pudo agregar Tipo de indentificación");//
            }
            FnAlertaTipoIdentificacion(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUTipoIdentificacion() {
    $.ajax({
        url: "/modulo7/VstGenerales.aspx/FnUTipoIdentificacionV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdTipoIdentificacion: VarJsTipoIdentificacionId,
            TipoIdentificacion: VarJsTipoIdentificacion,


        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Tipo de Identificación Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDTipoIdentificacion = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaTipoIdentificacion();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDTipoIdentificacion() {
    $.ajax({
        url: "/modulo7/VstGenerales.aspx/FnDTipoIdentificacionV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdTipoIdentificacion: VarJsTipoIdentificacionId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Tipo de identificación Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDTipoIdentificacion = "error"
                console.log("No se pudo Eliminar Tipo de identificación");////tttt
            }
            FnAlertaTipoIdentificacion(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxETipoIdentificacion() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo7/VstGenerales.aspx/FnETipoIdentificacionV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdTipoIdentificacion: VarJsTipoIdentificacionId,
            TipoIdentificacion: VarJsTipoIdentificacion
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                ETipoIdentificacion = true; // variable existe xxxx
                $('#lblexistenuevoTipoIdentificacion').text("Existe Tipo de identificación");// id etiqueta texto etiqueta //tttt
                FnJsBlockTipoIdentificacion();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                ETipoIdentificacion = false;// variable existe xxxx
                $('#lblexistenuevoTipoIdentificacion').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockTipoIdentificacion(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExisteTipoIdentificacion() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoTipoIdentificacion').val().length > 3) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoTipoIdentificacion').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsTipoIdentificacion = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteTipoIdentificacion()) {//nombre función verificar existe xxxx
        FnJsAjaxETipoIdentificacion(); // llamar todos los existes xxxx

    }
});


function FnAlertaTipoIdentificacion() {//nombre de la función xxxx

    switch (CRUDTipoIdentificacion) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertTipoIdentificacion = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertTipoIdentificacion = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertTipoIdentificacion = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertTipoIdentificacion = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertTipoIdentificacion = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertTipoIdentificacion = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertTipoIdentificacion = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertTipoIdentificacion = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Tipo Identificación Alert")//tttt
    }
    //alerta
    $('#alerta .modal-content').addClass(VarJsColorAlertTipoIdentificacion);//variable de color alerta xxxx
    $('#alerta h5').text(VarJsTextoAlertTipoIdentificacion);//variable de texto alerta xxxx
    $('#alerta').modal('show');
    setTimeout(function () {
        $('#alerta').modal('hide');
        $('#alerta .modal-content').removeClass(VarJsColorAlertTipoIdentificacion);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblTipoIdentificacion.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxRTipoIdentificacion();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNTipoIdentificacion").modal("toggle");//nombre modal xxxx
}