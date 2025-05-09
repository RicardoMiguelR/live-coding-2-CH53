const answer = document.getElementById('answer');
const button = document.getElementById('button');
const inputEntrada = document.getElementById('inputEntrada');
const API_ENDPOINT = 'https://yesno.wtf/api';

// Creacion de la promesa y fetch de api ->
const getData = () => {
    return new Promise((resolve, reject) => {
        fetch(API_ENDPOINT)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ocurrio un error al obtener los datos');
                } else {
                    return response.json();
                }
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
};

// funcion con toda la logica, reenderizar datos, limpieza de campos, manejo de errores ->
const fetchAnswer = async () => {
    button.addEventListener('click', async event => {
        event.preventDefault();

        const inputValor = inputEntrada.value;
        if (inputValor === '') {
            button.disabled;
        } else {
            try {
                const responseApi = await getData();
                answer.innerHTML = `
                    <div class="body-elemento">
                        <p>${responseApi.answer}
                    </div>
                `;
                setTimeout(() => {
                    inputEntrada.value = '';
                    answer.innerText = '';
                    inputEntrada.focus();
                }, 5000);
            } catch (error) {
                answer.innerText = 'Error';
            }
        }
    });
};
fetchAnswer();
