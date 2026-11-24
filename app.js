'use strict';
const chapters=[
{title:'Часы, которые забыли час',place:'Часовая башня',story:'Когда Ясмина коснулась письма, город за окном замер. Птица застыла в воздухе, а на часах исчезли стрелки. На башне светилась надпись: «96 ударов. По 8 на каждый поворот». Хранитель часов исчез, оставив только шестерёнку с двенадцатью пустыми зубцами.',dialog:'«Если убирать по восемь ударов, мы узнаем, сколько поворотов было задумано. Это и есть деление, только мы пока не знаем его короткой записи», — сказала Ясмина.',after:'Часы сделали двенадцать поворотов. Из их сердца выпал кусочек карты. На нём было нарисовано ущелье и слово «ЧАСТИ». Но кто-то наблюдал за девочками из окна обсерватории…'},
{title:'Мост из разбитых чисел',place:'Мост над ущельем',story:'Карта привела девочек к мосту, сложенному из числовых плит. На одной было написано 156, на другой — 3. Между ними зияла пропасть. Лисохвостая подруга заметила: «Мост не требует делить всё сразу. Он умеет разделять число на удобные кусочки».',dialog:'«Возьмём 150 и 6: оба числа делятся на 3. Если соединить результаты, получится ответ для всего числа», — догадалась Ясмина.',after:'Плиты сошлись, и мост открыл проход в библиотеку. На обороте карты проявились три знака: сотня, десяток, единица. Кто-то явно хотел, чтобы девочки дошли именно сюда.'},
{title:'Библиотека трёх разрядов',place:'Зал разрядов',story:'В библиотеке книги рассыпались на светящиеся кубики. Библиотекарь-призрак показал 936 единиц, сложенных в сотни, десятки и единицы. «Разделите их между четырьмя хранителями, — прошептал он, — и я верну вам страницу из книги правил».',dialog:'«Здесь нельзя просто раздать девять сотен и забыть остаток. Одну оставшуюся сотню нужно обменять на десять десятков. Потом точно так же поступить с десятком», — объяснила Ясмина.',after:'Четыре хранителя получили одинаковые доли. На странице проявилось зеркальное слово: «ОБРАТНО». Из коридора донёсся звон: в Зеркальном зале кто-то повторял шаги девочек.'},
{title:'Зеркало обратного пути',place:'Зеркальный зал',story:'В зеркале появилась фигура в маске. «Вы умеете разбирать числа, но сумеете ли собрать их обратно?» — спросила она. На раме вспыхнуло 72 ÷ 8. Восемь лучей по краям зеркала погасли.',dialog:'«Деление можно проверить умножением. Если получилось девять, то восемь раз по девять должны вернуть нам семьдесят два», — сказала Ясмина.',after:'Зеркало вернуло отражение города. Незнакомец снял маску. Под ней было лицо Смотрителя, чьё имя девочки видели на страницах библиотеки. «Я спрятал правила, чтобы остановить сломанный вычислитель. Почините его в обсерватории, иначе числа снова исчезнут».'},
{title:'Башня короткой записи',place:'Обсерватория',story:'На вершине башни стоял огромный вычислитель. Внутри него крутились сотни, десятки и единицы. На учебном барабане мигало: 936 ÷ 4. Смотритель сказал: «Вы уже умеете это делать. Осталось записать путь короче, чтобы открыть главный барабан».',dialog:'«Столбик не новое волшебство, — улыбнулась Ясмина. — Это короткая запись того, как мы делили сотни, обменивали остатки и переходили к десяткам и единицам».',after:'На старой ленте вычислителя Ясмина увидела число 55. «Он пропускал пустой разряд десятков, и 505 превращалось в 55!» Смотритель вернул странице её место, и новая запись пошла по всему городу. Часы пошли, книги вернулись на полки, а мост засветился над ущельем. Смотритель вернул девочкам карту. На ней появился новый путь из обсерватории в город, и на каждом указателе снова стояло число. Но это уже другая история.'}
];
let chapter=0,phase=0,sub=0,chosen=null,solved=false;const screen=document.getElementById('screen');
function el(id){return document.getElementById(id)}
function save(){try{localStorage.setItem('yasmina_position',JSON.stringify({chapter,phase,sub,chosen,solved}))}catch(e){}}
function render(){save();el('progress').innerHTML=`<div style="width:${((chapter*4+phase)/20)*100}%"></div>`;let c=chapters[chapter];if(chapter===5){screen.innerHTML=`${scene(4,3,"Обсерватория")}<div class="chapter"><span class="scene-tag">Финал</span><h2>Числа вернулись</h2><p>Ясмина посмотрела на город: теперь каждое число снова знало своё место. «Получается, деление не страшное, если понимаешь, что происходит с числами», — сказала она.</p><div class="dialogue">Ты прошла пять способов и восстановила вычислитель. Загадки можно пройти ещё раз.</div><button class="primary" id="again">Начать приключение заново</button></div>`;el('again').onclick=reset;return}
let image=scene(chapter,phase,c.place);
if(phase===0)screen.innerHTML=image+`<div class="chapter"><span class="scene-tag">Глава ${chapter+1} из 5 · ${c.place}</span><h2>${c.title}</h2><p>${c.story}</p><div class="dialogue"><strong>Ясмина</strong><p>${c.dialog}</p></div><div class="actions"><button class="primary" id="next">Исследовать загадку →</button></div></div>`;
if(phase===1)screen.innerHTML=image+`<div class="chapter"><span class="scene-tag">Глава ${chapter+1} · Открытие</span><h2>Как работает это правило?</h2>${lesson(chapter)}<div class="actions"><button class="primary" id="next">Я поняла. Попробовать самой →</button></div></div>`;
if(phase===2)screen.innerHTML=image+`<div class="chapter"><span class="scene-tag">Глава ${chapter+1} · Твоё действие</span><h2>${['Заведи часовую башню','Собери каменные плиты','Обменяй разряды','Верни числу отражение','Запусти вычислитель'][chapter]}</h2><div id="activity"></div><div class="feedback" id="feedback" role="status"></div><div class="actions"><button class="primary" id="next" disabled>Узнать, что случилось дальше →</button></div></div>`;
if(phase===3)screen.innerHTML=image+`<div class="chapter"><span class="scene-tag">Глава ${chapter+1} · Новая улика</span><h2>След на карте</h2><p>${c.after}</p><div class="actions"><button class="primary" id="next">${chapter===4?'Увидеть финал →':'Следующая глава →'}</button></div></div>`;
if(phase===2){activity();el('next').disabled=!solved;}el('next').onclick=()=>{if(phase===3){chapter++;phase=0}else phase++;sub=0;chosen=null;solved=false;render();focusChapter()};}
function lesson(i){return [
`<p>На циферблате осталось <b>96 ударов</b>. Каждый поворот убирает <b>8</b>. Можно отнимать восьмёрки одну за другой.</p><div class="math"><div class="big">96 − 8 − 8 − 8 … = 0</div><p>Каждый раз, когда вычитаем 8, считаем один поворот. Всего получится 12 поворотов. Значит, <b>96 ÷ 8 = 12</b>.</p></div><p>Деление здесь отвечает на вопрос: <b>сколько раз число 8 помещается в 96?</b></p>`,
`<p>Большое число не обязательно делить целиком. Ищем части, которые удобно делятся на 3.</p><div class="math"><div class="big">156 = 150 + 6</div><p>150 ÷ 3 = 50, а 6 ÷ 3 = 2.</p><div class="big">50 + 2 = 52</div></div><p>Мы разделили обе части на одно и то же число, а затем сложили результаты.</p>`,
`<p><b>936</b> состоит из <b>9 сотен, 3 десятков и 6 единиц</b>. Делим на четыре.</p><div class="columns"><div class="place">Сотни<b>9</b></div><div class="place">Десятки<b>3</b></div><div class="place">Единицы<b>6</b></div></div><p>9 сотен ÷ 4 = по 2 сотни, остаётся 1 сотня. Меняем её на 10 десятков: теперь 13 десятков.</p><p>13 десятков ÷ 4 = по 3 десятка, остаётся 1 десяток. Меняем его на 10 единиц: теперь 16 единиц.</p><p>16 единиц ÷ 4 = по 4 единицы. Ответ: <b>234</b>.</p>`,
`<p>Умножение и деление помогают проверить друг друга. Восемь лучей должны дать в сумме 72.</p><div class="math"><div class="big">72 ÷ 8 = ?</div><p>Ищем число, которое при умножении на 8 даст 72. Это 9, потому что <b>8 × 9 = 72</b>.</p></div><p>Это не замена всем другим способам, а быстрый способ подобрать и проверить частное.</p>`,
columnLesson()][i]}
function feedback(t){el('feedback').textContent=t}function unlock(t){solved=true;save();animateScene();feedback(t);el('next').disabled=false}
function activity(){const a=el('activity');if(chapter===0){a.innerHTML=`<p>На механизме 96 ударов. Нажимай на шестерёнку: один поворот убирает 8. Следи, сколько поворотов потребуется.</p><div class="counter" id="count" aria-live="polite">96</div><div class="steps" id="steps"></div><button class="secondary" id="turn">⚙ Повернуть: −8</button><details class="hint"><summary>Подсказка Ясмины</summary>Не считай каждый удар отдельно. Отнимай ровно по 8 и считай повороты.</details>`;el('count').textContent=96-8*sub;
for(let i=1;i<=sub;i++)el('steps').insertAdjacentHTML('beforeend',`<span class="chip">${i}: ${96-i*8}</span>`);
el('turn').disabled=sub===12;
el('turn').onclick=()=>{if(sub>=12)return;sub++;save();animateScene();el('count').innerHTML=`<span class="math-appears">${96-8*sub}</span>`;el('steps').insertAdjacentHTML('beforeend',`<span class="chip math-appears">${sub}: ${96-sub*8}</span>`);if(sub===12){el('turn').disabled=true;unlock('12 поворотов по 8 ударов. 96 ÷ 8 = 12. Часы снова идут!')}};return}
if(chapter===1){a.innerHTML=`<p>Мост показывает число 156. Выбери удобное разложение, в котором <b>обе части делятся на 3 без остатка</b>.</p><div class="choicegrid" id="choices"><button data-v="wrong">100 + 56</button><button data-v="right">150 + 6</button><button data-v="wrong">140 + 16</button></div><div id="part2"></div><details class="hint"><summary>Подсказка Ясмины</summary>Проверь отдельно каждую часть: можно ли разделить её на три целиком?</details>`;function choose(e){let b=e.target.closest('button');if(!b)return;if(b.dataset.v!=='right'){feedback('Проверь, делится ли каждая часть на 3 без остатка.');return}chosen='right';save();animateScene();
for(const button of el('choices').querySelectorAll('button')){
  button.disabled=true;
  button.classList.toggle('selected',button.dataset.v==='right');
}
el('part2').innerHTML=`<div class="part-math math-appears">150 ÷ 3 = 50 <span>6 ÷ 3 = 2</span></div><p>Сколько получится, если сложить результаты?</p><input id="ans" class="field" type="number" inputmode="numeric" placeholder="Ответ"><button class="secondary" id="check">Собрать мост</button>`;el('check').onclick=()=>{
  if(Number(el('ans').value)!==52){feedback('Сложи 50 и 2.');return;}
  el('ans').disabled=true;el('check').disabled=true;
  unlock('50 + 2 = 52. Плиты моста соединились!');
  el('feedback').classList.add('math-appears');
};if(solved){el('ans').value=52;el('ans').disabled=true;el('check').disabled=true;}
else feedback('Ты нашла удобные части. Теперь соедини результаты.');
}
el('choices').onclick=choose;
if(chosen==='right')choose({target:el('choices').querySelector('[data-v="right"]')});
return}
if(chapter===2){let steps=[['9 сотен на 4','2 сотни и 1 сотня в остатке','2'],['1 сотня + 3 десятка','13 десятков','13'],['13 десятков на 4','3 десятка и 1 десяток в остатке','3'],['1 десяток + 6 единиц','16 единиц','16'],['16 единиц на 4','4 единицы','4']];a.innerHTML=`<p>Помоги библиотекарю обменять оставшиеся разряды. Выбирай правильное число на каждом шаге.</p><div class="math" id="exchange"></div><details class="hint"><summary>Подсказка Ясмины</summary>Одна сотня равна десяти десяткам. Один десяток равен десяти единицам.</details>`;function show(){if(sub===steps.length){el('exchange').innerHTML='<div class="big math-appears">936 ÷ 4 = 234</div>';unlock('Получилось 2 сотни, 3 десятка, 4 единицы: 234. Страница вернулась!');return}let [q,desc,val]=steps[sub];el('exchange').innerHTML=`<p class="math-appears"><b>Шаг ${sub+1} из 5.</b> ${q}. Что получается?</p><div class="choicegrid">${[0,1,2].map(i=>String(Number(val)+(i+sub)%3-1)).map(v=>`<button data-v="${v}">${v}</button>`).join('')}</div>`;el('exchange').onclick=e=>{let b=e.target.closest('button');if(!b)return;if(b.dataset.v===val){feedback(desc);sub++;save();animateScene();show()}else feedback('Вспомни, сколько десятков в одной сотне или сколько единиц в одном десятке.')};}show();return}
if(chapter===3){a.innerHTML=`<p>На зеркале <b>72 ÷ 8</b>. Какое число нужно умножить на 8, чтобы вернуть 72?</p><input id="ans" class="field" type="number" inputmode="numeric" placeholder="Число"><button class="secondary" id="check">Проверить отражение</button><details class="hint"><summary>Подсказка Ясмины</summary>Вспомни таблицу умножения на 8. Подбери число и умножь его на 8.</details>`;if(solved){el('ans').value=9;el('ans').disabled=true;el('check').disabled=true;}el('check').onclick=()=>{
  if(Number(el('ans').value)!==9){feedback('Проверь умножением: 8 × твоё число должно дать 72.');return;}
  el('ans').disabled=true;el('check').disabled=true;
  unlock('8 × 9 = 72. Зеркало вернуло отражение!');
  el('feedback').classList.add('math-appears');
};return}
if(chapter===4)divisionActivity();}
function scene(index,stage,place){
  const url=`assets/ch${index+1}.jpg`;
  return `<figure class="scene scene-${index+1}${stage===3?' scene-restored':''}" style="--art:url('${url}')">
    <div class="scene-pan"><img class="scene-img" src="${url}" alt="Ясмина и лисохвостая подруга · ${place}">
    <div class="scene-layer scene-characters" aria-hidden="true"></div>
    <div class="scene-layer scene-detail" aria-hidden="true"></div>
    <div class="scene-light" aria-hidden="true"></div></div>
  </figure>`;
}
function animateScene(){
  const illustration=screen.querySelector('.scene');
  illustration.classList.remove('scene-response');
  void illustration.offsetWidth;
  illustration.classList.add('scene-response');
}
function focusChapter(){
  const heading=screen.querySelector('h2');
  heading.tabIndex=-1;
  heading.focus({preventScroll:true});
  window.scrollTo(0,0);
}
function reset(){
  if(!window.confirm('Начать заново и стереть текущий путь?'))return;
  chapter=0;phase=0;sub=0;chosen=null;solved=false;
  render();focusChapter();
}
el('restart').onclick=reset;
el('start').onclick=()=>{render();focusChapter()};
try {
  const position=JSON.parse(localStorage.getItem('yasmina_position'));
  if(position && Number.isInteger(position.chapter) && position.chapter>=0 && position.chapter<=5 &&
      Number.isInteger(position.phase) && position.phase>=0 && position.phase<=3){
    ({chapter,phase}=position);
    if(phase===2 && chapter<5){
      const limits=[12,0,5,0,divisionSteps.length];
      sub=Number.isInteger(position.sub) && position.sub>=0 && position.sub<=limits[chapter] ? position.sub : 0;
      chosen=chapter===1 && position.chosen==='right' ? 'right' : null;
      solved=position.solved===true;
    }
    render();
  }
}catch(e){}
