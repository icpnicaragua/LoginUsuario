/*variable de tablas*/
var tablaIdentificacion;/*tabla mpodulo*/
var ModCIdentificacion = $('#modalNIdentificacion'); // modal 
//campos de tablas
var VarJsIdentificacionId = 0;
var VarJsIdentificacion = "";
var VarJsIdTipoIdentificacion = 0;
var VarJsIdPersona = 0;
//dddlist TipoIdentificacion
var VAlDDLIdentifiacionTipoIdentificacion = "null";// para guardar lo que está en la tabla y luego asignar al ddl

//igual para todos
var formIdentificacion = document.querySelector('#form1');

//variables crud
CRUDIdentificacion = "";
//variables alertas
var VarJsColorAlertIdentificacion = "";
var VarJsTextoAlertIdentificacion = "";
//variables existe
var EIdentificacion = true;

$('#tblPersona tbody').on('click', 'tr', function () {
    var tablaPersona = $('#tblPersona').DataTable();
    console.log('clicked: ' + tablaPersona.row(this).data()[0]);
    VarJsIdPersona = tablaPersona.row(this).data()[0];
    FnJsAjaxRIdentificacion(); //llama al ajax xxxx
    FnJSFillDdlIdentifiacionTipoIdentificacion();//cargar ddl
})

/*
$('#lbMostrarIdentificacion').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    
});
*/

