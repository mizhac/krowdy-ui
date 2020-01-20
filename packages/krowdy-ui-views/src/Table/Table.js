import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { 
	Paper, 
	TableBody, 
	TableCell,  
	TableHead, 
	TableSortLabel, 
	TablePagination, 
	TableRow, 
	Checkbox, 
	Typography,
	Menu,
	MenuItem,
	FormGroup,
	FormControl,
	FormControlLabel,
	Box,
	InputAdornment,
	TextField,
	Button,
	Select,
	Popover,
	makeStyles,
	Input
} from '@krowdy-ui/core';
// import KeyboardDatePicker from '@material-ui/lab/'
import { Table as MuiTable, IconButton } from '@krowdy-ui/core/';
import { TableContainer } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(theme => ({
	container: {
		// maxHeight: 400,
		// overflow: 'auto'
	},
	containerSearch: {
		display: 'flex',
		justifyContent: 'space-between',
		'&.flexEnd':{
			justifyContent: 'flex-end'
		},
		'& * [class=*"-popperDisablePortal"]': {
			backgroundColor: 'red'
		}
	},
	containerTable: {
		overflow: 'hidden'
	},
	headerTable: {
		fontWeight: 'bold',
		fontSize: 12
	},
	bodyTable: {
		fontSize: 12
	},
	inputSearch: {
		margin: '2px 0',
		'& > div': {
			padding: '0 14px 0 0 !important'
		},
		'& * input': {
			padding: '12px 10px !important',
			fontSize: 14,
		}
	},
	customBottomAdd: {
		border: 'dashed 1px',
		margin: '2px 10px',
		textTransform: 'initial'
	},
	searchIcon: {
		cursor: 'pointer'
	},
	containerHeaderTable: {
		padding: theme.spacing(2),
	},
	textAmount: {
		color: theme.palette.primary.main,
		fontSize: 18,
		lineHeight: '24px',
		fontWeight: 'bold'
	},
	textTotal: {
		marginRight: 5,
		fontSize: 14,
		lineHeight: '20px',
		fontWeight: 'bold'
	},
	buttonFooter: {
		width: '100px',
		fontSize: 12
	},
	titleTable: {
		fontWeight: 'bold',
		fontSize: 14
	},
	menuItem: {
		fontSize: 14
	},
	customMenuHead: {
		padding: 16
	},
	customMenuHeadTitle: {
		color: '#262626',
		fontSize: '0.875rem',
		fontWeight: 'bold',
		marginBottom: 12
	},
	spaceBetween: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	customCheckbox: {
		'& svg': {
			height: 18,
			width: 18
		},
		'&.Mui-checked': {
			color: theme.palette.primary.main
		}
	},
	addCell: {
		color: theme.palette.primary.main,
		textAlign: 'right',
		cursor: 'pointer'
	},
	iconAdd: {
		fontSize: 18,
		cursor: 'pointer',
		'&.check': {
			color: theme.palette.primary.main,
			marginLeft: theme.spacing(1)
		},
		'&.close': {
			color: theme.palette.error.main
		}
	},
	editableCell: {
		display: 'flex'
	},
	inputEditable: {
		fontSize: 14
	}
}))

