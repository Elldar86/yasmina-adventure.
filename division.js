'use strict';

function columnLesson() {
  return `<p>Ясмина открыла учебный барабан. В нём <b>936</b> огоньков, а раздать их надо поровну <b>4</b> хранителям.</p>
    <div class="math">
      <pre class="long" aria-label="936 разделить на 4 равно 234"> <mark class="column-source">936</mark> │ <mark class="column-source">4</mark>
−8   ├────
 ─   │ <mark class="column-target">234</mark>
 13
−12
 ──
  16
 −16
  ──
   <mark class="column-source">0</mark></pre>
      <dl class="column-words">
        <dt>936 · делимое</dt><dd>Сколько огоньков у нас всего.</dd>
        <dt>4 · делитель</dt><dd>На сколько равных долей делим.</dd>
        <dt>234 · частное</dt><dd>Сколько получит каждый. Это ответ.</dd>
        <dt>0 · остаток</dt><dd>Сколько огоньков осталось после раздачи.</dd>
      </dl>
    </div>
    <div class="dialogue"><strong>Лисохвостая подруга</strong><p>А с какой цифры начинать?</p>
    <strong>Ясмина</strong><p>С левой. Здесь у нас 9 сотен. Каждому из четырёх хранителей хватит хотя бы по сотне, значит, начинаем с 9. Если бы первой цифры не хватило, взяли бы и соседнюю.</p></div>
    <ol class="column-guide">
      <li><b>Сколько достанется каждому?</b> По 2 сотни. Четверым по 2 хватает: 4 × 2 = 8. По 3 уже не хватит: понадобятся 12 сотен. Пишем 2 справа, в ответе.</li>
      <li><b>Сколько раздали всем?</b> 4 × 2 = 8 сотен. Пишем 8 под 9, чтобы узнать, сколько осталось.</li>
      <li><b>Сколько осталось?</b> 9 − 8 = 1 сотня. Записываем 1 под чертой. Если осталось 4 сотни или больше, каждому можно было дать ещё по одной.</li>
      <li><b>Что делать с оставшейся сотней?</b> Меняем её на 10 десятков и прибавляем 3 десятка из числа 936. Получилось 13 десятков. Это и значит «снести цифру 3». С десятками и единицами снова делаем то же самое: делим, умножаем, вычитаем.</li>
      <li><b>Когда в ответе нужен ноль?</b> Если ответ уже начали писать и в новом разряде каждому достаётся 0, ставим 0 на его место. На главном барабане увидишь, что произойдёт, если это место пропустить.</li>
      <li><b>Как проверить?</b> Собираем четыре порции обратно: 234 × 4 = 936. Если в самом конце что-то осталось, прибавляем и остаток.</li>
    </ol>`;
}

const divisionSteps = [];
const dividend = '4040';
const divisor = 8;

function addDivisionStep(kind, value, question, hints, context = {}) {
  divisionSteps.push({kind, value, question, hints, ...context});
}

addDivisionStep('first', 40, 'С какого числа слева начнём делить?', [
  'Посмотри на первую голубую цифру. У нас 4 тысячи и 8 секций. Хватит ли по тысяче на каждую?',
  'Четырёх тысяч мало. Возьми ещё соседнюю цифру справа. Какое число они образуют вместе?',
  'Берём первые две цифры: 40. Это 40 сотен. Их уже хватит на восемь секций.'
]);

const rounds = [
  {part:40, digit:5, unit:'сотен', product:40, remainder:0, next:4, nextPlace:'десятков', end:1},
  {part:4, digit:0, unit:'десятков', product:0, remainder:4, next:0, nextPlace:'единиц', end:2},
  {part:40, digit:5, unit:'единиц', product:40, remainder:0, end:3}
];

