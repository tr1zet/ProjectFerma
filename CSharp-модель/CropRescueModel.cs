using System;
using System.Collections.Generic;

namespace AlinaCropRescue
{
    // Единый C#-файл учебного сайта «Спасение урожая».
    // Автор: Микаелян Алина Эдвардовна, группа ПОНОИнф-231.
    // Здесь описаны страницы, дизайн, игровые события, показатели и звания.

    // Класс Effects хранит изменение четырёх показателей после выбора игрока.
    // Отрицательное число уменьшает показатель, положительное — увеличивает.
    public sealed class Effects
    {
        public int Harvest { get; private set; }
        public int Health { get; private set; }
        public int Water { get; private set; }
        public int Energy { get; private set; }

        // Конструктор создаёт набор последствий для одного варианта ответа.
        public Effects(int harvest, int health, int water, int energy)
        {
            Harvest = harvest;
            Health = health;
            Water = water;
            Energy = energy;
        }
    }

    // Класс Choice описывает один доступный игроку вариант решения.
    public sealed class Choice
    {
        public string Text { get; private set; }
        public bool IsRational { get; private set; }
        public Effects Effects { get; private set; }
        public string Explanation { get; private set; }

        // Конструктор связывает текст кнопки, правильность, последствия и объяснение.
        public Choice(string text, bool isRational, Effects effects, string explanation)
        {
            Text = text;
            IsRational = isRational;
            Effects = effects;
            Explanation = explanation;
        }
    }

    // Класс FarmEvent представляет одну игровую ситуацию на умной ферме.
    public sealed class FarmEvent
    {
        public string Type { get; private set; }
        public string Title { get; private set; }
        public string Zone { get; private set; }
        public string Description { get; private set; }
        public Choice[] Choices { get; private set; }

        // Конструктор формирует событие и добавляет к нему три варианта действия.
        public FarmEvent(string type, string title, string zone, string description, Choice[] choices)
        {
            Type = type;
            Title = title;
            Zone = zone;
            Description = description;
            Choices = choices;
        }
    }

    // Класс GameState хранит текущее состояние прохождения и журнал решений.
    public sealed class GameState
    {
        public int Day { get; private set; }
        public int Harvest { get; private set; }
        public int Health { get; private set; }
        public int Water { get; private set; }
        public int Energy { get; private set; }
        public int RationalDecisions { get; private set; }
        public List<string> Journal { get; private set; }

        // При запуске все ресурсы равны 100, а журнал решений пуст.
        public GameState()
        {
            Harvest = 100;
            Health = 100;
            Water = 100;
            Energy = 100;
            Journal = new List<string>();
        }

        // Метод Clamp не позволяет показателям выходить за диапазон от 0 до 100.
        private static int Clamp(int value)
        {
            return Math.Max(0, Math.Min(100, value));
        }

        // Метод Apply применяет выбранное решение, меняет ресурсы и записывает ход в журнал.
        public void Apply(FarmEvent farmEvent, Choice choice)
        {
            Harvest = Clamp(Harvest + choice.Effects.Harvest);
            Health = Clamp(Health + choice.Effects.Health);
            Water = Clamp(Water + choice.Effects.Water);
            Energy = Clamp(Energy + choice.Effects.Energy);
            if (choice.IsRational) RationalDecisions++;
            Day++;
            Journal.Add(farmEvent.Title + ": " + choice.Text);
        }

        // Метод GetRank определяет итоговое звание по урожаю и правильным решениям.
        public string GetRank()
        {
            if (Harvest >= 90 && RationalDecisions >= 6) return "Мастер умной фермы";
            if (Harvest >= 78 && RationalDecisions >= 5) return "Опытный агроном";
            if (Harvest >= 62) return "Помощник фермера";
            if (Harvest >= 45) return "Начинающий управляющий";
            return "Нужен новый план";
        }
    }

    // Класс SiteSpecification содержит описание страниц и всей визуальной системы сайта.
    public static class SiteSpecification
    {
        public const string Title = "Спасение урожая";
        public const string Author = "Микаелян Алина Эдвардовна";
        public const string Group = "ПОНОИнф-231";

