import React, { useState } from 'react';
import { HistoryType } from '../utils/type';

interface TableWithPaginationProps {
    data: HistoryType[] | undefined;
    itemsPerPage: number;
}

const TableWithPagination: React.FC<TableWithPaginationProps> = ({ data, itemsPerPage }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Calculate total pages
    const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;

    // Get current items for the page
    const currentData = data ? data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    ) : undefined;

    const handlePrevious = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    return (
        <div className="w-full">
            <table className="min-w-full text-[#515054] text-[12px] font-[600]">
                <thead className='border-b border-[#FFFFFF1A]'>
                    <tr>
                        <th className="py-2">Bet</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Chance</th>
                        <th className="py-2">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {(!currentData || currentData.length === 0) && <tr className={`text-center bg-[#17161B]`}>
                        <td className="py-4 rounded-[7px] text-white" colSpan={4}>No Data</td>
                    </tr>
                    }
                    {currentData && currentData.length > 0 && currentData.map((item, index) => (
                        <tr key={index} className={`text-center ${index % 2 === 0 ? 'bg-transparent' : 'bg-[#17161B]'}`}>
                            <td className="py-4 rounded-l-[7px] text-white">${item.bet.toLocaleString()}</td>
                            <td className={`py-4 ${item.status ? 'text-[#F7B831]' : 'text-[#FD2D2D]'}`}>{item.status ? 'Won' : 'Lose'}</td>
                            <td className="py-4">{item.chance.toLocaleString()}%</td>
                            <td className="py-4 rounded-r-[7px]">{item.date.slice(0, 10)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between items-center mt-4 w-[140px] mx-auto">
                <button
                    onClick={handlePrevious}
                    className="px-4 py-2 cursor-pointer"
                    disabled={currentPage === 1}
                >
                    <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4 4.76995e-08L-4.76995e-08 4L4 8L5 7L2 4L5 1L4 4.76995e-08Z" fill="#868587" />
                    </svg>

                </button>
                <span className='text-[#8B8A8D] text-[12px]'>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNext}
                    className="px-4 py-2 cursor-pointer"
                    disabled={currentPage === totalPages}
                >
                    <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M1 4.76995e-08L5 4L1 8L5.60311e-07 7L3 4L4.88762e-07 1L1 4.76995e-08Z" fill="#868587" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default TableWithPagination;
