import { useDispatch } from "react-redux";
import { setBreadcrumbAction } from 'store/PageReducer';

export const usePageProps = () => {
    const dispatch = useDispatch();

    return async (props) => {
        props.breadcrumb && await dispatch(setBreadcrumbAction(props.breadcrumb));
    }
}