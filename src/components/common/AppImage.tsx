import {
    useEffect,
    useState,
    type ImgHTMLAttributes,
} from "react";

type AppImageProps = Omit<
    ImgHTMLAttributes<HTMLImageElement>,
    "src" | "onError"
> & {
    src?: string | null;
    fallbackSrc: string;
};

export default function AppImage({
    src,
    fallbackSrc,
    alt,
    loading = "lazy",
    className,
    ...rest
}: AppImageProps) {
    const [currentSrc, setCurrentSrc] = useState(
        src || fallbackSrc
    );

    useEffect(() => {
        setCurrentSrc(src || fallbackSrc);
    }, [src, fallbackSrc]);

    function handleImageError() {
        if (currentSrc !== fallbackSrc) {
            setCurrentSrc(fallbackSrc);
        }
    }

    return (
        <img
            src={currentSrc}
            alt={alt}
            loading={loading}
            decoding="async"
            className={className}
            onError={handleImageError}
            {...rest}
        />
    );
}