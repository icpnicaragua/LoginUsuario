/*variable de tablas*/
var tablaSeccion;/*tabla mpodulo*/
var ModCSeccion = $('#modalNSeccion'); // modal 
//campos de tablas
var VarJsSeccionId = 0;
var VarJsSeccion = "";
var VarJsIdBodega = 0;
//dddlist Bodega
var VAlDDLSeccionBodega = "null";// para guardar lo que está en la tabla y luego asignar al ddl

//igual para todos
var formSeccion = document.querySelector('#form1');

//variables crud
CRUDSeccion = "";
//variables alertas
var VarJsColorAlertSeccion = "";
var VarJsTextoAlertSeccion = "";
//variables existe
var ESeccion = true;


$('#lbMostrarSeccion').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    FnJsAjaxRSeccion(); //llama al ajax xxxx
    FnJSFillDdlSeccionBodega();//cargar ddl
});

function FnJsAjaxRSeccion() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo3/VstBodega.aspx/FnRSeccionV", // nombre de página y nombre de función xxxx
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowSeccion(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowSeccion(data) {//3 llenar la tabla xxxx

    $('#tblSeccion').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaSeccion = $("#tblSeccion").DataTable({// variable nombre tabla xxxx

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
                    id: 'colSeccion'//se añade el id para ocultar xxxx
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
                filename: 'Sección' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Seccion', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Sección' //tttt
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
                filename: 'Seccion' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
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
    tablaSeccion.buttons().container().addClass('form-inline');///variable xxxx

    for (var contSeccion = 0; contSeccion < data.length; contSeccion++) { // declarar variable de recorrido de arreglo data xxxx
        tablaSeccion.row.add([//sensitivecase:
            data[contSeccion].IdSeccion,//campos
            data[contSeccion].Seccion,//campos
            data[contSeccion].ObjBodega.NombreBodega,
            '<button value="editar" href="#modalNSeccion" data-toggle="modal" title="editar" class="btn btn-warning  btn-editSeccion"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNSeccion" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteSeccion"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNSeccion').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCSeccion(); // nombre función xxxx
    ESeccion = true; // variable xxxx

    FnJsBlockSeccion(); // nombre función xxxx
    FnJSFillDdlSeccionBodega();
    CRUDSeccion = "C"; // nombre variable xxxx

    //campos xxxx
    VarJsSeccionId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsSeccion = ""; // cada campo tiene una variable, inicializar xxxx
    VarJsIdBodega = 0;

});
$(document).on('click', '.btn-editSeccion', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUSeccion();//nombre de función xxxx
    var dataSeccion = tablaSeccion.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsSeccionId = dataSeccion[0]; //id de la fila seleccionada
    $('#txtNuevoSeccion').val(dataSeccion[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsSeccion = dataSeccion[1]; // variable elemento, variable data, índice xxxx
    VAlDDLSeccionBodega = (dataSeccion[2]);
    FnJSFillDdlSeccionBodega();
    VarJsIdBodega = $('#ddlCSeccionBodega').val();
    CRUDSeccion = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteSeccion', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDSeccion();//nombre de función xxxx
    ESeccion = false; // variable de existe xxxx


    FnJsBlockSeccion();//función bloquear xxxx
    var dataSeccion = tablaSeccion.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsSeccionId = dataSeccion[0]; //id de la fila seleccionada
    $('#txtNuevoSeccion').val(dataSeccion[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsSeccion = dataSeccion[1]; // variable elemento, variable data, índice xxxx
    VAlDDLSeccionBodega = (dataSeccion[2]);
    FnJSFillDdlSeccionBodega();

    CRUDSeccion = "D";
});

//pintar modal
function FnJsCSeccion() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoSeccion').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorSeccion").removeAttr("class");//quitar el atributo class
    $("#DivModBorSeccion").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaSeccion").removeAttr("class");//quitar el atributo class
    $("#DivModHeaSeccion").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitSeccion').text('Nuevo Seccion');//tttt
    //cambiar el color icono btn
    $("#btnNueSeccion").removeAttr("class");//quitar el atributo class
    $("#btnNueSeccion").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNueSeccion i").removeAttr("class");
    $("#btnNueSeccion i").attr("class", "fa fa-save fa-2x");
    //color ddl
    $("#ddlCSeccionBodega").removeAttr("class"); //uitar propiedades
    $("#ddlCSeccionBodega").attr("class", "form-control border-success");//pintr roo
    //bloquear elementos
    $("#txtNuevoSeccion").attr('disabled', false); //variables de los elementos del modal xxxx
    $('#ddlCSeccionBodega').attr('disabled', false);
    //vaciar elementos text de todo el modal
    $('#' + ModCSeccion[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUSeccion() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoSeccion').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorSeccion").removeAttr("class");//quitar el atributo class
    $("#DivModBorSeccion").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaSeccion").removeAttr("class");//quitar el atributo class
    $("#DivModHeaSeccion").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitSeccion').text('Editar Seccion');//tttt
    //cambiar el color icono btn
    $("#btnNueSeccion").removeAttr("class");//quitar el atributo class
    $("#btnNueSeccion").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNueSeccion i").removeAttr("class");
    $("#btnNueSeccion i").attr("class", "fa fa-save fa-2x");
    //color ddl
    $("#ddlCSeccionBodega").removeAttr("class"); //uitar propiedades
    $("#ddlCSeccionBodega").attr("class", "form-control border-warning");//pintr roo
    //bloquear elementos
    $("#txtNuevoSeccion").attr('disabled', false); //variables de los elementos del modal xxxx
    $('#ddlCSeccionBodega').attr('disabled', false);
    //vaciar elementos text de todo el modal
    $('#' + ModCSeccion[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDSeccion() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoSeccion').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorSeccion").removeAttr("class");//quitar el atributo class
    $("#DivModBorSeccion").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaSeccion").removeAttr("class");//quitar el atributo class
    $("#DivModHeaSeccion").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitSeccion').text('Eliminar Seccion');//tttt
    //cambiar el color icono btn
    $("#btnNueSeccion").removeAttr("class");//quitar el atributo class
    $("#btnNueSeccion").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNueSeccion i").removeAttr("class");
    $("#btnNueSeccion i").attr("class", "fa fa-trash fa-2x");//ícono
    //color ddl
    $("#ddlCSeccionBodega").removeAttr("class"); //uitar propiedades
    $("#ddlCSeccionBodega").attr("class", "form-control border-danger");//pintr roo
    //bloquear elementos
    $("#txtNuevoSeccion").attr('disabled', true); //variables de los elementos del modal xxxx
    $('#ddlCSeccionBodega').attr('disabled', true);
    //vaciar elementos text de todo el modal
    $('#' + ModCSeccion[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockSeccion() {// nombre función xxxx

    if (ESeccion == true) {// variables xxxx
        $("#btnNueSeccion").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNueSeccion").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter

    }
    else if (ESeccion == false) {// variables xxxx
        $("#btnNueSeccion").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNueSeccion").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter


    }
}

//guardar CUD
$('#btnNueSeccion').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formSeccion.checkValidity()) {
        switch (CRUDSeccion) { // variable crud xxxx
            case "C":
                FnJsAjaxCSeccion(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUSeccion();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDSeccion();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Seccion");/////tttt
        }
    }
    console.log(formSeccion.checkValidity());
});

//ajax CUD
function FnJsAjaxCSeccion() {
    $.ajax({
        url: "/modulo3/VstBodega.aspx/FnCSeccionV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            Seccion: VarJsSeccion,
            IdBodega: VarJsIdBodega
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Sección Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDSeccion = "error"
                console.log("No se pudo agregar Sección");//
            }
            FnAlertaSeccion(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUSeccion() {
    $.ajax({
        url: "/modulo3/VstBodega.aspx/FnUSeccionV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdSeccion: VarJsSeccionId,
            Seccion: VarJsSeccion,
            IdBodega: VarJsIdBodega

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Seccion Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDSeccion = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaSeccion();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDSeccion() {
    $.ajax({
        url: "/modulo3/VstBodega.aspx/FnDSeccionV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdSeccion: VarJsSeccionId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Seccion Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDSeccion = "error"
                console.log("No se pudo Eliminar Sección");////tttt
            }
            FnAlertaSeccion(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxESeccion() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo3/VstBodega.aspx/FnESeccionV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdSeccion: VarJsSeccionId,
            Seccion: VarJsSeccion,
            IdBodega: VarJsIdBodega
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                ESeccion = true; // variable existe xxxx
                $('#lblexistenuevoSeccion').text("Existe Sección");// id etiqueta texto etiqueta //tttt
                FnJsBlockSeccion();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                ESeccion = false;// variable existe xxxx
                $('#lblexistenuevoSeccion').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockSeccion(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExisteSeccion() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoSeccion').val().length >= 2 && $('#ddlCSeccionBodega').val() > 0) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoSeccion').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsSeccion = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteSeccion()) {//nombre función verificar existe xxxx
        FnJsAjaxESeccion(); // llamar todos los existes xxxx

    }
});

$('#ddlCSeccionBodega').change(function (e) {
    VarJsIdBodega = $('#ddlCSeccionBodega').val();
    if (VerificarExisteSeccion()) {
        FnJsAjaxESeccion();
    }
});

function FnJSFillDdlSeccionBodega() {
    $('#ddlCSeccionBodega').empty(); // xxxx id
    $.ajax({
        type: "POST",
        url: "/modulo3/VstBodega.aspx/FnRBodegaV", // xxxx
        data: {}, /*{ data: jsonString }*/
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLSeccionBodega == "null") {
                $('#ddlCSeccionBodega').append($("<option> </option>").val("0").html("Seleccionar Bodega"));  // xxxx id val html            
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLSeccionBodega == value.NombreBodega) {
                        $('#ddlCSeccionBodega').append($("<option> </option>").val(value.IdBodega).html(value.NombreBodega));  // xxxx id texto
                        VarJsIdBodega = value.IdBodega;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCSeccionBodega').append($("<option> </option>").val(value.IdBodega).html(value.NombreBodega)); // id en un val y en html el nombre
            });
            VAlDDLSeccionBodega = "null";
        }
    });
}

function FnAlertaSeccion() {//nombre de la función xxxx

    switch (CRUDSeccion) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertSeccion = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertSeccion = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertSeccion = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertSeccion = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertSeccion = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertSeccion = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertSeccion = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertSeccion = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Seccion Alert")//tttt
    }
    //alerta
    $('#alertaBodega .modal-content').addClass(VarJsColorAlertSeccion);//variable de color alerta xxxx
    $('#alertaBodega h5').text(VarJsTextoAlertSeccion);//variable de texto alerta xxxx
    $('#alertaBodega').modal('show');
    setTimeout(function () {
        $('#alertaBodega').modal('hide');
        $('#alertaBodega .modal-content').removeClass(VarJsColorAlertSeccion);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblSeccion.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxRSeccion();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNSeccion").modal("toggle");//nombre modal xxxx
}