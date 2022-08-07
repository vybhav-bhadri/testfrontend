import classes from './StartingPageContent.module.css';
import { useState,useEffect } from 'react';

const StartingPageContent = () => {

  let [totalPageCount,settotalPageCount] = useState(0);
  const [err, setErr] = useState('');

  useEffect(()=>{
    async function getPageCount(){
      try {
        const response = await fetch('http://localhost:4000/folder/totalPageCount', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();

        console.log('result is: ', JSON.stringify(result, null, 4));

        settotalPageCount(result);
      } catch (err) {
        setErr(err.message);
      }
    }

    getPageCount();
  },[])

  return (
    <section className={classes.starting}>
      <h3>search bar</h3>
      <h3>select folder and file</h3>
      <h1>Total pages {totalPageCount}</h1>
    </section>
  );

}


export default StartingPageContent;
