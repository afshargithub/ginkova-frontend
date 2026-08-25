import {
    useState,
    type FormEvent,
} from "react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import {
    useTranslation,
} from "react-i18next";

import {
    useAuth,
} from "../hooks/useAuth";

import {
    getStoredLanguage,
} from "../i18n/language";

import {
    getApiErrorMessage,
} from "../utils/apiError";

import type {
    RegisterPayload,
} from "../types/auth";


export default function Register() {

    const { t } = useTranslation();
    
    const { registerUser, } = useAuth();
    
    const navigate = useNavigate();

    const [
        username,
        setUsername,
    ] = useState("");

    const [
        email,
        setEmail,
    ] = useState("");

    const [
        firstName,
        setFirstName,
    ] = useState("");

    const [
        lastName,
        setLastName,
    ] = useState("");

    const [
        password,
        setPassword,
    ] = useState("");

    const [
        passwordConfirm,
        setPasswordConfirm,
    ] = useState("");

    const [
        loading,
        setLoading,
    ] = useState(false);

    const [
        error,
        setError,
    ] = useState<string | null>(
        null
    );


    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setError(null);

        if (
            password
            !== passwordConfirm
        ) {
            setError(
                t(
                    "auth.errors.passwordMismatch"
                )
            );

            return;
        }

        setLoading(true);

        try {
            const payload: RegisterPayload = {
                username: username.trim(),

                password,

                password_confirm: passwordConfirm,

                language:
                    getStoredLanguage() as RegisterPayload["language"],
            };
            if (email.trim()) {
                payload.email =
                    email.trim();
            }

            if (firstName.trim()) {
                payload.first_name =
                    firstName.trim();
            }

            if (lastName.trim()) {
                payload.last_name =
                    lastName.trim();
            }

            await registerUser(
                payload
            );

            navigate(
                "/",
                {
                    replace: true,
                }
            );

        } catch (requestError) {

            setError(
                getApiErrorMessage(
                    requestError,
                    t(
                        "auth.errors.registrationFailed"
                    )
                )
            );

        } finally {
            setLoading(false);
        }
    }


    return (
        <main
            className="
                mx-auto
                max-w-lg
                px-4
                py-12
            "
        >
            <section
                className="
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    p-6
                    shadow-sm
                "
            >
                <h1
                    className="
                        text-2xl
                        font-bold
                    "
                >
                    {t(
                        "auth.register.title"
                    )}
                </h1>

                <p
                    className="
                        mt-2
                        text-sm
                        text-gray-600
                    "
                >
                    {t(
                        "auth.register.subtitle"
                    )}
                </p>

                <form
                    onSubmit={
                        handleSubmit
                    }
                    className="
                        mt-6
                        space-y-5
                    "
                >
                    <div>
                        <label
                            htmlFor="username"
                            className="
                                mb-1
                                block
                                text-sm
                                font-medium
                            "
                        >
                            {t(
                                "auth.common.username"
                            )}
                        </label>

                        <input
                            id="username"
                            type="text"
                            required
                            autoComplete="username"
                            dir="ltr"
                            value={username}
                            onChange={
                                (event) =>
                                    setUsername(
                                        event.target.value
                                    )
                            }
                            className="
                                w-full
                                rounded-lg
                                border
                                border-gray-300
                                px-3
                                py-2
                            "
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="
                                mb-1
                                block
                                text-sm
                                font-medium
                            "
                        >
                            {t(
                                "auth.common.email"
                            )}{" "}

                            <span
                                className="
                                    text-gray-400
                                "
                            >
                                (
                                {t(
                                    "auth.common.optional"
                                )}
                                )
                            </span>
                        </label>

                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            dir="ltr"
                            value={email}
                            onChange={
                                (event) =>
                                    setEmail(
                                        event.target.value
                                    )
                            }
                            className="
                                w-full
                                rounded-lg
                                border
                                border-gray-300
                                px-3
                                py-2
                            "
                        />
                    </div>

                    <div
                        className="
                            grid
                            gap-4
                            sm:grid-cols-2
                        "
                    >
                        <div>
                            <label
                                htmlFor="first-name"
                                className="
                                    mb-1
                                    block
                                    text-sm
                                    font-medium
                                "
                            >
                                {t(
                                    "auth.common.firstName"
                                )}
                            </label>

                            <input
                                id="first-name"
                                type="text"
                                autoComplete="given-name"
                                value={firstName}
                                onChange={
                                    (event) =>
                                        setFirstName(
                                            event.target.value
                                        )
                                }
                                className="
                                    w-full
                                    rounded-lg
                                    border
                                    border-gray-300
                                    px-3
                                    py-2
                                "
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="last-name"
                                className="
                                    mb-1
                                    block
                                    text-sm
                                    font-medium
                                "
                            >
                                {t(
                                    "auth.common.lastName"
                                )}
                            </label>

                            <input
                                id="last-name"
                                type="text"
                                autoComplete="family-name"
                                value={lastName}
                                onChange={
                                    (event) =>
                                        setLastName(
                                            event.target.value
                                        )
                                }
                                className="
                                    w-full
                                    rounded-lg
                                    border
                                    border-gray-300
                                    px-3
                                    py-2
                                "
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="
                                mb-1
                                block
                                text-sm
                                font-medium
                            "
                        >
                            {t(
                                "auth.common.password"
                            )}
                        </label>

                        <input
                            id="password"
                            type="password"
                            required
                            autoComplete="new-password"
                            dir="ltr"
                            value={password}
                            onChange={
                                (event) =>
                                    setPassword(
                                        event.target.value
                                    )
                            }
                            className="
                                w-full
                                rounded-lg
                                border
                                border-gray-300
                                px-3
                                py-2
                            "
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password-confirm"
                            className="
                                mb-1
                                block
                                text-sm
                                font-medium
                            "
                        >
                            {t(
                                "auth.common.confirmPassword"
                            )}
                        </label>

                        <input
                            id="password-confirm"
                            type="password"
                            required
                            autoComplete="new-password"
                            dir="ltr"
                            value={passwordConfirm}
                            onChange={
                                (event) =>
                                    setPasswordConfirm(
                                        event.target.value
                                    )
                            }
                            className="
                                w-full
                                rounded-lg
                                border
                                border-gray-300
                                px-3
                                py-2
                            "
                        />
                    </div>

                    {error && (
                        <p
                            role="alert"
                            className="
                                rounded-lg
                                bg-red-50
                                p-3
                                text-sm
                                text-red-700
                            "
                        >
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            rounded-lg
                            bg-black
                            px-4
                            py-2.5
                            font-medium
                            text-white
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    >
                        {loading
                            ? t(
                                "auth.register.submitting"
                            )
                            : t(
                                "auth.register.submit"
                            )
                        }
                    </button>
                </form>

                <p
                    className="
                        mt-6
                        text-center
                        text-sm
                        text-gray-600
                    "
                >
                    {t(
                        "auth.register.haveAccount"
                    )}{" "}

                    <Link
                        to="/login"
                        className="
                            font-medium
                            underline
                        "
                    >
                        {t(
                            "auth.register.loginLink"
                        )}
                    </Link>
                </p>
            </section>
        </main>
    );
}