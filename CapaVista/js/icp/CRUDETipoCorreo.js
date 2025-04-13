/*variable de tablas*/
var tablaTipoCorreo;/*tabla mpodulo*/
var ModCTipoCorreo = $('#modalNTipoCorreo'); // modal 
//campos de tablas
var VarJsTipoCorreoId = 0;
var VarJsTipoCorreo = "";


//igual para todos
var formTipoCorreo = document.querySelector('#form1');

//variables crud
CRUDTipoCorreo = "";
//variables alertas
var VarJsColorAlertTipoCorreo = "";
var VarJsTextoAlertTipoCorreo = "";
//variables existe
var ETipoCorreo = true;


$('#lblMostrarTipoCorreo').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    FnJsAjaxRTipoCorreo(); //llama al ajax xxxx
});

function FnJsAjaxRTipoCorreo() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo7/VstGenerales.aspx/FnRTipoCorreoV", // nombre de página y nombre de función xxxx
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowTipoCorreo(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowTipoCorreo(data) {//3 llenar la tabla xxxx

    $('#tblTipoCorreo').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaTipoCorreo = $("#tblTipoCorreo").DataTable({// variable nombre tabla xxxx

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
                    id: 'colTipoCorreo'//se añade el id para ocultar xxxx
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
                filename: 'Tipo de Correo' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Tipo de Correo', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Tipo de Correo' //tttt
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
                filename: 'Tipo de Correo' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
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
    tablaTipoCorreo.buttons().container().addClass('form-inline');///variable xxxx

    for (var contTipoCorreo = 0; contTipoCorreo < data.length; contTipoCorreo++) { // declarar variable de recorrido de arreglo data xxxx
        tablaTipoCorreo.row.add([//sensitivecase:
            data[contTipoCorreo].IdTipoCorreo,//campos
            data[contTipoCorreo].TipoCorreo,
            '<button value="editar" href="#modalNTipoCorreo" data-toggle="modal" title="editar" class="btn btn-warning  btn-editTipoCorreo"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNTipoCorreo" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteTipoCorreo"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNTipoCorreo').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCTipoCorreo(); // nombre función xxxx
    ETipoCorreo = true; // variable xxxx

    FnJsBlockTipoCorreo(); // nombre función xxxx

    CRUDTipoCorreo = "C"; // nombre variable xxxx

    //campos xxxx
    VarJsTipoCorreoId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsTipoCorreo = ""; // cada campo tiene una variable, inicializar xxxx

});
$(document).on('click', '.btn-editTipoCorreo', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUTipoCorreo();//nombre de función xxxx
    var dataTipoCorreo = tablaTipoCorreo.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsTipoCorreoId = dataTipoCorreo[0]; //id de la fila seleccionada
    $('#txtNuevoTipoCorreo').val(dataTipoCorreo[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsTipoCorreo = dataTipoCorreo[1]; // variable elemento, variable data, índice xxxx

    CRUDTipoCorreo = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteTipoCorreo', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDTipoCorreo();//nombre de función xxxx
    ETipoCorreo = false; // variable de existe xxxx


    FnJsBlockTipoCorreo();//función bloquear xxxx
    var dataTipoCorreo = tablaTipoCorreo.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsTipoCorreoId = dataTipoCorreo[0]; //id de la fila seleccionada
    $('#txtNuevoTipoCorreo').val(dataTipoCorreo[1]);// [indice columna]  de la fila seleccionada xxxx

    VarJsTipoCorreo = dataTipoCorreo[1]; // variable elemento, variable data, índice xxxx

    CRUDTipoCorreo = "D";
});

//pintar modal
function FnJsCTipoCorreo() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoTipoCorreo').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorTipoCorreo").removeAttr("class");//quitar el atributo class
    $("#DivModBorTipoCorreo").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaTipoCorreo").removeAttr("class");//quitar el atributo class
    $("#DivModHeaTipoCorreo").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitTipoCorreo').text('Nuevo Tipo de Correo');//tttt
    //cambiar el color icono btn
    $("#btnNueTipoCorreo").removeAttr("class");//quitar el atributo class
    $("#btnNueTipoCorreo").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNueTipoCorreo i").removeAttr("class");
    $("#btnNueTipoCorreo i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoTipoCorreo").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCTipoCorreo[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUTipoCorreo() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoTipoCorreo').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorTipoCorreo").removeAttr("class");//quitar el atributo class
    $("#DivModBorTipoCorreo").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaTipoCorreo").removeAttr("class");//quitar el atributo class
    $("#DivModHeaTipoCorreo").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitTipoCorreo').text('Editar Tipo de Correo');//tttt
    //cambiar el color icono btn
    $("#btnNueTipoCorreo").removeAttr("class");//quitar el atributo class
    $("#btnNueTipoCorreo").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNueTipoCorreo i").removeAttr("class");
    $("#btnNueTipoCorreo i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoTipoCorreo").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCTipoCorreo[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDTipoCorreo() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoTipoCorreo').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorTipoCorreo").removeAttr("class");//quitar el atributo class
    $("#DivModBorTipoCorreo").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaTipoCorreo").removeAttr("class");//quitar el atributo class
    $("#DivModHeaTipoCorreo").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitTipoCorreo').text('Eliminar Tipo de Correo');//tttt
    //cambiar el color icono btn
    $("#btnNueTipoCorreo").removeAttr("class");//quitar el atributo class
    $("#btnNueTipoCorreo").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNueTipoCorreo i").removeAttr("class");
    $("#btnNueTipoCorreo i").attr("class", "fa fa-trash fa-2x");//ícono
    //bloquear elementos
    $("#txtNuevoTipoCorreo").attr('disabled', true); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCTipoCorreo[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockTipoCorreo() {// nombre función xxxx

    if (ETipoCorreo == true) {// variables xxxx
        $("#btnNueTipoCorreo").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNueTipoCorreo").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter
    }
    else if (ETipoCorreo == false) {// variables xxxx
        $("#btnNueTipoCorreo").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNueTipoCorreo").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter
    }
}

//guardar CUD
$('#btnNueTipoCorreo').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formTipoCorreo.checkValidity()) {
        switch (CRUDTipoCorreo) { // variable crud xxxx
            case "C":
                FnJsAjaxCTipoCorreo(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUTipoCorreo();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDTipoCorreo();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Tipo Correo");/////tttt
        }
    }
    console.log(formTipoCorreo.checkValidity());
});

//ajax CUD
function FnJsAjaxCTipoCorreo() {
    $.ajax({
        url: "/modulo7/VstGenerales.aspx/FnCTipoCorreoV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            TipoCorreo: VarJsTipoCorreo,

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Tipo de Correo Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDTipoCorreo = "error"
                console.log("No se pudo agregar Tipo de indentificación");//
            }
            FnAlertaTipoCorreo(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUTipoCorreo() {
    $.ajax({
        url: "/modulo7/VstGenerales.aspx/FnUTipoCorreoV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdTipoCorreo: VarJsTipoCorreoId,
            TipoCorreo: VarJsTipoCorreo,


        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Tipo de Correo Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDTipoCorreo = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaTipoCorreo();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDTipoCorreo() {
    $.ajax({
        url: "/modulo7/VstGenerales.aspx/FnDTipoCorreoV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdTipoCorreo: VarJsTipoCorreoId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Tipo de Correo Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDTipoCorreo = "error"
                console.log("No se pudo Eliminar Tipo de Correo");////tttt
            }
            FnAlertaTipoCorreo(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxETipoCorreo() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo7/VstGenerales.aspx/FnETipoCorreoV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdTipoCorreo: VarJsTipoCorreoId,
            TipoCorreo: VarJsTipoCorreo
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                ETipoCorreo = true; // variable existe xxxx
                $('#lblexistenuevoTipoCorreo').text("Existe Tipo de Correo");// id etiqueta texto etiqueta //tttt
                FnJsBlockTipoCorreo();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                ETipoCorreo = false;// variable existe xxxx
                $('#lblexistenuevoTipoCorreo').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockTipoCorreo(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExisteTipoCorreo() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoTipoCorreo').val().length > 3) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoTipoCorreo').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsTipoCorreo = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteTipoCorreo()) {//nombre función verificar existe xxxx
        FnJsAjaxETipoCorreo(); // llamar todos los existes xxxx

    }
});


function FnAlertaTipoCorreo() {//nombre de la función xxxx

    switch (CRUDTipoCorreo) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertTipoCorreo = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertTipoCorreo = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertTipoCorreo = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertTipoCorreo = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertTipoCorreo = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertTipoCorreo = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertTipoCorreo = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertTipoCorreo = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Tipo Correo Alert")//tttt
    }
    //alerta
    $('#alerta .modal-content').addClass(VarJsColorAlertTipoCorreo);//variable de color alerta xxxx
    $('#alerta h5').text(VarJsTextoAlertTipoCorreo);//variable de texto alerta xxxx
    $('#alerta').modal('show');
    setTimeout(function () {
        $('#alerta').modal('hide');
        $('#alerta .modal-content').removeClass(VarJsColorAlertTipoCorreo);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblTipoCorreo.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxRTipoCorreo();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNTipoCorreo").modal("toggle");//nombre modal xxxx
}