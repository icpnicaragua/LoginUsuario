$('#lbMostrarTC').click(function (e) {
    e.preventDefault();
    console.log("mostrar tabla tc");
    AjaxMostrarTC();
}
);

function AjaxMostrarTC(){
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
var tablaTC;
function addrowTC(data) {
    
    $('#tblTC').DataTable().clear().destroy(); // necesario para actualizar, borra y destru

    tablaTC = $("#tblTC").DataTable(  {
      
        "retrieve": true,
        dom: 'Bfrtip',
        "buttons": [
            {
                extend: 'colvis',
                attr: {id:'colvistc'//se añade el id para ocultar
                },
                text: '<i class="fas fa-columns fa-2x"></i>', // el icono a mostar
                className: 'btn btn-info', //clase para mostrar
                titleAttr: 'Ocultar/Mostrar Columnas',
                //init: function (api, node, config) {
                //    $(node).removeClass('dt-button')
                //}

            },
            {
                extend: 'copy',
                text: '<i class="far fa-copy fa-2x"></i>',
                className: 'btn btn-primary',
                exportOptions: {
                    columns: [0, 1]
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
                    columns: [0, 1]
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
                    columns: [0, 1]
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
            '<button value="editar" href="#modalEdiTC" data-toggle="modal" title="editar" class="btn btn-warning  btn-editTC"><i class="fas fa-pencil-alt"></i> </button>'+
            '<button value="eliminar" href="#modaldelTC" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteTC"><i class="fa fa-trash" ></i> </button>'
        ]
        ).draw(false);
    }
}


$(document).on('click', '.btn-editTC', function (e) {//en este docimento en un evento click de una clase btn-edit, agarra el evento e de una funcion
    e.preventDefault(); //evitar que haga postback
    //console.log($(this).parent().parent().children().first().text()); // id
    //console.log($(this).parent().parent().children().first().next().text() + 'xx'); // nombre
    //var txtTCN = $(this).parent().parent().children().first().next().text();
    //
    var datatc = tablaTC.row($(this).parents("tr")).data();// agarra la fila, luego hay que llamar datatc con subíndice de la columna
    console.log(datatc[0] + " " + datatc[1]+"nuevo");
    $('#txtEditarTC').val(datatc[1]);
});
$(document).on('click', '.btn-deleteTC', function (e) {//en este docimento en un evento click de una clase btn-edit, agarra el evento e de una funcion
    e.preventDefault(); //evitar que haga postback
    //$(this).parent().parent().children().first().text;
    //$(this).parent().text;
   // console.log($(this).parent().parent().children().first().text()); // recorre las etiquetas html
    var datatc = tablaTC.row($(this).parents("tr")).data();// agarra la fila, luego hay que llamar datatc con subíndice de la columna
    console.log(datatc[0] + " " + datatc[1] + "nuevo");
    $('#lbleliTC').text(datatc[1]);
});

$('#lbTCG').click(function (e) {
    e.preventDefault();
   
}
);

$('#lbGuaCamTC').click(function (e) {
    e.preventDefault();
    console.log("guardado el cambio");
  
}
);

$('#lbelimTC').click(function (e) {
    e.preventDefault();
    console.log("eliminado");

}
);

$('#btnmodal').click(function (e) {
    e.preventDefault();
    console.log("mostrar modal prueba");

}
);

$('#lbGuaNueTC').click(function (e) {
    e.preventDefault();
    console.log("guardar nuevo");

}
);

$('#txtNuevoTC').keyup(function () {
    var TCingresado = $(this).val();
    ///$("#btnNueTC").fadeOut("fast");
    if (TCingresado.length > 3) {
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
                    $('#lblexistenuevotc').text("Ya Existe TC");
                    //$('#btnNueTC').attr('disabled', true);
                    //$("#btnNueTC").hide("fast");

                    ///$("#btnNueTC").fadeOut("fast");
                    ///$("#btnNueTC").attr('disabled', true);

                    $("#btnNueTC").addClass("rollOut animated");
                    setTimeout(function () {
                        $("#btnNueTC").removeClass("rollOut animated");
                        $("#btnNueTC").attr('visible', none);
                    }, 800)


                    //$("#btnNueTC").animate({
                    //    //height: "toggle",
                    //    opacity: 0
                    //}, {
                    //        duration: "slow"
                    //    });


                }
                else {
                    $('#lblexistenuevotc').text("");
                    // $("#btnNueTC").show("fast");
                   /// $("#btnNueTC").fadeIn("fast");
                   /// $("#btnNueTC").attr('disabled', false);
                    //$('#btnNueTC').attr('disabled', false);


                    //$("#btnNueTC").animate({
                    //    //height: "toggle",
                    //    opacity: 1
                    //}, {
                    //        duration: "slow"
                    //    });

                }
                console.log(data.d);  
            }
        });
    }
});

$(function () {
    $("#lbhide").draggable();
});