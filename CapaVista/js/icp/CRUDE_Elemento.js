var tablaE;//tabla
var VarJsModCElem = $('#ModCElem');//modal
var VarJsElemId=0;//id elem para cud
var VarJsElemento = "";
var VarJsElementoAsp = "";
var VarJsIdTipoControl = "";
var VarJsIdVista = "";

//validador
var formElemento = document.querySelector('#form1');
//variables crud
var CRUDElemento = "";
//variables de alertas
var VarJsColorAlertElemento = "";
var VarJsTextoAlertElemento = "";

//variables existe
var VarjstxtCElemAEOK;
var VarjstxtCElemElOK;

//variables de elementos
var VarJslblCElemEl = $('#lblCElemEl');
var VarJstxtCElemEl = $('#txtCElemEl');
var VarJslblCElemAs = $('#lblCElemAs');
var VarJstxtCElemAs = $('#txtCElemAs');
var VarJsDdlCElemTC = $('#DdlCElemTC');
var VarJSDdlCElemVi = $('#DdlCElemVi');
var VarJsbtnCElem = $("#btnCElemento");
var VAlDDLElementoTC = "";
var VAlDDLElementoVista = "";

/*ocultar btnCelem*/
var VarJsDdlCElemOK;

$('#lbMostrarE').click(function (e) {
    e.preventDefault();
    FnJsAjaxRElemento();
});

function FnJsAjaxRElemento() {
    $.ajax({
        type: "POST",
        url: "/modulo4/vst13.aspx/FnRElem", // nombre de página y nombre de función
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            FnJsAddrowElemento(data.d); // 
        }
    }
    );
}
function FnJsAddrowElemento(data) {

    $('#tblE').DataTable().clear().destroy(); // necesario para actualizar, borra y destru

    tablaE = $("#tblE").DataTable({

        "retrieve": true,
        dom: 'Bfrtip',
        "order": [1, 'asc'],//"order": [[ 0, 'asc' ], [ 1, 'desc' ]] // columna, orden
        "columnDefs": [
            { "targets": 6, "searchable": false },
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
                className: 'btn btn-info ', //clase para mostrar
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
                filename: 'Elem' + "_" + FnJsDate() + "_" + FnJsHour(),
                pageSize: 'LETTER',
                //title: 'tc titulo',
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
                filename: 'Elem' + "_" + FnJsDate() + "_" + FnJsHour(),
                text: '<i class="far fa-file-excel fa-2x"></i>',
                className: 'btn btn-success d-none d-lg-block',
                exportOptions: {
                    columns: [':not(:eq(6)):visible'] /// index 6 de controles 
                },
                titleAttr: 'Excel',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')
                }



            }
        ],
        "language": FnJsEspTbl()
    });

    tablaE.buttons().container().addClass('form-inline');///nuevo


    for (var contE = 0; contE < data.length; contE++) {
        tablaE.row.add([
            data[contE].Id_elemento,
            data[contE].Elemento,
            data[contE].Idaspelemento,
            data[contE].Fecha_inicioElemento,
            data[contE].ObjTipo_control.Tipocontrol,
            data[contE].ObjVista.Vista,
            '<button value="editar" href="#ModCElem" data-toggle="modal" title="editar" class="btn btn-warning  btn-editEle"><i class="fas fa-pencil-alt"></i> </button>' +
            '<button value="eliminar" href="#ModCElem" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteEle"><i class="fa fa-trash" ></i> </button>'
        ]
        ).draw(false);
    }
}

