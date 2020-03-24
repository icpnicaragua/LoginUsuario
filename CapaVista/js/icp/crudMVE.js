/*validación de formulario*/
var form = document.querySelector('#form1');
/*tablas*/
var tablaTC;

/* tc*/ 
var VarJsTicoId;//id tico para cud
var VarJSCUDEAXTico;// cadena para ajax CUD
var VarJsCUDTicoOpt; //estado de modal CUD
/*ocultar btn */
var VarjstxtCTicoTCOK;/*lo que salga de existe*/

var VarJslbTCN = $('#lbTCN');//abrir modal nuevo tico linkbutton
/*modCTIco*/
var VarJsmodalNueTC = $('#modalNueTC'); // modac CUDTico
var VarJsDivModBorTico = $('#DivModBorTico'); // modal borde
var VarJsDivModHeaTico = $('#DivModHeaTico'); // modal head
var VarJsH4ModTitTico = $('#H4ModTitTico'); // modal título
var VarJstxtNuevoTC = $('#txtNuevoTC'); // txt tc
var VarJslblexistenuevotc = $('#lblexistenuevotc'); // lbl tc
var VarJsbtnNueTC = $('#btnNueTC'); // btn modal


$('#lbMostrarTC').click(function (e) {
    e.preventDefault();
    AjaxMostrarTC();
});

function AjaxMostrarTC() { //pide los datos en bd de la tabla tbltipo_control
    $.ajax({
        type: "POST",
        url: "/modulo4/vst13.aspx/MostrarTC", // nombre de página y nombre de función
        data: {}, /*{ data: jsonString }*/
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            addrowTC(data.d); // se envía los datos recuperados a la función que llena la tabla
        }
    }
    );
}
function addrowTC(data) {//llenar la tabla

    $('#tblTC').DataTable().clear().destroy(); // necesario para actualizar, borra y destru

    tablaTC = $("#tblTC").DataTable({

        "retrieve": true,
        dom: 'Bfrtip',
        
        "order": [1, 'asc'],//"order": [[ 0, 'asc' ], [ 1, 'desc' ]] // columna, orden
        "columnDefs": [
            { "targets": 2, "searchable": false },
            { "orderable": false, "targets": 2 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colvistc'//se añade el id para ocultar
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
                    columns: [':not(:eq(2)):visible'] /// index 2 de controles 
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
                    columns: [':not(:eq(2)):visible'] /// index 2 de controles 
                },
                titleAttr: 'PDF',
                filename: 'Tico' + "_" + FnJsDate() + "_" + FnJsHour(),
                pageSize: 'LETTER',              
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')
                },
                customize: function (doc) {
                    doc.content.splice(0, 1);
                    var jsDate = FnJsDate() + " " + FnJsHour();
                    var image = FnJsLogo64();
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
                                    text: 'Soaz Dt',
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte soaz'
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
                filename: 'Tico' + "_" + FnJsDate() + "_" + FnJsHour(),
                text: '<i class="far fa-file-excel fa-2x"></i>',
                className: 'btn btn-success d-none d-lg-block',
                exportOptions: {
                    columns: [':not(:eq(2)):visible'] /// index 6 de controles 
                },
                titleAttr: 'Excel',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')
                       
                }

            }
        ],
        "language": FnJsEspTbl()
    });
    tablaTC.buttons().container().addClass('form-inline');///nuevo
    //$('#secciontblTC .dt-buttons').addClass('form-inline');//nuevo

    for (var contTC = 0; contTC < data.length; contTC++) {
        tablaTC.row.add([
            data[contTC].Idtipocontrol,
            data[contTC].Tipocontrol,
            '<button value="editar" href="#modalNueTC" data-toggle="modal" title="editar" class="btn btn-warning  btn-editTC"><i class="fas fa-pencil-alt"></i> </button>' +
            '<button value="eliminar" href="#modalNueTC" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteTC"><i class="fa fa-trash" ></i> </button>'
        ]
        ).draw(false);
    }
}


VarJslbTCN.click(function (e) {
    e.preventDefault(); 
    VarJsTicoId = 0;
    VarJsCUDTicoOpt = "C";
    //pinta
    FnJsSCUDModTico();

    //quita btn
    VarjstxtCTicoTCOK = true;
    FnJsSbtnCTico();
  });

