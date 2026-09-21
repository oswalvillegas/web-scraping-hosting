# web-scraping-hosting
script para tomar captura de pantalla a un nagador desde un hosting cpanel

### librerías usadas
- npm i puppeteer-core
- npm i @sparticuz/chromium
- path
- fs

#### se debe tener una carpeta llamada "tmp" donde se guardaran los datos del navegador portable en el hosting

# Que hosting lo permite?

Como este procedimiento no es algo normal en todo los hoting se tiene que asegurar que se tenga la siguiente:

        libnss3.so (libc6,x86-64) => /lib64/libnss3.so
        libatk-1.0.so.0 (libc6,x86-64) => /lib64/libatk-1.0.so.0
        libX11.so.6 (libc6,x86-64) => /lib64/libX11.so.6
        libX11.so (libc6,x86-64) => /lib64/libX11.so
        libX11-xcb.so.1 (libc6,x86-64) => /lib64/libX11-xcb.so.1
        libX11-xcb.so (libc6,x86-64) => /lib64/libX11-xcb.so

### Que tenemos aqui?
Al devolver líneas como:

    libnss3.so => /lib64/libnss3.so (Seguridad/Criptografía de Chrome)

    libX11.so.6 => /lib64/libX11.so.6 (El sistema de ventanas e interfaz)

    libatk-1.0.so.0 => /lib64/libatk-1.0.so.0 (Soporte de accesibilidad)

Esto confirma que el servidor cPanel (en la arquitectura x86-64) sí tiene instaladas las dependencias nativas de Linux que necesita Chromium para poder arrancar y "simular" el navegador en segundo plano (headless). Por esa razón Puppeteer pudo funcionar en el hosting sin arrojar errores de librerías faltantes.

### Como verificar que temos eso?
en la terminal de cPanel ejecutamos el siguiete comando:

`ldconfig -p | grep -E "libX11|libnss3|libatk|libgbm"`

con esto podremos saber si poseemos las linas que nos indican que podemos usar puppeteer-core y ejecutrar chrimiun




# Estructura del puppeteer.launch()
en caso de que el hosting cumpla los requisitos ya antes mencionado la función puppeteer.launch debe tener lo siguiente

const executablePath = await chromium.executablePath();
        
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
        });

- esta configuración de la función puppeteer.launch() evitara su comportamiento por defecto
les como abrir el navegador y que lo que queramos se ejecute por debajo de la interfaz. 

- desactivamos el motor sandbox para que chrimiun puera ejecutarse dentro del servidor.

- disable-dev-shm-usage: Fuerza a Chromium a usar el directorio /tmp y  ala vez que sea mas eficiente y no consuma tanta memoria.




