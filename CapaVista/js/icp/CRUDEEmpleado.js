/*variable de tablas*/
var tablaEmpleado;/*tabla mpodulo*/
var ModCEmpleado = $('#modalNEmpleado'); // modal 
//campos de tablas
var VarJsEmpleadoId = 0;
var VarJsIdPersona = 0;
var VarJsEmpleadoNom1 = "";
var VarJsEmpleadoApe1 = "";
var VarJsIdArea = 0;
var VarJsArea = "";
var VarJsIdJefe = 0;
var VarJsJefeNom1 = "";
var VarJsJefeApe1 = "";

//dddlist EmpleadoArea
var VAlDDLEmpleadoArea = "null";// para guardar lo que está en la tabla y luego asignar al ddl
var VAlDDLEmpleadoJefe = "null"; 
//igual para todos
var formEmpleado = document.querySelector('#form1');

//variables crud
CRUDEmpleado = "";
//variables alertas
var VarJsColorAlertEmpleado = "";
var VarJsTextoAlertEmpleado = "";
//variables existe
var EEmpleado = true;


$('#lbMostrarEmpleado').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    FnJsAjaxREmpleado(); //llama al ajax xxxx
    FnJSFillDdlEmpleadoArea();//cargar ddl
    FnJSFillDdlEmpleadoJefe();//cargar ddl
});

function FnJsAjaxREmpleado() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnREmpleadoV", // nombre de página y nombre de función xxxx
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowEmpleado(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowEmpleado(data) {//3 llenar la tabla xxxx

    $('#tblEmpleado').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaEmpleado = $("#tblEmpleado").DataTable({// variable nombre tabla xxxx

        "retrieve": true,
        dom: 'Bfrtip',

        "order": [[2, 'asc'], [1, 'asc']],//"order": [[ 0, 'asc' ], [ 1, 'desc' ]] // columna, orden xxxx comienza en 0
        "columnDefs": [
            { "targets": 3, "searchable": false },
            { "orderable": false, "targets": 5 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colEmpleado'//se añade el id para ocultar xxxx
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
                    columns: [':not(:eq(5)):visible'] /// index de controles xxxx para no mostrar comienza en 0
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
                    columns: [':not(:eq(5)):visible'] ///  index de controles xxxx para no mostrar comienza en 0
                },
                titleAttr: 'PDF',
                filename: 'Empleado' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Empleado', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Empleado' //tttt
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
                filename: 'Empleado' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
                text: '<i class="far fa-file-excel fa-2x"></i>',
                className: 'btn btn-success d-none d-lg-block',
                exportOptions: {
                    columns: [':not(:eq(5)):visible'] // index de controles xxxx para no mostrar inicia en 0
                },
                titleAttr: 'Excel',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')

                }

            }
        ],
        "language": FnJsEspTbl()
    });
    tablaEmpleado.buttons().container().addClass('form-inline');///variable xxxx

    for (var contEmpleado = 0; contEmpleado < data.length; contEmpleado++) { // declarar variable de recorrido de arreglo data xxxx
        tablaEmpleado.row.add([//sensitivecase:
            data[contEmpleado].IdEmpleado,//campos
            data[contEmpleado].ObjPerona.Nombre1,//campos
            data[contEmpleado].ObjPerona.Apellido1,
            data[contEmpleado].ObjArea.Area,
            data[contEmpleado].ObjJefe.Nombre1 + ' ' + data[contEmpleado].ObjJefe.Apellido1,
            '<button value="editar" href="#modalNEmpleado" data-toggle="modal" title="editar" class="btn btn-warning  btn-editEmpleado"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNEmpleado" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteEmpleado"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
         ]
        ).draw(false);
    }
}

