const NewPersonForm = ({handleAdd, name, number, handleChange}) => {
    return (
        <div>
            <h3>Add New Person</h3>
            <div>
                <form onSubmit={handleAdd}>
                    <div>
                        name: <input value={name} onChange={handleChange} />
                    </div>
                    <div>
                        number: <input value={number} onChange={handleChange} />
                    </div>
                    <div>
                        <button type="submit" >add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewPersonForm