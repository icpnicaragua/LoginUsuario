

function addrowUsuarios(data) {
    var tabla = $("#tblUsuarios").DataTable();
    for (var i = 0; i < data.length; i++) {
        tabla.fnAddData([//poner el nombre igual que los atributos del objeto que viene
            data[i].ID_usuario,
            data[i].Usuario,
            data[i].Clave,
            data[i].Fecha_inicio
        ]);
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
            console.log(data.d);
            addrowUsuarios(data.d);
            //window.console.log('Successful');
        }
    }    );
}

sendDataAjax();
