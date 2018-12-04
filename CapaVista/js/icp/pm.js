

$(document).ready(function () {
    modulosobj();    
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

function blockmodulosobj( obj) {
    var mod;
    var vis;
    var ele;
    for (var cont = 0; cont < obj.length ; cont ++ ){     
        mod = (obj[cont].ObjM.Idaspmodulo);
        vis = obj[cont].ObjV.Idaspvista;
        ele = obj[cont].ObjE.Idaspelemento;
        console.log(mod + vis + ele + " desde pm");
        if (mod != "tm") {
            if (vis == "tv") {
                document.getElementById(mod).style.display = "none";
            }
            else if (ele == "te") {
                document.getElementById(vis).style.display = "none";
            }
        }   
    }
  
}


