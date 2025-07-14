import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { flexRender, getCoreRowModel, useReactTable, createColumnHelper, getSortedRowModel } from '@tanstack/react-table';
import states from '../data/states';

function Table({ data }) {
    const [sorting, setSorting] = useState([]);

    const columnHelper = createColumnHelper();

    // ✅ Convertir le nom de l'État en abréviation
    const getStateAbbreviation = (stateName) => {
        const state = states.find((s) => s.name === stateName);
        return state ? state.abbreviation : stateName;
    };

    // ✅ Définition des colonnes
    const columns = useMemo(
        () => [
            columnHelper.accessor('firstName', { header: 'Prénom' }),
            columnHelper.accessor('lastName', { header: 'Nom' }),
            columnHelper.accessor('dateOfBirth', { header: 'Date de naissance', sortingFn: 'datetime' }),
            columnHelper.accessor('department', { header: 'Département' }),
            columnHelper.accessor('street', { header: 'Rue' }),
            columnHelper.accessor('startDate', { header: "Date d'embauche", sortingFn: 'datetime' }),
            columnHelper.accessor('city', { header: 'Ville' }),
            columnHelper.accessor('state', {
                header: 'État',
                cell: (info) => getStateAbbreviation(info.getValue()),
            }),
            columnHelper.accessor('zipCode', { header: 'CP' }),
        ],
        [columnHelper]
    );

    // ✅ Initialisation de React Table
    const table = useReactTable({
        data,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="mt-6 hidden lg:block overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-[#5a6f07] text-white">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const isSorted = header.column.getIsSorted();
                                const isAscending = isSorted === 'asc';
                                const isDescending = isSorted === 'desc';
                                return (
                                    <th key={header.id} className="p-3 text-left">
                                        <div className="flex items-center justify-center text-sm">
                                            {/* Titre de la colonne */}
                                            <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>

                                            {/* Flèches de tri (haut et bas) */}
                                            <div
                                                className="ml-2 flex flex-col items-center text-[10px] cursor-pointer"
                                                onClick={() => {
                                                    header.column.toggleSorting();
                                                }}
                                            >
                                                <i className={`fa-solid fa-caret-up ${isAscending ? 'text-emerald-500' : ''} block`}></i>
                                                <i className={`fa-solid fa-caret-down ${isDescending ? 'text-red-500' : ''} block`}></i>
                                            </div>
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.length > 0 ? (
                        table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="border-t hover:bg-gray-100">
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="p-3">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="p-3 text-center text-gray-500">
                                Aucun employé trouvé.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

// ✅ Définition des PropTypes
Table.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            dateOfBirth: PropTypes.string.isRequired,
            startDate: PropTypes.string.isRequired,
            department: PropTypes.string.isRequired,
            city: PropTypes.string.isRequired,
            state: PropTypes.string.isRequired,
            zipCode: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Table;
