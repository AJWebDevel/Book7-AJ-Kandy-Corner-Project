
import { useState } from "react"
import { NewEmployeeForm } from "./newEmployeeForm"
import { EmployeeList } from "./employeeList"

export const EmployeeContainer = () => {

    return <>
        <EmployeeList />
        <NewEmployeeForm />

    </>
}