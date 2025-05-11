/*variable de tablas*/
var tablaUsuario;/*tabla mpodulo*/
var ModCUsuario = $('#modalNUsuario'); // modal 
//campos de tablas
var VarJsUsuarioId = 0;
var VarJsUsuario = "";


//igual para todos
var formUsuario = document.querySelector('#form1');

//variables crud
CRUDUsuario = "";
//variables alertas
var VarJsColorAlertUsuario = "";
var VarJsTextoAlertUsuario = "";
//variables existe
var EUsuario = true;


$('#lbMostrarUsuario').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    FnJsAjaxRUsuario(); //llama al ajax xxxx
});

function FnJsAjaxRUsuario() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo1/VstCuentasbanco.aspx/FnRUsuarioV", // nombre de página y nombre de función xxxx
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowUsuario(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowUsuario(data) {//3 llenar la tabla xxxx

    $('#tblUsuario').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaUsuario = $("#tblUsuario").DataTable({// variable nombre tabla xxxx

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
                    id: 'colUsuario'//se añade el id para ocultar xxxx
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
                filename: 'Usuario' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Usuario', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Usuario' //tttt
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
                filename: 'Usuario' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
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
    tablaUsuario.buttons().container().addClass('form-inline');///variable xxxx

    for (var contUsuario = 0; contUsuario < data.length; contUsuario++) { // declarar variable de recorrido de arreglo data xxxx
        tablaUsuario.row.add([//sensitivecase:
            data[contUsuario].IdUsuario,//campos
            data[contUsuario].Usuario,
            '<button value="editar" href="#modalNUsuario" data-toggle="modal" title="editar" class="btn btn-warning  btn-editUsuario"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNUsuario" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteUsuario"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNUsuario').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCUsuario(); // nombre función xxxx
    EUsuario = true; // variable xxxx

    FnJsBlockUsuario(); // nombre función xxxx

    CRUDUsuario = "C"; // nombre variable xxxx

    //campos xxxx
    VarJsUsuarioId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsUsuario = ""; // cada campo tiene una variable, inicializar xxxx

});
$(document).on('click', '.btn-editUsuario', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUUsuario();//nombre de función xxxx
    var dataUsuario = tablaUsuario.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsUsuarioId = dataUsuario[0]; //id de la fila seleccionada
    $('#txtNuevoUsuario').val(dataUsuario[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsUsuario = dataUsuario[1]; // variable elemento, variable data, índice xxxx

    CRUDUsuario = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteUsuario', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDUsuario();//nombre de función xxxx
    EUsuario = false; // variable de existe xxxx


    FnJsBlockUsuario();//función bloquear xxxx
    var dataUsuario = tablaUsuario.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsUsuarioId = dataUsuario[0]; //id de la fila seleccionada
    $('#txtNuevoUsuario').val(dataUsuario[1]);// [indice columna]  de la fila seleccionada xxxx

    VarJsUsuario = dataUsuario[1]; // variable elemento, variable data, índice xxxx

    CRUDUsuario = "D";
});

//pintar modal
function FnJsCUsuario() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoUsuario').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorUsuario").removeAttr("class");//quitar el atributo class
    $("#DivModBorUsuario").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaUsuario").removeAttr("class");//quitar el atributo class
    $("#DivModHeaUsuario").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitUsuario').text('Nuevo Usuario');//tttt
    //cambiar el color icono btn
    $("#btnNueUsuario").removeAttr("class");//quitar el atributo class
    $("#btnNueUsuario").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNueUsuario i").removeAttr("class");
    $("#btnNueUsuario i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoUsuario").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCUsuario[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUUsuario() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoUsuario').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorUsuario").removeAttr("class");//quitar el atributo class
    $("#DivModBorUsuario").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaUsuario").removeAttr("class");//quitar el atributo class
    $("#DivModHeaUsuario").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitUsuario').text('Editar Usuario');//tttt
    //cambiar el color icono btn
    $("#btnNueUsuario").removeAttr("class");//quitar el atributo class
    $("#btnNueUsuario").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNueUsuario i").removeAttr("class");
    $("#btnNueUsuario i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoUsuario").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCUsuario[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDUsuario() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoUsuario').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorUsuario").removeAttr("class");//quitar el atributo class
    $("#DivModBorUsuario").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaUsuario").removeAttr("class");//quitar el atributo class
    $("#DivModHeaUsuario").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitUsuario').text('Eliminar Usuario');//tttt
    //cambiar el color icono btn
    $("#btnNueUsuario").removeAttr("class");//quitar el atributo class
    $("#btnNueUsuario").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNueUsuario i").removeAttr("class");
    $("#btnNueUsuario i").attr("class", "fa fa-trash fa-2x");//ícono
    //bloquear elementos
    $("#txtNuevoUsuario").attr('disabled', true); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCUsuario[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockUsuario() {// nombre función xxxx

    if (EUsuario == true) {// variables xxxx
        $("#btnNueUsuario").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNueUsuario").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter
    }
    else if (EUsuario == false) {// variables xxxx
        $("#btnNueUsuario").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNueUsuario").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter
    }
}

//guardar CUD
$('#btnNueUsuario').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formUsuario.checkValidity()) {
        switch (CRUDUsuario) { // variable crud xxxx
            case "C":
                FnJsAjaxCUsuario(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUUsuario();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDUsuario();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Usuario");/////tttt
        }
    }
    console.log(formUsuario.checkValidity());
});

//ajax CUD
function FnJsAjaxCUsuario() {
    $.ajax({
        url: "/modulo1/VstCuentasbanco.aspx/FnCUsuarioV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            Usuario: VarJsUsuario,

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Usuario Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDUsuario = "error"
                console.log("No se pudo agregar Tipo de indentificación");//
            }
            FnAlertaUsuario(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUUsuario() {
    $.ajax({
        url: "/modulo1/VstCuentasbanco.aspx/FnUUsuarioV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdUsuario: VarJsUsuarioId,
            Usuario: VarJsUsuario,


        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Usuario Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDUsuario = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaUsuario();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDUsuario() {
    $.ajax({
        url: "/modulo1/VstCuentasbanco.aspx/FnDUsuarioV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdUsuario: VarJsUsuarioId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Usuario Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDUsuario = "error"
                console.log("No se pudo Eliminar Usuario");////tttt
            }
            FnAlertaUsuario(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxEUsuario() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo1/VstCuentasbanco.aspx/FnEUsuarioV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdUsuario: VarJsUsuarioId,
            Usuario: VarJsUsuario
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                EUsuario = true; // variable existe xxxx
                $('#lblexistenuevoUsuario').text("Existe Usuario");// id etiqueta texto etiqueta //tttt
                FnJsBlockUsuario();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                EUsuario = false;// variable existe xxxx
                $('#lblexistenuevoUsuario').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockUsuario(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExisteUsuario() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoUsuario').val().length > 3) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoUsuario').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsUsuario = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteUsuario()) {//nombre función verificar existe xxxx
        FnJsAjaxEUsuario(); // llamar todos los existes xxxx

    }
});


function FnAlertaUsuario() {//nombre de la función xxxx

    switch (CRUDUsuario) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertUsuario = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertUsuario = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertUsuario = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertUsuario = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertUsuario = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertUsuario = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertUsuario = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertUsuario = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Usuario Alert")//tttt
    }
    //alerta
    $('#alertaCuentasUsuario .modal-content').addClass(VarJsColorAlertUsuario);//variable de color alerta xxxx
    $('#alertaCuentasUsuario h5').text(VarJsTextoAlertUsuario);//variable de texto alerta xxxx
    $('#alertaCuentasUsuario').modal('show');
    setTimeout(function () {
        $('#alertaCuentasUsuario').modal('hide');
        $('#alertaCuentasUsuario .modal-content').removeClass(VarJsColorAlertUsuario);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblUsuario.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxRUsuario();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNUsuario").modal("toggle");//nombre modal xxxx
}