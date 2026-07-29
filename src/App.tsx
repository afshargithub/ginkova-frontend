import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Meals from "./pages/Meals";

// <Layout>
//     <Home />
// </Layout>

function App() {

    return (

        <BrowserRouter>

            <Layout>

                <Routes>

                    <Route
                        path="/"
                        element={<Home />}
                    />


                    <Route
                        path="/meals/category/:categoryId"
                        element={<Meals />}
                    />


                </Routes>

            </Layout>

        </BrowserRouter>

    );

}

export default App;