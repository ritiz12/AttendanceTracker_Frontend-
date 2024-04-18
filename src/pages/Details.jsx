import Header from '../components/Header'
import SpendFooter from '../components/SpendFooter'
import DetailsMain from '../components/DetailsMain'

const Details = () => {
  return (
    <div className='details-page'>
        <Header/>

       <DetailsMain/>
        <SpendFooter/>

    </div>
  )
}

export default Details