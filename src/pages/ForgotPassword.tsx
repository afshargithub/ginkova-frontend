import {
    useState,
    type FormEvent,
} from "react";

import {
    Link,
} from "react-router-dom";

import {
    useTranslation,
} from "react-i18next";

import PasswordInput
    from "../components/common/PasswordInput";

import {
    confirmPasswordReset,
    requestPasswordResetCode,
} from "../services/authService";

import {
    getApiErrorMessage,
} from "../utils/apiError";


export default function ForgotPassword() {

    const { t } =
        useTranslation();


    // --------------------------------------------------
    // Form State
    // --------------------------------------------------

    const [
        phone,
        setPhone,
    ] = useState("");

    const [
        verificationCode,
        setVerificationCode,
    ] = useState("");

    const [
        newPassword,
        setNewPassword,
    ] = useState("");

    const [
        newPasswordConfirm,
        setNewPasswordConfirm,
    ] = useState("");


    // --------------------------------------------------
    // Flow State
    // --------------------------------------------------

    const [
        codeRequested,
        setCodeRequested,
    ] = useState(false);

    const [
        sendingCode,
        setSendingCode,
    ] = useState(false);

    const [
        resettingPassword,
        setResettingPassword,
    ] = useState(false);

    const [
        resetComplete,
        setResetComplete,
    ] = useState(false);


    // --------------------------------------------------
    // Message State
    // --------------------------------------------------

    const [
        error,
        setError,
    ] = useState<string | null>(
        null
    );

    const [
        message,
        setMessage,
    ] = useState<string | null>(
        null
    );


    // --------------------------------------------------
    // Step 1
    // Request Password Reset SMS Code
    // --------------------------------------------------

    async function handleRequestCode(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setError(null);
        setMessage(null);


        const normalizedPhone =
            phone.trim();


        if (!normalizedPhone) {

            setError(
                t(
                    "auth.errors.phoneRequired"
                )
            );

            return;
        }


        setSendingCode(
            true
        );


        try {

            await requestPasswordResetCode(
                normalizedPhone
            );


            setCodeRequested(
                true
            );


            setMessage(
                t(
                    "auth.forgotPassword.codeSent"
                )
            );

        } catch (requestError) {

            setError(
                getApiErrorMessage(
                    requestError,
                    t(
                        "auth.errors.codeRequestFailed"
                    )
                )
            );

        } finally {

            setSendingCode(
                false
            );
        }
    }


    // --------------------------------------------------
    // Resend Password Reset Code
    // --------------------------------------------------

    async function handleResendCode() {

        setError(null);
        setMessage(null);

        setSendingCode(
            true
        );


        try {

            await requestPasswordResetCode(
                phone.trim()
            );


            setMessage(
                t(
                    "auth.forgotPassword.codeResent"
                )
            );

        } catch (requestError) {

            setError(
                getApiErrorMessage(
                    requestError,
                    t(
                        "auth.errors.codeRequestFailed"
                    )
                )
            );

        } finally {

            setSendingCode(
                false
            );
        }
    }


    // --------------------------------------------------
    // Return to Phone Step
    // --------------------------------------------------

    function handleChangePhone() {

        setCodeRequested(
            false
        );

        setVerificationCode(
            ""
        );

        setNewPassword(
            ""
        );

        setNewPasswordConfirm(
            ""
        );

        setError(
            null
        );

        setMessage(
            null
        );
    }


    // --------------------------------------------------
    // Step 2
    // Verify SMS + Reset Password
    // --------------------------------------------------

    async function handleResetPassword(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setError(null);
        setMessage(null);


        if (
            verificationCode.length
            !== 6
        ) {

            setError(
                t(
                    "auth.errors.invalidVerificationCode"
                )
            );

            return;
        }


        if (
            newPassword
            !== newPasswordConfirm
        ) {

            setError(
                t(
                    "auth.errors.passwordMismatch"
                )
            );

            return;
        }


        setResettingPassword(
            true
        );


        try {

            await confirmPasswordReset({
                phone:
                    phone.trim(),

                code:
                    verificationCode,

                new_password:
                    newPassword,

                new_password_confirm:
                    newPasswordConfirm,
            });


            setResetComplete(
                true
            );


            setMessage(
                t(
                    "auth.forgotPassword.resetSuccess"
                )
            );


            setVerificationCode(
                ""
            );

            setNewPassword(
                ""
            );

            setNewPasswordConfirm(
                ""
            );

        } catch (requestError) {

            setError(
                getApiErrorMessage(
                    requestError,
                    t(
                        "auth.errors.passwordResetFailed"
                    )
                )
            );

        } finally {

            setResettingPassword(
                false
            );
        }
    }


    // --------------------------------------------------
    // Password Reset Completed
    // --------------------------------------------------

    if (resetComplete) {

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
                            "auth.forgotPassword.successTitle"
                        )}
                    </h1>


                    <p
                        role="status"
                        className="
                            mt-4
                            rounded-lg
                            bg-green-50
                            p-3
                            text-sm
                            text-green-700
                        "
                    >
                        {message}
                    </p>


                    <Link
                        to="/login"
                        className="
                            mt-6
                            block
                            w-full
                            rounded-lg
                            bg-green-600
                            px-4
                            py-2.5
                            text-center
                            font-medium
                            text-white
                            transition
                            hover:bg-green-700
                        "
                    >
                        {t(
                            "auth.forgotPassword.backToLogin"
                        )}
                    </Link>
                </section>
            </main>
        );
    }


    // --------------------------------------------------
    // Main UI
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
                        "auth.forgotPassword.title"
                    )}
                </h1>


                {/* Description */}
                <p
                    className="
                        mt-2
                        text-sm
                        text-gray-600
                    "
                >
                    {codeRequested
                        ? t(
                            "auth.forgotPassword.verificationSubtitle"
                        )
                        : t(
                            "auth.forgotPassword.subtitle"
                        )
                    }
                </p>


                {/* ------------------------------------------
                    STEP 1
                    Enter Mobile Number
                ------------------------------------------ */}

                {!codeRequested && (
                    <form
                        onSubmit={
                            handleRequestCode
                        }
                        className="
                            mt-6
                            space-y-5
                        "
                    >
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
                            disabled={
                                sendingCode
                            }
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
                            {sendingCode
                                ? t(
                                    "auth.forgotPassword.sendingCode"
                                )
                                : t(
                                    "auth.forgotPassword.sendCode"
                                )
                            }
                        </button>
                    </form>
                )}


                {/* ------------------------------------------
                    STEP 2
                    OTP + New Password
                ------------------------------------------ */}

                {codeRequested && (
                    <form
                        onSubmit={
                            handleResetPassword
                        }
                        className="
                            mt-6
                            space-y-5
                        "
                    >
                        {/* Phone */}
                        <div>
                            <label
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


                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                "
                            >
                                <input
                                    type="tel"
                                    value={phone}
                                    readOnly
                                    dir="ltr"
                                    className="
                                        w-full
                                        rounded-lg
                                        border
                                        border-gray-200
                                        bg-gray-50
                                        px-3
                                        py-2
                                        text-gray-700
                                    "
                                />


                                <button
                                    type="button"
                                    onClick={
                                        handleChangePhone
                                    }
                                    className="
                                        whitespace-nowrap
                                        text-sm
                                        font-medium
                                        text-green-700
                                        hover:underline
                                    "
                                >
                                    {t(
                                        "auth.forgotPassword.changePhone"
                                    )}
                                </button>
                            </div>
                        </div>


                        {/* Verification Code */}
                        <div>
                            <label
                                htmlFor="verification-code"
                                className="
                                    mb-1
                                    block
                                    text-sm
                                    font-medium
                                "
                            >
                                {t(
                                    "auth.common.verificationCode"
                                )}
                            </label>


                            <input
                                id="verification-code"
                                name="verification-code"
                                type="text"
                                required
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                dir="ltr"
                                maxLength={6}
                                placeholder="123456"
                                value={
                                    verificationCode
                                }
                                onChange={
                                    (event) => {

                                        const digitsOnly =
                                            event.target.value
                                                .replace(
                                                    /\D/g,
                                                    ""
                                                )
                                                .slice(
                                                    0,
                                                    6
                                                );

                                        setVerificationCode(
                                            digitsOnly
                                        );
                                    }
                                }
                                className="
                                    w-full
                                    rounded-lg
                                    border
                                    border-gray-300
                                    px-3
                                    py-2
                                    tracking-widest
                                    outline-none
                                    transition
                                    focus:border-green-600
                                "
                            />


                            <button
                                type="button"
                                disabled={
                                    sendingCode
                                }
                                onClick={
                                    handleResendCode
                                }
                                className="
                                    mt-2
                                    text-sm
                                    font-medium
                                    text-green-700
                                    hover:underline
                                    disabled:cursor-not-allowed
                                    disabled:opacity-60
                                "
                            >
                                {sendingCode
                                    ? t(
                                        "auth.forgotPassword.sendingCode"
                                    )
                                    : t(
                                        "auth.forgotPassword.resendCode"
                                    )
                                }
                            </button>
                        </div>


                        {/* New Password */}
                        <PasswordInput
                            id="new-password"
                            label={
                                t(
                                    "auth.common.newPassword"
                                )
                            }
                            value={
                                newPassword
                            }
                            onChange={
                                setNewPassword
                            }
                            autoComplete="new-password"
                        />


                        {/* Confirm New Password */}
                        <PasswordInput
                            id="new-password-confirm"
                            label={
                                t(
                                    "auth.common.confirmPassword"
                                )
                            }
                            value={
                                newPasswordConfirm
                            }
                            onChange={
                                setNewPasswordConfirm
                            }
                            autoComplete="new-password"
                        />


                        {/* Success Message */}
                        {message && (
                            <p
                                role="status"
                                className="
                                    rounded-lg
                                    bg-green-50
                                    p-3
                                    text-sm
                                    text-green-700
                                "
                            >
                                {message}
                            </p>
                        )}


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


                        {/* Reset Password */}
                        <button
                            type="submit"
                            disabled={
                                resettingPassword
                            }
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
                            {resettingPassword
                                ? t(
                                    "auth.forgotPassword.resetting"
                                )
                                : t(
                                    "auth.forgotPassword.reset"
                                )
                            }
                        </button>
                    </form>
                )}


                {/* Login Link */}
                <p
                    className="
                        mt-6
                        text-center
                        text-sm
                        text-gray-600
                    "
                >
                    <Link
                        to="/login"
                        className="
                            font-medium
                            text-green-700
                            underline
                        "
                    >
                        {t(
                            "auth.forgotPassword.backToLogin"
                        )}
                    </Link>
                </p>
            </section>
        </main>
    );
}