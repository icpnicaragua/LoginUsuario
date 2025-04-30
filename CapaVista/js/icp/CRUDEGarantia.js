/*variable de tablas*/
var tablaGarantia;/*tabla mpodulo*/
var ModCGarantia = $('#modalNGarantia'); // modal 
//campos de tablas
var VarJsGarantiaId = 0;
var VarJsGarantia = "";


//igual para todos
var formGarantia = document.querySelector('#form1');

//variables crud
CRUDGarantia = "";
//variables alertas
var VarJsColorAlertGarantia = "";
var VarJsTextoAlertGarantia = "";
//variables existe
var EGarantia = true;


$('#lbMostrarGarantia').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    FnJsAjaxRGarantia(); //llama al ajax xxxx
});

function FnJsAjaxRGarantia() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo10/VstProductos.aspx/FnRGarantiaV", // nombre de página y nombre de función xxxx
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowGarantia(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowGarantia(data) {//3 llenar la tabla xxxx

    $('#tblGarantia').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaGarantia = $("#tblGarantia").DataTable({// variable nombre tabla xxxx

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
                    id: 'colGarantia'//se añade el id para ocultar xxxx
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
                filename: 'Días de garantía' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Días de garantía', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Días de garantía' //tttt
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
                filename: 'Días de garantía' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
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
    tablaGarantia.buttons().container().addClass('form-inline');///variable xxxx

    for (var contGarantia = 0; contGarantia < data.length; contGarantia++) { // declarar variable de recorrido de arreglo data xxxx
        tablaGarantia.row.add([//sensitivecase:
            data[contGarantia].IdGarantia,//campos
            data[contGarantia].Garantia,
            '<button value="editar" href="#modalNGarantia" data-toggle="modal" title="editar" class="btn btn-warning  btn-editGarantia"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNGarantia" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteGarantia"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNGarantia').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCGarantia(); // nombre función xxxx
    EGarantia = true; // variable xxxx

    FnJsBlockGarantia(); // nombre función xxxx

    CRUDGarantia = "C"; // nombre variable xxxx

    //campos xxxx
    VarJsGarantiaId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsGarantia = ""; // cada campo tiene una variable, inicializar xxxx

});
$(document).on('click', '.btn-editGarantia', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUGarantia();//nombre de función xxxx
    var dataGarantia = tablaGarantia.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsGarantiaId = dataGarantia[0]; //id de la fila seleccionada
    $('#txtNuevoGarantia').val(dataGarantia[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsGarantia = dataGarantia[1]; // variable elemento, variable data, índice xxxx

    CRUDGarantia = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteGarantia', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDGarantia();//nombre de función xxxx
    EGarantia = false; // variable de existe xxxx


    FnJsBlockGarantia();//función bloquear xxxx
    var dataGarantia = tablaGarantia.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsGarantiaId = dataGarantia[0]; //id de la fila seleccionada
    $('#txtNuevoGarantia').val(dataGarantia[1]);// [indice columna]  de la fila seleccionada xxxx

    VarJsGarantia = dataGarantia[1]; // variable elemento, variable data, índice xxxx

    CRUDGarantia = "D";
});

//pintar modal
function FnJsCGarantia() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoGarantia').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorGarantia").removeAttr("class");//quitar el atributo class
    $("#DivModBorGarantia").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaGarantia").removeAttr("class");//quitar el atributo class
    $("#DivModHeaGarantia").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitGarantia').text('Nuevo Días de garantía');//tttt
    //cambiar el color icono btn
    $("#btnNueGarantia").removeAttr("class");//quitar el atributo class
    $("#btnNueGarantia").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNueGarantia i").removeAttr("class");
    $("#btnNueGarantia i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoGarantia").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCGarantia[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUGarantia() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoGarantia').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorGarantia").removeAttr("class");//quitar el atributo class
    $("#DivModBorGarantia").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaGarantia").removeAttr("class");//quitar el atributo class
    $("#DivModHeaGarantia").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitGarantia').text('Editar Días de garantía');//tttt
    //cambiar el color icono btn
    $("#btnNueGarantia").removeAttr("class");//quitar el atributo class
    $("#btnNueGarantia").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNueGarantia i").removeAttr("class");
    $("#btnNueGarantia i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoGarantia").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCGarantia[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDGarantia() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoGarantia').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorGarantia").removeAttr("class");//quitar el atributo class
    $("#DivModBorGarantia").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaGarantia").removeAttr("class");//quitar el atributo class
    $("#DivModHeaGarantia").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitGarantia').text('Eliminar Días de garantía');//tttt
    //cambiar el color icono btn
    $("#btnNueGarantia").removeAttr("class");//quitar el atributo class
    $("#btnNueGarantia").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNueGarantia i").removeAttr("class");
    $("#btnNueGarantia i").attr("class", "fa fa-trash fa-2x");//ícono
    //bloquear elementos
    $("#txtNuevoGarantia").attr('disabled', true); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCGarantia[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockGarantia() {// nombre función xxxx

    if (EGarantia == true) {// variables xxxx
        $("#btnNueGarantia").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNueGarantia").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter
    }
    else if (EGarantia == false) {// variables xxxx
        $("#btnNueGarantia").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNueGarantia").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter
    }
}

//guardar CUD
$('#btnNueGarantia').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formGarantia.checkValidity()) {
        switch (CRUDGarantia) { // variable crud xxxx
            case "C":
                FnJsAjaxCGarantia(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUGarantia();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDGarantia();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Días de garantía");/////tttt
        }
    }
    console.log(formGarantia.checkValidity());
});

//ajax CUD
function FnJsAjaxCGarantia() {
    $.ajax({
        url: "/modulo10/VstProductos.aspx/FnCGarantiaV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            Garantia: VarJsGarantia,

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Días de garantía Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDGarantia = "error"
                console.log("No se pudo agregar Tipo de Garantia");//
            }
            FnAlertaGarantia(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUGarantia() {
    $.ajax({
        url: "/modulo10/VstProductos.aspx/FnUGarantiaV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdGarantia: VarJsGarantiaId,
            Garantia: VarJsGarantia,


        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Días de garantía Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDGarantia = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaGarantia();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDGarantia() {
    $.ajax({
        url: "/modulo10/VstProductos.aspx/FnDGarantiaV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdGarantia: VarJsGarantiaId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Días de garantía Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDGarantia = "error"
                console.log("No se pudo Eliminar Días de garantía");////tttt
            }
            FnAlertaGarantia(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxEGarantia() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo10/VstProductos.aspx/FnEGarantiaV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdGarantia: VarJsGarantiaId,
            Garantia: VarJsGarantia
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                EGarantia = true; // variable existe xxxx
                $('#lblexistenuevoGarantia').text("Existe Días de garantía");// id etiqueta texto etiqueta //tttt
                FnJsBlockGarantia();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                EGarantia = false;// variable existe xxxx
                $('#lblexistenuevoGarantia').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockGarantia(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExisteGarantia() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoGarantia').val() >= 1) { // id de objetos de Garantias, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoGarantia').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsGarantia = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteGarantia()) {//nombre función verificar existe xxxx
        FnJsAjaxEGarantia(); // llamar todos los existes xxxx

    }
});


function FnAlertaGarantia() {//nombre de la función xxxx

    switch (CRUDGarantia) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertGarantia = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertGarantia = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertGarantia = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertGarantia = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertGarantia = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertGarantia = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertGarantia = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertGarantia = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Días de garantía Alert")//tttt
    }
    //alerta
    $('#alerta .modal-content').addClass(VarJsColorAlertGarantia);//variable de color alerta xxxx
    $('#alerta h5').text(VarJsTextoAlertGarantia);//variable de texto alerta xxxx
    $('#alerta').modal('show');
    setTimeout(function () {
        $('#alerta').modal('hide');
        $('#alerta .modal-content').removeClass(VarJsColorAlertGarantia);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblGarantia.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxRGarantia();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNGarantia").modal("toggle");//nombre modal xxxx
}