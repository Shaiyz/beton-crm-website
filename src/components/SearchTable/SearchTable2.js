import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import MaterialTable from 'material-table';
import icons from './icons'
import './Table.css';

const Table = ({ data, columns, loading }) => {
    return (
        <>
            <div style={{ width: '100%' }}>
                {loading ? (
                    <CircularProgress className="loader" />
                ) : (
                    <MaterialTable
                        icons={icons}
                        data={data}
                        columns={columns}
                        options={{
                            search: true,
                            pageSize:20,
                            pageSizeOptions:[5, 20, 50, 100],
                            paginationType:"stepped", 
                        }}
                    />
                )}
            </div>
        </>
    );
};

export default Table;
