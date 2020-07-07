var JsonM = {};
var JsonV = {};
var JsonE = {};

var ChildM = {};
var ChildV = {};
var ChildE = {};

var indexM = 0;
var indexV = 0;
var indexE = 0;

var SendPermisos = [];

var SendPermiso = {};

var idu;

/*variable de tablas*/
var TablaRol;/*tabla rol*/
var ModCRUDENRol = $('#ModalRol'); // modal rol

var VarJsRolId = 0; //idmodulo
var VarJsRol = "";

//validador
var FormRol = document.querySelector('#form1');

//variables crud
CRUDRol = "";
//variables alertas
var VarJsColorAlertRol = "";
var VarJsTextoAlertRol = "";
//variables existe
var ERol = true;

$('#LBShowRol').click(function (e) {//1 evento para mostrar contenido de módulo xxxx
    e.preventDefault();
    FnJsAjaxRRol(); //llama al ajax xxxx
});

function FnJsAjaxRRol() { //2 pide los datos en bd de la tabla rol xxxx
    $.ajax({
        type: "POST",
        url: "/modulo4/vst12.aspx/FnRRolV", // nombre de página y nombre de función xxxx
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowRol(data.d); // se envía los datos recuperados a la función que llena la tabla xxxx
        }
    }
    );
}

