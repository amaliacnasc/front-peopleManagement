window.addEventListener('load', function () {

    async function fetchUsers() {
        try {
            // Buscar usuários
            const res = await fetch('https://peoplemanagement.onrender.com/api/usuarios', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const users = await res.json();
            const tbody = document.getElementById('tbody');
            tbody.innerHTML = ''; // Limpar a tabela antes de adicionar novas linhas

            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="fonte">${user.name}</td>
                    <td class="fonte">${user.phone}</td>
                    <td class="fonte">${user.email}</td>
                    <td class="fonte">${user.cpf}</td>
                    <td class="fonte">${user.birthdate}</td>
                    <td class="fonte text-end">
                        <a href="#" type="button" class="btn btn-small btn-success botao-ver" data-id="${user._id}">
                            <i class="bi bi-eye"></i> Ver
                        </a>
                        <a href="#" type="button" class="btn btn-small btn-primary botao-editar" data-id="${user._id}">
                            <i class="bi bi-pencil"></i> Editar
                        </a>
                        <a href="#" type="button" class="btn btn-small btn-danger botao-remover" data-id="${user._id}">
                            <i class="bi bi-person-x"></i> Remover
                        </a>
                    </td>
                `;
                tbody.appendChild(row);
            });

            //Fetch nos dados do Mongo clicando em ver 
            const botoesVer = document.querySelectorAll('.botao-ver');
            botoesVer.forEach(botao => {
                botao.addEventListener('click', async function () {
                    const id = this.getAttribute('data-id');

                    try {
                        // Buscar dados do usuário para visualização
                        const getUser = await fetch(`https://peoplemanagement.onrender.com/api/usuarios/${id}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });

                        const user = await getUser.json();

                        // Preenchendo o modal de visualizacao
                        document.getElementById('nameModal').textContent = user.name;
                        document.getElementById('phoneModal').textContent = user.phone;
                        document.getElementById('emailModal').textContent = user.email;
                        document.getElementById('cpfModal').textContent = user.cpf;
                        document.getElementById('birthdateModal').textContent = user.birthdate;

                        // exibindo o modal de visualização
                        const modalVer = new bootstrap.Modal(document.getElementById('dados-modal'));
                        modalVer.show();

                    } catch (error) {
                        console.error('Erro ao buscar os dados do usuário:', error);
                    }
                });
            });

            // botao de editar
            const botoesEditar = document.querySelectorAll('.botao-editar');
            botoesEditar.forEach(botao => {
                botao.addEventListener('click', async function () {
                    const id = this.getAttribute('data-id');

                    try {
                        // Buscar dados do usuário para edição
                        const getUser = await fetch(`https://peoplemanagement.onrender.com/api/usuarios/${id}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });

                        const user = await getUser.json();

                        // Preencher o modal de edição com os dados antigos do usuário
                        document.getElementById('name').value = user.name;
                        document.getElementById('cpf').value = user.cpf;
                        document.getElementById('email').value = user.email;
                        document.getElementById('birthdate').value = user.birthdate;
                        document.getElementById('phone').value = user.phone;

                        // Exibir o modal de edição
                        const modalEdicao = new bootstrap.Modal(document.getElementById('modal-edicao'));
                        modalEdicao.show();

                        // Atualizar dados ao clicar em "Salvar Alterações"
                        document.querySelector('.salvar').addEventListener('click', async function () {
                            const updatedUser = {
                                name: document.getElementById('name').value,
                                cpf: document.getElementById('cpf').value,
                                email: document.getElementById('email').value,
                                birthdate: document.getElementById('birthdate').value,
                                phone: document.getElementById('phone').value,
                            };

                            try {
                                const updateUser = await fetch(`https://peoplemanagement.onrender.com/api/usuarios/${id}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(updatedUser)
                                });

                                if (updateUser.ok) {
                                    alert('Usuário atualizado com sucesso!');
                                    modalEdicao.hide(); // Fechar o modal após salvar
                                    fetchUsers(); // Atualizar a tabela
                                } else {
                                    console.error('Erro ao atualizar o usuário:', await updateUser.text());
                                }
                            } catch (error) {
                                console.error('Erro ao salvar as alterações:', error);
                            }
                        });

                    } catch (error) {
                        console.error('Erro ao buscar os dados do usuário para edição:', error);
                    }
                });
            });

        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    }

    fetchUsers(); // Chamar a função para buscar e listar usuários na tabela
});
