import { NavLink } from "react-router"

export function AppHeader() {


    return <>
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>Miss-Toy</h1>

                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/toys" >Toys</NavLink>
                    <NavLink to="/about" >About</NavLink>
                </nav>
            </section>
        </header>
        </>
}