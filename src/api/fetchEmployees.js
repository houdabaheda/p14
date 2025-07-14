export const fetchEmployees = async () => {
    try {
        const response = await fetch("/data/employees.json");
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des employés");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur API :", error);
        return [];
    }
};
