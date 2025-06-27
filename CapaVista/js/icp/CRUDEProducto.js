var tablaProducto;
var ModCProducto = $('#DivCardsProd');

var VarJsProductoId = 0;
var VarJsProducto = "";
var VarJsDescripcion = "";
var VarJsBarra = "";
var VarJsUG = "";
var VarJsIVA = "";
var VarJsMinimo = "";
var VarJsIdFamilia = 0;
var VarJsIdCategoria = 0;
var VarJsIdSubCategoria = 0;
var VarJsIdGarantia = 0;

var VAlDDLProductoFamilia = "null";
var VAlDDLProductoCategoria = "null";
var VAlDDLProductoSubCategoria = "null";
var VAlDDLProductoGarantia = "null";

var formProducto = document.querySelector('#form1');

CRUDProducto = "";

var VarJsColorAlertProducto = "";
var VarJsTextoAlertProducto = "";

var EProducto = true;

$('#lbMostrarProducto').click(function (e) {
    e.preventDefault();
    FnJsAjaxRProducto();
    FnJSFillDdlProductoFamilia();
    FnJSFillDdlProductoCategoria();
    FnJSFillDdlProductoSubCategoria();
});

function FnJsAjaxRProducto() {
    $.ajax({
        type: "POST",
        url: "/modulo10/VstProductos.aspx/FnRProductoV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            AddrowProducto(data.d);
        }
    }
    );
}

function AddrowProducto(data) {
    $('#tblProducto').DataTable().clear().destroy();
    tablaProducto = $("#tblProducto").DataTable({
        "retrieve": true,
        dom: 'Bfrtip',
        "order": [1, 'asc'],
        "columnDefs": [
            { "targets": 11, "searchable": false },
            { "orderable": false, "targets": 11 }
        ],
        "buttons": [
            {
                extend: 'colvis',
                collectionLayout: 'fixed',
                attr: {
                    id: 'colProducto'
                },
                text: '<i class="fas fa-columns fa-2x"></i>',
                className: 'btn btn-info',
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
                    columns: [':not(:eq(11)):visible']
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
                    columns: [':not(:eq(11)):visible']
                },
                titleAttr: 'PDF',
                filename: 'Producto' + "_" + FnJsDate() + "_" + FnJsHour(),
                pageSize: 'LETTER',
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
                                    text: 'Producto',
                                    fontSize: 18,
                                    margin: [10, 0]
                                },
                                {
                                    alignment: 'right',
                                    fontSize: 14,
                                    text: 'Reporte Producto'
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
                filename: 'Producto' + "_" + FnJsDate() + "_" + FnJsHour(),
                text: '<i class="far fa-file-excel fa-2x"></i>',
                className: 'btn btn-success d-none d-lg-block',
                exportOptions: {
                    columns: [':not(:eq(11)):visible']
                },
                titleAttr: 'Excel',
                init: function (api, node, config) {
                    $(node).removeClass('dt-button')
                }
            }
        ],
        "language": FnJsEspTbl()
    });
    tablaProducto.buttons().container().addClass('form-inline');

    for (var contProducto = 0; contProducto < data.length; contProducto++) {
        tablaProducto.row.add([
            data[contProducto].IdProducto,
            data[contProducto].Nombre,
            data[contProducto].Descripcion,
            data[contProducto].Barra,
            data[contProducto].UnidadGranel == 1 ? 'Unidad' : 'Granel',
            data[contProducto].GrabaIva == 1 ? 'Sí' : 'No',
            data[contProducto].AlertaMinimo,
            data[contProducto].ObjSubCategoria.ObjCategoria.ObjFamilia.Familia,
            data[contProducto].ObjSubCategoria.ObjCategoria.Categoria,
            data[contProducto].ObjSubCategoria.SubCategoria,
            data[contProducto].ObjGarantia.Garantia,
            '<button value="editar" href="#modalNProducto" data-toggle="modal" title="editar" class="btn btn-warning  btn-editProducto"><i class="fas fa-pencil-alt"></i> </button>' +
            '<button value="eliminar" href="#modalNProducto" data-toggle="modal" title="eliminar" class="btn btn-danger btn-deleteProducto"><i class="fa fa-trash" ></i> </button>'
        ]
        ).draw(false);
    }
}

