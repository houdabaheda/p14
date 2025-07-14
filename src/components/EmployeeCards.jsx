import PropTypes from 'prop-types';

function EmployeeCards({ employees }) {
    return (
        <div className="mt-4 lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
            {employees.length > 0 ? (
                employees.map((employee, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
                        <p className="font-bold text-[#5a6f07]">
                            {employee.firstName} {employee.lastName}
                        </p>
                        <p className="text-gray-600">📅 Naissance : {employee.dateOfBirth}</p>
                        <p className="text-gray-600">📆 Embauche : {employee.startDate}</p>
                        <p className="text-gray-600">🏢 {employee.department}</p>
                        <p className="text-gray-600">
                            📍 {employee.city}, {employee.state} ({employee.zipCode})
                        </p>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500 mt-4">Aucun employé trouvé.</p>
            )}
        </div>
    );
}

EmployeeCards.propTypes = {
    employees: PropTypes.array.isRequired,
};

export default EmployeeCards;
