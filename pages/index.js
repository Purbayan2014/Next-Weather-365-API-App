import Head from 'next/head';
import SearchBox from '../components/SearchBox';
import FamousPlaces from '../components/FamousPlaces';

export default function Home() {
  return (
    <div >
      <Head>
        
        <title>Weather App - Next 365 </title>
      </Head>
      
    
      <div className="home">
        <div className="container">
         
          <h1>Next Weather App 365 </h1>
          <SearchBox placeholder="Search for a City..." />
          <FamousPlaces />
        </div>
      </div>
      
      <div className="container">
       <div className="bottomright">
        <h3>Developed By Purbayan Majumder 👨‍💻 </h3>
        </div>
      </div>
    </div>
  )
}
