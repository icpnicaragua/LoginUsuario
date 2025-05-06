/*variable de tablas*/
var tablaPersona;/*tabla mpodulo*/
var ModCPersona = $('#modalNPersona'); // modal 
//campos de tablas
var VarJsPersonaId = 0;
var VarJsNombre1 = "";
var VarJsNombre2 = "";
var VarJsApellido1 = "";
var VarJsApellido2 = "";
var VarJsIdGenero = 0;
//dddlist Genero
var VAlDDLPersonaGenero = "null";// para guardar lo que está en la tabla y luego asignar al ddl

//igual para todos
var formPersona = document.querySelector('#form1');

//variables crud
CRUDPersona = "";
//variables alertas
var VarJsColorAlertPersona = "";
var VarJsTextoAlertPersona = "";
//variables existe
var EPersona = true;


$('#lbMostrarPersona').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    FnJsAjaxRPersona(); //llama al ajax xxxx
    FnJSFillDdlPersonaGenero();//cargar ddl
});

function FnJsAjaxRPersona() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnRPersonaV", // nombre de página y nombre de función xxxx
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowPersona(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}


function AddrowPersona(data) {//3 llenar la tabla xxxx

    $('#tblPersona').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaPersona = $("#tblPersona").DataTable({// variable nombre tabla xxxx

        "retrieve": true,
        dom: 'Bfrtip',
        autoWidth: false,
        "order": [[2, 'asc'], [4, 'asc']],//"order": [[ 0, 'asc' ], [ 1, 'desc' ]] // columna, orden xxxx comienza en 0
        "columnDefs": [
            { "targets": 3, "searchable": false },
            { "orderable": false, "targets": 6 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colPersona'//se añade el id para ocultar xxxx
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
                    columns: [':not(:eq(6)):visible'] /// index de controles xxxx para no mostrar comienza en 0
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
                    columns: [':not(:eq(6)):visible'] ///  index de controles xxxx para no mostrar comienza en 0
                },
                titleAttr: 'PDF',
                filename: 'Persona' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Persona', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Persona' //tttt
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
                filename: 'Persona' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
                text: '<i class="far fa-file-excel fa-2x"></i>',
                className: 'btn btn-success d-none d-lg-block',
                exportOptions: {
                    columns: [':not(:eq(6)):visible'] // index de controles xxxx para no mostrar inicia en 0
                },
                titleAttr: 'Excel',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')

                }

            }
        ],
        "language": FnJsEspTbl()
    });
    tablaPersona.buttons().container().addClass('form-inline');///variable xxxx

    for (var contPersona = 0; contPersona < data.length; contPersona++) { // declarar variable de recorrido de arreglo data xxxx
        tablaPersona.row.add([//sensitivecase:
            data[contPersona].IdPersona,//campos
            data[contPersona].Nombre1,//campos
            data[contPersona].Nombre2,//campos
            data[contPersona].Apellido1,//campos
            data[contPersona].Apellido2,//campos
            data[contPersona].ObjGenero.Genero,
            '<button value="editar" href="#modalNPersona" data-toggle="modal" title="editar" class="btn btn-warning  btn-editPersona"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNPersona" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deletePersona"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNPersona').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCPersona(); // nombre función xxxx
    EPersona = true; // variable xxxx

    FnJsBlockPersona(); // nombre función xxxx
    FnJSFillDdlPersonaGenero();
    CRUDPersona = "C"; // nombre variable xxxx

    //campos xxxx
    VarJsPersonaId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsNombre1 = ""; // cada campo tiene una variable, inicializar xxxx
    VarJsNombre2 = "";
    VarJsApellido1 = "";
    VarJsApellido2 = "";
    VarJsIdGenero = 0;

});

$('#tblPersona tbody').on('click', 'tr', function () {
    var tablaPersona = $('#tblPersona').DataTable();
    console.log('clicked: ' + tablaPersona.row(this).data()[0]);
})

$(document).on('click', '.btn-editPersona', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUPersona();//nombre de función xxxx
    var dataPersona = tablaPersona.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsPersonaId = dataPersona[0]; //id de la fila seleccionada
    $('#txtNuevoNombre1').val(dataPersona[1]);// [indice columna]  de la fila seleccionada xxxx
    $('#txtNuevoNombre2').val(dataPersona[2]);
    $('#txtNuevoApellido1').val(dataPersona[3]);
    $('#txtNuevoApellido2').val(dataPersona[4]);
    VarJsNombre1 = dataPersona[1]; // variable elemento, variable data, índice xxxx
    VarJsNombre2 = dataPersona[2];
    VarJsApellido1 = dataPersona[3];
    VarJsApellido2 = dataPersona[4];

    VAlDDLPersonaGenero = (dataPersona[5]);
    FnJSFillDdlPersonaGenero();
    VarJsIdGenero = $('#ddlCPersonaGenero').val();
    CRUDPersona = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deletePersona', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDPersona();//nombre de función xxxx
    EPersona = false; // variable de existe xxxx


    FnJsBlockPersona();//función bloquear xxxx
    var dataPersona = tablaPersona.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsPersonaId = dataPersona[0]; //id de la fila seleccionada
    $('#txtNuevoNombre1').val(dataPersona[1]);// [indice columna]  de la fila seleccionada xxxx
    $('#txtNuevoNombre2').val(dataPersona[2]);
    $('#txtNuevoApellido1').val(dataPersona[3]);
    $('#txtNuevoApellido2').val(dataPersona[4]);
    VarJsNombre1 = dataPersona[1]; // variable elemento, variable data, índice xxxx
    VarJsNombre2 = dataPersona[2];
    VarJsApellido1 = dataPersona[3];
    VarJsApellido2 = dataPersona[4];
    VAlDDLPersonaGenero = (dataPersona[5]);
    FnJSFillDdlPersonaGenero();

    CRUDPersona = "D";
});