function FnJsSCUDModTico() {
    if (VarJsCUDTicoOpt == "C") {
        //cambiar el color del modal borde
        $("#DivModBorTico").removeAttr("class");//quitar el atributo class
        $("#DivModBorTico").attr('class', 'modal-content border-success');//poner verde
        //cambiar el color del modal header
        $("#DivModHeaTico").removeAttr("class");//quitar el atributo class
        $("#DivModHeaTico").attr('class', 'modal-header bg-success');//poner verde
        //cambiar el titulo del modal header
        $('#H4ModTitTico').text('Nuevo Tipo de Control');
        //cambiar el color icono btn
        $("#btnNueTC").removeAttr("class");//quitar el atributo class
        $("#btnNueTC").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
        $("#btnNueTC i").removeAttr("class");
        $("#btnNueTC i").attr("class", "fa fa-save fa-2x");
        //bloquear elementos
        $("#txtNuevoTC").attr('disabled', false);
        //vaciar elementos text
        $('#' + VarJsmodalNueTC[0].id + ' :text').val("");
     
      

    }
    else if (VarJsCUDTicoOpt == "U") {
        //cambiar el color del modal borde
        $("#DivModBorTico").removeAttr("class");//quitar el atributo class
        $("#DivModBorTico").attr('class', 'modal-content border-warning');//poner verde
        //cambiar el color del modal header
        $("#DivModHeaTico").removeAttr("class");//quitar el atributo class
        $("#DivModHeaTico").attr('class', 'modal-header bg-warning');//poner verde
        //cambiar el titulo del modal header
        $('#H4ModTitTico').text('Editar Tipo de Control');
        //cambiar el color icono btn
        $("#btnNueTC").removeAttr("class");//quitar el atributo class
        $("#btnNueTC").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
        $("#btnNueTC i").removeAttr("class");
        $("#btnNueTC i").attr("class", "fa fa-save fa-2x");
        //bloquear elementos
        $("#txtNuevoTC").attr('disabled', false);

    }
    else if (VarJsCUDTicoOpt == "D") {
        //cambiar el color del modal borde
        $("#DivModBorTico").removeAttr("class");//quitar el atributo class
        $("#DivModBorTico").attr('class', 'modal-content border-danger');//poner verde
        //cambiar el color del modal header
        $("#DivModHeaTico").removeAttr("class");//quitar el atributo class
        $("#DivModHeaTico").attr('class', 'modal-header bg-danger');//poner verde
        //cambiar el titulo del modal header
        $('#H4ModTitTico').text('Eliminar Tipo de Control');
        //cambiar el color icono btn
        $("#btnNueTC").removeAttr("class");//quitar el atributo class
        $("#btnNueTC").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
        $("#btnNueTC i").removeAttr("class");
        $("#btnNueTC i").attr("class", "fa fa-trash fa-2x");
        //bloquear elementos
        $("#txtNuevoTC").attr('disabled', true);
     
    }

    //las etiquetas siempre tienen que regresar a null
    //vaciar etiquetas
    $('#' + VarJsmodalNueTC[0].id + ' label').text("");

}

$(document).on('click', '.btn-editTC', function (e) {//en este docimento en un evento click de una clase btn-edit, agarra el evento e de una funcion
    e.preventDefault(); //evitar que haga postback
    var datatc = tablaTC.row($(this).parents("tr")).data();// agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsTicoId = datatc[0]; //id de la fila seleccionada
    VarJstxtNuevoTC.val(datatc[1]);// [indice columna]  de la fila seleccionada

    VarJsCUDTicoOpt = "U";
    FnJsSCUDModTico();

    VarjstxtCTicoTCOK = true;
    FnJsSbtnCTico();
});

$(document).on('click', '.btn-deleteTC', function (e) {//en este docimento en un evento click de una clase btn-edit, agarra el evento e de una funcion
    e.preventDefault(); //evitar que haga postback
    var datatc = tablaTC.row($(this).parents("tr")).data();// agarra la fila, luego hay que llamar datatc con subíndice de la columna

    VarJsTicoId = datatc[0];//id de la fila seleccionada
    VarJstxtNuevoTC.val(datatc[1]); // [indice columna]  de la fila seleccionada, texto de tc

    VarJsCUDTicoOpt = "D";
    FnJsSCUDModTico();

    VarjstxtCTicoTCOK = false;
    FnJsSbtnCTico();
});

