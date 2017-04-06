$(function () {
    slide();
    scroll();//页面滚动
    doPaper();//做题页面事件
    wrongTopic();//wrong-topic.html事件
    resolve();//resolve.html 页面事件
    showBigPic();//单击放大显示图片
    choose();//点击单选滑动倒下一题
});
/*scroll页面滚动*/
function scroll() {
    var wrap = $('.aside_section');
    wrap.height($(window).height() - $('.aside_header').height() - $('.paper-function').height());
    $('.scroll_tit,.small-questions>.aside_section').css('height', wrap.height() / 2 + 'px');
    wrap.each(function (id, val) {
        if (!$(val).hasClass('big_que')) {
            new iScroll(val, {checkDOMChanges: true});
        }
        else {
            new iScroll($(val).find('.scroll_tit')[0], {checkDOMChanges: true});
        }
    });
}

/*滑动加载下一题*/
function slide() {
    currentAndSum(0);
    slider($('.section_list'));
    slider($('.small-questions'));
}

/*slider*/
function slider(ul) {
    var wd = $(window).width();
    ul.each(function (id, val) {
        var len = $(val).children().length;
        var parentLen = $(val).parents('ul').children().length;//大题的个数
        var parentIndex = $(val).parents('li').index();//小题所在的大题的索引
        $(val).width(len * wd);
        $(val).children().width(wd);
        $(val).children().on('swipeRight', function (e) {
            e.stopPropagation();
            e.preventDefault();
            var index = $(this).index();
            $('.section_list,.small-questions').addClass('transition');
            $('li').removeClass('current');
            if (index > 0) {
                $(this).parent().css({left: -(index - 1) * wd});
                $(this).prev().addClass('current');
                if ($(this).prev().find('.small-questions').length > 0) {
                    var smallList1 = parseInt($(this).prev().find('.small-questions').css('left'));
                    var smallIndex = Math.abs(parseInt(smallList1 / wd));
                    $(this).prev().addClass('current').find('.aside_section').eq(smallIndex).addClass('current');
                }
            }
            else {
                if ($(val).parents('li').length > 0 && parentIndex > 0) {
                    var smallPrev = $(this).parents('li').prev();
                    $(val).parents('ul').css({left: -(parentIndex - 1) * wd});
                    smallPrev.addClass('current');
                    if (smallPrev.find('.small-questions').length > 0) {
                        var getLeft = parseInt(smallPrev.find('.small-questions').css('left'));
                        var sIndex = Math.abs(parseInt(getLeft / wd));
                        smallPrev.addClass('current').find('.aside_section').eq(sIndex).addClass('current');
                    }
                }
            }
            currentAndSum();
            e.stopImmediatePropagation();

        });
        $(val).children().on('swipeLeft', function (e) {
            e.stopPropagation();
            e.preventDefault();
            var index = $(this).index();
            $('.section_list,.small-questions').addClass('transition');
            $('li').removeClass('current');
            if (index < len - 1) {
                $(this).parent().css({left: -(index + 1) * wd});
                $(this).next().addClass('current');
                if ($(this).next().find('.small-questions').length > 0) {
                    var smallList1 = parseInt($(this).next().find('.small-questions').css('left'));
                    var smallIndex = Math.abs(parseInt(smallList1 / wd));
                    $(this).next().addClass('current').find('.aside_section').eq(smallIndex).addClass('current');
                }
            }
            else {
                if ($(val).parents('li').length > 0 && parentIndex < parentLen - 1) {
                    var smallNext = $(this).parents('li').next();
                    $(val).parents('ul').css({left: -(parentIndex + 1) * wd});
                    smallNext.addClass('current');
                    if (smallNext.find('.small-questions').length > 0) {
                        var getLeft = parseInt(smallNext.find('.small-questions').css('left'));
                        var sIndex = Math.abs(parseInt(getLeft / wd));
                        smallNext.addClass('current').find('.aside_section').eq(sIndex).addClass('current');
                    }
                }
            }
            currentAndSum();
            e.stopImmediatePropagation();

        });
    });
}

