

import { CustomerViews } from "./customerViews"
import { EmployeeViews } from "./employeeViews"

export const ApplicationViews = () => {

	const localKandyUser = localStorage.getItem("kandy_user")
	const kandyUserObj = JSON.parse(localKandyUser)

	if (kandyUserObj.staff) {
		return <EmployeeViews />
	}
	else {
		return <CustomerViews />

	}


}