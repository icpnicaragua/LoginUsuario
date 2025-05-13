/*variable de tablas*/
var tablaBodega;/*tabla mpodulo*/
var ModCBodega = $('#modalNBodega'); // modal 
//campos de tablas
var VarJsBodegaId = 0;
var VarJsBodega = "";
var VarJsIdSucursal = 0;

var VarJsDescripcion = "";
var VarJsSucursal = "";
var VarJsIdResponsable = 0;
var VarJsResponsable = "";


//dddlist Sucursal
var VAlDDLBodegaSucursal = "null";// para guardar lo que está en la tabla y luego asignar al ddl
var VAlDDLBodegaResponsable = "null";// para guardar lo que está en la tabla y luego asignar al ddl

//igual para todos
var formBodega = document.querySelector('#form1');

//variables crud
CRUDBodega = "";
//variables alertas
var VarJsColorAlertBodega = "";
var VarJsTextoAlertBodega = "";
//variables existe
var EBodega = true;


$('#lbMostrarBodega').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    FnJsAjaxRBodega(); //llama al ajax xxxx
    FnJSFillDdlBodegaSucursal();//cargar ddl
});

function FnJsAjaxRBodega() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo3/VstBodega.aspx/FnRBodegaV", // nombre de página y nombre de función xxxx
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowBodega(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowBodega(data) {//3 llenar la tabla xxxx

    $('#tblBodega').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaBodega = $("#tblBodega").DataTable({// variable nombre tabla xxxx

        "retrieve": true,
        dom: 'Bfrtip',

        "order": [1, 'asc'],//"order": [[ 0, 'asc' ], [ 1, 'desc' ]] // columna, orden xxxx comienza en 0
        "columnDefs": [
            { "targets": 5, "searchable": false },
            { "orderable": false, "targets": 5 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colBodega'//se añade el id para ocultar xxxx
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
                filename: 'Bodega' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Bodega', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Bodega' //tttt
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
                filename: 'Bodega' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
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
    tablaBodega.buttons().container().addClass('form-inline');///variable xxxx

    for (var contBodega = 0; contBodega < data.length; contBodega++) { // declarar variable de recorrido de arreglo data xxxx
        tablaBodega.row.add([//sensitivecase:
            data[contBodega].IdBodega,//campos
            data[contBodega].NombreBodega,//campos
            data[contBodega].Descripcion,//campos
            data[contBodega].ObjSucursal.Sucursal,
            data[contBodega].ObjResponsable.ObjPersona.Nombre1 + ' ' + data[contBodega].ObjResponsable.ObjPersona.Apellido1,
            '<button value="editar" href="#modalNBodega" data-toggle="modal" title="editar" class="btn btn-warning  btn-editBodega"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNBodega" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteBodega"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNBodega').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCBodega(); // nombre función xxxx
    EBodega = true; // variable xxxx

    FnJsBlockBodega(); // nombre función xxxx
    FnJSFillDdlBodegaSucursal();
    FnJSFillDdlBodegaResponsable();
    CRUDBodega = "C"; // nombre variable xxxx

    //campos xxxx
    VarJsBodegaId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsBodega = ""; // cada campo tiene una variable, inicializar xxxx
    VarJsIdSucursal = 0;

    VarJsDescripcion = "";
    VarJsSucursal = "";
    VarJsIdResponsable = 0;
    VarJsResponsable = "";
});
$(document).on('click', '.btn-editBodega', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUBodega();//nombre de función xxxx
    var dataBodega = tablaBodega.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna

    VarJsBodegaId = dataBodega[0]; //id de la fila seleccionada

    $('#txtNuevoBodega').val(dataBodega[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsBodega = dataBodega[1]; // variable elemento, variable data, índice xxxx

    $('#txtNuevoDescripcion').val(dataBodega[2]);// [indice columna]  de la fila seleccionada xxxx
    VarJsDescripcion = dataBodega[2]; // variable elemento, variable data, índice xxxx

    VAlDDLBodegaSucursal = (dataBodega[3]);
    VarJsSucursal = dataBodega[3];
    FnJSFillDdlBodegaSucursal();    
    VarJsIdSucursal = $('#ddlCBodegaSucursal').val();
    
    VAlDDLBodegaResponsable = (dataBodega[4]);
    VarJsResponsable = (dataBodega[4]);
    FnJSFillDdlBodegaResponsable();
    VarJsIdResponsable = $('#ddlCBodegaResponsable').val();
        
    CRUDBodega = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteBodega', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDBodega();//nombre de función xxxx
    EBodega = false; // variable de existe xxxx


    FnJsBlockBodega();//función bloquear xxxx
    var dataBodega = tablaBodega.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsBodegaId = dataBodega[0]; //id de la fila seleccionada

    $('#txtNuevoBodega').val(dataBodega[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsBodega = dataBodega[1]; // variable elemento, variable data, índice xxxx

    $('#txtNuevoDescripcion').val(dataBodega[2]);// [indice columna]  de la fila seleccionada xxxx
    VarJsDescripcion = dataBodega[2]; // variable elemento, variable data, índice xxxx

    VAlDDLBodegaSucursal = (dataBodega[3]);
    VarJsSucursal = dataBodega[3];
    FnJSFillDdlBodegaSucursal();
  
    VAlDDLBodegaResponsable = (dataBodega[4]);
    VarJsResponsable = (dataBodega[4]);
    FnJSFillDdlBodegaResponsable();
  
    CRUDBodega = "D";
});

//pintar modal
function FnJsCBodega() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoBodega').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorBodega").removeAttr("class");//quitar el atributo class
    $("#DivModBorBodega").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaBodega").removeAttr("class");//quitar el atributo class
    $("#DivModHeaBodega").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitBodega').text('Nuevo Bodega');//tttt
    //cambiar el color icono btn
    $("#btnNueBodega").removeAttr("class");//quitar el atributo class
    $("#btnNueBodega").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNueBodega i").removeAttr("class");
    $("#btnNueBodega i").attr("class", "fa fa-save fa-2x");
    //color ddl
    $("#ddlCBodegaSucursal").removeAttr("class"); //uitar propiedades
    $("#ddlCBodegaSucursal").attr("class", "form-control border-success");//pintr roo
    $("#ddlCBodegaResponsable").removeAttr("class"); //uitar propiedades
    $("#ddlCBodegaResponsable").attr("class", "form-control border-success");//pintr roo
    
    //bloquear elementos
    $("#txtNuevoBodega").attr('disabled', false); //variables de los elementos del modal xxxx
    $("#txtNuevoDescripcion").attr('disabled', false); //variables de los elementos del modal xxxx
    
    $('#ddlCBodegaSucursal').attr('disabled', false);
    $('#ddlCBodegaResponsable').attr('disabled', false);
    
    //vaciar elementos text de todo el modal
    $('#' + ModCBodega[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUBodega() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoBodega').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorBodega").removeAttr("class");//quitar el atributo class
    $("#DivModBorBodega").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaBodega").removeAttr("class");//quitar el atributo class
    $("#DivModHeaBodega").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitBodega').text('Editar Bodega');//tttt
    //cambiar el color icono btn
    $("#btnNueBodega").removeAttr("class");//quitar el atributo class
    $("#btnNueBodega").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNueBodega i").removeAttr("class");
    $("#btnNueBodega i").attr("class", "fa fa-save fa-2x");
    //color ddl
    $("#ddlCBodegaSucursal").removeAttr("class"); //uitar propiedades
    $("#ddlCBodegaSucursal").attr("class", "form-control border-warning");//pintr roo
    $("#ddlCBodegaResponsable").removeAttr("class"); //uitar propiedades
    $("#ddlCBodegaResponsable").attr("class", "form-control border-warning");//pintr roo

    //bloquear elementos
    $("#txtNuevoBodega").attr('disabled', false); //variables de los elementos del modal xxxx
    $("#txtNuevoDescripcion").attr('disabled', false); //variables de los elementos del modal xxxx

    $('#ddlCBodegaSucursal').attr('disabled', false);
    $('#ddlCBodegaResponsable').attr('disabled', false);
    //vaciar elementos text de todo el modal
    $('#' + ModCBodega[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDBodega() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoBodega').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorBodega").removeAttr("class");//quitar el atributo class
    $("#DivModBorBodega").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaBodega").removeAttr("class");//quitar el atributo class
    $("#DivModHeaBodega").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitBodega').text('Eliminar Bodega');//tttt
    //cambiar el color icono btn
    $("#btnNueBodega").removeAttr("class");//quitar el atributo class
    $("#btnNueBodega").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNueBodega i").removeAttr("class");
    $("#btnNueBodega i").attr("class", "fa fa-trash fa-2x");//ícono
    //color ddl
    $("#ddlCBodegaSucursal").removeAttr("class"); //uitar propiedades
    $("#ddlCBodegaSucursal").attr("class", "form-control border-danger");//pintr roo
    $("#ddlCBodegaResponsable").removeAttr("class"); //uitar propiedades
    $("#ddlCBodegaResponsable").attr("class", "form-control border-danger");//pintr roo

    //bloquear elementos
    $("#txtNuevoBodega").attr('disabled', true); //variables de los elementos del modal xxxx
    $("#txtNuevoDescripcion").attr('disabled', true); //variables de los elementos del modal xxxx

    $('#ddlCBodegaSucursal').attr('disabled', true);
    $('#ddlCBodegaResponsable').attr('disabled', true);
    //vaciar elementos text de todo el modal
    $('#' + ModCBodega[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockBodega() {// nombre función xxxx

    if (EBodega == true) {// variables xxxx
        $("#btnNueBodega").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNueBodega").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter

    }
    else if (EBodega == false) {// variables xxxx
        $("#btnNueBodega").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNueBodega").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter


    }
}

//guardar CUD
$('#btnNueBodega').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formBodega.checkValidity()) {
        switch (CRUDBodega) { // variable crud xxxx
            case "C":
                FnJsAjaxCBodega(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUBodega();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDBodega();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Bodega");/////tttt
        }
    }
    console.log(formBodega.checkValidity());
});

//ajax CUD
function FnJsAjaxCBodega() {
    $.ajax({
        url: "/modulo3/VstBodega.aspx/FnCBodegaV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            Bodega: VarJsBodega,
            Descripcion:VarJsDescripcion,
            IdSucursal: VarJsIdSucursal,
            IdResponsable: VarJsIdResponsable
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Bodega Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDBodega = "error"
                console.log("No se pudo agregar Bodega");//
            }
            FnAlertaBodega(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUBodega() {
    $.ajax({
        url: "/modulo3/VstBodega.aspx/FnUBodegaV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdBodega: VarJsBodegaId,
            Bodega: VarJsBodega,
            Descripcion: VarJsDescripcion,
            IdSucursal: VarJsIdSucursal,
            IdResponsable: VarJsIdResponsable

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Bodega Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDBodega = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaBodega();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDBodega() {
    $.ajax({
        url: "/modulo3/VstBodega.aspx/FnDBodegaV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdBodega: VarJsBodegaId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Bodega Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDBodega = "error"
                console.log("No se pudo Eliminar Bodega");////tttt
            }
            FnAlertaBodega(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxEBodega() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo3/VstBodega.aspx/FnEBodegaV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdBodega: VarJsBodegaId,
            Bodega: VarJsBodega,
            IdSucursal: VarJsIdSucursal
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                EBodega = true; // variable existe xxxx
                $('#lblexistenuevoBodega').text("Existe Bodega");// id etiqueta texto etiqueta //tttt
                FnJsBlockBodega();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                EBodega = false;// variable existe xxxx
                $('#lblexistenuevoBodega').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockBodega(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExisteBodega() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoBodega').val().length >= 3 && $('#ddlCBodegaSucursal').val() > 0 && $('#ddlCBodegaResponsable').val() > 0) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoBodega').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsBodega = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteBodega()) {//nombre función verificar existe xxxx
        FnJsAjaxEBodega(); // llamar todos los existes xxxx

    }
});

$('#txtNuevoDescripcion').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsDescripcion = $(this).val(); // variable de este elemento xxxx    
});

$('#ddlCBodegaSucursal').change(function (e) {
    VarJsIdSucursal = $('#ddlCBodegaSucursal').val();
    if (VerificarExisteBodega()) {
        FnJsAjaxEBodega();
    }
});



$('#ddlCBodegaResponsable').change(function (e) {
    VarJsIdResponsable = $('#ddlCBodegaResponsable').val();
    if (VerificarExisteBodega()) {
        FnJsAjaxEBodega();
    }
});

function FnJSFillDdlBodegaSucursal() {
    $('#ddlCBodegaSucursal').empty(); // xxxx id
    $.ajax({
        type: "POST",
        url: "/modulo3/VstBodega.aspx/FnRSucursalV", // xxxx
        data: {}, /*{ data: jsonString }*/
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLBodegaSucursal == "null") {
                $('#ddlCBodegaSucursal').append($("<option> </option>").val("0").html("Seleccionar Sucursal"));  // xxxx id val html            
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLBodegaSucursal == value.Sucursal) {
                        $('#ddlCBodegaSucursal').append($("<option> </option>").val(value.IdSucursal).html(value.Sucursal));  // xxxx id texto
                        VarJsIdSucursal = value.IdSucursal;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCBodegaSucursal').append($("<option> </option>").val(value.IdSucursal).html(value.Sucursal)); // id en un val y en html el nombre
            });
            VAlDDLBodegaSucursal = "null";
        }
    });
}

function FnJSFillDdlBodegaResponsable() {
    $('#ddlCBodegaResponsable').empty(); // xxxx id
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnREmpleadoV", // xxxx
        data: {}, /*{ data: jsonString }*/
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLBodegaResponsable == "null") {
                $('#ddlCBodegaResponsable').append($("<option> </option>").val("0").html("Seleccionar Responsable"));  // xxxx id val html            
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLBodegaResponsable == value.ObjPersona.Nombre1 + ' ' + value.ObjPersona.Apellido1) {
                        $('#ddlCBodegaResponsable').append($("<option> </option>").val(value.IdEmpleado).html(value.ObjPersona.Nombre1 + ' ' + value.ObjPersona.Apellido1));  // xxxx id texto
                        VarJsIdResponsable = value.IdEmpleado;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCBodegaResponsable').append($("<option> </option>").val(value.IdEmpleado).html(value.ObjPersona.Nombre1 + ' ' + value.ObjPersona.Apellido1)); // id en un val y en html el nombre
            });
            VAlDDLBodegaResponsable = "null";
        }
    });
}

function FnAlertaBodega() {//nombre de la función xxxx

    switch (CRUDBodega) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertBodega = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertBodega = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertBodega = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertBodega = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertBodega = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertBodega = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertBodega = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertBodega = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Bodega Alert")//tttt
    }
    //alerta
    $('#alertaEmpleados .modal-content').addClass(VarJsColorAlertBodega);//variable de color alerta xxxx
    $('#alertaEmpleados h5').text(VarJsTextoAlertBodega);//variable de texto alerta xxxx
    $('#alertaEmpleados').modal('show');
    setTimeout(function () {
        $('#alertaEmpleados').modal('hide');
        $('#alertaEmpleados .modal-content').removeClass(VarJsColorAlertBodega);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblBodega.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxRBodega();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNBodega").modal("toggle");//nombre modal xxxx
}