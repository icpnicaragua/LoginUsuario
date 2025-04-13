/*variable de tablas*/
var tablaTipoPago;/*tabla mpodulo*/
var ModCTipoPago = $('#modalNTipoPago'); // modal 
//campos de tablas
var VarJsTipoPagoId = 0;
var VarJsTipoPago = "";


//igual para todos
var formTipoPago = document.querySelector('#form1');

//variables crud
CRUDTipoPago = "";
//variables alertas
var VarJsColorAlertTipoPago = "";
var VarJsTextoAlertTipoPago = "";
//variables existe
var ETipoPago = true;


$('#lbMostrarTipoPago').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    FnJsAjaxRTipoPago(); //llama al ajax xxxx
});

function FnJsAjaxRTipoPago() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo9/VstCxC.aspx/FnRTipoPagoV", // nombre de página y nombre de función xxxx
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowTipoPago(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowTipoPago(data) {//3 llenar la tabla xxxx

    $('#tblTipoPago').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaTipoPago = $("#tblTipoPago").DataTable({// variable nombre tabla xxxx

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
                    id: 'colTipoPago'//se añade el id para ocultar xxxx
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
                filename: 'Tipo de Pago' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Tipo de Pago', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Tipo de Pago' //tttt
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
                filename: 'Tipo de Pago' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
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
    tablaTipoPago.buttons().container().addClass('form-inline');///variable xxxx

    for (var contTipoPago = 0; contTipoPago < data.length; contTipoPago++) { // declarar variable de recorrido de arreglo data xxxx
        tablaTipoPago.row.add([//sensitivecase:
            data[contTipoPago].IdTipoPago,//campos
            data[contTipoPago].TipoPago,
            '<button value="editar" href="#modalNTipoPago" data-toggle="modal" title="editar" class="btn btn-warning  btn-editTipoPago"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNTipoPago" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteTipoPago"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNTipoPago').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCTipoPago(); // nombre función xxxx
    ETipoPago = true; // variable xxxx

    FnJsBlockTipoPago(); // nombre función xxxx

    CRUDTipoPago = "C"; // nombre variable xxxx

    //campos xxxx
    VarJsTipoPagoId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsTipoPago = ""; // cada campo tiene una variable, inicializar xxxx

});
$(document).on('click', '.btn-editTipoPago', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUTipoPago();//nombre de función xxxx
    var dataTipoPago = tablaTipoPago.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsTipoPagoId = dataTipoPago[0]; //id de la fila seleccionada
    $('#txtNuevoTipoPago').val(dataTipoPago[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsTipoPago = dataTipoPago[1]; // variable elemento, variable data, índice xxxx

    CRUDTipoPago = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteTipoPago', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDTipoPago();//nombre de función xxxx
    ETipoPago = false; // variable de existe xxxx


    FnJsBlockTipoPago();//función bloquear xxxx
    var dataTipoPago = tablaTipoPago.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsTipoPagoId = dataTipoPago[0]; //id de la fila seleccionada
    $('#txtNuevoTipoPago').val(dataTipoPago[1]);// [indice columna]  de la fila seleccionada xxxx

    VarJsTipoPago = dataTipoPago[1]; // variable elemento, variable data, índice xxxx

    CRUDTipoPago = "D";
});

//pintar modal
function FnJsCTipoPago() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoTipoPago').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorTipoPago").removeAttr("class");//quitar el atributo class
    $("#DivModBorTipoPago").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaTipoPago").removeAttr("class");//quitar el atributo class
    $("#DivModHeaTipoPago").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitTipoPago').text('Nuevo Tipo de Pago');//tttt
    //cambiar el color icono btn
    $("#btnNueTipoPago").removeAttr("class");//quitar el atributo class
    $("#btnNueTipoPago").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNueTipoPago i").removeAttr("class");
    $("#btnNueTipoPago i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoTipoPago").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCTipoPago[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUTipoPago() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoTipoPago').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorTipoPago").removeAttr("class");//quitar el atributo class
    $("#DivModBorTipoPago").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaTipoPago").removeAttr("class");//quitar el atributo class
    $("#DivModHeaTipoPago").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitTipoPago').text('Editar Tipo de Pago');//tttt
    //cambiar el color icono btn
    $("#btnNueTipoPago").removeAttr("class");//quitar el atributo class
    $("#btnNueTipoPago").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNueTipoPago i").removeAttr("class");
    $("#btnNueTipoPago i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoTipoPago").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCTipoPago[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDTipoPago() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoTipoPago').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorTipoPago").removeAttr("class");//quitar el atributo class
    $("#DivModBorTipoPago").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaTipoPago").removeAttr("class");//quitar el atributo class
    $("#DivModHeaTipoPago").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitTipoPago').text('Eliminar Tipo de Pago');//tttt
    //cambiar el color icono btn
    $("#btnNueTipoPago").removeAttr("class");//quitar el atributo class
    $("#btnNueTipoPago").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNueTipoPago i").removeAttr("class");
    $("#btnNueTipoPago i").attr("class", "fa fa-trash fa-2x");//ícono
    //bloquear elementos
    $("#txtNuevoTipoPago").attr('disabled', true); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCTipoPago[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockTipoPago() {// nombre función xxxx

    if (ETipoPago == true) {// variables xxxx
        $("#btnNueTipoPago").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNueTipoPago").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter
    }
    else if (ETipoPago == false) {// variables xxxx
        $("#btnNueTipoPago").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNueTipoPago").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter
    }
}

//guardar CUD
$('#btnNueTipoPago').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formTipoPago.checkValidity()) {
        switch (CRUDTipoPago) { // variable crud xxxx
            case "C":
                FnJsAjaxCTipoPago(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUTipoPago();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDTipoPago();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Tipo de Pago");/////tttt
        }
    }
    console.log(formTipoPago.checkValidity());
});

//ajax CUD
function FnJsAjaxCTipoPago() {
    $.ajax({
        url: "/modulo9/VstCxC.aspx/FnCTipoPagoV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            TipoPago: VarJsTipoPago,

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Tipo de Pago Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDTipoPago = "error"
                console.log("No se pudo agregar Tipo de indentificación");//
            }
            FnAlertaTipoPago(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUTipoPago() {
    $.ajax({
        url: "/modulo9/VstCxC.aspx/FnUTipoPagoV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdTipoPago: VarJsTipoPagoId,
            TipoPago: VarJsTipoPago,


        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Tipo de Pago Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDTipoPago = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaTipoPago();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDTipoPago() {
    $.ajax({
        url: "/modulo9/VstCxC.aspx/FnDTipoPagoV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdTipoPago: VarJsTipoPagoId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Tipo de Pago Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDTipoPago = "error"
                console.log("No se pudo Eliminar Tipo de Pago");////tttt
            }
            FnAlertaTipoPago(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxETipoPago() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo9/VstCxC.aspx/FnETipoPagoV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdTipoPago: VarJsTipoPagoId,
            TipoPago: VarJsTipoPago
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                ETipoPago = true; // variable existe xxxx
                $('#lblexistenuevoTipoPago').text("Existe Tipo de Pago");// id etiqueta texto etiqueta //tttt
                FnJsBlockTipoPago();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                ETipoPago = false;// variable existe xxxx
                $('#lblexistenuevoTipoPago').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockTipoPago(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExisteTipoPago() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoTipoPago').val().length > 3) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoTipoPago').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsTipoPago = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteTipoPago()) {//nombre función verificar existe xxxx
        FnJsAjaxETipoPago(); // llamar todos los existes xxxx

    }
});


function FnAlertaTipoPago() {//nombre de la función xxxx

    switch (CRUDTipoPago) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertTipoPago = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertTipoPago = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertTipoPago = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertTipoPago = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertTipoPago = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertTipoPago = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertTipoPago = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertTipoPago = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Tipo de Pago Alert")//tttt
    }
    //alerta
    $('#alertaCxC .modal-content').addClass(VarJsColorAlertTipoPago);//variable de color alerta xxxx
    $('#alertaCxC h5').text(VarJsTextoAlertTipoPago);//variable de texto alerta xxxx
    $('#alertaCxC').modal('show');
    setTimeout(function () {
        $('#alertaCxC').modal('hide');
        $('#alertaCxC .modal-content').removeClass(VarJsColorAlertTipoPago);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblTipoPago.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxRTipoPago();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNTipoPago").modal("toggle");//nombre modal xxxx
}