$('#lbNProducto').click(function (e) {
    e.preventDefault();
    FnJsCProducto();
    EProducto = true;

    FnJsBlockProducto();
    FnJSFillDdlProductoFamilia();
    FnJSFillDdlProductoGarantia();
    CRUDProducto = "C";

    VarJsProductoId = 0;
    VarJsProducto = "";
    VarJsDescripcion = "";
    VarJsBarra = "";
    VarJsUG = "";
    VarJsIVA = "";
    VarJsMinimo = "";
    VarJsIdFamilia = 0;
    VarJsIdCategoria = 0;
    VarJsIdSubCategoria = 0;
    VarJsIdGarantia = 0;
});

$(document).on('click', '.btn-editProducto', function (e) {
    e.preventDefault();
    FnJsUProducto();
    var dataProducto = tablaProducto.row($(this).parents("tr")).data();
    VarJsProductoId = dataProducto[0];
    $('#txtNuevoNombre').val(dataProducto[1]);
    VarJsProducto = dataProducto[1];
    $('#txtNuevoDescripcion').val(dataProducto[2]);
    VarJsDescripcion = dataProducto[2];
    $('#txtNuevoBarra').val(dataProducto[3]);
    VarJsBarra = dataProducto[3];
    VarJsUG = dataProducto[4] == 'Sí' ? '1' : '0';
    FnFillOptBUG();
    VarJsIVA = dataProducto[5] == 'Unidad' ? '1' : '0';
    FnFillOptBIVA();
    $('#txtNuevoMinimo').val(dataProducto[6]);
    VarJsMinimo = dataProducto[6];
    VAlDDLProductoFamilia = (dataProducto[7]);
    FnJSFillDdlProductoFamilia();
    VarJsIdFamilia = $('#ddlCProductoFamilia').val();
    VAlDDLProductoCategoria = (dataProducto[8]);
    FnJSFillDdlProductoCategoria();
    VarJsIdCategoria = $('#ddlCProductoCategoria').val();  
    VAlDDLProductoSubCategoria = (dataProducto[9]);
    FnJSFillDdlProductoSubCategoria();
    VarJsIdSubCategoria = $('#ddlCProductoSubCategoria').val();      
    VAlDDLProductoGarantia = (dataProducto[10]);
    FnJSFillDdlProductoGarantia();
    VarJsIdSubCategoria = $('#ddlCProductoGarantia').val();   
    CRUDProducto = "U";
});