//acciones cud
$(document).on('click', '.btn-addEmpleado', function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    var tablaPersona = $('#tblPersona').DataTable();
    var dataPersona = tablaPersona.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsIdPersona = dataPersona[0];
        
    FnJsCEmpleado(); // nombre función xxxx
    EEmpleado = true; // variable xxxx

    FnJsBlockEmpleado(); // nombre función xxxx
    FnJSFillDdlEmpleadoArea();
    FnJSFillDdlEmpleadoJefe();
    CRUDEmpleado = "C"; // nombre variable xxxx
    //campos xxxx
    VarJsEmpleadoId = 0; // cada campo tiene una variable, inicializar xxxx
    $('#txtNuevoEmpleadoNombre1').val(dataEmpleado[1]);// [indice columna]  de la fila seleccionada xxxx
    $('#txtNuevoEmpleadoApellido1').val(dataEmpleado[2]);
    VarJsEmpleadoNom1 = dataPersona[1]; // cada campo tiene una variable, inicializar xxxx
    VarJsEmpleadoApe1 = dataPersona[3];
    VarJsIdArea = 0;
    VarJsArea = "";
    VarJsIdJefe = 0;
    VarJsJefeNom1 = "";
    VarJsJefeApe1 = "";      
});
$(document).on('click', '.btn-editEmpleado', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUEmpleado();//nombre de función xxxx
    var dataEmpleado = tablaEmpleado.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsEmpleadoId = dataEmpleado[0]; //id de la fila seleccionada
    $('#txtNuevoEmpleadoNombre1').val(dataEmpleado[1]);// [indice columna]  de la fila seleccionada xxxx
    $('#txtNuevoEmpleadoApellido1').val(dataEmpleado[2]);
    VarJsEmpleadoNom1 = dataEmpleado[1]; // variable elemento, variable data, índice xxxx
    VarJsEmpleadoApe1 = dataEmpleado[2];
    VAlDDLEmpleadoArea = (dataEmpleado[3]);
    VAlDDLEmpleadoJefe = (dataEmpleado[4]);
    FnJSFillDdlEmpleadoArea();
    VarJsIdArea = $('#ddlCEmpleadoArea').val();
    FnJSFillDdlEmpleadoJefe();
    VarJsIdJefe = $('#ddlCEmpleadoJefe').val();

    CRUDEmpleado = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteEmpleado', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDEmpleado();//nombre de función xxxx
    EEmpleado = false; // variable de existe xxxx

    FnJsBlockEmpleado();//función bloquear xxxx
    var dataEmpleado = tablaEmpleado.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsEmpleadoId = dataEmpleado[0]; //id de la fila seleccionada
    $('#txtNuevoEmpleadoNombre1').val(dataEmpleado[1]);// [indice columna]  de la fila seleccionada xxxx
    $('#txtNuevoEmpleadoApellido1').val(dataEmpleado[2]);
    VarJsEmpleadoNom1 = dataEmpleado[1]; // variable elemento, variable data, índice xxxx
    VarJsEmpleadoApe1 = dataEmpleado[2];
    VAlDDLEmpleadoArea = (dataEmpleado[3]);
    VAlDDLEmpleadoJefe = (dataEmpleado[4]);
    FnJSFillDdlEmpleadoArea();
    FnJSFillDdlEmpleadoJefe();

    CRUDEmpleado = "D";
});

