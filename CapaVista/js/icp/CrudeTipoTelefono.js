/*variable de tablas*/
var tablaTipoTelefono;/*tabla mpodulo*/
var ModCTipoTelefono = $('#modalNTipoTelefono'); // modal 
//campos de tablas
var VarJsTipoTelefonoId = 0;
var VarJsTipoTelefono = "";


//igual para todos
var formTipoTelefono = document.querySelector('#form1');

//variables crud
CRUDTipoTelefono = "";
//variables alertas
var VarJsColorAlertTipoTelefono = "";
var VarJsTextoAlertTipoTelefono = "";
//variables existe
var ETipoTelefono = true;


$('#lbMostrarTipoTelefono').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    FnJsAjaxRTipoTelefono(); //llama al ajax xxxx
});

function FnJsAjaxRTipoTelefono() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo7/VstGenerales.aspx/FnRTipoTelefonoV", // nombre de página y nombre de función xxxx
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowTipoTelefono(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowTipoTelefono(data) {//3 llenar la tabla xxxx

    $('#tblTipoTelefono').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaTipoTelefono = $("#tblTipoTelefono").DataTable({// variable nombre tabla xxxx

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
                    id: 'colTipoTelefono'//se añade el id para ocultar xxxx
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
                filename: 'Tipo de Teléfono' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Tipo de Teléfono', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Tipo de Teléfono' //tttt
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
                filename: 'Tipo de Teléfono' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
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
    tablaTipoTelefono.buttons().container().addClass('form-inline');///variable xxxx

    for (var contTipoTelefono = 0; contTipoTelefono < data.length; contTipoTelefono++) { // declarar variable de recorrido de arreglo data xxxx
        tablaTipoTelefono.row.add([//sensitivecase:
            data[contTipoTelefono].IdTipoTelefono,//campos
            data[contTipoTelefono].TipoTelefono,
            '<button value="editar" href="#modalNTipoTelefono" data-toggle="modal" title="editar" class="btn btn-warning  btn-editTipoTelefono"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNTipoTelefono" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteTipoTelefono"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNTipoTelefono').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCTipoTelefono(); // nombre función xxxx
    ETipoTelefono = true; // variable xxxx

    FnJsBlockTipoTelefono(); // nombre función xxxx

    CRUDTipoTelefono = "C"; // nombre variable xxxx

    //campos xxxx
    VarJsTipoTelefonoId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsTipoTelefono = ""; // cada campo tiene una variable, inicializar xxxx

});
$(document).on('click', '.btn-editTipoTelefono', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUTipoTelefono();//nombre de función xxxx
    var dataTipoTelefono = tablaTipoTelefono.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsTipoTelefonoId = dataTipoTelefono[0]; //id de la fila seleccionada
    $('#txtNuevoTipoTelefono').val(dataTipoTelefono[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsTipoTelefono = dataTipoTelefono[1]; // variable elemento, variable data, índice xxxx

    CRUDTipoTelefono = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteTipoTelefono', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDTipoTelefono();//nombre de función xxxx
    ETipoTelefono = false; // variable de existe xxxx


    FnJsBlockTipoTelefono();//función bloquear xxxx
    var dataTipoTelefono = tablaTipoTelefono.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsTipoTelefonoId = dataTipoTelefono[0]; //id de la fila seleccionada
    $('#txtNuevoTipoTelefono').val(dataTipoTelefono[1]);// [indice columna]  de la fila seleccionada xxxx

    VarJsTipoTelefono = dataTipoTelefono[1]; // variable elemento, variable data, índice xxxx

    CRUDTipoTelefono = "D";
});

//pintar modal
function FnJsCTipoTelefono() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoTipoTelefono').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorTipoTelefono").removeAttr("class");//quitar el atributo class
    $("#DivModBorTipoTelefono").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaTipoTelefono").removeAttr("class");//quitar el atributo class
    $("#DivModHeaTipoTelefono").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitTipoTelefono').text('Nuevo Tipo de Teléfono');//tttt
    //cambiar el color icono btn
    $("#btnNueTipoTelefono").removeAttr("class");//quitar el atributo class
    $("#btnNueTipoTelefono").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNueTipoTelefono i").removeAttr("class");
    $("#btnNueTipoTelefono i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoTipoTelefono").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCTipoTelefono[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUTipoTelefono() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoTipoTelefono').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorTipoTelefono").removeAttr("class");//quitar el atributo class
    $("#DivModBorTipoTelefono").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaTipoTelefono").removeAttr("class");//quitar el atributo class
    $("#DivModHeaTipoTelefono").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitTipoTelefono').text('Editar Tipo de Teléfono');//tttt
    //cambiar el color icono btn
    $("#btnNueTipoTelefono").removeAttr("class");//quitar el atributo class
    $("#btnNueTipoTelefono").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNueTipoTelefono i").removeAttr("class");
    $("#btnNueTipoTelefono i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoTipoTelefono").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCTipoTelefono[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDTipoTelefono() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoTipoTelefono').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorTipoTelefono").removeAttr("class");//quitar el atributo class
    $("#DivModBorTipoTelefono").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaTipoTelefono").removeAttr("class");//quitar el atributo class
    $("#DivModHeaTipoTelefono").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitTipoTelefono').text('Eliminar Tipo de Teléfono');//tttt
    //cambiar el color icono btn
    $("#btnNueTipoTelefono").removeAttr("class");//quitar el atributo class
    $("#btnNueTipoTelefono").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNueTipoTelefono i").removeAttr("class");
    $("#btnNueTipoTelefono i").attr("class", "fa fa-trash fa-2x");//ícono
    //bloquear elementos
    $("#txtNuevoTipoTelefono").attr('disabled', true); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCTipoTelefono[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockTipoTelefono() {// nombre función xxxx

    if (ETipoTelefono == true) {// variables xxxx
        $("#btnNueTipoTelefono").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNueTipoTelefono").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter
    }
    else if (ETipoTelefono == false) {// variables xxxx
        $("#btnNueTipoTelefono").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNueTipoTelefono").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter
    }
}

//guardar CUD
$('#btnNueTipoTelefono').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formTipoTelefono.checkValidity()) {
        switch (CRUDTipoTelefono) { // variable crud xxxx
            case "C":
                FnJsAjaxCTipoTelefono(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUTipoTelefono();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDTipoTelefono();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Tipo Teléfono");/////tttt
        }
    }
});

//ajax CUD
function FnJsAjaxCTipoTelefono() {
    $.ajax({
        url: "/modulo7/VstGenerales.aspx/FnCTipoTelefonoV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            TipoTelefono: VarJsTipoTelefono,

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Tipo de Teléfono Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDTipoTelefono = "error"
                console.log("No se pudo agregar Tipo de indentificación");//
            }
            FnAlertaTipoTelefono(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUTipoTelefono() {
    $.ajax({
        url: "/modulo7/VstGenerales.aspx/FnUTipoTelefonoV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdTipoTelefono: VarJsTipoTelefonoId,
            TipoTelefono: VarJsTipoTelefono,


        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Tipo de Teléfono Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDTipoTelefono = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaTipoTelefono();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDTipoTelefono() {
    $.ajax({
        url: "/modulo7/VstGenerales.aspx/FnDTipoTelefonoV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdTipoTelefono: VarJsTipoTelefonoId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Tipo de Teléfono Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDTipoTelefono = "error"
                console.log("No se pudo Eliminar Tipo de Teléfono");////tttt
            }
            FnAlertaTipoTelefono(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxETipoTelefono() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo7/VstGenerales.aspx/FnETipoTelefonoV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdTipoTelefono: VarJsTipoTelefonoId,
            TipoTelefono: VarJsTipoTelefono
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                ETipoTelefono = true; // variable existe xxxx
                $('#lblexistenuevoTipoTelefono').text("Existe Tipo de Teléfono");// id etiqueta texto etiqueta //tttt
                FnJsBlockTipoTelefono();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                ETipoTelefono = false;// variable existe xxxx
                $('#lblexistenuevoTipoTelefono').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockTipoTelefono(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExisteTipoTelefono() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoTipoTelefono').val().length > 3) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoTipoTelefono').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsTipoTelefono = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteTipoTelefono()) {//nombre función verificar existe xxxx
        FnJsAjaxETipoTelefono(); // llamar todos los existes xxxx

    }
});


function FnAlertaTipoTelefono() {//nombre de la función xxxx

    switch (CRUDTipoTelefono) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertTipoTelefono = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertTipoTelefono = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertTipoTelefono = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertTipoTelefono = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertTipoTelefono = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertTipoTelefono = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertTipoTelefono = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertTipoTelefono = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Tipo Teléfono Alert")//tttt
    }
    //alerta
    $('#alerta .modal-content').addClass(VarJsColorAlertTipoTelefono);//variable de color alerta xxxx
    $('#alerta h5').text(VarJsTextoAlertTipoTelefono);//variable de texto alerta xxxx
    $('#alerta').modal('show');
    setTimeout(function () {
        $('#alerta').modal('hide');
        $('#alerta .modal-content').removeClass(VarJsColorAlertTipoTelefono);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblTipoTelefono.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxRTipoTelefono();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNTipoTelefono").modal("toggle");//nombre modal xxxx
}