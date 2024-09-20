window.addEventListener('load', function(){

async function fetchUsers(){
    
    try {
        // Fazendo  GET para buscar os usuários
        const res = await fetch('https://peoplemanagement.onrender.com/api/usuarios', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Obtendo os dados da resposta
        const users = await res.json();
        

        const tabela = document.getElementById('tabela-usuarios');
        tabela.innerHTML = ''; 

       
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="fonte">${user.name}</td>
                <td class="fonte">${user.cpf}</td>
                <td class="fonte">${user.email}</td>
                <td class="fonte">${user.birthdate}</td>
                <td class="fonte">${user.phone}</td>
            `;
            tabela.appendChild(row); 
        });
      

    } catch (error) {
      
        console.error('Erro ao buscar ou adicionar usuários:', error);
    }
  
}
fetchUsers()});
