import { useSelector } from 'react-redux';


const InfoUserLogged = () => {
    const {info} = useSelector((state) => state.auth)
console.log(info)
    const userInfo = info.postIds?.map(e =>{
        return (<div>{e.title}</div>)
    })
  return (
    <div>{userInfo}</div>
  )
}

export default InfoUserLogged