
//http://legacy.datatables.net/ref
var tabla
//por una se van los datos, por otro lado se va el crud, dependiendo de como estén los btn en la tabla

//crear variable de idioma
var traduccion_espa ={
    "sProcessing": "Procesando...",
        "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
                "sEmptyTable": "Ningún dato disponible en esta tabla",
                    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                        "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                                "sInfoPostFix": "",
                                    "sSearch": "Buscar:",
                                        "sUrl": "",
                                            "sInfoThousands": ",",
                                                "sLoadingRecords": "Cargando...",
                                                    "oPaginate": {
        "sFirst": "Primero",
            "sLast": "Último",
                "sNext": "Siguiente",
                    "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
}
//fin variable de idioma

function addrowUsuarios(data,mostrar) {
    tabla = $("#tblUsuarios").DataTable({
        "destroy": true,
        dom: 'Bfrtip',
        "buttons": [
            'copy', 'pdf'
        ],
        "aoColumns": [
            null,
            null,
            null,
            null,
            { "bVisible": true },//para no mostrar la columna
            { "bVisible": true }
        ],
        "language": traduccion_espa // se pasa la vaariable de la traducciòn , investigar si puede pasar una variable de respuesta de una fn
    });
    for (var i = 0; i < data.length; i++) {
        tabla.row.add([//poner el nombre igual que los atributos del objeto que viene
            data[i].ID_usuario,
            data[i].Usuario,
            data[i].Clave,
            data[i].Fecha_inicio,
            '<button value="editar" title="editar" class="btn btn-primary btn-edit">x </button>',
            '<button value="delete" title="delete" class="btn btn-danger btn-delete">y </button>'
        ]).draw(false);
    }

}

function sendDataAjax() {
    $.ajax({
        type: "POST",
        url: "Pagina3.aspx/Pruebaaa", // nombre de página y nombre de función
        data: {} , /*{ data: jsonString }*/
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            //console.log(data.d);
            addrowUsuarios(data.d, false); // acá se tiene que pasar bool para mostar u ocultar
            //window.console.log('Successful');
        }
    }
   );
}
//crear función que pregunte crud




$(document).on('click', '.btn-edit', function (e) {//en este docimento en un evento click de una clase btn-edit, agarra el evento e de una funcion
    e.preventDefault(); //evitar que haga postback
    //$(this).parent().parent().children().first().text;
    //$(this).parent().text;
    console.log($(this).parent().parent().children().first().text()); // recorre las etiquetas html
});

$(document).on('click', '.btn-delete', function (e) {//en este docimento en un evento click de una clase btn-edit, agarra el evento e de una funcion
    e.preventDefault(); //evitar que haga postback
    var row = $(this).parent().parent()[0];
    var data = tabla.fnGetData(row);

    console.log(data[0]);
});

function botondelete() {

    $('#Label1').remove();// numeral para id, punto para clases, oculta pero se mira en html, sensivecase

  
                window.console.log('soaz was here');

}


 

sendDataAjax();
botondelete();




