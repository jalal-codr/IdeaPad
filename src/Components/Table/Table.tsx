// import {useCookies} from 'react-cookie'
import moment from 'moment';

interface Props {
    data: {
        _id:string,
        tittle:string,
        updatedAt:any

    },
  }

function Table(props:Props) {
  return (
    <>
            <div  className="Tables">
                <h4  className='note_tittle'>{props.data.tittle}</h4>
                <p  className='time_update'> last updated at <time className="text-xs opacity-50">{moment(props.data.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</time></p>
                
            </div>
    </>
  )
}

export default Table
