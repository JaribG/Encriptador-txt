'use strict'

//Una alerta Personalizada para mostrar mensajes  
function alertPersonalizada(title, descripcion, tiempo, color) {
    let timerInterval
    Swal.fire({
        title: title,
        html: `<p class="alerta-copiado" style="color:${color};">${descripcion}</p>`,
        timer: tiempo,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    })
}

//Accedemos al dom y guardamos dicha info necesarias
let inputEntrada = document.getElementById('entrada')
let InformacionNoEcontrada = document.getElementById('informacion')
let containerInsertarEncriptado = document.getElementById('dataencriptada')
let containerTxtEncriptado = document.getElementById('information-salida')
let btnCopiar = document.getElementById('btn-copiar')
let dataEncriptada = document.getElementById('dataencriptada')
let btnEncriptar = document.getElementById('btn-Encriptar')
let btnDesencriptar = document.getElementById('btn-Desencriptar')









//Function encriptadora
function txtEncriptarOdesencripatar(vocales) {
    //Si vocales viene true pues el txt esta encriptado 
    if (vocales) {
        //Desencriptamo el txt
        while (inputEntrada.value.match("ai") != null || inputEntrada.value.match("enter") != null || inputEntrada.value.match("imes") != null || inputEntrada.value.match("ober") != null || inputEntrada.value.match("ufat") != null) {
            inputEntrada.value = inputEntrada.value.replace("ai", "a");
            inputEntrada.value = inputEntrada.value.replace("enter", "e");
            inputEntrada.value = inputEntrada.value.replace("imes", "i");
            inputEntrada.value = inputEntrada.value.replace("ober", "o");
            inputEntrada.value = inputEntrada.value.replace("ufat", "u");

            containerInsertarEncriptado.innerHTML = inputEntrada.value
        }
    } else {
        //Aqui dividimos el txt y las vocales las cambiamos por el txt encriptado
        let data = inputEntrada.value
        let dividor = data.split('')
        let txtEncriptado = []

        for (let i = 0; i < dividor.length; i++) {
            if (dividor[i].indexOf('e') != -1) {
                dividor[i] = 'enter'
            } else if (dividor[i].indexOf('i') != -1) {
                dividor[i] = "imes"
            } else if (dividor[i].indexOf('a') != -1) {
                dividor[i] = "ai"
            } else if (dividor[i].indexOf('o') != -1) {
                dividor[i] = "ober"
            }
            else if (dividor[i].indexOf('u') != -1) {
                dividor[i] = "ufat"
            }
            txtEncriptado.push(dividor[i]);
        }
        inputEntrada.value = txtEncriptado.join('')
        containerInsertarEncriptado.innerHTML = inputEntrada.value

    }

}


//Esta Function se encarga de la validacion 
function validacionForm(e) {

    let soloMayusculas = /[A-Z]/g
    let filtro = soloMayusculas.test(inputEntrada.value)

    let encripOdesencrip = /ai|enter|imes|ober|ufat/g
    let estaEncripRespuesta = encripOdesencrip.test(inputEntrada.value)


    //Si teclendo tratas de ingresar una mayuscula  
    inputEntrada.addEventListener('keydown', (e) => {
        console.log(e.key.length == 1)
        if (e.key.length == 1) {
            if (filtro != soloMayusculas.test(e.key)) {
                alertPersonalizada('Auto close!', 'Solo letras minúsculas y sin acentos ;-)', 2000, 'red')

            }
        }
    })

    //Solo acedera a unas de estas comprobacion si clickas en los btn
    if (e.target == btnEncriptar ||e.key == 'Enter') {
        if (inputEntrada.value == '') {
            alertPersonalizada('Auto close!', 'Por favor ingrese texto en el input :-(', 2000, 'red')
        } else if (estaEncripRespuesta) {
            alertPersonalizada('Auto close!', 'Eureka; alparecer el texto ya esta encriptado, utilize el btn desencriptar', 2000, 'red')
        } else (
            llamdoDeEncriptado(true)
        )
    } else if (e.target == btnDesencriptar) {
        if (inputEntrada.value == '') {
            alertPersonalizada('Auto close!', 'Por favor ingrese texto en el input :-(', 2000, 'red')
        } else if (!estaEncripRespuesta) {
            alertPersonalizada('Auto close!', 'Este texto No esta encriptado :-(  utilize el btn Desencriptar', 2000, 'red')
        } else (
            llamdoDeEncriptado(false)
        )
    }

}

//Si clickeas o escribes cualquier cosa en el input, se llamara la funcion
inputEntrada.addEventListener('keydown', (e) => {
    validacionForm(e)
})
inputEntrada.addEventListener('click', () => {
    validacionForm('')
})

//Llamamos nuestra fuction validacion con los eventos click
btnEncriptar.addEventListener('click', validacionForm)
btnDesencriptar.addEventListener('click', validacionForm)


//Aqui jugamos un poco con los eventos despues de llamar nuestra encriptadora
function llamdoDeEncriptado(btn) {
    //Contiene esta clase y agrega y elimina la class
    let info = InformacionNoEcontrada.classList.toggle('eliminado')

    containerTxtEncriptado.classList.toggle('eliminado')
    btnCopiar.classList.toggle('eliminado')


    if (btn) {
        txtEncriptarOdesencripatar(false)

    } else if (!btn) {
        txtEncriptarOdesencripatar(true)

    }

    //Despues de enviar el txt reseteamos el form
    document.getElementById('formulario').reset()

  //en este callback si clickas en el input de entrada automaticamente borra solamente si hay un texto ya encriptado en el input de salida
    let devueltaAEncriptar = () => {
        if (info) {
            console.log('entro')
            InformacionNoEcontrada.classList.remove('eliminado')
            containerTxtEncriptado.classList.add('eliminado')
            btnCopiar.classList.add('eliminado')
        }
    }
    inputEntrada.addEventListener('click', devueltaAEncriptar)

}





//Copiado------------------------------------------------------
btnCopiar.addEventListener('click', copiarAlPortapapeles)
function copiarAlPortapapeles() {
    dataEncriptada.select()
    dataEncriptada.setSelectionRange(0, 99999)
    let copiado = document.execCommand('copy')
    if (copiado) {
        alertPersonalizada('Auto close!', 'Texto copiado Satifactoriamente |=)', 1000, '#0A3871')
    }

    //eliminamos el txt encriptado una vez que se clickea en recoletardatos
    let devueltaAEncriptar = (e) => {
        InformacionNoEcontrada.classList.remove('eliminado')
        containerTxtEncriptado.classList.add('eliminado')
        btnCopiar.classList.add('eliminado') 
    }

    inputEntrada.addEventListener('click', devueltaAEncriptar)

}


