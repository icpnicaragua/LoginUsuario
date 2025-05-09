/*variable de tablas*/
var tablaDireccion;/*tabla mpodulo*/
var ModCDireccion = $('#modalNDireccion'); // modal 
//campos de tablas
var VarJsDireccionId = 0;
var VarJsDireccion = "";
var VarJsIdTipoDireccion = 0;
var VarJsIdPersona = 0;
var VarJsDepartamento = "";
var VarJsIdDepartamento = 0;//VarJsIdDepartamento VarJsIdMunicipio VarJsIdBarrio
var VarJsMunicipio = "";
var VarJsIdMunicipio = 0;
var VarJsBarrio = "";
var VarJsIdBarrio = 0;

//dddlist TipoDireccion
var VAlDDLDireccionTipoDireccion = "null";// para guardar lo que está en la tabla y luego asignar al ddl
var VAlDDLDepartamento = "null";//VAlDDLDepartamento VAlDDLMunicipio VAlDDLBarrio
var VAlDDLMunicipio = "null";
var VAlDDLBarrio = "null";
//igual para todos

var formDireccion = document.querySelector('#form1');

//variables crud
CRUDDireccion = "";
//variables alertas
var VarJsColorAlertDireccion = "";
var VarJsTextoAlertDireccion = "";
//variables existe
var EDireccion = true;

$('#tblPersona tbody').on('click', 'tr', function () {
    var tablaPersona = $('#tblPersona').DataTable();
    //console.log('clicked: ' + tablaPersona.row(this).data()[0]);
    VarJsIdPersona = tablaPersona.row(this).data()[0];
    FnJsAjaxRDireccion(); //llama al ajax xxxx
    FnJSFillDdlDireccionTipoDireccion();//cargar ddl
    $("#secciontblDireccion").attr('class', 'table-responsive collapse show');//No hay btn de show table
})



