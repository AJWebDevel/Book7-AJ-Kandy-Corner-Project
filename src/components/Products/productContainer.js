import { useState } from "react"
import { ProductsList } from "./productsList"
import { ProductSearch } from "./productSearch"
import { CreateProductForm } from "./createProductForm"
import { useNavigate } from "react-router-dom"



export const ProductContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <ProductSearch setterFunction={setSearchTerms} />
        <ProductsList searchTermsState={searchTerms} />
        <CreateProductForm />

    </>
}