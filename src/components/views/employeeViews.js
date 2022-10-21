
import { Outlet, Route, Routes } from "react-router-dom"
import { CustomerDetails } from "../Employees/customerDetails"
import { CustomerList } from "../Employees/CustomerList"
import { EmployeeContainer } from "../Employees/employeeContainer"
import { EmployeeList } from "../Employees/employeeList"
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
                <Route path="customers" element={<CustomerList />} />
                <Route path="customers/:customerId" element={<CustomerDetails />} />
                <Route path="employees" element={<EmployeeList />} />
                <Route path="employee/create" element={<NewEmployeeForm />} />
            </Route>
        </Routes>
    )
}