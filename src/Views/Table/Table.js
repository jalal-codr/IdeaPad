import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useCookies } from 'react-cookie';
function Table() {
    const [cookies] = useCookies(['sheet', 'table']);
    const note = cookies.table.url;
    const src = cookies.sheet.url;
    const render = () => {
        if (note != "") {
            return (_jsxs(_Fragment, { children: [" ", _jsx("iframe", { src: src, className: 'iframe' })] }));
        }
        else if (src != "") {
            return (_jsxs(_Fragment, { children: [" ", _jsx("iframe", { src: src, className: 'iframe' })] }));
        }
    };
    return (_jsx(_Fragment, { children: render() }));
}
export default Table;
