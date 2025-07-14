import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getStoredEmployees = () => {
    const storedEmployees = localStorage.getItem("employees");
    return storedEmployees ? JSON.parse(storedEmployees) : [];
};

export const fetchEmployees = createAsyncThunk("employees/fetchEmployees", async () => {
    const response = await fetch("/data/employees.json");
    const jsonEmployees = await response.json();
    const storedEmployees = getStoredEmployees();
    return [...jsonEmployees, ...storedEmployees];
});

const employeeSlice = createSlice({
    name: "employees",
    initialState: { list: [], status: "idle", error: null },
    reducers: {
        addEmployee: (state, action) => {
            state.list.unshift(action.payload);
            const updatedEmployees = [action.payload, ...getStoredEmployees()];
            localStorage.setItem("employees", JSON.stringify(updatedEmployees));
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEmployees.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.list = action.payload;
        });
    },
});

export const { addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