/*acciones cud*/
$('#lbEN').click(function (e) {
    e.preventDefault();

    VarJsDdlCElemOK = true;
    VarjstxtCElemAEOK = true;
    VarjstxtCElemElOK = true;
    FnJsSbtnCelem();

    CRUDElemento = "C"

    VarJsElemId = '0';
     VarJsElemento = "";
     VarJsElementoAsp = "";
     VarJsIdTipoControl = "";
     VarJsIdVista = "";
     VAlDDLElementoTC = "";
     VAlDDLElementoVista = "";

    //llenar ddl
    FnJSCUElemTC();
    FnJSCUElemVi();


    $('#FrmCElem :text').val("");//vaciar txt
    $('#FrmCElem label').text("");//vaciar lbl

});
$(document).on('click', '.btn-editEle', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUElemento();//nombre de función xxxx
    var dataElemento = tablaE.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsElemId = dataElemento[0]; //id de la fila seleccionada
    $('#txtCElemEl').val(dataElemento[1]);// [indice columna]  de la fila seleccionada xxxx
    $('#txtCElemAs').val(dataElemento[2]);// [indice columna]  de la fila seleccionada xxxx
    VAlDDLElementoTC = dataElemento[4];
    VAlDDLElementoVista = dataElemento[5];
    //llenar ddl
    FnJSCUElemTC();
    FnJSCUElemVi();

    CRUDElemento = "U";

    VarJsElemento = dataElemento[1];
    VarJsElementoAsp = dataElemento[2];
    VarJsIdTipoControl = $('#DdlCElemTC').val();;
    VarJsIdVista = $('#DdlCElemVi').val();;

    // variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteEle', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDElemento();//nombre de función xxxx
    VarjstxtCElemAEOK = false;
    VarjstxtCElemElOK = false;

    FnJsSbtnCelem(); //bloquear
    var dataElemento = tablaE.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsElemId = dataElemento[0]; //id de la fila seleccionada
    $('#txtCElemEl').val(dataElemento[1]);// [indice columna]  de la fila seleccionada xxxx
    $('#txtCElemAs').val(dataElemento[2]);// [indice columna]  de la fila seleccionada xxxx

    VAlDDLElementoTC = dataElemento[4];
    VAlDDLElementoVista = dataElemento[5];

    //llenar ddl
    FnJSCUElemTC();
    FnJSCUElemVi();

    CRUDElemento = "D";

    VarJsElemento = dataElemento[1];
    VarJsElementoAsp = dataElemento[2];
    VarJsIdTipoControl = $('#DdlCElemTC').val();;
    VarJsIdVista = $('#DdlCElemVi').val();;

});

