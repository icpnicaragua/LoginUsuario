/*variable de tablas*/
var tablaRack;/*tabla mpodulo*/
var ModCRack = $('#modalNRack'); // modal 
//campos de tablas
var VarJsRackId = 0;
var VarJsRack = "";
var VarJsIdSeccion = 0;
//dddlist Seccion
var VAlDDLRackSeccion = "null";// para guardar lo que está en la tabla y luego asignar al ddl

//igual para todos
var formRack = document.querySelector('#form1');

//variables crud
CRUDRack = "";
//variables alertas
var VarJsColorAlertRack = "";
var VarJsTextoAlertRack = "";
//variables existe
var ERack = true;


$('#lbMostrarRack').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    FnJsAjaxRRack(); //llama al ajax xxxx
    FnJSFillDdlRackSeccion();//cargar ddl
});

function FnJsAjaxRRack() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo3/VstBodega.aspx/FnRRackV", // nombre de página y nombre de función xxxx
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowRack(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowRack(data) {//3 llenar la tabla xxxx

    $('#tblRack').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaRack = $("#tblRack").DataTable({// variable nombre tabla xxxx

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
                    id: 'colRack'//se añade el id para ocultar xxxx
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
                filename: 'Rack' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Rack', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Rack' //tttt
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
                filename: 'Rack' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
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
    tablaRack.buttons().container().addClass('form-inline');///variable xxxx

    for (var contRack = 0; contRack < data.length; contRack++) { // declarar variable de recorrido de arreglo data xxxx
        tablaRack.row.add([//sensitivecase:
            data[contRack].IdRack,//campos
            data[contRack].Rack,//campos
            data[contRack].ObjSeccion.Seccion,
            '<button value="editar" href="#modalNRack" data-toggle="modal" title="editar" class="btn btn-warning  btn-editRack"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNRack" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteRack"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNRack').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCRack(); // nombre función xxxx
    ERack = true; // variable xxxx

    FnJsBlockRack(); // nombre función xxxx
    FnJSFillDdlRackSeccion();
    CRUDRack = "C"; // nombre variable xxxx

    //campos xxxx
    VarJsRackId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsRack = ""; // cada campo tiene una variable, inicializar xxxx
    VarJsIdSeccion = 0;

});
$(document).on('click', '.btn-editRack', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsURack();//nombre de función xxxx
    var dataRack = tablaRack.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsRackId = dataRack[0]; //id de la fila seleccionada
    $('#txtNuevoRack').val(dataRack[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsRack = dataRack[1]; // variable elemento, variable data, índice xxxx
    VAlDDLRackSeccion = (dataRack[2]);
    FnJSFillDdlRackSeccion();
    VarJsIdSeccion = $('#ddlCRackSeccion').val();
    CRUDRack = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteRack', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDRack();//nombre de función xxxx
    ERack = false; // variable de existe xxxx


    FnJsBlockRack();//función bloquear xxxx
    var dataRack = tablaRack.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsRackId = dataRack[0]; //id de la fila seleccionada
    $('#txtNuevoRack').val(dataRack[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsRack = dataRack[1]; // variable elemento, variable data, índice xxxx
    VAlDDLRackSeccion = (dataRack[2]);
    FnJSFillDdlRackSeccion();

    CRUDRack = "D";
});

//pintar modal
function FnJsCRack() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoRack').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorRack").removeAttr("class");//quitar el atributo class
    $("#DivModBorRack").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaRack").removeAttr("class");//quitar el atributo class
    $("#DivModHeaRack").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitRack').text('Nuevo Rack');//tttt
    //cambiar el color icono btn
    $("#btnNueRack").removeAttr("class");//quitar el atributo class
    $("#btnNueRack").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNueRack i").removeAttr("class");
    $("#btnNueRack i").attr("class", "fa fa-save fa-2x");
    //color ddl
    $("#ddlCRackSeccion").removeAttr("class"); //uitar propiedades
    $("#ddlCRackSeccion").attr("class", "form-control border-success");//pintr roo
    //bloquear elementos
    $("#txtNuevoRack").attr('disabled', false); //variables de los elementos del modal xxxx
    $('#ddlCRackSeccion').attr('disabled', false);
    //vaciar elementos text de todo el modal
    $('#' + ModCRack[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsURack() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoRack').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorRack").removeAttr("class");//quitar el atributo class
    $("#DivModBorRack").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaRack").removeAttr("class");//quitar el atributo class
    $("#DivModHeaRack").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitRack').text('Editar Rack');//tttt
    //cambiar el color icono btn
    $("#btnNueRack").removeAttr("class");//quitar el atributo class
    $("#btnNueRack").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNueRack i").removeAttr("class");
    $("#btnNueRack i").attr("class", "fa fa-save fa-2x");
    //color ddl
    $("#ddlCRackSeccion").removeAttr("class"); //uitar propiedades
    $("#ddlCRackSeccion").attr("class", "form-control border-warning");//pintr roo
    //bloquear elementos
    $("#txtNuevoRack").attr('disabled', false); //variables de los elementos del modal xxxx
    $('#ddlCRackSeccion').attr('disabled', false);
    //vaciar elementos text de todo el modal
    $('#' + ModCRack[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDRack() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoRack').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorRack").removeAttr("class");//quitar el atributo class
    $("#DivModBorRack").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaRack").removeAttr("class");//quitar el atributo class
    $("#DivModHeaRack").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitRack').text('Eliminar Rack');//tttt
    //cambiar el color icono btn
    $("#btnNueRack").removeAttr("class");//quitar el atributo class
    $("#btnNueRack").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNueRack i").removeAttr("class");
    $("#btnNueRack i").attr("class", "fa fa-trash fa-2x");//ícono
    //color ddl
    $("#ddlCRackSeccion").removeAttr("class"); //uitar propiedades
    $("#ddlCRackSeccion").attr("class", "form-control border-danger");//pintr roo
    //bloquear elementos
    $("#txtNuevoRack").attr('disabled', true); //variables de los elementos del modal xxxx
    $('#ddlCRackSeccion').attr('disabled', true);
    //vaciar elementos text de todo el modal
    $('#' + ModCRack[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockRack() {// nombre función xxxx

    if (ERack == true) {// variables xxxx
        $("#btnNueRack").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNueRack").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter

    }
    else if (ERack == false) {// variables xxxx
        $("#btnNueRack").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNueRack").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter


    }
}

//guardar CUD
$('#btnNueRack').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formRack.checkValidity()) {
        switch (CRUDRack) { // variable crud xxxx
            case "C":
                FnJsAjaxCRack(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxURack();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDRack();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Rack");/////tttt
        }
    }
    console.log(formRack.checkValidity());
});

//ajax CUD
function FnJsAjaxCRack() {
    $.ajax({
        url: "/modulo3/VstBodega.aspx/FnCRackV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            Rack: VarJsRack,
            IdSeccion: VarJsIdSeccion
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Rack Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDRack = "error"
                console.log("No se pudo agregar Rack");//
            }
            FnAlertaRack(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxURack() {
    $.ajax({
        url: "/modulo3/VstBodega.aspx/FnURackV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdRack: VarJsRackId,
            Rack: VarJsRack,
            IdSeccion: VarJsIdSeccion

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Rack Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDRack = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaRack();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDRack() {
    $.ajax({
        url: "/modulo3/VstBodega.aspx/FnDRackV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdRack: VarJsRackId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Rack Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDRack = "error"
                console.log("No se pudo Eliminar Rack");////tttt
            }
            FnAlertaRack(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxERack() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo3/VstBodega.aspx/FnERackV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdRack: VarJsRackId,
            Rack: VarJsRack,
            IdSeccion: VarJsIdSeccion
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                ERack = true; // variable existe xxxx
                $('#lblexistenuevoRack').text("Existe Rack");// id etiqueta texto etiqueta //tttt
                FnJsBlockRack();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                ERack = false;// variable existe xxxx
                $('#lblexistenuevoRack').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockRack(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExisteRack() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoRack').val().length >= 3 && $('#ddlCRackSeccion').val() > 0) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoRack').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsRack = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteRack()) {//nombre función verificar existe xxxx
        FnJsAjaxERack(); // llamar todos los existes xxxx

    }
});

$('#ddlCRackSeccion').change(function (e) {
    VarJsIdSeccion = $('#ddlCRackSeccion').val();
    if (VerificarExisteRack()) {
        FnJsAjaxERack();
    }
});

function FnJSFillDdlRackSeccion() {
    $('#ddlCRackSeccion').empty(); // xxxx id
    $.ajax({
        type: "POST",
        url: "/modulo3/VstBodega.aspx/FnRSeccionV", // xxxx
        data: {}, /*{ data: jsonString }*/
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLRackSeccion == "null") {
                $('#ddlCRackSeccion').append($("<option> </option>").val("0").html("Seleccionar Seccion"));  // xxxx id val html            
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLRackSeccion == value.Seccion) {
                        $('#ddlCRackSeccion').append($("<option> </option>").val(value.IdSeccion).html(value.Seccion));  // xxxx id texto
                        VarJsIdSeccion = value.IdSeccion;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCRackSeccion').append($("<option> </option>").val(value.IdSeccion).html(value.Seccion)); // id en un val y en html el nombre
            });
            VAlDDLRackSeccion = "null";
        }
    });
}

function FnAlertaRack() {//nombre de la función xxxx

    switch (CRUDRack) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertRack = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertRack = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertRack = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertRack = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertRack = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertRack = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertRack = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertRack = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Rack Alert")//tttt
    }
    //alerta
    $('#alertaBodega .modal-content').addClass(VarJsColorAlertRack);//variable de color alerta xxxx
    $('#alertaBodega h5').text(VarJsTextoAlertRack);//variable de texto alerta xxxx
    $('#alertaBodega').modal('show');
    setTimeout(function () {
        $('#alertaBodega').modal('hide');
        $('#alertaBodega .modal-content').removeClass(VarJsColorAlertRack);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblRack.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxRRack();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNRack").modal("toggle");//nombre modal xxxx
}