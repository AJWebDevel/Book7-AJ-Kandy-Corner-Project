
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"



export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])


    const navigate = useNavigate()
    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObj = JSON.parse(localKandyUser)



    useEffect(
        () => {

            fetch(`http://localhost:8088/employees?_expand=user`)
                .then((res) => res.json())
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                })
        },
        //empty dependency array watches for initial change
        [] // When this array is empty, you are observing initial component state
    )


    return <>

        <h2>Employees</h2>
        <article className="employees">

            {
                employees.map(
                    (employee) => {
                        return (<section className="employee">
                            <header>{employee?.user?.fullName}</header>
                            <footer>Pay Rate: ${employee.payRate}</footer>
                        </section>)
                    }
                )
            }

        </article>
    </>
}