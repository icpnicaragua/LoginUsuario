/*variable de tablas*/
var tablaArea;/*tabla mpodulo*/
var ModCArea = $('#modalNArea'); // modal 
//campos de tablas
var VarJsAreaId = 0;
var VarJsArea = "";


//igual para todos
var formArea = document.querySelector('#form1');

//variables crud
CRUDArea = "";
//variables alertas
var VarJsColorAlertArea = "";
var VarJsTextoAlertArea = "";
//variables existe
var EArea = true;


$('#lbMostrarArea').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    FnJsAjaxRArea(); //llama al ajax xxxx
});

function FnJsAjaxRArea() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnRAreaV", // nombre de página y nombre de función xxxx
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowArea(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowArea(data) {//3 llenar la tabla xxxx

    $('#tblArea').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaArea = $("#tblArea").DataTable({// variable nombre tabla xxxx

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
                    id: 'colArea'//se añade el id para ocultar xxxx
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
                filename: 'Área' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Área', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Área' //tttt
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
                filename: 'Área' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
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
    tablaArea.buttons().container().addClass('form-inline');///variable xxxx

    for (var contArea = 0; contArea < data.length; contArea++) { // declarar variable de recorrido de arreglo data xxxx
        tablaArea.row.add([//sensitivecase:
            data[contArea].IdArea,//campos
            data[contArea].Area,
            '<button value="editar" href="#modalNArea" data-toggle="modal" title="editar" class="btn btn-warning  btn-editArea"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNArea" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteArea"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNArea').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCArea(); // nombre función xxxx
    EArea = true; // variable xxxx

    FnJsBlockArea(); // nombre función xxxx

    CRUDArea = "C"; // nombre variable xxxx

    //campos xxxx
    VarJsAreaId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsArea = ""; // cada campo tiene una variable, inicializar xxxx

});
$(document).on('click', '.btn-editArea', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUArea();//nombre de función xxxx
    var dataArea = tablaArea.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsAreaId = dataArea[0]; //id de la fila seleccionada
    $('#txtNuevoArea').val(dataArea[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsArea = dataArea[1]; // variable elemento, variable data, índice xxxx

    CRUDArea = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteArea', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDArea();//nombre de función xxxx
    EArea = false; // variable de existe xxxx


    FnJsBlockArea();//función bloquear xxxx
    var dataArea = tablaArea.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsAreaId = dataArea[0]; //id de la fila seleccionada
    $('#txtNuevoArea').val(dataArea[1]);// [indice columna]  de la fila seleccionada xxxx

    VarJsArea = dataArea[1]; // variable elemento, variable data, índice xxxx

    CRUDArea = "D";
});

//pintar modal
function FnJsCArea() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoArea').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorArea").removeAttr("class");//quitar el atributo class
    $("#DivModBorArea").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaArea").removeAttr("class");//quitar el atributo class
    $("#DivModHeaArea").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitArea').text('Nuevo Área');//tttt
    //cambiar el color icono btn
    $("#btnNueArea").removeAttr("class");//quitar el atributo class
    $("#btnNueArea").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNueArea i").removeAttr("class");
    $("#btnNueArea i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoArea").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCArea[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUArea() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoArea').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorArea").removeAttr("class");//quitar el atributo class
    $("#DivModBorArea").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaArea").removeAttr("class");//quitar el atributo class
    $("#DivModHeaArea").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitArea').text('Editar Área');//tttt
    //cambiar el color icono btn
    $("#btnNueArea").removeAttr("class");//quitar el atributo class
    $("#btnNueArea").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNueArea i").removeAttr("class");
    $("#btnNueArea i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoArea").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCArea[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDArea() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoArea').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorArea").removeAttr("class");//quitar el atributo class
    $("#DivModBorArea").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaArea").removeAttr("class");//quitar el atributo class
    $("#DivModHeaArea").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitArea').text('Eliminar Área');//tttt
    //cambiar el color icono btn
    $("#btnNueArea").removeAttr("class");//quitar el atributo class
    $("#btnNueArea").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNueArea i").removeAttr("class");
    $("#btnNueArea i").attr("class", "fa fa-trash fa-2x");//ícono
    //bloquear elementos
    $("#txtNuevoArea").attr('disabled', true); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCArea[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockArea() {// nombre función xxxx

    if (EArea == true) {// variables xxxx
        $("#btnNueArea").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNueArea").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter
    }
    else if (EArea == false) {// variables xxxx
        $("#btnNueArea").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNueArea").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter
    }
}

//guardar CUD
$('#btnNueArea').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formArea.checkValidity()) {
        switch (CRUDArea) { // variable crud xxxx
            case "C":
                FnJsAjaxCArea(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUArea();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDArea();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Área");/////tttt
        }
    }
    console.log(formArea.checkValidity());
});

//ajax CUD
function FnJsAjaxCArea() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnCAreaV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            Area: VarJsArea,

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Área Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDArea = "error"
                console.log("No se pudo agregar Tipo de indentificación");//
            }
            FnAlertaArea(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUArea() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnUAreaV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdArea: VarJsAreaId,
            Area: VarJsArea,


        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Área Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDArea = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaArea();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDArea() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnDAreaV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdArea: VarJsAreaId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Área Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDArea = "error"
                console.log("No se pudo Eliminar Área");////tttt
            }
            FnAlertaArea(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxEArea() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnEAreaV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdArea: VarJsAreaId,
            Area: VarJsArea
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                EArea = true; // variable existe xxxx
                $('#lblexistenuevoArea').text("Existe Área");// id etiqueta texto etiqueta //tttt
                FnJsBlockArea();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                EArea = false;// variable existe xxxx
                $('#lblexistenuevoArea').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockArea(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExisteArea() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoArea').val().length > 3) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoArea').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsArea = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteArea()) {//nombre función verificar existe xxxx
        FnJsAjaxEArea(); // llamar todos los existes xxxx

    }
});


function FnAlertaArea() {//nombre de la función xxxx

    switch (CRUDArea) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertArea = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertArea = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertArea = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertArea = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertArea = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertArea = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertArea = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertArea = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Área Alert")//tttt
    }
    //alerta
    $('#alertaEmpleados .modal-content').addClass(VarJsColorAlertArea);//variable de color alerta xxxx
    $('#alertaEmpleados h5').text(VarJsTextoAlertArea);//variable de texto alerta xxxx
    $('#alertaEmpleados').modal('show');
    setTimeout(function () {
        $('#alertaEmpleados').modal('hide');
        $('#alertaEmpleados .modal-content').removeClass(VarJsColorAlertArea);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblArea.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxRArea();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNArea").modal("toggle");//nombre modal xxxx
}