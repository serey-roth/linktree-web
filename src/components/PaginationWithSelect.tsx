import React, { ChangeEvent, useState } from 'react'

interface PaginationWithSelectProps {
    totalPages: number;
    updatePage: (page: number) => void;
    
}

export const PaginationWithSelect: React.FC<PaginationWithSelectProps> = ({
    totalPages, updatePage,
}) => {
    const [currentPage, setCurrentPage] = useState(0);

    const nextPage = () => {
        if (currentPage >= totalPages - 1) {
            return;
        }
        const newPage = currentPage + 1;
        setCurrentPage(newPage);
        updatePage(newPage);
    }

    const previousPage = () => {
        if (currentPage <= 0) {
            return;
        }
        const newPage = currentPage - 1;
        setCurrentPage(newPage);
        updatePage(newPage);
    }

    const handleChangePage = (e: ChangeEvent<HTMLSelectElement>) => {
        const newPage = Number.parseInt(e.target.value);
        setCurrentPage(newPage);
        updatePage(newPage);
    }

    return (
        <div className="flex items-center w-full gap-1 text-sm my-2">
            <button onClick={previousPage} className="w-fit">
                {"< previous"}
            </button>
            <div className="flex-1 flex items-center justify-center flex-wrap">
                Pg.
                <select 
                value={currentPage} 
                onChange={handleChangePage}
                className='mx-2'>
                {Array.from(Array(totalPages).keys()).map((index) => (
                    <option key={index} value={index}>
                    {index + 1}
                    </option>
                ))}
                </select>
                of {totalPages}
            </div>
            <button onClick={nextPage} className="w-fit">
                {"next >"}
            </button>
        </div>
    );
}