//pintar modal
function FnJsCElemento() { //nombe función xxxx
    $('#lblCElemEl').text(""); // id etiqueta texto etiqueta xxxx
    $('#lblCElemAs').text(""); // id etiqueta texto etiqueta xxxx
    //cambiar el color del modal borde
    $("#DivModBorElemento").removeAttr("class");//quitar el atributo class
    $("#DivModBorElemento").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeadElemento").removeAttr("class");//quitar el atributo class
    $("#DivModHeadElemento").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitElemento').text('Nuevo Elemento');
    //cambiar el color icono btn
    $("#btnCElemento").removeAttr("class");//quitar el atributo class
    $("#btnCElemento").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnCElemento i").removeAttr("class");
    $("#btnCElemento i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtCElemEl").attr('disabled', false); //variables de los elementos del modal xxxx
    $("#txtCElemAs").attr('disabled', false); //variables de los elementos del modal xxxx
    $("#DdlCElemTC").attr('disabled', false); //variables de los elementos del modal xxxx
    $("#DdlCElemVi").attr('disabled', false); //variables de los elementos del modal xxxx
    //vaciar elementos text de todo el modal
    $('#' + VarJsModCElem[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUElemento() { //nombe función xxxx

    $('#lblCElemEl').text(""); // id etiqueta texto etiqueta xxxx
    $('#lblCElemAs').text(""); // id etiqueta texto etiqueta xxxx
    //cambiar el color del modal borde
    $("#DivModBorElemento").removeAttr("class");//quitar el atributo class
    $("#DivModBorElemento").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeadElemento").removeAttr("class");//quitar el atributo class
    $("#DivModHeadElemento").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitElemento').text('Editar Elemento');
    //cambiar el color icono btn
    $("#btnCElemento").removeAttr("class");//quitar el atributo class
    $("#btnCElemento").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnCElemento i").removeAttr("class");
    $("#btnCElemento i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#txtCElemEl").attr('disabled', false); //variables de los elementos del modal xxxx
    $("#txtCElemAs").attr('disabled', false); //variables de los elementos del modal xxxx
    $("#DdlCElemTC").attr('disabled', false); //variables de los elementos del modal xxxx
    $("#DdlCElemVi").attr('disabled', false); //variables de los elementos del modal xxxx
    //vaciar elementos text de todo el modal
    $('#' + VarJsModCElem[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDElemento() { //nombe función xxxx

    $('#lblCElemEl').text(""); // id etiqueta texto etiqueta xxxx
    $('#lblCElemAs').text(""); // id etiqueta texto etiqueta xxxx
    //cambiar el color del modal borde
    $("#DivModBorElemento").removeAttr("class");//quitar el atributo class
    $("#DivModBorElemento").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeadElemento").removeAttr("class");//quitar el atributo class
    $("#DivModHeadElemento").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitElemento').text('Eliminar Elemento');
    //cambiar el color icono btn
    $("#btnCElemento").removeAttr("class");//quitar el atributo class
    $("#btnCElemento").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnCElemento i").removeAttr("class");
    $("#btnCElemento i").attr("class", "fa fa-trash fa-2x");
    //bloquear elementos
    $("#txtCElemEl").attr('disabled', true); //variables de los elementos del modal xxxx
    $("#txtCElemAs").attr('disabled', true); //variables de los elementos del modal xxxx
    $("#DdlCElemTC").attr('disabled', true); //variables de los elementos del modal xxxx
    $("#DdlCElemVi").attr('disabled', true); //variables de los elementos del modal xxxx
    //vaciar elementos text de todo el modal
    $('#' + VarJsModCElem[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsSbtnCelem() {
    /*ddl seleccionado existe elem/asp */
    if (VarJsDdlCElemOK == true || VarjstxtCElemAEOK == true || VarjstxtCElemElOK == true) {
        VarJsbtnCElem.fadeOut("fast"); //efecto de fuga para desapareecer 
        VarJsbtnCElem.attr('disabled', true);  // se tiene que deshabilitar el btn para que no permita tap enter
    }
    else if (VarJsDdlCElemOK == false && VarjstxtCElemAEOK == false && VarjstxtCElemElOK == false) {
        VarJsbtnCElem.fadeIn("slow"); //efecto de fuga para apareecer 
        VarJsbtnCElem.attr('disabled', false);  // se tiene que habilitar el btn para que  permita tap enter
    }
}

/*guardar CUD*/
VarJsbtnCElem[0].addEventListener('click', function (e) {
    e.preventDefault();
    if (formElemento.checkValidity()) {
        switch (CRUDElemento) { // variable crud xxxx
            case "C":
                FnJsAjaxCElemento(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUElemento();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDElemento();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Elemento");
        } 
    }
}, false);


//ajax CUD
function FnJsAjaxCElemento() {
    $.ajax({
        url: "/modulo4/vst13.aspx/FnCElementoV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            Elemento: VarJsElemento,
            ElementoAsp: VarJsElementoAsp,
            IdTipoControl: VarJsIdTipoControl,
            IdVista: VarJsIdVista
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Elemento Agregado"); //texto xxxx            
            }
            else {
                //no se creó
                CRUDElemento = "Error"
                console.log("No se pudo agregar el Elemento");//
            }
            FnAlertaElemento(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUElemento() {
    $.ajax({
        url: "/modulo4/vst13.aspx/FnUElementoV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdElemento: VarJsElemId,
            Elemento: VarJsElemento,
            ElementoAsp: VarJsElementoAsp,
            IdTipoControl: VarJsIdTipoControl,
            IdVista: VarJsIdVista
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Elemento Actualizado"); //texto xxxx            
            }
            else {
                //no se creó
                CRUDElemento = "Error"
                console.log("No se pudo Actualizar el Elemento");//
            }
            FnAlertaElemento(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDElemento() {
    $.ajax({
        url: "/modulo4/vst13.aspx/FnDElementoV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdElemento: VarJsElemId           
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Elemento Eliminado"); //texto xxxx            
            }
            else {
                //no se creó
                CRUDElemento = "Error"
                console.log("No se pudo Eliminar el Elemento");//
            }
            FnAlertaElemento(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnAlertaElemento() {//nombre de la función xxxx

    switch (CRUDElemento) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertElemento = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertElemento = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertElemento = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertElemento = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertElemento = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertElemento = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertElemento = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertElemento = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Elemento Alert")
    }
    //alerta
    $('#alerta .modal-content').addClass(VarJsColorAlertElemento);//variable de color alerta xxxx
    $('#alerta h5').text(VarJsTextoAlertElemento);//variable de texto alerta xxxx
    $('#alerta').modal('show');
    setTimeout(function () {
        $('#alerta').modal('hide');
        $('#alerta .modal-content').removeClass(VarJsColorAlertElemento);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblE.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxRElemento();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#ModCElem").modal("toggle");//nombre modal xxxx
}

/*iniciar ddl tico de elem*/
function FnJSCUElemTC() {
    VarJsDdlCElemTC.empty();
    $.ajax({
        type: "POST",
        url: "/modulo4/vst13.aspx/MostrarTC", // nombre de página y nombre de función
        data: {}, /*{ data: jsonString }*/
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLElementoTC == "") {
                VarJsDdlCElemTC.append($("<option> </option>").val("0").html("Seleccionar Tipo De Control"));  // xxxx id val html            
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLElementoTC == value.Tipocontrol) {
                        VarJsDdlCElemTC.append($("<option> </option>").val(value.Idtipocontrol).html(value.Tipocontrol));
                        VarJsIdTipoControl = value.Idtipocontrol;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                VarJsDdlCElemTC.append($("<option> </option>").val(value.Idtipocontrol).html(value.Tipocontrol));
            });
            VAlDDLElementoTC = "";
        }
    });
}
/*iniciar ddl vist de elem*/
function FnJSCUElemVi() {
    VarJSDdlCElemVi.empty();
    $.ajax({
        type: "POST",
        url: "/modulo4/vst13.aspx/FnRVist", // nombre de página y nombre de función
        data: {}, /*{ data: jsonString }*/
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLElementoVista == "") {
                VarJSDdlCElemVi.append($("<option> </option>").val("0").html("Seleccionar Vista"));
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLElementoVista == value.Vista) {
                        VarJSDdlCElemVi.append($("<option> </option>").val(value.Idvista).html(value.Vista));
                        VarJsIdVista = value.Idvista;
            }
        });}
            $.each(data.d, function (data, value) {
                VarJSDdlCElemVi.append($("<option> </option>").val(value.Idvista).html(value.Vista));
        });
          VAlDDLElementoVista = "";
        }
    });
}

/*existe elemento*/
function FnJsEElem() {
    if (VarJSDdlCElemVi.val() != 0) {
        /*existe elemento elemento*/
        if (VarJstxtCElemEl.val().length > 3 && VarJsDdlCElemTC.val() != 0) {

            $.ajax({
                url: "/modulo4/vst13.aspx/FnEElemEl", // nombre de página y nombre de función
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
                url: "/modulo4/vst13.aspx/FnEElemAE", // nombre de página y nombre de función
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


/*cambio en txt*/
VarJstxtCElemEl.keyup(function (e) {
    VarJsElemento = $(this).val();
    FnJsEElem();
});
VarJstxtCElemAs.keyup(function (e) {
    VarJsElementoAsp = $(this).val();
    
    FnJsEElem();
});

/*seleccionado ddl*/
VarJsDdlCElemTC.change(function (e) {
    console.log(VarJsDdlCElemTC.val());
    VarJsIdTipoControl = $(this).val();
    
    FnJsEElem();
});
VarJSDdlCElemVi.change(function (e) {
    VarJsIdVista = $(this).val();
    FnJsEElem();
});

/*poner el cursos en el primer txtbox de modal elemento*/
VarJsModCElem.on('shown.bs.modal', function () {
    VarJstxtCElemEl.focus();
})