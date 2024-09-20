document.getElementById('register-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value;
    const birthdate = document.getElementById('birthdate').value;
    const phone = document.getElementById('phone').value;
    try {



        // Fazendo POST para adicionar um novo usuário
        const response = await fetch('https://peoplemanagement.onrender.com/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, cpf, email, birthdate, phone }) // Envia os dados do novo usuário
        });




    } catch (error) {

        console.error('Erro ao buscar ou adicionar usuários:', error);
    }

    // Log para verificar os dados antes de enviá-los no POST
    console.log(name, cpf, email, birthdate, phone);
});
