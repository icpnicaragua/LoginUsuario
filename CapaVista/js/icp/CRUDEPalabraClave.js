/*variable de tablas*/
var tablaPalabraClave;/*tabla mpodulo*/
var ModCPalabraClave = $('#modalNPalabraClave'); // modal 
//campos de tablas
var VarJsPalabraClaveId = 0;
var VarJsPalabraClave = "";


//igual para todos
var formPalabraClave = document.querySelector('#form1');

//variables crud
CRUDPalabraClave = "";
//variables alertas
var VarJsColorAlertPalabraClave = "";
var VarJsTextoAlertPalabraClave = "";
//variables existe
var EPalabraClave = true;


$('#lbMostrarPalabraClave').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    FnJsAjaxRPalabraClave(); //llama al ajax xxxx
});

function FnJsAjaxRPalabraClave() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo10/VstPalabrasClave.aspx/FnRPalabraClaveV", // nombre de página y nombre de función xxxx
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowPalabraClave(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowPalabraClave(data) {//3 llenar la tabla xxxx

    $('#tblPalabraClave').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaPalabraClave = $("#tblPalabraClave").DataTable({// variable nombre tabla xxxx

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
                    id: 'colPalabraClave'//se añade el id para ocultar xxxx
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
                filename: 'Palabra Clave' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Palabra Clave', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Palabra Clave' //tttt
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
                filename: 'Palabra Clave' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
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
    tablaPalabraClave.buttons().container().addClass('form-inline');///variable xxxx

    for (var contPalabraClave = 0; contPalabraClave < data.length; contPalabraClave++) { // declarar variable de recorrido de arreglo data xxxx
        tablaPalabraClave.row.add([//sensitivecase:
            data[contPalabraClave].IdPalabraClave,//campos
            data[contPalabraClave].PalabraClave,
            '<button value="editar" href="#modalNPalabraClave" data-toggle="modal" title="editar" class="btn btn-warning  btn-editPalabraClave"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNPalabraClave" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deletePalabraClave"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNPalabraClave').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCPalabraClave(); // nombre función xxxx
    EPalabraClave = true; // variable xxxx

    FnJsBlockPalabraClave(); // nombre función xxxx

    CRUDPalabraClave = "C"; // nombre variable xxxx

    //campos xxxx
    VarJsPalabraClaveId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsPalabraClave = ""; // cada campo tiene una variable, inicializar xxxx

});
$(document).on('click', '.btn-editPalabraClave', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUPalabraClave();//nombre de función xxxx
    var dataPalabraClave = tablaPalabraClave.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsPalabraClaveId = dataPalabraClave[0]; //id de la fila seleccionada
    $('#txtNuevoPalabraClave').val(dataPalabraClave[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsPalabraClave = dataPalabraClave[1]; // variable elemento, variable data, índice xxxx

    CRUDPalabraClave = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deletePalabraClave', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDPalabraClave();//nombre de función xxxx
    EPalabraClave = false; // variable de existe xxxx


    FnJsBlockPalabraClave();//función bloquear xxxx
    var dataPalabraClave = tablaPalabraClave.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsPalabraClaveId = dataPalabraClave[0]; //id de la fila seleccionada
    $('#txtNuevoPalabraClave').val(dataPalabraClave[1]);// [indice columna]  de la fila seleccionada xxxx

    VarJsPalabraClave = dataPalabraClave[1]; // variable elemento, variable data, índice xxxx

    CRUDPalabraClave = "D";
});

//pintar modal
function FnJsCPalabraClave() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoPalabraClave').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorPalabraClave").removeAttr("class");//quitar el atributo class
    $("#DivModBorPalabraClave").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaPalabraClave").removeAttr("class");//quitar el atributo class
    $("#DivModHeaPalabraClave").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitPalabraClave').text('Nuevo Palabra Clave');//tttt
    //cambiar el color icono btn
    $("#btnNuePalabraClave").removeAttr("class");//quitar el atributo class
    $("#btnNuePalabraClave").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNuePalabraClave i").removeAttr("class");
    $("#btnNuePalabraClave i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoPalabraClave").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCPalabraClave[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUPalabraClave() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoPalabraClave').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorPalabraClave").removeAttr("class");//quitar el atributo class
    $("#DivModBorPalabraClave").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaPalabraClave").removeAttr("class");//quitar el atributo class
    $("#DivModHeaPalabraClave").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitPalabraClave').text('Editar Palabra Clave');//tttt
    //cambiar el color icono btn
    $("#btnNuePalabraClave").removeAttr("class");//quitar el atributo class
    $("#btnNuePalabraClave").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNuePalabraClave i").removeAttr("class");
    $("#btnNuePalabraClave i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoPalabraClave").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCPalabraClave[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDPalabraClave() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoPalabraClave').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorPalabraClave").removeAttr("class");//quitar el atributo class
    $("#DivModBorPalabraClave").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaPalabraClave").removeAttr("class");//quitar el atributo class
    $("#DivModHeaPalabraClave").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitPalabraClave').text('Eliminar Palabra Clave');//tttt
    //cambiar el color icono btn
    $("#btnNuePalabraClave").removeAttr("class");//quitar el atributo class
    $("#btnNuePalabraClave").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNuePalabraClave i").removeAttr("class");
    $("#btnNuePalabraClave i").attr("class", "fa fa-trash fa-2x");//ícono
    //bloquear elementos
    $("#txtNuevoPalabraClave").attr('disabled', true); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCPalabraClave[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockPalabraClave() {// nombre función xxxx

    if (EPalabraClave == true) {// variables xxxx
        $("#btnNuePalabraClave").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNuePalabraClave").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter
    }
    else if (EPalabraClave == false) {// variables xxxx
        $("#btnNuePalabraClave").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNuePalabraClave").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter
    }
}

//guardar CUD
$('#btnNuePalabraClave').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formPalabraClave.checkValidity()) {
        switch (CRUDPalabraClave) { // variable crud xxxx
            case "C":
                FnJsAjaxCPalabraClave(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUPalabraClave();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDPalabraClave();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Palabra Clave");/////tttt
        }
    }
    console.log(formPalabraClave.checkValidity());
});

//ajax CUD
function FnJsAjaxCPalabraClave() {
    $.ajax({
        url: "/modulo10/VstPalabrasClave.aspx/FnCPalabraClaveV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            PalabraClave: VarJsPalabraClave,

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Palabra Clave Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDPalabraClave = "error"
                console.log("No se pudo agregar Tipo de indentificación");//
            }
            FnAlertaPalabraClave(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUPalabraClave() {
    $.ajax({
        url: "/modulo10/VstPalabrasClave.aspx/FnUPalabraClaveV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdPalabraClave: VarJsPalabraClaveId,
            PalabraClave: VarJsPalabraClave,


        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Palabra Clave Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDPalabraClave = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaPalabraClave();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDPalabraClave() {
    $.ajax({
        url: "/modulo10/VstPalabrasClave.aspx/FnDPalabraClaveV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdPalabraClave: VarJsPalabraClaveId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Palabra Clave Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDPalabraClave = "error"
                console.log("No se pudo Eliminar Palabra Clave");////tttt
            }
            FnAlertaPalabraClave(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxEPalabraClave() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo10/VstPalabrasClave.aspx/FnEPalabraClaveV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdPalabraClave: VarJsPalabraClaveId,
            PalabraClave: VarJsPalabraClave
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                EPalabraClave = true; // variable existe xxxx
                $('#lblexistenuevoPalabraClave').text("Existe Palabra Clave");// id etiqueta texto etiqueta //tttt
                FnJsBlockPalabraClave();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                EPalabraClave = false;// variable existe xxxx
                $('#lblexistenuevoPalabraClave').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockPalabraClave(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExistePalabraClave() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoPalabraClave').val().length > 3) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoPalabraClave').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsPalabraClave = $(this).val(); // variable de este elemento xxxx
    if (VerificarExistePalabraClave()) {//nombre función verificar existe xxxx
        FnJsAjaxEPalabraClave(); // llamar todos los existes xxxx

    }
});


function FnAlertaPalabraClave() {//nombre de la función xxxx

    switch (CRUDPalabraClave) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertPalabraClave = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertPalabraClave = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertPalabraClave = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertPalabraClave = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertPalabraClave = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertPalabraClave = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertPalabraClave = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertPalabraClave = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Palabra Clave Alert")//tttt
    }
    //alerta
    $('#alertaPalabraClave .modal-content').addClass(VarJsColorAlertPalabraClave);//variable de color alerta xxxx
    $('#alertaPalabraClave h5').text(VarJsTextoAlertPalabraClave);//variable de texto alerta xxxx
    $('#alertaPalabraClave').modal('show');
    setTimeout(function () {
        $('#alertaPalabraClave').modal('hide');
        $('#alertaPalabraClave .modal-content').removeClass(VarJsColorAlertPalabraClave);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblPalabraClave.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxRPalabraClave();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNPalabraClave").modal("toggle");//nombre modal xxxx
}