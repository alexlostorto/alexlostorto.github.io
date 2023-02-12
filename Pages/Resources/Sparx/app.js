console.clear();
credits();

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

// PROGRAM
const copyButton = document.querySelector('.copy-button');
const URL = "s=document.createElement('script');s.src='https://alexlostorto.github.io/Pages/Resources/Sparx/console.js';document.head.appendChild(s);";

async function getCode() {
    response = await fetch('console.js');
    text = response.text();

    return text
}

copyButton.addEventListener('click', async () => {
    navigator.clipboard.writeText(URL).then(async function() {
        console.log('Copying to clipboard was successful!');
        copyButton.textContent = 'Copied!';
        await sleep(1000);
        copyButton.textContent = 'Copy';
    }, async function(err) {
        copyButton.textContent = 'Failed to copy';
        await sleep(1000);
        copyButton.textContent = 'Copy';
        console.error('Could not copy text: ', err);
    });
})