function FnJsAjaxRDireccion() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo7/VstEmpleados.aspx/FnRDireccionV", // nombre de página y nombre de función xxxx
        data: JSON.stringify({// los parámetros de la sig línea
            IdPersona: VarJsIdPersona
        }), /*parametro: valor*/
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowDireccion(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowDireccion(data) {//3 llenar la tabla xxxx

    $('#tblDireccion').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaDireccion = $("#tblDireccion").DataTable({// variable nombre tabla xxxx

        "retrieve": true,
        dom: 'Bfrtip',

        "order": [[2, 'asc'], [1, 'asc']],//"order": [[ 0, 'asc' ], [ 1, 'desc' ]] // columna, orden xxxx comienza en 0
        "columnDefs": [
            { "targets": 6, "searchable": false },
            { "orderable": false, "targets": 3 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colDireccion'//se añade el id para ocultar xxxx
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
                    columns: [':not(:eq(6)):visible'] /// index de controles xxxx para no mostrar comienza en 0
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
                    columns: [':not(:eq(6)):visible'] ///  index de controles xxxx para no mostrar comienza en 0
                },
                titleAttr: 'PDF',
                filename: 'Direccion' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Direccion', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Direccion' //tttt
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
                filename: 'Dirección' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
                text: '<i class="far fa-file-excel fa-2x"></i>',
                className: 'btn btn-success d-none d-lg-block',
                exportOptions: {
                    columns: [':not(:eq(6)):visible'] // index de controles xxxx para no mostrar inicia en 0
                },
                titleAttr: 'Excel',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')

                }

            }
        ],
        "language": FnJsEspTbl()
    });
    tablaDireccion.buttons().container().addClass('form-inline');///variable xxxx

    for (var contDireccion = 0; contDireccion < data.length; contDireccion++) { // declarar variable de recorrido de arreglo data xxxx
        tablaDireccion.row.add([//sensitivecase:
            data[contDireccion].IdDireccion,//campos
            data[contDireccion].Direccion,//campos
            data[contDireccion].ObjTipoDireccion.TipoDireccion,
            data[contDireccion].ObjBarrio.Barrio,
            data[contDireccion].ObjBarrio.ObjMunicipio.Municipio,
            data[contDireccion].ObjBarrio.ObjMunicipio.ObjDepartamento.Departamento,
            '<button value="editar" href="#modalNDireccion" data-toggle="modal" title="editar" class="btn btn-warning  btn-editDireccion"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNDireccion" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteDireccion"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNDireccion').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCDireccion(); // nombre función xxxx
    EDireccion = true; // variable xxxx

    FnJsBlockDireccion(); // nombre función xxxx
    FnJSFillDdlDireccionTipoDireccion();
    CRUDDireccion = "C"; // nombre variable xxxx
    FnJSFillDdlDepartamento();

    //campos xxxx
    VarJsDireccionId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsDireccion = ""; // cada campo tiene una variable, inicializar xxxx
    VarJsIdTipoDireccion = 0;
    VarJsIdDepartamento = 0;
    VarJsIdMunicipio = 0;
    VarJsIdBarrio = 0;

    // VarJsIdPersona = 0;

});
$(document).on('click', '.btn-editDireccion', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUDireccion();//nombre de función xxxx
    var dataDireccion = tablaDireccion.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsDireccionId = dataDireccion[0]; //id de la fila seleccionada
    $('#txtNuevoDireccion').val(dataDireccion[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsDireccion = dataDireccion[1]; // variable elemento, variable data, índice xxxx
    VAlDDLDireccionTipoDireccion = (dataDireccion[2]);
    FnJSFillDdlDireccionTipoDireccion();
   
    VAlDDLDepartamento = (dataDireccion[5]);
    VAlDDLMunicipio = (dataDireccion[4]);
    VAlDDLBarrio = (dataDireccion[3]);
    FnJSFillDdlDepartamento();

    
   
    
    VarJsIdTipoDireccion = $('#ddlCDireccionTipoDireccion').val();
    VarJsIdDepartamento = $('#ddlCDepartamento').val();
    VarJsIdMunicipio = $('#ddlCMunicipio').val();
    VarJsIdBarrio = $('#ddlCBarrio').val();
    //VarJsIdPersona = 0;
    CRUDDireccion = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteDireccion', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDDireccion();//nombre de función xxxx
    EDireccion = false; // variable de existe xxxx


    FnJsBlockDireccion();//función bloquear xxxx
    var dataDireccion = tablaDireccion.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsDireccionId = dataDireccion[0]; //id de la fila seleccionada
    $('#txtNuevoDireccion').val(dataDireccion[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsDireccion = dataDireccion[1]; // variable elemento, variable data, índice xxxx
    VAlDDLDireccionTipoDireccion = (dataDireccion[2]);
    FnJSFillDdlDireccionTipoDireccion();

    VAlDDLDepartamento = (dataDireccion[5]);
    VAlDDLMunicipio = (dataDireccion[4]);
    VAlDDLBarrio = (dataDireccion[3]);
    FnJSFillDdlDepartamento();
       
    CRUDDireccion = "D";
});

//pintar modal
function FnJsCDireccion() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoDireccion').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorDireccion").removeAttr("class");//quitar el atributo class
    $("#DivModBorDireccion").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaDireccion").removeAttr("class");//quitar el atributo class
    $("#DivModHeaDireccion").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitDireccion').text('Nuevo Direccion');//tttt
    //cambiar el color icono btn
    $("#btnNueDireccion").removeAttr("class");//quitar el atributo class
    $("#btnNueDireccion").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNueDireccion i").removeAttr("class");
    $("#btnNueDireccion i").attr("class", "fa fa-save fa-2x");
    //color ddl
    $("#ddlCDireccionTipoDireccion").removeAttr("class"); //uitar propiedades
    $("#ddlCDireccionTipoDireccion").attr("class", "form-control border-success");//pintr roo
    $("#ddlCDepartamento").removeAttr("class"); //uitar propiedades
    $("#ddlCDepartamento").attr("class", "form-control border-success");//pintr roo
    $("#ddlCMunicipio").removeAttr("class"); //uitar propiedades
    $("#ddlCMunicipio").attr("class", "form-control border-success");//pintr roo
 
    $('#ddlCMunicipio').append($("<option> </option>").val("0").html("Seleccionar Departamento antes...")); 
    $('#ddlCBarrio').append($("<option> </option>").val("0").html("Seleccionar Municipio antes...")); 

    $("#ddlCBarrio").removeAttr("class"); //uitar propiedades
    $("#ddlCBarrio").attr("class", "form-control border-success");//pintr roo
    //bloquear elementos
    $("#txtNuevoDireccion").attr('disabled', false); //variables de los elementos del modal xxxx
    $('#ddlCDireccionTipoDireccion').attr('disabled', false);
    $("#ddlCDepartamento").attr('disabled', false);
    $("#ddlCMunicipio").attr('disabled', false);
    $("#ddlCBarrio").attr('disabled', false);
    //vaciar elementos text de todo el modal
    $('#' + ModCDireccion[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUDireccion() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoDireccion').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorDireccion").removeAttr("class");//quitar el atributo class
    $("#DivModBorDireccion").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaDireccion").removeAttr("class");//quitar el atributo class
    $("#DivModHeaDireccion").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitDireccion').text('Editar Direccion');//tttt
    //cambiar el color icono btn
    $("#btnNueDireccion").removeAttr("class");//quitar el atributo class
    $("#btnNueDireccion").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNueDireccion i").removeAttr("class");
    $("#btnNueDireccion i").attr("class", "fa fa-save fa-2x");
    //color ddl
    $("#ddlCDireccionTipoDireccion").removeAttr("class"); //uitar propiedades
    $("#ddlCDireccionTipoDireccion").attr("class", "form-control border-warning");//pintr roo
    $("#ddlCDepartamento").removeAttr("class"); //uitar propiedades
    $("#ddlCDepartamento").attr("class", "form-control border-warning");//pintr roo
    $("#ddlCMunicipio").removeAttr("class"); //uitar propiedades
    $("#ddlCMunicipio").attr("class", "form-control border-warning");//pintr roo
    $("#ddlCBarrio").removeAttr("class"); //uitar propiedades
    $("#ddlCBarrio").attr("class", "form-control border-warning");//pintr roo
    //bloquear elementos
    $("#txtNuevoDireccion").attr('disabled', false); //variables de los elementos del modal xxxx
    $('#ddlCDireccionTipoDireccion').attr('disabled', false);
    $("#ddlCDepartamento").attr('disabled', false);
    $("#ddlCMunicipio").attr('disabled', false);
    $("#ddlCBarrio").attr('disabled', false);
    //vaciar elementos text de todo el modal
    $('#' + ModCDireccion[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDDireccion() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoDireccion').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorDireccion").removeAttr("class");//quitar el atributo class
    $("#DivModBorDireccion").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaDireccion").removeAttr("class");//quitar el atributo class
    $("#DivModHeaDireccion").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitDireccion').text('Eliminar Direccion');//tttt
    //cambiar el color icono btn
    $("#btnNueDireccion").removeAttr("class");//quitar el atributo class
    $("#btnNueDireccion").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNueDireccion i").removeAttr("class");
    $("#btnNueDireccion i").attr("class", "fa fa-trash fa-2x");//ícono
    //color ddl
    $("#ddlCDireccionTipoDireccion").removeAttr("class"); //uitar propiedades
    $("#ddlCDireccionTipoDireccion").attr("class", "form-control border-danger");//pintr roo
    $("#ddlCDepartamento").removeAttr("class"); //uitar propiedades
    $("#ddlCDepartamento").attr("class", "form-control border-danger");//pintr roo
    $("#ddlCMunicipio").removeAttr("class"); //uitar propiedades
    $("#ddlCMunicipio").attr("class", "form-control border-danger");//pintr roo
    $("#ddlCBarrio").removeAttr("class"); //uitar propiedades
    $("#ddlCBarrio").attr("class", "form-control border-danger");//pintr roo
    //bloquear elementos
    $("#txtNuevoDireccion").attr('disabled', true); //variables de los elementos del modal xxxx
    $('#ddlCDireccionTipoDireccion').attr('disabled', true);
    $('#ddlCDepartamento').attr('disabled', true);
    $('#ddlCMunicipio').attr('disabled', true);
    $('#ddlCBarrio').attr('disabled', true);
    //vaciar elementos text de todo el modal
    $('#' + ModCDireccion[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockDireccion() {// nombre función xxxx

    if (EDireccion == true) {// variables xxxx
        $("#btnNueDireccion").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNueDireccion").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter

    }
    else if (EDireccion == false) {// variables xxxx
        $("#btnNueDireccion").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNueDireccion").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter


    }
}

//guardar CUD
$('#btnNueDireccion').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formDireccion.checkValidity()) {
        switch (CRUDDireccion) { // variable crud xxxx
            case "C":
                FnJsAjaxCDireccion(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUDireccion();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDDireccion();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Direccion");/////tttt
        }
    }
    console.log(formDireccion.checkValidity());
});

//ajax CUD
function FnJsAjaxCDireccion() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnCDireccionV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            Direccion: VarJsDireccion,
            IdTipoDireccion: VarJsIdTipoDireccion,
            IdPersona: VarJsIdPersona,
            IdBarrio:   VarJsIdBarrio
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Direccion Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDDireccion = "error"
                console.log("No se pudo agregar Tipo de indentificación");//
            }
            FnAlertaDireccion(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUDireccion() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnUDireccionV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdDireccion: VarJsDireccionId,
            Direccion: VarJsDireccion,
            IdTipoDireccion: VarJsIdTipoDireccion,
            IdBarrio:   VarJsIdBarrio

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Direccion Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDDireccion = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaDireccion();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDDireccion() {
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnDDireccionV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdDireccion: VarJsDireccionId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Dirección Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDDireccion = "error"
                console.log("No se pudo Eliminar Dirección");////tttt
            }
            FnAlertaDireccion(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxEDireccion() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo7/VstEmpleados.aspx/FnEDireccionV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdDireccion: VarJsDireccionId,
            Direccion: VarJsDireccion,
            IdTipoDireccion: VarJsIdTipoDireccion,
            IdPersona: VarJsIdPersona
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                EDireccion = true; // variable existe xxxx
                $('#lblexistenuevoDireccion').text("Existe Dirección");// id etiqueta texto etiqueta //tttt
                FnJsBlockDireccion();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                EDireccion = false;// variable existe xxxx
                $('#lblexistenuevoDireccion').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockDireccion(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExisteDireccion() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoDireccion').val().length >= 3 && $('#ddlCDireccionTipoDireccion').val() > 0 && $('#ddlCBarrio').val() > 0) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoDireccion').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsDireccion = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteDireccion()) {//nombre función verificar existe xxxx
        FnJsAjaxEDireccion(); // llamar todos los existes xxxx

    }
});

$('#ddlCDireccionTipoDireccion').change(function (e) {
    VarJsIdTipoDireccion = $('#ddlCDireccionTipoDireccion').val();
    if (VerificarExisteDireccion()) {
        FnJsAjaxEDireccion();
    }
});

$('#ddlCDepartamento').change(function (e) {
    VarJsIdDepartamento = $('#ddlCDepartamento').val();//
    FnJSFillDdlMunicipio();
   //pppp
});

$('#ddlCMunicipio').change(function (e) {
    VarJsIdMunicipio = $('#ddlCMunicipio').val();//
    FnJSFillDdlBarrio();
    //pppp
});

$('#ddlCBarrio').change(function (e) {
    VarJsIdBarrio = $('#ddlCBarrio').val();//
    if (VerificarExisteDireccion()) {
        FnJsAjaxEDireccion();
    }
    //pppp
});

function FnJSFillDdlDireccionTipoDireccion() {
    $('#ddlCDireccionTipoDireccion').empty(); // xxxx id
    $.ajax({
        type: "POST",
        url: "/modulo7/VstGenerales.aspx/FnRTipoDireccionV", // xxxx
        data: {}, /*{ data: jsonString }*/
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLDireccionTipoDireccion == "null") {
                $('#ddlCDireccionTipoDireccion').append($("<option> </option>").val("0").html("Seleccionar Tipo Dirección"));  // xxxx id val html            
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLDireccionTipoDireccion == value.TipoDireccion) {
                        $('#ddlCDireccionTipoDireccion').append($("<option> </option>").val(value.IdTipoDireccion).html(value.TipoDireccion));  // xxxx id texto
                        VarJsIdTipoDireccion = value.IdTipoDireccion;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCDireccionTipoDireccion').append($("<option> </option>").val(value.IdTipoDireccion).html(value.TipoDireccion)); // id en un val y en html el nombre
            });
            VAlDDLDireccionTipoDireccion = "null";
        }
    });
}
function FnJSFillDdlDepartamento() {
    $('#ddlCDepartamento').empty(); // xxxx id
    console.log("llenando departamento");
    $.ajax({
        type: "POST",
        url: "/modulo7/VstGenerales.aspx/FnRDepartamentoV", // xxxx
        async: false,
        data: {}, /*{ data: jsonString }*/
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLDepartamento == "null") {
                $('#ddlCDepartamento').append($("<option> </option>").val("0").html("Seleccionar Departamento"));  // xxxx id val html            
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLDepartamento == value.Departamento) {
                        $('#ddlCDepartamento').append($("<option> </option>").val(value.IdDepartamento).html(value.Departamento));  // xxxx id texto
                        VarJsIdDepartamento = value.IdDepartamento;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCDepartamento').append($("<option> </option>").val(value.IdDepartamento).html(value.Departamento)); // id en un val y en html el nombre
            });
            VAlDDLDepartamento = "null";
        }
    });

    FnJSFillDdlMunicipio();

}


