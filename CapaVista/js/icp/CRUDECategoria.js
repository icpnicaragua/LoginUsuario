/*variable de tablas*/
var tablaCategoria;/*tabla mpodulo*/
var ModCCategoria = $('#modalNCategoria'); // modal 
//campos de tablas
var VarJsCategoriaId = 0;
var VarJsCategoria = "";
var VarJsIdFamilia = 0;
//dddlist Familia
var VAlDDLCategoriaFamilia = "null";// para guardar lo que está en la tabla y luego asignar al ddl

//igual para todos
var formCategoria = document.querySelector('#form1');

//variables crud
CRUDCategoria = "";
//variables alertas
var VarJsColorAlertCategoria = "";
var VarJsTextoAlertCategoria = "";
//variables existe
var ECategoria = true;


$('#lbMostrarCategoria').click(function (e) {//1 evento para mostrar contenido  xxxx
    e.preventDefault();
    FnJsAjaxRCategoria(); //llama al ajax xxxx
    FnJSFillDdlCategoriaFamilia();//cargar ddl
});

function FnJsAjaxRCategoria() { //2 pide los datos en bd de la tabla  xxxx
    $.ajax({
        type: "POST",
        url: "/modulo10/VstFamilia.aspx/FnRCategoriaV", // nombre de página y nombre de función xxxx
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowCategoria(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowCategoria(data) {//3 llenar la tabla xxxx

    $('#tblCategoria').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    tablaCategoria = $("#tblCategoria").DataTable({// variable nombre tabla xxxx

        "retrieve": true,
        dom: 'Bfrtip',

        "order": [[2, 'asc'],[1, 'asc']],//"order": [[ 0, 'asc' ], [ 1, 'desc' ]] // columna, orden xxxx comienza en 0
        "columnDefs": [
            { "targets": 3, "searchable": false },
            { "orderable": false, "targets": 3 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colCategoria'//se añade el id para ocultar xxxx
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
                    columns: [':not(:eq(3)):visible'] /// index de controles xxxx para no mostrar comienza en 0
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
                    columns: [':not(:eq(3)):visible'] ///  index de controles xxxx para no mostrar comienza en 0
                },
                titleAttr: 'PDF',
                filename: 'Categoria' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte tttt
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
                                    text: 'Categoria', //tttt
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Categoria' //tttt
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
                filename: 'Categoria' + "_" + FnJsDate() + "_" + FnJsHour(), //tttt
                text: '<i class="far fa-file-excel fa-2x"></i>',
                className: 'btn btn-success d-none d-lg-block',
                exportOptions: {
                    columns: [':not(:eq(3)):visible'] // index de controles xxxx para no mostrar inicia en 0
                },
                titleAttr: 'Excel',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')

                }

            }
        ],
        "language": FnJsEspTbl()
    });
    tablaCategoria.buttons().container().addClass('form-inline');///variable xxxx

    for (var contCategoria = 0; contCategoria < data.length; contCategoria++) { // declarar variable de recorrido de arreglo data xxxx
        tablaCategoria.row.add([//sensitivecase:
            data[contCategoria].IdCategoria,//campos
            data[contCategoria].Categoria,//campos
            data[contCategoria].ObjFamilia.Familia,
            '<button value="editar" href="#modalNCategoria" data-toggle="modal" title="editar" class="btn btn-warning  btn-editCategoria"><i class="fas fa-pencil-alt"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="eliminar" href="#modalNCategoria" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteCategoria"><i class="fa fa-trash" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
}

//acciones cud
$('#lbNCategoria').click(function (e) {//4 evento para mostrar modal de nuevo
    e.preventDefault();
    FnJsCCategoria(); // nombre función xxxx
    ECategoria = true; // variable xxxx

    FnJsBlockCategoria(); // nombre función xxxx
    FnJSFillDdlCategoriaFamilia();
    CRUDCategoria = "C"; // nombre variable xxxx

    //campos xxxx
    VarJsCategoriaId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsCategoria = ""; // cada campo tiene una variable, inicializar xxxx
    VarJsIdFamilia = 0;

});
$(document).on('click', '.btn-editCategoria', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsUCategoria();//nombre de función xxxx
    var dataCategoria = tablaCategoria.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsCategoriaId = dataCategoria[0]; //id de la fila seleccionada
    $('#txtNuevoCategoria').val(dataCategoria[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsCategoria = dataCategoria[1]; // variable elemento, variable data, índice xxxx
    VAlDDLCategoriaFamilia = (dataCategoria[2]);
    FnJSFillDdlCategoriaFamilia();
    VarJsIdFamilia = $('#ddlCCategoriaFamilia').val();
    CRUDCategoria = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteCategoria', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDCategoria();//nombre de función xxxx
    ECategoria = false; // variable de existe xxxx


    FnJsBlockCategoria();//función bloquear xxxx
    var dataCategoria = tablaCategoria.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsCategoriaId = dataCategoria[0]; //id de la fila seleccionada
    $('#txtNuevoCategoria').val(dataCategoria[1]);// [indice columna]  de la fila seleccionada xxxx
    VarJsCategoria = dataCategoria[1]; // variable elemento, variable data, índice xxxx
    VAlDDLCategoriaFamilia = (dataCategoria[2]);
    FnJSFillDdlCategoriaFamilia();
    
    CRUDCategoria = "D";
});

//pintar modal
function FnJsCCategoria() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoCategoria').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorCategoria").removeAttr("class");//quitar el atributo class
    $("#DivModBorCategoria").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaCategoria").removeAttr("class");//quitar el atributo class
    $("#DivModHeaCategoria").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitCategoria').text('Nuevo Categoria');//tttt
    //cambiar el color icono btn
    $("#btnNueCategoria").removeAttr("class");//quitar el atributo class
    $("#btnNueCategoria").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#btnNueCategoria i").removeAttr("class");
    $("#btnNueCategoria i").attr("class", "fa fa-save fa-2x");
    //color ddl
    $("#ddlCCategoriaFamilia").removeAttr("class"); //uitar propiedades
    $("#ddlCCategoriaFamilia").attr("class", "form-control border-success");//pintr roo
    //bloquear elementos
    $("#txtNuevoCategoria").attr('disabled', false); //variables de los elementos del modal xxxx
    $('#ddlCCategoriaFamilia').attr('disabled', false);
    //vaciar elementos text de todo el modal
    $('#' + ModCCategoria[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsUCategoria() { //nombe función xxxx
    //campos xxx
    $('#lblexistenuevoCategoria').text(""); // id etiqueta texto etiqueta xxxx

    console.log("colorear nuevo");
    //cambiar el color del modal borde
    $("#DivModBorCategoria").removeAttr("class");//quitar el atributo class
    $("#DivModBorCategoria").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaCategoria").removeAttr("class");//quitar el atributo class
    $("#DivModHeaCategoria").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitCategoria').text('Editar Categoria');//tttt
    //cambiar el color icono btn
    $("#btnNueCategoria").removeAttr("class");//quitar el atributo class
    $("#btnNueCategoria").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#btnNueCategoria i").removeAttr("class");
    $("#btnNueCategoria i").attr("class", "fa fa-save fa-2x");
    //color ddl
    $("#ddlCCategoriaFamilia").removeAttr("class"); //uitar propiedades
    $("#ddlCCategoriaFamilia").attr("class", "form-control border-warning");//pintr roo
    //bloquear elementos
    $("#txtNuevoCategoria").attr('disabled', false); //variables de los elementos del modal xxxx
    $('#ddlCCategoriaFamilia').attr('disabled', false);
    //vaciar elementos text de todo el modal
    $('#' + ModCCategoria[0].id + ' :text').val(""); // variable del modal xxxx

}
function FnJsDCategoria() { //nombe función xxxx
    //campos xxxx
    $('#lblexistenuevoCategoria').text(""); // id etiqueta texto etiqueta xxxx

    //cambiar el color del modal borde
    $("#DivModBorCategoria").removeAttr("class");//quitar el atributo class
    $("#DivModBorCategoria").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaCategoria").removeAttr("class");//quitar el atributo class
    $("#DivModHeaCategoria").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitCategoria').text('Eliminar Categoria');//tttt
    //cambiar el color icono btn
    $("#btnNueCategoria").removeAttr("class");//quitar el atributo class
    $("#btnNueCategoria").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#btnNueCategoria i").removeAttr("class");
    $("#btnNueCategoria i").attr("class", "fa fa-trash fa-2x");//ícono
    //color ddl
    $("#ddlCCategoriaFamilia").removeAttr("class"); //uitar propiedades
    $("#ddlCCategoriaFamilia").attr("class", "form-control border-danger");//pintr roo
    //bloquear elementos
    $("#txtNuevoCategoria").attr('disabled', true); //variables de los elementos del modal xxxx
    $('#ddlCCategoriaFamilia').attr('disabled', true);
    //vaciar elementos text de todo el modal
    $('#' + ModCCategoria[0].id + ' :text').val(""); // variable del modal xxxx

}

/*quitar btn CUD*/
function FnJsBlockCategoria() {// nombre función xxxx

    if (ECategoria == true) {// variables xxxx
        $("#btnNueCategoria").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#btnNueCategoria").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter
      
    }
    else if (ECategoria == false) {// variables xxxx
        $("#btnNueCategoria").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#btnNueCategoria").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter
     

    }
}

//guardar CUD
$('#btnNueCategoria').click(function (e) {//1 evento para mostrar contenido xxxx
    e.preventDefault();
    if (formCategoria.checkValidity()) {
        switch (CRUDCategoria) { // variable crud xxxx
            case "C":
                FnJsAjaxCCategoria(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxUCategoria();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDCategoria();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Categoria");/////tttt
        }
    }
    console.log(formCategoria.checkValidity());
});

//ajax CUD
function FnJsAjaxCCategoria() {
    $.ajax({
        url: "/modulo10/VstFamilia.aspx/FnCCategoriaV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            Categoria: VarJsCategoria,
            IdFamilia: VarJsIdFamilia
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Categoria Agregado"); ////tttt        
            }
            else {
                //no se creó
                CRUDCategoria = "error"
                console.log("No se pudo agregar Tipo de indentificación");//
            }
            FnAlertaCategoria(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxUCategoria() {
    $.ajax({
        url: "/modulo10/VstFamilia.aspx/FnUCategoriaV", // nombre de página y nombre de función cude
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdCategoria: VarJsCategoriaId,
            Categoria: VarJsCategoria,
            IdFamilia: VarJsIdFamilia

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se actualizó
                console.log("Categoria Actualizado"); ////tttt
            }
            else {
                //no se borró
                CRUDCategoria = "error"
                console.log("no se pudo actualizar");//
            }
            FnAlertaCategoria();// nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDCategoria() {
    $.ajax({
        url: "/modulo10/VstFamilia.aspx/FnDCategoriaV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdCategoria: VarJsCategoriaId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Categoria Eliminado"); ////tttt
            }
            else {
                //no se creó
                CRUDCategoria = "error"
                console.log("No se pudo Eliminar Categoria");////tttt
            }
            FnAlertaCategoria(); // nombre función alerta xxxx

        }
    });//ajax fin
}

//Existe
function FnJsAjaxECategoria() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo10/VstFamilia.aspx/FnECategoriaV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdCategoria: VarJsCategoriaId,
            Categoria: VarJsCategoria,
            IdFamilia: VarJsIdFamilia
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                ECategoria = true; // variable existe xxxx
                $('#lblexistenuevoCategoria').text("Existe Categoria");// id etiqueta texto etiqueta //tttt
                FnJsBlockCategoria();//nombre de función bloquear xxxx

            }
            else {
                //mostrar btn
                ECategoria = false;// variable existe xxxx
                $('#lblexistenuevoCategoria').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockCategoria(); //nombre de función bloquear xxxx
            }
        }
    });//ajax fin
}


function VerificarExisteCategoria() {// nombre de función verificarexiste xxxx
    if ($('#txtNuevoCategoria').val().length >= 3 && $('#ddlCCategoriaFamilia').val()>0) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}


$('#txtNuevoCategoria').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsCategoria = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteCategoria()) {//nombre función verificar existe xxxx
        FnJsAjaxECategoria(); // llamar todos los existes xxxx

    }
});

$('#ddlCCategoriaFamilia').change(function (e) {
    VarJsIdFamilia = $('#ddlCCategoriaFamilia').val();
    if (VerificarExisteCategoria()) {
        FnJsAjaxECategoria();
    }
});

function FnJSFillDdlCategoriaFamilia() {
    $('#ddlCCategoriaFamilia').empty(); // xxxx id
    $.ajax({
        type: "POST",
        url: "/modulo10/VstFamilia.aspx/FnRFamiliaV", // xxxx
        data: {}, /*{ data: jsonString }*/
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLCategoriaFamilia == "null") {
                $('#ddlCCategoriaFamilia').append($("<option> </option>").val("0").html("Seleccionar Familia"));  // xxxx id val html            
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLCategoriaFamilia == value.Familia) {
                        $('#ddlCCategoriaFamilia').append($("<option> </option>").val(value.IdFamilia).html(value.Familia));  // xxxx id texto
                        VarJsIdFamilia = value.IdFamilia;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCCategoriaFamilia').append($("<option> </option>").val(value.IdFamilia).html(value.Familia)); // id en un val y en html el nombre
            });
            VAlDDLCategoriaFamilia = "null";
        }
    });
}

function FnAlertaCategoria() {//nombre de la función xxxx

    switch (CRUDCategoria) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertCategoria = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertCategoria = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertCategoria = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertCategoria = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertCategoria = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertCategoria = "Eliminado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertCategoria = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertCategoria = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Categoria Alert")//tttt
    }
    //alerta
    $('#alertaFamilia .modal-content').addClass(VarJsColorAlertCategoria);//variable de color alerta xxxx
    $('#alertaFamilia h5').text(VarJsTextoAlertCategoria);//variable de texto alerta xxxx
    $('#alertaFamilia').modal('show');
    setTimeout(function () {
        $('#alertaFamilia').modal('hide');
        $('#alertaFamilia .modal-content').removeClass(VarJsColorAlertCategoria);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#secciontblCategoria.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxRCategoria();//función ajax de llenado de la tabla xxxx
    }
    //cerrar modal
    $("#modalNCategoria").modal("toggle");//nombre modal xxxx
}