//做题页面事件
function doPaper() {
    //查看解析
    $('.analysis_btn .btn').on('click', function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active').parents('.question-analytic').find('.analytic').hide();
        }
        else {
            $(this).addClass('active').parents('.question-analytic').find('.analytic').show();
        }
    });

    //collection
    $('#collection').on('tap', function () {
        if (!$(this).hasClass('paper-coled')) {
            $(this).addClass('paper-coled');
            layer.open({
                content: '试卷收藏成功',
                shade: false,
                style: 'background-color:rgba(0,0,0,0.7); color:#fff;border-radius:8px;',
                time: 2
            });
        }
        else {
            layer.open({
                content: '取消收藏试卷',
                shade: false,
                style: 'background-color:rgba(0,0,0,0.7); color:#fff;border-radius:8px;',
                time: 2
            });
            $(this).removeClass('paper-coled');
        }
    });

    //submit
    $('#submitPaper').on('tap', function () {//点击提交
        $('.dialog').show();
    });
    $('.cancle_button').on('tap', function () {//点击取消按钮
        $('.dialog').hide();
    });
    $('.dialog_bg').on('touchend', function () {//点击透明背景
        $('.dialog').hide();
    });
    //open card
    $('#answerCard').on('tap', function () {//点击答题卡
        answerCard();
        $('.card-wrap').css('bottom', '0');
        $('.shadow').show();
    });
    /*点击答题卡题号，定位到题目*/
    $('.answer-card').on('touchend', 'a', function (e) {
        e.stopPropagation();
        var id = $(this).parent('li').index();
        $(this).parent('li').addClass('active').siblings().removeClass('active');;
        clickBtnSlide(id);
        e.preventDefault();
    });

    //close card
    $('.close-card').on('touchend', function (e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).parents('.card-wrap').css('bottom', '-1000px');
        $('.shadow').hide();
    });
    $('.shadow').on('touchend', function (e) {
        e.stopPropagation();
        e.preventDefault();
        $('.card-wrap').css('bottom', '-1000px');
        $(this).hide();
    });
}

//显示答题卡的题号
function answerCard() {
    var scroll;
    return function (){
        var num = $('.question_list'), str = '';
        var cardScroll=$('.card-scroll');
        num.each(function (id, val) {
            var choice = $(val).find('.question_choose');
            var cName = '';
            choice.each(function (index, value) {
                if ($(value).hasClass('correct')) {
                    cName = 'selected';
                }
                else if ($(value).hasClass('wrong')) {
                    cName = 'wrong';
                }
                else if ($(value).hasClass('right')) {
                    cName = 'right';
                }
            });
            str += '<li><a class=' + cName + '>' + (id + 1) + '</a></li>';
            var card=$('.answer-card');
            card.html(str);
            var ht=(card.height()>$(window).height()*0.5)?($(window).height()*0.5):card.height();
            cardScroll.height(ht);
        });
       scroll||(scroll=new iScroll(cardScroll[0],{checkDOMChanges: true}));
    }();
}

/*wrong-topic.html页面事件*/
function wrongTopic() {
    var shadow = $('.shadow');
    $('#filterBtn').on('click', function () {
        $('.filter').css('bottom', '0');
        shadow.show();
        new SelectItem($('.down-list').eq(0));
        new SelectItem($('.down-list').eq(1));
    });
    shadow.on('touchend', function () {
        $('.book-mark').css('bottom', '-1000px');
        $('.filter').css('bottom', '-1000px');
        $(this).hide();
    });

    $('.filter .close-card').on('tap', function () {
        $(this).parents('.filter').css('bottom', '-1000px');
        shadow.hide();
    });

    /*显示错题进度条*/
    $('#markBtn').on('tap', function () {
        $('.book-mark').css('bottom', '0');
        dragShowItem();
        shadow.show();
    });
    $('#deleteBtn').on('tap', function () {//移除错题本题目
        layer.open({
            content: '确认删除?',
            btn: ["确认", "取消"],
            yes: function (index) {
                layer.close(index);
            }
        });
    });
}

