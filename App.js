import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [funcionarios, setFuncionarios] = useState(() => {
    // Ler do localStorage ao inicializar
    const dadosSalvos = localStorage.getItem('funcionarios_registrados');
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });

  const [novoFuncionario, setNovoFuncionario] = useState({
    nome: '',
    salario: '',
    ocupacao: '',
    dataAdmissao: '',
    dataDemissao: '',
  });

  const [editando, setEditando] = useState(null);

  // Salvar no localStorage sempre que "funcionarios" mudar
  useEffect(() => {
    localStorage.setItem('funcionarios_registrados', JSON.stringify(funcionarios));
  }, [funcionarios]);

  const salvarFuncionario = () => {
    if (!novoFuncionario.nome) {
      alert("Algum campo importante está vazio.");
      return;
    }

    if (editando !== null) {
      const funcionariosAtualizados = funcionarios.map((funcionario, index) =>
        index === editando ? novoFuncionario : funcionario
      );
      setFuncionarios(funcionariosAtualizados);
      setEditando(null);
    } else {
      setFuncionarios([...funcionarios, novoFuncionario]);
    }

    setNovoFuncionario({
      nome: '',
      salario: '',
      ocupacao: '',
      dataAdmissao: '',
      dataDemissao: '',
    });
  };

  const editarFuncionario = (index) => {
    setNovoFuncionario(funcionarios[index]);
    setEditando(index);
  };

  const excluirFuncionario = (index) => {
    const funcionariosAtualizados = funcionarios.filter((_, i) => i !== index);
    setFuncionarios(funcionariosAtualizados);
  };

  const atualizarCampo = (campo, valor) => {
    setNovoFuncionario({ ...novoFuncionario, [campo]: valor });
  };

  const [busca, setBusca] = useState('');
  const funcionariosFiltrados = funcionarios.filter((funcionario) =>
    funcionario.nome.toLowerCase().startsWith(busca.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Lista de Funcionários</h1>
      <input
        id="input-pesquisa"
        type="text"
        placeholder="Quem você procura?"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
      <div id="add-funcionario">
        <input
          className="adicionar"
          type="text"
          placeholder="Nome"
          value={novoFuncionario.nome}
          onChange={(e) => atualizarCampo('nome', e.target.value)}
        />
        <input
          className="adicionar"
          type="number"
          placeholder="Salário"
          value={novoFuncionario.salario}
          onChange={(e) => atualizarCampo('salario', e.target.value)}
        />
        <input
          className="adicionar"
          type="text"
          placeholder="Ocupação"
          value={novoFuncionario.ocupacao}
          onChange={(e) => atualizarCampo('ocupacao', e.target.value)}
        />
        <input
          className="adicionar"
          type="date"
          placeholder="Data de Admissão"
          value={novoFuncionario.dataAdmissao}
          onChange={(e) => atualizarCampo('dataAdmissao', e.target.value)}
        />
        <input
          className="adicionar"
          type="date"
          placeholder="Data de Demissão"
          value={novoFuncionario.dataDemissao}
          onChange={(e) => atualizarCampo('dataDemissao', e.target.value)}
        />
        <button onClick={salvarFuncionario} id="button-add">
          {editando !== null ? 'Atualizar' : 'Adicionar'}
        </button>
      </div>
      <div id="lista-func">
        <section className="table-body">
          <table id="tabela">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Salário</th>
                <th>Ocupação</th>
                <th>Data de Admissão</th>
                <th>Data de Demissão</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {funcionariosFiltrados.map((funcionario, index) => (
                <tr key={index}>
                  <td>{funcionario.nome}</td>
                  <td>R$ {funcionario.salario}</td>
                  <td>{funcionario.ocupacao}</td>
                  <td>{funcionario.dataAdmissao}</td>
                  <td>{funcionario.dataDemissao}</td>
                  <td>
                    <button
                    id='button-lista-1'
                      onClick={() => editarFuncionario(index)}
                      className="button-lista"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => excluirFuncionario(index)}
                      className="button-lista"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
      <div id="LGPD-div">
        <h3>Nos preocupamos com suas informações</h3>
        <a href="#">
          <button id="lgpd">LGPD</button>
        </a>
      </div>
    </div>
  );
}

export default App;
