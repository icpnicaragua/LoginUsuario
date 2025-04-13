/*variable de tablas*/
var tablaBanco;/*tabla mpodulo*/
var ModCBanco = $('#modalNBanco'); // modal 
//campos de tablas
var VarJsBancoId = 0;
var VarJsBanco = "";


//igual para todos
var formBanco = document.querySelector('#form1');

//variables crud
CRUDBanco = "";
//variables alertas
var VarJsColorAlertBanco = "";
var VarJsTextoAlertBanco = "";
//variables existe
var EBanco = true;


$('#lbMostrarBanco').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    FnJsAjaxRBanco(); //llama al ajax xxxx
});

function FnJsAjaxRBanco() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo1/VstCuentasbanco.aspx/FnRBancoV", // nombre de página y nombre de función xxxx
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowBanco(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowBanco(data) {//3 llenar la tabla xxxx

    $('#tblBanco').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaBanco = $("#tblBanco").DataTable({// variable nombre tabla xxxx

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
                    id: 'colBanco'//se añade el id para ocultar xxxx
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
                filename: 'Banco' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Banco', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Banco' //tttt
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
                filename: 'Banco' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
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
    tablaBanco.buttons().container().addClass('form-inline');///variable xxxx

    for (var contBanco = 0; contBanco < data.length; contBanco++) { // declarar variable de recorrido de arreglo data xxxx
        tablaBanco.row.add([//sensitivecase:
            data[contBanco].IdBanco,//campos
            data[contBanco].Banco,
            '<button value="editar" href="#modalNBanco" data-toggle="modal" title="editar" class="btn btn-warning  btn-editBanco"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNBanco" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteBanco"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNBanco').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCBanco(); // nombre función xxxx
    EBanco = true; // variable xxxx

    FnJsBlockBanco(); // nombre función xxxx

    CRUDBanco = "C"; // nombre variable xxxx

    //campos xxxx
    VarJsBancoId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsBanco = ""; // cada campo tiene una variable, inicializar xxxx

});
$(document).on('click', '.btn-editBanco', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUBanco();//nombre de función xxxx
    var dataBanco = tablaBanco.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsBancoId = dataBanco[0]; //id de la fila seleccionada
    $('#txtNuevoBanco').val(dataBanco[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsBanco = dataBanco[1]; // variable elemento, variable data, índice xxxx

    CRUDBanco = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteBanco', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDBanco();//nombre de función xxxx
    EBanco = false; // variable de existe xxxx


    FnJsBlockBanco();//función bloquear xxxx
    var dataBanco = tablaBanco.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsBancoId = dataBanco[0]; //id de la fila seleccionada
    $('#txtNuevoBanco').val(dataBanco[1]);// [indice columna]  de la fila seleccionada xxxx

    VarJsBanco = dataBanco[1]; // variable elemento, variable data, índice xxxx

    CRUDBanco = "D";
});

//pintar modal
function FnJsCBanco() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoBanco').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorBanco").removeAttr("class");//quitar el atributo class
    $("#DivModBorBanco").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaBanco").removeAttr("class");//quitar el atributo class
    $("#DivModHeaBanco").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitBanco').text('Nuevo Banco');//tttt
    //cambiar el color icono btn
    $("#btnNueBanco").removeAttr("class");//quitar el atributo class
    $("#btnNueBanco").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNueBanco i").removeAttr("class");
    $("#btnNueBanco i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoBanco").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCBanco[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUBanco() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoBanco').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorBanco").removeAttr("class");//quitar el atributo class
    $("#DivModBorBanco").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaBanco").removeAttr("class");//quitar el atributo class
    $("#DivModHeaBanco").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitBanco').text('Editar Banco');//tttt
    //cambiar el color icono btn
    $("#btnNueBanco").removeAttr("class");//quitar el atributo class
    $("#btnNueBanco").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNueBanco i").removeAttr("class");
    $("#btnNueBanco i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoBanco").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCBanco[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDBanco() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoBanco').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorBanco").removeAttr("class");//quitar el atributo class
    $("#DivModBorBanco").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaBanco").removeAttr("class");//quitar el atributo class
    $("#DivModHeaBanco").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitBanco').text('Eliminar Banco');//tttt
    //cambiar el color icono btn
    $("#btnNueBanco").removeAttr("class");//quitar el atributo class
    $("#btnNueBanco").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNueBanco i").removeAttr("class");
    $("#btnNueBanco i").attr("class", "fa fa-trash fa-2x");//ícono
    //bloquear elementos
    $("#txtNuevoBanco").attr('disabled', true); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCBanco[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockBanco() {// nombre función xxxx

    if (EBanco == true) {// variables xxxx
        $("#btnNueBanco").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNueBanco").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter
    }
    else if (EBanco == false) {// variables xxxx
        $("#btnNueBanco").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNueBanco").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter
    }
}

//guardar CUD
$('#btnNueBanco').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formBanco.checkValidity()) {
        switch (CRUDBanco) { // variable crud xxxx
            case "C":
                FnJsAjaxCBanco(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUBanco();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDBanco();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Banco");/////tttt
        }
    }
    console.log(formBanco.checkValidity());
});

//ajax CUD
function FnJsAjaxCBanco() {
    $.ajax({
        url: "/modulo1/VstCuentasbanco.aspx/FnCBancoV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            Banco: VarJsBanco,

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Banco Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDBanco = "error"
                console.log("No se pudo agregar Tipo de indentificación");//
            }
            FnAlertaBanco(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUBanco() {
    $.ajax({
        url: "/modulo1/VstCuentasbanco.aspx/FnUBancoV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdBanco: VarJsBancoId,
            Banco: VarJsBanco,


        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Banco Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDBanco = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaBanco();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDBanco() {
    $.ajax({
        url: "/modulo1/VstCuentasbanco.aspx/FnDBancoV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdBanco: VarJsBancoId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Banco Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDBanco = "error"
                console.log("No se pudo Eliminar Banco");////tttt
            }
            FnAlertaBanco(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxEBanco() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo1/VstCuentasbanco.aspx/FnEBancoV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdBanco: VarJsBancoId,
            Banco: VarJsBanco
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                EBanco = true; // variable existe xxxx
                $('#lblexistenuevoBanco').text("Existe Banco");// id etiqueta texto etiqueta //tttt
                FnJsBlockBanco();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                EBanco = false;// variable existe xxxx
                $('#lblexistenuevoBanco').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockBanco(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExisteBanco() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoBanco').val().length > 3) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoBanco').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsBanco = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteBanco()) {//nombre función verificar existe xxxx
        FnJsAjaxEBanco(); // llamar todos los existes xxxx

    }
});


function FnAlertaBanco() {//nombre de la función xxxx

    switch (CRUDBanco) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertBanco = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertBanco = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertBanco = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertBanco = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertBanco = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertBanco = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertBanco = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertBanco = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Banco Alert")//tttt
    }
    //alerta
    $('#alertaCuentasBanco .modal-content').addClass(VarJsColorAlertBanco);//variable de color alerta xxxx
    $('#alertaCuentasBanco h5').text(VarJsTextoAlertBanco);//variable de texto alerta xxxx
    $('#alertaCuentasBanco').modal('show');
    setTimeout(function () {
        $('#alertaCuentasBanco').modal('hide');
        $('#alertaCuentasBanco .modal-content').removeClass(VarJsColorAlertBanco);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblBanco.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxRBanco();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNBanco").modal("toggle");//nombre modal xxxx
}