//pintar modal
function FnJsCPersona() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoPersona').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorPersona").removeAttr("class");//quitar el atributo class
    $("#DivModBorPersona").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaPersona").removeAttr("class");//quitar el atributo class
    $("#DivModHeaPersona").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitPersona').text('Nuevo Persona');//tttt
    //cambiar el color icono btn
    $("#btnNuePersona").removeAttr("class");//quitar el atributo class
    $("#btnNuePersona").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNuePersona i").removeAttr("class");
    $("#btnNuePersona i").attr("class", "fa fa-save fa-2x");
    //color ddl
    $("#ddlCPersonaGenero").removeAttr("class"); //uitar propiedades
    $("#ddlCPersonaGenero").attr("class", "form-control border-success");//pintr roo
    //bloquear elementos
    $("#txtNuevoNombre1").attr('disabled', false); //variables de los elementos del modal xxxx
    $("#txtNuevoNombre2").attr('disabled', false);
    $("#txtNuevoApellido1").attr('disabled', false);
    $("#txtNuevoApellido2").attr('disabled', false);
    $('#ddlCPersonaGenero').attr('disabled', false);
    //vaciar elementos text de todo el modal
    $('#' + ModCPersona[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUPersona() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoPersona').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorPersona").removeAttr("class");//quitar el atributo class
    $("#DivModBorPersona").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaPersona").removeAttr("class");//quitar el atributo class
    $("#DivModHeaPersona").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitPersona').text('Editar Persona');//tttt
    //cambiar el color icono btn
    $("#btnNuePersona").removeAttr("class");//quitar el atributo class
    $("#btnNuePersona").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNuePersona i").removeAttr("class");
    $("#btnNuePersona i").attr("class", "fa fa-save fa-2x");
    //color ddl
    $("#ddlCPersonaGenero").removeAttr("class"); //uitar propiedades
    $("#ddlCPersonaGenero").attr("class", "form-control border-warning");//pintr roo
    //bloquear elementos
    $("#txtNuevoNombre1").attr('disabled', false); //variables de los elementos del modal xxxx
    $("#txtNuevoNombre2").attr('disabled', false);
    $("#txtNuevoApellido1").attr('disabled', false);
    $("#txtNuevoApellido2").attr('disabled', false);
    $('#ddlCPersonaGenero').attr('disabled', false);
    //vaciar elementos text de todo el modal
    $('#' + ModCPersona[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDPersona() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoPersona').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorPersona").removeAttr("class");//quitar el atributo class
    $("#DivModBorPersona").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaPersona").removeAttr("class");//quitar el atributo class
    $("#DivModHeaPersona").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitPersona').text('Eliminar Persona');//tttt
    //cambiar el color icono btn
    $("#btnNuePersona").removeAttr("class");//quitar el atributo class
    $("#btnNuePersona").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNuePersona i").removeAttr("class");
    $("#btnNuePersona i").attr("class", "fa fa-trash fa-2x");//ícono
    //color ddl
    $("#ddlCPersonaGenero").removeAttr("class"); //uitar propiedades
    $("#ddlCPersonaGenero").attr("class", "form-control border-danger");//pintr roo
    //bloquear elementos
    $("#txtNuevoNombre1").attr('disabled', true); //variables de los elementos del modal xxxx
    $("#txtNuevoNombre2").attr('disabled', true);
    $("#txtNuevoApellido1").attr('disabled', true);
    $("#txtNuevoApellido2").attr('disabled', true);
    $('#ddlCPersonaGenero').attr('disabled', true);
    //vaciar elementos text de todo el modal
    $('#' + ModCPersona[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockPersona() {// nombre función xxxx

    if (EPersona == true) {// variables xxxx
        $("#btnNuePersona").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNuePersona").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter

    }
    else if (EPersona == false) {// variables xxxx
        $("#btnNuePersona").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNuePersona").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter


    }
}

//guardar CUD
$('#btnNuePersona').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formPersona.checkValidity()) {
        switch (CRUDPersona) { // variable crud xxxx
            case "C":
                FnJsAjaxCPersona(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUPersona();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDPersona();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Persona");/////tttt
        }
    }
    console.log(formPersona.checkValidity());
});

//ajax CUD
function FnJsAjaxCPersona() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnCPersonaV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            Nombre1: VarJsNombre1,
            Nombre2: VarJsNombre2,
            Apellido1: VarJsApellido1,
            Apellido2: VarJsApellido2,
            IdGenero: VarJsIdGenero
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Persona Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDPersona = "error"
                console.log("No se pudo agregar Persona");//
            }
            FnAlertaPersona(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUPersona() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnUPersonaV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdPersona: VarJsPersonaId,
            Nombre1: VarJsNombre1,
            Nombre2: VarJsNombre2,
            Apellido1: VarJsApellido1,
            Apellido2: VarJsApellido2,
            IdGenero: VarJsIdGenero

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Persona Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDPersona = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaPersona();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDPersona() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnDPersonaV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdPersona: VarJsPersonaId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Persona Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDPersona = "error"
                console.log("No se pudo Eliminar Persona");////tttt
            }
            FnAlertaPersona(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxEPersona() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnEPersonaV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdPersona: VarJsPersonaId,
            Nombre1: VarJsNombre1,
            Nombre2: VarJsNombre2,
            Apellido1: VarJsApellido1,
            Apellido2: VarJsApellido2,
            IdGenero: VarJsIdGenero
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                EPersona = true; // variable existe xxxx
                $('#lblexistenuevoPersona').text("Existe Persona");// id etiqueta texto etiqueta //tttt
                FnJsBlockPersona();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                EPersona = false;// variable existe xxxx
                $('#lblexistenuevoPersona').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockPersona(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExistePersona() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoNombre1').val().length >= 3 &&  $('#txtNuevoApellido1').val().length >= 3  &&$('#ddlCPersonaGenero').val() > 0) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoNombre1').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsNombre1 = $(this).val(); // variable de este elemento xxxx
    if (VerificarExistePersona()) {//nombre función verificar existe xxxx
        FnJsAjaxEPersona(); // llamar todos los existes xxxx
    }
});

$('#txtNuevoNombre2').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsNombre2 = $(this).val(); // variable de este elemento xxxx
    if (VerificarExistePersona()) {//nombre función verificar existe xxxx
        FnJsAjaxEPersona(); // llamar todos los existes xxxx
    }
});

$('#txtNuevoApellido1').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsApellido1 = $(this).val(); // variable de este elemento xxxx
    if (VerificarExistePersona()) {//nombre función verificar existe xxxx
        FnJsAjaxEPersona(); // llamar todos los existes xxxx
    }
});
$('#txtNuevoApellido2').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsApellido2 = $(this).val(); // variable de este elemento xxxx
    if (VerificarExistePersona()) {//nombre función verificar existe xxxx
        FnJsAjaxEPersona(); // llamar todos los existes xxxx
    }
});

