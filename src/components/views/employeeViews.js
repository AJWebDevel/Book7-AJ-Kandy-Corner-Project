
import { Outlet, Route, Routes } from "react-router-dom"
import { EmployeeContainer } from "../Employees/employeeContainer"
import { NewEmployeeForm } from "../Employees/newEmployeeForm"
import { LocationsList } from "../Locations/locations"
import { ProductContainer } from "../Products/productContainer"

export const EmployeeViews = () => {
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
                <Route path="products" element={<ProductContainer />} />
                <Route path="employees" element={<EmployeeContainer />} />
                <Route path="employee/create" element={<NewEmployeeForm />} />
            </Route>
        </Routes>
    )
}