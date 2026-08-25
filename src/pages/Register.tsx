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

import PasswordInput
    from "../components/common/PasswordInput";

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

    const { t } =
        useTranslation();

    const navigate =
        useNavigate();

    const {
        registerUser,
    } = useAuth();


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
                username:
                    username.trim(),

                password,

                password_confirm:
                    passwordConfirm,

                language: getStoredLanguage() as RegisterPayload["language"],
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
                    {/* Username */}
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
                            name="username"
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
                                outline-none
                                focus:border-green-600
                            "
                        />
                    </div>


                    {/* Email */}
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
                            name="email"
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
                                outline-none
                                focus:border-green-600
                            "
                        />
                    </div>


                    {/* First Name + Last Name */}
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
                                name="first-name"
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
                                    outline-none
                                    focus:border-green-600
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
                                name="last-name"
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
                                    outline-none
                                    focus:border-green-600
                                "
                            />
                        </div>
                    </div>


                    {/* Password */}
                    <PasswordInput
                        id="password"
                        label={
                            t(
                                "auth.common.password"
                            )
                        }
                        value={password}
                        onChange={
                            setPassword
                        }
                        autoComplete="new-password"
                    />


                    {/* Confirm Password */}
                    <PasswordInput
                        id="password-confirm"
                        label={
                            t(
                                "auth.common.confirmPassword"
                            )
                        }
                        value={
                            passwordConfirm
                        }
                        onChange={
                            setPasswordConfirm
                        }
                        autoComplete="new-password"
                    />


                    {/* Error */}
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


                    {/* Register Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            rounded-lg
                            bg-green-600
                            px-4
                            py-2.5
                            font-medium
                            text-white
                            transition
                            hover:bg-green-700
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


                {/* Login Link */}
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
                            text-green-700
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