$('#ddlCPersonaGenero').change(function (e) {
    VarJsIdGenero = $('#ddlCPersonaGenero').val();
    if (VerificarExistePersona()) {
        FnJsAjaxEPersona();
    }
});

function FnJSFillDdlPersonaGenero() {
    $('#ddlCPersonaGenero').empty(); // xxxx id
    $.ajax({
        type: "POST",
        url: "/modulo7/VstGenerales.aspx/FnRGeneroV", // xxxx
        data: {}, /*{ data: jsonString }*/
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLPersonaGenero == "null") {
                $('#ddlCPersonaGenero').append($("<option> </option>").val("0").html("Seleccionar Género"));  // xxxx id val html            
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLPersonaGenero == value.Genero) {
                        $('#ddlCPersonaGenero').append($("<option> </option>").val(value.IdGenero).html(value.Genero));  // xxxx id texto
                        VarJsIdGenero = value.IdGenero;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCPersonaGenero').append($("<option> </option>").val(value.IdGenero).html(value.Genero)); // id en un val y en html el nombre
            });
            VAlDDLPersonaGenero = "null";
        }
    });
}

function FnAlertaPersona() {//nombre de la función xxxx

    switch (CRUDPersona) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertPersona = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertPersona = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertPersona = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertPersona = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertPersona = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertPersona = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertPersona = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertPersona = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Persona Alert")//tttt
    }
    //alerta
    $('#alertaEmpleados .modal-content').addClass(VarJsColorAlertPersona);//variable de color alerta xxxx
    $('#alertaEmpleados h5').text(VarJsTextoAlertPersona);//variable de texto alerta xxxx
    $('#alertaEmpleados').modal('show');
    setTimeout(function () {
        $('#alertaEmpleados').modal('hide');
        $('#alertaEmpleados .modal-content').removeClass(VarJsColorAlertPersona);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblPersona.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxRPersona();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNPersona").modal("toggle");//nombre modal xxxx
}