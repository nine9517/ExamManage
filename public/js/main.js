function hide(obj) {
    $('.side-menu').css("transition","all .2s");
    if($(obj).find('.icon-hide').attr('uk-icon')=="triangle-left"){
        $.get( "/config/ui/yes", function( data ) {
            sideMenuClose()
          });
        
    }else{
        $.get( "/config/ui/no", function( data ) {
            sideMenuOpen()
          });
    }
    
}

function sideMenuClose(){
    $('.side-menu>.logo').css('display','none');
    $('.side-menu>.logo-hide').css('display','block');
    $('.side-menu>.menu>ul').addClass('text-center');
    $('.side-menu>.menu').removeClass('padding-top-15');
    
    $('.side-menu>.menu').each(function(index){
        $(this).find('.text').css('display','none');
    });
    $('.side-menu').css('width','55px');
    $('.menu>ul>li>a').find('.icon-hide').attr('uk-icon','triangle-right');                          
}

function sideMenuOpen(){
    $('.side-menu').css('width','250px');
    $('.side-menu>.menu').addClass('padding-top-15');
        $('.side-menu>.logo').css('display','block');
        $('.side-menu>.logo-hide').css('display','none');
        $('.side-menu>.menu>ul').removeClass('text-center');

        $('.side-menu>.menu').each(function(index){
            $(this).find('.text').css('display','inline-block');
        });

        $('.menu>ul>li>a').find('.icon-hide').attr('uk-icon','triangle-left');
}