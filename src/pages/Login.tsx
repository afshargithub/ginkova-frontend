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
    getApiErrorMessage,
} from "../utils/apiError";


export default function Login() {

    const { t } =
        useTranslation();

    const navigate =
        useNavigate();

    const {
        loginUser,
    } = useAuth();


    // --------------------------------------------------
    // Form State
    // --------------------------------------------------

    const [
        phone,
        setPhone,
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


    // --------------------------------------------------
    // Submit Login
    // --------------------------------------------------

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setError(null);
        setLoading(true);

        try {

            await loginUser({
                phone:
                    phone.trim(),

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


    // --------------------------------------------------
    // UI
    // --------------------------------------------------

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
                {/* Title */}
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


                {/* Subtitle */}
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
                    {/* Mobile Number */}
                    <div>
                        <label
                            htmlFor="phone"
                            className="
                                mb-1
                                block
                                text-sm
                                font-medium
                            "
                        >
                            {t(
                                "auth.common.phone"
                            )}
                        </label>

                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            autoComplete="tel"
                            dir="ltr"
                            placeholder="+37493123456"
                            value={phone}
                            onChange={
                                (event) =>
                                    setPhone(
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
                                transition
                                focus:border-green-600
                            "
                        />
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
                        autoComplete="current-password"
                    />


                    {/* Forgot Password */}
                    <div
                        className="
                            flex
                            justify-end
                        "
                    >
                        <Link
                            to="/forgot-password"
                            className="
                                text-sm
                                font-medium
                                text-green-700
                                transition
                                hover:underline
                            "
                        >
                            {t(
                                "auth.login.forgotPassword"
                            )}
                        </Link>
                    </div>


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


                    {/* Login Button */}
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
                                "auth.login.submitting"
                            )
                            : t(
                                "auth.login.submit"
                            )
                        }
                    </button>
                </form>


                {/* Registration Link */}
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
                            text-green-700
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