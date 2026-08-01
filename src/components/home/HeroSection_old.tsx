function HeroSection() {

    return (

        <section className="py-16 px-4">

            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">


                {/* Text */}

                <div>

                    <h1 className="text-4xl md:text-5xl font-bold text-green-700">

                        Healthy Food.
                        <br />
                        Personalized by AI.

                    </h1>


                    <p className="mt-6 text-gray-600 text-lg">

                        Discover meals designed for your
                        health goals and lifestyle.

                    </p>


                    <button
                        className="
                        mt-8
                        bg-green-600
                        text-white
                        px-8
                        py-3
                        rounded-xl
                        hover:bg-green-700">

                        Explore Meals

                    </button>


                </div>



                {/* Image placeholder */}

                <div className="flex justify-center">


                    <div className="
                        w-72
                        h-72
                        bg-green-100
                        rounded-3xl
                        flex
                        items-center
                        justify-center">

                        Food Image

                    </div>


                </div>


            </div>

        </section>

    );

}


export default HeroSection;