/*拖拽显示错题*/
function dragShowItem() {
    var btn = $('.drag-btn');
    var tBox = $('.drag-txt');
    var sx = 0, mx = 0, ex = 0, left = 0, txt = 0, num = 0;
    var wd = btn.parent().width();
    var btnWd = btn.width();
    var obj = $('.question_list');
    var len = obj.length;
    var stage = (wd - btnWd) / len;
    btn.on('touchstart', function (event) {
        $('.section_list,.small-questions').removeClass('transition');
        left = parseInt($(this).css('left'));
        sx = event.touches[0].clientX;
        event.preventDefault();
    }).on('touchmove', function (event) {
        mx=event.touches[0].clientX;
        num=left+(mx-sx);
        if(num >=1 && num <= (wd - btnWd)) {
            $(this).css('left', num + 'px');
            txt = Math.ceil(num / stage);
            $('.mark-line').css('width', num + 'px');
            tBox.css('left', num + 'px').text(txt);
        }
    }).on('touchend', function (event) {
        clickBtnSlide(txt - 1);
    });
}

/*点击答题卡题号滑动题目*/
function clickBtnSlide(id) {
    var wd = $(window).width();
    var obj = $('.question_list').eq(id);
    var index = obj.parents('.aside_section').index();
    if (obj.parents('.small-questions').length > 0) {
        var fIndex = obj.parents('.small-questions ').parents('.aside_section').index();
        $('.section_list').css({left: -(fIndex) * wd});
        obj.parents('.small-questions').css({left: -(index) * wd});
    }
    else {
        $('.section_list').css({left: -(index) * wd});
    }
    $('#question_num').html(id + 1);
}

/*resolve.html页面事件*/
function resolve() {
    //submit
    $('#goResult').on('tap', function () {
        window.location.href = 'test-result.html';
    });
}

/*高亮显示下拉菜单中选中的值*/
function SelectItem(list) {
    this.name = '';
    this.list = $(list);
    this.showLight();
    this.sure($('.down-btn .sure'));
}
SelectItem.prototype.showLight = function () {
    this.list.find('li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
    });
};
SelectItem.prototype.sure = function (btn) {
    var _this = this;
    btn.on('click', function () {
        $('.filter').css('bottom', '-1000px');
        $('.shadow').hide();
    });
};

/*点击单选选项滑动到下一题*/
function choose() {
    $('.question_dan_list').find('.ui-row-flex').on('tap', function () {
        var par = $(this).parent('.question_list').parent().parent('li');
        var index = par.index();
        var len = par.parent('ul').children().length;
        var parent = par.parents('li');
        var pIndex = parent.index();
        var pLen = parent.parent('ul').children().length;
        $(this).find('.question_choose').addClass('correct').parent('.ui-row-flex').siblings().find('.question_choose').removeClass('correct');
        if (index < len - 1) {
            par.parent().css({left: -(index + 1) * $(window).width()});
            $('li').removeClass('current');
            $(this).parent().parent().parent('.aside_section').next().addClass('current').find('.aside_section').eq(0).addClass('current');
            currentAndSum();
        }
        else if (pIndex < pLen - 1) {
            parent.parent().css({left: -(pIndex + 1) * $(window).width()});
            $('li').removeClass('current');
            $(this).parents('.aside_section').next().addClass('current').find('.aside_section').eq(0).addClass('current');
            currentAndSum();
        }
    });
    $('.question_duo_list').find('.ui-row-flex').on('tap', function () {
        if (!$(this).find('.question_choose').hasClass('correct')) {
            $(this).find('.question_choose').addClass('correct');
        }
        else {
            $(this).find('.question_choose').removeClass('correct');
        }
    });
}

/*显示当前题目个数以及当前题号*/
function currentAndSum() {
    var question = $('.question_list');
    $('.question_sum').text(question.length);
    question.each(function (id, val) {
        if ($(val).parents('.aside_section').hasClass('current')) {
            $('.question_num').text(id + 1);
        }
    });
}

/*点击图片放大显示*/
function showBigPic() {
    var wd = $(window).width();
    $('.section_list').on('click', 'img', function (e) {
        e.stopPropagation();
        var src = $(this).attr('src');
        /*将获取到的图片插入到body中*/
        $('body').append($("<div class='big-pic'><div class='flow-box clearfix'><div class='bg'></div><div class='pic'><img src='" + src + "'></div></div></div>"));
        if ($('.big-pic .pic').length>0) {
            new RTP.PinchZoom($('.pic'), {zoomOutFactor: 3});
            $('.flow-box').width(wd);
        }
        $('.big-pic .bg').on('touchend', function (e) {
            e.stopPropagation();
            $('.big-pic').remove();
            e.preventDefault();
        });
        e.preventDefault();
    });
}
