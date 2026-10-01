# HTTPS para la camara en el celular

La app usa `getUserMedia()` para escanear codigos de barras. Los navegadores solo
entregan la camara en un **contexto seguro**: `https://`, o `http://localhost`.

Desde el celular se entra a `https://192.168.1.33/ferreteria/`, que no es localhost.
Por eso hace falta HTTPS. No es por estetica: sin esto `navigator.mediaDevices` queda
`undefined` y no hay camara, sin aviso ni boton de "permitir".

El certificado lo genera [mkcert](https://github.com/FiloSottile/mkcert), una CA
local. La misma confianza que tiene tu PC tiene que tener el celular, asi que hay
que instalar la CA a mano en Android.

## Estado actual

| Comprobacion | Resultado |
|---|---|
| `http://192.168.1.33/ferreteria/` | 200 |
| `https://192.168.1.33/ferreteria/` | 200, certificado confiado |
| Cadena (`openssl s_client`) | `Verify return code: 0 (ok)` |
| Certificado expira | 1 de enero de 2029 |

El puerto 80 sigue funcionando, no se rompio nada.

## Donde esta cada archivo

| Que | Donde |
|---|---|
| CA raiz (para el celular) | `C:\xampp\htdocs\ferreteria\.certs\mkcert-rootCA.pem` |
| Certificado del servidor | `.certs\ferreteria.pem` |
| Clave privada | `.certs\ferreteria-key.pem` |
| Config de Apache | `C:\xampp\apache\conf\extra\httpd-ssl.conf` |

`.certs/` esta en `.gitignore`. Las claves privadas no van al repo.

---

## Instalar la CA en Android

Solo hay que hacerlo una vez por celular. Es el paso que mas confunde, asi que
conviene seguirlo completo.

### 1. Pasar el certificado al celular

Copiar `mkcert-rootCA.pem` al celular. Formas facil:

- por Bluetooth
- mandalo a tu propia direccion de WhatsApp o email y abrilo
- levantalo por un momento en la PC con `python -m http.server` y descargalo

**Renombralo a `mkcert-rootCA.crt` al pasarlo.** Android lo acepta con cualquiera de
las dos extensiones, pero algunos exploradores de archivos solo reconocen `.crt`.

### 2. Abrir los ajustes de seguridad

Ajustes -> Seguridad (o "Seguridad y privacidad") -> **Cifrado y credenciales** ->
**Instalar un certificado** -> **Certificado de CA**.

### 3. El paso que casi nadie encuentra

Android 7+ ignora las CA instaladas por el usuario salvo que actives un ajuste
oculto:

Ajustes -> **Opciones de desarrollador** (se activa tocando 7 veces "Numero de
compilacion" en Ajustes -> Acerca del telefono -> Informacion de software).

Desplazate hasta **Credenciales de seguridad de hardware** y ponelo en **No
requeridas**.

> En algunos Android este ajuste no aparece con ese nombre. Busca "credenciales"
> dentro de Opciones de desarrollador. En Android 14 y posteriores el nombre suele
> ser "Credenciales de seguridad de hardware" o directamente no existe: en ese
> caso usa el flag de Chrome (abajo).

### 4. Verificar

En Chrome, entra a `https://192.168.1.33/ferreteria/`.

Si ves el candado normal **sin aviso**, funciona. Si ves "Tu conexion no es
privada", la CA no quedo bien instalada.

Comprobacion rapida desde la consola del navegador en el celular:

```js
!!navigator.mediaDevices   // tiene que dar true
```

Si da `false` o `undefined`, la camara sigue bloqueada: el problema es el
certificado, no la app.

---

## Si Android no deja instalar la CA

Usar el flag de Chrome en vez de instalar nada:

1. En el celular: `chrome://flags/#unsafely-treat-insecure-origin-as-secure`
2. Agregar `https://192.168.1.33:443` como origen
3. Poner **Enabled**
4. Reiniciar Chrome

Funciona, pero tiene dos contras: hay que hacerlo en **cada** dispositivo, y Chrome
lo **resetea en cada actualizacion**. Para una demo va bien; para uso diario, no.

---

## Si la IP de la PC cambia

El certificado cubre una IP especifica. Si el router te asigna otra por DHCP, el
celular deja de entrar y el sintoma es confuso (error de certificado).

Pasos para regenerar:

```powershell
$env:CAROOT = "$env:LOCALAPPDATA\mkcert"
& mkcert -install
& mkcert -cert-file C:\xampp\htdocs\ferreteria\.certs\ferreteria.pem localhost,127.0.0.1,<IP-NUEVA>
```

Despues copiar el `.pem` generado sobre el del repo, reiniciar Apache y volver a
instalar la CA en el celular (si la CA cambio, hay que reinstalarla).

Para que no cambie, conviene fijar la IP por DHCP en el router.

Verificar siempre con:

```powershell
& C:\xampp\apache\bin\openssl.exe x509 -in .certs\ferreteria.pem -noout -ext subjectAltName
```

tiene que listar `IP Address:<TU-IP>`.

---

## Notas de seguridad

- La app tiene `admin`/`admin123` y `vendedor`/`vendedor123` en texto plano.
  Estan accesibles para cualquiera en la red local que abra la URL.
- La CA de mkcert es de confianza para el equipo, no publica ni comparte nada.
- Todo esto sirve para una demo en el local, no para produccion.
