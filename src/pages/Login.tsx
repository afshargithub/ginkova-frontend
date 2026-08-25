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
    getApiErrorMessage,
} from "../utils/apiError";


export default function Login() {

    const { loginUser, } = useAuth();

    const { t } = useTranslation();

    const navigate = useNavigate();

    const [
        username,
        setUsername,
    ] = useState("");

    const [
        password,
        setPassword,
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
        setLoading(true);

        try {
            await loginUser({
                username:
                    username.trim(),
                password,
            });
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
                        "auth.errors.loginFailed"
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
                flex
                min-h-[70vh]
                max-w-md
                items-center
                px-4
                py-12
            "
        >
            <section
                className="
                    w-full
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
                        "auth.login.title"
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
                        "auth.login.subtitle"
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
                            name="username"
                            type="text"
                            required
                            autoComplete="username"
                            dir="ltr"
                            value={username}
                            onChange={
                                (event) =>
                                    setUsername(
                                        event
                                            .target
                                            .value
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
                                focus:border-gray-500
                            "
                        />
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
                            name="password"
                            type="password"
                            required
                            autoComplete="current-password"
                            dir="ltr"
                            value={password}
                            onChange={
                                (event) =>
                                    setPassword(
                                        event
                                            .target
                                            .value
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
                                focus:border-gray-500
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
                                "auth.login.submitting"
                            )
                            : t(
                                "auth.login.submit"
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
                        "auth.login.noAccount"
                    )}{" "}

                    <Link
                        to="/register"
                        className="
                            font-medium
                            underline
                        "
                    >
                        {t(
                            "auth.login.registerLink"
                        )}
                    </Link>
                </p>
            </section>
        </main>
    );
}