import React, { useState } from 'react'
import { Grid } from '@krowdy-ui/core'
import { Table } from '@krowdy-ui/views'
import AddIcon from '@material-ui/icons/Add'

interface ISortTable {
	orderBy: string
	sort: 'asc' | 'desc'
}
const demoColumns = [
	{
		editable: true,
		key: 'name',
		label: 'Nombre',
		minWidth: 150,
		ordering: true,
		type: 'text'
	}, {
		editable: false,
		key: 'status',
		label: 'Estado',
		minWidth: 120,
		ordering: true,
		type: 'text'
	}, {
		editable: false,
		key: 'type',
		label: 'Tipo de actividad',
		minWidth: 170,
		ordering: false,
		type: 'text'
	}, {
		editable: true,
		key: 'incharge',
		label: 'Encargado',
		minWidth: 100,
		ordering: false,
		type: 'select'
	}, {
		align: 'right',
		editable: true,
		key: 'currentTasks',
		label: 'Tareas actuales',
		minWidth: 150,
		ordering: true,
		type: 'date'
	}, {
		align: 'right',
		editable: true,
		key: 'amountPayable',
		label: 'Monto por pagar',
		minWidth: 160,
		ordering: true,
		type: 'number'
	}, {
		align: 'right',
		editable: true,
		key: 'amountTasks',
		label: 'Tareas por pagar',
		minWidth: 160,
		ordering: true,
		type: 'text'
	}, {
		align: 'right',
		editable: true,
		key: 'incidents',
		label: 'Incidentes',
		minWidth: 90,
		ordering: true,
		type: 'text'
	}, {
		editable: true,
		key: 'other',
		label: 'Otro valor',
		minWidth: 120,
		ordering: false,
		type: 'text',
		visible: false
	}
]

export default function () {
	// const [sortTable, setSort] = useState({orderBy: '',sort: 'asc' })
	const [columns, setColumns] = useState(demoColumns)

	const searchSuggestions = [
		{ title: 'The Shawshank Redemption', year: 1994 },
		{ title: 'The Godfather', year: 1972 },
		{ title: 'The Godfather: Part II', year: 1974 },
		{ title: 'The Dark Knight', year: 2008 },
		{ title: '12 Angry Men', year: 1957 },
		{ title: "Schindler's List", year: 1993 },
		{ title: 'Pulp Fiction', year: 1994 },
		{ title: 'The Lord of the Rings: The Return of the King', year: 2003 },
		{ title: 'The Good, the Bad and the Ugly', year: 1966 },
		{ title: 'Fight Club', year: 1999 },
		{ title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
		{ title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
		{ title: 'Forrest Gump', year: 1994 }
	]

	const rows = [
		{
			_id: '0',
			name: 'Juan Perez',
			status: 'En linea',
			type: ['LL', 'Ln', 'VoD', 'VE'],
			incharge: 'Jimena',
			currentTasks: 5,
			amountPayable: 45,
			amountTasks: 2,
			incidents: 5,
			extra: 'Status'
		},
		{
			_id: '1',
			name: 'Juana de Arco',
			status: 'Hace 2 dias',
			type: ['LL', 'Ln'],
			incharge: 'Jimena',
			currentTasks: 2,
			amountPayable: 15,
			amountTasks: 0,
			incidents: 0,
			extra: 'Status'
		},
		{
			_id: '2',
			name: 'Pedro de Arco',
			status: 'Hace 7 dias',
			type: ['LL', 'Ln'],
			incharge: 'Jimena',
			currentTasks: 2,
			amountPayable: 15,
			amountTasks: 0,
			incidents: 1,
			extra: 'Status'
		},
		{
			_id: '3',
			name: 'Pedro Colmenarez',
			status: 'Invitado',
			type: ['LL', 'Ln'],
			incharge: 'Jimena',
			currentTasks: 2,
			amountPayable: 123,
			amountTasks: 4,
			incidents: 2,
			extra: 'Status'
		}
	]


	const newCellProps = {
		name: '',
		type: ['LL', 'VE'],
		status: 'Pendiente',
		incharge: [
			{
				label: 'Edward Sanchez',
				value: 0
			},
			{
				label: 'Jose Perez',
				value: 1
			},
			{
				label: 'Manuel Perez',
				value: 2
			},
			{
				label: 'Pedro Perez',
				value: 3
			}
		],
		currentTasks: '',
		amountPayable: ''
	}


	const _handleSortTable = (sort: ISortTable): void  => {
		// setSort({ orderBy, sort })
		console.log("TCL: _handleSortTable -> orderby", sort)
	}

	const _handleSearch = (search: string): void => {
		console.log("TCL: _handleSearch -> search", search)
	}

	const _handleBtnAction = (e: Event): void => {
		console.log("TCL: _handleBtnAction -> e", e)
	}

	const _handleChangeRowsPerPage = () => {
		console.log('change row per page')
	}

	const _handleChangePage = () => {
		console.log('change page')
	}

	const _handleSelectAll = (value: boolean): void => {
		console.log('click select all', value)
	}

	const _handleSelectItem = (index: string): void => {
		console.log('click en select', index)
	}

	const _handlePaymentButton = () => {
		console.log('click en pagar ')
	}

	const _handleToggleColumnTable = (id: string): void => {
		console.log('click en column con id', id)
		const newCols = columns.map((column) =>
			column.id === id ? {
				...column,
				active: !column.active
			} : column
		)
		setColumns(newCols)
	}

	const _handleAddNewCell = (newCell: {[extraProp: string]: string}): void => {
		console.log("TCL: _handleAddNewCell -> newCell", newCell)
	}

	return (
		<Grid container>
			<Table
				withFooter={false}
				withCheckbox={false}
				withPagination={false}
				withHeader={true}
				withMenuColumns={false}
				withOrder={false}
				withSearch={true}
				withButton={false}
				enableAddCell={true}
				iconButton={<AddIcon />}
				// titleTable='Tabla de Krowders'
				searchSuggestions={searchSuggestions}
				paymentAmount={350.20}
				sortTable={{
					orderBy: '',
					sort:"asc"
				}}
				pagination={{
					total: 275,
					perPage: 25,
					page: 2
				}}
				newCellProps={newCellProps}
				titleButton='Agregar Krowder'
				onHandleSortTable={_handleSortTable}
				onHandleSearch={_handleSearch}
				onHandleBtnAction={_handleBtnAction}
				onHandleChangeRowsPerPage={_handleChangeRowsPerPage}
				onHandleChangePage={_handleChangePage}
				onHandleSelectAll={_handleSelectAll}
				onHandleSelectItem={_handleSelectItem}
				onHandlePaymentButton={_handlePaymentButton}
				onHandleToggleColumnTable={_handleToggleColumnTable}
				onHandleAddNewCell={_handleAddNewCell}
				columns={columns}
				rows={rows}
			/>
		</Grid>
	)
}