$(document).on('click', '.btn-deleteProducto', function (e) {
    e.preventDefault();
    FnJsDProducto();
    EProducto = false;

    FnJsBlockProducto();
    var dataProducto = tablaProducto.row($(this).parents("tr")).data();
    VarJsProductoId = dataProducto[0];
    $('#txtNuevoNombre').val(dataProducto[1]);
    VarJsProducto = dataProducto[1];
    $('#txtNuevoDescripcion').val(dataProducto[2]);
    VarJsDescripcion = dataProducto[2];
    $('#txtNuevoBarra').val(dataProducto[3]);
    VarJsBarra = dataProducto[3];
    VarJsUG = dataProducto[4] == 'Sí' ? '1' : '0';
    FnFillOptBUG();
    VarJsIVA = dataProducto[5] == 'Unidad' ? '1' : '0';
    FnFillOptBIVA();
    $('#txtNuevoMinimo').val(dataProducto[6]);
    VarJsMinimo = dataProducto[6];
    VAlDDLProductoFamilia = (dataProducto[7]);
    FnJSFillDdlProductoFamilia(); 
    VAlDDLProductoCategoria = (dataProducto[8]);
    FnJSFillDdlProductoCategoria();  
    VAlDDLProductoSubCategoria = (dataProducto[9]);
    FnJSFillDdlProductoSubCategoria();  
    VAlDDLProductoGarantia = (dataProducto[10]);
    FnJSFillDdlProductoGarantia();     

    CRUDProducto = "D";
});
function FnFillOptBUG() {
    if (VarJsUG == '1') {
        $("#RbtnUnidad").prop('checked', true);
    }
    else {

        $("#RbtnGranel").prop('checked', true);
    }
}
function FnFillOptBIVA() {
    if (VarJsIVA == '1') {
        $("#IVA").prop('checked', true);
    }
    else {

        $("#NIVA").prop('checked', true);
    }
}
function FnJsCProducto() {
    $('#lblexistenuevoProducto').text("");

    $("#BoxProd1").removeAttr("class");
    $("#BoxProd1").attr('class', 'box box-success');

    $("#BoxProd2").removeAttr("class");
    $("#BoxProd2").attr('class', 'box box-success');

    $("#BoxProd3").removeAttr("class");
    $("#BoxProd3").attr('class', 'box box-success');

    $("#BoxProd4").removeAttr("class");
    $("#BoxProd4").attr('class', 'box box-success');

    $("#btnNueProducto i").removeAttr("class");
    $("#btnNueProducto i").attr("class", "fa fa-save fa-2x");

    $("#ddlCProductoFamilia").removeAttr("class");
    $("#ddlCProductoFamilia").attr("class", "form-control border-success");
    $("#ddlCProductoCategoria").removeAttr("class");
    $("#ddlCProductoCategoria").attr("class", "form-control border-success");
    $("#ddlCProductoSubCategoria").removeAttr("class");
    $("#ddlCProductoSubCategoria").attr("class", "form-control border-success");
    $("#ddlCProductoGarantia").removeAttr("class");
    $("#ddlCProductoGarantia").attr("class", "form-control border-success");
    
    $("#txtNuevoProducto").attr('disabled', false);
    $('#ddlCProductoFamilia').attr('disabled', false);
    $('#ddlCProductoCategoria').attr('disabled', true);
    $('#ddlCProductoSubCategoria').attr('disabled', true);
    $('#ddlCProductoGarantia').attr('disabled', false);

    $('#' + ModCProducto[0].id + ' :text').val("");

}
function FnJsUProducto() {
    $('#lblexistenuevoProducto').text("");

    $("#DivModBorProducto").removeAttr("class");
    $("#DivModBorProducto").attr('class', 'modal-content border-warning');

    $("#DivModHeaProducto").removeAttr("class");
    $("#DivModHeaProducto").attr('class', 'modal-header bg-warning');

    $('#H4ModTitProducto').text('Editar Producto');

    $("#btnNueProducto").removeAttr("class");
    $("#btnNueProducto").attr('class', 'btn btn-warning pull-right');
    $("#btnNueProducto i").removeAttr("class");
    $("#btnNueProducto i").attr("class", "fa fa-save fa-2x");

    $("#ddlCProductoFamilia").removeAttr("class");
    $("#ddlCProductoFamilia").attr("class", "form-control border-warning");

    $("#txtNuevoProducto").attr('disabled', false);
    $('#ddlCProductoFamilia').attr('disabled', false);

    $('#' + ModCProducto[0].id + ' :text').val("");
}
function FnJsDProducto() {
    $('#lblexistenuevoProducto').text("");

    $("#DivModBorProducto").removeAttr("class");
    $("#DivModBorProducto").attr('class', 'modal-content border-danger');

    $("#DivModHeaProducto").removeAttr("class");
    $("#DivModHeaProducto").attr('class', 'modal-header bg-danger');

    $('#H4ModTitProducto').text('Eliminar Producto');

    $("#btnNueProducto").removeAttr("class");
    $("#btnNueProducto").attr('class', 'btn btn-danger pull-right');
    $("#btnNueProducto i").removeAttr("class");
    $("#btnNueProducto i").attr("class", "fa fa-trash fa-2x");

    $("#ddlCProductoFamilia").removeAttr("class");
    $("#ddlCProductoFamilia").attr("class", "form-control border-danger");

    $("#txtNuevoProducto").attr('disabled', true);
    $('#ddlCProductoFamilia').attr('disabled', true);

    $('#' + ModCProducto[0].id + ' :text').val("");
}

function FnJsBlockProducto() {
    if (EProducto == true) {
        $("#btnNueProducto").fadeOut("fast");
        $("#btnNueProducto").attr('disabled', true);
    }
    else if (EProducto == false) {
        $("#btnNueProducto").fadeIn("slow");
        $("#btnNueProducto").attr('disabled', false);
    }
}

$('#btnNueProducto').click(function (e) {
    e.preventDefault();
    if (formProducto.checkValidity()) {
        switch (CRUDProducto) {
            case "C":
                FnJsAjaxCProducto();
                break;
            case "U":
                FnJsAjaxUProducto();
                break;
            case "D":
                FnJsAjaxDProducto();
                break;
            default:
                console.log("Error en cud Producto");
        }
    }
});

