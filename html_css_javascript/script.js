
const formatador = (data) => {
  return {
    dia: {
      numerico: dayjs(data).format('DD'),
      semana: {
        curto: dayjs(data).format('ddd'),
        longo: dayjs(data).format('dddd')
      }
    },
    mes: dayjs(data).format('MMMM'),
    horas: dayjs(data).format('HH:mm')
  }
}

const atividade = {
  nome: "Almoço",
  data: new Date("2024-07-08 10:00"),
  finalizada: true
}
let atividades = [
  atividade,
  {
    nome: "Academia em grupo",
    data: new Date("2024-07-08 12:00"),
    finalizada: false

  }
];

const criarItemDeAtividade = (atividade) => {

  let input = '<input type="checkbox"/';

  if (atividade.finalizada == true) {
    input += 'checked';
  }

  input += '>';

  const formatar = formatador(atividade.data);

  return `<div>
      ${input}
      <span>${atividade.nome}</span>
      <time>${formatar.dia.semana.longo}, dia ${formatar.dia.numerico} de ${formatar.mes} às ${formatar.horas}</time>
    </div>`
}

const atualizarListaDeAtividades = () => {
  const section = document.querySelector("section");

  if (atividades.length == 0) {
    section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`
    return
  }

  for (let item of atividades) {
    section.innerHTML += criarItemDeAtividade(item);
  }
}
atualizarListaDeAtividades();



