import {useCookies} from 'react-cookie'
function Table() {
    const [cookies] = useCookies(['sheet','table']);
    const note:string = cookies.table.url;
    const src:string = cookies.sheet.url

    
    const render =()=>{
      if(note!=""){
        return(<> <iframe src={src} width="100%" height="780"></iframe></>)
      }else if(src!=""){
        return(<> <iframe src={src} width="100%" height="780"></iframe></>)
      }
    }
  return (
    <>
     {
      render()
     }
    </>
  )
}

export default Table
