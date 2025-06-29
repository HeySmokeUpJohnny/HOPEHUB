import './App.css'
import HomePage from "./pages/HomePage.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import Basket from "./pages/Basket.jsx";
import Layout from "./layout/Layout.jsx";
import {routes} from "./routes/Routes.js"
import {AuthProvider} from "./context/AuthContext.jsx";
import ProtectedRoute from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";
import Register from "./pages/Auth/Register.jsx";
import AdminPanelHome from "./pages/AdminPanel/AdminPanelHome.jsx";
import AddProductToStore from "./pages/AdminPanel/AddProductToStorePage.jsx";
import Payment from "./pages/Payment.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import Orders from "./pages/Orders.jsx";
import Donation from "./pages/Donation.jsx";

function App() {


    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>

                        <Route path={routes.Login} element={
                            <GuestRoute>
                                <Login/>
                            </GuestRoute>
                        }
                        >
                        </Route>
                        <Route element={<Layout/>}>
                            <Route path={routes.Register} element={<Register/>}/>
                            <Route path={routes.HomePage} element={<HomePage/>}></Route>
                            <Route path="/Basket" element={<Basket/>}></Route>
                            <Route path={routes.AdminPanelHome} element={<AdminPanelHome/>}></Route>
                            <Route path={routes.AddProductToStore} element={<AddProductToStore/>}></Route>
                            <Route path={routes.Payment} element={<Payment/>}></Route>
                            <Route path={routes.Orders} element={<Orders/>}></Route>
                            <Route path={routes.PaymentSuccess} element={<PaymentSuccess/>}></Route>
                            <Route path={routes.Donation} element={<Donation/>}></Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </>
    )
}

export default App
