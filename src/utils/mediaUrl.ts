const apiBaseUrl = import.meta.env
    .VITE_API_BASE_URL as string | undefined;

function getBackendOrigin(): string {
    if (!apiBaseUrl) {
        return "";
    }

    try {
        return new URL(apiBaseUrl).origin;
    } catch {
        return "";
    }
}

const backendOrigin = getBackendOrigin();

export function resolveMediaUrl(
    value?: string | null
): string | null {
    if (!value) {
        return null;
    }

    if (
        value.startsWith("http://") ||
        value.startsWith("https://") ||
        value.startsWith("data:") ||
        value.startsWith("blob:")
    ) {
        return value;
    }

    if (!backendOrigin) {
        return value;
    }

    try {
        return new URL(
            value,
            `${backendOrigin}/`
        ).toString();
    } catch {
        return value;
    }
}