


import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"



export const CustomerList = () => {
    const [customers, setCustomers] = useState([])


    const navigate = useNavigate()
    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObj = JSON.parse(localKandyUser)



    useEffect(
        () => {

            fetch(`http://localhost:8088/customers?_expand=user`)
                .then((res) => res.json())
                .then((customerArray) => {
                    setCustomers(customerArray)
                })
        },
        //empty dependency array watches for initial change
        [] // When this array is empty, you are observing initial component state
    )


    return <>

        <h2>Customers</h2>

        <article className="customers">

            {
                customers.map(
                    (customer) => {
                        return (<section className="customers">
                            <header><Link to={`/customers/${customer.userId}`}> {customer?.user?.fullName}</Link> </header>

                            <footer>Email: {customer?.user?.email}</footer>
                        </section>)
                    }
                )
            }

        </article>
    </>
}
