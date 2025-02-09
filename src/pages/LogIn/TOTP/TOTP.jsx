// TOTP page
function TOTP() {
    // Select between recovery code and TOTP

    return (
        <div>
            <h1>TOTP</h1>
            <form>
                <input type="text" placeholder="Enter the code"/>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default TOTP