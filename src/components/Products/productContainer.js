import { useState } from "react"
import { ProductsList } from "./productsList"
import { ProductSearch } from "./productSearch"


export const ProductContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <ProductSearch setterFunction={setSearchTerms} />
        <ProductsList searchTermsState={searchTerms} />
    </>
}