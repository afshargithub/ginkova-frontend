function Navbar() {

    return (

        <nav className="bg-white shadow-md">

            <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

                {/* Logo */}

                <div className="text-2xl font-bold text-green-700">

                    GINKOVA

                </div>


                {/* Menu */}

                <div className="flex gap-8">

                    <a href="#">Home</a>

                    <a href="#">Meals</a>

                    <a href="#">About</a>

                </div>


                {/* Login */}

                <button
                    className="bg-green-600
                               text-white
                               px-4
                               py-2
                               rounded-lg">

                    Login

                </button>

            </div>

        </nav>

    );

}

export default Navbar;