function FnJsAlerta(SeccionTbl) {
    var VarJsColorAlert;//variable que guarda el color de la alerta
    var VarJsTextoAlert;//variable que guarda el texto de la alerta

    switch (VarJsCUDTicoOpt) {//no solo tiene que leer el de tico, tiene que leer el de todas las tablas ojo
        case "C":
            VarJsColorAlert = "bg-success";
            VarJsTextoAlert = "Creado";
            break;
        case "U":
            VarJsColorAlert = "bg-warning";
            VarJsTextoAlert = "Actualizado";
            break;
        case "D":
            VarJsColorAlert = "bg-danger";
            VarJsTextoAlert = "Eliminado";
            break;
        default:
            console.log("Error CUD Alert")
    }

    //alerta
    $('#alerta .modal-content').addClass(VarJsColorAlert);
    $('#alerta h5').text(VarJsTextoAlert);
    $('#alerta').modal('show');
    setTimeout(function () {
        $('#alerta').modal('hide');
        $('#alerta .modal-content').removeClass(VarJsColorAlert);
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    switch (SeccionTbl) {
        case "Tico":
            //actualizar la tabla
            if ($("#secciontblTC.show").length > 0) {//si se mira la seccion tabla
                AjaxMostrarTC();
            }
            //cerrar modal
            VarJsmodalNueTC.modal("toggle");
            break;
        case "Elem":
            //actualizar la tabla
            if ($("#secciontblTC.show").length > 0) {//si se mira la seccion tabla
                AjaxMostrarTC();
            }
            //cerrar modal
            VarJsmodalNueTC.modal("toggle");
            break;
        case "Vist":
            //actualizar la tabla
            if ($("#secciontblTC.show").length > 0) {//si se mira la seccion tabla
                AjaxMostrarTC();
            }
            //cerrar modal
            VarJsmodalNueTC.modal("toggle");
            break;
        case "Modu":
            //actualizar la tabla
            if ($("#secciontblTC.show").length > 0) {//si se mira la seccion tabla
                AjaxMostrarTC();
            }
            //cerrar modal
            VarJsmodalNueTC.modal("toggle");
            break;
        default:
            console.log("Error CUDE Alert")
    }


  
 
   

}

/*quitar btn tico*/
function FnJsSbtnCTico() {
    if (VarjstxtCTicoTCOK==true) {
        VarJsbtnNueTC.fadeOut("fast"); //efecto de fuga para desapareecer 
        VarJsbtnNueTC.attr('disabled', true);  // se tiene que deshabilitar el btn para que no permita tap enter
    }
    else if (VarjstxtCTicoTCOK == false) {
        VarJsbtnNueTC.fadeIn("slow"); //efecto de fuga para apareecer 
        VarJsbtnNueTC.attr('disabled', false);  // se tiene que habilitar el btn para que  permita tap enter
    }
}

function FnJsAjaxCUDETico(CUDEAJAX) {
    $.ajax({
        url: "/modulo4/vst13.aspx/FnETicoTC", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            id: VarJsTicoId,
            tc: VarJstxtNuevoTC.val(),
            CUDE: CUDEAJAX
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {

            switch (CUDEAJAX) {
                case "C":
                    if (data.d) {

                        FnJsAlerta("Tico");
                    }
                    else {
                        console.log("Creado malo");

                    }
                    break;
                case "U":
                    if (data.d) {
                        FnJsAlerta("Tico");
                    }
                    else {
                        console.log("actu malo");

                    }
                    break;
                case "D":
                    if (data.d) {
                        FnJsAlerta("Tico");
                    }
                    else {
                        console.log("eli malo");

                    }
                    break;
                case "ETC":
                    if (data.d) {
                        VarJslblexistenuevotc.text("Ya Existe TC"); //quitar lo que se imprimió en la etiqueta 
                        VarjstxtCTicoTCOK = true;
                    }
                    else {
                        VarJslblexistenuevotc.text("");// imprimir en la etiqueta
                        VarjstxtCTicoTCOK = false;
                    }
                    break;
                default:
                    console.log("Error CUDE Tico")
            }

            FnJsSbtnCTico();//a la verga el btn

        }
    });//ajax fin
}
/*cambio en txt tico*/
VarJstxtNuevoTC.keyup(function (e) {
    //llamar ajaxCUDE existe
    FnJsETico("E");
});

function FnJsETico(CUDEAJAX) {


    if (VarJstxtNuevoTC.val().length > 3) {// minimo de caracteres
        if (CUDEAJAX == "E") {
            CUDEAJAX = "ETC";
        }
    }
    else if (VarJstxtNuevoTC.val().length <= 3) {
        VarjstxtCTicoTCOK = true;
        FnJsSbtnCTico();//a la verga el btn
        return;
    }
        
    FnJsAjaxCUDETico(CUDEAJAX);
    
 
}

/*evento btnnuevotc*/
VarJsbtnNueTC[0].addEventListener('click', function (e) {
    if (form.checkValidity()) {
        e.preventDefault();
        FnJsETico(VarJsCUDTicoOpt);
    }
}, false);