const Table = ({ 
	titleTable,
	titleButton,
	sortTable,
	pagination,
	paymentAmount,
	iconButton,
	newCellProps,
	columns = [], 
	rows = [],
	searchSuggestions = [],
	withFooter = false,
	withCheckbox = false,
	withPagination = false,
	withHeader = false,
	withMenuColumns = false,
	withOrder = false,
	withSearch = true,
	withButton = false,
	enableAddCell = false,
	onHandleSortTable = () => false,
	onHandleSearch = () => false,
	onHandleBtnAction = () => false,
	onHandleChangePage = () => false,
	onHandleChangeRowsPerPage = () => false,
	onHandleSelectAll = () => false,
	onHandleSelectItem = () => false,
	onHandlePaymentButton = () => false,
	onHandleToggleColumnTable = () => false,
	onHandleAddNewCell = () => false
}) => {
	const classes = useStyles()
	const inputSearch = useRef(null)
	const [openMenu, setOpenMenu] = useState(null)
	const [addNewCell, setAddNewCell] = useState(false)
	const [locaNewCellProps, setLocalNewCellProps] = useState({})
	const columnsActives = columns.filter(({ active }) => active)

	useEffect(() => {
		if (newCellProps)
			setLocalNewCellProps(newCellProps)
	}, [])

	const _handleClickOpenMenu = event => {
		setOpenMenu(event.currentTarget);
	};

	const _handleClickClose = () => {
		setOpenMenu(null);
	};


	const _handleSearchValidate = (e) => {
		const { value } = e.target
		if (e.keyCode === 13) onHandleSearch(value)
	}

	const _handleSortTable = (id, ref) => {
		const { orderBy, sort } = ref
		const invertSort = sort === 'asc' ? 'desc' : 'asc'
		if(id !== orderBy){
			return onHandleSortTable(id, 'asc')
		}
		return onHandleSortTable(id, invertSort)
	}

	const _handleClickToggleCell = () => {
		setAddNewCell(!addNewCell)
	}

	const renderComponentType = (type, id) => {
		{
			switch (type) {
				case ('text' || 'number'):
					return (<Input fullWidth type={type} defaultValue={locaNewCellProps[id]} className={classes.inputSearch} />)
				case 'select':
					return (
						<FormControl>
							<Select displayEmpty>
								{locaNewCellProps[id].map(({ value, label }) => {
									return (<MenuItem value={value}>{label}</MenuItem>)
								})}
							</Select>
						</FormControl>
					)
				// case 'date':
				// 	return (
				// 		<KeyboardDatePicker
				// 			disableToolbar
				// 			variant="inline"
				// 			format="MM/dd/yyyy"
				// 			margin="normal"
				// 			id="date-picker-inline"
				// 			label="Date picker inline"
				// 			value={selectedDate}
				// 			// onChange={handleDateChange}
				// 			KeyboardButtonProps={{
				// 				'aria-label': 'change date',
				// 			}}
				// 		/>
				// 	)
				default:
					return null
			}
		}
	}


	return (
		<Paper className={classes.containerTable}>
			{
				withHeader ? (
					<div className={clsx(classes.containerHeaderTable, { [classes.spaceBetween]: titleTable })}>
						{titleTable && <Typography className={classes.titleTable}>{titleTable}</Typography>}
						<div className={clsx(classes.containerSearch, { flexEnd: titleTable })}>
							{withSearch ? (
								<Autocomplete
									style={{ width: 400 }}
									noOptionsText='No hay coincidencias'
									options={searchSuggestions.map(option => option.title)}
									popupIcon={<SearchIcon />}
									renderInput={params => (
										<TextField
											{...params}
											variant="outlined"
											fullWidth
											className={classes.inputSearch}
											id="input-with-icon-textfield"
											placeholder='Buscar'
											inputRef={inputSearch}
											onKeyUp={_handleSearchValidate}
											InputLabelProps={{ shrink: false }}
											InputProps={{
												...params.InputProps,
												endAdornment: (
													<InputAdornment position="end">
														<SearchIcon onClick={() => onHandleSearch(inputSearch.current.value)} className={classes.searchIcon} />
													</InputAdornment>
												),
											}}
										/>
									)}
								/>
							) : null}
							{withButton ? (
								<Button
									className={classes.customBottomAdd}
									color='primary'
									onClick={onHandleBtnAction}
									variant='outlined'>
									{iconButton}
									{titleButton}
								</Button>
							) : null}
							
						</div>
					</div>
				) : null
			}
			<TableContainer className={classes.container}>
				<MuiTable stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{withCheckbox ? (
								<TableCell padding="checkbox">
									<Checkbox
										onChange={(e) => onHandleSelectAll(e.target.checked)}
										inputProps={{ 'aria-label': 'select all desserts' }}
									/>
								</TableCell>
							) : null}
							{columnsActives.map(({ id, align, minWidth, label, ordering }) => (
								<TableCell
									key={id}
									align={align}
									style={{ minWidth }}
									sortDirection={sortTable.orderBy === id ? sortTable.sort : false}
								>
									{withOrder && ordering ? (
										<TableSortLabel
											active={sortTable.orderBy === id}
											direction={sortTable.orderBy === id ? sortTable.sort : 'asc'}
											onClick={() => _handleSortTable(id, sortTable)}
										>
											<Typography className={classes.headerTable}>{label}</Typography>
										</TableSortLabel>
									) : (
											<Typography className={classes.headerTable}>{label}</Typography>
									) }
								</TableCell>
							))}
							{withMenuColumns ? (
								<TableCell padding='checkbox'>
									<IconButton color='primary' onClick={_handleClickOpenMenu}>
										<MoreVertIcon />
									</IconButton>
									<Popover
										anchorEl={openMenu}
										anchorOrigin={{
											horizontal: 'left',
											vertical: 'bottom'
										}}
										id='simple-popover'
										onClose={_handleClickClose}
										open={Boolean(openMenu)}
										transformOrigin={{
											horizontal: 'right',
											vertical: 'top'
										}}>
										<div className={classes.customMenuHead}>
											<Typography className={classes.customMenuHeadTitle}>Columnas</Typography>
											<FormGroup>
												{
													columns.map(({ id, label, active }) => (
														<FormControlLabel
															control={
																<Checkbox
																	checked={active}
																	disabled={columns.filter(({ active }) => active).length === 1 && active}
																	className={classes.customCheckbox}
																	onChange={() => onHandleToggleColumnTable(id)}
																	value={id} />
															}
															key={id}
															label={label} />
													))
												}
											</FormGroup>
										</div>
									</Popover>
								</TableCell>
							) : null}
								
						</TableRow>
					</TableHead>
					<TableBody>
						{enableAddCell ? (
							 addNewCell ? (
								columnsActives.map(({ id, type, editable }, index) => {
									const lastCell = index === columnsActives.length - 1
									return (
										<TableCell>
											<Box display='flex' alignItems='center' justifyContent={lastCell ? 'space-between' : 'flex-start'}>
												{editable ? (
													renderComponentType(type, id)
												) : (
													<Typography>{locaNewCellProps[id]}</Typography>
												)}
												{lastCell && (
													<Box display='flex' marginLeft={2}>
														<CloseIcon onClick={_handleClickToggleCell} className={clsx(classes.iconAdd, 'close')} />
														<CheckIcon onClick={onHandleAddNewCell} className={clsx(classes.iconAdd, 'check')} />
													</Box>
												)}
											</Box>
										</TableCell>
									)
								})
							) : (
								<TableRow>
									<TableCell colSpan = {columns.length} >
										<Typography onClick={_handleClickToggleCell} className={classes.addCell}>Agregar incidente</Typography>
									</TableCell>
								</TableRow>
							)
							
						) : null}
						{rows.map((row, index) => {

							const { _id, selected } = row
							return (
								<TableRow hover key={index} role="checkbox">
									{withCheckbox ? (
										<TableCell padding="checkbox">
											<Checkbox
												checked={selected}
												onChange={() => onHandleSelectItem(_id)}
												// inputProps={{ 'aria-labelledby': name }}
											/>
										</TableCell>
									) : null}
									{columnsActives.map(({ id, align }) => {
										return (
											<TableCell key={id} align={align || 'left'}>
												<Typography className={classes.bodyTable}>
													{Array.isArray(row[id]) ? (row[id].join(', ')) : row[id] }
												</Typography>
											</TableCell>
										)
									})}
									{withMenuColumns ? (<TableCell />) : null}
								</TableRow>
							);
						})}
					</TableBody>
				</MuiTable>
			</TableContainer>
			{
				withPagination ? (
					<TablePagination
						rowsPerPageOptions={[10, 25, 100]}
						component="div"
						count={pagination.totalRows}
						rowsPerPage={pagination.rowsPerPage}
						page={pagination.currentPage}
						onChangePage={onHandleChangePage}
						onChangeRowsPerPage={onHandleChangeRowsPerPage}
					/>
				) : null
			}
			{
				withFooter ? (
					<Box display='flex' justifyContent='flex-end' padding={2} className={classes.footerTable}>
						<Box display='flex' className={classes.containerPayment}>
							<Box display='flex' marginRight={3} alignItems='center' className={classes.paymentText}>
								<Typography className={classes.textTotal}>Total</Typography>
								<Typography className={classes.textAmount}>s/ {paymentAmount.toFixed(2)}</Typography>
							</Box>
							<Button onClick={onHandlePaymentButton} className={classes.buttonFooter} color='primary' variant='contained'>Pagar</Button>
						</Box>
					</Box>
				) : null
			}
		</Paper>
	)
}