        // Раздел навигации: названия пунктов меню и файлы, которые они открывают.
        public static readonly string[] Navigation =
        {
            "Главная — index.html",
            "О проекте — project.html",
            "Мини-игра — game.html",
            "Автор — author.html"
        };

        // Основные настройки дизайна: цвета, изображение, темы и адаптация.
        public static readonly Dictionary<string, string> Design =
            new Dictionary<string, string>
            {
                { "Направление", "Тёплая редакционная агротехнология" },
                { "Фон", "Кремовый #F8F1E7" },
                { "Текст", "Тёмно-синий #173047" },
                { "Главный акцент", "Терракотовый #D36B4D" },
                { "Информационный цвет", "Голубой #4A9FB5" },
                { "Дополнительный цвет", "Мятный #85AAA0" },
                { "Изображение", "Изометрическая современная теплица" },
                { "Навигация", "Горизонтальное меню справа вверху" },
                { "Адаптация", "Компьютер, планшет, телефон от 320 px" },
                { "Темы", "Светлая и тёмная" }
            };

        // Формулировка проблемы и цели учебного проекта.
        public const string Problem =
            "Урожай зависит от нескольких связанных систем, а последствия решений трудно понять только по описанию.";

        public const string Goal =
            "Показать управление умной фермой через семь случайных заданий из набора тринадцати событий.";

        // Список показателей, которые отображаются в игровой панели.
        public static readonly string[] Indicators =
        {
            "Урожай", "Здоровье растений", "Запас воды", "Запас энергии"
        };

        // Полное описание структуры и визуальной системы сайта в C#.
        public static readonly string[] Pages =
        {
            "index.html: главный экран, изображение фермы, преимущества и сценарий прохождения",
            "project.html: проблема, цель, 13 событий, показатели, звания и ценность проекта",
            "game.html: схема фермы, показатели, варианты решений, журнал и итог",
            "author.html: ФИО, группа, особенности и образовательная задача"
        };

        // Правила расположения элементов и адаптации под разные размеры экрана.
        public static readonly string[] LayoutRules =
        {
            "Шапка закреплена сверху и занимает всю ширину окна",
            "Основное содержимое ограничено шириной 1180 px и выровнено по центру",
            "На компьютере игровая панель состоит из изображения и блока решения",
            "До 980 px блоки переходят в одну колонку",
            "До 720 px навигация открывается кнопкой справа",
            "До 420 px журнал и карточки выводятся по одной в строке"
        };

        // Описание внешнего вида основных компонентов интерфейса.
        public static readonly Dictionary<string, string> Components =
            new Dictionary<string, string>
            {
                { "Кнопка", "Терракотовый фон, белый текст, радиус 14 px" },
                { "Карточка", "Светлый фон, тонкая рамка, радиус 18–24 px" },
                { "Показатель", "Название, числовое значение и цветная шкала" },
                { "Маркер", "Пульсирующая метка события поверх схемы фермы" },
                { "Обратная связь", "Зелёная или красная панель с объяснением" },
                { "Тёмная тема", "Тёмно-синий фон, светлый текст, более яркие акценты" }
            };

        // Координаты восклицательного знака для каждой зоны на изображении фермы.
        public static readonly Dictionary<string, string> MarkerPositions =
            new Dictionary<string, string>
            {
                { "Аномальная жара", "53%, 40% — центр теплицы" },
                { "Ошибка датчика", "29%, 20% — метеостанция" },
                { "Вредители на листьях", "47%, 47% — томаты" },
                { "Сильный ливень", "14%, 46% — резервуар" },
                { "Поломка насоса", "21%, 60% — насосная станция" },
                { "Холодная ночь", "76%, 36% — вентиляторы" },
                { "Сухой ветер", "29%, 70% — открытые грядки" },
                { "Перегрузка сети", "13%, 27% — солнечные панели" },
                { "Утечка воды", "35%, 60% — поливочная магистраль" },
                { "Предупреждение о граде", "57%, 18% — защитные экраны" },
                { "Нехватка питания", "68%, 51% — гидропонный модуль" },
                { "Высокая влажность", "59%, 40% — центр теплицы" },
                { "Проблема опыления", "45%, 48% — цветущие томаты" }
            };
    }