for (const round of rounds) {
  const {part, digit, unit, product, remainder, next, nextPlace} = round;
  const comparison = digit === 0
    ? 'Каждой секции досталось 0 десятков. Пишем 0 после 5: это место десятков в ответе.'
    : `8 × 5 = 40, а 8 × 6 = 48. В ${part} помещаются пять восьмёрок.`;
  addDivisionStep('digit', digit, `По сколько ${unit} получит каждая из 8 секций?`, [
    `Голубым показано, сколько ${unit} делим. В жёлтое окошко запишем, сколько получит одна секция.`,
    digit === 0 ? 'По одному десятку на секцию нужно 8 десятков. У нас 4. Сколько целых десятков можно дать каждой?' : 'По 4 на секцию понадобится 32. По 6 понадобится 48. А сколько понадобится, если дать по 5?',
    comparison
  ], round);
  addDivisionStep('product', product, 'Сколько получили все 8 секций вместе?', [
    'Справа подсвечено, сколько получила одна секция и сколько секций всего. Чтобы узнать, сколько раздали, умножь эти числа.',
    `Умножь ${digit} на число секций, 8.`,
    `8 × ${digit} = ${product}. Столько записываем под числом ${part}.`
  ], round);
  addDivisionStep('remainder', remainder, 'Сколько осталось после раздачи?', [
    'Верхнее голубое число — сколько было. Нижнее — сколько раздали. Вычти нижнее из верхнего и запиши, сколько осталось.',
    `Посчитай ${part} − ${product}. Остаток должен быть меньше 8.`,
    `${part} − ${product} = ${remainder}.`
  ], round);
  if (next !== undefined) {
    const exchanged = remainder * 10;
    addDivisionStep('carry', exchanged + next, `Сколько ${nextPlace} теперь можно раздать?`, [
      next === 4 ? 'Под чертой осталось 0 сотен. Возьми следующую голубую цифру сверху: это десятки из числа 4040.' : 'Под чертой осталось 4 десятка. Обменяй их на единицы и добавь следующую голубую цифру сверху.',
      `После обмена у нас ${exchanged} ${nextPlace}. Добавь к ним ${next} — это цифра, которую мы переносим сверху.`,
      `Получаем ${exchanged} + ${next} = ${exchanged + next}. Эта запись займёт место под следующей цифрой делимого.`
    ], round);
  }
}

addDivisionStep('check', 4040, 'Если собрать 8 секций по 505, сколько огоньков получится?', [
  'Посмотри справа: каждая секция получила 505. Умножь 505 на число секций, 8. Затем сравни с тем, сколько огоньков было вначале.',
  'Умножь отдельно 500 и 5 на 8. Затем сложи произведения.',
  '500 × 8 = 4000, 5 × 8 = 40. Вместе получается 4040, исходное делимое.'
]);

function divisionFeedback(step, answer) {
  const {kind, value, part, product, digit, next, remainder} = step;
  if (answer === null) return 'Впиши число от нуля и больше, только цифрами.';
  switch (kind) {
    case 'first':
      if (answer < divisor) return `В ${answer} нет полной восьмёрки. Возьми ещё соседнюю цифру 0 справа от 4.`;
      if (answer > value) return 'После 4 слева достаточно взять один 0. Если захватить ещё цифру, мы пропустим разряд сотен.';
      return 'Возьми цифры подряд с левого края числа 4040. Первая цифра 4 меньше 8, поэтому присоедини цифру справа.';
    case 'digit':
      if (answer > 9) return 'Жёлтое окошко в ответе вмещает одну цифру от 0 до 9.';
      if (digit === 0) return 'Четырёх десятков на восемь секций не хватит даже по одному. Слева от жёлтого окошка уже стоит 5 сотен. Поставь 0 в окошко десятков.';
      if (answer * divisor > part) return `По ${answer} на восемь секций потребуется ${answer * divisor}. Есть только ${part}. Попробуй меньшую цифру.`;
      return `По ${answer} займёт ${answer * divisor}. Останется ${part - answer * divisor}, поэтому можно дать каждой секции ещё. Попробуй большую цифру.`;
    case 'product':
      if (answer === digit) return `${digit} получает одна секция. Сейчас записываем общее количество для всех восьми секций.`;
      return `Под числом ${part} нужно записать, сколько уже раздали: 8 секций по ${digit}. Проверь произведение 8 × ${digit}.`;
    case 'remainder':
      if (answer === part + product) return 'Ты сложила два числа. Уже розданное нужно убрать, чтобы узнать, сколько осталось.';
      return `Было ${part}, разложили ${product}. Вычти ${product} из ${part}. ${answer >= divisor ? 'Остаток меньше 8.' : 'Проверь: розданное и остаток вместе дают исходное количество.'}`;
    case 'carry':
      if (answer === next && remainder > 0) return 'Ты взяла следующую цифру. Ещё нужно обменять оставшиеся 4 десятка на 40 единиц.';
      if (answer === remainder + next && remainder > 0) return 'Ты сложила десятки с единицами. Сначала переведи 4 десятка в единицы, потом прибавь снесённый 0.';
      return `Следующая цифра в числе 4040 — ${next}. Если внизу осталось ${remainder}, сначала меняем это на следующий разряд: получаем ${remainder * 10}. Теперь прибавь голубую цифру сверху.`;
    case 'check':
      if (answer === 505) return '505 — размер одной доли. Сколько получится из восьми таких долей?';
      return 'Проверяем деление умножением. Возьми 500 × 8 и 5 × 8, затем сложи оба результата.';
  }
}

