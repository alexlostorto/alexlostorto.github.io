/*--------------------------------------------------------------
TABLE OF CONTENTS
----------------------------------------------------------------
1.0 VARIABLES
    1.1 DOM ELEMENTS
2.0 FUNCTIONS
    2.1 ESSENTIAL
    2.2 VIEW COUNTER
    2.3 FADERS
    2.4 TYPEWRITER
    2.5 CREDITS
    2.6 COPY BUTTON
3.0 NAVIGATION
    3.1 HAMBURGER FUNCTIONALITY
4.0 CUSTOM CURSOR
    4.1 DETECT DEVICE
    4.2 CURSOR
--------------------------------------------------------------*/

/*--------------------------------------------------------------
1.0 VARIABLE
--------------------------------------------------------------*/

    /*------------------------------------------------------------
    |
    | 1.1 DOM ELEMENTS
    |
    ------------------------------------------------------------*/

let toggleButton;
let resourcesButton;
let resourcesLinks;
let subcategoryButton;
let navbarItems;
const homePage = document.querySelector('.body-container');
const bodyElement = document.querySelector('body');
const cursor = document.querySelector('.custom-cursor');
const cursorInner = document.querySelector('.custom-cursor.inner');
const cursorOuter = document.querySelector('.custom-cursor.outer');

bodyElement.classList.add('scroll');
homePage.classList.add('fade');

/*--------------------------------------------------------------
2.0 FUNCTIONS
--------------------------------------------------------------*/

    /*------------------------------------------------------------
    |
    | 2.1 ESSENTIAL
    |
    ------------------------------------------------------------*/

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function round(number, decimalPlaces) {
    return Number(Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces)
}

async function waitUntilLoaded(selector) {
    let trials = 0;
    while (document.querySelector(selector) === null && trials <= 10) {
        await sleep(100);
        trials ++;
    }

    return document.querySelector(selector);
}

    /*------------------------------------------------------------
    |
    | 2.2 VIEW COUNTER
    |
    ------------------------------------------------------------*/

async function liveViews() {
    try {
        let html = document.createElement('html');
        let response = await ((await (fetch("https://cors-anywhere.herokuapp.com/https://vbr.wocr.tk/badge?page_id=alexlostorto.github.io"))).text());
        html.innerHTML = response;
        let counter = document.querySelector('#visits');
        let count = html.querySelectorAll('svg g text')[3].innerHTML;

        if (counter !== null) {
            counter.innerText = count + " 👀";
        }
    } catch(err) {
        console.log(err)
    }
}

liveViews()

    /*------------------------------------------------------------
    |
    | 2.3 FADERS
    |
    ------------------------------------------------------------*/

const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
    threshold: 1,
    rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return
        } else {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        }
    })
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
})

    /*------------------------------------------------------------
    |
    | 2.4 TYPEWRITER
    |
    ------------------------------------------------------------*/

let speed = 100;
async function typewrite(element) {
    let text = element.innerHTML;
    element.innerHTML = '';
    element.style.visibility = 'visible';

    for (let i = 0; i < text.length; i++) {
        await sleep(speed);
        element.innerHTML += text.charAt(i);
    }

    element.style['border-right'] = '0px';
}

    /*------------------------------------------------------------
    |
    | 2.5 CREDITS
    |
    ------------------------------------------------------------*/

function credits() {
    console.log.apply(console, ["%c Thanks for stopping by! I\u2019m currently looking to expand my programming knowledge and work with other like-minded devs. ","color: #fff; background: #8000ff; padding:5px 0;"])
    console.log.apply(console, ["%c Designed and Developed by Alex lo Storto %c\ud83d\ude80 ","color: #fff; background: #8000ff; padding:5px 0;","color: #fff; background: #242424; padding:5px 0 5px 5px;"])
}

    /*------------------------------------------------------------
    |
    | 2.6 COPY BUTTON
    |
    ------------------------------------------------------------*/

