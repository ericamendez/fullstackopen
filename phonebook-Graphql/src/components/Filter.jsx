const Filter = ({value, handleChange}) => {
    return (
        <div>
            filter by name <input type="text" value={value} onChange={handleChange} />
        </div>
    )
}

export default Filter