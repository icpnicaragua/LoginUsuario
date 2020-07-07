/*variable de tablas*/
var tablaModulo;/*tabla mpodulo*/
var ModCModulo = $('#ModModulo'); // modal módulo
var VarJsModuloId = 0; //idmodulo
var VarJsModulo = "";
var VarJSModuloAsp = "";

//validador
var formModulo = document.querySelector('#form1');

//variables crud
CRUDModulo = "";
//variables alertas
var VarJsColorAlertModulo = "";
var VarJsTextoAlertModulo = "";
//variables existe
var EMod = true;
var EModAsp = true;

$('#lbMostrarM').click(function (e) {//1 evento para mostrar contenido de módulo xxxx
    e.preventDefault();
    FnJsAjaxRModulo(); //llama al ajax xxxx
});

function FnJsAjaxRModulo() { //2 pide los datos en bd de la tabla módulo xxxx
    $.ajax({
        type: "POST",
        url: "/modulo4/vst13.aspx/FnRModuloV", // nombre de página y nombre de función xxxx
        data: {}, 
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowModulo(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowModulo(data) {//3 llenar la tabla xxxx

    $('#tblM').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaModulo = $("#tblM").DataTable({// variable nombre tabla xxxx

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
                    id: 'colMod'//se añade el id para ocultar xxxx
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
                    columns: [':not(:eq(4)):visible'] /// index de controles xxxx para no mostrar comienza en 0
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
                    columns: [':not(:eq(4)):visible'] ///  index de controles xxxx para no mostrar comienza en 0
                },
                titleAttr: 'PDF',
                filename: 'Módulo' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte xxxx
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
                                    text: 'Soaz Módulo', //texto del reporte xxxx
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte soaz Módulo' //superior derecha xxxx
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
                filename: 'Módulo' + "_" + FnJsDate() + "_" + FnJsHour(), // nombre de archivo xxxx
                text: '<i class="far fa-file-excel fa-2x"></i>',
                className: 'btn btn-success d-none d-lg-block',
                exportOptions: {
                    columns: [':not(:eq(4)):visible'] // index de controles xxxx para no mostrar inicia en 0
                },
                titleAttr: 'Excel',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')

                }

            }
        ],
        "language": FnJsEspTbl()
    });
    tablaModulo.buttons().container().addClass('form-inline');///variable xxxx
  
    for (var contModulo = 0; contModulo < data.length; contModulo++) { // declarar variable de recorrido de arreglo data xxxx
        tablaModulo.row.add([//sensitivecase:
            data[contModulo].IdModulo,
            data[contModulo].Modulo,
            data[contModulo].Fechainciomodulo,
            data[contModulo].Idaspmodulo,
            '<button value="editar" href="#ModModulo" data-toggle="modal" title="editar" class="btn btn-warning  btn-editM"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#ModModulo" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteM"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbMN').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCModulo(); // nombre función xxxx
    EMod = true; // variable xxxx
    EModAsp = true; // variable xxxx
    FnJsBlockModulo(); // nombre función xxxx
 
    CRUDModulo = "C"; // nombre variable xxxx

    VarJsModuloId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsModulo = ""; // cada campo tiene una variable, inicializar xxxx
    VarJSModuloAsp = ""; // cada campo tiene una variable, inicializar xxxx

});
$(document).on('click', '.btn-editM', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUModulo();//nombre de función xxxx
    var dataModulo = tablaModulo.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsModuloId = dataModulo[0]; //id de la fila seleccionada
    $('#TxtModulo').val(dataModulo[1]);// [indice columna]  de la fila seleccionada xxxx
    $('#TxtModuloAsp').val(dataModulo[3]);// [indice columna]  de la fila seleccionada xxxx

    VarJsModulo = dataModulo[1]; // variable elemento, variable data, índice xxxx
    VarJSModuloAsp = dataModulo[3]; // variable elemento, variable data, índice xxxx

    CRUDModulo = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteM', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDModulo();//nombre de función xxxx
    EMod = false; // variable de existe xxxx
    EModAsp = false;// variable de existe xxxx

    FnJsBlockModulo();//función bloquear xxxx
    var dataModulo = tablaModulo.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsModuloId = dataModulo[0]; //id de la fila seleccionada
    $('#TxtModulo').val(dataModulo[1]);// [indice columna]  de la fila seleccionada xxxx
    $('#TxtModuloAsp').val(dataModulo[3]);// [indice columna]  de la fila seleccionada xxxx

    VarJsModulo = dataModulo[1]; // variable elemento, variable data, índice xxxx
    VarJSModuloAsp = dataModulo[3]; // variable elemento, variable data, índice xxxx

    CRUDModulo = "D";
});

