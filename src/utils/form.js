export const changeValue = (e, setValues) => {
    let { id, type, value, checked } = e.target;

    if (type === 'checkbox') {
        value = checked;
    } else value = value.trim('')

    setValues(prevValues => {
        return {
            ...prevValues,
            [id]: value
        }
    })
}