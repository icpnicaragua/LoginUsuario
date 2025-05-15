/*variable de tablas*/
var tablaCorreo;/*tabla mpodulo*/
var ModCCorreo = $('#modalNCorreo'); // modal 
//campos de tablas
var VarJsCorreoId = 0;
var VarJsCorreo = "";
var VarJsIdTipoCorreo = 0;
var VarJsIdPersona = 0;
//dddlist TipoCorreo
var VAlDDLCorreoTipoCorreo = "null";// para guardar lo que está en la tabla y luego asignar al ddl

//igual para todos
var formCorreo = document.querySelector('#form1');

//variables crud
CRUDCorreo = "";
//variables alertas
var VarJsColorAlertCorreo = "";
var VarJsTextoAlertCorreo = "";
//variables existe
var ECorreo = true;

$('#tblPersona tbody').on('click', 'tr', function () {
    var tablaPersona = $('#tblPersona').DataTable(); 
    VarJsIdPersona = tablaPersona.row(this).data()[0];
    FnJsAjaxRCorreo(); //llama al ajax xxxx
    FnJSFillDdlCorreoTipoCorreo();//cargar ddl
    $("#secciontblCorreo").attr('class', 'table-responsive collapse show');//No hay btn de show table
})

/*
$('#lbMostrarCorreo').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    
});
*/

