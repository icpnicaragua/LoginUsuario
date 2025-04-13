/*variable de tablas*/
var tablaTipoGasto;/*tabla mpodulo*/
var ModCTipoGasto = $('#modalNTipoGasto'); // modal 
//campos de tablas
var VarJsTipoGastoId = 0;
var VarJsTipoGasto = "";


//igual para todos
var formTipoGasto = document.querySelector('#form1');

//variables crud
CRUDTipoGasto = "";
//variables alertas
var VarJsColorAlertTipoGasto = "";
var VarJsTextoAlertTipoGasto = "";
//variables existe
var ETipoGasto = true;


$('#lbMostrarTipoGasto').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    FnJsAjaxRTipoGasto(); //llama al ajax xxxx
});

function FnJsAjaxRTipoGasto() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo1/VstGastos.aspx/FnRTipoGastoV", // nombre de página y nombre de función xxxx
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowTipoGasto(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowTipoGasto(data) {//3 llenar la tabla xxxx

    $('#tblTipoGasto').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaTipoGasto = $("#tblTipoGasto").DataTable({// variable nombre tabla xxxx

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
                    id: 'colTipoGasto'//se añade el id para ocultar xxxx
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
                filename: 'Tipo de gasto' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Tipo de gasto', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Tipo de gasto' //tttt
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
                filename: 'Tipo de gasto' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
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
    tablaTipoGasto.buttons().container().addClass('form-inline');///variable xxxx

    for (var contTipoGasto = 0; contTipoGasto < data.length; contTipoGasto++) { // declarar variable de recorrido de arreglo data xxxx
        tablaTipoGasto.row.add([//sensitivecase:
            data[contTipoGasto].IdTipoGasto,//campos
            data[contTipoGasto].TipoGasto,
            '<button value="editar" href="#modalNTipoGasto" data-toggle="modal" title="editar" class="btn btn-warning  btn-editTipoGasto"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNTipoGasto" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteTipoGasto"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNTipoGasto').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCTipoGasto(); // nombre función xxxx
    ETipoGasto = true; // variable xxxx

    FnJsBlockTipoGasto(); // nombre función xxxx

    CRUDTipoGasto = "C"; // nombre variable xxxx

    //campos xxxx
    VarJsTipoGastoId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsTipoGasto = ""; // cada campo tiene una variable, inicializar xxxx

});
$(document).on('click', '.btn-editTipoGasto', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUTipoGasto();//nombre de función xxxx
    var dataTipoGasto = tablaTipoGasto.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsTipoGastoId = dataTipoGasto[0]; //id de la fila seleccionada
    $('#txtNuevoTipoGasto').val(dataTipoGasto[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsTipoGasto = dataTipoGasto[1]; // variable elemento, variable data, índice xxxx

    CRUDTipoGasto = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteTipoGasto', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDTipoGasto();//nombre de función xxxx
    ETipoGasto = false; // variable de existe xxxx


    FnJsBlockTipoGasto();//función bloquear xxxx
    var dataTipoGasto = tablaTipoGasto.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsTipoGastoId = dataTipoGasto[0]; //id de la fila seleccionada
    $('#txtNuevoTipoGasto').val(dataTipoGasto[1]);// [indice columna]  de la fila seleccionada xxxx

    VarJsTipoGasto = dataTipoGasto[1]; // variable elemento, variable data, índice xxxx

    CRUDTipoGasto = "D";
});

//pintar modal
function FnJsCTipoGasto() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoTipoGasto').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorTipoGasto").removeAttr("class");//quitar el atributo class
    $("#DivModBorTipoGasto").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaTipoGasto").removeAttr("class");//quitar el atributo class
    $("#DivModHeaTipoGasto").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitTipoGasto').text('Nuevo Tipo de gasto');//tttt
    //cambiar el color icono btn
    $("#btnNueTipoGasto").removeAttr("class");//quitar el atributo class
    $("#btnNueTipoGasto").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNueTipoGasto i").removeAttr("class");
    $("#btnNueTipoGasto i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoTipoGasto").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCTipoGasto[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUTipoGasto() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoTipoGasto').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorTipoGasto").removeAttr("class");//quitar el atributo class
    $("#DivModBorTipoGasto").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaTipoGasto").removeAttr("class");//quitar el atributo class
    $("#DivModHeaTipoGasto").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitTipoGasto').text('Editar Tipo de gasto');//tttt
    //cambiar el color icono btn
    $("#btnNueTipoGasto").removeAttr("class");//quitar el atributo class
    $("#btnNueTipoGasto").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNueTipoGasto i").removeAttr("class");
    $("#btnNueTipoGasto i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoTipoGasto").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCTipoGasto[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDTipoGasto() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoTipoGasto').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorTipoGasto").removeAttr("class");//quitar el atributo class
    $("#DivModBorTipoGasto").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaTipoGasto").removeAttr("class");//quitar el atributo class
    $("#DivModHeaTipoGasto").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitTipoGasto').text('Eliminar Tipo de gasto');//tttt
    //cambiar el color icono btn
    $("#btnNueTipoGasto").removeAttr("class");//quitar el atributo class
    $("#btnNueTipoGasto").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNueTipoGasto i").removeAttr("class");
    $("#btnNueTipoGasto i").attr("class", "fa fa-trash fa-2x");//ícono
    //bloquear elementos
    $("#txtNuevoTipoGasto").attr('disabled', true); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCTipoGasto[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockTipoGasto() {// nombre función xxxx

    if (ETipoGasto == true) {// variables xxxx
        $("#btnNueTipoGasto").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNueTipoGasto").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter
    }
    else if (ETipoGasto == false) {// variables xxxx
        $("#btnNueTipoGasto").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNueTipoGasto").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter
    }
}

//guardar CUD
$('#btnNueTipoGasto').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formTipoGasto.checkValidity()) {
        switch (CRUDTipoGasto) { // variable crud xxxx
            case "C":
                FnJsAjaxCTipoGasto(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUTipoGasto();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDTipoGasto();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Tipo de gasto");/////tttt
        }
    }
    console.log(formTipoGasto.checkValidity());
});

//ajax CUD
function FnJsAjaxCTipoGasto() {
    $.ajax({
        url: "/modulo1/VstGastos.aspx/FnCTipoGastoV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            TipoGasto: VarJsTipoGasto,

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Tipo de gasto Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDTipoGasto = "error"
                console.log("No se pudo agregar Tipo de indentificación");//
            }
            FnAlertaTipoGasto(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUTipoGasto() {
    $.ajax({
        url: "/modulo1/VstGastos.aspx/FnUTipoGastoV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdTipoGasto: VarJsTipoGastoId,
            TipoGasto: VarJsTipoGasto,


        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Tipo de gasto Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDTipoGasto = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaTipoGasto();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDTipoGasto() {
    $.ajax({
        url: "/modulo1/VstGastos.aspx/FnDTipoGastoV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdTipoGasto: VarJsTipoGastoId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Tipo de gasto Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDTipoGasto = "error"
                console.log("No se pudo Eliminar Tipo de gasto");////tttt
            }
            FnAlertaTipoGasto(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxETipoGasto() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo1/VstGastos.aspx/FnETipoGastoV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdTipoGasto: VarJsTipoGastoId,
            TipoGasto: VarJsTipoGasto
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                ETipoGasto = true; // variable existe xxxx
                $('#lblexistenuevoTipoGasto').text("Existe Tipo de gasto");// id etiqueta texto etiqueta //tttt
                FnJsBlockTipoGasto();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                ETipoGasto = false;// variable existe xxxx
                $('#lblexistenuevoTipoGasto').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockTipoGasto(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExisteTipoGasto() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoTipoGasto').val().length > 3) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoTipoGasto').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsTipoGasto = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteTipoGasto()) {//nombre función verificar existe xxxx
        FnJsAjaxETipoGasto(); // llamar todos los existes xxxx

    }
});


function FnAlertaTipoGasto() {//nombre de la función xxxx

    switch (CRUDTipoGasto) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertTipoGasto = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertTipoGasto = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertTipoGasto = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertTipoGasto = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertTipoGasto = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertTipoGasto = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertTipoGasto = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertTipoGasto = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Tipo de gasto Alert")//tttt
    }
    //alerta
    $('#alertaGastos .modal-content').addClass(VarJsColorAlertTipoGasto);//variable de color alerta xxxx
    $('#alertaGastos h5').text(VarJsTextoAlertTipoGasto);//variable de texto alerta xxxx
    $('#alertaGastos').modal('show');
    setTimeout(function () {
        $('#alertaGastos').modal('hide');
        $('#alertaGastos .modal-content').removeClass(VarJsColorAlertTipoGasto);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblTipoGasto.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxRTipoGasto();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNTipoGasto").modal("toggle");//nombre modal xxxx
}