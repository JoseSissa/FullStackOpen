import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

export default function Filters() {
    const dispatch = useDispatch()

    const filterSelected = value => {
        dispatch(filterChange(value))
    }

    return (
        <div>
            <label htmlFor="all">
                ALL
                <input type="radio" id="all" name="filter" onChange={() => filterSelected('ALL')} defaultChecked />
            </label>
            <label htmlFor="important">
                IMPORTANT
                <input type="radio" id="important" name="filter" onChange={() => filterSelected('IMPORTANT')} />
            </label>
            <label htmlFor="nonimportant">
                NONIMPORTANT
                <input type="radio" id="nonimportant" name="filter" onChange={() => filterSelected('NONIMPORTANT')} />
            </label>
        </div>
    )
}