    // Класс Scenario содержит банк игровых ситуаций и выбирает задания для прохождения.
    public static class Scenario
    {
        // Сокращённая функция E помогает компактно создавать последствия ответов.
        private static Effects E(int harvest, int health, int water, int energy)
        {
            return new Effects(harvest, health, water, energy);
        }

        // Общий банк из 13 событий. У каждого события есть три варианта решения.
        public static readonly FarmEvent[] Events =
        {
            new FarmEvent(
                "Климатическая ситуация", "Аномальная жара", "Теплица",
                "Температура внутри теплицы поднялась до 34 °C.",
                new Choice[]
                {
                    new Choice("Включить затенение и вентиляцию", true, E(0, 0, -5, -10),
                        "Воздухообмен снижает температуру, а затенение уменьшает испарение."),
                    new Choice("Сразу подать 25 литров воды", false, E(-4, -6, -25, 0),
                        "Вода расходуется быстро, но причина перегрева не устранена."),
                    new Choice("Ничего не менять до вечера", false, E(-8, -12, 0, 0),
                        "Перегрев вызывает стресс и уменьшает будущий урожай.")
                }),
            new FarmEvent(
                "Сигнал оборудования", "Ошибка датчика", "Метеостанция",
                "Два соседних датчика показывают разные значения влажности.",
                new Choice[]
                {
                    new Choice("Сравнить резервный датчик и осмотреть почву", true, E(0, 0, 0, -3),
                        "Независимая проверка помогает найти ошибочное показание."),
                    new Choice("Довериться самому низкому значению", false, E(-5, -8, -15, 0),
                        "Непроверенные данные приводят к переувлажнению."),
                    new Choice("Перезапустить всю ферму", false, E(0, -2, 0, -12),
                        "Полный перезапуск тратит энергию и отключает полезные системы.")
                }),
            new FarmEvent(
                "Биологическая угроза", "Вредители на листьях", "Зона томатов",
                "Камера обнаружила вредителей на одной секции растений.",
                new Choice[]
                {
                    new Choice("Провести локальную биологическую обработку", true, E(0, -2, 0, -5),
                        "Локальная обработка не затрагивает здоровые растения."),
                    new Choice("Обработать химикатами всю теплицу", false, E(-5, -8, 0, -4),
                        "Для небольшого очага это избыточная мера."),
                    new Choice("Подождать несколько дней", false, E(-10, -14, 0, 0),
                        "Без вмешательства вредители распространяются.")
                }),
            new FarmEvent(
                "Погодное предупреждение", "Сильный ливень", "Дренаж и резервуар",
                "На открытых грядках начинает скапливаться вода.",
                new Choice[]
                {
                    new Choice("Отключить полив и открыть дренаж", true, E(0, 0, 0, -4),
                        "Дренаж отводит лишнюю влагу."),
                    new Choice("Продолжить полив по расписанию", false, E(-6, -12, -20, 0),
                        "Расписание не учитывает реальную погоду."),
                    new Choice("Закрыть теплицу и ничего не менять", false, E(-3, -5, 0, -5),
                        "Открытые участки остаются без отвода воды.")
                }),
            new FarmEvent(
                "Авария оборудования", "Поломка насоса", "Насосная станция",
                "Основной насос остановился во время полива.",
                new Choice[]
                {
                    new Choice("Подключить резервный насос", true, E(0, 0, -5, -15),
                        "Резервный контур поддерживает растения."),
                    new Choice("Остановить всё до завершения ремонта", false, E(-2, -7, 0, -5),
                        "Растения остаются без необходимой поддержки."),
                    new Choice("Поливать вручную большим объёмом", false, E(0, -3, -25, 0),
                        "Ручной полив расходует много воды и распределяет её неравномерно.")
                }),
            new FarmEvent(
                "Изменение микроклимата", "Холодная ночь", "Вентиляция теплицы",
                "Открытая вентиляция ускоряет потерю тепла.",
                new Choice[]
                {
                    new Choice("Закрыть вентиляцию и уменьшить полив", true, E(0, 0, 0, -8),
                        "Теплица дольше сохраняет тепло."),
                    new Choice("Включить обогреватели на максимум", false, E(0, 0, 0, -25),
                        "Энергия расходуется нерационально."),
                    new Choice("Оставить настройки без изменений", false, E(-6, -10, 0, 0),
                        "Холодный воздух вызывает стресс.")
                }),
            new FarmEvent(
                "Климатическая ситуация", "Сухой ветер", "Открытые грядки",
                "Вода с поверхности почвы будет испаряться быстрее.",
                new Choice[]
                {
                    new Choice("Запустить капельный полив ранним утром", true, E(0, 0, -15, -5),
                        "Утром испарение меньше, а вода поступает к корням."),
                    new Choice("Полить растения в самый жаркий час", false, E(-3, -5, -25, 0),
                        "Значительная часть воды испаряется."),
                    new Choice("Полностью отменить полив", false, E(-8, -12, 0, 0),
                        "При сухом ветре растения быстро теряют влагу.")
                }),
            new FarmEvent(
                "Энергетическая ситуация", "Перегрузка сети", "Солнечные панели",
                "Потребление энергии выросло, и сеть может отключить важные системы.",
                new Choice[]
                {
                    new Choice("Оставить важные системы и подключить солнечный резерв", true, E(0, 0, 0, -8),
                        "Приоритетное питание сохраняет климат и полив."),
                    new Choice("Продолжить работу всех систем", false, E(-5, -7, 0, -22),
                        "Перегрузка вызывает аварийное отключение."),
                    new Choice("Отключить ферму полностью", false, E(0, -9, 0, -3),
                        "Без вентиляции и контроля климата растения страдают.")
                }),
            new FarmEvent(
                "Авария водоснабжения", "Утечка воды", "Поливочная магистраль",
                "Датчик расхода заметил утечку в одной ветке полива.",
                new Choice[]
                {
                    new Choice("Перекрыть повреждённую ветку и включить резервную", true, E(0, 0, -7, -4),
                        "Изоляция участка останавливает потерю воды."),
                    new Choice("Увеличить напор", false, E(0, -4, -28, -8),
                        "Повышенный напор усиливает утечку."),
                    new Choice("Ждать планового ремонта", false, E(-7, -8, -20, 0),
                        "Часть растений остаётся без нужного полива.")
                }),
            new FarmEvent(
                "Погодное предупреждение", "Предупреждение о граде", "Защитные экраны",
                "Метеостанция прогнозирует град через двадцать минут.",
                new Choice[]
                {
                    new Choice("Закрыть защитные экраны заранее", true, E(0, 0, 0, -7),
                        "Экраны защищают стекло и растения."),
                    new Choice("Ждать второго прогноза", false, E(-9, -11, 0, 0),
                        "Промедление оставляет мало времени."),
                    new Choice("Усилить полив", false, E(0, -4, -18, 0),
                        "Полив не защищает от града.")
                }),
            new FarmEvent(
                "Контроль питания", "Нехватка питания", "Гидропонный модуль",
                "Анализ раствора показывает нехватку питательных элементов.",
                new Choice[]
                {
                    new Choice("Проверить pH и внести точную дозу удобрения", true, E(0, 0, -3, -3),
                        "Дозированная коррекция возвращает нужный баланс."),
                    new Choice("Добавить двойную дозу без измерений", false, E(-6, -12, -5, 0),
                        "Избыток солей повреждает корни."),
                    new Choice("Заменить раствор обычной водой", false, E(-5, -7, -15, 0),
                        "Чистая вода не устраняет нехватку питания.")
                }),
            new FarmEvent(
                "Риск заболевания", "Высокая влажность", "Центр теплицы",
                "Влажность достигла 92%, на листьях образуется конденсат.",
                new Choice[]
                {
                    new Choice("Коротко проветрить и включить циркуляцию", true, E(0, 0, 0, -9),
                        "Проветривание убирает конденсат и снижает риск грибка."),
                    new Choice("Повысить температуру на максимум", false, E(0, -4, 0, -24),
                        "Сильный нагрев создаёт новый стресс."),
                    new Choice("Оставить теплицу закрытой", false, E(-8, -13, 0, 0),
                        "Конденсат создаёт условия для болезней.")
                }),
            new FarmEvent(
                "Биологический процесс", "Проблема опыления", "Цветущая секция",
                "Камера заметила много цветков без завязей.",
                new Choice[]
                {
                    new Choice("Запустить мягкий цикл искусственного опыления", true, E(0, 0, 0, -6),
                        "Безопасный цикл помогает образованию завязей."),
                    new Choice("Увеличить полив в два раза", false, E(-5, -4, -22, 0),
                        "Количество воды не решает проблему опыления."),
                    new Choice("Удалить все цветки без завязей", false, E(-12, -3, 0, 0),
                        "Удаление цветков уменьшает потенциальный урожай.")
                })
        };