function FnJSFillDdlMunicipio() {
    $('#ddlCMunicipio').empty(); // xxxx id
    $.ajax({
        url: "/modulo7/VstGenerales.aspx/FnRMunicipioV", // xxxx
        async: false,
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdDepartamento: VarJsIdDepartamento
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLMunicipio == "null") {
                $('#ddlCMunicipio').append($("<option> </option>").val("0").html("Seleccionar Municipio"));  // xxxx id val html            
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLMunicipio == value.Municipio) {
                        $('#ddlCMunicipio').append($("<option> </option>").val(value.IdMunicipio).html(value.Municipio));  // xxxx id texto
                        VarJsIdMunicipio = value.IdMunicipio;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCMunicipio').append($("<option> </option>").val(value.IdMunicipio).html(value.Municipio)); // id en un val y en html el nombre
            });
            VAlDDLMunicipio = "null";
        }
    });

    FnJSFillDdlBarrio();
}

function FnJSFillDdlBarrio() {
    $('#ddlCBarrio').empty(); // xxxx id
    $.ajax({
        url: "/modulo7/VstGenerales.aspx/FnRBarrioV", // xxxx
        async: false,
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdMunicipio: VarJsIdMunicipio
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLBarrio == "null") {
                $('#ddlCBarrio').append($("<option> </option>").val("0").html("Seleccionar Barrio"));  // xxxx id val html            
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLBarrio == value.Barrio) {
                        $('#ddlCBarrio').append($("<option> </option>").val(value.IdBarrio).html(value.Barrio));  // xxxx id texto
                        VarJsIdBarrio = value.IdBarrio;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCBarrio').append($("<option> </option>").val(value.IdBarrio).html(value.Barrio)); // id en un val y en html el nombre
            });
            VAlDDLBarrio = "null";
        }
    });
}



function FnAlertaDireccion() {//nombre de la función xxxx

    switch (CRUDDireccion) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertDireccion = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertDireccion = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertDireccion = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertDireccion = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertDireccion = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertDireccion = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertDireccion = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertDireccion = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Dirección Alert")//tttt
    }
    //alerta
    $('.bd-example-modal-sm .modal-content').addClass(VarJsColorAlertDireccion);//variable de color alerta xxxx
    $('.bd-example-modal-sm h5').text(VarJsTextoAlertDireccion);//variable de texto alerta xxxx
    $('.bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.bd-example-modal-sm').modal('hide');
        $('.bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertDireccion);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms
    console.log($("#secciontblDireccion.show").length)//tttt
    if ($("#secciontblDireccion.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxRDireccion();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNDireccion").modal("toggle");//nombre modal xxxx
}