import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withStyles, makeStyles } from '@krowdy-ui/core/styles'
// import { CardCandidate } from 'packages/krowdy-ui-views/src/CardCandidate/CardCandidate'
import SearchIcon from '@krowdy-ui/icons/Search';
import {
    Card,
    CardContent,
    Checkbox,
    Typography,
    Select,
    List,
    ListItemText,
    ListItemAvatar,
    Divider,
    FormGroup,
    FormControlLabel,
    InputBase,
    CardHeader
} from '@krowdy-ui/core'

const useStyles = makeStyles(theme => ({
    titleCardheader: {
        fontSize: '18px',
        color: '#595959',
        fontWeight: 'bold',
        lineHeight: '24px',
    },
    text: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '20px',
        color: '#262626',
        margin: '20px 0px 16px 0px'
    },
    searchCandidate: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        color: '#8C8C8C',
    },
    icon: {
        color: '#8C8C8C',
        fontSize: '18px'
    }
}))

export const styles = () => ({
    headerLeft: {
        flex: '1'
    }
})


// const optionSelect = ['option1', 'option2', 'option3']
// const labelCheckbox = ['Candidatos actuales', 'Candidatos nuevos']
const SelectCandidates = props => {
    const [changeCheckbox, setChangeCheckbox] = useState(false)
    const classes = useStyles();
    const {
        optionSelect,
        labelCheckbox,
        CardCandidate,
        label
    } = props

    return (
        <div style={{ margin: 10 }}>
            <Card style={{ width: 420, height: 'auto', borderRadius: 8 }}>
                <CardHeader
                    style={{ margin: '16px 38px 16px 20px', padding: 0 }}
                    title='Seleccion de candidatos'
                    classes={{ title: classes.titleCardheader }}
                />
                <Divider />
                <CardContent style={{ margin: '20px 38px 35px 42px', padding: 0 }}>
                    <Typography className={classes.text}>
                        ¿Para qué etapa es la tarea?
                    </Typography>
                    <Select
                        native
                        style={{
                            width: 340,
                            fontSize: '14px',
                            color: '#595959',
                            lineHeight: '16px',
                            fontWeight: 'normal'
                        }}
                    >
                        {
                            optionSelect.map((item) => (
                                <option
                                    value={item}
                                    style={{
                                        fontSize: '14px',
                                        color: '#595959',
                                        lineHeight: '16px',
                                        fontWeight: 'normal'
                                    }}
                                >
                                    {item}
                                </option>
                            ))
                        }

                    </Select>
                    <Typography className={classes.text}>
                        ¿Para que candidato es la tarea?
                    </Typography>
                    <FormGroup style={{ display: ' flex', flexDirection: 'row' }}>
                        {labelCheckbox.map((txt) => (
                            <FormControlLabel
                                value={txt}
                                control={
                                    <Checkbox color='primary' />
                                }
                                label={txt}
                                style={{
                                    fontStyle: 'normal',
                                    fontWeight: 'normal',
                                    fontSize: '14px',
                                    lineHeight: '16px',
                                    color: '#595959'
                                }}
                            />
                        ))}
                    </FormGroup>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid #E8E8E8',
                        boxSizing: 'border-box',
                        borderRadius: '4px',
                        margin: '14px 0px 12px 0px',
                        width: '340px',
                        height: '40px',
                        justifyContent: 'space-between'
                    }} >
                        <InputBase
                            placeholder="Buscar candidato"
                            inputProps={{
                                'aria-label': 'search'
                            }}
                            style={{
                                marginLeft: '11px',
                            }}
                            className={classes.searchCandidate}
                        />
                        <div style={{ marginRight: '9PX' }} >
                            <SearchIcon fontSize='small' className={classes.icon} />
                        </div>
                    </div>
                    {/* <List > */}
                    {label.map(({ id, name, src }) => (
                        // <Card key={id} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }} >
                        //     <ListItemAvatar aria-label="recipe">
                        //         <Checkbox color='primary' />
                        //     </ListItemAvatar>
                        //     <ListItemText primary={name} />
                        // </Card>
                        <CardCandidate
                            style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}
                            label={name}
                            src={src}
                            id={id}
                        />
                    ))}

                    {/* </List> */}
                </CardContent>

            </Card>
        </div >
    )
}

SelectCandidates.propTypes = {
    optionSelect: PropTypes.array,
    labelCheckbox: PropTypes.array,
    CardCandidate: PropTypes.any,
    label: PropTypes.array
}

SelectCandidates.muiName = 'SelectCandidates';

export default withStyles(styles, { name: 'KrowdySelectCandidates' })(SelectCandidates)