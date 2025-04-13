/*variable de tablas*/
var tablaPromo;/*tabla mpodulo*/
var ModCPromo = $('#modalNPromo'); // modal 
//campos de tablas
var VarJsPromoId = 0;
var VarJsPromo = "";


//igual para todos
var formPromo = document.querySelector('#form1');

//variables crud
CRUDPromo = "";
//variables alertas
var VarJsColorAlertPromo = "";
var VarJsTextoAlertPromo = "";
//variables existe
var EPromo = true;


$('#lbMostrarPromo').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    FnJsAjaxRPromo(); //llama al ajax xxxx
});

function FnJsAjaxRPromo() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo10/VstPromo.aspx/FnRPromoV", // nombre de página y nombre de función xxxx
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowPromo(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowPromo(data) {//3 llenar la tabla xxxx

    $('#tblPromo').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaPromo = $("#tblPromo").DataTable({// variable nombre tabla xxxx

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
                    id: 'colPromo'//se añade el id para ocultar xxxx
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
                filename: 'Promo' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Promo', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Promo' //tttt
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
                filename: 'Promo' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
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
    tablaPromo.buttons().container().addClass('form-inline');///variable xxxx

    for (var contPromo = 0; contPromo < data.length; contPromo++) { // declarar variable de recorrido de arreglo data xxxx
        tablaPromo.row.add([//sensitivecase:
            data[contPromo].IdPromo,//campos
            data[contPromo].Promo,
            '<button value="editar" href="#modalNPromo" data-toggle="modal" title="editar" class="btn btn-warning  btn-editPromo"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNPromo" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deletePromo"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNPromo').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCPromo(); // nombre función xxxx
    EPromo = true; // variable xxxx

    FnJsBlockPromo(); // nombre función xxxx

    CRUDPromo = "C"; // nombre variable xxxx

    //campos xxxx
    VarJsPromoId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsPromo = ""; // cada campo tiene una variable, inicializar xxxx

});
$(document).on('click', '.btn-editPromo', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUPromo();//nombre de función xxxx
    var dataPromo = tablaPromo.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsPromoId = dataPromo[0]; //id de la fila seleccionada
    $('#txtNuevoPromo').val(dataPromo[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsPromo = dataPromo[1]; // variable elemento, variable data, índice xxxx

    CRUDPromo = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deletePromo', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDPromo();//nombre de función xxxx
    EPromo = false; // variable de existe xxxx


    FnJsBlockPromo();//función bloquear xxxx
    var dataPromo = tablaPromo.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsPromoId = dataPromo[0]; //id de la fila seleccionada
    $('#txtNuevoPromo').val(dataPromo[1]);// [indice columna]  de la fila seleccionada xxxx

    VarJsPromo = dataPromo[1]; // variable elemento, variable data, índice xxxx

    CRUDPromo = "D";
});

//pintar modal
function FnJsCPromo() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoPromo').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorPromo").removeAttr("class");//quitar el atributo class
    $("#DivModBorPromo").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaPromo").removeAttr("class");//quitar el atributo class
    $("#DivModHeaPromo").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitPromo').text('Nuevo Promo');//tttt
    //cambiar el color icono btn
    $("#btnNuePromo").removeAttr("class");//quitar el atributo class
    $("#btnNuePromo").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNuePromo i").removeAttr("class");
    $("#btnNuePromo i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoPromo").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCPromo[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUPromo() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoPromo').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorPromo").removeAttr("class");//quitar el atributo class
    $("#DivModBorPromo").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaPromo").removeAttr("class");//quitar el atributo class
    $("#DivModHeaPromo").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitPromo').text('Editar Promo');//tttt
    //cambiar el color icono btn
    $("#btnNuePromo").removeAttr("class");//quitar el atributo class
    $("#btnNuePromo").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNuePromo i").removeAttr("class");
    $("#btnNuePromo i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoPromo").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCPromo[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDPromo() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoPromo').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorPromo").removeAttr("class");//quitar el atributo class
    $("#DivModBorPromo").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaPromo").removeAttr("class");//quitar el atributo class
    $("#DivModHeaPromo").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitPromo').text('Eliminar Promo');//tttt
    //cambiar el color icono btn
    $("#btnNuePromo").removeAttr("class");//quitar el atributo class
    $("#btnNuePromo").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNuePromo i").removeAttr("class");
    $("#btnNuePromo i").attr("class", "fa fa-trash fa-2x");//ícono
    //bloquear elementos
    $("#txtNuevoPromo").attr('disabled', true); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCPromo[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockPromo() {// nombre función xxxx

    if (EPromo == true) {// variables xxxx
        $("#btnNuePromo").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNuePromo").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter
    }
    else if (EPromo == false) {// variables xxxx
        $("#btnNuePromo").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNuePromo").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter
    }
}

//guardar CUD
$('#btnNuePromo').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formPromo.checkValidity()) {
        switch (CRUDPromo) { // variable crud xxxx
            case "C":
                FnJsAjaxCPromo(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUPromo();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDPromo();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Promo");/////tttt
        }
    }
    console.log(formPromo.checkValidity());
});

//ajax CUD
function FnJsAjaxCPromo() {
    $.ajax({
        url: "/modulo10/VstPromo.aspx/FnCPromoV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            Promo: VarJsPromo,

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Promo Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDPromo = "error"
                console.log("No se pudo agregar Tipo de indentificación");//
            }
            FnAlertaPromo(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUPromo() {
    $.ajax({
        url: "/modulo10/VstPromo.aspx/FnUPromoV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdPromo: VarJsPromoId,
            Promo: VarJsPromo,


        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Promo Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDPromo = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaPromo();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDPromo() {
    $.ajax({
        url: "/modulo10/VstPromo.aspx/FnDPromoV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdPromo: VarJsPromoId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Promo Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDPromo = "error"
                console.log("No se pudo Eliminar Promo");////tttt
            }
            FnAlertaPromo(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxEPromo() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo10/VstPromo.aspx/FnEPromoV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdPromo: VarJsPromoId,
            Promo: VarJsPromo
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                EPromo = true; // variable existe xxxx
                $('#lblexistenuevoPromo').text("Existe Promo");// id etiqueta texto etiqueta //tttt
                FnJsBlockPromo();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                EPromo = false;// variable existe xxxx
                $('#lblexistenuevoPromo').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockPromo(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExistePromo() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoPromo').val().length > 2) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoPromo').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsPromo = $(this).val(); // variable de este elemento xxxx
    if (VerificarExistePromo()) {//nombre función verificar existe xxxx
        FnJsAjaxEPromo(); // llamar todos los existes xxxx

    }
});


function FnAlertaPromo() {//nombre de la función xxxx

    switch (CRUDPromo) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertPromo = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertPromo = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertPromo = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertPromo = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertPromo = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertPromo = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertPromo = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertPromo = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Promo Alert")//tttt
    }
    //alerta
    $('#alertaPromo .modal-content').addClass(VarJsColorAlertPromo);//variable de color alerta xxxx
    $('#alertaPromo h5').text(VarJsTextoAlertPromo);//variable de texto alerta xxxx
    $('#alertaPromo').modal('show');
    setTimeout(function () {
        $('#alertaPromo').modal('hide');
        $('#alertaPromo .modal-content').removeClass(VarJsColorAlertPromo);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblPromo.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxRPromo();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNPromo").modal("toggle");//nombre modal xxxx
}