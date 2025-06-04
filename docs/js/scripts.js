"use strict";

const $window = $(window);
const $body = $('body');
const $switchTheme = $('#switch_theme');

const headerOffset = 80;

const active = 'active';
let isClicked = false;

function darkMode() {
    $switchTheme.addClass(active);
    $body.attr('dark-theme', 'true');
}

function lightMode() {
    $switchTheme.removeClass(active);
    $body.removeAttr('dark-theme');
}

function init() {
    const SVGs = document.querySelectorAll('img.svg');
    SVGInjector(SVGs);

    const copy = document.querySelectorAll('.code-copy');
    copy.forEach(item => {
        item.addEventListener('click', function () {
            let range;
            const code = this.nextElementSibling.childNodes[0];

            if (window.getSelection) {
                if (window.getSelection().empty) { // Chrome
                    window.getSelection().empty();
                } else if (window.getSelection().removeAllRanges) { // Firefox
                    window.getSelection().removeAllRanges();
                }
            } else if (document.selection) { // IE?
                document.selection.empty();
            }

            if (document.selection) {
                range = document.body.createTextRange();
                range.moveToElementText(code);
                range.select().createTextRange();
                document.execCommand("copy");
            } else if (window.getSelection) {
                range = document.createRange();
                range.selectNode(code);
                window.getSelection().addRange(range);
                document.execCommand("copy");
            }
        });
    });

    const $hamburger = $('#hamburger > a');
    $hamburger.on('click', function () {
        $('#menu').slideToggle();
    });
    
    $switchTheme.on('click', function () {
        const $this = $(this);
        $this.hasClass(active) ? lightMode() : darkMode();
    });

    if (window.matchMedia) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            darkMode();
        }

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            event.matches ? darkMode() : lightMode();
        });
    }

    const $link = $('.navbar .navbar__link, .submenu a');
    $link.on('click', function () {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
            location.hostname === this.hostname) {
            let target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

            if (target.length) {
                const scrollValue = target.offset().top - headerOffset;

                if ($(this).hasClass('navbar__link')) {
                    $('.navbar .navbar__link').removeClass(active);
                    $('.submenu a').removeClass(active);
                    $(this).addClass(active);
                }
                
                $('html,body').animate({
                    scrollTop: scrollValue
                }, 500);

                isClicked = true;
                setTimeout(() => isClicked = false, 501);
                return false;
            }
        }
    });

    const lightbox = new PhotoSwipeLightbox({
        gallery: '#content',
        children: 'a.lightbox',
        pswpModule: PhotoSwipe
    });
    lightbox.init();

    scrollspy();
}

function scrollspy() {
    if (!isClicked) {
        const currentOffsetY = $window.scrollTop() + (headerOffset + 1);
        const $scrollspy = $('.scrollspy');

        $scrollspy.each(function () {
            const $this = $(this);
            const scrollspyOffsetY = $this.offset().top;
            const scrollspyHeight = scrollspyOffsetY + $this.height();

            if (currentOffsetY >= scrollspyOffsetY && currentOffsetY <= scrollspyHeight) {
                const id = $this.attr('id');
                const $link = $('a[href="#' + id + '"]');
                
                if ($link.hasClass('navbar__link')) {
                    $('.navbar .navbar__link').removeClass(active);                
                } else {
                    $('.submenu a').removeClass(active);
                }

                $link.addClass(active);
            }
        });
    }
}

$window.on('load', init);
$window.on('scroll', scrollspy);