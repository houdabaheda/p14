import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from '../store/employeeSlice';
import EmployeeCards from '../components/EmployeeCards';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import Dropdown from '../components/Dropdown';
import { useForm, Controller } from 'react-hook-form';

function EmployeeListPage() {
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employees.list);
    const status = useSelector((state) => state.employees.status);
    const error = useSelector((state) => state.employees.error);
    const [employeesPerPage, setEmployeesPerPage] = useState(10); // Valeur initiale
    const [currentPage, setCurrentPage] = useState(1); // Page courante
    const { control, setValue, watch } = useForm();
    const searchTerm = watch('searchTerm', ''); // Récupérer la valeur du champ de recherche

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchEmployees());
        }
    }, [dispatch, status]);

    // Fonction de filtrage : on compare les premiers caractères du terme de recherche avec la valeur
    const filteredEmployees =
        searchTerm.length >= 2
            ? employees.filter((employee) => {
                  const searchTermLower = searchTerm.toLowerCase();
                  const isMatching = (value) => value.toLowerCase().startsWith(searchTermLower);

                  const firstNameMatches = isMatching(employee.firstName);
                  const lastNameMatches = isMatching(employee.lastName);
                  const departmentMatches = isMatching(employee.department);
                  const cityMatches = isMatching(employee.city);
                  const stateMatches = isMatching(employee.state);
                  const zipCodeMatches = isMatching(employee.zipCode);

                  // Si le terme de recherche fait au moins 2 caractères, appliquer le filtrage
                  return firstNameMatches || lastNameMatches || departmentMatches || cityMatches || stateMatches || zipCodeMatches;
              })
            : employees; // Si moins de 2 caractères, afficher tous les employés

    // Logique pour afficher les employés par page
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    // Calcul des entrées visibles à afficher
    const totalEmployees = filteredEmployees.length;
    const startEmployee = indexOfFirstEmployee + 1;
    const endEmployee = Math.min(indexOfLastEmployee, totalEmployees);

    return (
        <div className="lg:max-w-7xl mx-auto mt-6 p-4 w-full">
            <h1 className="text-2xl font-bold text-center text-[#5a6f07] mb-4" id="employeeListTitle">
                Liste des employés
            </h1>

            <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full">
                {/* Dropdown pour le nombre d'employés par page */}
                <Dropdown
                    name="employeesPerPage"
                    label="Afficher par"
                    options={[
                        { value: 10, label: '10' },
                        { value: 25, label: '25' },
                        { value: 50, label: '50' },
                        { value: 100, label: '100' },
                    ]}
                    control={control}
                    error={null}
                    onChange={(e) => {
                        const value = Number(e.target.value);
                        setEmployeesPerPage(value); // Mettre à jour la valeur de employeesPerPage
                        setCurrentPage(1); // Réinitialiser la page à 1 chaque fois que l'on change la sélection
                    }}
                    className="w-full md:w-auto"
                    isEmployeeListPage={true}
                />

                {/* Barre de recherche avec react-hook-form */}
                <Controller
                    name="searchTerm"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <input
                            {...field}
                            type="text"
                            placeholder="Rechercher un employé..."
                            className="md:w-1/3 p-2 border rounded mt-4 focus:outline-none focus:ring-2 focus:ring-[#5a6f07]"
                            aria-label="Rechercher un employé" // Amélioration pour l'accessibilité
                            onChange={(e) => setValue('searchTerm', e.target.value)} // Mettre à jour l'état searchTerm avec react-hook-form
                        />
                    )}
                />
            </div>

            {/* Afficher l'information de la pagination (Showing X to Y of Z entries) */}
            <div className="mt-4 text-center text-sm text-gray-500" aria-live="polite">
                {totalEmployees > 0 ? `Affichage de ${startEmployee} à ${endEmployee} sur ${totalEmployees} employés` : 'Aucun employé trouvé'}
            </div>

            {/* Gestion des états (Chargement, Erreur, Données) */}
            {status === 'loading' && <p className="text-center mt-5 text-gray-500">Chargement des employés...</p>}
            {status === 'failed' && <p className="text-center mt-5 text-red-500">Erreur : {error}</p>}
            {status === 'succeeded' && (
                <>
                    {/* Affichage Mobile: Cartes */}
                    <EmployeeCards employees={currentEmployees} />

                    {/* Affichage Desktop: Tableau */}
                    <div className="mt-6 lg:block overflow-x-auto text-sm">
                        <Table data={currentEmployees} />
                    </div>

                    {/* Pagination */}
                    <Pagination totalEmployees={filteredEmployees.length} employeesPerPage={employeesPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </>
            )}
        </div>
    );
}

export default EmployeeListPage;