function divisionBoard(completed, step, hintLevel) {
  let quotient = '';
  const rows = [` ${dividend}`];
  const sources = new Map();
  const targets = new Map();

  for (const {kind, value, end} of completed) {
    const digits = String(value);
    if (kind === 'digit') quotient += digits;
    if (kind === 'product' || kind === 'remainder') {
      const indent = ' '.repeat(end + 2 - digits.length);
      if (kind === 'product') rows.push(indent.slice(1) + '−' + digits, indent + '─'.repeat(digits.length));
      else rows.push(indent + digits);
    }
    if (kind === 'carry') rows[rows.length - 1] = digits.padStart(end + 3);
  }

  const lastRow = rows.length - 1;
  function mark(row, start, length) {
    const columns = sources.get(row) ?? [];
    for (let column = start; column < start + length; column++) columns.push(column);
    sources.set(row, columns);
  }

  function markPart(row) {
    const digits = String(step.part).length;
    mark(row, step.end + 2 - digits, digits);
  }

  function blank(row, column) {
    rows[row] = (rows[row] ?? '').padEnd(column) + '□';
    targets.set(row, column);
  }

  if (step) {
    const {kind, end} = step;
    if (kind === 'first') {
      mark(0, 1, hintLevel > 0 ? 2 : 1);
      mark(0, 8, 1);
    } else if (kind === 'digit') {
      markPart(lastRow);
      mark(0, 8, 1);
      targets.set(2, 8 + quotient.length);
      quotient += '□';
    } else if (kind === 'product') {
      mark(0, 8, 1);
      mark(2, 7 + quotient.length, 1);
      blank(lastRow + 1, end + 1);
    } else if (kind === 'remainder') {
      markPart(lastRow - 2);
      const digits = String(step.product).length;
      mark(lastRow - 1, end + 2 - digits, digits);
      blank(lastRow + 1, end + 1);
    } else if (kind === 'carry') {
      mark(lastRow, end + 1, 1);
      mark(0, end + 2, 1);
      blank(lastRow, end + 2);
    } else if (kind === 'check') {
      mark(0, 1, dividend.length);
      mark(0, 8, 1);
      mark(2, 8, quotient.length);
    }
  }

  const side = [`│ ${divisor}`, '├────', '│ ' + quotient];
  const lines = Array.from({length: Math.max(3, rows.length)}, (_, row) => {
    const left = rows[row] ?? '';
    const line = row < 3 ? left.padEnd(6) + side[row] : left;
    return [...line].map((character, column) => {
      if (targets.get(row) === column) return '<mark class="column-target">□</mark>';
      if (sources.get(row)?.includes(column)) return `<mark class="column-source">${character}</mark>`;
      return character;
    }).join('');
  });
  return `<pre class="long column-board" aria-label="Столбик 4040 разделить на 8. Ответ: ${quotient.replace('□', '') || 'пока пусто'}"><span aria-hidden="true">${lines.join('\n')}</span></pre>`;
}

function divisionFocus(step, expanded = false) {
  const {kind, part, product, digit, next, remainder} = step;
  const source = value => `<mark class="column-source">${value}</mark>`;
  const target = '<mark class="column-target">□</mark>';
  switch (kind) {
    case 'first': return `Слева ${expanded ? source(40) + ' сотен' : source(4) + ' тысячи'} · справа ${source(8)} секций`;
    case 'digit': return `${source(part)} ÷ ${source(8)} → ${target} на одну секцию`;
    case 'product': return `${source(8)} секций × по ${source(digit)} = ${target} раздали`;
    case 'remainder': return `${source(part)} было − ${source(product)} раздали = ${target} осталось`;
    case 'carry': return `${source(remainder)} под чертой · ${source(next)} сверху · ${target} число после переноса`;
    case 'check': return `${source(505)} × ${source(8)} = ${target} для сравнения с ${source(4040)}`;
  }
}

