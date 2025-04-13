/*variable de tablas*/
var tablaTipoCliente;/*tabla mpodulo*/
var ModCTipoCliente = $('#modalNTipoCliente'); // modal 
//campos de tablas
var VarJsTipoClienteId = 0;
var VarJsTipoCliente = "";


//igual para todos
var formTipoCliente = document.querySelector('#form1');

//variables crud
CRUDTipoCliente = "";
//variables alertas
var VarJsColorAlertTipoCliente = "";
var VarJsTextoAlertTipoCliente = "";
//variables existe
var ETipoCliente = true;


$('#lbMostrarTipoCliente').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    FnJsAjaxRTipoCliente(); //llama al ajax xxxx
});

function FnJsAjaxRTipoCliente() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo9/VstTipoCliente.aspx/FnRTipoClienteV", // nombre de página y nombre de función xxxx
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowTipoCliente(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowTipoCliente(data) {//3 llenar la tabla xxxx

    $('#tblTipoCliente').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaTipoCliente = $("#tblTipoCliente").DataTable({// variable nombre tabla xxxx

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
                    id: 'colTipoCliente'//se añade el id para ocultar xxxx
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
                filename: 'Tipo de Cliente' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Tipo de Cliente', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Tipo de Cliente' //tttt
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
                filename: 'Tipo de Cliente' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
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
    tablaTipoCliente.buttons().container().addClass('form-inline');///variable xxxx

    for (var contTipoCliente = 0; contTipoCliente < data.length; contTipoCliente++) { // declarar variable de recorrido de arreglo data xxxx
        tablaTipoCliente.row.add([//sensitivecase:
            data[contTipoCliente].IdTipoCliente,//campos
            data[contTipoCliente].TipoCliente,
            '<button value="editar" href="#modalNTipoCliente" data-toggle="modal" title="editar" class="btn btn-warning  btn-editTipoCliente"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNTipoCliente" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteTipoCliente"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNTipoCliente').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCTipoCliente(); // nombre función xxxx
    ETipoCliente = true; // variable xxxx

    FnJsBlockTipoCliente(); // nombre función xxxx

    CRUDTipoCliente = "C"; // nombre variable xxxx

    //campos xxxx
    VarJsTipoClienteId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsTipoCliente = ""; // cada campo tiene una variable, inicializar xxxx

});
$(document).on('click', '.btn-editTipoCliente', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUTipoCliente();//nombre de función xxxx
    var dataTipoCliente = tablaTipoCliente.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsTipoClienteId = dataTipoCliente[0]; //id de la fila seleccionada
    $('#txtNuevoTipoCliente').val(dataTipoCliente[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsTipoCliente = dataTipoCliente[1]; // variable elemento, variable data, índice xxxx

    CRUDTipoCliente = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteTipoCliente', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDTipoCliente();//nombre de función xxxx
    ETipoCliente = false; // variable de existe xxxx


    FnJsBlockTipoCliente();//función bloquear xxxx
    var dataTipoCliente = tablaTipoCliente.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsTipoClienteId = dataTipoCliente[0]; //id de la fila seleccionada
    $('#txtNuevoTipoCliente').val(dataTipoCliente[1]);// [indice columna]  de la fila seleccionada xxxx

    VarJsTipoCliente = dataTipoCliente[1]; // variable elemento, variable data, índice xxxx

    CRUDTipoCliente = "D";
});

//pintar modal
function FnJsCTipoCliente() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoTipoCliente').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorTipoCliente").removeAttr("class");//quitar el atributo class
    $("#DivModBorTipoCliente").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaTipoCliente").removeAttr("class");//quitar el atributo class
    $("#DivModHeaTipoCliente").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitTipoCliente').text('Nuevo Tipo de Cliente');//tttt
    //cambiar el color icono btn
    $("#btnNueTipoCliente").removeAttr("class");//quitar el atributo class
    $("#btnNueTipoCliente").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNueTipoCliente i").removeAttr("class");
    $("#btnNueTipoCliente i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoTipoCliente").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCTipoCliente[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUTipoCliente() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoTipoCliente').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorTipoCliente").removeAttr("class");//quitar el atributo class
    $("#DivModBorTipoCliente").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaTipoCliente").removeAttr("class");//quitar el atributo class
    $("#DivModHeaTipoCliente").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitTipoCliente').text('Editar Tipo de Cliente');//tttt
    //cambiar el color icono btn
    $("#btnNueTipoCliente").removeAttr("class");//quitar el atributo class
    $("#btnNueTipoCliente").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNueTipoCliente i").removeAttr("class");
    $("#btnNueTipoCliente i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoTipoCliente").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCTipoCliente[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDTipoCliente() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoTipoCliente').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorTipoCliente").removeAttr("class");//quitar el atributo class
    $("#DivModBorTipoCliente").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaTipoCliente").removeAttr("class");//quitar el atributo class
    $("#DivModHeaTipoCliente").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitTipoCliente').text('Eliminar Tipo de Cliente');//tttt
    //cambiar el color icono btn
    $("#btnNueTipoCliente").removeAttr("class");//quitar el atributo class
    $("#btnNueTipoCliente").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNueTipoCliente i").removeAttr("class");
    $("#btnNueTipoCliente i").attr("class", "fa fa-trash fa-2x");//ícono
    //bloquear elementos
    $("#txtNuevoTipoCliente").attr('disabled', true); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCTipoCliente[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockTipoCliente() {// nombre función xxxx

    if (ETipoCliente == true) {// variables xxxx
        $("#btnNueTipoCliente").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNueTipoCliente").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter
    }
    else if (ETipoCliente == false) {// variables xxxx
        $("#btnNueTipoCliente").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNueTipoCliente").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter
    }
}

//guardar CUD
$('#btnNueTipoCliente').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formTipoCliente.checkValidity()) {
        switch (CRUDTipoCliente) { // variable crud xxxx
            case "C":
                FnJsAjaxCTipoCliente(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUTipoCliente();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDTipoCliente();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Tipo de Cliente");/////tttt
        }
    }
    console.log(formTipoCliente.checkValidity());
});

//ajax CUD
function FnJsAjaxCTipoCliente() {
    $.ajax({
        url: "/modulo9/VstTipoCliente.aspx/FnCTipoClienteV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            TipoCliente: VarJsTipoCliente,

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Tipo de Cliente Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDTipoCliente = "error"
                console.log("No se pudo agregar Tipo de indentificación");//
            }
            FnAlertaTipoCliente(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUTipoCliente() {
    $.ajax({
        url: "/modulo9/VstTipoCliente.aspx/FnUTipoClienteV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdTipoCliente: VarJsTipoClienteId,
            TipoCliente: VarJsTipoCliente,


        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Tipo de Cliente Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDTipoCliente = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaTipoCliente();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDTipoCliente() {
    $.ajax({
        url: "/modulo9/VstTipoCliente.aspx/FnDTipoClienteV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdTipoCliente: VarJsTipoClienteId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Tipo de Cliente Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDTipoCliente = "error"
                console.log("No se pudo Eliminar Tipo de Cliente");////tttt
            }
            FnAlertaTipoCliente(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxETipoCliente() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo9/VstTipoCliente.aspx/FnETipoClienteV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdTipoCliente: VarJsTipoClienteId,
            TipoCliente: VarJsTipoCliente
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                ETipoCliente = true; // variable existe xxxx
                $('#lblexistenuevoTipoCliente').text("Existe Tipo de Cliente");// id etiqueta texto etiqueta //tttt
                FnJsBlockTipoCliente();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                ETipoCliente = false;// variable existe xxxx
                $('#lblexistenuevoTipoCliente').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockTipoCliente(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExisteTipoCliente() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoTipoCliente').val().length > 3) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoTipoCliente').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsTipoCliente = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteTipoCliente()) {//nombre función verificar existe xxxx
        FnJsAjaxETipoCliente(); // llamar todos los existes xxxx

    }
});


function FnAlertaTipoCliente() {//nombre de la función xxxx

    switch (CRUDTipoCliente) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertTipoCliente = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertTipoCliente = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertTipoCliente = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertTipoCliente = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertTipoCliente = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertTipoCliente = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertTipoCliente = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertTipoCliente = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Tipo de Cliente Alert")//tttt
    }
    //alerta
    $('#alertaTipoCliente .modal-content').addClass(VarJsColorAlertTipoCliente);//variable de color alerta xxxx
    $('#alertaTipoCliente h5').text(VarJsTextoAlertTipoCliente);//variable de texto alerta xxxx
    $('#alertaTipoCliente').modal('show');
    setTimeout(function () {
        $('#alertaTipoCliente').modal('hide');
        $('#alertaTipoCliente .modal-content').removeClass(VarJsColorAlertTipoCliente);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblTipoCliente.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxRTipoCliente();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNTipoCliente").modal("toggle");//nombre modal xxxx
}