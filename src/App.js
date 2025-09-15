import React, { useState } from 'react';
import { Send, ArrowRight, FileText, Target, Lightbulb, MessageSquare, Globe, AlertCircle } from 'lucide-react';

const MarketArchitectAI = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const questions = [
    {
      id: 'product',
      text: "Здравствуйте! Давайте вместе построим вашу стратегию. Чтобы наша работа была максимально продуктивной, мне нужно глубоко понять вашу ситуацию.\n\nНачнем с основ:\n\n**Какой у вас продукт или услуга? И, пожалуйста, дайте ссылку на ваш сайт или основную социальную сеть, где вы представлены.**",
      placeholder: "Опишите ваш продукт/услугу и укажите ссылку на сайт или соцсети"
    },
    {
      id: 'competitors',
      text: "Отлично. Теперь мне важно понять конкурентную среду.\n\n**Кто ваши 2-3 ключевых конкурента? Пожалуйста, предоставьте ссылки на их ресурсы**, чтобы мой анализ был максимально точным.",
      placeholder: "Укажите конкурентов и ссылки на их ресурсы"
    },
    {
      id: 'best_clients',
      text: "Спасибо, я изучаю ваши материалы. А теперь давайте уточним самое важное — вашего идеального клиента.\n\nЧасто наше первоначальное видение отличается от того, кто в реальности приносит бизнесу максимум пользы.\n\n**Подумайте о своих лучших клиентах. Кто те люди, которые получают от вашего продукта максимальные результаты и остаются довольны больше всего?**",
      placeholder: "Опишите ваших лучших клиентов"
    },
    {
      id: 'paying_clients',
      text: "Теперь давайте посмотрим с другой стороны.\n\n**А кто те клиенты, которые готовы платить вашу цену без лишних вопросов и чаще всего возвращаются за повторной покупкой?**",
      placeholder: "Опишите клиентов, готовых платить без возражений"
    },
    {
      id: 'unique_method',
      text: "Это очень ценная информация. Мы нащупали ядро вашей аудитории.\n\nТеперь давайте поймем, в чем ваша суперсила для них.\n\n**В чем заключается ваш уникальный метод, подход или 'секретный ингредиент'? Что вы делаете принципиально иначе, чем конкуренты, которых мы обсуждали?**",
      placeholder: "Опишите ваш уникальный подход или метод"
    },
    {
      id: 'business_goal',
      text: "Финальный вопрос для полной картины.\n\n**Какую главную бизнес-задачу вы хотите решить с помощью маркетинга в ближайшие 6-12 месяцев?**",
      placeholder: "Опишите главную бизнес-задачу на 6-12 месяцев"
    }
  ];

  const handleAnswer = (value) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentStep].id]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateStrategyWithClaude();
    }
  };

  // Системный промпт с вашей методологией
  const getSystemPrompt = () => {
    return `# РОЛЬ И ЦЕЛЬ
Ты — «Market Architect AI», элитный стратегический партнер для предпринимателей. Твоя цель — провести глубокую диагностику и разработать целостную, реализуемую маркетинговую стратегию.

# КЛЮЧЕВЫЕ СТРАТЕГИЧЕСКИЕ МОДЕЛИ
Используй эти модели для анализа (НЕ упоминай названия компаний):

## "Надежный Центр Вселенной"
- Принцип: Единая точка входа для всех ключевых задач клиента
- Логика: Максимальная интеграция сервисов, технологическое лидерство
- Коммуникация: Уверенная, стабильная, технологичная

## "Инновационный Лайфстайл-Партнер" 
- Принцип: Победа через лучший цифровой опыт и эмоциональную связь
- Логика: Digital-first подход, лучший UX, полезный контент
- Коммуникация: Дружелюбная, современная, дерзкая

## "Технологическая Экосистема"
- Принцип: Глубокая интеграция множества повседневных сервисов
- Логика: Использование данных, сетевой эффект, центральная подписка
- Коммуникация: Технологичная, но дружелюбная

## "Бренд-Провокатор и Продуктовый Перфекционист"
- Принцип: Победа через сверхсильный бренд и безупречный продукт
- Логика: Максимальная простота продукта + вирусный маркетинг
- Коммуникация: Дерзкая, остроумная, быстрая

# МЕТОДОЛОГИЯ VM6
1. Анализ ЦА: Выявить "Желаемое Будущее" клиента
2. Анализ Конкурентов: Найти "белое пятно"
3. Анализ "Уникального Механизма"
4. Формулирование УТП: "Трансформация + Механизм"
5. Формулирование Позиционирования

# ФОРМУЛА ПОЗИЦИОНИРОВАНИЯ
"Для [ЦА], которые стремятся к [Желаемое Будущее], [Ваш Бренд] — это [Категория], который обеспечивает [Ключевая Ценность] с помощью [Ваш Уникальный Механизм]"

# СТРУКТУРА ОТВЕТА
Всегда используй эту структуру:

## 1. Ключевой Стратегический Инсайт
[Глубокий анализ ситуации + рекомендуемая стратегическая модель]

## 2. Формулировка Позиционирования
[По формуле выше]

## 3. Уникальное Торговое Предложение (УТП)
[Трансформация + Механизм, конкретно и без клише]

## 4. Коммуникационная Стратегия
[2-3 сегмента с каналами, сообщениями и тактиками]

# ПРАВИЛА
- НЕ упоминай названия компаний-прообразов
- Будь конкретным, избегай маркетинговых штампов
- Фокусируйся на реализуемых действиях
- Анализируй глубоко, рекомендуй точно`;
  };

  const generateStrategyWithClaude = async () => {
    setIsAnalyzing(true);
    setError('');

    try {
      // Формируем промпт с ответами пользователя
      const userPrompt = `
Проведи глубокий стратегический анализ на основе следующих данных:

**ПРОДУКТ/УСЛУГА И ОНЛАЙН-ПРИСУТСТВИЕ:**
${answers.product}

**КОНКУРЕНТЫ:**
${answers.competitors}

**ЛУЧШИЕ КЛИЕНТЫ (максимальные результаты):**
${answers.best_clients}

**ПЛАТЯЩИЕ КЛИЕНТЫ (готовы платить без возражений):**
${answers.paying_clients}

**УНИКАЛЬНЫЙ МЕТОД/ПОДХОД:**
${answers.unique_method}

**ГЛАВНАЯ БИЗНЕС-ЗАДАЧА НА 6-12 МЕСЯЦЕВ:**
${answers.business_goal}

Проведи анализ по методологии VM6 и создай целостную стратегию согласно структуре ответа.
`;

      // Здесь будет вызов Claude API
      const response = await callClaudeAPI(getSystemPrompt(), userPrompt);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      setResult(response.content);
      
    } catch (err) {
      console.error('Ошибка при генерации стратегии:', err);
      setError(err.message || 'Произошла ошибка при создании стратегии');
      
      // Fallback на демо-ответ если API не работает
      const demoResult = generateDemoStrategy();
      setResult(demoResult);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Функция для вызова Claude API
  const callClaudeAPI = async (systemPrompt, userPrompt) => {
    const API_KEY = process.env.REACT_APP_CLAUDE_API_KEY;
    
    if (!API_KEY) {
      throw new Error('API ключ Claude не найден. Добавьте REACT_APP_CLAUDE_API_KEY в переменные окружения.');
    }

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 4000,
          system: systemPrompt,
          messages: [
            {
              role: 'user',
              content: userPrompt
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Claude API error: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      return { content: data.content[0].text };
      
    } catch (error) {
      console.error('Claude API call failed:', error);
      return { error: error.message };
    }
  };

  // Демо-ответ для случаев, когда API недоступен
  const generateDemoStrategy = () => {
    return `## 1. Ключевой Стратегический Инсайт

На основе анализа ваших ответов, ваша ключевая возможность — создание сильного экспертного бренда в нише ${answers.product}. 

Ваши лучшие клиенты (${answers.best_clients}) демонстрируют четкий профиль целевой аудитории, готовой инвестировать в качественные решения.

**Рекомендуемая стратегическая модель:** Экспертное позиционирование с фокусом на уникальную методологию.

## 2. Формулировка Позиционирования

"Для ${answers.best_clients}, которые стремятся к ${answers.business_goal}, ваше решение — это экспертная платформа, которая обеспечивает гарантированные результаты с помощью ${answers.unique_method}"

## 3. Уникальное Торговое Предложение (УТП)

Помогаем ${answers.best_clients} достичь ${answers.business_goal} через ${answers.unique_method} за период от 30 до 90 дней с измеримыми результатами и персональным сопровождением.

## 4. Коммуникационная Стратегия

**Первичный сегмент: Готовые платить клиенты**
- Каналы: Прямые рекомендации, нетворкинг, LinkedIn
- Сообщение: Кейсы успеха, ROI, экспертиза
- Тактика: Консультативные продажи, демо-презентации

**Вторичный сегмент: Потенциальные клиенты**
- Каналы: Контент-маркетинг, SEO, социальные сети
- Сообщение: Образовательный контент, инсайты индустрии
- Тактика: Воронка через ценный контент, лид-магниты

**Тактический план на 90 дней:**
1. Создание серии кейсов с результатами
2. Запуск еженедельного экспертного контента
3. Разработка лид-магнита (гайд/чек-лист)
4. Настройка воронки продаж
5. Поиск стратегических партнерств

---

*⚠️ ДЕМО-РЕЖИМ: Для получения персонализированной стратегии настройте Claude API ключ*`;
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult('');
    setError('');
  };

  if (result) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Market Architect AI</h1>
          <p className="text-gray-600">Ваша персональная стратегия готова</p>
        </div>

        {error && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start">
            <AlertCircle className="w-5 h-5 text-amber-600 mr-3 mt-0.5" />
            <div className="text-amber-800 text-sm">
              <strong>Внимание:</strong> {error}
              <p className="mt-1">Показан демо-результат. Настройте Claude API для полной функциональности.</p>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <FileText className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Стратегический Анализ</h2>
          </div>
          <div className="prose max-w-none text-gray-700 whitespace-pre-line">
            {result}
          </div>
        </div>

        <div className="text-center space-x-4">
          <button
            onClick={reset}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Провести новый анализ
          </button>
          
          <button
            onClick={() => {
              const blob = new Blob([result], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'marketing-strategy.txt';
              a.click();
            }}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Скачать стратегию
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white min-h-screen">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Globe className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Market Architect AI</h1>
        </div>
        <p className="text-gray-600">AI-консультант по стратегическому позиционированию</p>
        <p className="text-sm text-gray-500 mt-2">Powered by Claude AI + VM6 Methodology</p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-blue-600">Этап {currentStep + 1} из {questions.length}</span>
          <span className="text-sm text-gray-500">Глубокая диагностика</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex items-start mb-4">
          <MessageSquare className="w-6 h-6 text-blue-600 mr-3 mt-1" />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 mb-2">Market Architect AI</h3>
            <div className="text-gray-700 whitespace-pre-line leading-relaxed">
              {questions[currentStep].text.split('**').map((part, index) => {
                if (index % 2 === 1) {
                  return <strong key={index} className="font-semibold">{part}</strong>;
                }
                return part;
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <textarea
          value={answers[questions[currentStep].id] || ''}
          onChange={(e) => handleAnswer(e.target.value)}
          placeholder={questions[currentStep].placeholder}
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          rows={4}
        />

        <button
          onClick={nextStep}
          disabled={!answers[questions[currentStep].id]?.trim() || isAnalyzing}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {isAnalyzing ? (
            <div className="flex items-center">
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              Создаю стратегию с помощью Claude AI...
            </div>
          ) : currentStep === questions.length - 1 ? (
            <>
              <Target className="w-4 h-4 mr-2" />
              Создать стратегию
            </>
          ) : (
            <>
              Далее
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </button>
      </div>

      {currentStep > 0 && !isAnalyzing && (
        <button
          onClick={() => setCurrentStep(currentStep - 1)}
          className="mt-4 text-blue-600 hover:text-blue-700 text-sm"
        >
          ← Вернуться к предыдущему вопросу
        </button>
      )}

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">
          Для работы требуется API ключ Claude. 
          <br />Настройте REACT_APP_CLAUDE_API_KEY в переменных окружения.
        </p>
      </div>
    </div>
  );
};

export default MarketArchitectAI;