function divisionActivity() {
  const activity = el('activity');
  activity.innerHTML = `<p>Учебный барабан открыл главный: <b>4040 ÷ 8</b>. В нём 4040 огоньков и 8 секций. Разложи огоньки поровну, чтобы запустить барабан.</p>
    <div class="division-workbench">
      <div class="math"><div id="column"></div><p class="column-key"><mark class="column-source">Голубым</mark> — на что смотреть.<br><mark class="column-target">□</mark> — куда записать.</p></div>
      <div class="division-controls"><div id="column-operation"></div><div id="division-step"></div></div>
    </div>`;
  const status = el('feedback');
  function showFirstTwoDigits(completed, step) {
    el('column').innerHTML = divisionBoard(completed, step, 1);
    el('division-focus').innerHTML = divisionFocus(step, true);
  }
  function show(focus = false) {
    activity.after(status);
    const completed = divisionSteps.slice(0, sub);
    const container = el('division-step');
    const step = divisionSteps[sub];
    el('column').innerHTML = divisionBoard(completed, step, 0);
    if (!step) {
      container.innerHTML = '<p>Все восемь секций получили по <b>505</b> делений. При проверке вернулись все <b>4040</b>.</p>';
      unlock('Восемь секций вспыхнули разом. Смотритель повернул ключ, и вычислитель запустился.');
      if (focus) el('next').focus();
      return;
    }
    container.innerHTML = `<form id="division-answer">
      <label for="ans">${step.question}</label>
      <p class="division-focus" id="division-focus">${divisionFocus(step)}</p>
      <div class="answer-controls"><input class="field" id="ans" inputmode="numeric" autocomplete="off" maxlength="12" aria-describedby="division-focus">
      <button class="secondary" id="check">Записать шаг</button></div></form>
      <div class="hint">
        <button class="hint-button" type="button" id="hint-next">Открыть подсказку</button>
        <div id="division-hints" role="status"></div>
      </div>`;
    el('division-answer').after(el('feedback'));
    let hintIndex = 0;
    el('hint-next').onclick = () => {
      const speaker = hintIndex === 0 ? 'Лисохвостая подруга' : 'Ясмина';
      el('division-hints').insertAdjacentHTML('beforeend', `<p><strong>${speaker}</strong> · ${step.hints[hintIndex]}</p>`);
      hintIndex++;
      if (step.kind === 'first' && hintIndex === 2) showFirstTwoDigits(completed, step);
      el('hint-next').textContent = hintIndex < step.hints.length ? 'Следующая подсказка' : 'Все подсказки открыты';
      el('hint-next').disabled = hintIndex === step.hints.length;
    };
    el('division-answer').onsubmit = event => {
      event.preventDefault();
      const input = el('ans');
      const raw = input.value.trim();
      const answer = /^\d+$/.test(raw) ? Number(raw) : null;
      if (answer !== step.value) {
        const question = {
          first: 'Сколько цифр взять слева?',
          digit: 'Хватит ли на все восемь секций?',
          product: 'Сколько уже получили все секции?',
          remainder: 'А сколько ещё осталось?',
          carry: 'Что происходит, когда переходим на один разряд вправо?',
          check: 'Можно ли собрать исходное число из восьми долей?'
        }[step.kind];
        const fox = document.createElement('p');
        fox.textContent = `Лисохвостая подруга · «${question}»`;
        const yasmina = document.createElement('p');
        yasmina.textContent = `Ясмина · «${divisionFeedback(step, answer)}»`;
        status.replaceChildren(fox, yasmina);
        if (step.kind === 'first' && answer !== null) showFirstTwoDigits(completed, step);
        input.setAttribute('aria-invalid', 'true');
        input.focus();
        input.select();
        return;
      }
      const operation = {
        first: '4 тысячи = 40 сотен',
        digit: `8 × ${step.value} = ${step.product} ≤ ${step.part}`,
        product: `8 × ${step.digit} = ${step.value}`,
        remainder: `${step.part} − ${step.product} = ${step.value}`,
        carry: `${step.remainder} × 10 + ${step.next} = ${step.value}`,
        check: '505 × 8 = 4040'
      }[step.kind];
      el('column-operation').innerHTML = `<div class="operation math-appears">${operation}</div>`;
      sub++;
      save();
      feedback(step.kind === 'digit' && step.digit === 0
        ? 'Ясмина: «Поставили 0 между сотнями и единицами. Так десятки сохранят своё место».'
        : '');
      animateScene();
      show(true);
    };
    if (focus) el('ans').focus({preventScroll:true});
  }
  show();
}
