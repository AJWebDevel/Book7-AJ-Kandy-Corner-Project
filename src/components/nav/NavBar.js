import { CustomerNav } from "./customerNav"
import { EmployeeNav } from "./employeeNav"
import "./NavBar.css"




export const NavBar = () => {

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObj = JSON.parse(localKandyUser)

    if (kandyUserObj.staff) {
        return <EmployeeNav />
    }
    else {
        return <CustomerNav />

    }
}
