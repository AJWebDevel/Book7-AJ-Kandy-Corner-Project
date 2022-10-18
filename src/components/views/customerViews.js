
import { Outlet, Route, Routes } from "react-router-dom"
import { LocationsList } from "../Locations/locations"
import { ProductContainer } from "../Products/productContainer"


export const CustomerViews = ({ searchTermState }) => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Stellar Family's Kandy Corner</h1>
                    <div>Your one-stop-shop for all your kandy needs!</div>

                    <Outlet />
                </>
            }>

                <Route path="locations" element={<LocationsList />} />
                <Route path="productContainer" element={<ProductContainer />} />
            </Route>
        </Routes>
    )
}