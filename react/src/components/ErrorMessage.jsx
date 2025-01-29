export const ErrorMessage = ({ error }) => {
    return (
        <div className="error" style={{ border: '1px solid red', padding: '4px 10px', color: 'red' }}>
            <h3>Error: {error}</h3>
        </div>
    )
}