function FnJsAjaxRCorreo() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnRCorreoV", // nombre de página y nombre de función xxxx
        data: JSON.stringify({// los parámetros de la sig línea
            IdPersona: VarJsIdPersona
        }), /*parametro: valor*/
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowCorreo(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowCorreo(data) {//3 llenar la tabla xxxx

    $('#tblCorreo').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaCorreo = $("#tblCorreo").DataTable({// variable nombre tabla xxxx

        "retrieve": true,
        dom: 'Bfrtip',

        "order": [[2, 'asc'], [1, 'asc']],//"order": [[ 0, 'asc' ], [ 1, 'desc' ]] // columna, orden xxxx comienza en 0
        "columnDefs": [
            { "targets": 3, "searchable": false },
            { "orderable": false, "targets": 3 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colCorreo'//se añade el id para ocultar xxxx
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
                filename: 'Correo' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Correo', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Correo' //tttt
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
                filename: 'Correo' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
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
    tablaCorreo.buttons().container().addClass('form-inline');///variable xxxx

    for (var contCorreo = 0; contCorreo < data.length; contCorreo++) { // declarar variable de recorrido de arreglo data xxxx
        tablaCorreo.row.add([//sensitivecase:
            data[contCorreo].IdCorreo,//campos
            data[contCorreo].Correo,//campos
            data[contCorreo].ObjTipoCorreo.TipoCorreo,
            '<button value="editar" href="#modalNCorreo" data-toggle="modal" title="editar" class="btn btn-warning  btn-editCorreo"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNCorreo" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteCorreo"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNCorreo').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCCorreo(); // nombre función xxxx
    ECorreo = true; // variable xxxx

    FnJsBlockCorreo(); // nombre función xxxx
    FnJSFillDdlCorreoTipoCorreo();
    CRUDCorreo = "C"; // nombre variable xxxx

    //campos xxxx
    VarJsCorreoId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsCorreo = ""; // cada campo tiene una variable, inicializar xxxx
    VarJsIdTipoCorreo = 0;
    // VarJsIdPersona = 0;

});
$(document).on('click', '.btn-editCorreo', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUCorreo();//nombre de función xxxx
    var dataCorreo = tablaCorreo.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsCorreoId = dataCorreo[0]; //id de la fila seleccionada
    $('#txtNuevoCorreo').val(dataCorreo[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsCorreo = dataCorreo[1]; // variable elemento, variable data, índice xxxx
    VAlDDLCorreoTipoCorreo = (dataCorreo[2]);
    FnJSFillDdlCorreoTipoCorreo();
    VarJsIdTipoCorreo = $('#ddlCCorreoTipoCorreo').val();
    //VarJsIdPersona = 0;
    CRUDCorreo = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteCorreo', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDCorreo();//nombre de función xxxx
    ECorreo = false; // variable de existe xxxx


    FnJsBlockCorreo();//función bloquear xxxx
    var dataCorreo = tablaCorreo.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsCorreoId = dataCorreo[0]; //id de la fila seleccionada
    $('#txtNuevoCorreo').val(dataCorreo[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsCorreo = dataCorreo[1]; // variable elemento, variable data, índice xxxx
    VAlDDLCorreoTipoCorreo = (dataCorreo[2]);
    FnJSFillDdlCorreoTipoCorreo();

    CRUDCorreo = "D";
});

//pintar modal
function FnJsCCorreo() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoCorreo').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorCorreo").removeAttr("class");//quitar el atributo class
    $("#DivModBorCorreo").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaCorreo").removeAttr("class");//quitar el atributo class
    $("#DivModHeaCorreo").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitCorreo').text('Nuevo Correo');//tttt
    //cambiar el color icono btn
    $("#btnNueCorreo").removeAttr("class");//quitar el atributo class
    $("#btnNueCorreo").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNueCorreo i").removeAttr("class");
    $("#btnNueCorreo i").attr("class", "fa fa-save fa-2x");
    //color ddl
    $("#ddlCCorreoTipoCorreo").removeAttr("class"); //uitar propiedades
    $("#ddlCCorreoTipoCorreo").attr("class", "form-control border-success");//pintr roo
    //bloquear elementos
    $("#txtNuevoCorreo").attr('disabled', false); //variables de los elementos del modal xxxx
    $('#ddlCCorreoTipoCorreo').attr('disabled', false);
    //vaciar elementos text de todo el modal
    $('#' + ModCCorreo[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUCorreo() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoCorreo').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorCorreo").removeAttr("class");//quitar el atributo class
    $("#DivModBorCorreo").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaCorreo").removeAttr("class");//quitar el atributo class
    $("#DivModHeaCorreo").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitCorreo').text('Editar Correo');//tttt
    //cambiar el color icono btn
    $("#btnNueCorreo").removeAttr("class");//quitar el atributo class
    $("#btnNueCorreo").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNueCorreo i").removeAttr("class");
    $("#btnNueCorreo i").attr("class", "fa fa-save fa-2x");
    //color ddl
    $("#ddlCCorreoTipoCorreo").removeAttr("class"); //uitar propiedades
    $("#ddlCCorreoTipoCorreo").attr("class", "form-control border-warning");//pintr roo
    //bloquear elementos
    $("#txtNuevoCorreo").attr('disabled', false); //variables de los elementos del modal xxxx
    $('#ddlCCorreoTipoCorreo').attr('disabled', false);
    //vaciar elementos text de todo el modal
    $('#' + ModCCorreo[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDCorreo() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoCorreo').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorCorreo").removeAttr("class");//quitar el atributo class
    $("#DivModBorCorreo").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaCorreo").removeAttr("class");//quitar el atributo class
    $("#DivModHeaCorreo").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitCorreo').text('Eliminar Correo');//tttt
    //cambiar el color icono btn
    $("#btnNueCorreo").removeAttr("class");//quitar el atributo class
    $("#btnNueCorreo").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNueCorreo i").removeAttr("class");
    $("#btnNueCorreo i").attr("class", "fa fa-trash fa-2x");//ícono
    //color ddl
    $("#ddlCCorreoTipoCorreo").removeAttr("class"); //uitar propiedades
    $("#ddlCCorreoTipoCorreo").attr("class", "form-control border-danger");//pintr roo
    //bloquear elementos
    $("#txtNuevoCorreo").attr('disabled', true); //variables de los elementos del modal xxxx
    $('#ddlCCorreoTipoCorreo').attr('disabled', true);
    //vaciar elementos text de todo el modal
    $('#' + ModCCorreo[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockCorreo() {// nombre función xxxx

    if (ECorreo == true) {// variables xxxx
        $("#btnNueCorreo").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNueCorreo").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter

    }
    else if (ECorreo == false) {// variables xxxx
        $("#btnNueCorreo").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNueCorreo").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter


    }
}

//guardar CUD
$('#btnNueCorreo').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formCorreo.checkValidity()) {
        switch (CRUDCorreo) { // variable crud xxxx
            case "C":
                FnJsAjaxCCorreo(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUCorreo();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDCorreo();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Correo");/////tttt
        }
    }
    console.log(formCorreo.checkValidity());
});

//ajax CUD
function FnJsAjaxCCorreo() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnCCorreoV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            Correo: VarJsCorreo,
            IdTipoCorreo: VarJsIdTipoCorreo,
            IdPersona: VarJsIdPersona
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Correo Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDCorreo = "error"
                console.log("No se pudo agregar Tipo de indentificación");//
            }
            FnAlertaCorreo(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUCorreo() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnUCorreoV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdCorreo: VarJsCorreoId,
            Correo: VarJsCorreo,
            IdTipoCorreo: VarJsIdTipoCorreo

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Correo Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDCorreo = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaCorreo();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDCorreo() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnDCorreoV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdCorreo: VarJsCorreoId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Correo Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDCorreo = "error"
                console.log("No se pudo Eliminar Correo");////tttt
            }
            FnAlertaCorreo(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxECorreo() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnECorreoV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdCorreo: VarJsCorreoId,
            Correo: VarJsCorreo,
            IdTipoCorreo: VarJsIdTipoCorreo,
            IdPersona: VarJsIdPersona
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                ECorreo = true; // variable existe xxxx
                $('#lblexistenuevoCorreo').text("Existe Correo");// id etiqueta texto etiqueta //tttt
                FnJsBlockCorreo();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                ECorreo = false;// variable existe xxxx
                $('#lblexistenuevoCorreo').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockCorreo(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExisteCorreo() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoCorreo').val().length >= 3 && $('#ddlCCorreoTipoCorreo').val() > 0) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoCorreo').change(function (e) {//id de cada elemento en el modal xxxx
    VarJsCorreo = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteCorreo()) {//nombre función verificar existe xxxx
        FnJsAjaxECorreo(); // llamar todos los existes xxxx

    }
});

$('#ddlCCorreoTipoCorreo').change(function (e) {
    VarJsIdTipoCorreo = $('#ddlCCorreoTipoCorreo').val();
    if (VerificarExisteCorreo()) {
        FnJsAjaxECorreo();
    }
});

function FnJSFillDdlCorreoTipoCorreo() {
    $('#ddlCCorreoTipoCorreo').empty(); // xxxx id
    $.ajax({
        type: "POST",
        url: "/modulo7/VstGenerales.aspx/FnRTipoCorreoV", // xxxx
        data: {}, /*{ data: jsonString }*/
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLCorreoTipoCorreo == "null") {
                $('#ddlCCorreoTipoCorreo').append($("<option> </option>").val("0").html("Seleccionar Tipo Correo"));  // xxxx id val html            
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLCorreoTipoCorreo == value.TipoCorreo) {
                        $('#ddlCCorreoTipoCorreo').append($("<option> </option>").val(value.IdTipoCorreo).html(value.TipoCorreo));  // xxxx id texto
                        VarJsIdTipoCorreo = value.IdTipoCorreo;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCCorreoTipoCorreo').append($("<option> </option>").val(value.IdTipoCorreo).html(value.TipoCorreo)); // id en un val y en html el nombre
            });
            VAlDDLCorreoTipoCorreo = "null";
        }
    });
}

function FnAlertaCorreo() {//nombre de la función xxxx

    switch (CRUDCorreo) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertCorreo = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertCorreo = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertCorreo = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertCorreo = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertCorreo = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertCorreo = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertCorreo = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertCorreo = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Correo Alert")//tttt
    }
    //alerta
    $('.bd-example-modal-sm .modal-content').addClass(VarJsColorAlertCorreo);//variable de color alerta xxxx
    $('.bd-example-modal-sm h5').text(VarJsTextoAlertCorreo);//variable de texto alerta xxxx
    $('.bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.bd-example-modal-sm').modal('hide');
        $('.bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertCorreo);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms
    console.log($("#secciontblCorreo.show").length)//tttt
    if ($("#secciontblCorreo.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxRCorreo();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNCorreo").modal("toggle");//nombre modal xxxx
}