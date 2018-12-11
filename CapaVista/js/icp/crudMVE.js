/*validación de formulario*/
var form = document.querySelector('#form1');
/*tablas*/
var tablaTC;
var tablaE;
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

/*E*/
var VarJsElemId;//id elem para cud

/*modCElem*/
var VarJsModCElem = $('#ModCElem');
var VarJslblCElemEl = $('#lblCElemEl');
var VarJstxtCElemEl = $('#txtCElemEl');
var VarJslblCElemAs = $('#lblCElemAs');
var VarJstxtCElemAs = $('#txtCElemAs');
var VarJsDdlCElemTC = $('#DdlCElemTC');
var VarJSDdlCElemVi = $('#DdlCElemVi');
var VarJsbtnCElem = $("#btnCElem");

/*ocultar btnCelem*/
var VarJsDdlCElemOK;
var VarjstxtCElemAEOK;
var VarjstxtCElemElOK;

$('#lbMostrarTC').click(function (e) {
    e.preventDefault();
    console.log("mostrar tabla tc");
    AjaxMostrarTC();
});
$('#lbMostrarE').click(function (e) {
    e.preventDefault();
    console.log("mostrar tabla E");
    AjaxMostrarE();
});

function AjaxMostrarTC() {
    $.ajax({
        type: "POST",
        url: "/modulo4/vista13.aspx/MostrarTC", // nombre de página y nombre de función
        data: {}, /*{ data: jsonString }*/
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            addrowTC(data.d); // 
        }
    }
    );
}
function addrowTC(data) {

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
                className: 'btn btn-primary',
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
                    columns: [':not(:eq(2)):visible'] /// index 6 de controles 
                },
                titleAttr: 'PDF',
                filename: 'TC',
                pageSize: 'LETTER',
                title: 'tc titulo',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')
                }

            },
            {
                extend: 'excel',
                text: '<i class="far fa-file-excel fa-2x"></i>',
                className: 'btn btn-success',
                exportOptions: {
                    columns: [':not(:eq(2)):visible'] /// index 6 de controles 
                },
                titleAttr: 'Excel',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')
                }

            }
        ]
        // "language": traduccion_espa
    });
    tablaTC.buttons().container()
        .appendTo($('.col-sm-6:eq(0)', tablaTC.table().container()));

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

