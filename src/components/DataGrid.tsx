import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableFooter,
    TablePagination,
    IconButton,
} from "@mui/material";
import { visuallyHidden } from '@mui/utils';
import TableSortLabel from '@mui/material/TableSortLabel';
import { Edit, Delete } from "@mui/icons-material";


export interface Column {
    id: string;
    label: string;
}

interface DataGridProps {
    columns: Column[];
    data: any[];
    onRowClick: (event: React.MouseEvent<unknown, MouseEvent>, rowData: any) => void;
    onEditClick?: (rowData: any) => void;
    onDeleteClick?: (rowData: any) => void;
    rowsPerPageOptions?: number[];
}

type Order = 'asc' | 'desc';

const DataGrid: React.FC<DataGridProps> = ({   columns,
                                               data,
                                               onRowClick,
                                               onEditClick,
                                               onDeleteClick,
                                               rowsPerPageOptions = [5, 10, 25],}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<string>(columns[0].id);

    //získá komparátor na základě aktuálního řazení a sloupce, podle kterého se řadí, poté se pole dat seřadí pomocí funkce stableSort
    const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };
    //Pokud je hodnota této vlastnosti u prvního prvku menší než u druhého, vrátí -1. Pokud je větší, vrátí 1. Pokud jsou si rovny, vrátí 0.
    const descendingComparator = (a: any, b: any, orderBy: string) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    };
 //vrací komparátor na základě aktuálního řazení a sloupce, podle kterého se řadí. Pokud je řazení 'desc' (sestupně), pak se vrátí funkce, která porovnává dva prvky pomocí funkce descendingComparator.
    //Komparátor je funkce, která bere dva prvky a rozhoduje, který je "větší".
    const getComparator = (order: Order, orderBy: string) => {
        return order === 'desc'
            ? (a: any, b: any) => descendingComparator(a, b, orderBy)
            : (a: any, b: any) => -descendingComparator(a, b, orderBy);
    };
  //používá k seřazení datových řádků tabulky
    const stableSort = (array: any[], comparator: (a: any, b: any) => number) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map(el => el[0]);
    };

    return (
        <Table>
            <TableHead>
                <TableRow>
                    {columns.map(column => (
                        <TableCell key={column.id}>
                            <TableSortLabel
                                active={orderBy === column.id}
                                direction={orderBy === column.id ? order : 'asc'}
                                onClick={event => handleRequestSort(event, column.id)}>
                                {column.label}
                                {orderBy === column.id ? (
                                    <span style={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {stableSort(data, getComparator(order, orderBy))                  //Index prvního řádku na stránce se vypočítá jako page * rowsPerPage, a poslední řádek na stránce je page * rowsPerPage + rowsPerPage
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) //Tato funkce se používá k zobrazení pouze určitého počtu řádků na stránku v tabulce,vrací nové pole obsahující část původního pole
                    .map((row, index) => (
                        <TableRow
                            key={index}
                            onClick={(event) => onRowClick && onRowClick(event, row)}
                        >
                            {columns.map((column) => (
                                <TableCell key={column.id}>{row[column.id]}</TableCell>
                            ))}
                            <TableCell>
                                {onEditClick && (
                                    <IconButton
                                        onClick={(event) => {
                                            event.stopPropagation();  //kód pro onRowClick nebude vykonán, když kliknete na tlačítko pro úpravu nebo odstranění
                                            onEditClick(row);
                                        }}
                                        size="small"
                                    >
                                        <Edit />
                                    </IconButton>
                                )}
                                {onDeleteClick && (
                                    <IconButton
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            onDeleteClick(row);
                                        }}
                                        size="small"
                                    >
                                        <Delete />
                                    </IconButton>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TablePagination
                        count={data.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={rowsPerPageOptions}
                    />
                </TableRow>
            </TableFooter>
        </Table>
    );
};

export default DataGrid;
