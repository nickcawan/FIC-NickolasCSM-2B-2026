
let alunos = [];
let nomesOrig = [];
let nomesAtual = [];

// ── 1 & 3
function adicionarAluno() {
  const nome = document.getElementById('nome').value.trim();
  const idade = parseInt(document.getElementById('idade').value);
  const n1 = parseFloat(document.getElementById('n1').value);
  const n2 = parseFloat(document.getElementById('n2').value);
  const n3 = parseFloat(document.getElementById('n3').value);

  if (!nome || isNaN(idade) || isNaN(n1) || isNaN(n2) || isNaN(n3)) {
    alert('Preencha todos os campos corretamente!');
    return;
  }

  const media = +((n1 + n2 + n3) / 3).toFixed(2);
  alunos.push({ nome, idade, n1, n2, n3, media });

  ['nome', 'idade', 'n1', 'n2', 'n3'].forEach(id => document.getElementById(id).value = '');
  renderTabela();
  renderCards();
}

function limparAlunos() {
  alunos = [];
  renderTabela();
  renderCards();
}

function getSituacao(media) {
  if (media >= 6) return 'Aprovado';
  if (media >= 1) return 'Recuperação';
  return 'Reprovado';
}

function renderTabela() {
  const tabela = document.getElementById('tabela');
  const corpo = document.getElementById('corpo-tabela');
  if (alunos.length === 0) { tabela.style.display = 'none'; corpo.innerHTML = ''; return; }
  tabela.style.display = 'table';
  corpo.innerHTML = alunos.map((a, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${a.nome}</td>
        <td>${a.idade}</td>
        <td>${a.media}</td>
        <td>${getSituacao(a.media)}</td>
        <td>${a.idade >= 18 ? 'Maior de idade' : 'Menor de idade'}</td>
      </tr>
    `).join('');
}

// ── 7: CALCULADORA ───────────────────────
function calcular() {
  const a = parseFloat(document.getElementById('calc-a').value);
  const b = parseFloat(document.getElementById('calc-b').value);
  const op = document.getElementById('calc-op').value;
  let resultado;

  if (isNaN(a) || isNaN(b)) { alert('Digite dois números válidos!'); return; }
  if (op === '+') resultado = a + b;
  if (op === '-') resultado = a - b;
  if (op === '*') resultado = a * b;
  if (op === '/') resultado = b !== 0 ? a / b : 'Divisão por zero!';

  document.getElementById('calc-resultado').textContent =
    typeof resultado === 'number' ? '= ' + +resultado.toFixed(4) : resultado;
}

// ── 8: NOTAS ─────────────────────────────
function verificarNota() {
  const nome = document.getElementById('nota-nome').value.trim();
  const n1 = parseFloat(document.getElementById('nota-n1').value);
  const n2 = parseFloat(document.getElementById('nota-n2').value);
  const n3 = parseFloat(document.getElementById('nota-n3').value);

  if (!nome || isNaN(n1) || isNaN(n2) || isNaN(n3)) { alert('Preencha todos os campos!'); return; }

  const media = +((n1 + n2 + n3) / 3).toFixed(2);
  const sit = getSituacao(media);
  document.getElementById('resultado-notas').textContent =
    `${nome} — Média: ${media} → ${sit}`;
}

// ── 9: ORDENAR ───────────────────────────
function addNome() {
  const inp = document.getElementById('ord-nome');
  const v = inp.value.trim();
  if (!v) return;
  nomesOrig.push(v);
  nomesAtual = [...nomesOrig];
  inp.value = '';
  renderNomes();
}

function ordenar(modo) {
  if (modo === 'az') nomesAtual = [...nomesOrig].sort((a, b) => a.localeCompare(b, 'pt-BR'));
  else if (modo === 'za') nomesAtual = [...nomesOrig].sort((a, b) => b.localeCompare(a, 'pt-BR'));
  else nomesAtual = [...nomesOrig];
  renderNomes();
}

function renderNomes() {
  document.getElementById('lista-nomes').innerHTML =
    nomesAtual.length === 0
      ? '<em>Nenhum nome adicionado.</em>'
      : nomesAtual.map(n => `<span>${n}</span>`).join('');
}

// ── 10: CLIQUE ───────────────────────────
function renderCards() {
  const el = document.getElementById('cards-clique');
  if (alunos.length === 0) { el.innerHTML = '<em>Nenhum aluno cadastrado ainda.</em>'; return; }
  el.innerHTML = alunos.map((a, i) => `
      <p>
        <button onclick="mostrarDados(${i})">👤 ${a.nome}</button>
        <span id="dados-${i}" style="display:none; margin-left:10px;">
          Idade: ${a.idade} | N1: ${a.n1} | N2: ${a.n2} | N3: ${a.n3} | Média: ${a.media} | ${getSituacao(a.media)} | ${a.idade >= 18 ? 'Maior' : 'Menor'} de idade
        </span>
      </p>
    `).join('');
}

function mostrarDados(i) {
  const el = document.getElementById('dados-' + i);
  el.style.display = el.style.display === 'none' ? 'inline' : 'none';
}