function AddrowRol(data) {//3 llenar la tabla xxxx

    $('#TblRol').DataTable().clear().destroy(); // nombre tabla necesario para actualizar, borra y destru xxxx

    TablaRol = $("#TblRol").DataTable({// variable nombre tabla xxxx

        "retrieve": true,
        dom: 'Bfrtip',
        "order": [1, 'asc'],//"order": [[ 0, 'asc' ], [ 1, 'desc' ]] // columna, orden xxxx comienza en 0
        "columnDefs": [
            { "targets": 3, "searchable": false },
            { "orderable": false, "targets": 3 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colRol'//se añade el id para ocultar xxxx
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
                filename: 'Rol' + "_" + FnJsDate() + "_" + FnJsHour(),// nombre reporte xxxx
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
                                    text: 'Soaz Rol', //texto del reporte xxxx
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte soaz Rol' //superior derecha xxxx
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
                filename: 'Rol' + "_" + FnJsDate() + "_" + FnJsHour(), // nombre de archivo xxxx
                text: '<i class="far fa-file-excel fa-2x"></i>',
                className: 'btn btn-success .d-none .d-sm-block',
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
    TablaRol.buttons().container().addClass('form-inline');///variable xxxx

    for (var contRol = 0; contRol < data.length; contRol++) { // declarar variable de recorrido de arreglo data xxxx
        TablaRol.row.add([//sensitivecase:
            data[contRol].Id_rol,
            data[contRol].Rol,
            data[contRol].Fecha_inicioRol,
            '<button value="editar" href="#ModalRol" data-toggle="modal" title="editar" class="btn btn-warning  btn-editRol btn3d"><i class="fas fa-pencil-alt fa-2x"></i> </button>' +// modal editar y clase de botón xxxx
            '<button value="editar_permiso" href="#DivTVRol" data-toggle="collapse" title="editar_permisos" class="btn btn-primary  btn-editPermisos btn3d"><i class="fas fa-user-lock fa-2x"></i> </button>' +// activar div para editar arbol y clase de botón xxxx
            '<button value="clonar" title="clonar" class="btn btn-success  btn-cloneRol btn3d"><i class="fas fa-copy fa-2x" ></i> </button>' + // clonar y clase de botón xxxx
            '<button value="eliminar" href="#ModalRol" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteRol btn3d"><i class="fa fa-trash fa-2x" ></i> </button>'// modal eliminar y clase de botón xxxx
        ]
        ).draw(false);
    }
    modulosobj();//esto se está probando
}

//acciones cudn
$('#LbCRUDENRol').click(function (e) {//4 evento para mostrar modal, con formato de nuevo
    e.preventDefault();
    FnJsCRol(); // nombre función xxxx 
    ERol = true; // variable xxxx

    FnJsBlockRol(); // nombre función xxxx

    CRUDRol = "C"; // nombre variable xxxx

    VarJsRolId = 0; // cada campo tiene una variable, inicializar xxxx
    VarJsRol = ""; // cada campo tiene una variable, inicializar xxxx
});
$(document).on('click', '.btn-editRol', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsURol();//nombre de función xxxx
    var DataRol = TablaRol.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsRolId = DataRol[0]; //id de la fila seleccionada
    $('#TxtRol').val(DataRol[1]);// [indice columna]  de la fila seleccionada xxxx

    VarJsRol = DataRol[1]; // variable elemento, variable data, índice xxxx

    CRUDRol = "U";// variable crud, estado crud xxxx
});
$(document).on('click', '.btn-deleteRol', function (e) {//nombre de clase xxxx
    e.preventDefault();
    FnJsDRol();//nombre de función xxxx
    ERol = false; // variable de existe xxxx
    FnJsBlockRol();//función bloquear xxxx
    var DataRol = TablaRol.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsRolId = DataRol[0]; //id de la fila seleccionada
    $('#TxtRol').val(DataRol[1]);// [indice columna]  de la fila seleccionada xxxx

    VarJsRol = DataRol[1]; // variable elemento, variable data, índice xxxx
    
    CRUDRol = "D";
});
$(document).on('click', '.btn-cloneRol', function (e) {//nombre de clase xxxx
    e.preventDefault();
    var DataRol = TablaRol.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsRolId = DataRol[0]; //id de la fila seleccionada
    CRUDRol = "N";
    FnJsAjaxNRol();

});
$(document).on('click', '.btn-editPermisos', function (e) {//nombre de clase xxxx
    e.preventDefault();
    console.log('mostramos el árbol');
    $('#H2Permisos').text($(e.currentTarget).data('Pru'));
    var DataRol = TablaRol.row($(this).parents("tr")).data();// variable, tabla xxxx agarra la fila, luego hay que llamar datatc con subíndice de la columna
    VarJsRolId = DataRol[0]; //id de la fila seleccionada
    $('#H2Permisos').text('Permiso: ' + DataRol[1]);
    idu = VarJsRolId;
    ClearTree();
    FnJsAjaxRModulo();
});

//pintar modal
function FnJsCRol() { //nombe función xxxx
    $('#lblExisteRol').text(""); // id etiqueta texto etiqueta xxxx
    //cambiar el color del modal borde
    $("#DivModBorRol").removeAttr("class");//quitar el atributo class
    $("#DivModBorRol").attr('class', 'modal-content border-success');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaRol").removeAttr("class");//quitar el atributo class
    $("#DivModHeaRol").attr('class', 'modal-header bg-success');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitRol').text('Nuevo Rol');
    //cambiar el color icono btn
    $("#BtnCRUDENRol").removeAttr("class");//quitar el atributo class
    $("#BtnCRUDENRol").attr('class', 'btn btn-success pull-right');//poner verde tirar a la derecha
    $("#BtnCRUDENRol i").removeAttr("class");
    $("#BtnCRUDENRol i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#TxtRol").attr('disabled', false); //variables de los elementos del modal xxxx
    //vaciar elementos text de todo el modal
    $('#' + ModCRUDENRol[0].id + ' :text').val(""); // variable del modal xxxx
}
function FnJsURol() { //nombe función xxxx
    $('#lblExisteRol').text(""); // id etiqueta texto etiqueta xxxx
    //cambiar el color del modal borde
    $("#DivModBorRol").removeAttr("class");//quitar el atributo class
    $("#DivModBorRol").attr('class', 'modal-content border-warning');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaRol").removeAttr("class");//quitar el atributo class
    $("#DivModHeaRol").attr('class', 'modal-header bg-warning');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitRol').text('Editar Rol');
    //cambiar el color icono btn
    $("#BtnCRUDENRol").removeAttr("class");//quitar el atributo class
    $("#BtnCRUDENRol").attr('class', 'btn btn-warning pull-right');//poner verde tirar a la derecha
    $("#BtnCRUDENRol i").removeAttr("class");
    $("#BtnCRUDENRol i").attr("class", "fa fa-save fa-2x");
    //bloquear elementos
    $("#TxtRol").attr('disabled', false); //variables de los elementos del modal xxxx
    //vaciar elementos text de todo el modal
    $('#' + ModCRUDENRol[0].id + ' :text').val(""); // variable del modal xxxx
}
function FnJsDRol() { //nombe función xxxx
    $('#lblExisteRol').text(""); // id etiqueta texto etiqueta xxxx
    //cambiar el color del modal borde
    $("#DivModBorRol").removeAttr("class");//quitar el atributo class
    $("#DivModBorRol").attr('class', 'modal-content border-danger');//poner verde
    //cambiar el color del modal header
    $("#DivModHeaRol").removeAttr("class");//quitar el atributo class
    $("#DivModHeaRol").attr('class', 'modal-header bg-danger');//poner verde
    //cambiar el titulo del modal header
    $('#H4ModTitRol').text('Eliminar Rol');
    //cambiar el color icono btn
    $("#BtnCRUDENRol").removeAttr("class");//quitar el atributo class
    $("#BtnCRUDENRol").attr('class', 'btn btn-danger pull-right');//poner verde tirar a la derecha
    $("#BtnCRUDENRol i").removeAttr("class");
    $("#BtnCRUDENRol i").attr("class", "fa fa-trash fa-2x");
    //bloquear elementos
    $("#TxtRol").attr('disabled', true); //variables de los elementos del modal xxxx
    //vaciar elementos text de todo el modal
    $('#' + ModCRUDENRol[0].id + ' :text').val(""); // variable del modal xxxx
}

/*quitar btn CUD*/
function FnJsBlockRol() {// nombre función xxxx

    if (ERol == true) {// variables xxxx
        $("#BtnCRUDENRol").fadeOut("fast"); //id xxxx efecto de fuga para desapareecer 
        $("#BtnCRUDENRol").attr('disabled', true);  //id xxxx se tiene que deshabilitar el btn para que no permita tap enter
    }
    else if (ERol == false) {// variables xxxx
        $("#BtnCRUDENRol").fadeIn("slow"); //id xxxx efecto de fuga para apareecer 
        $("#BtnCRUDENRol").attr('disabled', false);  //id xxxx se tiene que habilitar el btn para que  permita tap enter
    }
}

//guardar CUD
$('#BtnCRUDENRol').click(function (e) {//id xxxx
    e.preventDefault();
    if (FormRol.checkValidity()) {
        switch (CRUDRol) { // variable crud xxxx
            case "C":
                FnJsAjaxCRol(); // función para crear xxxx
                break;
            case "U":
                FnJsAjaxURol();// función para crear xxxx
                break;
            case "D":
                FnJsAjaxDRol();// función para crear xxxx
                break;
            default:
                console.log("Error en cud Rol");
        }
    }
});

//ajax CUD
function FnJsAjaxCRol() {
    $.ajax({
        url: "/modulo4/vst12.aspx/FnCRolV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            Rol: VarJsRol
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Rol Agregado"); //texto xxxx            
            }
            else {
                //no se creó
                CRUDRol = "error"
                console.log("No se pudo agregar Rol");//
            }
            FnAlertaRol(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxURol() {
    $.ajax({
        url: "/modulo4/vst12.aspx/FnURolV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdRol: VarJsRolId,
            Rol: VarJsRol
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Rol Modificado"); //texto xxxx            
            }
            else {
                //no se creó
                CRUDRol = "error"
                console.log("No se pudo agregar Rol");//
            }
            FnAlertaRol(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxDRol() {
    $.ajax({
        url: "/modulo4/vst12.aspx/FnDRolV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdRol: VarJsRolId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Rol Eliminado"); //texto xxxx            
            }
            else {
                //no se creó
                CRUDRol = "error"
                console.log("No se pudo agregar Rol");//
            }
            FnAlertaRol(); // nombre función alerta xxxx
        }
    });//ajax fin
}
function FnJsAjaxNRol() {
    $.ajax({
        url: "/modulo4/vst12.aspx/FnNRolV", // nombre de página y nombre de función cude xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({// los parámetros de la sig línea
            IdRol: VarJsRolId
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //se creó
                console.log("Rol Clonado"); //texto xxxx            
            }
            else {
                //no se creó
                //CRUDRol = "error"
                console.log("No se pudo Clonar Rol");//
            }
            FnAlertaRol(); // nombre función alerta xxxx
        }
    });//ajax fin
}

//Existe
function FnJsAjaxERol() {// nombre de la función existe xxxx
    $.ajax({
        url: "/modulo4/vst12.aspx/FnERolV", // nombre de página y nombre de función existe xxxx
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({//parámetros xxxx
            IdRol: VarJsRolId,
            Rol: VarJsRol
        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                //ocultar botón
                ERol = true; // variable existe xxxx
                $('#lblExisteRol').text("Existe Rol");// id etiqueta texto etiqueta xxxx
                FnJsBlockRol();//nombre de función bloquear xxxx
            }
            else {
                //mostrar btn
                ERol = false;// variable existe xxxx
                $('#lblExisteRol').text(""); // id etiqueta texto etiqueta xxxx
                FnJsBlockRol(); //nombre de función bloquear xxxx
            }
        }
    });
}

function VerificarExisteRol() {// nombre de función verificarexiste xxxx
    if ($('#TxtRol').val().length > 3) { // id de objetos de entradas, cantidad mínima permitida xxxx
        return true;
    }
    else {
        return false;
    }
}

$('#TxtRol').keyup(function (e) {//id de cada elemento en el modal xxxx
    VarJsRol = $(this).val(); // variable de este elemento xxxx
    if (VerificarExisteRol()) {//nombre función verificar existe xxxx
        FnJsAjaxERol(); // llamar todos los existes xxxx
    }
});

function FnAlertaRol() {//nombre de la función xxxx

    switch (CRUDRol) {//nombre de la variable cud xxxx
        case "C":
            VarJsColorAlertRol = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertRol = "Creado";//variable de texto alerta xxxx
            break;
        case "U":
            VarJsColorAlertRol = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertRol = "Actualizado";//variable de texto alerta xxxx
            break;
        case "D":
            VarJsColorAlertRol = "bg-danger";//variable de color alerta xxxx
            VarJsTextoAlertRol = "Eliminado";//variable de texto alerta xxxx
            break;
        case "N":
            VarJsColorAlertRol = "bg-success";//variable de color alerta xxxx
            VarJsTextoAlertRol = "Clonado";//variable de texto alerta xxxx
            break;
        case "P":
            VarJsColorAlertRol = "bg-warning";//variable de color alerta xxxx
            VarJsTextoAlertRol = "Actualizado";//variable de texto alerta xxxx
            break;
        case "Error":
            VarJsColorAlertRol = "bg-secondary";//variable de color alerta xxxx
            VarJsTextoAlertRol = "No se pudo realizar la operación";//variable de texto alerta xxxx
            break;
        default:
            console.log("Error CUD Rol Alert")
    }
    //alerta
    $('#Alerta .modal-content').addClass(VarJsColorAlertRol);//variable de color alerta xxxx
    $('#Alerta h5').text(VarJsTextoAlertRol);//variable de texto alerta xxxx
    $('#Alerta').modal('show');
    setTimeout(function () {
        $('#Alerta').modal('hide');
        $('#Alerta .modal-content').removeClass(VarJsColorAlertRol);//variable de color alerta xxxx
    }, 1500);// tiempo para que aparezca la alerta crear variable ms

    if ($("#SeccionTblRol.show").length > 0) {//seccion tabla xxxx
        FnJsAjaxRRol();//función ajax de llenado de la tabla xxxx
    }

    if (CRUDRol != "N" ) {
        if ( CRUDRol != "P") {
            //cerrar modal
            $("#ModalRol").modal("toggle");//nombre modal xxxx
        }
        
    }
}

$('#LbXPermisos').click(function (e) {//id xxxx
    e.preventDefault();
});

$('#LbUPermisos').click(function (e) {
    e.preventDefault();

    idu = VarJsRolId;
    SendPermisos = [];
    var StoploopM = false;
    var StoploopV = false;

    // get checked nodes
    var List = { "id": [], "dataid": [], "text": [] };
    $("#treeview").hummingbird("getUnchecked", { list: List, onlyEndNodes: false, onlyParents: false     });
    $.each(JsonM, function () {
        StoploopM = false;
        var tempM = this;
        for (var contC = 0; contC < List.id.length; contC++){
            if (List.id[contC] != 'xnode-0') {
                if (List.id[contC] == this.IdModulo + 'M') {
                    if ($('#' + List.id[contC]).parent().siblings('ul').children("li").children("label").children("input:checkbox:checked").length == 0) {
                        SendPermiso = {
                            ObjM: { IdModulo: this.IdModulo },
                            ObjV: { Idvista: "1" },
                            ObjE: { Id_elemento: "1" }
                        };
                        SendPermisos.push(SendPermiso);
                        StoploopM = true;                     
                           return;//para el for
                    }                     
                }
            }
        }
        if (StoploopM) {
            return;
        }
        $.each(JsonV, function () {
            var tempV = this;
            StoploopV = false;
            for (contC = 0; contC < List.id.length; contC++) {
                if (List.id[contC] != 'xnode-0') {
                    if (List.id[contC] == this.Idvista + 'V' && this.ObjModulo.IdModulo == tempM.IdModulo) {
                        if ($('#' + List.id[contC]).parent().siblings('ul').children("li").children("label").children("input:checkbox:checked").length == 0) {
                            SendPermiso = {
                                ObjM: { IdModulo: tempM.IdModulo },
                                ObjV: { Idvista: this.Idvista },
                                ObjE: { Id_elemento: "1" }
                            };
                            SendPermisos.push(SendPermiso);
                            StoploopV = true;
                            return;
                        }  
                    }
                }
            }
            if (StoploopV) {
                return;
            }
            $.each(JsonE, function () {
                for (contC = 0; contC < List.id.length; contC++) {
                    if (List.id[contC] != 'xnode-0') {
                        if (List.id[contC] == this.Id_elemento + 'E' && this.ObjVista.Idvista == tempV.Idvista && tempV.ObjModulo.IdModulo==tempM.IdModulo) {
                            SendPermiso = {
                                ObjM: { IdModulo: tempM.IdModulo },
                                ObjV: { Idvista: tempV.Idvista },
                                ObjE: { Id_elemento: this.Id_elemento }
                            };
                            SendPermisos.push(SendPermiso);
                        }
                    }
                }
            });
        });
    });

    FnJsAjaxUPermisos();
});

$('#prueba1').click(function (e) {
    e.preventDefault();
 
});

function llenararbol() {
   // traer completo el JSON
    ChildM = {};
    indexM = 0;
    $.each(JsonM, function () {
        ChildM[indexM] = {
            id: this.IdModulo + 'M',
            data_id: this.IdModulo + 'DM',
            text: this.Modulo,
            id_original: this.IdModulo
        };
        indexM++;
    });

    //agregar el modulo con vistaX temporal
    indexM = 0;
    $.each(ChildM, function () {
        if (ChildM[indexM].id_original!="1"){
            FillCHildV(ChildM[indexM].id_original);
            $("#treeview").hummingbird('addNode', {
                pos: 'after', anchor_attr: 'id',
                anchor_name: 'xnode',
                text: ChildM[indexM].text,
                the_id: ChildM[indexM].id,
                data_id: ChildM[indexM].data_id,
                end_node: false,
                children: ChildV 
            });
            $("#treeview").hummingbird();
        }
        indexM++;
    });

    //traer completo el json
    ChildV = {};
    indexV = 0;
    $.each(JsonV, function () {
        ChildV[indexV] = {
            id: this.Idvista + 'V',
            data_id: this.Idvista + 'DV',
            text: this.Vista,
            id_original: this.Idvista
        };
        indexV++;
    });

    //agregar vistas con elementos
    indexV = 0;
    $.each(ChildV, function () {
        if (ChildV[indexV].id_original != "1") {
            FillCHildE(ChildV[indexV].id_original);
            $("#treeview").hummingbird('addNode', {
                pos: 'after', anchor_attr: 'id',
                anchor_name: ChildV[indexV].id + 'X', //momentanea
                text: ChildV[indexV].text ,
                the_id: ChildV[indexV].id ,
                data_id: ChildV[indexV].data_id, 
                end_node: false,
                children: ChildE 
            });
            $("#treeview").hummingbird('removeNode', { attr: 'id', name: ChildV[indexV].id + 'X'  }); //adios momentanea
            $("#treeview").hummingbird();
        }
        indexV++;
    });

    $("#treeview").hummingbird('removeNode', { attr: 'id', name: 'xnode' }); //quitar ancla de módulo
    $("#treeview").hummingbird();

    $("#treeview").hummingbird("expandNode", {
      attr: "id",
      name: "xnode-0",
    expandParents: false
    });

    FNAjaxRPermisos();

}

function FillCHildV(IdM) {
    ChildV = {};
    indexV = 0;
    $.each(JsonV, function () {
        if (JsonV[indexV].ObjModulo.IdModulo==IdM) {
            ChildV[indexV] = {
                id: this.Idvista + 'VX',
                data_id: this.Idvista + 'DV',
                text: this.Vista,
                id_original: this.Idvista
            };           
        }     
        indexV++;
    });
}

function FillCHildE(IdV) {
    ChildE = {};
    indexE = 0;
    $.each(JsonE, function () {
        if (JsonE[indexE].ObjVista.Idvista == IdV) {
            ChildE[indexE] = {
                id: this.Id_elemento + 'E',
                data_id: this.Id_elemento + 'DE',
                text: this.Elemento,
                id_original: this.Id_elemento
            };
        }
        indexE++;
    });
}
/*
$("#treeview").on("nodeChecked", function () {

});

$("#treeview").on("nodeUnchecked", function () {
 
});
*/
function FnJsAjaxRModulo() { // pide los datos en bd de la tabla módulo xxxx
    $.ajax({
        type: "POST",
        url: "/modulo4/vst13.aspx/FnRModuloV", // nombre de página y nombre de función xxxx
        dataM: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (dataM) {
            JsonM = dataM.d;
            AjaxMostrarVISTA();
        }
    });  
}

function AjaxMostrarVISTA() { //2 pide los datos en bd de la tabla vista xxxx
    $.ajax({
        type: "POST",
        url: "/modulo4/vst13.aspx/FnRVist", // nombre de página y nombre de función xxxx
        data: {}, /*{ data: jsonString }*/
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            JsonV = data.d;
                  FnJsAjaxRElemento();           
        }
    });
}

function FnJsAjaxRElemento() {
    $.ajax({
        type: "POST",
        url: "/modulo4/vst13.aspx/FnRElem", // nombre de página y nombre de función
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            JsonE = data.d;
            llenararbol();
        }
    });
}

function ClearTree() {
    $("#treeview").find('ul').remove();
    $("#treeview").find('li').append('<ul><li data- id="1" ><i class="fa fa-plus"></i><label><input class="" id="xnode" data-id="custom-0-1" type="checkbox" />node-0-1</label></li></ul>');
    $("#treeview").hummingbird();
}

function FNAjaxRPermisos() {
    $.ajax({
        url: "/modulo4/vst12.aspx/FnRPermisosV", // nombre de página y nombre de función
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({ IdRol: idu }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            FNJScheckear(data.d);
        }
    });
}

function FNJScheckear(PermisosJSON) {
    var CkModulo;
    var CkVista;
    var CkElemento;

    $("#treeview").hummingbird("checkAll"); //check todos

    for (var ContCk = 0; ContCk < PermisosJSON.length; ContCk++) {
        CkModulo = PermisosJSON[ContCk].ObjM.IdModulo;
        CkVista = PermisosJSON[ContCk].ObjV.Idvista;
        CkElemento = PermisosJSON[ContCk].ObjE.Id_elemento;
        if (CkModulo != "1") {
            if (CkVista == "1") { //si dentro del módulo, se bloquean todas las vistas, hacer desaparecer el módulo
                // uncheck a specific node
                $("#treeview").hummingbird("uncheckNode", { // solo puede desseleccionar si está seleccionado
                    attr: "id",
                    name: CkModulo + 'M',//este valor es el que cambia
                    collapseChildren: false
                });
            }
            else if (CkElemento == "1") {//si todos los elementos de la vista están bloqueados, desaparecer la vista
                // uncheck a specific node
                $("#treeview").hummingbird("uncheckNode", { // solo puede desseleccionar si está seleccionado
                    attr: "id",
                    name: CkVista + 'V',//este valor es el que cambia
                    collapseChildren: false
                });
            }
            else {
                // uncheck a specific node
                $("#treeview").hummingbird("uncheckNode", { // solo puede desseleccionar si está seleccionado
                    attr: "id",
                    name: CkElemento + 'E',//este valor es el que cambia
                    collapseChildren: false
                });
            }
        }
    }
}

function FnJsAjaxUPermisos() {
    var JsonPermisos = JSON.stringify({ 'OO': SendPermisos, 'IDR':  idu });
    $.ajax({
        url: "/modulo4/vst12.aspx/FnUPermisos", // nombre de página y nombre de función 
        contentType: 'application/json; charser=utf-8',
        data: JsonPermisos, 
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data) {
                CRUDRol = "P";
                FnAlertaRol();
            }
            ClearTree();
            FnJsAjaxRModulo();
        }
    });
}

    // $("#treeview").hummingbird("checkAll"); //check todos
    //  $("#treeview").hummingbird("uncheckAll"); //deschec todos
    //  $("#treeview").hummingbird("collapseAll");// collapse all nodes
    //  $("#treeview").hummingbird("expandAll"); // expand all nodes

    // check a specific node
    //  $("#treeview").hummingbird("checkNode", {
    //attr:"id",
    //name:"xnode-0-1",      //solo este valor se tiene que modificar
    //expandParents:false
    // });

    // uncheck a specific node     
    // $("#treeview").hummingbird("uncheckNode", { // solo puede desseleccionar si está seleccionado
    //   attr: "id",
    // name: "xnode-0-1",//este valor es el que cambia
    //collapseChildren: false
    //});

    //$("#treeview").hummingbird("expandNode", {
    //  attr: "id",
    //name: "xnode-0-1",//valor a cambiar
    //expandParents: false
    //});


    // collapse a specific node
    //   $("#treeview").hummingbird("collapseNode", {
    //     attr: "id",
    //   name: "xnode-0-1",
    // collapseChildren: false
    //});

    // get checked nodes
    //var List = { "id": [], "dataid": [], "text": [] };
    // $("#treeview").hummingbird("getChecked", { list: List, onlyEndNodes: false, onlyParents: false, fromThis: false });
    // console.log(List);


    //agragar nodo por nombre
    //$("#treeview").hummingbird('addNode', {
    // pos: 'after', anchor_attr: 'text', anchor_name: 'padre1',
    //   text: 'xxxxxxxxxxxx', the_id: 'new_id', data_id: 'new_data_id', end_node: true
    // });