# equipo1-konfex-automation
Repositorio que sera utilizado para las automatizaciones de la app KONFEX - equipo 1.



Bueno para realizar esta automatizacion lo hice orientado a objetos ya que de esta manera le da más escabilidad para un futuro.

Cuenta con las siguientes carpetas :

-Fixtures: Es la carpeta para agregar imagenes que pueden ser utilizadas para pushearlas cuando necesitemos cargar alguna imagen.

-Pages: Es una de las importantes ya que en esta carpeta tenemos todos los locators ordenados paso por paso y con comentarios.
 Dentro de esta carpeta van a ver archivos '.ts' de cada pantalla de la app.
 Entonces si quieren agregar un nuevo locator solo tienen que ir a la carpeta pages y agregar el locator en el archivo correspondiente.
 O si algun componente cambia en la app directamente podes cambiarlo en estos archivos y se cambiar en todos lados.

 La prueba 'addTela' la hice con un formato diferente para probar pero el form se completa con los datos del 'test' y no del 'Page'.

-Reports : Es donde se crean reportes en formato 'HTML'.

-Test : En la carpeta test claramente estaran todos los tests que se van automatizar que gracias a la orientacion a objetos se puede reutilizar el codigo de los locators y asi queda un test super limpio.
        Ejemplo para utilizar en consola y ejecutarlos : npx playwright test calculadora.spec.ts --project="Mobile Chromium - Pixel 5"


El archivo 'playwritght.config.ts' contiene toda la base de nuestra configuracion con eso podemos colocar la BASE_URL para que inicie la app sin tener que reutilizar la URL de la web y tambien esta configurado para que no se sobrescriban los reportes y que queden con un TIMESTAMP.





Estoy utilizando 'Playwright & Typescript' con Windsurf y ayuda de chatGPT 5.1 y usando GitHub para el repositorio.


