const ru = {
    language: {
        label: "Язык",
        english: "English",
        persian: "فارسی",
        armenian: "Հայերեն",
        russian: "Русский",
    },

    navigation: {
        home: "Главная",
        meals: "Блюда",
        about: "О нас",
        login: "Войти",
        register: "Регистрация",
        logout: "Выйти",
    },

    footer: {
        copyright: "GINKOVA © {{year}}",
    },

    hero: {
        badge: "Умное питание с GINKOVA",
        titleFirstLine: "Здоровая еда.",
        titleSecondLine:
            "Персонализация с помощью ИИ.",
        description:
            "Откройте для себя блюда, соответствующие вашим целям здоровья, пищевым потребностям и образу жизни.",
        action: "Посмотреть блюда",
        imageAlt:
            "Здоровые блюда, представленные GINKOVA",
    },

    homeSection: {
        badge: "Категории блюд",
        title: "Изучите категории блюд",
        description:
            "Выберите категорию, чтобы найти блюда, подходящие вашим потребностям.",
    },

    categories: {
        loading:
            "Загрузка категорий блюд...",
        error:
            "Не удалось загрузить категории блюд.",
        empty:
            "Категории блюд не найдены.",
    },

    categoryCard: {
        action: "Посмотреть блюда",
        imageAlt:
            "Категория блюд «{{name}}»",
    },

    mealsPage: {
        badge: "Блюда GINKOVA",
        title: "Блюда",
        description:
            "Откройте для себя блюда этой категории.",
        categoryNotFound:
            "Категория не найдена.",
    },

    meals: {
        loading: "Загрузка блюд...",
        error:
            "Не удалось загрузить блюда.",
        empty:
            "В этой категории блюда не найдены.",
    },

    mealCard: {
        viewDetails: "Подробнее",
        order: "Заказать",

        nutrition: {
            calories: "Калории",
            protein: "Белок",
            carbohydrate: "Углеводы",
            fat: "Жиры",
            fiber: "Клетчатка",
            sugar: "Сахар",
            sodium: "Натрий",
        },
    },


    healthGoalsSection: {
        badge: "Цели здоровья",
        title:
            "Выберите свою цель здоровья",
        description:
            "Выберите цель здоровья, чтобы получать блюда и рекомендации по питанию, соответствующие вашим потребностям.",
    },

    healthGoals: {
        loading:
            "Загрузка целей здоровья...",
        error:
            "Не удалось загрузить цели здоровья.",
        empty:
            "Цели здоровья не найдены.",
    },

    auth: {
        common: {
            username: "Имя пользователя",
            email: "Электронная почта",
            firstName: "Имя",
            lastName: "Фамилия",
            password: "Пароль",
            confirmPassword:
                "Подтвердите пароль",
            optional: "необязательно",
        },

        login: {
            title: "Вход в GINKOVA",
            subtitle:
                "Войдите в свою учетную запись, чтобы продолжить.",
            submit: "Войти",
            submitting: "Вход...",
            noAccount:
                "У вас еще нет учетной записи?",
            registerLink: "Регистрация",
        },

        register: {
            title: "Создать учетную запись GINKOVA",
            subtitle:
                "Введите свои данные для создания учетной записи.",
            submit: "Создать учетную запись",
            submitting:
                "Создание учетной записи...",
            haveAccount:
                "Уже есть учетная запись?",
            loginLink: "Войти",
        },

        errors: {
            loginFailed:
                "Не удалось войти.",
            registrationFailed:
                "Не удалось создать учетную запись.",
            passwordMismatch:
                "Пароли не совпадают.",
        },
    },
};

export default ru;