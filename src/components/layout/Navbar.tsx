import {
    Link,
    useNavigate,
} from "react-router-dom";

import {
    useTranslation,
} from "react-i18next";

import LanguageSwitcher
    from "../common/LanguageSwitcher";

import {
    useAuth,
} from "../../hooks/useAuth";


function Navbar() {

    const { t } =
        useTranslation();

    const {
        user,
        isAuthenticated,
        loading,
        logoutUser,
    } = useAuth();

    const navigate =
        useNavigate();


    async function handleLogout() {

        await logoutUser();

        navigate(
            "/",
            {
                replace: true,
            }
        );
    }


    return (
        <nav className="bg-white shadow-md">
            <div
                className="
                    mx-auto
                    flex
                    max-w-7xl
                    flex-wrap
                    items-center
                    justify-between
                    gap-4
                    p-4
                "
            >
                {/* Logo */}
                <Link
                    to="/"
                    className="
                        text-2xl
                        font-bold
                        text-green-700
                    "
                >
                    GINKOVA
                </Link>


                {/* Main Navigation */}
                <div
                    className="
                        flex
                        flex-wrap
                        items-center
                        gap-6
                        md:gap-8
                    "
                >
                    <Link
                        to="/"
                        className="
                            transition
                            hover:text-green-700
                        "
                    >
                        {t(
                            "navigation.home"
                        )}
                    </Link>

                    <a
                        href="/#meal-categories"
                        className="
                            transition
                            hover:text-green-700
                        "
                    >
                        {t(
                            "navigation.meals"
                        )}
                    </a>

                    <a
                        href="#"
                        className="
                            transition
                            hover:text-green-700
                        "
                    >
                        {t(
                            "navigation.about"
                        )}
                    </a>
                </div>


                {/* Language + Authentication */}
                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >
                    <LanguageSwitcher />


                    {!loading && (
                        <>
                            {isAuthenticated && user ? (
                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                    "
                                >
                                    <span
                                        className="
                                            text-sm
                                            font-medium
                                            text-gray-700
                                        "
                                    >
                                        {user.first_name
                                            || user.username}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={
                                            handleLogout
                                        }
                                        className="
                                            rounded-lg
                                            border
                                            border-green-600
                                            px-4
                                            py-2
                                            text-sm
                                            font-medium
                                            text-green-700
                                            transition
                                            hover:bg-green-50
                                        "
                                    >
                                        {t(
                                            "navigation.logout"
                                        )}
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    className="
                                        rounded-lg
                                        bg-green-600
                                        px-4
                                        py-2
                                        text-sm
                                        font-medium
                                        text-white
                                        transition
                                        hover:bg-green-700
                                    "
                                >
                                    {t(
                                        "navigation.login"
                                    )}
                                </Link>
                            )}
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}


export default Navbar;