/*variable de tablas*/
var tablaEstadoCivil;/*tabla mpodulo*/
var ModCEstadoCivil = $('#modalNEstadoCivil'); // modal 
//campos de tablas
var VarJsEstadoCivilId = 0;
var VarJsEstadoCivil = "";


//igual para todos
var formEstadoCivil = document.querySelector('#form1');

//variables crud
CRUDEstadoCivil = "";
//variables alertas
var VarJsColorAlertEstadoCivil = "";
var VarJsTextoAlertEstadoCivil = "";
//variables existe
var EEstadoCivil = true;


$('#lbMostrarEstadoCivil').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    FnJsAjaxREstadoCivil(); //llama al ajax xxxx
});

function FnJsAjaxREstadoCivil() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo7/VstGenerales.aspx/FnREstadoCivilV", // nombre de página y nombre de función xxxx
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowEstadoCivil(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowEstadoCivil(data) {//3 llenar la tabla xxxx

    $('#tblEstadoCivil').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaEstadoCivil = $("#tblEstadoCivil").DataTable({// variable nombre tabla xxxx

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
                    id: 'colEstadoCivil'//se añade el id para ocultar xxxx
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
                filename: 'Tipo de Estado Civil' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Tipo de Estado Civil', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Tipo de Estado Civil' //tttt
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
                filename: 'Tipo de Estado Civil' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
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
    tablaEstadoCivil.buttons().container().addClass('form-inline');///variable xxxx

    for (var contEstadoCivil = 0; contEstadoCivil < data.length; contEstadoCivil++) { // declarar variable de recorrido de arreglo data xxxx
        tablaEstadoCivil.row.add([//sensitivecase:
            data[contEstadoCivil].IdEstadoCivil,//campos
            data[contEstadoCivil].EstadoCivil,
            '<button value="editar" href="#modalNEstadoCivil" data-toggle="modal" title="editar" class="btn btn-warning  btn-editEstadoCivil"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNEstadoCivil" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteEstadoCivil"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNEstadoCivil').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCEstadoCivil(); // nombre función xxxx
    EEstadoCivil = true; // variable xxxx

    FnJsBlockEstadoCivil(); // nombre función xxxx

    CRUDEstadoCivil = "C"; // nombre variable xxxx

    //campos xxxx
    VarJsEstadoCivilId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsEstadoCivil = ""; // cada campo tiene una variable, inicializar xxxx

});
$(document).on('click', '.btn-editEstadoCivil', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUEstadoCivil();//nombre de función xxxx
    var dataEstadoCivil = tablaEstadoCivil.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsEstadoCivilId = dataEstadoCivil[0]; //id de la fila seleccionada
    $('#txtNuevoEstadoCivil').val(dataEstadoCivil[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsEstadoCivil = dataEstadoCivil[1]; // variable elemento, variable data, índice xxxx

    CRUDEstadoCivil = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteEstadoCivil', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDEstadoCivil();//nombre de función xxxx
    EEstadoCivil = false; // variable de existe xxxx


    FnJsBlockEstadoCivil();//función bloquear xxxx
    var dataEstadoCivil = tablaEstadoCivil.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsEstadoCivilId = dataEstadoCivil[0]; //id de la fila seleccionada
    $('#txtNuevoEstadoCivil').val(dataEstadoCivil[1]);// [indice columna]  de la fila seleccionada xxxx

    VarJsEstadoCivil = dataEstadoCivil[1]; // variable elemento, variable data, índice xxxx

    CRUDEstadoCivil = "D";
});

//pintar modal
function FnJsCEstadoCivil() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoEstadoCivil').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorEstadoCivil").removeAttr("class");//quitar el atributo class
    $("#DivModBorEstadoCivil").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaEstadoCivil").removeAttr("class");//quitar el atributo class
    $("#DivModHeaEstadoCivil").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitEstadoCivil').text('Nuevo Tipo de Estado Civil');//tttt
    //cambiar el color icono btn
    $("#btnNueEstadoCivil").removeAttr("class");//quitar el atributo class
    $("#btnNueEstadoCivil").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNueEstadoCivil i").removeAttr("class");
    $("#btnNueEstadoCivil i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoEstadoCivil").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCEstadoCivil[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUEstadoCivil() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoEstadoCivil').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorEstadoCivil").removeAttr("class");//quitar el atributo class
    $("#DivModBorEstadoCivil").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaEstadoCivil").removeAttr("class");//quitar el atributo class
    $("#DivModHeaEstadoCivil").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitEstadoCivil').text('Editar Tipo de Estado Civil');//tttt
    //cambiar el color icono btn
    $("#btnNueEstadoCivil").removeAttr("class");//quitar el atributo class
    $("#btnNueEstadoCivil").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNueEstadoCivil i").removeAttr("class");
    $("#btnNueEstadoCivil i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoEstadoCivil").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCEstadoCivil[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDEstadoCivil() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoEstadoCivil').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorEstadoCivil").removeAttr("class");//quitar el atributo class
    $("#DivModBorEstadoCivil").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaEstadoCivil").removeAttr("class");//quitar el atributo class
    $("#DivModHeaEstadoCivil").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitEstadoCivil').text('Eliminar Tipo de Estado Civil');//tttt
    //cambiar el color icono btn
    $("#btnNueEstadoCivil").removeAttr("class");//quitar el atributo class
    $("#btnNueEstadoCivil").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNueEstadoCivil i").removeAttr("class");
    $("#btnNueEstadoCivil i").attr("class", "fa fa-trash fa-2x");//ícono
    //bloquear elementos
    $("#txtNuevoEstadoCivil").attr('disabled', true); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCEstadoCivil[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockEstadoCivil() {// nombre función xxxx

    if (EEstadoCivil == true) {// variables xxxx
        $("#btnNueEstadoCivil").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNueEstadoCivil").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter
    }
    else if (EEstadoCivil == false) {// variables xxxx
        $("#btnNueEstadoCivil").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNueEstadoCivil").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter
    }
}

//guardar CUD
$('#btnNueEstadoCivil').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formEstadoCivil.checkValidity()) {
        switch (CRUDEstadoCivil) { // variable crud xxxx
            case "C":
                FnJsAjaxCEstadoCivil(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUEstadoCivil();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDEstadoCivil();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Tipo de Estado Civil");/////tttt
        }
    }
    console.log(formEstadoCivil.checkValidity());
});

//ajax CUD
function FnJsAjaxCEstadoCivil() {
    $.ajax({
        url: "/modulo7/VstGenerales.aspx/FnCEstadoCivilV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            EstadoCivil: VarJsEstadoCivil,

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Tipo de Estado Civil Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDEstadoCivil = "error"
                console.log("No se pudo agregar Tipo de EstadoCivil");//
            }
            FnAlertaEstadoCivil(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUEstadoCivil() {
    $.ajax({
        url: "/modulo7/VstGenerales.aspx/FnUEstadoCivilV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdEstadoCivil: VarJsEstadoCivilId,
            EstadoCivil: VarJsEstadoCivil,


        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Tipo de Estado Civil Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDEstadoCivil = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaEstadoCivil();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDEstadoCivil() {
    $.ajax({
        url: "/modulo7/VstGenerales.aspx/FnDEstadoCivilV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdEstadoCivil: VarJsEstadoCivilId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Tipo de Estado Civil Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDEstadoCivil = "error"
                console.log("No se pudo Eliminar Tipo de Estado Civil");////tttt
            }
            FnAlertaEstadoCivil(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxEEstadoCivil() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo7/VstGenerales.aspx/FnEEstadoCivilV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdEstadoCivil: VarJsEstadoCivilId,
            EstadoCivil: VarJsEstadoCivil
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                EEstadoCivil = true; // variable existe xxxx
                $('#lblexistenuevoEstadoCivil').text("Existe Tipo de Estado Civil");// id etiqueta texto etiqueta //tttt
                FnJsBlockEstadoCivil();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                EEstadoCivil = false;// variable existe xxxx
                $('#lblexistenuevoEstadoCivil').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockEstadoCivil(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExisteEstadoCivil() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoEstadoCivil').val().length > 3) { // id de objetos de EstadoCivils, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoEstadoCivil').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsEstadoCivil = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteEstadoCivil()) {//nombre función verificar existe xxxx
        FnJsAjaxEEstadoCivil(); // llamar todos los existes xxxx

    }
});


function FnAlertaEstadoCivil() {//nombre de la función xxxx

    switch (CRUDEstadoCivil) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertEstadoCivil = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertEstadoCivil = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertEstadoCivil = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertEstadoCivil = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertEstadoCivil = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertEstadoCivil = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertEstadoCivil = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertEstadoCivil = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Tipo de Estado Civil Alert")//tttt
    }
    //alerta
    $('#alerta .modal-content').addClass(VarJsColorAlertEstadoCivil);//variable de color alerta xxxx
    $('#alerta h5').text(VarJsTextoAlertEstadoCivil);//variable de texto alerta xxxx
    $('#alerta').modal('show');
    setTimeout(function () {
        $('#alerta').modal('hide');
        $('#alerta .modal-content').removeClass(VarJsColorAlertEstadoCivil);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblEstadoCivil.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxREstadoCivil();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNEstadoCivil").modal("toggle");//nombre modal xxxx
}