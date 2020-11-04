$(function() {

    $(document).keyup(function(event) {
        if (event.keyCode == 13) {
            if (document.activeElement.id == "search-input") {
                $("#search-form").submit();
            }
        }
    });

    var docW = $(document).width();
    var docH = $(document).height();
    var winW = $(window).width();
    var winH = $(window).height();

    $('.animated').smanimate();

    //页脚link
    var linkswiper = new Swiper('#linkbox', {
        autoplay: true,
        slidesPerView: 'auto',
        spaceBetween: 70,
        width: undefined
    });

    //导航特效
    $(".nav li").hover(function() {
        $(this).find(".subnav").stop().slideDown("fast");
    }, function() {
        $(this).find(".subnav").stop().slideUp("fast");
        if (!$(this).hasClass("curr")) { $(this).removeClass("hover"); }
    });

    $("#menuopenbtn").on("click", function() {
        $(".navbar").show();
    });

    $("#menuclosebtn").on("click", function() {
        $(".navbar").hide();
    });


    $("#top-weixinbtn").hover(function() {
        $(".top-weixinbox").show();
    }, function() {
        $(".top-weixinbox").hide();
    })

    $("#top-searchbtn").on("click", function() {
        $(this).addClass("nav-icon-curr");
        $(".searchbox").show();
    })

    $("#top-searchclosebtn").on("click", function() {
        $(".searchbox").hide();
    })

    $('body').bind('click', function(event) {

        // IE支持 event.srcElement ， FF支持 event.target
        var evt = event.srcElement ? event.srcElement : event.target;

        // 如果是元素本身，则返回
        if (evt.id == 'search-input' || evt.id == 'searchbox') {
            return;
        } else {
            if (evt.id == 'top-searchbtn') {
                return;
            } else {
                if ($('.searchbox').css('display') == 'block') {
                    $(".searchbox").hide();
                    $("#top-searchbtn").removeClass("nav-icon-curr");
                }
            }
        }

    });


    //二级导航
    $(".secondnav li").hover(function() {
        $(this).addClass("hover");
    }, function() {
        $(this).removeClass("hover");
    });

    var bannerHeight = docW * 800 / 1200;
    var footCultureHeight = docW * 280 / 1200;

    if (docW < 1200) {
        //$(".banner").css("height",bannerHeight);
        $(".footanimate").css("height", footCultureHeight);
    }

    //导航自适应
    if (docW < 769) {

        $(".nav").css("height", winH - 50);

        $(".nav>li:not(:first-child)>a").attr("href", "javascript:;");

        $(".secondnav .sub").each(function(index, element) {
            var suba = $(this).find("a");
            if (suba.length == 1) { suba.css("width", "100%") }
            if (suba.length == 2) { suba.css("width", "50%") }
            if (suba.length > 2) { suba.css("width", "33.33%") }
        });

    }

    //窗体大小重置
    $(window).resize(function() {

        var docW = $(document).width();
        var bannerHeight = docW * 550 / 1920;
        var footCultureHeight = docW * 280 / 1200;

        if (docW < 1200) {
            $(".footanimate").css("height", footCultureHeight);
        }

    });

    //动画集合
    var aniamlDid = {};

    //nav初始高度
    var navTop = $(".navbar").offset().top;

    //窗口滚动
    $(window).scroll(function() {

        var wScroll = $(window).scrollTop();
        var winH = $(window).outerHeight();

        //导航定位
        if (wScroll > navTop) {
            $(".navbar").addClass("navfixed");
        } else {
            $(".navbar").removeClass("navfixed");
        }

        //动画效果
        $(".wxanimal").each(function(index, element) {
            var json = $(this).attr("wxanimal");
            json = $.parseJSON(json);
            id = $(this).attr("id");
            if (wScroll > $(this).offset().top - winH && aniamlDid.hasOwnProperty(id) == false) {
                wxAnimateToAction($(this), json);
                aniamlDid[id] = "yes";
            }
        });

    });

});


//控制自动滚动
var ua = navigator.userAgent.toLocaleLowerCase();
var pf = navigator.platform.toLocaleLowerCase();
var isAndroid = (/android/i).test(ua) || ((/iPhone|iPod|iPad/i).test(ua) && (/linux/i).test(pf)) || (/ucweb.*linux/i.test(ua));
var isIOS = (/iPhone|iPod|iPad/i).test(ua) && !isAndroid;
var isWinPhone = (/Windows Phone|ZuneWP7/i).test(ua);

var mobileType = {
    pc: !isAndroid && !isIOS && !isWinPhone,
    ios: isIOS,
    android: isAndroid,
    winPhone: isWinPhone
};

if (window.location.hash != "#0") {
    if (mobileType.pc) {
        //自动滑动到详细内容部分
        if ($(".secondnavbar").length > 0) {
            var navH = $(".nav").outerHeight();
            $('html,body').delay(500).animate({ scrollTop: $(".secondnavbar").offset().top - navH }, 1000, "easeOutCubic");
        }
        if ($(".sec-nav").length > 0) {
            var navH = $(".nav").outerHeight();
            $('html,body').delay(500).animate({ scrollTop: $(".sec-nav").offset().top - navH }, 1000, "easeOutCubic");
        }
    }
}