//pintar modal
function FnJsCEmpleado() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoEmpleado').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorEmpleado").removeAttr("class");//quitar el atributo class
    $("#DivModBorEmpleado").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaEmpleado").removeAttr("class");//quitar el atributo class
    $("#DivModHeaEmpleado").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitEmpleado').text('Nuevo Empleado');//tttt
    //cambiar el color icono btn
    $("#btnNueEmpleado").removeAttr("class");//quitar el atributo class
    $("#btnNueEmpleado").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNueEmpleado i").removeAttr("class");
    $("#btnNueEmpleado i").attr("class", "fa fa-save fa-2x");
    //color ddl
    $("#ddlCEmpleadoArea").removeAttr("class"); //uitar propiedades
    $("#ddlCEmpleadoArea").attr("class", "form-control border-success");//pintr roo
    $("#ddlCEmpleadoJefe").removeAttr("class"); //uitar propiedades
    $("#ddlCEmpleadoJefe").attr("class", "form-control border-success");//pintr roo
    
    //bloquear elementos
    $("#txtNuevoEmpleadoNombre1").attr('disabled', true); //variables de los elementos del modal xxxx
    $("#txtNuevoEmpleadoApellido1").attr('disabled', true); //variables de los elementos del modal xxxx
    $('#ddlCEmpleadoArea').attr('disabled', false);
    $('#ddlCEmpleadoJefe').attr('disabled', false);
    //vaciar elementos text de todo el modal
    $('#' + ModCEmpleado[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUEmpleado() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoEmpleado').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorEmpleado").removeAttr("class");//quitar el atributo class
    $("#DivModBorEmpleado").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaEmpleado").removeAttr("class");//quitar el atributo class
    $("#DivModHeaEmpleado").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitEmpleado').text('Editar Empleado');//tttt
    //cambiar el color icono btn
    $("#btnNueEmpleado").removeAttr("class");//quitar el atributo class
    $("#btnNueEmpleado").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNueEmpleado i").removeAttr("class");
    $("#btnNueEmpleado i").attr("class", "fa fa-save fa-2x");
    //color ddl
    $("#ddlCEmpleadoArea").removeAttr("class"); //uitar propiedades
    $("#ddlCEmpleadoArea").attr("class", "form-control border-warning");//pintr roo
    $("#ddlCEmpleadoJefe").removeAttr("class"); //uitar propiedades
    $("#ddlCEmpleadoJefe").attr("class", "form-control border-warning");//pintr roo

    //bloquear elementos
    $("#txtNuevoEmpleadoNombre1").attr('disabled', true); //variables de los elementos del modal xxxx
    $("#txtNuevoEmpleadoApellido1").attr('disabled', true); //variables de los elementos del modal xxxx
    $('#ddlCEmpleadoArea').attr('disabled', false);
    $('#ddlCEmpleadoJefe').attr('disabled', false);
    //vaciar elementos text de todo el modal
    $('#' + ModCEmpleado[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDEmpleado() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoEmpleado').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorEmpleado").removeAttr("class");//quitar el atributo class
    $("#DivModBorEmpleado").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaEmpleado").removeAttr("class");//quitar el atributo class
    $("#DivModHeaEmpleado").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitEmpleado').text('Eliminar Empleado');//tttt
    //cambiar el color icono btn
    $("#btnNueEmpleado").removeAttr("class");//quitar el atributo class
    $("#btnNueEmpleado").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNueEmpleado i").removeAttr("class");
    $("#btnNueEmpleado i").attr("class", "fa fa-trash fa-2x");//ícono
    //color ddl
    $("#ddlCEmpleadoArea").removeAttr("class"); //uitar propiedades
    $("#ddlCEmpleadoArea").attr("class", "form-control border-danger");//pintr roo
    $("#ddlCEmpleadoJefe").removeAttr("class"); //uitar propiedades
    $("#ddlCEmpleadoJefe").attr("class", "form-control border-danger");//pintr roo

    //bloquear elementos
    $("#txtNuevoEmpleadoNombre1").attr('disabled', true); //variables de los elementos del modal xxxx
    $("#txtNuevoEmpleadoApellido1").attr('disabled', true); //variables de los elementos del modal xxxx
    $('#ddlCEmpleadoArea').attr('disabled', true);
    $('#ddlCEmpleadoJefe').attr('disabled', true);
    //vaciar elementos text de todo el modal
    $('#' + ModCEmpleado[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockEmpleado() {// nombre función xxxx

    if (EEmpleado == true) {// variables xxxx
        $("#btnNueEmpleado").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNueEmpleado").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter
    }
    else if (EEmpleado == false) {// variables xxxx
        $("#btnNueEmpleado").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNueEmpleado").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter
    }
}

//guardar CUD
$('#btnNueEmpleado').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formEmpleado.checkValidity()) {
        switch (CRUDEmpleado) { // variable crud xxxx
            case "C":
                FnJsAjaxCEmpleado(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUEmpleado();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDEmpleado();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Empleado");/////tttt
        }
    }
    console.log(formEmpleado.checkValidity());
});

//ajax CUD
function FnJsAjaxCEmpleado() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnCEmpleadoV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdArea: VarJsIdArea,
            IdPersona: VarJsIdPersona,
            IdJefe: VarJsIdJefe
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Empleado Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDEmpleado = "error"
                console.log("No se pudo agregar Tipo de indentificación");//
            }
            FnAlertaEmpleado(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUEmpleado() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnUEmpleadoV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdEmpleado: VarJsEmpleadoId,
            IdArea: VarJsIdArea,
            IdPersona: VarJsIdPersona,
            IdJefe: VarJsIdJefe

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Empleado Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDEmpleado = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaEmpleado();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDEmpleado() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnDEmpleadoV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdEmpleado: VarJsEmpleadoId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Empleado Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDEmpleado = "error"
                console.log("No se pudo Eliminar Empleado");////tttt
            }
            FnAlertaEmpleado(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxEEmpleado() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnEEmpleadoV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdEmpleado: VarJsEmpleadoId,
            IdArea: VarJsIdArea,
            IdPersona: VarJsIdPersona
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                EEmpleado = true; // variable existe xxxx
                $('#lblexistenuevoEmpleado').text("Existe Empleado");// id etiqueta texto etiqueta //tttt
                FnJsBlockEmpleado();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                EEmpleado = false;// variable existe xxxx
                $('#lblexistenuevoEmpleado').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockEmpleado(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExisteEmpleado() {// nombre de función verificarexiste xxxx
    if ($('#ddlCEmpleadoJefe').val() > 0 && $('#ddlCEmpleadoArea').val() > 0) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#ddlCEmpleadoArea').change(function (e) {
    VarJsIdArea = $('#ddlCEmpleadoArea').val();
    if (VerificarExisteEmpleado()) {
        FnJsAjaxEEmpleado();
    }
});

$('#ddlCEmpleadoJefe').change(function (e) {
    VarJsIdJefe = $('#ddlCEmpleadoJefe').val();
    if (VerificarExisteEmpleado()) {
        FnJsAjaxEEmpleado();
    }
});

function FnJSFillDdlEmpleadoArea() {
    $('#ddlCEmpleadoArea').empty(); // xxxx id
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnRAreaV", // xxxx
        data: {}, 
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLEmpleadoArea == "null") {
                $('#ddlCEmpleadoArea').append($("<option> </option>").val("0").html("Seleccionar Área"));  // xxxx id val html            
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLEmpleadoArea == value.Area) {
                        $('#ddlCEmpleadoArea').append($("<option> </option>").val(value.IdArea).html(value.Area));  // xxxx id texto
                        VarJsIdArea = value.IdArea;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCEmpleadoArea').append($("<option> </option>").val(value.IdArea).html(value.Area)); // id en un val y en html el nombre
            });
            VAlDDLEmpleadoArea = "null";
        }
    });
}

