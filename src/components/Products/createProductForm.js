import { UseEffect, useState } from "react"
import { Navigate } from "react-router-dom"


export const CreateProductForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
        */
    const makeCounter = () => {
        var i = 0;
        return function () {
            return i++;
        }
    }
    let counter = makeCounter()
    const [product, update] = useState({
        id: counter
    })
    const [types, setTypes] = useState([])
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */


    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)



    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        // TODO: Create the object to be saved to the API
        UseEffect(
            () => {

                fetch(`http://localhost:8088/types`)
                    .then((res) => res.json())
                    .then((typeArray) => {
                        setTypes(typeArray)
                    })
            },
            //empty dependency array watches for initial change
            [] // When this array is empty, you are observing initial component state
        )
        const productToSendToAPI = {
            name: product.name,
            typeId: product.type.id,
            pricePerUnit: product.pricePerUnit
        }

        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/products?_expand=type&_sort=name`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productToSendToAPI)
        })
            .then(res => res.json)
            .then(() => {
                Navigate("/products")
            })
    }

    return (
        <form className="createProductForm">
            <h2 className="ProductForm__title">Create New Product</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Product Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name Product"
                        value={product.id}
                        onChange={
                            (event) => {
                                const copy = { ...product }
                                copy.name = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">

                    {types.map(
                        (type) => {
                            return (<select className="type">
                                <option value={type.id}>{type.name}</option>
                            </select>)
                        }
                    )

                    }
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Product Price Per Unit:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Product Price"
                        value={product.pricePerUnit}
                        onChange={
                            (event) => {
                                const copy = { ...product }
                                copy.name = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit New Product
            </button>
        </form>
    )
}