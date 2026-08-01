import { useTranslation } from "react-i18next";

function Footer() {
    const { t } = useTranslation();

    const currentYear =
        new Date().getFullYear();

    return (
        <footer
            className="
                p-4
                text-center
                text-gray-600
            "
        >
            {t("footer.copyright", {
                year: currentYear,
            })}
        </footer>
    );
}

export default Footer;