function FnJSFillDdlEmpleadoJefe() {
    $('#ddlCEmpleadoJefe').empty(); // xxxx id
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnREmpleadoV", // xxxx
        data: {}, /*{ data: jsonString }*/
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLEmpleadoJefe == "null") {
                $('#ddlCEmpleadoJefe').append($("<option> </option>").val("0").html("Seleccionar Jefe"));  // xxxx id val html            
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLEmpleadoJefe == (value.ObjJefe.Nombre1 + ' ' + value.ObjJefe.Apellido1)) {
                        $('#ddlCEmpleadoJefe').append($("<option> </option>").val(value.IdEmpleado).html(value.ObjJefe.Nombre1 + ' '+value.ObjJefe.Apellido1));  // xxxx id texto
                        VarJsIdJefe = value.IdEmpleado;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCEmpleadoJefe').append($("<option> </option>").val(value.IdEmpleado).html(value.ObjJefe.Nombre1 + ' ' + value.ObjJefe.Apellido1)); // id en un val y en html el nombre
            });
            VAlDDLEmpleadoJefe = "null";
        }
    });
}


function FnAlertaEmpleado() {//nombre de la función xxxx

    switch (CRUDEmpleado) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertEmpleado = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertEmpleado = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertEmpleado = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertEmpleado = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertEmpleado = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertEmpleado = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertEmpleado = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertEmpleado = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Empleado Alert")//tttt
    }
    //alerta
    $('#alertaEmpleados .modal-content').addClass(VarJsColorAlertEmpleado);//variable de color alerta xxxx
    $('#alertaEmpleados h5').text(VarJsTextoAlertEmpleado);//variable de texto alerta xxxx
    $('#alertaEmpleados').modal('show');
    setTimeout(function () {
        $('#alertaEmpleados').modal('hide');
        $('#alertaEmpleados .modal-content').removeClass(VarJsColorAlertEmpleado);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblEmpleado.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxREmpleado();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNEmpleado").modal("toggle");//nombre modal xxxx
}