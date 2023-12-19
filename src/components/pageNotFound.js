import {Link} from 'react-router-dom';

const PageNotFound=()=>{
    return <>
    <h1 className="display-1 text-center mt-5 text-danger">Page Not Found</h1>
    <p className="h5 text-center"><Link className="text-danger" to="/">Go to Home</Link></p>
    </>
}

export default PageNotFound;