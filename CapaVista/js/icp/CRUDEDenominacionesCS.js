/*variable de tablas*/
var tablaDenominacionesCS;/*tabla mpodulo*/
var ModCDenominacionesCS = $('#modalNDenominacionesCS'); // modal 
//campos de tablas
var VarJsDenominacionesCSId = 0;
var VarJsDenominacionesCS = "";
var VarJsValor = "";


//igual para todos
var formDenominacionesCS = document.querySelector('#form1');

//variables crud
CRUDDenominacionesCS = "";
//variables alertas
var VarJsColorAlertDenominacionesCS = "";
var VarJsTextoAlertDenominacionesCS = "";
//variables existe
var EDenominacionesCS = true;


$('#lbMostrarDenominacionesCS').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    FnJsAjaxRDenominacionesCS(); //llama al ajax xxxx
});

function FnJsAjaxRDenominacionesCS() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo1/VstCaja.aspx/FnRDenominacionesCSV", // nombre de página y nombre de función xxxx
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowDenominacionesCS(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowDenominacionesCS(data) {//3 llenar la tabla xxxx

    $('#tblDenominacionesCS').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaDenominacionesCS = $("#tblDenominacionesCS").DataTable({// variable nombre tabla xxxx

        "retrieve": true,
        dom: 'Bfrtip',

        "order": [1, 'desc'],
        "columnDefs": [
            { "targets": 3, "searchable": false },
            { "orderable": false, "targets": 2 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colDenominacionesCS'//se añade el id para ocultar xxxx
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
                filename: 'Denominaciones Córdobas' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Denominaciones Córdobas', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Denominaciones Córdobas' //tttt
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
                filename: 'Denominaciones Córdobas' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
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
    tablaDenominacionesCS.buttons().container().addClass('form-inline');///variable xxxx

    for (var contDenominacionesCS = 0; contDenominacionesCS < data.length; contDenominacionesCS++) { // declarar variable de recorrido de arreglo data xxxx
        tablaDenominacionesCS.row.add([//sensitivecase:
            data[contDenominacionesCS].IdDenominacion,//campos
            data[contDenominacionesCS].Nombre,
            data[contDenominacionesCS].Cantidad,
            '<button value="editar" href="#modalNDenominacionesCS" data-toggle="modal" title="editar" class="btn btn-warning  btn-editDenominacionesCS"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNDenominacionesCS" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteDenominacionesCS"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNDenominacionesCS').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCDenominacionesCS(); // nombre función xxxx
    EDenominacionesCS = true; // variable xxxx

    FnJsBlockDenominacionesCS(); // nombre función xxxx

    CRUDDenominacionesCS = "C"; // nombre variable xxxx

    //campos xxxx
    VarJsDenominacionesCSId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsDenominacionesCS = ""; // cada campo tiene una variable, inicializar xxxx
    VarJsValor = "";

});
$(document).on('click', '.btn-editDenominacionesCS', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUDenominacionesCS();//nombre de función xxxx
    var dataDenominacionesCS = tablaDenominacionesCS.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsDenominacionesCSId = dataDenominacionesCS[0]; //id de la fila seleccionada
    $('#txtNuevoDenominacionesCS').val(dataDenominacionesCS[1]);// [indice columna]  de la fila seleccionada xxxx
    $('#txtNuevoValor').val(dataDenominacionesCS[2]);// [indice columna]  de la fila seleccionada xxxx
    
    VarJsDenominacionesCS = dataDenominacionesCS[1]; // variable elemento, variable data, índice xxxx
    VarJsValor = dataDenominacionesCS[2];
    CRUDDenominacionesCS = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteDenominacionesCS', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDDenominacionesCS();//nombre de función xxxx
    EDenominacionesCS = false; // variable de existe xxxx
    FnJsBlockDenominacionesCS();//función bloquear xxxx
    var dataDenominacionesCS = tablaDenominacionesCS.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsDenominacionesCSId = dataDenominacionesCS[0]; //id de la fila seleccionada
    $('#txtNuevoDenominacionesCS').val(dataDenominacionesCS[1]);// [indice columna]  de la fila seleccionada xxxx
    $('#txtNuevoValor').val(dataDenominacionesCS[2]);// [indice columna]  de la fila seleccionada xxxx

    VarJsDenominacionesCS = dataDenominacionesCS[1]; // variable elemento, variable data, índice xxxx
    VarJsValor = dataDenominacionesCS[2];

    CRUDDenominacionesCS = "D";
});

//pintar modal
function FnJsCDenominacionesCS() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoDenominacionesCS').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorDenominacionesCS").removeAttr("class");//quitar el atributo class
    $("#DivModBorDenominacionesCS").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaDenominacionesCS").removeAttr("class");//quitar el atributo class
    $("#DivModHeaDenominacionesCS").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitDenominacionesCS').text('Nuevo Denominaciones Córdobas');//tttt
    //cambiar el color icono btn
    $("#btnNueDenominacionesCS").removeAttr("class");//quitar el atributo class
    $("#btnNueDenominacionesCS").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNueDenominacionesCS i").removeAttr("class");
    $("#btnNueDenominacionesCS i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoDenominacionesCS").attr('disabled', false); //variables de los elementos del modal xxxx
    $("#txtNuevoValor").attr('disabled', false); //variables de los elementos del modal xxxx

    

    //vaciar elementos text de todo el modal
    $('#' + ModCDenominacionesCS[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUDenominacionesCS() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoDenominacionesCS').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorDenominacionesCS").removeAttr("class");//quitar el atributo class
    $("#DivModBorDenominacionesCS").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaDenominacionesCS").removeAttr("class");//quitar el atributo class
    $("#DivModHeaDenominacionesCS").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitDenominacionesCS').text('Editar Denominaciones Córdobas');//tttt
    //cambiar el color icono btn
    $("#btnNueDenominacionesCS").removeAttr("class");//quitar el atributo class
    $("#btnNueDenominacionesCS").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNueDenominacionesCS i").removeAttr("class");
    $("#btnNueDenominacionesCS i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoDenominacionesCS").attr('disabled', false); //variables de los elementos del modal xxxx
    $("#txtNuevoValor").attr('disabled', false); //variables de los elementos del modal xxxx
    //vaciar elementos text de todo el modal
    $('#' + ModCDenominacionesCS[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDDenominacionesCS() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoDenominacionesCS').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorDenominacionesCS").removeAttr("class");//quitar el atributo class
    $("#DivModBorDenominacionesCS").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaDenominacionesCS").removeAttr("class");//quitar el atributo class
    $("#DivModHeaDenominacionesCS").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitDenominacionesCS').text('Eliminar Denominaciones Córdobas');//tttt
    //cambiar el color icono btn
    $("#btnNueDenominacionesCS").removeAttr("class");//quitar el atributo class
    $("#btnNueDenominacionesCS").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNueDenominacionesCS i").removeAttr("class");
    $("#btnNueDenominacionesCS i").attr("class", "fa fa-trash fa-2x");//ícono
    //bloquear elementos
    $("#txtNuevoDenominacionesCS").attr('disabled', true); //variables de los elementos del modal xxxx
    $("#txtNuevoValor").attr('disabled', true); //variables de los elementos del modal xxxx
    //vaciar elementos text de todo el modal
    $('#' + ModCDenominacionesCS[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockDenominacionesCS() {// nombre función xxxx

    if (EDenominacionesCS == true) {// variables xxxx
        $("#btnNueDenominacionesCS").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNueDenominacionesCS").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter
    }
    else if (EDenominacionesCS == false) {// variables xxxx
        $("#btnNueDenominacionesCS").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNueDenominacionesCS").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter
    }
}

//guardar CUD
$('#btnNueDenominacionesCS').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formDenominacionesCS.checkValidity()) {
        switch (CRUDDenominacionesCS) { // variable crud xxxx
            case "C":
                FnJsAjaxCDenominacionesCS(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUDenominacionesCS();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDDenominacionesCS();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Denominaciones Córdobas");/////tttt
        }
    }
    console.log(formDenominacionesCS.checkValidity());
});

//ajax CUD
function FnJsAjaxCDenominacionesCS() {
    $.ajax({
        url: "/modulo1/VstCaja.aspx/FnCDenominacionesCSV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            DenominacionesCS: VarJsDenominacionesCS,
            Cantidad: VarJsValor

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Denominaciones Córdobas Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDDenominacionesCS = "error"
                console.log("No se pudo agregar Tipo de indentificación");//
            }
            FnAlertaDenominacionesCS(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUDenominacionesCS() {
    $.ajax({
        url: "/modulo1/VstCaja.aspx/FnUDenominacionesCSV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdDenominacionesCS: VarJsDenominacionesCSId,
            DenominacionesCS: VarJsDenominacionesCS,
            Cantidad: VarJsValor


        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Denominaciones Córdobas Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDDenominacionesCS = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaDenominacionesCS();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDDenominacionesCS() {
    $.ajax({
        url: "/modulo1/VstCaja.aspx/FnDDenominacionesCSV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdDenominacionesCS: VarJsDenominacionesCSId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Denominaciones Córdobas Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDDenominacionesCS = "error"
                console.log("No se pudo Eliminar Denominaciones Córdobas");////tttt
            }
            FnAlertaDenominacionesCS(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxEDenominacionesCS() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo1/VstCaja.aspx/FnEDenominacionesCSV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdDenominacionesCS: VarJsDenominacionesCSId,
            DenominacionesCS: VarJsDenominacionesCS,
            Cantidad: VarJsValor
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                EDenominacionesCS = true; // variable existe xxxx
                $('#lblexistenuevoDenominacionesCS').text("Existe Denominaciones Córdobas");// id etiqueta texto etiqueta //tttt
                FnJsBlockDenominacionesCS();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                EDenominacionesCS = false;// variable existe xxxx
                $('#lblexistenuevoDenominacionesCS').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockDenominacionesCS(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExisteDenominacionesCS() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoDenominacionesCS').val().length > 0 && $('#txtNuevoValor').val().length > 0) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoDenominacionesCS').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsDenominacionesCS = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteDenominacionesCS()) {//nombre función verificar existe xxxx
        FnJsAjaxEDenominacionesCS(); // llamar todos los existes xxxx

    }
});


$('#txtNuevoValor').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsValor = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteDenominacionesCS()) {//nombre función verificar existe xxxx
        FnJsAjaxEDenominacionesCS(); // llamar todos los existes xxxx

    }
});


function FnAlertaDenominacionesCS() {//nombre de la función xxxx

    switch (CRUDDenominacionesCS) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertDenominacionesCS = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertDenominacionesCS = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertDenominacionesCS = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertDenominacionesCS = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertDenominacionesCS = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertDenominacionesCS = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertDenominacionesCS = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertDenominacionesCS = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Denominaciones Córdobas Alert")//tttt
    }
    //alerta
    $('#alertaEmpleados .modal-content').addClass(VarJsColorAlertDenominacionesCS);//variable de color alerta xxxx
    $('#alertaEmpleados h5').text(VarJsTextoAlertDenominacionesCS);//variable de texto alerta xxxx
    $('#alertaEmpleados').modal('show');
    setTimeout(function () {
        $('#alertaEmpleados').modal('hide');
        $('#alertaEmpleados .modal-content').removeClass(VarJsColorAlertDenominacionesCS);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblDenominacionesCS.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxRDenominacionesCS();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNDenominacionesCS").modal("toggle");//nombre modal xxxx
}