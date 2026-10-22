(() => {
  const EVENT_POOL = [
    {
      type: "Климатическая ситуация",
      icon: "☀",
      title: "Аномальная жара",
      zone: "Теплица",
      marker: [53, 40],
      description:
        "Температура внутри теплицы поднялась до 34 °C. Листья начинают терять влагу.",
      choices: [
        {
          text: "Включить затенение и вентиляцию",
          correct: true,
          effects: { water: -5, energy: -10 },
          explanation:
            "Воздухообмен снижает температуру, а затенение уменьшает испарение. Небольшой полив поддерживает растения.",
        },
        {
          text: "Сразу подать 25 литров воды",
          correct: false,
          effects: { harvest: -4, health: -6, water: -25 },
          explanation:
            "Вода расходуется слишком быстро, но причина перегрева не устранена.",
        },
        {
          text: "Ничего не менять до вечера",
          correct: false,
          effects: { harvest: -8, health: -12 },
          explanation:
            "Несколько часов перегрева вызывают стресс и уменьшают будущий урожай.",
        },
      ],
    },
    {
      type: "Сигнал оборудования",
      icon: "◉",
      title: "Ошибка датчика",
      zone: "Метеостанция",
      marker: [29, 20],
      description:
        "Один датчик показывает влажность 18%, а соседний — 57%. Автоматика не может выбрать режим.",
      choices: [
        {
          text: "Сравнить резервный датчик и осмотреть почву",
          correct: true,
          effects: { energy: -3 },
          explanation:
            "Проверка независимым способом помогает найти ошибочное показание без лишнего полива.",
        },
        {
          text: "Довериться самому низкому значению",
          correct: false,
          effects: { harvest: -5, health: -8, water: -15 },
          explanation:
            "Непроверенные данные приводят к переувлажнению и напрасному расходу воды.",
        },
        {
          text: "Перезапустить всю ферму",
          correct: false,
          effects: { health: -2, energy: -12 },
          explanation:
            "Полный перезапуск тратит энергию и временно отключает полезные системы.",
        },
      ],
    },
    {
      type: "Биологическая угроза",
      icon: "✣",
      title: "Вредители на листьях",
      zone: "Зона томатов",
      marker: [47, 47],
      description:
        "Камера обнаружила небольшую группу вредителей только на одной секции растений.",
      choices: [
        {
          text: "Провести локальную биологическую обработку",
          correct: true,
          effects: { health: -2, energy: -5 },
          explanation:
            "Локальная обработка решает проблему и не затрагивает здоровые растения.",
        },
        {
          text: "Обработать химикатами всю теплицу",
          correct: false,
          effects: { harvest: -5, health: -8, energy: -4 },
          explanation:
            "Для небольшого очага это избыточная мера, которая создаёт дополнительную нагрузку на растения.",
        },
        {
          text: "Подождать несколько дней",
          correct: false,
          effects: { harvest: -10, health: -14 },
          explanation:
            "Без вмешательства вредители распространяются на соседние растения.",
        },
      ],
    },
    {
      type: "Погодное предупреждение",
      icon: "☂",
      title: "Сильный ливень",
      zone: "Дренаж и резервуар",
      marker: [14, 46],
      description:
        "Осадки продолжаются несколько часов. На открытых грядках начинает скапливаться вода.",
      choices: [
        {
          text: "Отключить полив и открыть дренаж",
          correct: true,
          effects: { energy: -4 },
          explanation:
            "Дренаж отводит лишнюю влагу, а отключение полива предотвращает переувлажнение.",
        },
        {
          text: "Продолжить полив по расписанию",
          correct: false,
          effects: { harvest: -6, health: -12, water: -20 },
          explanation:
            "Расписание не учитывает реальную погоду: почва переувлажняется, а вода тратится напрасно.",
        },
        {
          text: "Закрыть теплицу и больше ничего не менять",
          correct: false,
          effects: { harvest: -3, health: -5, energy: -5 },
          explanation:
            "Теплица защищена, но вода на открытых участках остаётся без отвода.",
        },
      ],
    },
    {
      type: "Авария оборудования",
      icon: "⚙",
      title: "Поломка насоса",
      zone: "Насосная станция",
      marker: [21, 60],
      description:
        "Основной насос остановился во время полива. В системе предусмотрен резервный контур.",
      choices: [
        {
          text: "Подключить резервный насос",
          correct: true,
          effects: { water: -5, energy: -15 },
          explanation:
            "Резервный контур поддерживает растения, пока основной насос готовят к ремонту.",
        },
        {
          text: "Остановить всё до завершения ремонта",
          correct: false,
          effects: { harvest: -2, health: -7, energy: -5 },
          explanation:
            "Остановка экономит энергию, но растения остаются без необходимой поддержки.",
        },
        {
          text: "Поливать вручную большим объёмом",
          correct: false,
          effects: { health: -3, water: -25 },
          explanation:
            "Ручной полив помогает частично, но распределяет воду неравномерно и расходует слишком много.",
        },
      ],
    },
    {
      type: "Изменение микроклимата",
      icon: "❄",
      title: "Холодная ночь",
      zone: "Вентиляция теплицы",
      marker: [76, 36],
      description:
        "Ночью ожидается резкое похолодание. Открытая вентиляция ускоряет потерю тепла.",
      choices: [
        {
          text: "Закрыть вентиляцию и уменьшить полив",
          correct: true,
          effects: { energy: -8 },
          explanation:
            "Закрытая теплица дольше сохраняет тепло, а меньший полив снижает риск охлаждения корней.",
        },
        {
          text: "Включить все обогреватели на максимум",
          correct: false,
          effects: { energy: -25 },
          explanation:
            "Растения защищены, но энергия расходуется нерационально: сначала стоило уменьшить теплопотери.",
        },
        {
          text: "Оставить настройки без изменений",
          correct: false,
          effects: { harvest: -6, health: -10 },
          explanation:
            "Холодный воздух вызывает стресс и замедляет формирование урожая.",
        },
      ],
    },
    {
      type: "Климатическая ситуация",
      icon: "≋",
      title: "Сухой ветер",
      zone: "Открытые грядки",
      marker: [29, 70],
      description:
        "Днём ожидается сухой ветер. Вода с поверхности почвы будет испаряться быстрее обычного.",
      choices: [
        {
          text: "Запустить капельный полив ранним утром",
          correct: true,
          effects: { water: -15, energy: -5 },
          explanation:
            "Утром испарение меньше, а капельная система доставляет воду непосредственно к корням.",
        },
        {
          text: "Полить растения в самый жаркий час",
          correct: false,
          effects: { harvest: -3, health: -5, water: -25 },
          explanation:
            "Значительная часть воды испаряется до того, как достигает корней.",
        },
        {
          text: "Полностью отменить полив",
          correct: false,
          effects: { harvest: -8, health: -12 },
          explanation:
            "При сухом ветре растения быстрее теряют влагу и нуждаются в точном поливе.",
        },
      ],
    },
    {
      type: "Энергетическая ситуация",
      icon: "⚡",
      title: "Перегрузка сети",
      zone: "Солнечные панели",
      marker: [13, 27],
      description:
        "Потребление энергии резко выросло. Сеть может отключить сразу несколько систем.",
      choices: [
        {
          text: "Оставить важные системы и подключить солнечный резерв",
          correct: true,
          effects: { energy: -8 },
          explanation:
            "Приоритетное питание сохраняет климат и полив, а резерв снижает нагрузку на сеть.",
        },
        {
          text: "Продолжить работу всех систем",
          correct: false,
          effects: { harvest: -5, health: -7, energy: -22 },
          explanation:
            "Перегрузка вызывает аварийное отключение и временно оставляет растения без защиты.",
        },
        {
          text: "Отключить ферму полностью",
          correct: false,
          effects: { health: -9, energy: -3 },
          explanation:
            "Полное отключение экономит энергию, но останавливает вентиляцию и контроль климата.",
        },
      ],
    },
    {
      type: "Авария водоснабжения",
      icon: "◒",
      title: "Утечка воды",
      zone: "Поливочная магистраль",
      marker: [35, 60],
      description:
        "Датчик расхода заметил утечку в одной ветке капельного полива.",
      choices: [
        {
          text: "Перекрыть повреждённую ветку и включить резервную",
          correct: true,
          effects: { water: -7, energy: -4 },
          explanation:
            "Изоляция участка останавливает потерю воды, а резервная ветка поддерживает растения.",
        },
        {
          text: "Увеличить напор, чтобы вода дошла до грядок",
          correct: false,
          effects: { health: -4, water: -28, energy: -8 },
          explanation:
            "Повышенный напор усиливает утечку и ускоряет опустошение резервуара.",
        },
        {
          text: "Не вмешиваться до планового ремонта",
          correct: false,
          effects: { harvest: -7, health: -8, water: -20 },
          explanation:
            "Вода продолжает уходить, а часть растений получает недостаточный полив.",
        },
      ],
    },
    {
      type: "Погодное предупреждение",
      icon: "◆",
      title: "Предупреждение о граде",
      zone: "Защитные экраны",
      marker: [57, 18],
      description:
        "Метеостанция прогнозирует град через двадцать минут. Экраны пока открыты.",
      choices: [
        {
          text: "Закрыть защитные экраны заранее",
          correct: true,
          effects: { energy: -7 },
          explanation:
            "Экраны успевают закрыться до града и защищают стекло и растения.",
        },
        {
          text: "Ждать подтверждения от второго прогноза",
          correct: false,
          effects: { harvest: -9, health: -11 },
          explanation:
            "Промедление оставляет слишком мало времени для закрытия экранов.",
        },
        {
          text: "Усилить полив перед осадками",
          correct: false,
          effects: { health: -4, water: -18 },
          explanation:
            "Полив не защищает от града и только расходует запас воды.",
        },
      ],
    },
    {
      type: "Контроль питания",
      icon: "⬡",
      title: "Нехватка питания",
      zone: "Гидропонный модуль",
      marker: [68, 51],
      description:
        "Листья светлеют, а анализ раствора показывает нехватку питательных элементов.",
      choices: [
        {
          text: "Проверить pH и внести точную дозу удобрения",
          correct: true,
          effects: { water: -3, energy: -3 },
          explanation:
            "Измерение pH и дозированная коррекция возвращают раствору нужный баланс.",
        },
        {
          text: "Добавить двойную дозу без измерений",
          correct: false,
          effects: { harvest: -6, health: -12, water: -5 },
          explanation:
            "Избыток солей повреждает корни и усиливает стресс растений.",
        },
        {
          text: "Заменить раствор обычной водой",
          correct: false,
          effects: { harvest: -5, health: -7, water: -15 },
          explanation:
            "Чистая вода временно разбавляет раствор, но не устраняет нехватку питания.",
        },
      ],
    },
    {
      type: "Риск заболевания",
      icon: "◌",
      title: "Высокая влажность",
      zone: "Центр теплицы",
      marker: [59, 40],
      description:
        "Ночью влажность воздуха достигла 92%. На листьях образуется конденсат.",
      choices: [
        {
          text: "Коротко проветрить и включить циркуляцию воздуха",
          correct: true,
          effects: { energy: -9 },
          explanation:
            "Контролируемое проветривание убирает конденсат и снижает риск грибка.",
        },
        {
          text: "Повысить температуру на максимум",
          correct: false,
          effects: { health: -4, energy: -24 },
          explanation:
            "Сильный нагрев тратит энергию и создаёт новый температурный стресс.",
        },
        {
          text: "Оставить теплицу закрытой",
          correct: false,
          effects: { harvest: -8, health: -13 },
          explanation:
            "Конденсат сохраняется и создаёт условия для распространения грибковых болезней.",
        },
      ],
    },
    {
      type: "Биологический процесс",
      icon: "✿",
      title: "Проблема опыления",
      zone: "Цветущая секция",
      marker: [45, 48],
      description:
        "Камера заметила много цветков без завязей. Естественного опыления недостаточно.",
      choices: [
        {
          text: "Запустить мягкий цикл искусственного опыления",
          correct: true,
          effects: { energy: -6 },
          explanation:
            "Короткий безопасный цикл помогает образованию завязей без повреждения цветков.",
        },
        {
          text: "Увеличить полив в два раза",
          correct: false,
          effects: { harvest: -5, health: -4, water: -22 },
          explanation:
            "Количество воды не решает проблему опыления и может переувлажнить корни.",
        },
        {
          text: "Удалить все цветки без завязей",
          correct: false,
          effects: { harvest: -12, health: -3 },
          explanation:
            "Удаление цветков сразу уменьшает потенциальный урожай.",
        },
      ],
    },
  ];

  const $ = (id) => document.getElementById(id);
  const clamp = (value) => Math.max(0, Math.min(100, value));
  const initialState = () => ({
    day: 0,
    harvest: 100,
    health: 100,
    water: 100,
    energy: 100,
    correct: 0,
    answered: false,
    log: [],
  });

  function shuffleCopy(items) {
    const shuffled = [...items];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const target = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
    }
    return shuffled;
  }

  function arrangeChoices(choices, correctPosition) {
    const correctChoice = choices.find((choice) => choice.correct);
    const otherChoices = shuffleCopy(
      choices.filter((choice) => !choice.correct),
    );
    otherChoices.splice(correctPosition, 0, correctChoice);
    return otherChoices;
  }

  function selectRandomEvents(count = 7) {
    const selectedEvents = shuffleCopy(EVENT_POOL).slice(0, count);
    const correctPositions = shuffleCopy([
      0,
      1,
      2,
      0,
      1,
      2,
      Math.floor(Math.random() * 3),
    ]);

    return selectedEvents.map((event, index) => ({
      ...event,
      choices: arrangeChoices(event.choices, correctPositions[index] ?? index % 3),
    }));
  }

  let events = selectRandomEvents();
  let state = initialState();

  function metric(name, value, suffix = "%") {
    $(`${name}-value`).textContent = `${Math.round(value)}${suffix}`;
    $(`${name}-bar`).style.width = `${clamp(value)}%`;
  }

  function renderDots() {
    $("day-dots").innerHTML = events.map((_, index) => {
      const className =
        index < state.day ? "done" : index === state.day ? "current" : "";
      return `<i class="${className}" aria-hidden="true"></i>`;
    }).join("");
  }

  function renderLog() {
    const completed = state.log.map(
      (item, index) => `
        <article class="log-item">
          <small>День ${index + 1}</small>
          <strong>${item.title}</strong>
          <span>${item.correct ? "Рациональное решение" : "Есть потери"}</span>
        </article>`,
    );
    const empty = Array.from(
      { length: events.length - completed.length },
      (_, index) =>
        `<article class="log-item empty">${completed.length + index + 1}</article>`,
    );
    $("event-log").innerHTML = [...completed, ...empty].join("");
  }

  function renderEvent() {
    const event = events[state.day];
    $("day-label").textContent = `День ${state.day + 1} из ${events.length}`;
    $("event-icon").textContent = event.icon;
    $("event-type").textContent = event.type;
    $("event-title").textContent = event.title;
    $("event-description").textContent = event.description;
    $("event-zone").textContent = event.zone;
    $("system-status").textContent = "Система ожидает решения";
    $("alert-marker").style.left = `${event.marker[0]}%`;
    $("alert-marker").style.top = `${event.marker[1]}%`;
    $("choices").innerHTML = event.choices
      .map(
        (choice, index) => `
          <button class="choice" type="button" data-choice="${index}">
            <span>${String.fromCharCode(65 + index)}</span>${choice.text}
          </button>`,
      )
      .join("");
    $("feedback").hidden = true;
    $("next-event").hidden = true;
    state.answered = false;
    renderDots();
  }

  function renderMetrics() {
    metric("harvest", state.harvest);
    metric("health", state.health);
    metric("water", state.water, " л");
    metric("energy", state.energy);
  }

  function choose(index) {
    if (state.answered) return;
    state.answered = true;
    const event = events[state.day];
    const choice = event.choices[index];

    for (const [key, delta] of Object.entries(choice.effects)) {
      state[key] = clamp(state[key] + delta);
    }
    if (choice.correct) state.correct += 1;
    state.log.push({ title: event.title, correct: choice.correct });

    document.querySelectorAll(".choice").forEach((button, buttonIndex) => {
      button.disabled = true;
      button.classList.toggle("selected", buttonIndex === index);
    });
    $("feedback").hidden = false;
    $("feedback").className = `feedback ${choice.correct ? "good" : "bad"}`;
    $("feedback-title").textContent = choice.correct
      ? "Рациональное решение"
      : "Решение привело к потерям";
    $("feedback-text").textContent = choice.explanation;
    $("system-status").textContent = choice.correct
      ? "Риск взят под контроль"
      : "Показатели фермы снизились";
    $("next-event").textContent =
      state.day === events.length - 1
        ? "Показать результат →"
        : "Следующий день →";
    $("next-event").hidden = false;
    renderMetrics();
    renderLog();
  }

  function calculateRank() {
    if (state.harvest >= 90 && state.correct >= 6) {
      return [
        "Мастер умной фермы",
        "Вы сохранили урожай и принимали решения на основе данных.",
      ];
    }
    if (state.harvest >= 78 && state.correct >= 5) {
      return [
        "Опытный агроном",
        "Большинство рисков устранено, а потери остались небольшими.",
      ];
    }
    if (state.harvest >= 62) {
      return [
        "Помощник фермера",
        "Урожай сохранён частично. Некоторые решения можно сделать точнее.",
      ];
    }
    if (state.harvest >= 45) {
      return [
        "Начинающий управляющий",
        "Ферма завершила сезон, но растения и ресурсы серьёзно пострадали.",
      ];
    }
    return [
      "Нужен новый план",
      "Попробуйте пройти сценарий ещё раз и внимательнее сопоставлять данные.",
    ];
  }

  function showResults() {
    const [rank, description] = calculateRank();
    $("rank-title").textContent = rank;
    $("rank-description").textContent = description;
    $("final-harvest").textContent = `${Math.round(state.harvest)}%`;
    $("final-health").textContent = `${Math.round(state.health)}%`;
    $("final-resources").textContent =
      `${Math.round((state.water + state.energy) / 2)}%`;
    $("final-correct").textContent = `${state.correct} из ${events.length}`;
    $("results").hidden = false;
    $("results").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function next() {
    if (!state.answered) return;
    if (state.day === events.length - 1) {
      showResults();
      return;
    }
    state.day += 1;
    renderEvent();
  }

  function restart() {
    events = selectRandomEvents();
    state = initialState();
    $("results").hidden = true;
    renderMetrics();
    renderLog();
    renderEvent();
  }

  $("choices").addEventListener("click", (event) => {
    const button = event.target.closest("[data-choice]");
    if (button) choose(Number(button.dataset.choice));
  });
  $("next-event").addEventListener("click", next);
  $("restart-game").addEventListener("click", restart);
  $("play-again").addEventListener("click", restart);

  renderMetrics();
  renderLog();
  renderEvent();
})();
