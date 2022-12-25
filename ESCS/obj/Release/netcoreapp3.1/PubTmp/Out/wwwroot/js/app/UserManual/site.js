function resizePageContent() {
    var head_height = $('#navbarSupportedContent').height();
    $('#ManualPage').height('calc( 100vh - ' + head_height + 'px )');

    var left_top_height = $('#ManualLT').height();
    $('#ManualLB').height('calc( 100% - ' + left_top_height + 'px )');

    var right_top_height = $('#ManualRT').height();
    $('#ManualRB').height('calc( 100% - ' + right_top_height + 'px )');
}
function clickkeyword() {
    $('a.keyword').click(function () {
        var input = $(this).data('keyword');
        var search = $('#ManualSearchInput').val();
        $('#ManualSearchInput').val(search + input + ';');
    });
}
function menuopen() {
    resizePageContent();
    $(window).resize(resizePageContent);
    //$('.manual-section-list').click(resizePageContent);
    clicksearch();

    $('.manual-link').click(function (e) {
        $('.manual-link').removeClass('bg-primary');
        $('.manual-link').removeClass('text-light');
        $(this).addClass('bg-primary');
        $(this).addClass('text-light');
        $('#ManualSectionList').removeClass('d-none');

        var ma_bai_viet = $(this).data('id-bv');
        $.ajax({
            url: '/UserManual/PageContent',
            method: 'post',
            dataType: 'html',
            data: { 'ma_bai_viet': ma_bai_viet },
            success: function (data) {
                $('#ManualPageContent').html(data);
                window.location.href = '#ManualTop';
                clickkeyword();
                clicksearch();
            },
            error: function (err) {
                console.log(err);
            }
        });
        $.ajax({
            url: '/UserManual/SectionList',
            method: 'post',
            dataType: 'html',
            data: { 'ma_bai_viet': ma_bai_viet },
            success: function (data) {
                $('#ManualSectionList').html(data);
            },
            error: function (err) {
                console.log(err);
            }
        });
        resizePageContent()
    });
}
function clicksearch() {
    $('#ManualSearchButton').click(function () {
        var input = $('#ManualSearchInput').val();
        $.ajax({
            url: '/UserManual/MenuContent',
            method: 'post',
            dataType: 'html',
            data: { 'searchinput': input },
            success: function (data) {
                $('#ManualMenuContent').html(data);
                menuopen();
            },
            error: function (err) {
                console.log(err);
            }
        });
    });
}
$(document).ready(function () {
    $('#ManualSectionList').addClass('d-none');
    menuopen();
});