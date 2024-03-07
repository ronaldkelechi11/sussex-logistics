import '../components/Contact.scss'

const Contact = () => {

    return (
        <div className="footer" id='contact'>
            <div className="footer_top">
                <div className="footer_top_grid">
                    <div className="footer_top_grid_card">
                        <div className="logoImage"></div>
                        <h3>Sussex Logistics and Shipping</h3>
                    </div>
                    <div className="footer_top_grid_card"></div>
                    <div className="footer_top_grid_card">
                        <h4>Email</h4>
                        <h5>billing4sussexlogistics@gmail.com</h5>
                    </div>
                    <div className="footer_top_grid_card">
                        <h4>Phone Number</h4>
                        <h5>+44 7466 116125</h5>
                    </div>
                </div>
                <div className="footer_top_col">
                    <h1>Track your shipments, make deliveries fast and swift now.</h1>
                    <a href="#track" className="footer_top_col_button">Track</a>
                </div>
            </div>
            <div className="footer_bottom">
                <div className="orgName">© 2002 SUSSEX LOGISTICS</div>
            </div>
        </div>
    )
}

export default Contact
