const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium').default || require('@sparticuz/chromium');
const fs = require('fs');
const path = require('path');


// Asignar carpeta temporal local explícitamente en el script
process.env.TMPDIR = path.join(__dirname, 'tmp');

async function ejemplo() {

    // Rutas habituales de Chrome en Windows para pruebas locales
    const winChrome64 = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    const winChrome32 = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';


    let executablePath;
    let launchArgs = chromium.args;

    // Si estamos en tu PC (Windows), usamos Google Chrome como motor
    if (fs.existsSync(winChrome64)) {
        executablePath = winChrome64;
    } else if (fs.existsSync(winChrome32)) {
        executablePath = winChrome32;
    } else {
    // En el Hosting (Linux) se ejecuta el binario de @sparticuz/chromium
        executablePath = await chromium.executablePath();
    }


    const browser = await puppeteer.launch({
        args: [
                ...launchArgs,
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--single-process'
            ],
        defaultViewport: chromium.defaultViewport,
        executablePath: executablePath,
        headless: chromium.headless,
    
    
    })// abrimos el navegador

    const page = await browser.newPage()// creamos una pagina
    await page.goto('https://www.google.com/');
    await page.screenshot({path: 'example.png'});//guardamos la pantalla
    await browser.close();

    
}



ejemplo();
