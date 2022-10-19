import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const NewEmployeeForm = () => {
    //initial state obj
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({
        fullName: "",
        email: "",
        isStaff: true
    })
    const [employees, setEmployees] = useState([])
    const [employee, setEmployee] = useState({
        userId: 0,
        locationId: 0,
        startDate: "",
        payRate: 0

    })
    const [locations, setLocations] = useState([])

    //get locations
    useEffect(
        () => {

            fetch(`http://localhost:8088/StoreLocations`)
                .then((res) => res.json())
                .then((locationsArray) => {
                    setLocations(locationsArray)
                })
        },
        //empty dependency array watches for initial change
        [] // When this array is empty, you are observing initial component state
    )
    //declare useNavigate to redirect later
    const Navigate = useNavigate()
    /*save button click event function here
        //put employee send obj and fetch-POST here */
    const handleSubmitButtonClick = (event) => {
        event.preventDefault()

        const userToSendToAPI = {
            fullName: user.fullName,
            email: user.email,
            isStaff: true
        }

        // TODO: Perform the fetch() to POST the object to the API

        fetch(`http://localhost:8088/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userToSendToAPI)
        })
            .then(res => res.json)
            .then((usersArray) => {
                setUsers(usersArray)
            })
            .then(() =>
                fetch(`http://localhost:8088/employees`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(employeeToSendToAPI)
                })
                    .then(res => res.json)
                    .then(() => {
                        setEmployees(employees)
                        Navigate("/employees")
                    }))


        const employeeToSendToAPI = {
            locationId: employee.locationId,
            StartDate: employee.startDate,
            payRate: employee.payRate
        }

        // TODO: Perform the fetch() to POST the object to the API



    }
    //return new employee form
    return (
        <form>
            <h2>Create New Employee</h2>
            <fieldset>
                <div>
                    <label>Name</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name Employee"
                        value={user.fullName}
                        onChange={
                            (event) => {
                                const copy = { ...user }
                                copy.fullName = event.target.value
                                setUser(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label>Location</label>


                    {locations.map(
                        (location) => {
                            return (<select className="location">
                                <option value={location.id}>{location.name}</option>
                            </select>)
                        }
                    )

                    }
                    <input />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <input
                        required autoFocus
                        type="text"
                        className="form-startDate"
                        placeholder="m/dd/yyyy"
                        value={employee.startDate}
                        onChange={
                            (event) => {
                                const copy = { ...employee }
                                copy.startDate = event.target.value
                                setEmployee(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label>Pay Rate</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Employee Pay Rate"
                        value={employee.payRate}
                        onChange={
                            (event) => {
                                const copy = { ...employee }
                                copy.payRate = event.target.value
                                setEmployee(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSubmitButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit New Employee
            </button>
        </form>
    )
}