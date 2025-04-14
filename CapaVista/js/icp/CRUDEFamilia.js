/*variable de tablas*/
var tablaFamilia;/*tabla mpodulo*/
var ModCFamilia = $('#modalNFamilia'); // modal 
//campos de tablas
var VarJsFamiliaId = 0;
var VarJsFamilia = "";


//igual para todos
var formFamilia = document.querySelector('#form1');

//variables crud
CRUDFamilia = "";
//variables alertas
var VarJsColorAlertFamilia = "";
var VarJsTextoAlertFamilia = "";
//variables existe
var EFamilia = true;


$('#lbMostrarFamilia').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    FnJsAjaxRFamilia(); //llama al ajax xxxx
});

function FnJsAjaxRFamilia() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo10/VstFamilia.aspx/FnRFamiliaV", // nombre de página y nombre de función xxxx
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowFamilia(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowFamilia(data) {//3 llenar la tabla xxxx

    $('#tblFamilia').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaFamilia = $("#tblFamilia").DataTable({// variable nombre tabla xxxx

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
                    id: 'colFamilia'//se añade el id para ocultar xxxx
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
                filename: 'Tipo de Familia' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Tipo de Familia', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Tipo de Familia' //tttt
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
                filename: 'Tipo de Familia' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
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
    tablaFamilia.buttons().container().addClass('form-inline');///variable xxxx

    for (var contFamilia = 0; contFamilia < data.length; contFamilia++) { // declarar variable de recorrido de arreglo data xxxx
        tablaFamilia.row.add([//sensitivecase:
            data[contFamilia].IdFamilia,//campos
            data[contFamilia].Familia,
            '<button value="editar" href="#modalNFamilia" data-toggle="modal" title="editar" class="btn btn-warning  btn-editFamilia"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNFamilia" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteFamilia"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNFamilia').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCFamilia(); // nombre función xxxx
    EFamilia = true; // variable xxxx

    FnJsBlockFamilia(); // nombre función xxxx

    CRUDFamilia = "C"; // nombre variable xxxx

    //campos xxxx
    VarJsFamiliaId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsFamilia = ""; // cada campo tiene una variable, inicializar xxxx

});
$(document).on('click', '.btn-editFamilia', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUFamilia();//nombre de función xxxx
    var dataFamilia = tablaFamilia.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsFamiliaId = dataFamilia[0]; //id de la fila seleccionada
    $('#txtNuevoFamilia').val(dataFamilia[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsFamilia = dataFamilia[1]; // variable elemento, variable data, índice xxxx

    CRUDFamilia = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteFamilia', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDFamilia();//nombre de función xxxx
    EFamilia = false; // variable de existe xxxx


    FnJsBlockFamilia();//función bloquear xxxx
    var dataFamilia = tablaFamilia.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsFamiliaId = dataFamilia[0]; //id de la fila seleccionada
    $('#txtNuevoFamilia').val(dataFamilia[1]);// [indice columna]  de la fila seleccionada xxxx

    VarJsFamilia = dataFamilia[1]; // variable elemento, variable data, índice xxxx

    CRUDFamilia = "D";
});

//pintar modal
function FnJsCFamilia() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoFamilia').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorFamilia").removeAttr("class");//quitar el atributo class
    $("#DivModBorFamilia").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaFamilia").removeAttr("class");//quitar el atributo class
    $("#DivModHeaFamilia").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitFamilia').text('Nuevo Tipo de Familia');//tttt
    //cambiar el color icono btn
    $("#btnNueFamilia").removeAttr("class");//quitar el atributo class
    $("#btnNueFamilia").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNueFamilia i").removeAttr("class");
    $("#btnNueFamilia i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoFamilia").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCFamilia[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUFamilia() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoFamilia').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorFamilia").removeAttr("class");//quitar el atributo class
    $("#DivModBorFamilia").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaFamilia").removeAttr("class");//quitar el atributo class
    $("#DivModHeaFamilia").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitFamilia').text('Editar Tipo de Familia');//tttt
    //cambiar el color icono btn
    $("#btnNueFamilia").removeAttr("class");//quitar el atributo class
    $("#btnNueFamilia").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNueFamilia i").removeAttr("class");
    $("#btnNueFamilia i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtNuevoFamilia").attr('disabled', false); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCFamilia[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDFamilia() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoFamilia').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorFamilia").removeAttr("class");//quitar el atributo class
    $("#DivModBorFamilia").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaFamilia").removeAttr("class");//quitar el atributo class
    $("#DivModHeaFamilia").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitFamilia').text('Eliminar Tipo de Familia');//tttt
    //cambiar el color icono btn
    $("#btnNueFamilia").removeAttr("class");//quitar el atributo class
    $("#btnNueFamilia").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNueFamilia i").removeAttr("class");
    $("#btnNueFamilia i").attr("class", "fa fa-trash fa-2x");//ícono
    //bloquear elementos
    $("#txtNuevoFamilia").attr('disabled', true); //variables de los elementos del modal xxxx

    //vaciar elementos text de todo el modal
    $('#' + ModCFamilia[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockFamilia() {// nombre función xxxx

    if (EFamilia == true) {// variables xxxx
        $("#btnNueFamilia").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNueFamilia").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter
    }
    else if (EFamilia == false) {// variables xxxx
        $("#btnNueFamilia").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNueFamilia").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter
    }
}

//guardar CUD
$('#btnNueFamilia').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formFamilia.checkValidity()) {
        switch (CRUDFamilia) { // variable crud xxxx
            case "C":
                FnJsAjaxCFamilia(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUFamilia();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDFamilia();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Tipo de Familia");/////tttt
        }
    }
    console.log(formFamilia.checkValidity());
});

//ajax CUD
function FnJsAjaxCFamilia() {
    $.ajax({
        url: "/modulo10/VstFamilia.aspx/FnCFamiliaV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            Familia: VarJsFamilia,

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Tipo de Familia Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDFamilia = "error"
                console.log("No se pudo agregar Tipo de Familia");//
            }
            FnAlertaFamilia(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUFamilia() {
    $.ajax({
        url: "/modulo10/VstFamilia.aspx/FnUFamiliaV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdFamilia: VarJsFamiliaId,
            Familia: VarJsFamilia,


        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Tipo de Familia Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDFamilia = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaFamilia();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDFamilia() {
    $.ajax({
        url: "/modulo10/VstFamilia.aspx/FnDFamiliaV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdFamilia: VarJsFamiliaId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Tipo de Familia Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDFamilia = "error"
                console.log("No se pudo Eliminar Tipo de Familia");////tttt
            }
            FnAlertaFamilia(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxEFamilia() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo10/VstFamilia.aspx/FnEFamiliaV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdFamilia: VarJsFamiliaId,
            Familia: VarJsFamilia
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                EFamilia = true; // variable existe xxxx
                $('#lblexistenuevoFamilia').text("Existe Tipo de Familia");// id etiqueta texto etiqueta //tttt
                FnJsBlockFamilia();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                EFamilia = false;// variable existe xxxx
                $('#lblexistenuevoFamilia').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockFamilia(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExisteFamilia() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoFamilia').val().length > 3) { // id de objetos de Familias, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoFamilia').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsFamilia = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteFamilia()) {//nombre función verificar existe xxxx
        FnJsAjaxEFamilia(); // llamar todos los existes xxxx

    }
});


function FnAlertaFamilia() {//nombre de la función xxxx

    switch (CRUDFamilia) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertFamilia = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertFamilia = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertFamilia = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertFamilia = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertFamilia = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertFamilia = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertFamilia = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertFamilia = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Tipo de Familia Alert")//tttt
    }
    //alerta
    $('#alertaFamilia .modal-content').addClass(VarJsColorAlertFamilia);//variable de color alerta xxxx
    $('#alertaFamilia h5').text(VarJsTextoAlertFamilia);//variable de texto alerta xxxx
    $('#alertaFamilia').modal('show');
    setTimeout(function () {
        $('#alertaFamilia').modal('hide');
        $('#alertaFamilia .modal-content').removeClass(VarJsColorAlertFamilia);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblFamilia.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxRFamilia();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNFamilia").modal("toggle");//nombre modal xxxx
}