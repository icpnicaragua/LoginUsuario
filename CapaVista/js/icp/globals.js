$(function () {
    $('[data-toggle="popover"]').popover()
});
$('.popinfo1').attr('data-content', "Letras y números, uno y solo un espacio entre palabras, sin espacios al final o inicio. Mínimo 3, máximo 30 caracteres");
$('.popinfo2').attr('data-content', "Letras y números, sin espacios entre palabras. Mínimo 3, máximo 10 caracteres");


/* variable de fx*/
var ModFx = [
        'fadeIn',
        'flipXIn',
        'flipYIn',
        'flipBounceXIn',
        'flipBounceYIn',
        'swoopIn',
        'whirlIn',
        'shrinkIn',
        'expandIn',
        'bounceIn',
        'bounceUpIn',
        'bounceDownIn',
        'bounceLeftIn',
        'bounceRightIn',
        'slideUpIn',
        'slideDownIn',
        'slideLeftIn',
        'slideRightIn',
        'slideUpBigIn',
        'slideDownBigIn',
        'slideLeftBigIn',
        'slideRightBigIn',
        'perspectiveUpIn',
        'perspectiveDownIn',
        'perspectiveLeftIn',
        'perspectiveRightIn',
        'tada',
        'flash',
        'pulse',
        'swing',
        'bounce']
// add the animation to the modal
$(".modal").each(function (index) {
    $(this).on('show.bs.modal', function (e) {
        var FxIndex = Math.floor(Math.random() * ModFx.length);
        var open = ModFx[FxIndex];
        //var open = $(this).attr('data-easein');
        if (open == 'shake') {
            $('.modal-dialog').velocity('callout.' + open);
        } else if (open == 'pulse') {
            $('.modal-dialog').velocity('callout.' + open);
        } else if (open == 'tada') {
            $('.modal-dialog').velocity('callout.' + open);
        } else if (open == 'flash') {
            $('.modal-dialog').velocity('callout.' + open);
        } else if (open == 'bounce') {
            $('.modal-dialog').velocity('callout.' + open);
        } else if (open == 'swing') {
            $('.modal-dialog').velocity('callout.' + open);
        } else {
            $('.modal-dialog').velocity('transition.' + open);
        }

    });
});



