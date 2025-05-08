/*variable de tablas*/
var tablaTelefono;/*tabla mpodulo*/
var ModCTelefono = $('#modalNTelefono'); // modal 
//campos de tablas
var VarJsTelefonoId = 0;
var VarJsTelefono = "";
var VarJsIdTipoTelefono = 0;
var VarJsIdPersona = 0;
//dddlist TipoTelefono
var VAlDDLTelefonoTipoTelefono = "null";// para guardar lo que está en la tabla y luego asignar al ddl

//igual para todos
var formTelefono = document.querySelector('#form1');

//variables crud
CRUDTelefono = "";
//variables alertas
var VarJsColorAlertTelefono = "";
var VarJsTextoAlertTelefono = "";
//variables existe
var ETelefono = true;

$('#tblPersona tbody').on('click', 'tr', function () {
    var tablaPersona = $('#tblPersona').DataTable();
    //console.log('clicked: ' + tablaPersona.row(this).data()[0]);
    VarJsIdPersona = tablaPersona.row(this).data()[0];
    FnJsAjaxRTelefono(); //llama al ajax xxxx
    FnJSFillDdlTelefonoTipoTelefono();//cargar ddl
    $("#secciontblTelefono").attr('class', 'table-responsive collapse show');//No hay btn de show table
})

/*
$('#lbMostrarTelefono').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    
});
*/

