
const atividade = {
  nome: "Almoço",
  data: new Date("2024-07-08 10:00"),
  finalizada: true
}
let atividades = [];

const criarItemDeAtividade = (atividade) => {

  let input = '<input type="checkbox"/';

  if (atividade.finalizada == true) {
    input += 'checked';
  }

  input += '>';

  return `<div>
      ${input}
      <span>${atividade.nome}</span>
      <time>${atividade.data}</time>

    </div>`
}

const atualizarListaDeAtividades = () => {
  const section = document.querySelector("section");

  if(atividades.length == 0){
    section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`
    return
  }

  for (let item of atividades) {
    section.innerHTML += criarItemDeAtividade(item);
  }
}
atualizarListaDeAtividades();



