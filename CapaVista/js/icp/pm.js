
var href = document.location.href;
var lastPathSegment = href.substr(href.lastIndexOf('/') + 1);
var NombreCadena = lastPathSegment.split(".");
$(document).ready(function () {
    modulosobj();   
    window.console.log(NombreCadena[0]);    
});

function modulosobj() {
    var idu = $("input[id=hfIDU]").val();
    console.log(idu);//quitar esto
    $.ajax({
        url: "../masterpage1.aspx/Modulos", // nombre de página y nombre de función
        contentType: 'application/json; charser=utf-8',
        data: JSON.stringify({ idsu: idu}), /*parametro: valor*/
        method: 'post',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + "  " + xhr.responseText, "  " + thrownError);
        },
        success: function (data) {
            blockmodulosobj(data.d);
            }
    });
}


  

function blockmodulosobj(obj) {
    var mod;
    var vis;
    var ele;
    for (var cont = 0; cont < obj.length; cont++) {
        mod = (obj[cont].ObjM.Idaspmodulo);
        vis = obj[cont].ObjV.Idaspvista;
        ele = obj[cont].ObjE.Idaspelemento;
        console.log(mod + vis + ele + " desde pm");
        //si se pueden ver módulos, que prosiga con:
        if (mod != "tm") {
            if (vis == "tv") { //si dentro del módulo, se bloquean todas las vistas, hacer desaparecer el módulo
                document.getElementById(mod).remove();
            }
            else if (ele == "te") {//si todos los elementos de la vista están bloqueados, desaparecer la vista
                document.getElementById(vis).remove();
            }
            else {
                if (document.getElementById(ele) != null) {
                    document.getElementById(ele).remove();
                }
                else if (document.getElementsByClassName(ele)) {
                    $("."+ele).remove();
                   // document.getElementsByClassName(ele).remove();//esto se está probando
                }
                else {
                    console.log("no hay id ni propiedad");
                }
               
            }
        }
    }
}

