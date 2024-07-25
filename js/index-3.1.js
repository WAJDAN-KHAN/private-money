//accordion technology
var acc = document.getElementsByClassName("technology-accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}
//accordion technology END
//tabs solutions
function openSolutions(evt, solutionName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("solutions__programs");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("solutions-tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(solutionName).style.display = "block";
    evt.currentTarget.className += " active";

}
//tabs solutions END
//accordion solutions
var acc = document.getElementsByClassName("solutions-accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}
//accordion solutions END
//tabs more
function openMore(evt, moreName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("more__block");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("more-tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(moreName).style.display = "block";
    evt.currentTarget.className += " active";

}
//tabs more END
//tabs awards
function openAwards(evt, awardName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("awards__item");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("awards-tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(awardName).style.display = "block";
    evt.currentTarget.className += " active";

}
//tabs awards END
//tabs events
function openEvents(evt, eventName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("events__item");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("events-tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(eventName).style.display = "block";
    evt.currentTarget.className += " active";

}
//tabs events END
//tabs documents & forms
function openDocumentsForms(evt, eventName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("documents-forms__item");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("documents-forms-tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(eventName).style.display = "block";
    evt.currentTarget.className += " active";
}
//tabs documents & forms END
//burger menu
const pageHeader = document.querySelector('#main-top-header');
const burgerMenuBTN = document.querySelector('#header_menu_burger');
if (burgerMenuBTN) burgerMenuBTN.addEventListener('click', burgerMenu);

function burgerMenu() {
    if (pageHeader) {
        pageHeader.classList.toggle('mobile-menu-shown');
        document.querySelector('#header_menu_burger').classList.toggle('active');
        document.querySelector('#header-menu').classList.toggle('active');
        document.querySelector('body').classList.toggle('overflow-hidden');
        if (!pageHeader.classList.contains("mobile-menu-shown") || !pageHeader.classList.contains("search-shown")) {
            document.querySelector('#search-header').classList.remove('active');
            pageHeader.classList.remove('active');
        }
        if (pageHeader.clientWidth < 640) {
            document.querySelector('#search-activation-btn').classList.toggle('hide-search');
            document.querySelector('.white-btn.header__btn').classList.toggle('hide-btn');
        }
    }
}

window.addEventListener('resize', () => {
    if (pageHeader && pageHeader.clientWidth > 1379) {
        pageHeader.classList.remove("mobile-menu-shown");
        document.querySelector('#header_menu_burger').classList.remove('active');
        document.querySelector('#header-menu').classList.remove('active');
        document.querySelector('body').classList.remove('overflow-hidden');
        document.querySelectorAll('.menu-item-has-children').forEach(item => item.classList.remove('active'));
        document.querySelectorAll('.submenu').forEach(item => item.classList.remove('active'))
    }
});

//burger menu END
//submenu with burger
$('.header__list .menu-item-has-children').on('click', toggleChildrenMenu);

function toggleChildrenMenu() {
    let windowWidth = $(window).width();
    if (windowWidth <= 1380) {
        $(this).siblings('.menu-item-has-children').removeClass('active');
        $(this).toggleClass('active');
    } else if (windowWidth > 1380) {
        $(this).siblings('.menu-item-has-children').removeClass('active');
        $(this).removeClass('active');
    }
};
$(document).ready(function () {
    toggleChildrenMenu();
});
window.addEventListener('resize', function () {
    toggleChildrenMenu();
});
//submenu with burger END
//responsive menu
let widthS = window.matchMedia('(min-width: 0px) and (max-width: 1379px)');
const parent_original = document.querySelector('#header__column_2');
const parent_new = document.querySelector('#header_menu_cover');

const item2 = document.querySelector('#login-list');

function responsiveMenu() {
    if (item2) {
        if (widthS.matches) {
            if (!item2.classList.contains('done')) {
                parent_new.insertBefore(item2, parent_new.children[1]);
                item2.classList.add('done');
            }
        } else {
            if (item2.classList.contains('done')) {
                parent_original.insertBefore(item2, parent_original.children[2]);
                item2.classList.remove('done');
            }
        }
    }
};
window.addEventListener('DOMContentLoaded', responsiveMenu);

window.addEventListener('resize', function () {
    if (parent_new) {
        responsiveMenu();
    };
});
//responsive menu END
//search activation
$("#search-activation-btn").click(function showMenuSearch() {
    $("#main-top-header").toggleClass("search-shown");
    $("#search-activation-btn").toggleClass("active");
    $("#search-header").toggleClass("active");
});
//search activation END
//programs
$('.marketing-materials-top__filter li').on('click', filterMaterials);
$('.block-row__filter li').on('click', filterMaterials);

function filterMaterials(e) {
    e.preventDefault();

    $(this).addClass('active');
    $(this).siblings('li').removeClass('active');

    let href = $(this).find('a').attr('href').slice(1).toLowerCase();

    if ($(this).is('li:first-child')) {
        history.replaceState(null, null, ' ');
        href = $('[data-tabs-filter] li:first a').attr('href').slice(1);
    } else {
        window.location.hash = href;
    }

    filterTabsByUrl(href);
}

$(window).on('load', () => {

    let href = window.location.hash.slice(1).toLowerCase();

    $('[data-tabs-filter] li a[href="#' + href + '"]').parent().siblings().removeClass('active');
    $('[data-tabs-filter] li a[href="#' + href + '"]').parent().addClass('active');

    filterTabsByUrl(href);
});

$(window).on('hashchange', () => {
    let href = window.location.hash.slice(1).toLowerCase();
    if (href === 'quick-pricer') return;
    if (!href) {
        $('[data-tabs-filter] li').siblings().removeClass('active');
        $('[data-tabs-filter] li:first').addClass('active');
    } else {
        $('[data-tabs-filter] li a[href="#' + href + '"]').parent().siblings().removeClass('active');
        $('[data-tabs-filter] li a[href="#' + href + '"]').parent().addClass('active');
    }

    filterTabsByUrl(href);
});

function filterTabsByUrl(href) {
    if (href === 'quick-pricer') return;
    const blockList = $('[data-material-type]');
    let buttonStyle1 = $('section').find('[data-wrapper]').attr('data-button-style-1');
    let buttonStyle2 = $('section').find('[data-wrapper]').attr('data-button-style-2');
    let filteredList = getFilteredList(blockList, href);
    const programs_blocks_all = document.querySelectorAll('.program-block');

    //----show or hide blocks by href
    if (href === 'all-materials' || !href) {
        // if there are no href, then show the first tab and his items
        if ($('[data-tabs-filter] li').parent().is('.block-row__filter')) {
            href = $('[data-tabs-filter] li:first a').attr('href').slice(1);
            blockList.hide();
            filteredList = getFilteredList(blockList, href);
            filteredList.show();
            $(filteredList).addClass("program-block-shown-3");
        } else {
            // if there are no $('[data-tabs-filter]) and href --> show all elements
            blockList.show();

            filteredList = $('[data-material-type]');
        }
    } else {
        // else show only current chosen items
        blockList.hide();
        programs_blocks_all.forEach(programs_block => {
            programs_block.classList.remove("program-block-shown-3");
        });
        $(filteredList).show();
        $(filteredList).addClass("program-block-shown-3");
        setTimeout(ProgramFilterReset, 0);
    }

    //---set buttons type of selected list
    if ($('.row-active[data-wrapper]')) {
        if (href === 'all-materials' || !href) {
            blockList.filter(":odd").addClass("active-odd");
            blockList.filter(":even").removeClass("active-odd");
        } else {

            $(filteredList).filter(":odd").addClass('active-odd');
            $(filteredList).filter(":even").removeClass('active-odd');
        }
    }
    if ($('.active').attr('data-show-type') === 'row') {
        $(filteredList).filter(":even").find('.btn-main').removeClass().addClass('btn-main micro ' + buttonStyle1);
        $(filteredList).filter(":odd").find('.btn-main').removeClass().addClass('btn-main micro ' + buttonStyle2);
    }
}

function getFilteredList(blockList, href) {
    return $(blockList).filter(function () {
        const branchesName = $(this).data('materialType').toLowerCase();

        if (branchesName.indexOf(',') !== -1) {
            //---if more than one option in the string
            const branchesList = branchesName.split(',');
            let answer = 0;

            $.each(branchesList, function (i, val) {
                if (val === href) answer = 1;
            });
            return answer;
        } else {
            //---if one option in the string
            if (branchesName === href) return 1;
        }
    });
}
//programs END




//programs filter
var filter_select_el_1 = document.getElementById('program-filter-borrower');
var filter_select_el_2 = document.getElementById('program-filter-income');
var items_el = document.getElementById('programs-blocks-wrapper');

if (filter_select_el_1) {
    filter_select_el_1.onchange = function programsFilter1() {
        console.log(this.value);
        var items = items_el.getElementsByClassName('program-block-shown-2 program-block-shown-3');
        for (var i = 0; i < items.length; i++) {
            if (items[i].classList.contains(this.value)) {
                items[i].style.display = 'flex';
                items[i].classList.add('program-block-shown-1');
            } else {
                items[i].style.display = 'none';
                items[i].classList.remove('program-block-shown-1');
            }
        }
    };
}

if (filter_select_el_2) {
    filter_select_el_2.onchange = function programsFilter2() {
        console.log(this.value);
        var items = items_el.getElementsByClassName('program-block-shown-1 program-block-shown-3');
        for (var i = 0; i < items.length; i++) {
            if (items[i].classList.contains(this.value)) {
                items[i].style.display = 'flex';
                items[i].classList.add('program-block-shown-2');
            } else {
                items[i].style.display = 'none';
                items[i].classList.remove('program-block-shown-2');
            }
        }
    };
}
// reset button code start
let resetButton = document.querySelector('.form__item-programs-btn')
let filterBorrower = document.querySelector('#program-filter-borrower')
let filterIncome = document.querySelector('#program-filter-income')
if (filterBorrower && filterIncome) {
    filterBorrower.addEventListener('change', () => {
        filterBorrower.value !== 'program-block' ? resetButton.classList.add('active') : resetButton.classList.remove('active')
    })
    filterIncome.addEventListener('change', () => {
        filterIncome.value !== 'program-block' ? resetButton.classList.add('active') : resetButton.classList.remove('active')
    })
}

// reset button code end 

function ProgramFilterReset() {
    $('#program-filter-borrower').prop('selectedIndex', 0);
    $('#program-filter-income').prop('selectedIndex', 0);
    resetButton.classList.remove('active');
};

function ProgramFilterResetItems() {
    const programs_blocks = document.querySelectorAll('.program-block-shown-3');

    programs_blocks.forEach(programs_block => {
        programs_block.style.display = 'flex';
    });
}
//programs filter END

//programs accordion
$(document).ready(function () {
    $('.accordion__title').click(function (event) {
        if ($('div').hasClass('accordion')) {
            $('.accordion__title').not($(this)).removeClass('active');
            $('.accordion__content').not($(this).next()).slideUp(300);
        }
        $(this).toggleClass('active').next().slideToggle(300);
    });
});
//programs accordion END
//popup video
$('[popup-video]').on('click', popupVideoShow);

function popupVideoShow(e) {
    e.preventDefault();

    let thisVideoId = $(this).attr('popup-video');

    $('body').addClass('overflow-hidden');
    $('.popup-background').addClass('overflow-hidden');
    $('.popup-wrapp').find('.popup-wrapp__video iframe').attr('src', 'https://www.youtube.com/embed/' + thisVideoId);

    $('.popup-section-video').addClass('popup-show');
}
$('.why-popup-close, .popup-close, .popup-background, .popup-wrapp').on('click', () => {
    popupHide();
});

function popupHide() {
    $('body').removeClass('overflow-hidden');
    $('.popup-background').removeClass('overflow-hidden');
    $('.popup-section').removeClass('popup-show');
    //popup form
    $('.popup-section-double').removeClass('popup-show');
    //popup form END
    $('.popup-wrapp').find('.popup-wrapp__video iframe').attr('src', '');
    //popup fullpage
    $('.popup-section-fullpage').removeClass('popup-show');
}
//popup video END
//Why Us
$('[popup-team]').on('click', popupTeamShow);

function popupTeamShow(e) {
    e.preventDefault();
    $('body').addClass('overflow-hidden');
    $('.popup-background').addClass('overflow-hidden');

    let thisImg = $(this).find('.team-why__img img').attr('src');
    let thisName = $(this).find('.team-why__text .name').text();
    let thisJob = $(this).find('.team-why__text .job').text();
    let thisAbout = $(this).find('.team-why__text .about').html();

    $('.popup-box').find('.popup__img img').attr('src', thisImg);
    $('.popup-box').find('.popup__who .name').text(thisName);
    $('.popup-box').find('.popup__who .job').text(thisJob);
    $('.popup-box').find('.popup__about').html(thisAbout);

    $('.popup-section-team').addClass('popup-show');
}
//Why Us END

//blog content
$(".kamatoc-wrap span").click(function blogContentResponsive() {
    let windowWidth = $(window).width();
    if (windowWidth <= 778) {
        $(".kamatoc-wrap span").toggleClass("active");
        $("#tocmenu").toggleClass("shown");
    }
    $(window).bind("resize", function () {
        if ($(this).width() > 778) {
            $(".kamatoc-wrap span").removeClass("active");
            $("#tocmenu").removeClass("shown");
        }
    }).trigger('resize');
});
//blog content END

// checking scroll position for scroll to top button START
window.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 50) {
        document.querySelector('.scroll-to-top-button').style.display = "flex";
    } else {
        document.querySelector('.scroll-to-top-button').style.display = "none";
    }
});
// checking scroll position for scroll to top button END