function FnJsAjaxRTelefono() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnRTelefonoV", // nombre de página y nombre de función xxxx
        data: JSON.stringify({// los parámetros de la sig línea
            IdPersona: VarJsIdPersona
        }), /*parametro: valor*/
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowTelefono(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowTelefono(data) {//3 llenar la tabla xxxx

    $('#tblTelefono').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaTelefono = $("#tblTelefono").DataTable({// variable nombre tabla xxxx

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
                    id: 'colTelefono'//se añade el id para ocultar xxxx
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
                filename: 'Teléfono' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Teléfono', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Teléfono' //tttt
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
                filename: 'Teléfono' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
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
    tablaTelefono.buttons().container().addClass('form-inline');///variable xxxx

    for (var contTelefono = 0; contTelefono < data.length; contTelefono++) { // declarar variable de recorrido de arreglo data xxxx
        tablaTelefono.row.add([//sensitivecase:
            data[contTelefono].IdTelefono,//campos
            data[contTelefono].Telefono,//campos
            data[contTelefono].ObjTipoTelefono.TipoTelefono,
            '<button value="editar" href="#modalNTelefono" data-toggle="modal" title="editar" class="btn btn-warning  btn-editTelefono"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNTelefono" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteTelefono"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNTelefono').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCTelefono(); // nombre función xxxx
    ETelefono = true; // variable xxxx

    FnJsBlockTelefono(); // nombre función xxxx
    FnJSFillDdlTelefonoTipoTelefono();
    CRUDTelefono = "C"; // nombre variable xxxx

    //campos xxxx
    VarJsTelefonoId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsTelefono = ""; // cada campo tiene una variable, inicializar xxxx
    VarJsIdTipoTelefono = 0;
    // VarJsIdPersona = 0;

});
$(document).on('click', '.btn-editTelefono', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUTelefono();//nombre de función xxxx
    var dataTelefono = tablaTelefono.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsTelefonoId = dataTelefono[0]; //id de la fila seleccionada
    $('#txtNuevoTelefono').val(dataTelefono[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsTelefono = dataTelefono[1]; // variable elemento, variable data, índice xxxx
    VAlDDLTelefonoTipoTelefono = (dataTelefono[2]);
    FnJSFillDdlTelefonoTipoTelefono();
    VarJsIdTipoTelefono = $('#ddlCTelefonoTipoTelefono').val();
    //VarJsIdPersona = 0;
    CRUDTelefono = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteTelefono', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDTelefono();//nombre de función xxxx
    ETelefono = false; // variable de existe xxxx


    FnJsBlockTelefono();//función bloquear xxxx
    var dataTelefono = tablaTelefono.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsTelefonoId = dataTelefono[0]; //id de la fila seleccionada
    $('#txtNuevoTelefono').val(dataTelefono[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsTelefono = dataTelefono[1]; // variable elemento, variable data, índice xxxx
    VAlDDLTelefonoTipoTelefono = (dataTelefono[2]);
    FnJSFillDdlTelefonoTipoTelefono();

    CRUDTelefono = "D";
});

//pintar modal
function FnJsCTelefono() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoTelefono').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorTelefono").removeAttr("class");//quitar el atributo class
    $("#DivModBorTelefono").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaTelefono").removeAttr("class");//quitar el atributo class
    $("#DivModHeaTelefono").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitTelefono').text('Nuevo Teléfono');//tttt
    //cambiar el color icono btn
    $("#btnNueTelefono").removeAttr("class");//quitar el atributo class
    $("#btnNueTelefono").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNueTelefono i").removeAttr("class");
    $("#btnNueTelefono i").attr("class", "fa fa-save fa-2x");
    //color ddl
    $("#ddlCTelefonoTipoTelefono").removeAttr("class"); //uitar propiedades
    $("#ddlCTelefonoTipoTelefono").attr("class", "form-control border-success");//pintr roo
    //bloquear elementos
    $("#txtNuevoTelefono").attr('disabled', false); //variables de los elementos del modal xxxx
    $('#ddlCTelefonoTipoTelefono').attr('disabled', false);
    //vaciar elementos text de todo el modal
    $('#' + ModCTelefono[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUTelefono() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoTelefono').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorTelefono").removeAttr("class");//quitar el atributo class
    $("#DivModBorTelefono").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaTelefono").removeAttr("class");//quitar el atributo class
    $("#DivModHeaTelefono").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitTelefono').text('Editar Teléfono');//tttt
    //cambiar el color icono btn
    $("#btnNueTelefono").removeAttr("class");//quitar el atributo class
    $("#btnNueTelefono").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNueTelefono i").removeAttr("class");
    $("#btnNueTelefono i").attr("class", "fa fa-save fa-2x");
    //color ddl
    $("#ddlCTelefonoTipoTelefono").removeAttr("class"); //uitar propiedades
    $("#ddlCTelefonoTipoTelefono").attr("class", "form-control border-warning");//pintr roo
    //bloquear elementos
    $("#txtNuevoTelefono").attr('disabled', false); //variables de los elementos del modal xxxx
    $('#ddlCTelefonoTipoTelefono').attr('disabled', false);
    //vaciar elementos text de todo el modal
    $('#' + ModCTelefono[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDTelefono() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoTelefono').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorTelefono").removeAttr("class");//quitar el atributo class
    $("#DivModBorTelefono").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaTelefono").removeAttr("class");//quitar el atributo class
    $("#DivModHeaTelefono").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitTelefono').text('Eliminar Teléfono');//tttt
    //cambiar el color icono btn
    $("#btnNueTelefono").removeAttr("class");//quitar el atributo class
    $("#btnNueTelefono").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNueTelefono i").removeAttr("class");
    $("#btnNueTelefono i").attr("class", "fa fa-trash fa-2x");//ícono
    //color ddl
    $("#ddlCTelefonoTipoTelefono").removeAttr("class"); //uitar propiedades
    $("#ddlCTelefonoTipoTelefono").attr("class", "form-control border-danger");//pintr roo
    //bloquear elementos
    $("#txtNuevoTelefono").attr('disabled', true); //variables de los elementos del modal xxxx
    $('#ddlCTelefonoTipoTelefono').attr('disabled', true);
    //vaciar elementos text de todo el modal
    $('#' + ModCTelefono[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockTelefono() {// nombre función xxxx

    if (ETelefono == true) {// variables xxxx
        $("#btnNueTelefono").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNueTelefono").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter

    }
    else if (ETelefono == false) {// variables xxxx
        $("#btnNueTelefono").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNueTelefono").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter


    }
}

//guardar CUD
$('#btnNueTelefono').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formTelefono.checkValidity()) {
        switch (CRUDTelefono) { // variable crud xxxx
            case "C":
                FnJsAjaxCTelefono(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUTelefono();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDTelefono();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Teléfono");/////tttt
        }
    }
    console.log(formTelefono.checkValidity());
});

//ajax CUD
function FnJsAjaxCTelefono() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnCTelefonoV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            Telefono: VarJsTelefono,
            IdTipoTelefono: VarJsIdTipoTelefono,
            IdPersona: VarJsIdPersona
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Teléfono Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDTelefono = "error"
                console.log("No se pudo agregar Tipo de indentificación");//
            }
            FnAlertaTelefono(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUTelefono() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnUTelefonoV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdTelefono: VarJsTelefonoId,
            Telefono: VarJsTelefono,
            IdTipoTelefono: VarJsIdTipoTelefono

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Teléfono Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDTelefono = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaTelefono();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDTelefono() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnDTelefonoV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdTelefono: VarJsTelefonoId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Teléfono Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDTelefono = "error"
                console.log("No se pudo Eliminar Teléfono");////tttt
            }
            FnAlertaTelefono(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxETelefono() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnETelefonoV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdTelefono: VarJsTelefonoId,
            Telefono: VarJsTelefono,
            IdTipoTelefono: VarJsIdTipoTelefono,
            IdPersona: VarJsIdPersona
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                ETelefono = true; // variable existe xxxx
                $('#lblexistenuevoTelefono').text("Existe Teléfono");// id etiqueta texto etiqueta //tttt
                FnJsBlockTelefono();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                ETelefono = false;// variable existe xxxx
                $('#lblexistenuevoTelefono').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockTelefono(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExisteTelefono() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoTelefono').val().length >= 3 && $('#ddlCTelefonoTipoTelefono').val() > 0) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoTelefono').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsTelefono = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteTelefono()) {//nombre función verificar existe xxxx
        FnJsAjaxETelefono(); // llamar todos los existes xxxx

    }
});

$('#ddlCTelefonoTipoTelefono').change(function (e) {
    VarJsIdTipoTelefono = $('#ddlCTelefonoTipoTelefono').val();
    if (VerificarExisteTelefono()) {
        FnJsAjaxETelefono();
    }
});

function FnJSFillDdlTelefonoTipoTelefono() {
    $('#ddlCTelefonoTipoTelefono').empty(); // xxxx id
    $.ajax({
        type: "POST",
        url: "/modulo7/VstGenerales.aspx/FnRTipoTelefonoV", // xxxx
        data: {}, /*{ data: jsonString }*/
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLTelefonoTipoTelefono == "null") {
                $('#ddlCTelefonoTipoTelefono').append($("<option> </option>").val("0").html("Seleccionar Tipo Teléfono"));  // xxxx id val html            
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLTelefonoTipoTelefono == value.TipoTelefono) {
                        $('#ddlCTelefonoTipoTelefono').append($("<option> </option>").val(value.IdTipoTelefono).html(value.TipoTelefono));  // xxxx id texto
                        VarJsIdTipoTelefono = value.IdTipoTelefono;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCTelefonoTipoTelefono').append($("<option> </option>").val(value.IdTipoTelefono).html(value.TipoTelefono)); // id en un val y en html el nombre
            });
            VAlDDLTelefonoTipoTelefono = "null";
        }
    });
}

function FnAlertaTelefono() {//nombre de la función xxxx

    switch (CRUDTelefono) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertTelefono = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertTelefono = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertTelefono = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertTelefono = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertTelefono = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertTelefono = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertTelefono = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertTelefono = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Teléfono Alert")//tttt
    }
    //alerta
    $('.bd-example-modal-sm .modal-content').addClass(VarJsColorAlertTelefono);//variable de color alerta xxxx
    $('.bd-example-modal-sm h5').text(VarJsTextoAlertTelefono);//variable de texto alerta xxxx
    $('.bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.bd-example-modal-sm').modal('hide');
        $('.bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertTelefono);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms
    console.log($("#secciontblTelefono.show").length)//tttt
    if ($("#secciontblTelefono.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxRTelefono();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNTelefono").modal("toggle");//nombre modal xxxx
}