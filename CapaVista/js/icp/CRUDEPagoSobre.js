/*variable de tablas*/
var tablaPagoSobre;/*tabla mpodulo*/
var ModCPagoSobre = $('#modalNPagoSobre'); // modal 
//campos de tablas
var VarJsPagoSobreId = 0;
var VarJsPagoSobre = "";


//igual para todos
var formPagoSobre = document.querySelector('#form1');

//variables crud
CRUDPagoSobre = "";
//variables alertas
var VarJsColorAlertPagoSobre = "";
var VarJsTextoAlertPagoSobre = "";
//variables existe
var EPagoSobre = true;


$('#lbMostrarPagoSobre').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    FnJsAjaxRPagoSobre(); //llama al ajax xxxx
});

function FnJsAjaxRPagoSobre() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo1/VstRoc.aspx/FnRPagoSobreV", // nombre de página y nombre de función xxxx
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowPagoSobre(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowPagoSobre(data) {//3 llenar la tabla xxxx

    $('#tblPagoSobre').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaPagoSobre = $("#tblPagoSobre").DataTable({// variable nombre tabla xxxx

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
                    id: 'colPagoSobre'//se añade el id para ocultar xxxx
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
                filename: 'Tipo de Pago Sobre' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Tipo de Pago Sobre', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Tipo de Pago Sobre' //tttt
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
                filename: 'Tipo de Pago Sobre' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
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
    tablaPagoSobre.buttons().container().addClass('form-inline');///variable xxxx

    for (var contPagoSobre = 0; contPagoSobre < data.length; contPagoSobre++) { // declarar variable de recorrido de arreglo data xxxx
        tablaPagoSobre.row.add([//sensitivecase:
            data[contPagoSobre].IdPagoSobre,//campos
            data[contPagoSobre].Descripcion,
            '<button value="editar" href="#modalNPagoSobre" data-toggle="modal" title="editar" class="btn btn-warning  btn-editPagoSobre"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNPagoSobre" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deletePagoSobre"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNPagoSobre').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCPagoSobre(); // nombre función xxxx
    EPagoSobre = true; // variable xxxx

    FnJsBlockPagoSobre(); // nombre función xxxx

    CRUDPagoSobre = "C"; // nombre variable xxxx

    //campos xxxx
    VarJsPagoSobreId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsPagoSobre = ""; // cada campo tiene una variable, inicializar xxxx

});
$(document).on('click', '.btn-editPagoSobre', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUPagoSobre();//nombre de función xxxx
    var dataPagoSobre = tablaPagoSobre.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsPagoSobreId = dataPagoSobre[0]; //id de la fila seleccionada
    $('#txtNuevoPagoSobre').val(dataPagoSobre[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsPagoSobre = dataPagoSobre[1]; // variable elemento, variable data, índice xxxx

    CRUDPagoSobre = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deletePagoSobre', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDPagoSobre();//nombre de función xxxx
    EPagoSobre = false; // variable de existe xxxx


    FnJsBlockPagoSobre();//función bloquear xxxx
    var dataPagoSobre = tablaPagoSobre.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsPagoSobreId = dataPagoSobre[0]; //id de la fila seleccionada
    $('#txtNuevoPagoSobre').val(dataPagoSobre[1]);// [indice columna]  de la fila seleccionada xxxx

    VarJsPagoSobre = dataPagoSobre[1]; // variable elemento, variable data, índice xxxx

    CRUDPagoSobre = "D";
});

//pintar modal
function FnJsCPagoSobre() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoPagoSobre').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorPagoSobre").removeAttr("class");//quitar el atributo class
    $("#DivModBorPagoSobre").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaPagoSobre").removeAttr("class");//quitar el atributo class
    $("#DivModHeaPagoSobre").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitPagoSobre').text('Nuevo Tipo de Pago Sobre');//tttt
    //cambiar el color icono btn
    $("#btnNuePagoSobre").removeAttr("class");//quitar el atributo class
    $("#btnNuePagoSobre").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNuePagoSobre i").removeAttr("class");
    $("#btnNuePagoSobre i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoPagoSobre").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCPagoSobre[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUPagoSobre() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoPagoSobre').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorPagoSobre").removeAttr("class");//quitar el atributo class
    $("#DivModBorPagoSobre").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaPagoSobre").removeAttr("class");//quitar el atributo class
    $("#DivModHeaPagoSobre").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitPagoSobre').text('Editar Tipo de Pago Sobre');//tttt
    //cambiar el color icono btn
    $("#btnNuePagoSobre").removeAttr("class");//quitar el atributo class
    $("#btnNuePagoSobre").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNuePagoSobre i").removeAttr("class");
    $("#btnNuePagoSobre i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoPagoSobre").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCPagoSobre[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDPagoSobre() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoPagoSobre').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorPagoSobre").removeAttr("class");//quitar el atributo class
    $("#DivModBorPagoSobre").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaPagoSobre").removeAttr("class");//quitar el atributo class
    $("#DivModHeaPagoSobre").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitPagoSobre').text('Eliminar Tipo de Pago Sobre');//tttt
    //cambiar el color icono btn
    $("#btnNuePagoSobre").removeAttr("class");//quitar el atributo class
    $("#btnNuePagoSobre").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNuePagoSobre i").removeAttr("class");
    $("#btnNuePagoSobre i").attr("class", "fa fa-trash fa-2x");//ícono
    //bloquear elementos
    $("#txtNuevoPagoSobre").attr('disabled', true); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCPagoSobre[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockPagoSobre() {// nombre función xxxx

    if (EPagoSobre == true) {// variables xxxx
        $("#btnNuePagoSobre").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNuePagoSobre").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter
    }
    else if (EPagoSobre == false) {// variables xxxx
        $("#btnNuePagoSobre").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNuePagoSobre").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter
    }
}

//guardar CUD
$('#btnNuePagoSobre').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formPagoSobre.checkValidity()) {
        switch (CRUDPagoSobre) { // variable crud xxxx
            case "C":
                FnJsAjaxCPagoSobre(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUPagoSobre();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDPagoSobre();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Tipo de Pago Sobre");/////tttt
        }
    }
    console.log(formPagoSobre.checkValidity());
});

//ajax CUD
function FnJsAjaxCPagoSobre() {
    $.ajax({
        url: "/modulo1/VstRoc.aspx/FnCPagoSobreV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            PagoSobre: VarJsPagoSobre,

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Tipo de Pago Sobre Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDPagoSobre = "error"
                console.log("No se pudo agregar Tipo de PagoSobre");//
            }
            FnAlertaPagoSobre(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUPagoSobre() {
    $.ajax({
        url: "/modulo1/VstRoc.aspx/FnUPagoSobreV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdPagoSobre: VarJsPagoSobreId,
            PagoSobre: VarJsPagoSobre,


        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Tipo de Pago Sobre Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDPagoSobre = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaPagoSobre();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDPagoSobre() {
    $.ajax({
        url: "/modulo1/VstRoc.aspx/FnDPagoSobreV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdPagoSobre: VarJsPagoSobreId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Tipo de Pago Sobre Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDPagoSobre = "error"
                console.log("No se pudo Eliminar Tipo de Pago Sobre");////tttt
            }
            FnAlertaPagoSobre(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxEPagoSobre() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo1/VstRoc.aspx/FnEPagoSobreV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdPagoSobre: VarJsPagoSobreId,
            PagoSobre: VarJsPagoSobre
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                EPagoSobre = true; // variable existe xxxx
                $('#lblexistenuevoPagoSobre').text("Existe Tipo de Pago Sobre");// id etiqueta texto etiqueta //tttt
                FnJsBlockPagoSobre();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                EPagoSobre = false;// variable existe xxxx
                $('#lblexistenuevoPagoSobre').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockPagoSobre(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExistePagoSobre() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoPagoSobre').val().length >= 3) { // id de objetos de PagoSobres, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoPagoSobre').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsPagoSobre = $(this).val(); // variable de este elemento xxxx
    if (VerificarExistePagoSobre()) {//nombre función verificar existe xxxx
        FnJsAjaxEPagoSobre(); // llamar todos los existes xxxx

    }
});


function FnAlertaPagoSobre() {//nombre de la función xxxx

    switch (CRUDPagoSobre) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertPagoSobre = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertPagoSobre = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertPagoSobre = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertPagoSobre = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertPagoSobre = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertPagoSobre = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertPagoSobre = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertPagoSobre = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Tipo de Pago Sobre Alert")//tttt
    }
    //alerta
    $('#alertaRoc .modal-content').addClass(VarJsColorAlertPagoSobre);//variable de color alerta xxxx
    $('#alertaRoc h5').text(VarJsTextoAlertPagoSobre);//variable de texto alerta xxxx
    $('#alertaRoc').modal('show');
    setTimeout(function () {
        $('#alertaRoc').modal('hide');
        $('#alertaRoc .modal-content').removeClass(VarJsColorAlertPagoSobre);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblPagoSobre.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxRPagoSobre();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNPagoSobre").modal("toggle");//nombre modal xxxx
}