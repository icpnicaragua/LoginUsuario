/*variable de tablas*/
var tablaTipoDireccion;/*tabla mpodulo*/
var ModCTipoDireccion = $('#modalNTipoDireccion'); // modal 
//campos de tablas
var VarJsTipoDireccionId = 0;
var VarJsTipoDireccion = "";


//igual para todos
var formTipoDireccion = document.querySelector('#form1');

//variables crud
CRUDTipoDireccion = "";
//variables alertas
var VarJsColorAlertTipoDireccion = "";
var VarJsTextoAlertTipoDireccion = "";
//variables existe
var ETipoDireccion = true;


$('#lblMostrarTipoDireccion').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    FnJsAjaxRTipoDireccion(); //llama al ajax xxxx
});

function FnJsAjaxRTipoDireccion() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo7/VstGenerales.aspx/FnRTipoDireccionV", // nombre de página y nombre de función xxxx
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowTipoDireccion(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowTipoDireccion(data) {//3 llenar la tabla xxxx

    $('#tblTipoDireccion').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaTipoDireccion = $("#tblTipoDireccion").DataTable({// variable nombre tabla xxxx

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
                    id: 'colTipoDireccion'//se añade el id para ocultar xxxx
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
                filename: 'Tipo de Dirección' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Tipo de Dirección', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Tipo de Dirección' //tttt
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
                filename: 'Tipo de Dirección' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
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
    tablaTipoDireccion.buttons().container().addClass('form-inline');///variable xxxx

    for (var contTipoDireccion = 0; contTipoDireccion < data.length; contTipoDireccion++) { // declarar variable de recorrido de arreglo data xxxx
        tablaTipoDireccion.row.add([//sensitivecase:
            data[contTipoDireccion].IdTipoDireccion,//campos
            data[contTipoDireccion].TipoDireccion,
            '<button value="editar" href="#modalNTipoDireccion" data-toggle="modal" title="editar" class="btn btn-warning  btn-editTipoDireccion"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNTipoDireccion" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteTipoDireccion"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNTipoDireccion').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCTipoDireccion(); // nombre función xxxx
    ETipoDireccion = true; // variable xxxx

    FnJsBlockTipoDireccion(); // nombre función xxxx

    CRUDTipoDireccion = "C"; // nombre variable xxxx

    //campos xxxx
    VarJsTipoDireccionId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsTipoDireccion = ""; // cada campo tiene una variable, inicializar xxxx

});
$(document).on('click', '.btn-editTipoDireccion', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUTipoDireccion();//nombre de función xxxx
    var dataTipoDireccion = tablaTipoDireccion.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsTipoDireccionId = dataTipoDireccion[0]; //id de la fila seleccionada
    $('#txtNuevoTipoDireccion').val(dataTipoDireccion[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsTipoDireccion = dataTipoDireccion[1]; // variable elemento, variable data, índice xxxx

    CRUDTipoDireccion = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteTipoDireccion', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDTipoDireccion();//nombre de función xxxx
    ETipoDireccion = false; // variable de existe xxxx


    FnJsBlockTipoDireccion();//función bloquear xxxx
    var dataTipoDireccion = tablaTipoDireccion.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsTipoDireccionId = dataTipoDireccion[0]; //id de la fila seleccionada
    $('#txtNuevoTipoDireccion').val(dataTipoDireccion[1]);// [indice columna]  de la fila seleccionada xxxx

    VarJsTipoDireccion = dataTipoDireccion[1]; // variable elemento, variable data, índice xxxx

    CRUDTipoDireccion = "D";
});

//pintar modal
function FnJsCTipoDireccion() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoTipoDireccion').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorTipoDireccion").removeAttr("class");//quitar el atributo class
    $("#DivModBorTipoDireccion").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaTipoDireccion").removeAttr("class");//quitar el atributo class
    $("#DivModHeaTipoDireccion").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitTipoDireccion').text('Nuevo Tipo de dirección');//tttt
    //cambiar el color icono btn
    $("#btnNueTipoDireccion").removeAttr("class");//quitar el atributo class
    $("#btnNueTipoDireccion").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNueTipoDireccion i").removeAttr("class");
    $("#btnNueTipoDireccion i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoTipoDireccion").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCTipoDireccion[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUTipoDireccion() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoTipoDireccion').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorTipoDireccion").removeAttr("class");//quitar el atributo class
    $("#DivModBorTipoDireccion").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaTipoDireccion").removeAttr("class");//quitar el atributo class
    $("#DivModHeaTipoDireccion").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitTipoDireccion').text('Editar Tipo de Dirección');//tttt
    //cambiar el color icono btn
    $("#btnNueTipoDireccion").removeAttr("class");//quitar el atributo class
    $("#btnNueTipoDireccion").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNueTipoDireccion i").removeAttr("class");
    $("#btnNueTipoDireccion i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoTipoDireccion").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCTipoDireccion[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDTipoDireccion() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoTipoDireccion').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorTipoDireccion").removeAttr("class");//quitar el atributo class
    $("#DivModBorTipoDireccion").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaTipoDireccion").removeAttr("class");//quitar el atributo class
    $("#DivModHeaTipoDireccion").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitTipoDireccion').text('Eliminar Tipo de Dirección');//tttt
    //cambiar el color icono btn
    $("#btnNueTipoDireccion").removeAttr("class");//quitar el atributo class
    $("#btnNueTipoDireccion").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNueTipoDireccion i").removeAttr("class");
    $("#btnNueTipoDireccion i").attr("class", "fa fa-trash fa-2x");//ícono
    //bloquear elementos
    $("#txtNuevoTipoDireccion").attr('disabled', true); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCTipoDireccion[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockTipoDireccion() {// nombre función xxxx

    if (ETipoDireccion == true) {// variables xxxx
        $("#btnNueTipoDireccion").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNueTipoDireccion").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter
    }
    else if (ETipoDireccion == false) {// variables xxxx
        $("#btnNueTipoDireccion").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNueTipoDireccion").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter
    }
}

//guardar CUD
$('#btnNueTipoDireccion').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formTipoDireccion.checkValidity()) {
        switch (CRUDTipoDireccion) { // variable crud xxxx
            case "C":
                FnJsAjaxCTipoDireccion(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUTipoDireccion();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDTipoDireccion();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Tipo Dirección");/////tttt
        }
    }
    console.log(formTipoDireccion.checkValidity());
});

//ajax CUD
function FnJsAjaxCTipoDireccion() {
    $.ajax({
        url: "/modulo7/VstGenerales.aspx/FnCTipoDireccionV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            TipoDireccion: VarJsTipoDireccion,

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Tipo de dirección Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDTipoDireccion = "error"
                console.log("No se pudo agregar Tipo de indentificación");//
            }
            FnAlertaTipoDireccion(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUTipoDireccion() {
    $.ajax({
        url: "/modulo7/VstGenerales.aspx/FnUTipoDireccionV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdTipoDireccion: VarJsTipoDireccionId,
            TipoDireccion: VarJsTipoDireccion,


        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Tipo de Dirección Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDTipoDireccion = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaTipoDireccion();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDTipoDireccion() {
    $.ajax({
        url: "/modulo7/VstGenerales.aspx/FnDTipoDireccionV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdTipoDireccion: VarJsTipoDireccionId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Tipo de dirección Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDTipoDireccion = "error"
                console.log("No se pudo Eliminar Tipo de dirección");////tttt
            }
            FnAlertaTipoDireccion(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxETipoDireccion() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo7/VstGenerales.aspx/FnETipoDireccionV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdTipoDireccion: VarJsTipoDireccionId,
            TipoDireccion: VarJsTipoDireccion
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                ETipoDireccion = true; // variable existe xxxx
                $('#lblexistenuevoTipoDireccion').text("Existe Tipo de dirección");// id etiqueta texto etiqueta //tttt
                FnJsBlockTipoDireccion();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                ETipoDireccion = false;// variable existe xxxx
                $('#lblexistenuevoTipoDireccion').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockTipoDireccion(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExisteTipoDireccion() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoTipoDireccion').val().length > 3) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoTipoDireccion').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsTipoDireccion = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteTipoDireccion()) {//nombre función verificar existe xxxx
        FnJsAjaxETipoDireccion(); // llamar todos los existes xxxx

    }
});


function FnAlertaTipoDireccion() {//nombre de la función xxxx

    switch (CRUDTipoDireccion) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertTipoDireccion = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertTipoDireccion = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertTipoDireccion = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertTipoDireccion = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertTipoDireccion = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertTipoDireccion = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertTipoDireccion = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertTipoDireccion = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Tipo dirección Alert")//tttt
    }
    //alerta
    $('#alerta .modal-content').addClass(VarJsColorAlertTipoDireccion);//variable de color alerta xxxx
    $('#alerta h5').text(VarJsTextoAlertTipoDireccion);//variable de texto alerta xxxx
    $('#alerta').modal('show');
    setTimeout(function () {
        $('#alerta').modal('hide');
        $('#alerta .modal-content').removeClass(VarJsColorAlertTipoDireccion);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblTipoDireccion.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxRTipoDireccion();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNTipoDireccion").modal("toggle");//nombre modal xxxx
}