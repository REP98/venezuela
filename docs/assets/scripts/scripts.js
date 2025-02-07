async function load_data() {
    try {
        const response = await fetch("https://rep98.github.io/venezuela/venezuela.json")
        const data = await response.json()
        console.log(data)
        const ParentNode = document.querySelector("#list_of_content")
        for (const codIso in data) {
            const Article = TPL(data[codIso])
            ParentNode.innerHTML += Article;
        }
    } catch (error) {
        console.log(error) 
    }
}

const TPL = (o) => {
    let municipalitiesHTML = ""
    let islandsHTML = ""
    if (o.hasOwnProperty('municipalities')) {
        municipalitiesHTML += "<h3>Municipios</h3>"
        o.municipalities.forEach(mp => {
            let parishesHTML = ""
            mp.parishes.forEach(pq => {
                parishesHTML += `<li><strong>${pq}</strong></li>`
            })
    
            municipalitiesHTML += `<details>
                <summary class="blue"><h4>${mp.name}</h4></summary>
                <section class="content">
                    <h5>Parroquias</h5>
                    <ul>
                        ${parishesHTML}
                    </ul>
                </section>
            </details>`
        })
    }
    if (o.hasOwnProperty("islands")) {
        islandsHTML += "<h3>Islas</h3><ol>"
        o.islands.forEach(isl => {
            islandsHTML += `<li><strong>${isl}</strong></li>`
        })
        islandsHTML += "</ol>"
    }
    

    return `<article>
        <details>
            <summary class="yellow"><h2>${o.name}</h2></summary>
            <section class="content" style="background-image: url(https://rep98.github.io/venezuela/assets/flags/${o.name.replaceAll(" ", "_")}.svg);">
                <p style="margin-top: 0.65rem;">Capital: <strong>${o.capital}</strong></p>
                ${municipalitiesHTML}
                ${islandsHTML}
                <div class="red divisor"></div>
            </section>
        </details>
    </article>`
}


document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#year").innerText = "" + new Date().getFullYear()
    const body = document.body
    // Verificar la preferencia de tema almacenada en el almacenamiento local
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
        body.classList.add(savedTheme)
    } else {
        // Usar la preferencia del navegador si no hay tema guardado
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            body.classList.add('dark')
            localStorage.setItem("theme", 'dark')
        } else {
            body.classList.add('light')
            localStorage.setItem("theme", 'light')
        }
    }
    setTimeout(async () => load_data(), 50)
    const topScrollBtn = document.getElementById('top-scroll')
    const progressRing = document.getElementById('progress-ring')
    const circumference = progressRing.r.baseVal.value * 2 * Math.PI

    progressRing.style.strokeDasharray = `${circumference}`
    progressRing.style.strokeDashoffset = `${circumference}`

    function setProgress(percent) {
        const offset = circumference - (percent / 100) * circumference
        progressRing.style.strokeDashoffset = offset
    }

    // Muestra el botón cuando el usuario hace scroll hacia abajo
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            topScrollBtn.style.display = 'flex'
        } else {
            topScrollBtn.style.display = 'none'
        }

        // Calcula el progreso del scroll
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
        const scrollProgress = (scrollTop / scrollHeight) * 100

        setProgress(scrollProgress)
    }

    // Desplaza hacia arriba cuando se hace clic en el botón
    topScrollBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    })

    document.querySelector("#toggle-theme").addEventListener('click', function() {
        const getTheme = localStorage.getItem('theme')
        if (getTheme == 'dark'){
            body.classList.add("light")
            body.classList.remove('dark')
            localStorage.setItem("theme", 'light')
        } else {
            body.classList.add('dark')
            body.classList.remove('light')
            localStorage.setItem("theme", "dark")
        }
    })
})