//pintar modal
function FnJsCModulo() { //nombe función xxxx
 
    $('#lblModulo').text(""); // id etiqueta texto etiqueta xxxx
    $('#lblModuloAsp').text(""); // id etiqueta texto etiqueta xxxx
    //cambiar el color del modal borde
    $("#DivModBorModulo").removeAttr("class");//quitar el atributo class
    $("#DivModBorModulo").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeadModulo").removeAttr("class");//quitar el atributo class
    $("#DivModHeadModulo").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitModulo').text('Nuevo Módulo');
    //cambiar el color icono btn
    $("#BtnCUDModulo").removeAttr("class");//quitar el atributo class
    $("#BtnCUDModulo").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#BtnCUDModulo i").removeAttr("class");
    $("#BtnCUDModulo i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#TxtModulo").attr('disabled', false); //variables de los elementos del modal xxxx
    $("#TxtModuloAsp").attr('disabled', false); //variables de los elementos del modal xxxx
    //vaciar elementos text de todo el modal
    $('#' + ModCModulo[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUModulo() { //nombe función xxxx
    $('#lblModulo').text(""); // id etiqueta texto etiqueta xxxx
    $('#lblModuloAsp').text(""); // id etiqueta texto etiqueta xxxx
    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorModulo").removeAttr("class");//quitar el atributo class
    $("#DivModBorModulo").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeadModulo").removeAttr("class");//quitar el atributo class
    $("#DivModHeadModulo").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitModulo').text('Editar Módulo');
    //cambiar el color icono btn
    $("#BtnCUDModulo").removeAttr("class");//quitar el atributo class
    $("#BtnCUDModulo").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#BtnCUDModulo i").removeAttr("class");
    $("#BtnCUDModulo i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#TxtModulo").attr('disabled', false); //variables de los elementos del modal xxxx
    $("#TxtModuloAsp").attr('disabled', false); //variables de los elementos del modal xxxx
    //vaciar elementos text de todo el modal
    $('#' + ModCModulo[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDModulo() { //nombe función xxxx

    $('#lblModulo').text(""); // id etiqueta texto etiqueta xxxx
    $('#lblModuloAsp').text(""); // id etiqueta texto etiqueta xxxx
    //cambiar el color del modal borde
    $("#DivModBorModulo").removeAttr("class");//quitar el atributo class
    $("#DivModBorModulo").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeadModulo").removeAttr("class");//quitar el atributo class
    $("#DivModHeadModulo").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitModulo').text('Eliminar Módulo');
    //cambiar el color icono btn
    $("#BtnCUDModulo").removeAttr("class");//quitar el atributo class
    $("#BtnCUDModulo").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#BtnCUDModulo i").removeAttr("class");
    $("#BtnCUDModulo i").attr("class", "fa fa-trash fa-2x");//ícono
    //bloquear elementos
    $("#TxtModulo").attr('disabled', true); //variables de los elementos del modal xxxx
    $("#TxtModuloAsp").attr('disabled', true); //variables de los elementos del modal xxxx
    //vaciar elementos text de todo el modal
    $('#' + ModCModulo[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockModulo() {// nombre función xxxx

    if (EMod || EModAsp == true) {// variables xxxx
        $("#BtnCUDModulo").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#BtnCUDModulo").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter
    }
    else if (EMod || EModAsp == false) {// variables xxxx
        $("#BtnCUDModulo").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#BtnCUDModulo").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter
    }
}

//guardar CUD
$('#BtnCUDModulo').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formModulo.checkValidity()) {
        switch (CRUDModulo) { // variable crud xxxx
            case "C":
                FnJsAjaxCModulo(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUModulo();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDModulo();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Módulo");
        }
    }
});

//ajax CUD
function FnJsAjaxCModulo() {
    $.ajax({
        url: "/modulo4/vst13.aspx/FnCModuloV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            Modulo: VarJsModulo,
            ModuloAsp: VarJSModuloAsp
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Módulo Agregado"); //texto xxxx            
            }
            else {
                //no se creó
                CRUDModulo="error"
                console.log("No se pudo agregar Módulo");//
            }
            FnAlertaModulo(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUModulo() {
    $.ajax({
        url: "/modulo4/vst13.aspx/FnUModuloV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdModulo: VarJsModuloId,
            Modulo: VarJsModulo,
            ModuloAsp: VarJSModuloAsp
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Módulo Actualizado"); //
                          }
            else {
                //no se borró
                CRUDModulo = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaModulo();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDModulo() {
    $.ajax({
        url: "/modulo4/vst13.aspx/FnDModuloV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdModulo: VarJsModuloId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Módulo Eliminado"); //texto xxxx
            }
            else {
                //no se creó
                CRUDModulo = "error"
                console.log("No se pudo Eliminar Módulo");//
            }
            FnAlertaModulo(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxEModulo() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo4/vst13.aspx/FnEModuloV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdModulo: VarJsModuloId,
            Modulo: VarJsModulo
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                EMod = true; // variable existe xxxx
                $('#lblModulo').text("Existe Módulo");// id etiqueta texto etiqueta xxxx
                FnJsBlockModulo();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                EMod = false;// variable existe xxxx
                $('#lblModulo').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockModulo(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}
function FnJsAjaxEModuloAsp() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo4/vst13.aspx/FnEModuloAspV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdModulo: VarJsModuloId,
            ModuloAsp: VarJSModuloAsp
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                EModAsp = true; // variable existe xxxx
                $('#LblModuloAsp').text("Existe Módulo Asp");// id etiqueta texto etiqueta xxxx
                FnJsBlockModulo();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                EModAsp = false;// variable existe xxxx
                $('#LblModuloAsp').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockModulo(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}

function VerificarExisteModulo() {// nombre de función verificarexiste xxxx
    if ($('#TxtModulo').val().length > 3 && $('#TxtModuloAsp').val().length > 3 ) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#TxtModulo').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsModulo = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteModulo()) {//nombre función verificar existe xxxx
        FnJsAjaxEModulo(); // llamar todos los existes xxxx
        FnJsAjaxEModuloAsp();// llamar todos los existes xxxx
    }
});
$('#TxtModuloAsp').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJSModuloAsp = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteModulo()) {//nombre función verificar existe xxxx
        FnJsAjaxEModulo(); // llamar todos los existes xxxx
        FnJsAjaxEModuloAsp();// llamar todos los existes xxxx
    }
});

function FnAlertaModulo() {//nombre de la función xxxx

    switch (CRUDModulo) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertModulo = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertModulo = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertModulo = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertModulo = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertModulo = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertModulo = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertModulo = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertModulo = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Módulo Alert")
    }
    //alerta
    $('#alerta .modal-content').addClass(VarJsColorAlertModulo);//variable de color alerta xxxx
    $('#alerta h5').text(VarJsTextoAlertModulo);//variable de texto alerta xxxx
    $('#alerta').modal('show');
    setTimeout(function () {
        $('#alerta').modal('hide');
        $('#alerta .modal-content').removeClass(VarJsColorAlertModulo);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblM.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxRModulo();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#ModModulo").modal("toggle");//nombre modal xxxx
}