function AjaxMostrarE() {
    $.ajax({
        type: "POST",
        url: "/modulo4/vista13.aspx/FnRElem", // nombre de página y nombre de función
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            addrowE(data.d); // 
        }
    }
    );
}
function addrowE(data) {

    $('#tblE').DataTable().clear().destroy(); // necesario para actualizar, borra y destru

    tablaE = $("#tblE").DataTable({

        "retrieve": true,
        dom: 'Bfrtip',
        "order": [1, 'asc'],//"order": [[ 0, 'asc' ], [ 1, 'desc' ]] // columna, orden
        "columnDefs": [
            {"targets": 6,"searchable": false},
            { "orderable": false, "targets": 6 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colvise'//se añade el id para ocultar
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
                className: 'btn btn-primary',
                exportOptions: {
                    columns: [':not(:eq(6)):visible'] /// index 6 de controles 
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
                    columns: [':not(:eq(6)):visible'] /// index 6 de controles 
                },
                titleAttr: 'PDF',
                filename: 'TC',
                pageSize: 'LETTER',
                title: 'tc titulo',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')
                }

            },
            {
                extend: 'excel',
                text: '<i class="far fa-file-excel fa-2x"></i>',
                className: 'btn btn-success',
                exportOptions: {
                    columns: [':not(:eq(6)):visible'] /// index 6 de controles 
                },
                titleAttr: 'Excel',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')
                }

            }
        ]
        // "language": traduccion_espa
    });

    for (var contE = 0; contE < data.length; contE++) {
        tablaE.row.add([
            data[contE].Id_elemento,
            data[contE].Elemento,
            data[contE].Idaspelemento,
            data[contE].Fecha_inicioElemento,
            data[contE].ObjTipo_control.Tipocontrol,
            data[contE].ObjVista.Vista,           
            '<button value="editar" href="#modalEdiTC" data-toggle="modal" title="editar" class="btn btn-warning  btn-editTC"><i class="fas fa-pencil-alt"></i> </button>' +
            '<button value="eliminar" href="#modaldelTC" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteTC"><i class="fa fa-trash" ></i> </button>'
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
    console.log(datatc[0] + " " + datatc[1] + " nuevo"); // quitar esta mierda
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
    VarJstxtNuevoTC.text(datatc[1]); // [indice columna]  de la fila seleccionada

    VarJsCUDTicoOpt = "D";
    FnJsSCUDModTico();

    VarjstxtCTicoTCOK = false;
    FnJsSbtnCTico();
});

function FnJsAlerta(SeccionTbl) {
    var VarJsColorAlert;
    var VarJsTextoAlert;

    switch (VarJsCUDTicoOpt) {
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
    }, 1200);

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
        url: "/modulo4/vista13.aspx/FnETicoTC", // nombre de página y nombre de función cude
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
                        VarJslblexistenuevotc.text(""); //quitar lo que se imprimió en la etiqueta 
                        VarjstxtCTicoTCOK = false;
                    }
                    else {
                        VarJslblexistenuevotc.text("Ya Existe TC");// imprimir en la etiqueta
                        VarjstxtCTicoTCOK = true;
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


VarJsbtnNueTC[0].addEventListener('click', function (e) {
    if (form.checkValidity()) {
        e.preventDefault();
        FnJsETico(VarJsCUDTicoOpt);
    }
}, false);

/*$('#btnNueTC').click(function (e) {
    e.preventDefault();
    FnJsETico(VarJsCUDTicoOpt);
});*/

/*evento btnCElem*/
VarJsbtnCElem[0].addEventListener('click', function (e) {
    if (form.checkValidity()) {
        e.preventDefault();
        console.log("elemento nuevo guardado");

    }
}, false);


/*al abrir modal CElem*/
$('#lbEN').click(function (e) {
    e.preventDefault();
    console.log("modal nuevo elem");
    VarJsElemId = '0';

    //llenar ddl
    FnJSCUElemTC();
    FnJSCUElemVi();
    
    VarJsDdlCElemOK = true;
    VarjstxtCElemAEOK = true;
    VarjstxtCElemElOK = true;
    FnJsSbtnCelem();


    $('#FrmCElem :text').val("");//vaciar txt
    $('#FrmCElem label').text("");//vaciar lbl

});

/*poner el cursos en el primer txtbox de modal elemento*/
VarJsModCElem.on('shown.bs.modal', function () {
    VarJstxtCElemEl.focus();   
})

/*iniciar ddl tico*/ 
function FnJSCUElemTC() {
    VarJsDdlCElemTC.empty();
    VarJsDdlCElemTC.append($("<option> </option>").val("0").html("Seleccionar Tipo Control"));
    $.ajax({
        type: "POST",
        url: "/modulo4/vista13.aspx/MostrarTC", // nombre de página y nombre de función
        data: {}, /*{ data: jsonString }*/
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            $.each(data.d, function (data, value) {
                VarJsDdlCElemTC.append($("<option> </option>").val(value.Idtipocontrol).html(value.Tipocontrol));
            });
            
        }
    });
}

/*iniciar ddl vist*/
function FnJSCUElemVi() {
    VarJSDdlCElemVi.empty();
    VarJSDdlCElemVi.append($("<option> </option>").val("0").html("Seleccionar Vista"));
    $.ajax({
        type: "POST",
        url: "/modulo4/vista13.aspx/FnRVist", // nombre de página y nombre de función
        data: {}, /*{ data: jsonString }*/
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            $.each(data.d, function (data, value) {
                VarJSDdlCElemVi.append($("<option> </option>").val(value.Idvista).html(value.Vista + " - " + value.ObjModulo.Modulo));
            });

        }
    });
}

