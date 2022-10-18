

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./productList.css"


export const ProductsList = ({ searchTermsState }) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const [mostExpensive, setMostExpensive] = useState(false)

    const navigate = useNavigate()
    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObj = JSON.parse(localKandyUser)



    useEffect(
        () => {

            fetch(`http://localhost:8088/products?_sort=name&_expand=type`)
                .then((res) => res.json())
                .then((productsArray) => {
                    setProducts(productsArray)
                })
        },
        //empty dependency array watches for initial change
        [] // When this array is empty, you are observing initial component state
    )


    useEffect(
        () => {
            if (mostExpensive) {
                const expensiveProducts = products.filter(product => product.pricePerUnit >= 2)
                setFiltered(expensiveProducts)
            }
            else {
                setFiltered(products)
            }
        },
        [products, mostExpensive]
    )

    useEffect(
        () => {
            const searchedProducts = products.filter(product => {
                return product.name.toLowerCase().startsWith(searchTermsState.toLowerCase())
            })
            setFiltered(searchedProducts)
            {
                filteredProducts.map(
                    (product) => {
                        return (<section className="product">
                            <header>{product.name}</header>
                            <footer>Price: ${product.pricePerUnit}</footer>
                        </section>)
                    }
                )

            }
        },
        [searchTermsState]
    )



    return <>
        {
            kandyUserObj
                ? <>
                    <button onClick={() => setMostExpensive(true)}> Top Priced</button>
                    <button onClick={() => setMostExpensive(false)}> Show All</button>

                </>
                : <>
                    <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
                </>
        }
        <h2>List of Products</h2>
        <article className="products">

            {setFiltered === searchedProducts
                ? <>
                    filteredProducts.map(
                    (product) => {
                        (<section className="product">
                            <header>{product.name}</header>
                            <footer>Price: ${product.pricePerUnit}</footer>
                        </section>)
                    }
                    )
                </>
                : <>
                    {
                        filteredProducts.map(
                            (product) => {
                                return (<section className="product">
                                    <header>{product.name}</header>
                                    {product.type.typeName}
                                    <footer>Price: ${product.pricePerUnit}</footer>
                                </section>)
                    </>

        </article>
    </>
}