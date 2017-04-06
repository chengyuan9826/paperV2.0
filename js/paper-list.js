$(function () {
    var ht = $(window).height();
    /*地区选择*/
    $('.slt-tit-area').on('tap',function(){
        if(!$(this).hasClass('active')){
            $(this).parent().siblings().find('.slt-tit').removeClass('active').siblings('.down-list').hide();
            $(this).addClass('active').next('.down-list').show();
            $('#scroll-box').height(ht*0.6);
            var scroll=new iScroll('scroll-box',{checkDOMChanges: true});
        }else{
            $(this).removeClass('active').next('.down-list').hide();
        }
    });
   $('.slt-list li').on('tap',function(){
       $(this).addClass('active').siblings().removeClass('active');
       $('#scroll-box-1').height(ht*0.6).show();
       var scroll1=new iScroll('scroll-box-1',{checkDOMChanges: true});
   });
   $('.slt-second-list li').on('click',function(event){
       var txt = $(this).text();
       $(this).addClass('active').parents('.down-list').siblings('.slt-tit').removeClass('active').find('.name').text(txt);
       $(this).siblings().removeClass('active').parents('.down-list').hide();
       $('.shadow').hide();
       event.preventDefault();
   });

    /*学部选择*/
    $('.slt-tit-level').on('tap',function(){
        if(!$(this).hasClass('active')){
            $(this).parent().siblings().find('.slt-tit').removeClass('active').siblings('.down-list').hide();
            $(this).addClass('active').next('.down-list').show();
            var he=$('.down-list-1 .slt-list').height();
            $('#scroll-box-2').height(he);
            var scroll=new iScroll('scroll-box-2',{checkDOMChanges: true});
        }
       else{
            $(this).removeClass('active').next('.down-list').hide();
        }
    });
    $('.slt-area-1 li').on('click',function(event){
        var txt=$(this).text();
        $(this).addClass('active').parents('.down-list').prev('.slt-tit-level').removeClass('active').find('.name').text(txt);
        $(this).siblings().removeClass('active').parents('.down-list').hide();
       event.preventDefault();
    });
});
/*设置图片的高度*/
function setImageHeight(val) {
    var img = $('section .list').find('img');
    var imgWidth = img.width();
    img.height(parseInt(imgWidth * val));
}
