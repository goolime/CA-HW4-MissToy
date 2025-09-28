import logo from '../assets/img/Loading.gif'

export function Loading(){
  return <>
    <div className='loading'>
      <img src={logo} />
    </div>
  </>
}