        // Метод ArrangeChoices ставит правильный ответ на указанную позицию A, B или C.
        private static Choice[] ArrangeChoices(Choice[] source, int rationalPosition, Random random)
        {
            Choice rationalChoice = null;
            List<Choice> otherChoices = new List<Choice>();

            foreach (Choice choice in source)
            {
                if (choice.IsRational) rationalChoice = choice;
                else otherChoices.Add(choice);
            }

            for (int index = otherChoices.Count - 1; index > 0; index--)
            {
                int target = random.Next(index + 1);
                Choice value = otherChoices[index];
                otherChoices[index] = otherChoices[target];
                otherChoices[target] = value;
            }

            otherChoices.Insert(rationalPosition, rationalChoice);
            return otherChoices.ToArray();
        }

        // Метод SelectRandom перемешивает события и распределяет верные ответы по позициям A, B и C.
        public static FarmEvent[] SelectRandom(int count, Random random)
        {
            List<FarmEvent> shuffled = new List<FarmEvent>(Events);
            for (int index = shuffled.Count - 1; index > 0; index--)
            {
                int target = random.Next(index + 1);
                FarmEvent value = shuffled[index];
                shuffled[index] = shuffled[target];
                shuffled[target] = value;
            }
            count = Math.Max(0, Math.Min(count, shuffled.Count));
            List<int> positions = new List<int>();
            for (int index = 0; index < count; index++) positions.Add(index % 3);

            for (int index = positions.Count - 1; index > 0; index--)
            {
                int target = random.Next(index + 1);
                int value = positions[index];
                positions[index] = positions[target];
                positions[target] = value;
            }

            List<FarmEvent> result = new List<FarmEvent>();
            for (int index = 0; index < count; index++)
            {
                FarmEvent source = shuffled[index];
                result.Add(new FarmEvent(
                    source.Type,
                    source.Title,
                    source.Zone,
                    source.Description,
                    ArrangeChoices(source.Choices, positions[index], random)));
            }

            return result.ToArray();
        }
    }

