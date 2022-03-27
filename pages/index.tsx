import Head from 'next/head'
import React from 'react';
import axios from 'axios';

import Table from '../components/Table';

//@ts-ignore
import styles from '../styles/Home.module.css'

const primaryHost = 'rsba-company-test2-8ef51jc7m-angheloamir.vercel.app';

export default function Home(props) {
  const [appstate, setstate] = React.useState(null);
  const [uploadstate, setupload] = React.useState(0);
  const [csverror, seterror] = React.useState([]);
  const [csvdata, setdata] = React.useState([]);
  const [selectv, setselect] = React.useState('-ALL-');
  const [name , setname] = React.useState('');
  const [career , setcareer] = React.useState('');

  function onFileChange(event) {
    setstate( event.target.files[0] );
  };

  async function onFileUpload() {
    if(appstate == null || appstate == undefined)
      return;

    const formData = new FormData();

    formData.append(
      "myFile",
      appstate
    );
    
    setupload(0);

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        setupload( Math.round((event.loaded * 100) / event.total ));
      },
    };

    const response = await axios.post(primaryHost + '/api/upload', formData, config);
    if(response.data.error) {
      seterror(response.data.error);
      setdata([]);
    }
    else {
      setdata(response.data.data);
      seterror([]);
    }
  };

  async function findYear() {
    if(selectv == '-ALL-') {
      const response = await axios.get(primaryHost + '/api/load');
      setdata(response.data.data);
      return;
    };
    const response = await axios.post(primaryHost + '/api/byyear', {
      year: selectv
    });
    setdata(response.data.data);
  }

  async function topPerYear() {
    const response = await axios.get(primaryHost + '/api/bytopyear');
    setdata(response.data.data);
  }

  async function lookName() {
    const response = await axios.post(primaryHost + '/api/name', {
      recipient: name
    });

    if(response.data.data.length == 0)
      alert('Name does not match to any save Recipient name');
    else
      setdata(response.data.data);
  }

  async function lookCareer() {
    const response = await axios.post(primaryHost + '/api/career', {
      career: career
    });

    if(response.data.data.length == 0)
      alert('Name does not match to any save Career');
    else
      setdata(response.data.data);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Task 2</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p className={styles.description}>
          Get started by uploading a CSV
        </p>

        <div className={styles.card}>
          <div className={styles.grid}>
            <input type="file" onChange={onFileChange} />
            <br />
            <button onClick={onFileUpload}> Upload!</button>
            <h4>Uploading: {uploadstate}%</h4>
          </div>
        </div>

      <div>
        <label>Show Rank In Year:</label>
        <select name="year" id="year"
          value={selectv} 
          onChange={e=>setselect(e.target.value)}
        >
          <option value="-ALL-">-ALL-</option>
         <option value="1999">1999</option>
         <option value="2000">2000</option>
         <option value="2001">2001</option>
         <option value="2002">2002</option>
         <option value="2003">2003</option>
         <option value="2004">2004</option>
         <option value="2005">2005</option>
         <option value="2006">2006</option>
         <option value="2007">2007</option>
         <option value="2008">2008</option>
         <option value="2009">2009</option>
         <option value="2010">2010</option>
         <option value="2011">2011</option>
         <option value="2012">2012</option>
         <option value="2013">2013</option>
         <option value="2014">2014</option>
         <option value="2015">2015</option>
         <option value="2016">2016</option>
         <option value="2017">2017</option>
        </select>
        <button onClick={findYear}>Sort</button>
        </div>

        <br />
        <div>
          <input type='text' onChange={e => setname(e.target.value)} />
          <button onClick={lookName}>Look up by name</button>
        </div>

        <br />
        <div>
          <input type='text' onChange={e => setcareer(e.target.value)} />
          <button onClick={lookCareer}>Look up by Career</button>
        </div>
        
        <br />
        <button onClick={topPerYear}>All Top One per Year</button>


        { csverror.length > 0 &&
          <div>
            <h3 style={{color: 'red'}}> CSV Error </h3>
            { csverror.map((error :string, index :number) => {
              return (
                <p key={index}> {error} </p>
              )
            })
            }
          </div>
        }

      <Table
        data={csvdata}
        staticProps={props.data}
        hasError={csverror.length > 0}
      />
       
      </main>

 
 <br />
 <br />
 <br />
 <br />
 <br />
    </div>
  )
}

export async function getServerSideProps(context) {
  const datas = await axios.get('http://localhost:3000/api/load');
  return {
    props: {
      data: datas.data
    }, 
  }
  
}
