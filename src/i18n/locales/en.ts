const en = {
    language: {
        label: "Language",
        english: "English",
        persian: "فارسی",
        armenian: "Հայերեն",
        russian: "Русский",
    },

    navigation: {
        home: "Home",
        meals: "Meals",
        about: "About",

        login: "Login",
        register: "Register",
        logout: "Logout",

        myAccount: "My Account",
    },

    footer: {
        copyright:
            "GINKOVA © {{year}}",
    },

    hero: {
        badge:
            "Smart nutrition with GINKOVA",

        titleFirstLine:
            "Healthy Food.",

        titleSecondLine:
            "Personalized by AI.",

        description:
            "Discover meals designed for your health goals, nutritional needs and lifestyle.",

        action:
            "Explore Meals",

        imageAlt:
            "Healthy meals presented by GINKOVA",
    },

    homeSection: {
        badge:
            "Meal categories",

        title:
            "Explore meal categories",

        description:
            "Select a category to discover meals suitable for your needs.",
    },

    categories: {
        loading:
            "Loading meal categories...",

        error:
            "Unable to load meal categories.",

        empty:
            "No meal categories found.",
    },

    categoryCard: {
        action:
            "Explore Meals",

        imageAlt:
            "{{name}} meal category",
    },

    mealsPage: {
        badge:
            "GINKOVA meals",

        title:
            "Meals",

        description:
            "Discover meals available in this category.",

        categoryNotFound:
            "Category not found.",
    },

    meals: {
        loading:
            "Loading meals...",

        error:
            "Unable to load meals.",

        empty:
            "No meals found in this category.",
    },

    mealCard: {
        viewDetails:
            "View Details",

        order:
            "Order",

        nutrition: {
            calories:
                "Calories",

            protein:
                "Protein",

            carbohydrate:
                "Carbohydrate",

            fat:
                "Fat",

            fiber:
                "Fiber",

            sugar:
                "Sugar",

            sodium:
                "Sodium",
        },
    },

    healthGoalsSection: {
        badge:
            "Health goals",

        title:
            "Choose your health goal",

        description:
            "Select a health goal to receive meals and nutrition recommendations suited to your needs.",
    },

    healthGoals: {
        loading:
            "Loading health goals...",

        error:
            "Unable to load health goals.",

        empty:
            "No health goals found.",
    },

    // --------------------------------------------------
    // Authentication
    // --------------------------------------------------

    auth: {
        common: {
            phone:
                "Mobile number",

            verificationCode:
                "Verification code",

            firstName:
                "First name",

            lastName:
                "Last name",

            password:
                "Password",

            confirmPassword:
                "Confirm password",

            newPassword:
                "New password",

            showPassword:
                "Show password",

            hidePassword:
                "Hide password",

            optional:
                "optional",
        },

        // --------------------------------------------------
        // Login
        // --------------------------------------------------

        login: {
            title:
                "Sign in to GINKOVA",

            subtitle:
                "Enter your mobile number and password to continue.",

            submit:
                "Sign in",

            submitting:
                "Signing in...",

            forgotPassword:
                "Forgot password?",

            noAccount:
                "Don't have an account?",

            registerLink:
                "Register",
        },

        // --------------------------------------------------
        // Registration
        // --------------------------------------------------

        register: {
            title:
                "Create your GINKOVA account",

            subtitle:
                "Enter your mobile number to receive a verification code.",

            verificationSubtitle:
                "Enter the verification code and complete your account information.",

            sendCode:
                "Send verification code",

            sendingCode:
                "Sending code...",

            resendCode:
                "Resend verification code",

            changePhone:
                "Change number",

            codeSent:
                "A verification code has been sent.",

            codeResent:
                "A new verification code has been sent.",

            submit:
                "Create account",

            submitting:
                "Creating account...",

            haveAccount:
                "Already have an account?",

            loginLink:
                "Sign in",
        },

        // --------------------------------------------------
        // Forgot Password
        // --------------------------------------------------

        forgotPassword: {
            title:
                "Forgot password",

            subtitle:
                "Enter your mobile number to receive a password reset verification code.",

            verificationSubtitle:
                "Enter the verification code and choose a new password.",

            sendCode:
                "Send verification code",

            sendingCode:
                "Sending code...",

            resendCode:
                "Resend verification code",

            changePhone:
                "Change number",

            codeSent:
                "If an eligible account exists, a verification code has been sent.",

            codeResent:
                "A new verification code has been requested.",

            reset:
                "Reset password",

            resetting:
                "Resetting password...",

            resetSuccess:
                "Your password has been changed successfully.",

            successTitle:
                "Password changed",

            backToLogin:
                "Back to login",
        },

        // --------------------------------------------------
        // Authentication Errors
        // --------------------------------------------------

        errors: {
            loginFailed:
                "Unable to sign in. Check your mobile number and password.",

            registrationFailed:
                "Unable to create the account.",

            passwordMismatch:
                "The passwords do not match.",

            phoneRequired:
                "Mobile number is required.",

            codeRequestFailed:
                "Unable to request a verification code.",

            invalidVerificationCode:
                "The verification code must contain exactly 6 digits.",

            passwordResetFailed:
                "Unable to reset the password.",
        },
    },
};

export default en;