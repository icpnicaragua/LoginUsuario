/*variable de tablas*/
var tablaEntrada;/*tabla mpodulo*/
var ModCEntrada = $('#modalNEntrada'); // modal 
//campos de tablas
var VarJsEntradaId = 0;
var VarJsEntrada = "";


//igual para todos
var formEntrada = document.querySelector('#form1');

//variables crud
CRUDEntrada = "";
//variables alertas
var VarJsColorAlertEntrada = "";
var VarJsTextoAlertEntrada = "";
//variables existe
var EEntrada = true;


$('#lbMostrarEntrada').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    FnJsAjaxREntrada(); //llama al ajax xxxx
});

function FnJsAjaxREntrada() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo2/VstCompras.aspx/FnREntradaV", // nombre de página y nombre de función xxxx
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowEntrada(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowEntrada(data) {//3 llenar la tabla xxxx

    $('#tblEntrada').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaEntrada = $("#tblEntrada").DataTable({// variable nombre tabla xxxx

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
                    id: 'colEntrada'//se añade el id para ocultar xxxx
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
                filename: 'Tipo de Entrada' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Tipo de Entrada', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Tipo de Entrada' //tttt
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
                filename: 'Tipo de Entrada' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
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
    tablaEntrada.buttons().container().addClass('form-inline');///variable xxxx

    for (var contEntrada = 0; contEntrada < data.length; contEntrada++) { // declarar variable de recorrido de arreglo data xxxx
        tablaEntrada.row.add([//sensitivecase:
            data[contEntrada].IdEntrada,//campos
            data[contEntrada].Entrada,
            '<button value="editar" href="#modalNEntrada" data-toggle="modal" title="editar" class="btn btn-warning  btn-editEntrada"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNEntrada" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteEntrada"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNEntrada').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCEntrada(); // nombre función xxxx
    EEntrada = true; // variable xxxx

    FnJsBlockEntrada(); // nombre función xxxx

    CRUDEntrada = "C"; // nombre variable xxxx

    //campos xxxx
    VarJsEntradaId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsEntrada = ""; // cada campo tiene una variable, inicializar xxxx

});
$(document).on('click', '.btn-editEntrada', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUEntrada();//nombre de función xxxx
    var dataEntrada = tablaEntrada.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsEntradaId = dataEntrada[0]; //id de la fila seleccionada
    $('#txtNuevoEntrada').val(dataEntrada[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsEntrada = dataEntrada[1]; // variable elemento, variable data, índice xxxx

    CRUDEntrada = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteEntrada', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDEntrada();//nombre de función xxxx
    EEntrada = false; // variable de existe xxxx


    FnJsBlockEntrada();//función bloquear xxxx
    var dataEntrada = tablaEntrada.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsEntradaId = dataEntrada[0]; //id de la fila seleccionada
    $('#txtNuevoEntrada').val(dataEntrada[1]);// [indice columna]  de la fila seleccionada xxxx

    VarJsEntrada = dataEntrada[1]; // variable elemento, variable data, índice xxxx

    CRUDEntrada = "D";
});

//pintar modal
function FnJsCEntrada() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoEntrada').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorEntrada").removeAttr("class");//quitar el atributo class
    $("#DivModBorEntrada").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaEntrada").removeAttr("class");//quitar el atributo class
    $("#DivModHeaEntrada").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitEntrada').text('Nuevo Tipo de Entrada');//tttt
    //cambiar el color icono btn
    $("#btnNueEntrada").removeAttr("class");//quitar el atributo class
    $("#btnNueEntrada").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNueEntrada i").removeAttr("class");
    $("#btnNueEntrada i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoEntrada").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCEntrada[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUEntrada() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoEntrada').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorEntrada").removeAttr("class");//quitar el atributo class
    $("#DivModBorEntrada").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaEntrada").removeAttr("class");//quitar el atributo class
    $("#DivModHeaEntrada").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitEntrada').text('Editar Tipo de Entrada');//tttt
    //cambiar el color icono btn
    $("#btnNueEntrada").removeAttr("class");//quitar el atributo class
    $("#btnNueEntrada").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNueEntrada i").removeAttr("class");
    $("#btnNueEntrada i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoEntrada").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCEntrada[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDEntrada() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoEntrada').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorEntrada").removeAttr("class");//quitar el atributo class
    $("#DivModBorEntrada").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaEntrada").removeAttr("class");//quitar el atributo class
    $("#DivModHeaEntrada").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitEntrada').text('Eliminar Tipo de Entrada');//tttt
    //cambiar el color icono btn
    $("#btnNueEntrada").removeAttr("class");//quitar el atributo class
    $("#btnNueEntrada").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNueEntrada i").removeAttr("class");
    $("#btnNueEntrada i").attr("class", "fa fa-trash fa-2x");//ícono
    //bloquear elementos
    $("#txtNuevoEntrada").attr('disabled', true); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCEntrada[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockEntrada() {// nombre función xxxx

    if (EEntrada == true) {// variables xxxx
        $("#btnNueEntrada").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNueEntrada").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter
    }
    else if (EEntrada == false) {// variables xxxx
        $("#btnNueEntrada").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNueEntrada").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter
    }
}

//guardar CUD
$('#btnNueEntrada').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formEntrada.checkValidity()) {
        switch (CRUDEntrada) { // variable crud xxxx
            case "C":
                FnJsAjaxCEntrada(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUEntrada();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDEntrada();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Tipo de Entrada");/////tttt
        }
    }
    console.log(formEntrada.checkValidity());
});

//ajax CUD
function FnJsAjaxCEntrada() {
    $.ajax({
        url: "/modulo2/VstCompras.aspx/FnCEntradaV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            Entrada: VarJsEntrada,

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Tipo de Entrada Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDEntrada = "error"
                console.log("No se pudo agregar Tipo de Entrada");//
            }
            FnAlertaEntrada(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUEntrada() {
    $.ajax({
        url: "/modulo2/VstCompras.aspx/FnUEntradaV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdEntrada: VarJsEntradaId,
            Entrada: VarJsEntrada,


        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Tipo de Entrada Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDEntrada = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaEntrada();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDEntrada() {
    $.ajax({
        url: "/modulo2/VstCompras.aspx/FnDEntradaV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdEntrada: VarJsEntradaId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Tipo de Entrada Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDEntrada = "error"
                console.log("No se pudo Eliminar Tipo de Entrada");////tttt
            }
            FnAlertaEntrada(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxEEntrada() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo2/VstCompras.aspx/FnEEntradaV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdEntrada: VarJsEntradaId,
            Entrada: VarJsEntrada
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                EEntrada = true; // variable existe xxxx
                $('#lblexistenuevoEntrada').text("Existe Tipo de Entrada");// id etiqueta texto etiqueta //tttt
                FnJsBlockEntrada();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                EEntrada = false;// variable existe xxxx
                $('#lblexistenuevoEntrada').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockEntrada(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExisteEntrada() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoEntrada').val().length > 3) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoEntrada').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsEntrada = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteEntrada()) {//nombre función verificar existe xxxx
        FnJsAjaxEEntrada(); // llamar todos los existes xxxx

    }
});


function FnAlertaEntrada() {//nombre de la función xxxx

    switch (CRUDEntrada) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertEntrada = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertEntrada = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertEntrada = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertEntrada = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertEntrada = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertEntrada = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertEntrada = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertEntrada = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Tipo de Entrada Alert")//tttt
    }
    //alerta
    $('#alertaCompras .modal-content').addClass(VarJsColorAlertEntrada);//variable de color alerta xxxx
    $('#alertaCompras h5').text(VarJsTextoAlertEntrada);//variable de texto alerta xxxx
    $('#alertaCompras').modal('show');
    setTimeout(function () {
        $('#alertaCompras').modal('hide');
        $('#alertaCompras .modal-content').removeClass(VarJsColorAlertEntrada);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblEntrada.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxREntrada();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNEntrada").modal("toggle");//nombre modal xxxx
}