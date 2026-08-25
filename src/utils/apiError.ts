import axios from "axios";


export function getApiErrorMessage(
    error: unknown,
    fallbackMessage: string
): string {

    if (!axios.isAxiosError(error)) {
        return fallbackMessage;
    }

    const data = error.response?.data;

    if (typeof data === "string") {
        return data;
    }

    if (
        !data
        || typeof data !== "object"
    ) {
        return fallbackMessage;
    }

    const errorData =
        data as Record<string, unknown>;

    const detail = errorData.detail;

    if (typeof detail === "string") {
        return detail;
    }

    for (const value of Object.values(
        errorData
    )) {
        if (typeof value === "string") {
            return value;
        }

        if (
            Array.isArray(value)
            && value.length > 0
        ) {
            const firstMessage = value[0];

            if (
                typeof firstMessage === "string"
            ) {
                return firstMessage;
            }
        }
    }

    return fallbackMessage;
}