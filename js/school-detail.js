$(function(){
   /*收藏学校*/
    $('.collection ').on('click', function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            layer.open({
                content: '试卷收藏成功',
                skin: 'msg',
                shade: false,
                style: 'background-color:rgba(0,0,0,0.7); color:#fff;border-radius:8px;',
                time: 2
            });
        }
        else {
            layer.open({
                content: '取消收藏试卷',
                skin: 'msg',
                shade: false,
                style: 'background-color:rgba(0,0,0,0.7); color:#fff;border-radius:8px;',
                time: 2
            });
            $(this).removeClass('active');
        }
    });
    downList($('.slt-tit'), $('.overlay'));
    showSelect($('.slt-area-list'), $('.overlay'));
});

/*下拉菜单*/
function downList(btn, shadow) {
    btn.on('click', function () {
        if (!$(this).hasClass('active')) {
            btn.removeClass('active').next('.down-list').hide();
            $(this).addClass('active').next('.down-list').show();
            var ht=$(this).next().children().height();
            $(this).next().height(ht);
            var scroll1=new iScroll('subject');
            var scroll2=new iScroll('grade');
            shadow.show();
        }
        else {
            $(this).removeClass('active').next('.down-list').hide();
            shadow.hide();
        }
    });
    shadow.on('touchend', function (event) {
        btn.removeClass('active').next('.down-list').hide();
        $(this).hide();
        event.preventDefault();
    })
}
/*显示已选中的信息*/
function showSelect(list,shadow) {
    list.find('li').on('tap', function () {
        var txt = $(this).text();
        $(this).siblings('li').removeClass('active');
        $(this).addClass('active').parents('.down-list').prev().removeClass('active').find('.name').text(txt);
        list.parent().hide();
        shadow.hide();
        return false;
    });
}

