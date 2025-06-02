import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { movies } from './movies';
import Loader from '../Pages/Loader';
import { differenceBy } from 'lodash';
import { Button } from '@mui/material';
import { customStyles } from './utils';

// const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;



const DataGrid = () => {
    const [selectedRows, setSelectedRows] = useState(false);
    const [toggledClearRows, setToggleClearRows] = useState(false);
    const [toggleCleared, setToggleCleared] = useState(false);
    const [data, setData] = useState(movies);
    const [filterData, setFilterData] = useState(movies);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setData(movies);
            setPending(false);
        }, 1000);
        return () => clearTimeout(timeout);
    }, []);

 useEffect(() => {}, [filterData]);

    // const filteredItems = useMemo(() => {
    //     return data.filter(item =>
    //         Object.values(item).some(value =>
    //             String(value).toLowerCase().includes(filterText.toLowerCase())
    //         )
    //     );
    // }, [data, filterText]);

    // const handleRowSelected = useCallback(state => {
    //     setSelectedRows(state.selectedRows);
    // }, []);
    // const handleChange = ({ selectedRows }) => {
    //     setSelectedRows(selectedRows);
    // };
    // const rowDisabledCriteria = row => row.isOutOfStock;

    // const contextActions = React.useMemo(() => {
    //     const handleDelete = () => {
    //         if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.title)}?`)) {
    //             setToggleCleared(!toggleCleared);
    //             setData(differenceBy(data, selectedRows, 'title'));
    //         }
    //     };
    //     return <button key="delete" onClick={handleDelete} style={{
    //         backgroundColor: 'red'
    //     }} icon>
    //         Delete
    //     </button>;
    // }, [movies, selectedRows, toggleCleared]);
    // const handleClearRows = () => {
    //     setToggleClearRows(!toggledClearRows);
    // }

    // const subHeaderComponentMemo = useMemo(() => {
    //     const handleClear = () => {
    //         if (filterText) {
    //             setFilterText('');
    //         }
    //     };

    //     return (
    //         <div style={{ padding: '8px', display: 'flex' }}>
    //             <input
    //                 type="text"
    //                 placeholder="Search..."
    //                 value={filterText}
    //                 onChange={e => setFilterText(e.target.value)}
    //                 style={{ marginRight: '8px' }}
    //             />
    //             <button onClick={handleClear} disabled={!filterText}>
    //                 Clear
    //             </button>
    //         </div>
    //     );
    // }, [filterText, setFilterText]);


    const handleSearchChange = async (e) => {
        var searchData = movies.filter((item) => {
            if (
                item.title
                    .toString()
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
            ) {
                return item;
            }
        });
        setFilterData(searchData);
    };

    const columns = [
        {
            name: (
                <div>
                    Title
                    <input type="text" onChange={(e) => handleSearchChange(e)} style={{ width: "80%" }} />
                </div>
            ),
            selector: row => row.title,
            sortable: true,
            sortField: 'title',
        },
        {
            name: 'Year',
            selector: row => row.year,
            sortable: true,
            sortField: 'year',
        },
        {
            name: 'Runtime',
            selector: row => row.runtime,
            sortable: true,
            sortField: 'runtime',
        },
        {
            name: 'Genres',
            selector: row => row.genres,
            sortable: true,
            sortField: 'genres',
        },
    ]
    return (
        <>

            <DataTable
                title="Movie List"
                columns={columns}
                data={filterData}
                // selectableRows
                persistTableHead
                // subHeader
                // subHeaderComponent={subHeaderComponentMemo}
                pagination
                defaultSortField="title"
                // onSelectedRowsChange={handleChange}
                // contextActions={contextActions}
                fixedHeader={true}
                fixedHeaderScrollHeight='400px'
                // selectableRowDisabled={rowDisabledCriteria}
                progressPending={pending}
                customStyles={customStyles}
                highlightOnHover
                pointerOnHover
            // dense
            // progressComponent={<Loader />}
            />
        </>

    )
}

export default DataGrid