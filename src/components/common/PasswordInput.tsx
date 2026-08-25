import {
    useState,
} from "react";

import {
    useTranslation,
} from "react-i18next";


interface PasswordInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    autoComplete:
        | "current-password"
        | "new-password";
    required?: boolean;
}


export default function PasswordInput({
    id,
    label,
    value,
    onChange,
    autoComplete,
    required = true,
}: PasswordInputProps) {

    const { t } = useTranslation();

    const [
        showPassword,
        setShowPassword,
    ] = useState(false);


    return (
        <div>
            <label
                htmlFor={id}
                className="
                    mb-1
                    block
                    text-sm
                    font-medium
                "
            >
                {label}
            </label>

            <div className="relative">
                <input
                    id={id}
                    name={id}
                    type={
                        showPassword
                            ? "text"
                            : "password"
                    }
                    required={required}
                    autoComplete={
                        autoComplete
                    }
                    dir="ltr"
                    value={value}
                    onChange={
                        (event) =>
                            onChange(
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
                        pe-11
                        outline-none
                        focus:border-green-600
                    "
                />

                <button
                    type="button"
                    onClick={() =>
                        setShowPassword(
                            (current) =>
                                !current
                        )
                    }
                    aria-label={
                        showPassword
                            ? t(
                                "auth.common.hidePassword"
                            )
                            : t(
                                "auth.common.showPassword"
                            )
                    }
                    aria-pressed={
                        showPassword
                    }
                    className="
                        absolute
                        inset-y-0
                        end-0
                        flex
                        items-center
                        px-3
                        text-gray-500
                        transition
                        hover:text-green-700
                    "
                >
                    {showPassword ? (
                        /*
                         * Eye with slash:
                         * password is currently visible.
                         */
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-5 w-5"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="
                                    M2.25 12
                                    s3.75-6.75
                                    9.75-6.75
                                    S21.75 12
                                    21.75 12
                                    18 18.75
                                    12 18.75
                                    2.25 12
                                    2.25 12Z
                                "
                            />

                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="
                                    M15 12
                                    a3 3 0 1 1
                                    -6 0
                                    3 3 0 0 1
                                    6 0Z
                                "
                            />

                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m4 4 16 16"
                            />
                        </svg>
                    ) : (
                        /*
                         * Normal eye:
                         * password is currently hidden.
                         */
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-5 w-5"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="
                                    M2.25 12
                                    s3.75-6.75
                                    9.75-6.75
                                    S21.75 12
                                    21.75 12
                                    18 18.75
                                    12 18.75
                                    2.25 12
                                    2.25 12Z
                                "
                            />

                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="
                                    M15 12
                                    a3 3 0 1 1
                                    -6 0
                                    3 3 0 0 1
                                    6 0Z
                                "
                            />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}