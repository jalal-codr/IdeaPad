import {useCookies} from 'react-cookie'
function Table() {
    const [cookies] = useCookies(['sheet']);
    const src:string = cookies.sheet.url
  return (
    <>
     <iframe src={src} width="100%" height="780"></iframe>
    </>
  )
}

export default Table
