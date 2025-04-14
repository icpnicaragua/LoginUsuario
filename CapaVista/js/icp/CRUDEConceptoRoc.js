/*variable de tablas*/
var tablaConceptoRoc;/*tabla mpodulo*/
var ModCConceptoRoc = $('#modalNConceptoRoc'); // modal 
//campos de tablas
var VarJsConceptoRocId = 0;
var VarJsConceptoRoc = "";


//igual para todos
var formConceptoRoc = document.querySelector('#form1');

//variables crud
CRUDConceptoRoc = "";
//variables alertas
var VarJsColorAlertConceptoRoc = "";
var VarJsTextoAlertConceptoRoc = "";
//variables existe
var EConceptoRoc = true;


$('#lbMostrarConceptoRoc').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    FnJsAjaxRConceptoRoc(); //llama al ajax xxxx
});

function FnJsAjaxRConceptoRoc() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo1/VstRoc.aspx/FnRConceptoRocV", // nombre de página y nombre de función xxxx
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowConceptoRoc(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowConceptoRoc(data) {//3 llenar la tabla xxxx

    $('#tblConceptoRoc').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaConceptoRoc = $("#tblConceptoRoc").DataTable({// variable nombre tabla xxxx

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
                    id: 'colConceptoRoc'//se añade el id para ocultar xxxx
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
                filename: 'Concepto ROC' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Concepto ROC', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Concepto ROC' //tttt
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
                filename: 'Concepto ROC' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
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
    tablaConceptoRoc.buttons().container().addClass('form-inline');///variable xxxx

    for (var contConceptoRoc = 0; contConceptoRoc < data.length; contConceptoRoc++) { // declarar variable de recorrido de arreglo data xxxx
        tablaConceptoRoc.row.add([//sensitivecase:
            data[contConceptoRoc].IdConceptoRoc,//campos
            data[contConceptoRoc].ConceptoRoc,
            '<button value="editar" href="#modalNConceptoRoc" data-toggle="modal" title="editar" class="btn btn-warning  btn-editConceptoRoc"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNConceptoRoc" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteConceptoRoc"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNConceptoRoc').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCConceptoRoc(); // nombre función xxxx
    EConceptoRoc = true; // variable xxxx

    FnJsBlockConceptoRoc(); // nombre función xxxx

    CRUDConceptoRoc = "C"; // nombre variable xxxx

    //campos xxxx
    VarJsConceptoRocId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsConceptoRoc = ""; // cada campo tiene una variable, inicializar xxxx

});
$(document).on('click', '.btn-editConceptoRoc', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUConceptoRoc();//nombre de función xxxx
    var dataConceptoRoc = tablaConceptoRoc.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsConceptoRocId = dataConceptoRoc[0]; //id de la fila seleccionada
    $('#txtNuevoConceptoRoc').val(dataConceptoRoc[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsConceptoRoc = dataConceptoRoc[1]; // variable elemento, variable data, índice xxxx

    CRUDConceptoRoc = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteConceptoRoc', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDConceptoRoc();//nombre de función xxxx
    EConceptoRoc = false; // variable de existe xxxx


    FnJsBlockConceptoRoc();//función bloquear xxxx
    var dataConceptoRoc = tablaConceptoRoc.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsConceptoRocId = dataConceptoRoc[0]; //id de la fila seleccionada
    $('#txtNuevoConceptoRoc').val(dataConceptoRoc[1]);// [indice columna]  de la fila seleccionada xxxx

    VarJsConceptoRoc = dataConceptoRoc[1]; // variable elemento, variable data, índice xxxx

    CRUDConceptoRoc = "D";
});

//pintar modal
function FnJsCConceptoRoc() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoConceptoRoc').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorConceptoRoc").removeAttr("class");//quitar el atributo class
    $("#DivModBorConceptoRoc").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaConceptoRoc").removeAttr("class");//quitar el atributo class
    $("#DivModHeaConceptoRoc").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitConceptoRoc').text('Nuevo Concepto ROC');//tttt
    //cambiar el color icono btn
    $("#btnNueConceptoRoc").removeAttr("class");//quitar el atributo class
    $("#btnNueConceptoRoc").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNueConceptoRoc i").removeAttr("class");
    $("#btnNueConceptoRoc i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoConceptoRoc").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCConceptoRoc[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUConceptoRoc() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoConceptoRoc').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorConceptoRoc").removeAttr("class");//quitar el atributo class
    $("#DivModBorConceptoRoc").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaConceptoRoc").removeAttr("class");//quitar el atributo class
    $("#DivModHeaConceptoRoc").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitConceptoRoc').text('Editar Concepto ROC');//tttt
    //cambiar el color icono btn
    $("#btnNueConceptoRoc").removeAttr("class");//quitar el atributo class
    $("#btnNueConceptoRoc").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNueConceptoRoc i").removeAttr("class");
    $("#btnNueConceptoRoc i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoConceptoRoc").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCConceptoRoc[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDConceptoRoc() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoConceptoRoc').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorConceptoRoc").removeAttr("class");//quitar el atributo class
    $("#DivModBorConceptoRoc").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaConceptoRoc").removeAttr("class");//quitar el atributo class
    $("#DivModHeaConceptoRoc").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitConceptoRoc').text('Eliminar Concepto ROC');//tttt
    //cambiar el color icono btn
    $("#btnNueConceptoRoc").removeAttr("class");//quitar el atributo class
    $("#btnNueConceptoRoc").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNueConceptoRoc i").removeAttr("class");
    $("#btnNueConceptoRoc i").attr("class", "fa fa-trash fa-2x");//ícono
    //bloquear elementos
    $("#txtNuevoConceptoRoc").attr('disabled', true); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCConceptoRoc[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockConceptoRoc() {// nombre función xxxx

    if (EConceptoRoc == true) {// variables xxxx
        $("#btnNueConceptoRoc").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNueConceptoRoc").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter
    }
    else if (EConceptoRoc == false) {// variables xxxx
        $("#btnNueConceptoRoc").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNueConceptoRoc").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter
    }
}

//guardar CUD
$('#btnNueConceptoRoc').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formConceptoRoc.checkValidity()) {
        switch (CRUDConceptoRoc) { // variable crud xxxx
            case "C":
                FnJsAjaxCConceptoRoc(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUConceptoRoc();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDConceptoRoc();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Concepto ROC");/////tttt
        }
    }
    console.log(formConceptoRoc.checkValidity());
});

//ajax CUD
function FnJsAjaxCConceptoRoc() {
    $.ajax({
        url: "/modulo1/VstRoc.aspx/FnCConceptoRocV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            ConceptoRoc: VarJsConceptoRoc,

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Concepto ROC Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDConceptoRoc = "error"
                console.log("No se pudo agregar Concepto ROC");//
            }
            FnAlertaConceptoRoc(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUConceptoRoc() {
    $.ajax({
        url: "/modulo1/VstRoc.aspx/FnUConceptoRocV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdConceptoRoc: VarJsConceptoRocId,
            ConceptoRoc: VarJsConceptoRoc,


        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Concepto ROC Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDConceptoRoc = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaConceptoRoc();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDConceptoRoc() {
    $.ajax({
        url: "/modulo1/VstRoc.aspx/FnDConceptoRocV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdConceptoRoc: VarJsConceptoRocId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Concepto ROC Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDConceptoRoc = "error"
                console.log("No se pudo Eliminar Concepto ROC");////tttt
            }
            FnAlertaConceptoRoc(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxEConceptoRoc() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo1/VstRoc.aspx/FnEConceptoRocV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdConceptoRoc: VarJsConceptoRocId,
            ConceptoRoc: VarJsConceptoRoc
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                EConceptoRoc = true; // variable existe xxxx
                $('#lblexistenuevoConceptoRoc').text("Existe Concepto ROC");// id etiqueta texto etiqueta //tttt
                FnJsBlockConceptoRoc();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                EConceptoRoc = false;// variable existe xxxx
                $('#lblexistenuevoConceptoRoc').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockConceptoRoc(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExisteConceptoRoc() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoConceptoRoc').val().length > 3) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoConceptoRoc').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsConceptoRoc = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteConceptoRoc()) {//nombre función verificar existe xxxx
        FnJsAjaxEConceptoRoc(); // llamar todos los existes xxxx

    }
});


function FnAlertaConceptoRoc() {//nombre de la función xxxx

    switch (CRUDConceptoRoc) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertConceptoRoc = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertConceptoRoc = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertConceptoRoc = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertConceptoRoc = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertConceptoRoc = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertConceptoRoc = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertConceptoRoc = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertConceptoRoc = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Concepto ROC Alert")//tttt
    }
    //alerta
    $('#alertaRoc .modal-content').addClass(VarJsColorAlertConceptoRoc);//variable de color alerta xxxx
    $('#alertaRoc h5').text(VarJsTextoAlertConceptoRoc);//variable de texto alerta xxxx
    $('#alertaRoc').modal('show');
    setTimeout(function () {
        $('#alertaRoc').modal('hide');
        $('#alertaRoc .modal-content').removeClass(VarJsColorAlertConceptoRoc);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblConceptoRoc.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxRConceptoRoc();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNConceptoRoc").modal("toggle");//nombre modal xxxx
}