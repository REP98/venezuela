async function load_data() {
    try {
        const response = await fetch("venezuela.json")
        const data = response.json()
        console.log(data)
    } catch (error) {
        
    }
}

const TPL = (o) => `<article>
                <details>
                    <summary class="yellow"><h2>Distrito Capital</h2></summary>
                    <section class="content">
                        <h3>Municipios</h3>
                        <details>
                            <summary class="blue"><h4>Libertador</h4></summary>
                            <section class="content">
                                <h5>Parroquias</h5>
                                <ul>
                                    <li><strong>Altagracia</strong></li>
                                </ul>
                            </section>
                        </details>
                        <div class="red divisor"></div>
                    </section>
                </details>
            </article>`

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#year").innerText = "" + new Date().getFullYear()
    load_data()
    console.log("Web Cargada")
})