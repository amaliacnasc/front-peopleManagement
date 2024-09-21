window.addEventListener('load', function(){
console.log('oi');
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
        const tbody = document.getElementById('tbody'); 
        tbody.innerHTML = ''; 

       
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="fonte">${user.name}</td>
                <td class="fonte">${user.cpf}</td>
                <td class="fonte">${user.email}</td>
                <td class="fonte">${user.birthdate}</td>
                <td class="fonte">${user.phone}</td>
                <td class ="fonte">
                    <a href="#" type="button" class="btn btn-small btn-success"><i class="bi bi-eye"></i>Ver</a>
                    <a href="#" type="button" class="btn btn-small btn-primary"><i class="bi bi-pencil"></i>Editar</a>
                    <a href="#" type="button" class="btn btn-small btn-danger"><i class="bi bi-person-x"></i>Remover</a>
                </td>
            `;
            tabela.appendChild(row); 
        });
      

    } catch (error) {
      
        console.error('Erro ao buscar ou adicionar usuários:', error);
    }
  
}
fetchUsers()});