/*existe elemento*/
function FnJsEElem() {
    if (VarJSDdlCElemVi.val() != 0) {
        /*existe elemento elemento*/
        if (VarJstxtCElemEl.val().length > 3 && VarJsDdlCElemTC.val() != 0) {

            $.ajax({
                    url: "/modulo4/vista13.aspx/FnEElemEl", // nombre de página y nombre de función
                    contentType: 'application/json; charser=utf-8',
                    data: JSON.stringify({
                        EIdEl: VarJsElemId,
                        EElem: VarJstxtCElemEl.val(),
                        EIdTC: VarJsDdlCElemTC.val().toString(),
                        EIdVi: VarJSDdlCElemVi.val().toString()
                    }), /*parametro: valor*/
                    method: 'post',
                    error: function (xhr, ajaxOptions, thrownError) {
                        console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
                    },
                    success: function (data) {
                        if (data.d) {
                            VarJslblCElemEl.text("Ya Existe Elemento"); //imprimir en la etiqueta 
                            VarjstxtCElemElOK = true;                                
                        }
                        else {
                            VarJslblCElemEl.text("");// quitar lo que se imprimió en la etiqueta
                            VarjstxtCElemElOK = false;                            
                        }
                        FnJsSbtnCelem();//ocultar bton

                    }
                });            
        }
        /*existe elemento asp*/
        if (VarJstxtCElemAs.val().length > 3) {

            $.ajax({
                url: "/modulo4/vista13.aspx/FnEElemAE", // nombre de página y nombre de función
                contentType: 'application/json; charser=utf-8',
                data: JSON.stringify({
                    EIdEl: VarJsElemId,
                    EAspE: VarJstxtCElemAs.val(),
                    EIdVi: VarJSDdlCElemVi.val().toString()
                }), /*parametro: valor*/
                method: 'post',
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
                },
                success: function (data) {
                    if (data.d) {
                        VarJslblCElemAs.text("Ya Existe Asp"); //imprimir en la etiqueta 
                        VarjstxtCElemAEOK = true;
                    }
                    else {
                        VarJslblCElemAs.text("");// quitar lo que se imprimió en la etiqueta
                        VarjstxtCElemAEOK = false;
                    }
                    FnJsSbtnCelem();//ocultar bton
                }
                });            
        }
    }

    if (VarJsDdlCElemTC.val().toString() == "0" || VarJSDdlCElemVi.val().toString() == "0" || VarJstxtCElemAs.val().length <= 3 || VarJstxtCElemEl.val().length <= 3) {
        VarJsDdlCElemOK = true;
    }
    else {
        VarJsDdlCElemOK = false;
    }

}


/*quitar btnCElem*/
function FnJsSbtnCelem() {
    /*ddl seleccionado existe elem/asp */
    if (VarJsDdlCElemOK == true || VarjstxtCElemAEOK== true || VarjstxtCElemElOK==true) {
        VarJsbtnCElem.fadeOut("fast"); //efecto de fuga para desapareecer 
        VarJsbtnCElem.attr('disabled', true);  // se tiene que deshabilitar el btn para que no permita tap enter
    }
    else if (VarJsDdlCElemOK == false && VarjstxtCElemAEOK == false && VarjstxtCElemElOK == false) {
        VarJsbtnCElem.fadeIn("slow"); //efecto de fuga para apareecer 
        VarJsbtnCElem.attr('disabled', false);  // se tiene que habilitar el btn para que  permita tap enter
    }
}

/*cambio en txt*/
VarJstxtCElemEl.keyup(function (e) {
    FnJsEElem();
});
VarJstxtCElemAs.keyup(function (e) {
    FnJsEElem();
});

/*seleccionado ddl*/
VarJsDdlCElemTC.change(function (e) {
    console.log(VarJsDdlCElemTC.val());
    FnJsEElem();
});
VarJSDdlCElemVi.change(function (e) {
    FnJsEElem();
});





