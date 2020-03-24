var JsonM = {};
var JsonV = {};
var JsonE = {};

var ChildM = {};
var ChildV = {};
var ChildE = {};

var indexM = 0;
var indexV = 0;
var indexE = 0;

$('#btntreejs1').click(function (e) {//1 evento para mostrar contenido de vista xxxx
    e.preventDefault();

    // get checked nodes
    var List = { "id": [], "dataid": [], "text": [] };
     $("#treeview").hummingbird("getChecked", { list: List, onlyEndNodes: false, onlyParents: false, fromThis: false });
     console.log(List);


});

$('#borrar').click(function (e) {//1 evento para mostrar contenido de vista xxxx
    e.preventDefault();

    // get checked nodes
    var List = { "id": [], "dataid": [], "text": [] };
    $("#treeview").hummingbird("getUnchecked", { list: List, onlyEndNodes: false, onlyParents: false     });
    //console.log(List);

   // console.log('no che: ' + $('#9V').parent().siblings('ul').children("li").children("label").children("input:checkbox:not(:checked)").length);
   // console.log(' checke: ' + $('#9V').parent().siblings('ul').children("li").children("label").children("input:checkbox:checked").length);
    var ContadorIngreso = 0;
    var JsonPermisos = {};

    //.slice(0, -1);

    $.each(JsonM, function () {
        var tempM = this;
        for (var contC = 0; contC < List.id.length; contC++){
            if (List.id[contC] != 'xnode-0') {
                if (List.id[contC] == this.IdModulo + 'M') {
                    //console.log("modulo encontrado:" + this.IdModulo);
                    if ($('#' + List.id[contC]).parent().siblings('ul').children("li").children("label").children("input:checkbox:checked").length == 0) {
                          // console.log("todos sin check");
                           console.log("ingresar: " + this.IdModulo + ' 1 1');
                           return;
                    }                     
                }
            }
        }
        $.each(JsonV, function () {
            var tempV = this;
            for (contC = 0; contC < List.id.length; contC++) {
                if (List.id[contC] != 'xnode-0') {
                    if (List.id[contC] == this.Idvista + 'V' && this.ObjModulo.IdModulo == tempM.IdModulo) {
                        //console.log("encontrada vista" + this.Idvista);
                        if ($('#' + List.id[contC]).parent().siblings('ul').children("li").children("label").children("input:checkbox:checked").length == 0) {
                           // console.log("todos sin check");
                            console.log("ingresar: " + tempM.IdModulo + ' ' + this.Idvista + ' 1');
                            return;//todo bien, si no quitar este
                        }  
                    }
                }
            }
            $.each(JsonE, function () {
                for (contC = 0; contC < List.id.length; contC++) {
                    if (List.id[contC] != 'xnode-0') {
                        if (List.id[contC] == this.Id_elemento + 'E' && this.ObjVista.Idvista == tempV.Idvista && tempV.ObjModulo.IdModulo==tempM.IdModulo) {
                            //console.log("encontrado elemento" + this.Id_elemento);
                            console.log("ingresar: " + tempM.IdModulo + ' ' +tempV.Idvista + ' '+ this.Id_elemento );

                        }
                    }
                }

            });

        });
    });    
});

$('#prueba1').click(function (e) {//1 evento para mostrar contenido de vista xxxx
    e.preventDefault();
    ClearTree();
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

    FnJsAjaxRModulo();
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
                children: ChildV //childV/vista
            });
            $("#treeview").hummingbird();
        }//fin if m
        indexM++;
    });

    //traer completo el json
    ChildV = {};
    indexV = 0;
    $.each(JsonV, function () {
        ChildV[indexV] = {
            id: this.Idvista + 'V',//va sin X para eliminar el otro que sí va con X
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
                the_id: ChildV[indexV].id  ,
                data_id: ChildV[indexV].data_id ,
                end_node: false,
                children: ChildE //ChildE / elemento
            });
            $("#treeview").hummingbird('removeNode', { attr: 'id', name: ChildV[indexV].id + 'X'  }); //adios momentanea
            $("#treeview").hummingbird();
        }//fin if v
        indexV++;
    });
    $("#treeview").hummingbird('removeNode', { attr: 'id', name: 'xnode' }); //quitar ancla de módulo
    $("#treeview").hummingbird();

    $("#treeview").hummingbird("expandNode", {
      attr: "id",
      name: "xnode-0",//valor a cambiar
    expandParents: false
    });

    FNAjaxRPermisos();//check de permisos

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

$("#treeview").on("nodeChecked", function () {
    // when checked
    //console.log("check");
    // get checked nodes
    

});

$("#treeview").on("nodeUnchecked", function () {
    // when unchecked
   // console.log("no check");
});

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
           // dataM = {};
            AjaxMostrarVISTA();
        }
    }
    );  
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
    }
    );
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
    }
    );
}


function ClearTree() {
    $("#treeview").find('ul').remove();
    $("#treeview").find('li').append('<ul><li data- id="1" ><i class="fa fa-plus"></i><label><input class="" id="xnode" data-id="custom-0-1" type="checkbox" />node-0-1</label></li></ul>');
    $("#treeview").hummingbird();
}

function FNAjaxRPermisos() {
    var idu = $("input[id=hfIDU]").val();
    $.ajax({
        url: "../masterpage1.aspx/Modulos", // nombre de página y nombre de función
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({ idsu: idu }), /*parametro: valor*/
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


