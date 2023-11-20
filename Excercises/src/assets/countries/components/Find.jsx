const Find = ({handleInput}) => {
    return (
        <div>
            <h4>Find A Country</h4>
            <input type="text" onChange={handleInput} />
        </div>
    )
}

export default Find