function FnJsAjaxCProducto() {
    $.ajax({
        url: "/modulo10/VstProductos.aspx/FnCProductoV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            Producto: VarJsProducto,
            IdFamilia: VarJsIdFamilia
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Producto Agregado");
            }
            else {
                CRUDProducto = "error"
                console.log("No se pudo agregar Producto");
            }
            FnAlertaProducto();
        }
    });
}
function FnJsAjaxUProducto() {
    $.ajax({
        url: "/modulo10/VstProductos.aspx/FnUProductoV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdProducto: VarJsProductoId,
            Producto: VarJsProducto,
            IdFamilia: VarJsIdFamilia

        }), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                console.log("Producto Actualizado");
            }
            else {
                CRUDProducto = "error"
                console.log("no se pudo actualizar");
            }
            FnAlertaProducto();
        }
    });
}
function FnJsAjaxDProducto() {
    $.ajax({
        url: "/modulo10/VstProductos.aspx/FnDProductoV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdProducto: VarJsProductoId
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {

                console.log("Producto Eliminado");
            }
            else {

                CRUDProducto = "error"
                console.log("No se pudo Eliminar Producto");
            }
            FnAlertaProducto();

        }
    });
}
function FnJsAjaxEProducto() {
    $.ajax({
        url: "/modulo10/VstProductos.aspx/FnEProductoV",
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({
            IdProducto: VarJsProductoId,
            Producto: VarJsProducto,
            IdFamilia: VarJsIdFamilia
        }),
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (data.d) {
                EProducto = true;
                $('#lblexistenuevoProducto').text("Existe Producto");
                FnJsBlockProducto();

            }
            else {
                EProducto = false;
                $('#lblexistenuevoProducto').text("");
                FnJsBlockProducto();
            }
        }
    });
}

function VerificarExisteProducto() {
    if ($('#txtNuevoNombre').val().length >= 2 ||
        ($('#txtNuevoNombre').val().length >= 2 && $('#txtNuevoBarra').val().length >= 3) &&
    $('#ddlCProductoFamilia').val() > 0 &&
    $('#ddlCProductoCategoria').val() > 0 &&
    $('#ddlCProductoSubCategoria').val() > 0 &&
    $('#ddlCProductoGarantia').val() > 0) {
        return true;
    }
    else {
        return false;
    }
}

$('#txtNuevoNombre').keyup(function (e) {
    VarJsProducto = $(this).val();
    if (VerificarExisteProducto()) {
        FnJsAjaxEProducto();
    }
});
$('#txtNuevoDescripcion').keyup(function (e) {
    VarJsDescripcion = $(this).val();  
});

$('#txtNuevoBarra').keyup(function (e) {
    VarJsBarra = $(this).val();
    if (VerificarExisteProducto()) {
        FnJsAjaxEProducto();
    }
});

$("#RbtnUnidad").change(function () {
    if ($(this).is(":checked")) {
        VarJsUG = '1';
    }
});

$("#RbtnGranel").change(function () {
    if ($(this).is(":checked")) {
        VarJsUG = '0';
    }
});

$("#IVA").change(function () {
    if ($(this).is(":checked")) {
        VarJsIVA = '1';
    }
});

$("#NIVA").change(function () {
    if ($(this).is(":checked")) {
        VarJsIVA = '0';
    }
});

$('#txtNuevoMinimo').keyup(function (e) {
    VarJsMinimo = $(this).val();
});

$('#ddlCProductoFamilia').change(function (e) {
    VarJsIdFamilia = $('#ddlCProductoFamilia').val(); 
    if (VarJsIdFamilia!="0") {
        FnJSFillDdlProductoCategoria();
        $('#ddlCProductoCategoria').attr('disabled', false);
        $('#ddlCProductoSubCategoria').attr('disabled', true);
    }
});

$('#ddlCProductoCategoria').change(function (e) {
    VarJsIdCategoria = $('#ddlCProductoCategoria').val();
    if (VarJsIdCategoria != "0") {
        FnJSFillDdlProductoSubCategoria();
        $('#ddlCProductoSubCategoria').attr('disabled', false);
    }
});

$('#ddlCProductoSubCategoria').change(function (e) {
    VarJsIdSubCategoria = $('#ddlCProductoSubCategoria').val();
});

$('#ddlCProductoGarantia').change(function (e) {
    VarJsIdGarantia = $('#ddlCProductoGarantia').val();
});
function FnJSFillDdlProductoFamilia() {
    $('#ddlCProductoFamilia').empty();
    $.ajax({
        type: "POST",
        url: "/modulo10/VstFamilia.aspx/FnRFamiliaV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLProductoFamilia == "null") {
                $('#ddlCProductoFamilia').append($("<option> </option>").val("0").html("Seleccionar Familia"));
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLProductoFamilia == value.Familia) {
                        $('#ddlCProductoFamilia').append($("<option> </option>").val(value.IdFamilia).html(value.Familia));
                        VarJsIdFamilia = value.IdFamilia;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCProductoFamilia').append($("<option> </option>").val(value.IdFamilia).html(value.Familia));
            });
            VAlDDLProductoFamilia = "null";
        }
    });
}

