/*variable de tablas*/
var tablaEmpresa;/*tabla mpodulo*/
var ModCEmpresa = $('#modalNEmpresa'); // modal 
//campos de tablas
var VarJsEmpresaId = 0;
var VarJsEmpresa = "";
var VarJsRazonSocial = "";
var VarJsRuc = "";

var VarJsIdTipoEmpresa = 0;
var VarJsIdRegimen = 0;


//dddlist TipoEmpresa
var VAlDDLEmpresaTipoEmpresa = "null";// para guardar lo que está en la tabla y luego asignar al ddl
var VAlDDLEmpresaRegimen = "null";// para guardar lo que está en la tabla y luego asignar al ddl

//igual para todos
var formEmpresa = document.querySelector('#form1');

//variables crud
CRUDEmpresa = "";
//variables alertas
var VarJsColorAlertEmpresa = "";
var VarJsTextoAlertEmpresa = "";
//variables existe
var EEmpresa = true;


$('#lbMostrarEmpresa').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    FnJsAjaxREmpresa(); //llama al ajax xxxx
    FnJSFillDdlEmpresaTipoEmpresa();//cargar ddl
    FnJSFillDdlEmpresaRegimen();//cargar ddl

});

function FnJsAjaxREmpresa() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo9/VstClientes.aspx/FnREmpresaV", // nombre de página y nombre de función xxxx
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowEmpresa(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowEmpresa(data) {//3 llenar la tabla xxxx

    $('#tblEmpresa').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaEmpresa = $("#tblEmpresa").DataTable({// variable nombre tabla xxxx

        "retrieve": true,
        dom: 'Bfrtip',

        "order": [1, 'asc'],//"order": [[ 0, 'asc' ], [ 1, 'desc' ]] // columna, orden xxxx comienza en 0
        "columnDefs": [
            { "targets": 3, "searchable": false },
            { "orderable": false, "targets": 6 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colEmpresa'//se añade el id para ocultar xxxx
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
                filename: 'Empresa' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Empresa', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Empresa' //tttt
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
                filename: 'Empresa' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
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
    tablaEmpresa.buttons().container().addClass('form-inline');///variable xxxx

    for (var contEmpresa = 0; contEmpresa < data.length; contEmpresa++) { // declarar variable de recorrido de arreglo data xxxx
        tablaEmpresa.row.add([//sensitivecase:
            data[contEmpresa].IdEmpresa,//campos
            data[contEmpresa].NombreComercial,//campos
            data[contEmpresa].RazonSocial,//campos
            data[contEmpresa].Ruc,//campos
            data[contEmpresa].ObjTipoEmpresa.TipoEmpresa,
            data[contEmpresa].ObjRegimen.Regimen,
            '<button value="editar" href="#modalNEmpresa" data-toggle="modal" title="editar" class="btn btn-warning  btn-editEmpresa"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNEmpresa" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteEmpresa"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNEmpresa').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCEmpresa(); // nombre función xxxx
    EEmpresa = true; // variable xxxx

    FnJsBlockEmpresa(); // nombre función xxxx
    FnJSFillDdlEmpresaTipoEmpresa();
    FnJSFillDdlEmpresaRegimen();

    CRUDEmpresa = "C"; // nombre variable xxxx

    //campos xxxx
    VarJsEmpresaId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsEmpresa = ""; // cada campo tiene una variable, inicializar xxxx
    VarJsRazonSocial = "";
    VarJsRuc = "";

    VarJsIdTipoEmpresa = 0;
    VarJsIdRegimen = 0;
});
$(document).on('click', '.btn-editEmpresa', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUEmpresa();//nombre de función xxxx
    var dataEmpresa = tablaEmpresa.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsEmpresaId = dataEmpresa[0]; //id de la fila seleccionada
    $('#txtNuevoEmpresa').val(dataEmpresa[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsEmpresa = dataEmpresa[1]; // variable elemento, variable data, índice xxxx
    $('#txtNuevoRazonSocial').val(dataEmpresa[2]);// [indice columna]  de la fila seleccionada xxxx
    VarJsRazonSocial = dataEmpresa[2]; // variable elemento, variable data, índice xxxx
    $('#txtNuevoRuc').val(dataEmpresa[3]);// [indice columna]  de la fila seleccionada xxxx
    VarJsRuc = dataEmpresa[3]; // variable elemento, variable data, índice xxxx

    VAlDDLEmpresaTipoEmpresa = (dataEmpresa[4]);
    FnJSFillDdlEmpresaTipoEmpresa();
    VarJsIdTipoEmpresa = $('#ddlCEmpresaTipoEmpresa').val();
    VAlDDLEmpresaRegimen = (dataEmpresa[5]);
    FnJSFillDdlEmpresaRegimen();
    VarJsIdRegimen = $('#ddlCEmpresaRegimen').val();

    CRUDEmpresa = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteEmpresa', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDEmpresa();//nombre de función xxxx
    EEmpresa = false; // variable de existe xxxx


    FnJsBlockEmpresa();//función bloquear xxxx
    var dataEmpresa = tablaEmpresa.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsEmpresaId = dataEmpresa[0]; //id de la fila seleccionada
    $('#txtNuevoEmpresa').val(dataEmpresa[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsEmpresa = dataEmpresa[1]; // variable elemento, variable data, índice xxxx
    $('#txtNuevoRazonSocial').val(dataEmpresa[2]);// [indice columna]  de la fila seleccionada xxxx
    VarJsRazonSocial = dataEmpresa[2]; // variable elemento, variable data, índice xxxx
    $('#txtNuevoRuc').val(dataEmpresa[3]);// [indice columna]  de la fila seleccionada xxxx
    VarJsRuc = dataEmpresa[3]; // variable elemento, variable data, índice xxxx

    VAlDDLEmpresaTipoEmpresa = (dataEmpresa[4]);
    FnJSFillDdlEmpresaTipoEmpresa();
    VAlDDLEmpresaRegimen = (dataEmpresa[5]);
    FnJSFillDdlEmpresaRegimen();

    CRUDEmpresa = "D";
});

//pintar modal
function FnJsCEmpresa() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoEmpresa').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorEmpresa").removeAttr("class");//quitar el atributo class
    $("#DivModBorEmpresa").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaEmpresa").removeAttr("class");//quitar el atributo class
    $("#DivModHeaEmpresa").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitEmpresa').text('Nuevo Empresa');//tttt
    //cambiar el color icono btn
    $("#btnNueEmpresa").removeAttr("class");//quitar el atributo class
    $("#btnNueEmpresa").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNueEmpresa i").removeAttr("class");
    $("#btnNueEmpresa i").attr("class", "fa fa-save fa-2x");
    //color ddl
    $("#ddlCEmpresaTipoEmpresa").removeAttr("class"); //uitar propiedades
    $("#ddlCEmpresaTipoEmpresa").attr("class", "form-control border-success");//pintr roo
    $("#ddlCEmpresaRegimen").removeAttr("class"); //uitar propiedades
    $("#ddlCEmpresaRegimen").attr("class", "form-control border-success");//pintr roo
    //bloquear elementos
    $("#txtNuevoEmpresa").attr('disabled', false); //variables de los elementos del modal xxxx
    $("#txtNuevoRazonSocial").attr('disabled', false); //variables de los elementos del modal xxxx
    $("#txtNuevoRuc").attr('disabled', false); //variables de los elementos del modal xxxx

    $('#ddlCEmpresaTipoEmpresa').attr('disabled', false);
    $('#ddlCEmpresaRegimen').attr('disabled', false);

    //vaciar elementos text de todo el modal
    $('#' + ModCEmpresa[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUEmpresa() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoEmpresa').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorEmpresa").removeAttr("class");//quitar el atributo class
    $("#DivModBorEmpresa").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaEmpresa").removeAttr("class");//quitar el atributo class
    $("#DivModHeaEmpresa").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitEmpresa').text('Editar Empresa');//tttt
    //cambiar el color icono btn
    $("#btnNueEmpresa").removeAttr("class");//quitar el atributo class
    $("#btnNueEmpresa").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNueEmpresa i").removeAttr("class");
    $("#btnNueEmpresa i").attr("class", "fa fa-save fa-2x");
    //color ddl
    $("#ddlCEmpresaTipoEmpresa").removeAttr("class"); //uitar propiedades
    $("#ddlCEmpresaTipoEmpresa").attr("class", "form-control border-warning");//pintr roo
    $("#ddlCEmpresaRegimen").removeAttr("class"); //uitar propiedades
    $("#ddlCEmpresaRegimen").attr("class", "form-control border-warning");//pintr roo
    //bloquear elementos
    $("#txtNuevoEmpresa").attr('disabled', false); //variables de los elementos del modal xxxx
    $("#txtNuevoRazonSocial").attr('disabled', false); //variables de los elementos del modal xxxx
    $("#txtNuevoRuc").attr('disabled', false); //variables de los elementos del modal xxxx

    $('#ddlCEmpresaTipoEmpresa').attr('disabled', false);
    $('#ddlCEmpresaRegimen').attr('disabled', false);
    //vaciar elementos text de todo el modal
    $('#' + ModCEmpresa[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDEmpresa() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoEmpresa').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorEmpresa").removeAttr("class");//quitar el atributo class
    $("#DivModBorEmpresa").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaEmpresa").removeAttr("class");//quitar el atributo class
    $("#DivModHeaEmpresa").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitEmpresa').text('Eliminar Empresa');//tttt
    //cambiar el color icono btn
    $("#btnNueEmpresa").removeAttr("class");//quitar el atributo class
    $("#btnNueEmpresa").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNueEmpresa i").removeAttr("class");
    $("#btnNueEmpresa i").attr("class", "fa fa-trash fa-2x");//ícono
    //color ddl
    $("#ddlCEmpresaTipoEmpresa").removeAttr("class"); //uitar propiedades
    $("#ddlCEmpresaTipoEmpresa").attr("class", "form-control border-danger");//pintr roo
    $("#ddlCEmpresaRegimen").removeAttr("class"); //uitar propiedades
    $("#ddlCEmpresaRegimen").attr("class", "form-control border-danger");//pintr roo
    //bloquear elementos
    $("#txtNuevoEmpresa").attr('disabled', true); //variables de los elementos del modal xxxx
    $("#txtNuevoRazonSocial").attr('disabled', true); //variables de los elementos del modal xxxx
    $("#txtNuevoRuc").attr('disabled', true); //variables de los elementos del modal xxxx

    $('#ddlCEmpresaTipoEmpresa').attr('disabled', true);
    $('#ddlCEmpresaRegimen').attr('disabled', true);
    //vaciar elementos text de todo el modal
    $('#' + ModCEmpresa[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockEmpresa() {// nombre función xxxx

    if (EEmpresa == true) {// variables xxxx
        $("#btnNueEmpresa").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNueEmpresa").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter
    }
    else if (EEmpresa == false) {// variables xxxx
        $("#btnNueEmpresa").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNueEmpresa").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter
    }
    if (VarJsIdRegimen == 0 || VarJsIdTipoEmpresa==0) {
        $("#btnNueEmpresa").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNueEmpresa").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter
    }
}

//guardar CUD
$('#btnNueEmpresa').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formEmpresa.checkValidity()) {
        switch (CRUDEmpresa) { // variable crud xxxx
            case "C":
                FnJsAjaxCEmpresa(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUEmpresa();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDEmpresa();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Empresa");/////tttt
        }
    }
    console.log(formEmpresa.checkValidity());
});

//ajax CUD
function FnJsAjaxCEmpresa() {
    $.ajax({
        url: "/modulo9/VstClientes.aspx/FnCEmpresaV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            Empresa: VarJsEmpresa,
            RazonSocial:VarJsRazonSocial,
            Ruc:VarJsRuc,
            IdTipoEmpresa: VarJsIdTipoEmpresa,
            IdRegimen:VarJsIdRegimen
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Empresa Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDEmpresa = "error"
                console.log("No se pudo agregar Empresa");//
            }
            FnAlertaEmpresa(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUEmpresa() {
    $.ajax({
        url: "/modulo9/VstClientes.aspx/FnUEmpresaV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdEmpresa: VarJsEmpresaId,
            Empresa: VarJsEmpresa,
            RazonSocial: VarJsRazonSocial,
            Ruc: VarJsRuc,
            IdTipoEmpresa: VarJsIdTipoEmpresa,
            IdRegimen: VarJsIdRegimen

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Empresa Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDEmpresa = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaEmpresa();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDEmpresa() {
    $.ajax({
        url: "/modulo9/VstClientes.aspx/FnDEmpresaV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdEmpresa: VarJsEmpresaId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Empresa Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDEmpresa = "error"
                console.log("No se pudo Eliminar Empresa");////tttt
            }
            FnAlertaEmpresa(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxEEmpresa() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo9/VstClientes.aspx/FnEEmpresaV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdEmpresa: VarJsEmpresaId,
            Empresa: VarJsEmpresa,
            RazonSocial: VarJsRazonSocial,
            Ruc: VarJsRuc            
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                EEmpresa = true; // variable existe xxxx
                $('#lblexistenuevoEmpresa').text("Existe Empresa");// id etiqueta texto etiqueta //tttt
                FnJsBlockEmpresa();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                EEmpresa = false;// variable existe xxxx
                $('#lblexistenuevoEmpresa').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockEmpresa(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExisteEmpresa() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoEmpresa').val().length >= 3 && $('#txtNuevoRazonSocial').val().length >= 3 && $('#txtNuevoRuc').val().length >= 3 ) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoEmpresa').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsEmpresa = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteEmpresa()) {//nombre función verificar existe xxxx
        FnJsAjaxEEmpresa(); // llamar todos los existes xxxx
    }
});

$('#txtNuevoRazonSocial').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsRazonSocial = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteEmpresa()) {//nombre función verificar existe xxxx
        FnJsAjaxEEmpresa(); // llamar todos los existes xxxx

    }
});

$('#txtNuevoRuc').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsRuc = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteEmpresa()) {//nombre función verificar existe xxxx
        FnJsAjaxEEmpresa(); // llamar todos los existes xxxx
    }
});

$('#ddlCEmpresaTipoEmpresa').change(function (e) {
    VarJsIdTipoEmpresa = $('#ddlCEmpresaTipoEmpresa').val();  
    FnJsBlockEmpresa();
});

$('#ddlCEmpresaRegimen').change(function (e) {
    VarJsIdRegimen = $('#ddlCEmpresaRegimen').val();   
    FnJsBlockEmpresa();
});

function FnJSFillDdlEmpresaTipoEmpresa() {
    $('#ddlCEmpresaTipoEmpresa').empty(); // xxxx id
    $.ajax({
        type: "POST",
        url: "/modulo2/VstProveedor.aspx/FnRTipoEmpresaV", // xxxx
        data: {}, /*{ data: jsonString }*/
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLEmpresaTipoEmpresa == "null") {
                $('#ddlCEmpresaTipoEmpresa').append($("<option> </option>").val("0").html("Seleccionar TipoEmpresa"));  // xxxx id val html            
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLEmpresaTipoEmpresa == value.TipoEmpresa) {
                        $('#ddlCEmpresaTipoEmpresa').append($("<option> </option>").val(value.IdTipoEmpresa).html(value.TipoEmpresa));  // xxxx id texto
                        VarJsIdTipoEmpresa = value.IdTipoEmpresa;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCEmpresaTipoEmpresa').append($("<option> </option>").val(value.IdTipoEmpresa).html(value.TipoEmpresa)); // id en un val y en html el nombre
            });
            VAlDDLEmpresaTipoEmpresa = "null";
        }
    });
}

function FnJSFillDdlEmpresaRegimen() {
    $('#ddlCEmpresaRegimen').empty(); // xxxx id
    $.ajax({
        type: "POST",
        url: "/modulo2/VstProveedor.aspx/FnRRegimenV", // xxxx
        data: {}, /*{ data: jsonString }*/
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLEmpresaRegimen == "null") {
                $('#ddlCEmpresaRegimen').append($("<option> </option>").val("0").html("Seleccionar Tipo Régimen"));  // xxxx id val html            
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLEmpresaRegimen == value.Regimen) {
                        $('#ddlCEmpresaRegimen').append($("<option> </option>").val(value.IdRegimen).html(value.Regimen));  // xxxx id texto
                        VarJsIdRegimen = value.IdRegimen;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCEmpresaRegimen').append($("<option> </option>").val(value.IdRegimen).html(value.Regimen)); // id en un val y en html el nombre
            });
            VAlDDLEmpresaRegimen = "null";
        }
    });
}

function FnAlertaEmpresa() {//nombre de la función xxxx

    switch (CRUDEmpresa) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertEmpresa = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertEmpresa = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertEmpresa = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertEmpresa = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertEmpresa = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertEmpresa = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertEmpresa = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertEmpresa = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Empresa Alert")//tttt
    }
    //alerta
    $('#alertaClientes .modal-content').addClass(VarJsColorAlertEmpresa);//variable de color alerta xxxx
    $('#alertaClientes h5').text(VarJsTextoAlertEmpresa);//variable de texto alerta xxxx
    $('#alertaClientes').modal('show');
    setTimeout(function () {
        $('#alertaClientes').modal('hide');
        $('#alertaClientes .modal-content').removeClass(VarJsColorAlertEmpresa);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblEmpresa.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxREmpresa();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNEmpresa").modal("toggle");//nombre modal xxxx
}