    // Класс Program отвечает за запуск консольной демонстрации модели.
    public static class Program
    {
        // Метод Main создаёт новую игру, выбирает 7 случайных событий и выводит результат.
        public static void Main()
        {
            Console.OutputEncoding = System.Text.Encoding.UTF8;
            Console.WriteLine(SiteSpecification.Title);
            Console.WriteLine(SiteSpecification.Author + " · " + SiteSpecification.Group);
            Console.WriteLine("Демонстрация рационального прохождения\n");

            // Создание начального состояния и случайного набора заданий.
            GameState state = new GameState();
            FarmEvent[] gameEvents = Scenario.SelectRandom(7, new Random());
            // Демонстрационное прохождение: правильный ответ ищется на любой позиции A, B или C.
            foreach (FarmEvent farmEvent in gameEvents)
            {
                Choice choice = Array.Find(farmEvent.Choices, item => item.IsRational);
                state.Apply(farmEvent, choice);
                Console.WriteLine(
                    "День {0}: {1} — {2}", state.Day, farmEvent.Title, choice.Text);
            }

            // Вывод итоговых показателей и звания игрока.
            Console.WriteLine("\nУрожай: {0}%", state.Harvest);
            Console.WriteLine("Здоровье: {0}%", state.Health);
            Console.WriteLine("Вода: {0} л", state.Water);
            Console.WriteLine("Энергия: {0}%", state.Energy);
            Console.WriteLine("Правильные решения: {0} из {1}",
                state.RationalDecisions, gameEvents.Length);
            Console.WriteLine("Звание: " + state.GetRank());
        }
    }
}