Table.propTypes = {
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			align: PropTypes.string,
			id: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
			minWidth: PropTypes.number,
			ordering: PropTypes.bool.isRequired,
		})
	).isRequired,
	rows: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
		})
	).isRequired,
	titleTable: PropTypes.string,
	titleButton: PropTypes.string,
	withFooter: PropTypes.bool,
	withCheckbox: PropTypes.bool,
	withPagination: PropTypes.bool,
	withHeader: PropTypes.bool,
	withMenuColumns: PropTypes.bool,
	withOrder: PropTypes.bool,
	withSearch: PropTypes.bool,
	withButton: PropTypes.bool,
	enableAddCell: PropTypes.bool,
	iconButton: PropTypes.element,
	paymentAmount: PropTypes.number,
	newCellProps: PropTypes.object,
	searchSuggestions: PropTypes.array,
	sortTable: PropTypes.shape({
		orderBy: PropTypes.string,
		sort: PropTypes.oneOf(['asc', 'desc'])
	}),
	pagination: PropTypes.shape({
		totalRows: PropTypes.number.isRequired,
		rowsPerPage: PropTypes.number.isRequired,
		currentPage: PropTypes.number.isRequired
	}),
	onHandleSortTable: PropTypes.func.isRequired,
	onHandleSearch: PropTypes.func.isRequired,
	onHandleBtnAction: PropTypes.func.isRequired,
	onHandleChangePage: PropTypes.func.isRequired,
	onHandleChangeRowsPerPage: PropTypes.func.isRequired,
	onHandleSelectAll: PropTypes.func.isRequired,
	onHandleSelectItem: PropTypes.func.isRequired,
	onHandlePaymentButton: PropTypes.func,
	onHandleToggleColumnTable: PropTypes.func,
	onHandleAddNewCell: PropTypes.func
}

export default Table