function FnJSFillDdlProductoCategoria() {
    $('#ddlCProductoCategoria').empty();
    $.ajax({
        type: "POST",
        url: "/modulo10/VstFamilia.aspx/FnRRCategoriaV",
        data: JSON.stringify({
            IdFamilia: VarJsIdFamilia            
        }),
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLProductoCategoria == "null") {
                $('#ddlCProductoCategoria').append($("<option> </option>").val("0").html("Seleccionar Categoría"));
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLProductoCategoria == value.Categoria) {
                        $('#ddlCProductoCategoria').append($("<option> </option>").val(value.IdCategoria).html(value.Categoria));
                        VarJsIdCategoria = value.IdCategoria;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCProductoCategoria').append($("<option> </option>").val(value.IdCategoria).html(value.Categoria));
            });
            VAlDDLProductoCategoria = "null";
        }
    });
}

function FnJSFillDdlProductoSubCategoria() {
    $('#ddlCProductoSubCategoria').empty();
    $.ajax({
        type: "POST",
        url: "/modulo10/VstFamilia.aspx/FnRRSubCategoriaV",
        data: JSON.stringify({
            IdCategoria: VarJsIdCategoria
        }),
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLProductoSubCategoria == "null") {
                $('#ddlCProductoSubCategoria').append($("<option> </option>").val("0").html("Seleccionar SubCategoría"));
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLProductoSubCategoria == value.SubCategoria) {
                        $('#ddlCProductoSubCategoria').append($("<option> </option>").val(value.IdSubCategoria).html(value.SubCategoria));
                        VarJsIdCategoria = value.IdSubCategoria;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCProductoSubCategoria').append($("<option> </option>").val(value.IdSubCategoria).html(value.SubCategoria));
            });
            VAlDDLProductoSubCategoria = "null";
        }
    });
}

function FnJSFillDdlProductoGarantia() {
    $('#ddlCProductoGarantia').empty();
    $.ajax({
        type: "POST",
        url: "/modulo10/VstProductos.aspx/FnRGarantiaV",
        data: {},
        contentType: 'application/json; charser=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            if (VAlDDLProductoGarantia == "null") {
                $('#ddlCProductoGarantia').append($("<option> </option>").val("0").html("Seleccionar Garantía"));
            }
            else {
                $.each(data.d, function (data, value) {
                    if (VAlDDLProductoGarantia == value.Garantia) {
                        $('#ddlCProductoGarantia').append($("<option> </option>").val(value.IdGarantia).html(value.Garantia));
                        VarJsIdCategoria = value.IdGarantia;
                    }
                });
            }
            $.each(data.d, function (data, value) {
                $('#ddlCProductoGarantia').append($("<option> </option>").val(value.IdGarantia).html(value.Garantia));
            });
            VAlDDLProductoGarantia = "null";
        }
    });
}

function FnAlertaProducto() {

    switch (CRUDProducto) {
        case "C":
            VarJsColorAlertProducto = "bg-success";
            VarJsTextoAlertProducto = "Creado";
            break;
        case "U":
            VarJsColorAlertProducto = "bg-warning";
            VarJsTextoAlertProducto = "Actualizado";
            break;
        case "D":
            VarJsColorAlertProducto = "bg-danger";
            VarJsTextoAlertProducto = "Eliminado";
            break;
        case "Error":
            VarJsColorAlertProducto = "bg-secondary";
            VarJsTextoAlertProducto = "No se pudo realizar la operación";
            break;
        default:
            console.log("Error CUD Producto Alert");
    }

    $('.bd-example-modal-sm .modal-content').addClass(VarJsColorAlertProducto);
    $('.bd-example-modal-sm h5').text(VarJsTextoAlertProducto);
    $('.bd-example-modal-sm').modal('show');
    setTimeout(function () {
        $('.bd-example-modal-sm').modal('hide');
        $('.bd-example-modal-sm .modal-content').removeClass(VarJsColorAlertProducto);
    }, 1500);
    if ($("#secciontblProducto.show").length > 0) {
        FnJsAjaxRProducto();
    }
}