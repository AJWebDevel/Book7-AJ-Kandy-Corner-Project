import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const CreateProductForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
        */



    const navigate = useNavigate()

    const [product, update] = useState({
        name: "",
        typeId: 0,
        pricePerUnit: 0
    })
    const [types, setTypes] = useState([])
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */


    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)



    useEffect(
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
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        // TODO: Create the object to be saved to the API


        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/products?_expand=type&_sort=name`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json)
            .then(() => {
                navigate("/productsList")
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
                        value={product.name}
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

                {types.map(
                    (type) => {
                        return <div className="form-group">
                            <label key={type.id} htmlFor="type">{type.typeName}:
                                <input
                                    required autoFocus
                                    type="radio"
                                    name="type"
                                    className={`type-picker ${type.id}`}
                                    placeholder="Pick Product Type"
                                    value={type.id}
                                    onChange={
                                        (event) => {
                                            const copy = { ...product }
                                            copy.typeId = parseInt(event.target.value)
                                            update(copy)
                                        }
                                    } />
                            </label>
                        </div>
                    }
                )

                }
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
                                copy.pricePerUnit = parseInt(event.target.value)
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