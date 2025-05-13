/*variable de tablas*/
var tablaEstante;/*tabla mpodulo*/
var ModCEstante = $('#modalNEstante'); // modal 
//campos de tablas
var VarJsEstanteId = 0;
var VarJsEstante = "";
var VarJsIdRack = 0;
//dddlist Rack
var VAlDDLEstanteRack = "null";// para guardar lo que está en la tabla y luego asignar al ddl

//igual para todos
var formEstante = document.querySelector('#form1');

//variables crud
CRUDEstante = "";
//variables alertas
var VarJsColorAlertEstante = "";
var VarJsTextoAlertEstante = "";
//variables existe
var EEstante = true;


$('#lbMostrarEstante').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    FnJsAjaxREstante(); //llama al ajax xxxx
    FnJSFillDdlEstanteRack();//cargar ddl
});

function FnJsAjaxREstante() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo3/Vstbodega.aspx/FnREstanteV", // nombre de página y nombre de función xxxx
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowEstante(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowEstante(data) {//3 llenar la tabla xxxx

    $('#tblEstante').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaEstante = $("#tblEstante").DataTable({// variable nombre tabla xxxx

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
                    id: 'colEstante'//se añade el id para ocultar xxxx
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
                filename: 'Estante' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Estante', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Estante' //tttt
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
                filename: 'Estante' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
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
    tablaEstante.buttons().container().addClass('form-inline');///variable xxxx

    for (var contEstante = 0; contEstante < data.length; contEstante++) { // declarar variable de recorrido de arreglo data xxxx
        tablaEstante.row.add([//sensitivecase:
            data[contEstante].IdEstante,//campos
            data[contEstante].Estante,//campos
            data[contEstante].ObjRack.Rack,
            '<button value="editar" href="#modalNEstante" data-toggle="modal" title="editar" class="btn btn-warning  btn-editEstante"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNEstante" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteEstante"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNEstante').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCEstante(); // nombre función xxxx
    EEstante = true; // variable xxxx

    FnJsBlockEstante(); // nombre función xxxx
    FnJSFillDdlEstanteRack();
    CRUDEstante = "C"; // nombre variable xxxx

    //campos xxxx
    VarJsEstanteId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsEstante = ""; // cada campo tiene una variable, inicializar xxxx
    VarJsIdRack = 0;

});
$(document).on('click', '.btn-editEstante', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUEstante();//nombre de función xxxx
    var dataEstante = tablaEstante.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsEstanteId = dataEstante[0]; //id de la fila seleccionada
    $('#txtNuevoEstante').val(dataEstante[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsEstante = dataEstante[1]; // variable elemento, variable data, índice xxxx
    VAlDDLEstanteRack = (dataEstante[2]);
    FnJSFillDdlEstanteRack();
    VarJsIdRack = $('#ddlCEstanteRack').val();
    CRUDEstante = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteEstante', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDEstante();//nombre de función xxxx
    EEstante = false; // variable de existe xxxx


    FnJsBlockEstante();//función bloquear xxxx
    var dataEstante = tablaEstante.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsEstanteId = dataEstante[0]; //id de la fila seleccionada
    $('#txtNuevoEstante').val(dataEstante[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsEstante = dataEstante[1]; // variable elemento, variable data, índice xxxx
    VAlDDLEstanteRack = (dataEstante[2]);
    FnJSFillDdlEstanteRack();

    CRUDEstante = "D";
});

//pintar modal
function FnJsCEstante() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoEstante').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorEstante").removeAttr("class");//quitar el atributo class
    $("#DivModBorEstante").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaEstante").removeAttr("class");//quitar el atributo class
    $("#DivModHeaEstante").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitEstante').text('Nuevo Estante');//tttt
    //cambiar el color icono btn
    $("#btnNueEstante").removeAttr("class");//quitar el atributo class
    $("#btnNueEstante").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNueEstante i").removeAttr("class");
    $("#btnNueEstante i").attr("class", "fa fa-save fa-2x");
    //color ddl
    $("#ddlCEstanteRack").removeAttr("class"); //uitar propiedades
    $("#ddlCEstanteRack").attr("class", "form-control border-success");//pintr roo
    //bloquear elementos
    $("#txtNuevoEstante").attr('disabled', false); //variables de los elementos del modal xxxx
    $('#ddlCEstanteRack').attr('disabled', false);
    //vaciar elementos text de todo el modal
    $('#' + ModCEstante[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUEstante() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoEstante').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorEstante").removeAttr("class");//quitar el atributo class
    $("#DivModBorEstante").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaEstante").removeAttr("class");//quitar el atributo class
    $("#DivModHeaEstante").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitEstante').text('Editar Estante');//tttt
    //cambiar el color icono btn
    $("#btnNueEstante").removeAttr("class");//quitar el atributo class
    $("#btnNueEstante").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNueEstante i").removeAttr("class");
    $("#btnNueEstante i").attr("class", "fa fa-save fa-2x");
    //color ddl
    $("#ddlCEstanteRack").removeAttr("class"); //uitar propiedades
    $("#ddlCEstanteRack").attr("class", "form-control border-warning");//pintr roo
    //bloquear elementos
    $("#txtNuevoEstante").attr('disabled', false); //variables de los elementos del modal xxxx
    $('#ddlCEstanteRack').attr('disabled', false);
    //vaciar elementos text de todo el modal
    $('#' + ModCEstante[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDEstante() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoEstante').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorEstante").removeAttr("class");//quitar el atributo class
    $("#DivModBorEstante").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaEstante").removeAttr("class");//quitar el atributo class
    $("#DivModHeaEstante").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitEstante').text('Eliminar Estante');//tttt
    //cambiar el color icono btn
    $("#btnNueEstante").removeAttr("class");//quitar el atributo class
    $("#btnNueEstante").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNueEstante i").removeAttr("class");
    $("#btnNueEstante i").attr("class", "fa fa-trash fa-2x");//ícono
    //color ddl
    $("#ddlCEstanteRack").removeAttr("class"); //uitar propiedades
    $("#ddlCEstanteRack").attr("class", "form-control border-danger");//pintr roo
    //bloquear elementos
    $("#txtNuevoEstante").attr('disabled', true); //variables de los elementos del modal xxxx
    $('#ddlCEstanteRack').attr('disabled', true);
    //vaciar elementos text de todo el modal
    $('#' + ModCEstante[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockEstante() {// nombre función xxxx

    if (EEstante == true) {// variables xxxx
        $("#btnNueEstante").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNueEstante").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter

    }
    else if (EEstante == false) {// variables xxxx
        $("#btnNueEstante").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNueEstante").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter


    }
}

//guardar CUD
$('#btnNueEstante').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formEstante.checkValidity()) {
        switch (CRUDEstante) { // variable crud xxxx
            case "C":
                FnJsAjaxCEstante(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUEstante();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDEstante();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Estante");/////tttt
        }
    }
    console.log(formEstante.checkValidity());
});

//ajax CUD
function FnJsAjaxCEstante() {
    $.ajax({
        url: "/modulo3/Vstbodega.aspx/FnCEstanteV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            Estante: VarJsEstante,
            IdRack: VarJsIdRack
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Estante Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDEstante = "error"
                console.log("No se pudo agregar Estante");//
            }
            FnAlertaEstante(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUEstante() {
    $.ajax({
        url: "/modulo3/Vstbodega.aspx/FnUEstanteV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdEstante: VarJsEstanteId,
            Estante: VarJsEstante,
            IdRack: VarJsIdRack

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Estante Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDEstante = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaEstante();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDEstante() {
    $.ajax({
        url: "/modulo3/Vstbodega.aspx/FnDEstanteV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdEstante: VarJsEstanteId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Estante Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDEstante = "error"
                console.log("No se pudo Eliminar Estante");////tttt
            }
            FnAlertaEstante(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxEEstante() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo3/Vstbodega.aspx/FnEEstanteV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdEstante: VarJsEstanteId,
            Estante: VarJsEstante,
            IdRack: VarJsIdRack
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                EEstante = true; // variable existe xxxx
                $('#lblexistenuevoEstante').text("Existe Estante");// id etiqueta texto etiqueta //tttt
                FnJsBlockEstante();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                EEstante = false;// variable existe xxxx
                $('#lblexistenuevoEstante').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockEstante(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExisteEstante() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoEstante').val().length >= 3 && $('#ddlCEstanteRack').val() > 0) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoEstante').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsEstante = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteEstante()) {//nombre función verificar existe xxxx
        FnJsAjaxEEstante(); // llamar todos los existes xxxx

    }
});

$('#ddlCEstanteRack').change(function (e) {
    VarJsIdRack = $('#ddlCEstanteRack').val();
    if (VerificarExisteEstante()) {
        FnJsAjaxEEstante();
    }
});

function FnJSFillDdlEstanteRack() {
    $('#ddlCEstanteRack').empty(); // xxxx id
    $.ajax({
        type: "POST",
        url: "/modulo3/Vstbodega.aspx/FnRRackV", // xxxx
        data: {}, /*{ data: jsonString }*/
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLEstanteRack == "null") {
                $('#ddlCEstanteRack').append($("<option> </option>").val("0").html("Seleccionar Rack"));  // xxxx id val html            
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLEstanteRack == value.Rack) {
                        $('#ddlCEstanteRack').append($("<option> </option>").val(value.IdRack).html(value.Rack));  // xxxx id texto
                        VarJsIdRack = value.IdRack;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCEstanteRack').append($("<option> </option>").val(value.IdRack).html(value.Rack)); // id en un val y en html el nombre
            });
            VAlDDLEstanteRack = "null";
        }
    });
}

function FnAlertaEstante() {//nombre de la función xxxx

    switch (CRUDEstante) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertEstante = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertEstante = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertEstante = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertEstante = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertEstante = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertEstante = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertEstante = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertEstante = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Estante Alert")//tttt
    }
    //alerta
    $('#alertaBodega .modal-content').addClass(VarJsColorAlertEstante);//variable de color alerta xxxx
    $('#alertaBodega h5').text(VarJsTextoAlertEstante);//variable de texto alerta xxxx
    $('#alertaBodega').modal('show');
    setTimeout(function () {
        $('#alertaBodega').modal('hide');
        $('#alertaBodega .modal-content').removeClass(VarJsColorAlertEstante);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblEstante.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxREstante();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNEstante").modal("toggle");//nombre modal xxxx
}