$(".modal-drag").draggable().resizable();
$(".modal-drag [data-dismiss='modal-drag']").click(function () {
    $(this).parent().parent().parent().removeClass("open");
});
$(document).mouseup(function (e) {
    var container = $(".modal-drag.open");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.removeClass("open");
    }
});