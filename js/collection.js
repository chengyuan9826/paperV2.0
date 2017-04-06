$(function() {
    slide($('.tab-ul'));
    select($('.tab-item').eq(0));
    select($('.tab-item').eq(1));
    setImageHeight(0.6);
    $('#scroll-1,#scroll-2').height($(window).height());
    scroll1= new iScroll('scroll-1');
    scroll2= new iScroll('scroll-2');
    //学校和试卷切换；
    $('.coll-tap').on('touchend', function (event) {//点击切换
        $(this).addClass('active').siblings().removeClass('active');
        var id=$(this).index();
        var wh = $(window).width();
        $('.tab-ul').css('left',-id*wh+'px');
        event.stopPropagation();
        event.preventDefault();
    });
});
/*设置图片的高度*/
function setImageHeight(val) {
    var img = $('.collection .list').find('img');
    var imgWidth = img.width();
    img.height(parseInt(imgWidth * val));
}
function slide(slider){
    var len = slider.children().length;
    var wh = $(window).width();
    slider.width(len * wh);
    slider.children().width(wh);
    slider.children().on('swipeRight', function () {//滑动切换
        var id = $(this).index();
        if (id >= 1) {
            $('.coll-tap').removeClass('active').eq(id - 1).addClass('active');
            slider.css('left', -(id - 1) * $(window).width() + 'px');
        }
    }).on('swipeLeft', function () {
        var id = $(this).index();
        if (id < len - 1) {
            $('.coll-tap').removeClass('active').eq(id + 1).addClass('active');
            slider.css('left', -(id + 1) * $(window).width());
        }
    });
}
function select(list){
    list.find('.coll-bottom').show();
    /*list.siblings().find('.coll-bottom').hide();*/

    //点击选择按钮
    list.find('.coll-select').on('touchend',function(event){
        $(this).hide();
        list.find('.select-item').show();
        list.find('.coll-btn').css('visibility','visible');
        event.stopPropagation();
        event.preventDefault();
    });

    //点击列表项的右/左上角选择按钮；
    list.on('touchend','.select-item',function(event){
        event.stopPropagation();
        if(!$(this).hasClass('active')){
            $(this).addClass('active');
            list.find('.delete').addClass('active');
            if(list.find('.select-item.active').length==list.find('.select-item').length){
                list.find('.select-all').addClass('cancel-all').text('取消全选');
            }
        }
        else{
            if(list.find('.select-item.active').length==1){
                list.find('.delete').removeClass('active');
            }
            list.find('.select-all').removeClass('cancel-all').text('全选');
            $(this).removeClass('active');
        }
        event.preventDefault();
    });

    //点击全选按钮
    list.find('.select-all').on('touchend',function(){
        if(!$(this).hasClass('cancel-all')){
            $(this).addClass('cancel-all');
            list.find('.select-item').addClass('active');
            $(this).text('取消全选');
            list.find('.delete').addClass('active');
        }
        else{
            $(this).removeClass('cancel-all');
            $(this).text('全选');
            list.find('.select-item').removeClass('active');
            list.find('.delete').removeClass('active');
        }
    });

    //点击取消按钮
    list.find('.cancel').on('touchend',function(){
        list.find('.coll-select').show();
        list.find('.select-item').removeClass('active').hide();
        list.find('.select-all').text('全选').removeClass('cancel-all');
        list.find('.coll-btn').css('visibility', 'hidden');
        event.stopPropagation();
        event.preventDefault();
    });

    //点击删除按钮
    list.find('.delete').on('touchend',function(event){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            layer.open({
                content:"确定删除？",
                btn:["确定","取消"],
                yes:function(index){
                    list.find('.select-item.active').parents('li').remove();
                    layer.close(index);
                }
            });
        }
        event.stopPropagation();
        event.preventDefault();
    });
}
/**
 * Created by Administrator on 2016/10/24.
 */
