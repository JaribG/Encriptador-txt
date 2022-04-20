'use strict'

//Una alerta Personalizada 
function alertPersonalizada(title, descripcion,tiempo,color) {
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

//Accedemos al dom y guardamos dicha info necesaria en en variables
let recolectoDatos = document.getElementById('entrada')
let InformacionNoEcontrada = document.getElementById('informacion')
let containerInsertarEncriptado = document.getElementById('dataencriptada')
let containerTxtEncriptado = document.getElementById('information-salida')
let btnCopiar = document.getElementById('btn-copiar')
let dataEncriptada = document.getElementById('dataencriptada')
let btnEncriptar = document.getElementById('btn-Encriptar')
let btnDesencriptar = document.getElementById('btn-Desencriptar')









//Function encriptadora
function txtEncriptarOdesencripatar(vocales) {
    if (vocales) {
        while (recolectoDatos.value.match("ai") != null || recolectoDatos.value.match("enter") != null || recolectoDatos.value.match("imes") != null || recolectoDatos.value.match("ober") != null || recolectoDatos.value.match("ufat") != null) {
            recolectoDatos.value = recolectoDatos.value.replace("ai", "a");
            recolectoDatos.value = recolectoDatos.value.replace("enter", "e");
            recolectoDatos.value = recolectoDatos.value.replace("imes", "i");
            recolectoDatos.value = recolectoDatos.value.replace("ober", "o");
            recolectoDatos.value = recolectoDatos.value.replace("ufat", "u");

            containerInsertarEncriptado.innerHTML = recolectoDatos.value
        }
    } else {
        let data = recolectoDatos.value
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
        recolectoDatos.value = txtEncriptado.join('')
        containerInsertarEncriptado.innerHTML = recolectoDatos.value

    }

}


function validacionForm(e) {

    //Esto evalua la expresion dada con el texto escrito

    let ExprecionAcept = /[A-Z]/g
    let filtro = ExprecionAcept.test(recolectoDatos.value)

    let encripOdesencrip = /ai|enter|imes|ober|ufat/g
    let respuesta = encripOdesencrip.test(recolectoDatos.value)



    recolectoDatos.addEventListener('keydown', (e) => {
        //Si el txt escrito es valido segun la exprecion dada
        if (e.key.length == 1) {
            if (filtro != ExprecionAcept.test(e.key)) {
                alertPersonalizada('Auto close!', 'Solo letras minúsculas y sin acentos ;-)', 2000,'red')

            }
        }
    })

    if (e.target == btnEncriptar) {
        if (recolectoDatos.value == '') {
            alertPersonalizada('Auto close!', 'Por favor ingrese texto en el input :-(', 2000,'red')
        } else if (respuesta) {
            alertPersonalizada('Auto close!', 'Wow; alparecer texto ya esta encriptado', 2000,'red')
        } else (
            textoEncriptar(true)
        )
    } else if (e.target == btnDesencriptar) {
        if (recolectoDatos.value == '') {
            alertPersonalizada('Auto close!', 'Por favor ingrese texto en el input :-(', 2000,'red')
        }else if (!respuesta) {
            alertPersonalizada('Auto close!', 'Este texto No esta encriptado :-(', 2000,'red')
        }else (
            textoEncriptar(false)
        )
    }
}

//Si clickeas o escribes cualquier cosa en el input, se llamara la funcion
let interval;
recolectoDatos.addEventListener('click',() =>{
        interval = window.setInterval(() => {
            console.log('estamos llamando varias veces la funcion')
             validacionForm('na')  
         }, 300); 
})
let clickaste = true
recolectoDatos.addEventListener('blur',() =>{
    console.log('entro')
    clearInterval(interval)
})
btnEncriptar.addEventListener('click', validacionForm)
btnDesencriptar.addEventListener('click', validacionForm)

//Aqui encriptamos el txt y los volvemos visible
function textoEncriptar(btn) {
    //Contiene esta clase y agrega y elimina la class
    let info = InformacionNoEcontrada.classList.toggle('eliminado')
    let estaEncriptado = false

    if (info) {
        containerTxtEncriptado.classList.toggle('eliminado')
        btnCopiar.classList.toggle('eliminado')


        if (btn) {
            txtEncriptarOdesencripatar(false)

        } else if (!btn) {
            txtEncriptarOdesencripatar(true)

        }


        //Despues de enviar el txt reseteamos el form
        document.getElementById('formulario').reset()

        //Si intentas volver a encriptar un txt eliminamos el txt que ya se habia enviado 
        let devueltaAEncriptar = () => {
            if (info) {
                console.log('entro')
                InformacionNoEcontrada.classList.remove('eliminado')
                containerTxtEncriptado.classList.add('eliminado')
                btnCopiar.classList.add('eliminado')
            }
        }
        recolectoDatos.addEventListener('click', devueltaAEncriptar)





    }


}





//Copiado------------------------------------------------------
btnCopiar.addEventListener('click', copiarAlPortapapeles)
function copiarAlPortapapeles() {
    dataEncriptada.select()
    dataEncriptada.setSelectionRange(0, 99999)
    let copiado = document.execCommand('copy')
    if (copiado) {
        alertPersonalizada('Auto close!', 'Texto copiado Satifactoriamente |=)', 1000,'#0A3871')
    }

    //eliminamos el txt encriptado una vez que se clickea en recoletardatos
    let devueltaAEncriptar = (e) => {
        InformacionNoEcontrada.classList.remove('eliminado')
        containerTxtEncriptado.classList.add('eliminado')
        btnCopiar.classList.add('eliminado')
    }

    recolectoDatos.addEventListener('click', devueltaAEncriptar)

}


