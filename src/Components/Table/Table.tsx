import {useCookies} from 'react-cookie'
import moment from 'moment';

interface Props {
    data: {
        _id:string,
        tittle:string,
        url:String,
        updatedAt:any

    },
  }

function Table(props:Props) {
  const [, setCookie] = useCookies(['table']);

  const clickTable= ()=>{
    setCookie('table',{
      url : props.data.url
    })
    window.location.href='/table';
  }
  return (
    <>
            <div   onClick={clickTable} className="Tables">
                <h4  className='note_tittle'>{props.data.tittle}</h4>
                <p  className='time_update'> last updated at <time className="text-xs opacity-50">{moment(props.data.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</time></p>
                
            </div>
    </>
  )
}

export default Table
