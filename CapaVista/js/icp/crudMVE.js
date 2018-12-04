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
var tablaTC;
var tablaE;

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
            '<button value="editar" href="#modalEdiTC" data-toggle="modal" title="editar" class="btn btn-warning  btn-editTC"><i class="fas fa-pencil-alt"></i> </button>' +
            '<button value="eliminar" href="#modaldelTC" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteTC"><i class="fa fa-trash" ></i> </button>'
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


$(document).on('click', '.btn-editTC', function (e) {//en este docimento en un evento click de una clase btn-edit, agarra el evento e de una funcion
    e.preventDefault(); //evitar que haga postback
    var datatc = tablaTC.row($(this).parents("tr")).data();// agarra la fila, luego hay que llamar datatc con subíndice de la columna
    console.log(datatc[0] + " " + datatc[1]+" nuevo"); // quitar esta mierda
    $('#txtEditarTC').val(datatc[1]);// [indice columna]  de la fila seleccionada
});
$('#lbGuaCamTC').click(function (e) {
    e.preventDefault();
    // mandar a guardar, verificar si se hizo el cambio y cerrar el modal, refrescar tabla

    console.log("guardado el cambio");

});

$(document).on('click', '.btn-deleteTC', function (e) {//en este docimento en un evento click de una clase btn-edit, agarra el evento e de una funcion
    e.preventDefault(); //evitar que haga postback
    var datatc = tablaTC.row($(this).parents("tr")).data();// agarra la fila, luego hay que llamar datatc con subíndice de la columna
    console.log(datatc[0] + " " + datatc[1] + "nuevo");// borrar esta mierda
    $('#lbleliTC').text(datatc[1]); // [indice columna]  de la fila seleccionada
});
$('#lbelimTC').click(function (e) { // eliminar dentro de modal
    e.preventDefault();
    console.log("eliminado");
});

$('#txtNuevoTC').keyup(function () {
    var TCingresado = $(this).val();
    $("#btnNueTC").fadeOut("fast");//ocultar mientras no se cumpla la condición de mínimo
    if (TCingresado.length > 3) { // minimo de caracteres
        $.ajax({  
            url: "/modulo4/vista13.aspx/ExisteTC", // nombre de página y nombre de función
            contentType: 'application/json; charser=utf-8',
            data: JSON.stringify({ tc: TCingresado }), /*parametro: valor*/
            method: 'post',
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
            },
            success: function (data) {
                if (data.d) {
                    $('#lblexistenuevotc').text("Ya Existe TC"); //imprimir en la etiqueta 
                    $("#btnNueTC").fadeOut("fast");        //efecto de fuga para desarparecer   
                    $("#btnNueTC").attr('disabled', true); // se tiene que deshabilitar el btn para que no permita tap enter
                }
                else {
                    $('#lblexistenuevotc').text("");// quitar lo que se imprimió en la etiqueta
                    $("#btnNueTC").fadeIn("fast"); //efecto de fuga para apareecer 
                    $("#btnNueTC").attr('disabled', false);  // se tiene que habilitar el btn para que no permita tap enter
                }
                console.log(data.d);  
            }
        });
    }
});
$('#btnNueTC').click(function (e) {
    e.preventDefault();
    console.log("guardar nuevo");
});

$('#lbEN').click(function (e) {
    e.preventDefault();
    console.log("mostrar modal nuevo elemento");
    $('#ModCElem').toggle('slide','slow');// para hacer aparecer y desaparecer los modales con efectos distintos a fade
});

$(function soazeffects() {

});