function copy(text, button, message='Copied!', initialText='Copy', errorMessage='Failed to copy', delay=1000) {
    navigator.clipboard.writeText(text).then(async function() {
        button.textContent = message;
        await sleep(delay);
        button.textContent = initialText;
    }, async function(err) {
        button.textContent = errorMessage;
        await sleep(delay);
        button.textContent = initialText;
        console.error('Could not copy: ', err);
    });
}

/*--------------------------------------------------------------
3.0 NAVIGATION
--------------------------------------------------------------*/

    /*------------------------------------------------------------
    |
    | 3.1 HAMBURGER FUNCTIONALITY
    |
    ------------------------------------------------------------*/

async function enableNavbar() {
    toggleButton = await waitUntilLoaded('.toggle-button');
    resourcesButton = await waitUntilLoaded('.resources-button');
    resourcesLinks = await waitUntilLoaded('.nav-resources');
    subcategoryButton = await waitUntilLoaded('.subcategory-button');
    navbarItems = await waitUntilLoaded('.navbar-items');

    if (toggleButton !== null) {
        toggleButton.addEventListener('click', () => {
            navbarItems.classList.toggle('active');
        })
    }
    
    if (resourcesButton !== null) {
        resourcesButton.addEventListener('click', () => {
            resourcesLinks.classList.toggle('active');
        })
    }
    
    if (subcategoryButton !== null) {
        subcategoryButton.addEventListener('click', (event) => {
            event.stopPropagation();
            subcategoryButton.classList.toggle('active');
        })
    }
}

enableNavbar();

/*--------------------------------------------------------------
4.0 CUSTOM CURSOR
--------------------------------------------------------------*/

    /*------------------------------------------------------------
    |
    | 4.1 DETECT DEVICE
    |
    ------------------------------------------------------------*/

let orientationLandscape = (screen.availWidth > screen.availHeight);
let isMobile = (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i));
let coarsePointer = window.matchMedia("(any-pointer:coarse)").matches;

window.addEventListener("touchstart", detectTouch);

function detectTouch() {  // If a touch is detected, make sure the custom cursor is disabled 
    console.log("isMobile");
    window.removeEventListener("touchstart", detectTouch);
    window.removeEventListener("mousemove", customCursorListener);
}

window.addEventListener('mousemove', detectCursor);

function detectCursor() {  // If a cursor is detected, make sure the custom cursor is enabled 
    console.log("isDesktop");
    toggleCustomCursor(true);
    window.removeEventListener("mousemove", detectCursor);
}

    /*------------------------------------------------------------
    |
    | 4.2 CURSOR
    |
    ------------------------------------------------------------*/

const customCursorListener = (event) => { updateCustomCursor(event); };

window.addEventListener('mousemove', customCursorListener);

function toggleCustomCursor(enable=true) {
    if (enable) {display = 'block'} else {display = 'none'}
    cursor.style.display = display;
    cursorInner.style.display = display;
    cursorOuter.style.display = display;
}

function toggleCursorHover(event) {
    const target = event.target;
    
    const isLinkTag = target.tagName.toLowerCase() === 'a'  || target.classList.contains('cursor-hover');
    const isHovered = cursorInner.classList.contains('hoveredCursor');
    
    // Toggle the cursor class if necessary 
    if(isLinkTag && !isHovered) {
        cursorInner.classList.add('hoveredCursor');
    } else if(!isLinkTag && isHovered) {
        cursorInner.classList.remove('hoveredCursor');
    }
}

function positionCustomCursor(event) {  // Whenever a mouse movement is detected, update the custom cursor position
    cursorInner.style.left = event.pageX + 'px';
    cursorInner.style.top = event.pageY - window.scrollY + 'px';

    cursorOuter.style.left = event.pageX + 'px';
    cursorOuter.style.top = event.pageY - window.scrollY + 'px';
}

function updateCustomCursor(event) {
    toggleCursorHover(event);
    positionCustomCursor(event);
} 
