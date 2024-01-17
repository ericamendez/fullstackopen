import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Filter = () => {
    const dispatch = useDispatch();

    const handleFilter = (e) => {
        console.log(e.target.value);
        dispatch(filterChange(e.target.value));
    }

    return (
        <div>
            <input type="text" placeholder="Search..." onChange={handleFilter} />
        </div>
    )
}

export default Filter;