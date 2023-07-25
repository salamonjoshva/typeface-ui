import styles from "../header/Header.module.css"
import typeFaceLogo from "../../assests/logo-nav.svg";

const Header = (props) => {
    return (
        <div className={styles.leftSec}>
            <h1 className={styles.title}><img src={typeFaceLogo} alt="" className={styles.icon} /></h1>
      </div>
    )
}


export default Header;