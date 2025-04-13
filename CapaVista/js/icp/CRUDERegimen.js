/*variable de tablas*/
var tablaRegimen;/*tabla mpodulo*/
var ModCRegimen = $('#modalNRegimen'); // modal 
//campos de tablas
var VarJsRegimenId = 0;
var VarJsRegimen = "";


//igual para todos
var formRegimen = document.querySelector('#form1');

//variables crud
CRUDRegimen = "";
//variables alertas
var VarJsColorAlertRegimen = "";
var VarJsTextoAlertRegimen = "";
//variables existe
var ERegimen = true;


$('#lbMostrarRegimen').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    FnJsAjaxRRegimen(); //llama al ajax xxxx
});

function FnJsAjaxRRegimen() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo2/VstProveedor.aspx/FnRRegimenV", // nombre de página y nombre de función xxxx
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowRegimen(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowRegimen(data) {//3 llenar la tabla xxxx

    $('#tblRegimen').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaRegimen = $("#tblRegimen").DataTable({// variable nombre tabla xxxx

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
                    id: 'colRegimen'//se añade el id para ocultar xxxx
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
                filename: 'Regimen' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Regimen', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Regimen' //tttt
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
                filename: 'Regimen' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
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
    tablaRegimen.buttons().container().addClass('form-inline');///variable xxxx

    for (var contRegimen = 0; contRegimen < data.length; contRegimen++) { // declarar variable de recorrido de arreglo data xxxx
        tablaRegimen.row.add([//sensitivecase:
            data[contRegimen].IdRegimen,//campos
            data[contRegimen].Regimen,
            '<button value="editar" href="#modalNRegimen" data-toggle="modal" title="editar" class="btn btn-warning  btn-editRegimen"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNRegimen" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteRegimen"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNRegimen').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCRegimen(); // nombre función xxxx
    ERegimen = true; // variable xxxx

    FnJsBlockRegimen(); // nombre función xxxx

    CRUDRegimen = "C"; // nombre variable xxxx

    //campos xxxx
    VarJsRegimenId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsRegimen = ""; // cada campo tiene una variable, inicializar xxxx

});
$(document).on('click', '.btn-editRegimen', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsURegimen();//nombre de función xxxx
    var dataRegimen = tablaRegimen.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsRegimenId = dataRegimen[0]; //id de la fila seleccionada
    $('#txtNuevoRegimen').val(dataRegimen[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsRegimen = dataRegimen[1]; // variable elemento, variable data, índice xxxx

    CRUDRegimen = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteRegimen', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDRegimen();//nombre de función xxxx
    ERegimen = false; // variable de existe xxxx


    FnJsBlockRegimen();//función bloquear xxxx
    var dataRegimen = tablaRegimen.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsRegimenId = dataRegimen[0]; //id de la fila seleccionada
    $('#txtNuevoRegimen').val(dataRegimen[1]);// [indice columna]  de la fila seleccionada xxxx

    VarJsRegimen = dataRegimen[1]; // variable elemento, variable data, índice xxxx

    CRUDRegimen = "D";
});

//pintar modal
function FnJsCRegimen() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoRegimen').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorRegimen").removeAttr("class");//quitar el atributo class
    $("#DivModBorRegimen").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaRegimen").removeAttr("class");//quitar el atributo class
    $("#DivModHeaRegimen").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitRegimen').text('Nuevo Regimen');//tttt
    //cambiar el color icono btn
    $("#btnNueRegimen").removeAttr("class");//quitar el atributo class
    $("#btnNueRegimen").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNueRegimen i").removeAttr("class");
    $("#btnNueRegimen i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoRegimen").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCRegimen[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsURegimen() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoRegimen').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorRegimen").removeAttr("class");//quitar el atributo class
    $("#DivModBorRegimen").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaRegimen").removeAttr("class");//quitar el atributo class
    $("#DivModHeaRegimen").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitRegimen').text('Editar Regimen');//tttt
    //cambiar el color icono btn
    $("#btnNueRegimen").removeAttr("class");//quitar el atributo class
    $("#btnNueRegimen").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNueRegimen i").removeAttr("class");
    $("#btnNueRegimen i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoRegimen").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCRegimen[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDRegimen() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoRegimen').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorRegimen").removeAttr("class");//quitar el atributo class
    $("#DivModBorRegimen").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaRegimen").removeAttr("class");//quitar el atributo class
    $("#DivModHeaRegimen").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitRegimen').text('Eliminar Regimen');//tttt
    //cambiar el color icono btn
    $("#btnNueRegimen").removeAttr("class");//quitar el atributo class
    $("#btnNueRegimen").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNueRegimen i").removeAttr("class");
    $("#btnNueRegimen i").attr("class", "fa fa-trash fa-2x");//ícono
    //bloquear elementos
    $("#txtNuevoRegimen").attr('disabled', true); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCRegimen[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockRegimen() {// nombre función xxxx

    if (ERegimen == true) {// variables xxxx
        $("#btnNueRegimen").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNueRegimen").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter
    }
    else if (ERegimen == false) {// variables xxxx
        $("#btnNueRegimen").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNueRegimen").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter
    }
}

//guardar CUD
$('#btnNueRegimen').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formRegimen.checkValidity()) {
        switch (CRUDRegimen) { // variable crud xxxx
            case "C":
                FnJsAjaxCRegimen(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxURegimen();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDRegimen();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Regimen");/////tttt
        }
    }
});

//ajax CUD
function FnJsAjaxCRegimen() {
    $.ajax({
        url: "/modulo2/VstProveedor.aspx/FnCRegimenV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            Regimen: VarJsRegimen,

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Regimen Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDRegimen = "error"
                console.log("No se pudo agregar Tipo de indentificación");//
            }
            FnAlertaRegimen(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxURegimen() {
    $.ajax({
        url: "/modulo2/VstProveedor.aspx/FnURegimenV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdRegimen: VarJsRegimenId,
            Regimen: VarJsRegimen,


        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Regimen Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDRegimen = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaRegimen();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDRegimen() {
    $.ajax({
        url: "/modulo2/VstProveedor.aspx/FnDRegimenV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdRegimen: VarJsRegimenId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Regimen Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDRegimen = "error"
                console.log("No se pudo Eliminar Regimen");////tttt
            }
            FnAlertaRegimen(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxERegimen() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo2/VstProveedor.aspx/FnERegimenV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdRegimen: VarJsRegimenId,
            Regimen: VarJsRegimen
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                ERegimen = true; // variable existe xxxx
                $('#lblexistenuevoRegimen').text("Existe Regimen");// id etiqueta texto etiqueta //tttt
                FnJsBlockRegimen();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                ERegimen = false;// variable existe xxxx
                $('#lblexistenuevoRegimen').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockRegimen(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExisteRegimen() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoRegimen').val().length > 3) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoRegimen').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsRegimen = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteRegimen()) {//nombre función verificar existe xxxx
        FnJsAjaxERegimen(); // llamar todos los existes xxxx

    }
});


function FnAlertaRegimen() {//nombre de la función xxxx

    switch (CRUDRegimen) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertRegimen = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertRegimen = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertRegimen = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertRegimen = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertRegimen = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertRegimen = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertRegimen = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertRegimen = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Regimen Alert")//tttt
    }
    //alerta
    $('#alerta .modal-content').addClass(VarJsColorAlertRegimen);//variable de color alerta xxxx
    $('#alerta h5').text(VarJsTextoAlertRegimen);//variable de texto alerta xxxx
    $('#alerta').modal('show');
    setTimeout(function () {
        $('#alerta').modal('hide');
        $('#alerta .modal-content').removeClass(VarJsColorAlertRegimen);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblRegimen.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxRRegimen();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNRegimen").modal("toggle");//nombre modal xxxx
}