import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCookies } from 'react-cookie';
import moment from 'moment';
function Table(props) {
    const [, setCookie] = useCookies(['table']);
    const clickTable = () => {
        setCookie('table', {
            url: props.data.url
        });
        window.location.href = '/table';
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { onClick: clickTable, className: "Tables", children: [_jsx("h4", { className: 'note_tittle', children: props.data.tittle }), _jsxs("p", { className: 'time_update', children: [" last updated at ", _jsx("time", { className: "text-xs opacity-50", children: moment(props.data.updatedAt).format('MMMM Do YYYY, h:mm:ss a') })] })] }) }));
}
export default Table;