function FnJsAjaxRIdentificacion() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnRIdentificacionV", // nombre de página y nombre de función xxxx
        data: JSON.stringify({// los parámetros de la sig línea
            IdPersona: VarJsIdPersona
        }), /*parametro: valor*/
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowIdentificacion(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowIdentificacion(data) {//3 llenar la tabla xxxx

    $('#tblIdentificacion').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaIdentificacion = $("#tblIdentificacion").DataTable({// variable nombre tabla xxxx

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
                    id: 'colIdentificacion'//se añade el id para ocultar xxxx
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
                filename: 'Identificación' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Identificación', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Identificación' //tttt
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
                filename: 'Identificacion' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
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
    tablaIdentificacion.buttons().container().addClass('form-inline');///variable xxxx

    for (var contIdentificacion = 0; contIdentificacion < data.length; contIdentificacion++) { // declarar variable de recorrido de arreglo data xxxx
        tablaIdentificacion.row.add([//sensitivecase:
            data[contIdentificacion].IdIdentificacion,//campos
            data[contIdentificacion].Identificacion,//campos
            data[contIdentificacion].ObjTipoIdentificacion.TipoIdentificacion,
            '<button value="editar" href="#modalNIdentificacion" data-toggle="modal" title="editar" class="btn btn-warning  btn-editIdentificacion"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNIdentificacion" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteIdentificacion"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNIdentificacion').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCIdentificacion(); // nombre función xxxx
    EIdentificacion = true; // variable xxxx

    FnJsBlockIdentificacion(); // nombre función xxxx
    FnJSFillDdlIdentifiacionTipoIdentificacion();
    CRUDIdentificacion = "C"; // nombre variable xxxx

    //campos xxxx
    VarJsIdentificacionId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsIdentificacion = ""; // cada campo tiene una variable, inicializar xxxx
    VarJsIdTipoIdentificacion = 0;
   // VarJsIdPersona = 0;

});
$(document).on('click', '.btn-editIdentificacion', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUIdentificacion();//nombre de función xxxx
    var dataIdentificacion = tablaIdentificacion.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsIdentificacionId = dataIdentificacion[0]; //id de la fila seleccionada
    $('#txtNuevoIdentificacion').val(dataIdentificacion[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsIdentificacion = dataIdentificacion[1]; // variable elemento, variable data, índice xxxx
    VAlDDLIdentifiacionTipoIdentificacion = (dataIdentificacion[2]);
    FnJSFillDdlIdentifiacionTipoIdentificacion();
    VarJsIdTipoIdentificacion = $('#ddlCIdentifiacionTipoIdentificacion').val();
    //VarJsIdPersona = 0;
    CRUDIdentificacion = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteIdentificacion', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDIdentificacion();//nombre de función xxxx
    EIdentificacion = false; // variable de existe xxxx


    FnJsBlockIdentificacion();//función bloquear xxxx
    var dataIdentificacion = tablaIdentificacion.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsIdentificacionId = dataIdentificacion[0]; //id de la fila seleccionada
    $('#txtNuevoIdentificacion').val(dataIdentificacion[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsIdentificacion = dataIdentificacion[1]; // variable elemento, variable data, índice xxxx
    VAlDDLIdentifiacionTipoIdentificacion = (dataIdentificacion[2]);
    FnJSFillDdlIdentifiacionTipoIdentificacion();

    CRUDIdentificacion = "D";
});

//pintar modal
function FnJsCIdentificacion() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoIdentificacion').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorIdentificacion").removeAttr("class");//quitar el atributo class
    $("#DivModBorIdentificacion").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaIdentificacion").removeAttr("class");//quitar el atributo class
    $("#DivModHeaIdentificacion").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitIdentificacion').text('Nuevo Identificacion');//tttt
    //cambiar el color icono btn
    $("#btnNueIdentificacion").removeAttr("class");//quitar el atributo class
    $("#btnNueIdentificacion").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNueIdentificacion i").removeAttr("class");
    $("#btnNueIdentificacion i").attr("class", "fa fa-save fa-2x");
    //color ddl
    $("#ddlCIdentifiacionTipoIdentificacion").removeAttr("class"); //uitar propiedades
    $("#ddlCIdentifiacionTipoIdentificacion").attr("class", "form-control border-success");//pintr roo
    //bloquear elementos
    $("#txtNuevoIdentificacion").attr('disabled', false); //variables de los elementos del modal xxxx
    $('#ddlCIdentifiacionTipoIdentificacion').attr('disabled', false);
    //vaciar elementos text de todo el modal
    $('#' + ModCIdentificacion[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUIdentificacion() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoIdentificacion').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorIdentificacion").removeAttr("class");//quitar el atributo class
    $("#DivModBorIdentificacion").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaIdentificacion").removeAttr("class");//quitar el atributo class
    $("#DivModHeaIdentificacion").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitIdentificacion').text('Editar Identificacion');//tttt
    //cambiar el color icono btn
    $("#btnNueIdentificacion").removeAttr("class");//quitar el atributo class
    $("#btnNueIdentificacion").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNueIdentificacion i").removeAttr("class");
    $("#btnNueIdentificacion i").attr("class", "fa fa-save fa-2x");
    //color ddl
    $("#ddlCIdentifiacionTipoIdentificacion").removeAttr("class"); //uitar propiedades
    $("#ddlCIdentifiacionTipoIdentificacion").attr("class", "form-control border-warning");//pintr roo
    //bloquear elementos
    $("#txtNuevoIdentificacion").attr('disabled', false); //variables de los elementos del modal xxxx
    $('#ddlCIdentifiacionTipoIdentificacion').attr('disabled', false);
    //vaciar elementos text de todo el modal
    $('#' + ModCIdentificacion[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDIdentificacion() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoIdentificacion').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorIdentificacion").removeAttr("class");//quitar el atributo class
    $("#DivModBorIdentificacion").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaIdentificacion").removeAttr("class");//quitar el atributo class
    $("#DivModHeaIdentificacion").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitIdentificacion').text('Eliminar Identificacion');//tttt
    //cambiar el color icono btn
    $("#btnNueIdentificacion").removeAttr("class");//quitar el atributo class
    $("#btnNueIdentificacion").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNueIdentificacion i").removeAttr("class");
    $("#btnNueIdentificacion i").attr("class", "fa fa-trash fa-2x");//ícono
    //color ddl
    $("#ddlCIdentifiacionTipoIdentificacion").removeAttr("class"); //uitar propiedades
    $("#ddlCIdentifiacionTipoIdentificacion").attr("class", "form-control border-danger");//pintr roo
    //bloquear elementos
    $("#txtNuevoIdentificacion").attr('disabled', true); //variables de los elementos del modal xxxx
    $('#ddlCIdentifiacionTipoIdentificacion').attr('disabled', true);
    //vaciar elementos text de todo el modal
    $('#' + ModCIdentificacion[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockIdentificacion() {// nombre función xxxx

    if (EIdentificacion == true) {// variables xxxx
        $("#btnNueIdentificacion").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNueIdentificacion").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter

    }
    else if (EIdentificacion == false) {// variables xxxx
        $("#btnNueIdentificacion").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNueIdentificacion").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter


    }
}

//guardar CUD
$('#btnNueIdentificacion').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formIdentificacion.checkValidity()) {
        switch (CRUDIdentificacion) { // variable crud xxxx
            case "C":
                FnJsAjaxCIdentificacion(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUIdentificacion();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDIdentificacion();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Identificacion");/////tttt
        }
    }
    console.log(formIdentificacion.checkValidity());
});

//ajax CUD
function FnJsAjaxCIdentificacion() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnCIdentificacionV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            Identificacion: VarJsIdentificacion,
            IdTipoIdentificacion: VarJsIdTipoIdentificacion,
            IdPersona: VarJsIdPersona
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Identificacion Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDIdentificacion = "error"
                console.log("No se pudo agregar Tipo de indentificación");//
            }
            FnAlertaIdentificacion(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUIdentificacion() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnUIdentificacionV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdIdentificacion: VarJsIdentificacionId,
            Identificacion: VarJsIdentificacion,
            IdTipoIdentificacion: VarJsIdTipoIdentificacion

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Identificacion Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDIdentificacion = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaIdentificacion();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDIdentificacion() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnDIdentificacionV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdIdentificacion: VarJsIdentificacionId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Identificacion Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDIdentificacion = "error"
                console.log("No se pudo Eliminar Identificacion");////tttt
            }
            FnAlertaIdentificacion(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxEIdentificacion() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnEIdentificacionV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdIdentificacion: VarJsIdentificacionId,
            Identificacion: VarJsIdentificacion,
            IdTipoIdentificacion: VarJsIdTipoIdentificacion
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                EIdentificacion = true; // variable existe xxxx
                $('#lblexistenuevoIdentificacion').text("Existe Identificacion");// id etiqueta texto etiqueta //tttt
                FnJsBlockIdentificacion();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                EIdentificacion = false;// variable existe xxxx
                $('#lblexistenuevoIdentificacion').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockIdentificacion(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExisteIdentificacion() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoIdentificacion').val().length >= 3 && $('#ddlCIdentifiacionTipoIdentificacion').val() > 0) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoIdentificacion').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsIdentificacion = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteIdentificacion()) {//nombre función verificar existe xxxx
        FnJsAjaxEIdentificacion(); // llamar todos los existes xxxx

    }
});

$('#ddlCIdentifiacionTipoIdentificacion').change(function (e) {
    VarJsIdTipoIdentificacion = $('#ddlCIdentifiacionTipoIdentificacion').val();
    if (VerificarExisteIdentificacion()) {
        FnJsAjaxEIdentificacion();
    }
});

function FnJSFillDdlIdentifiacionTipoIdentificacion() {
    $('#ddlCIdentifiacionTipoIdentificacion').empty(); // xxxx id
    $.ajax({
        type: "POST",
        url: "/modulo7/VstGenerales.aspx/FnRTipoIdentificacionV", // xxxx
        data: {}, /*{ data: jsonString }*/
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLIdentifiacionTipoIdentificacion == "null") {
                $('#ddlCIdentifiacionTipoIdentificacion').append($("<option> </option>").val("0").html("Seleccionar TipoIdentificacion"));  // xxxx id val html            
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLIdentifiacionTipoIdentificacion == value.TipoIdentificacion) {
                        $('#ddlCIdentifiacionTipoIdentificacion').append($("<option> </option>").val(value.IdTipoIdentificacion).html(value.TipoIdentificacion));  // xxxx id texto
                        VarJsIdTipoIdentificacion = value.IdTipoIdentificacion;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCIdentifiacionTipoIdentificacion').append($("<option> </option>").val(value.IdTipoIdentificacion).html(value.TipoIdentificacion)); // id en un val y en html el nombre
            });
            VAlDDLIdentifiacionTipoIdentificacion = "null";
        }
    });
}

function FnAlertaIdentificacion() {//nombre de la función xxxx

    switch (CRUDIdentificacion) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertIdentificacion = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertIdentificacion = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertIdentificacion = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertIdentificacion = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertIdentificacion = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertIdentificacion = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertIdentificacion = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertIdentificacion = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Identificacion Alert")//tttt
    }
    //alerta
    $('.modal bd-example-modal-sm .modal-content').addClass(VarJsColorAlertIdentificacion);//variable de color alerta xxxx
    $('.modal bd-example-modal-sm h5').text(VarJsTextoAlertIdentificacion);//variable de texto alerta xxxx
    $('.modal bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.modal bd-example-modal-sm').modal('hide');
        $('.modal bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertIdentificacion);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblIdentificacion.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxRIdentificacion();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNIdentificacion").modal("toggle");//nombre modal xxxx
}