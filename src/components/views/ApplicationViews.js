
import { Outlet, Route, Routes } from "react-router-dom"
import { LocationsList } from "../Locations/locations"
import { CreateProductForm } from "../Products/createProductForm"
import { ProductsList } from "../Products/productsList"


export const ApplicationViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Stellar Family's Kandy Corner</h1>
					<div>Your one-stop-shop for all your kandy needs!</div>

					<Outlet />
				</>
			}>

				<Route path="locations" element={<LocationsList />} />
				<Route path="productsList" element={<ProductsList />} />
				<Route path="createProductForm" element={<CreateProductForm />} />
			</Route>
		</Routes>
	)
}