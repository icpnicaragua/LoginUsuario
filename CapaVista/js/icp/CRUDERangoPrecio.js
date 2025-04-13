/*variable de tablas*/
var tablaRangoPrecio;/*tabla mpodulo*/
var ModCRangoPrecio = $('#modalNRangoPrecio'); // modal 
//campos de tablas
var VarJsRangoPrecioId = 0;
var VarJsRangoPrecio = "";
var VarJsValorMinimo = 0;

//igual para todos
var formRangoPrecio = document.querySelector('#form1');

//variables crud
CRUDRangoPrecio = "";
//variables alertas
var VarJsColorAlertRangoPrecio = "";
var VarJsTextoAlertRangoPrecio = "";
//variables existe
var ERangoPrecio = true;


$('#lbMostrarRangoPrecio').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    FnJsAjaxRRangoPrecio(); //llama al ajax xxxx
});

function FnJsAjaxRRangoPrecio() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo10/VstRangoPrecios.aspx/FnRRangoPrecioV", // nombre de página y nombre de función xxxx
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowRangoPrecio(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowRangoPrecio(data) {//3 llenar la tabla xxxx

    $('#tblRangoPrecio').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaRangoPrecio = $("#tblRangoPrecio").DataTable({// variable nombre tabla xxxx

        "retrieve": true,
        dom: 'Bfrtip',

        "order": [1, 'asc'],//"order": [[ 0, 'asc' ], [ 1, 'desc' ]] // columna, orden xxxx comienza en 0
        "columnDefs": [
            { "targets": 3, "searchable": false },
            { "orderable": false, "targets": 3 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colRangoPrecio'//se añade el id para ocultar xxxx
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
                    columns: [':not(:eq(3)):visible'] /// index de controles xxxx para no mostrar comienza en 0
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
                    columns: [':not(:eq(3)):visible'] ///  index de controles xxxx para no mostrar comienza en 0
                },
                titleAttr: 'PDF',
                filename: 'Rango de precios' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Rango de precios', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Rango de precios' //tttt
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
                filename: 'Rango de precios' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
                text: '<i class="far fa-file-excel fa-2x"></i>',
                className: 'btn btn-success d-none d-lg-block',
                exportOptions: {
                    columns: [':not(:eq(3)):visible'] // index de controles xxxx para no mostrar inicia en 0
                },
                titleAttr: 'Excel',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')

                }

            }
        ],
        "language": FnJsEspTbl()
    });
    tablaRangoPrecio.buttons().container().addClass('form-inline');///variable xxxx

    for (var contRangoPrecio = 0; contRangoPrecio < data.length; contRangoPrecio++) { // declarar variable de recorrido de arreglo data xxxx
        tablaRangoPrecio.row.add([//sensitivecase:
            data[contRangoPrecio].IdRangoPrecio,//campos
            data[contRangoPrecio].Rango,
            data[contRangoPrecio].ValorMinimo,
            '<button value="editar" href="#modalNRangoPrecio" data-toggle="modal" title="editar" class="btn btn-warning  btn-editRangoPrecio"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNRangoPrecio" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteRangoPrecio"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNRangoPrecio').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCRangoPrecio(); // nombre función xxxx
    ERangoPrecio = true; // variable xxxx

    FnJsBlockRangoPrecio(); // nombre función xxxx

    CRUDRangoPrecio = "C"; // nombre variable xxxx

    //campos xxxx
    VarJsRangoPrecioId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsRangoPrecio = ""; // cada campo tiene una variable, inicializar xxxx
    VarJsValorMinimo = 0;
});
$(document).on('click', '.btn-editRangoPrecio', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsURangoPrecio();//nombre de función xxxx
    var dataRangoPrecio = tablaRangoPrecio.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsRangoPrecioId = dataRangoPrecio[0]; //id de la fila seleccionada
    $('#txtNuevoRangoPrecio').val(dataRangoPrecio[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsRangoPrecio = dataRangoPrecio[1]; // variable elemento, variable data, índice xxxx
    $('#txtNuevoValorMinimo').val(dataRangoPrecio[2]);// [indice columna]  de la fila seleccionada xxxx
    VarJsValorMinimo = dataRangoPrecio[2]; // variable elemento, variable data, índice xxxx

    CRUDRangoPrecio = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteRangoPrecio', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDRangoPrecio();//nombre de función xxxx
    ERangoPrecio = false; // variable de existe xxxx


    FnJsBlockRangoPrecio();//función bloquear xxxx
    var dataRangoPrecio = tablaRangoPrecio.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsRangoPrecioId = dataRangoPrecio[0]; //id de la fila seleccionada
    $('#txtNuevoRangoPrecio').val(dataRangoPrecio[1]);// [indice columna]  de la fila seleccionada xxxx
    $('#txtNuevoValorMinimo').val(dataRangoPrecio[2]);// [indice columna]  de la fila seleccionada xxxx
    VarJsRangoPrecio = dataRangoPrecio[1]; // variable elemento, variable data, índice xxxx
    VarJsValorMinimo = dataRangoPrecio[2]; // variable elemento, variable data, índice xxxx
    CRUDRangoPrecio = "D";
});

//pintar modal
function FnJsCRangoPrecio() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoRangoPrecio').text(""); // id etiqueta texto etiqueta xxxx
    $('#lblexistenuevoValorMinimo').text(""); // id etiqueta texto etiqueta xxxx
    
    //cambiar el color del modal borde
    $("#DivModBorRangoPrecio").removeAttr("class");//quitar el atributo class
    $("#DivModBorRangoPrecio").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaRangoPrecio").removeAttr("class");//quitar el atributo class
    $("#DivModHeaRangoPrecio").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitRangoPrecio').text('Nuevo Rango de precios');//tttt
    //cambiar el color icono btn
    $("#btnNueRangoPrecio").removeAttr("class");//quitar el atributo class
    $("#btnNueRangoPrecio").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNueRangoPrecio i").removeAttr("class");
    $("#btnNueRangoPrecio i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos campos
    $("#txtNuevoRangoPrecio").attr('disabled', false); //variables de los elementos del modal xxxx
    $("#txtNuevoValorMinimo").attr('disabled', false); //variables de los elementos del modal xxxx

    

    //vaciar elementos text de todo el modal
    $('#' + ModCRangoPrecio[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsURangoPrecio() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoRangoPrecio').text(""); // id etiqueta texto etiqueta xxxx
    $('#lblexistenuevoValorMinimo').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorRangoPrecio").removeAttr("class");//quitar el atributo class
    $("#DivModBorRangoPrecio").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaRangoPrecio").removeAttr("class");//quitar el atributo class
    $("#DivModHeaRangoPrecio").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitRangoPrecio').text('Editar Rango de precios');//tttt
    //cambiar el color icono btn
    $("#btnNueRangoPrecio").removeAttr("class");//quitar el atributo class
    $("#btnNueRangoPrecio").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNueRangoPrecio i").removeAttr("class");
    $("#btnNueRangoPrecio i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos campos
    $("#txtNuevoRangoPrecio").attr('disabled', false); //variables de los elementos del modal xxxx
    $("#txtNuevoValorMinimo").attr('disabled', false); //variables de los elementos del modal xxxx
    //vaciar elementos text de todo el modal
    $('#' + ModCRangoPrecio[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDRangoPrecio() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoRangoPrecio').text(""); // id etiqueta texto etiqueta xxxx
    $('#lblexistenuevoValorMinimo').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorRangoPrecio").removeAttr("class");//quitar el atributo class
    $("#DivModBorRangoPrecio").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaRangoPrecio").removeAttr("class");//quitar el atributo class
    $("#DivModHeaRangoPrecio").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitRangoPrecio').text('Eliminar Rango de precios');//tttt
    //cambiar el color icono btn
    $("#btnNueRangoPrecio").removeAttr("class");//quitar el atributo class
    $("#btnNueRangoPrecio").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNueRangoPrecio i").removeAttr("class");
    $("#btnNueRangoPrecio i").attr("class", "fa fa-trash fa-2x");//ícono
    //bloquear elementos
    $("#txtNuevoRangoPrecio").attr('disabled', true); //variables de los elementos del modal xxxx
    $("#txtNuevoValorMinimo").attr('disabled', true); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCRangoPrecio[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockRangoPrecio() {// nombre función xxxx

    if (ERangoPrecio == true) {// variables xxxx
        $("#btnNueRangoPrecio").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNueRangoPrecio").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter
    }
    else if (ERangoPrecio == false) {// variables xxxx
        $("#btnNueRangoPrecio").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNueRangoPrecio").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter
    }
}

//guardar CUD
$('#btnNueRangoPrecio').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formRangoPrecio.checkValidity()) {
        switch (CRUDRangoPrecio) { // variable crud xxxx
            case "C":
                FnJsAjaxCRangoPrecio(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxURangoPrecio();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDRangoPrecio();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Rango de precios");/////tttt
        }
    }
});

//ajax CUD
function FnJsAjaxCRangoPrecio() {
    $.ajax({
        url: "/modulo10/VstRangoPrecios.aspx/FnCRangoPrecioV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea campos
            RangoPrecio: VarJsRangoPrecio,
            ValorMinimo: VarJsValorMinimo


        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Rango de precios Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDRangoPrecio = "error"
                console.log("No se pudo agregar Tipo de indentificación");//
            }
            FnAlertaRangoPrecio(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxURangoPrecio() {
    $.ajax({
        url: "/modulo10/VstRangoPrecios.aspx/FnURangoPrecioV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdRangoPrecio: VarJsRangoPrecioId,
            RangoPrecio: VarJsRangoPrecio,
            ValorMinimo: VarJsValorMinimo

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Rango de precios Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDRangoPrecio = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaRangoPrecio();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDRangoPrecio() {
    $.ajax({
        url: "/modulo10/VstRangoPrecios.aspx/FnDRangoPrecioV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdRangoPrecio: VarJsRangoPrecioId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Rango de precios Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDRangoPrecio = "error"
                console.log("No se pudo Eliminar Rango de precios");////tttt
            }
            FnAlertaRangoPrecio(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxERangoPrecio() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo10/VstRangoPrecios.aspx/FnERangoPrecioV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdRangoPrecio: VarJsRangoPrecioId,
            RangoPrecio: VarJsRangoPrecio
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                ERangoPrecio = true; // variable existe xxxx
                $('#lblexistenuevoRangoPrecio').text("Existe Rango de precios");// id etiqueta texto etiqueta //tttt
                FnJsBlockRangoPrecio();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                ERangoPrecio = false;// variable existe xxxx
                $('#lblexistenuevoRangoPrecio').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockRangoPrecio(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExisteRangoPrecio() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoRangoPrecio').val().length > 3) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}

//campos xxxx
$('#txtNuevoRangoPrecio').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsRangoPrecio = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteRangoPrecio()) {//nombre función verificar existe xxxx
        FnJsAjaxERangoPrecio(); // llamar todos los existes xxxx

    }
});
$('#txtNuevoValorMinimo').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsValorMinimo = $(this).val(); // variable de este elemento xxxx
});


function FnAlertaRangoPrecio() {//nombre de la función xxxx

    switch (CRUDRangoPrecio) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertRangoPrecio = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertRangoPrecio = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertRangoPrecio = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertRangoPrecio = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertRangoPrecio = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertRangoPrecio = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertRangoPrecio = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertRangoPrecio = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Rango deprecios Alert")//tttt
    }
    //alerta
    $('#alertaRangoPrecio .modal-content').addClass(VarJsColorAlertRangoPrecio);//variable de color alerta xxxx
    $('#alertaRangoPrecio h5').text(VarJsTextoAlertRangoPrecio);//variable de texto alerta xxxx
    $('#alertaRangoPrecio').modal('show');
    setTimeout(function () {
        $('#alertaRangoPrecio').modal('hide');
        $('#alertaRangoPrecio .modal-content').removeClass(VarJsColorAlertRangoPrecio);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblRangoPrecio.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxRRangoPrecio();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNRangoPrecio").modal("toggle");//nombre modal xxxx
}