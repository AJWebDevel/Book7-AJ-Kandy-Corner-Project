
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./locations.css"


export const LocationsList = () => {
    const [locations, setLocations] = useState([])

    useEffect(
        () => {

            fetch(`http://localhost:8088/storeLocations`)
                .then((res) => res.json())
                .then((locationsArray) => {
                    setLocations(locationsArray)
                })
        },
        []
    )

    return <>
        <h2>Our Stores</h2>
        <article className="stores">
            {locations.map(
                (store) => {
                    return <section className="store">
                        <h3>{store.name}</h3>

                        <h4>{store.sqFt}square feet of Kandy to Konsume</h4>
                        <footer>{store.address}</footer>
                    </section>
                }
            )

            }
        </article>
    </>
}