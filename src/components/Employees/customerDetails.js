import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"




export const CustomerDetails = () => {
    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObj = JSON.parse(localKandyUser)
    const { customerId } = kandyUserObj.id

    const [customer, updateCustomer] = useState({})
    const [customers, updateCustomers] = useState([])


    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user`)
                .then(res => res.json())
                .then((data) => {
                    const singleCustomer = data[0]
                    updateCustomer(singleCustomer)
                    updateCustomers(data)
                })
        },
        [customerId]
    )

    return (<div>
        {
            customers.map(
                (customer) => {
                    if (customer.id === kandyUserObj.id) {

                        return (<section className="customer">
                            <header>{customer?.user?.fullName}</header>
                            <footer>Pay Rate: ${customer.payRate}</footer>
                        </section>)
                    } else {
                        return <header></header>
                    }
                }
            )
        }
    </div>)
}
