import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Select from 'react-select';
import axios from 'axios';
const Drivers = () => {
  const [datas, setDatas] = useState([])
  const [selectedItem, setselectedItem] = useState([])
  const [selectedDivisionItem, setselectedDivisionItem] = useState()
  const [Divisions, setDivisions] = useState([])
  const [dropDownVal, setdropDownVal] = useState([{ value: 'chocolate', label: 'Chocolate' }])
  useEffect(()=>{
    getDatas()
  },[])
  const getDatas = async () => {
    axios.get("http://localhost:8000/users").then(({data}) => {
      console.log(data);
      setDatas(data);
      var temp=[]
      for(let i=0;i<data.length;i++){
        temp.push({ value:data[i].id, label:data[i].AppName })
      }
      setdropDownVal(temp)
    });
  };
  const handleSelectChange=(selectedOption)=>{
    const {value,label}=selectedOption
    // var tempData=
    // alert(JSON.stringify(value))
    getDevisions(value)
  }
  const getDevisions=(value)=>{
    var Devs=[]
    axios.get('http://localhost:8000/Division/'+value).then(({data})=>{
      console.log(data);  
      Devs=data.values
      setDivisions(data.values)
      }).catch((err)=>{
        if(err.message=='Request failed with status code 404'){
          setDivisions([])
        }
      })
      axios.get('http://localhost:8000/Values/'+value).then(({data})=>{
        console.log('Values',data); 
        console.log('Devs',Devs); 

        var tempValue=[]
  
        for(let i=0;i<data.values.length;i++){
        for(let j=0;j<Devs.length;j++){
          if(Devs[j].AppName !==data.values[i].AppName){
            if(tempValue.length==0){
          tempValue.push({ value:data.values[i].id, label:data.values[i].AppName })
            }else{
           if(tempValue.filter((item)=>item.label==data.values[i].AppName).length==0){
          tempValue.push({ value:data.values[i].id, label:data.values[i].AppName })
           }
          }
          }
        }

        }
        setselectedItem(tempValue)
        }).catch((err)=>{
          if(err.message=='Request failed with status code 404'){
            setselectedItem([])
          }
        })
  }

  const customStyles = {
    menuList: (provided) => ({
      ...provided,
      maxHeight: '160px', // Limit height to approx. 5 options (adjust as necessary)
      overflowY: 'auto',
    }),
  };
  const handleDelete=(id)=>{
    axios.delete("http://localhost:8000/Division/"+id).then((res) => {
      getDevisions(id)
    });
  }
  const handleSelectDevision=(selected)=>{
    setselectedDivisionItem(selected)
  }
  const handleNewDevision=()=>{
    const {value,label}=selectedDivisionItem

    axios
    .post("http://localhost:8000/Division", {
      AppID:1,
      AppName:label,
      AppDescription: 'des',
      Status: 'appStatus',
      id:value
    })
    .then((res) => {
      console.log(res, "red----");
      getDevisions(value)
    });
  }
  return (
    <div className='flex '>
        <Sidebar/>
        <div className='mt-10 p-3 w-full'>
          <div className=''>
          <label htmlFor="search" className='py-2 text-gray-500'>Select App </label>
        <Select id='search'  styles={customStyles}  options={dropDownVal} className='w-[200px] my-1'   onChange={handleSelectChange} />
          </div>
        <div className=" w-full my-3 h-[360px] overflow-auto shadow-md sm:rounded-lg">
        <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                App ID
              </th>
              <th scope="col" className="px-6 py-3">
                App Name
              </th>
              <th scope="col" className="px-6 py-3">
                App Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="w-full  overflow-y-scroll">
            {Divisions.map((item, index) =>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.AppID}
                  </th>
                  <td className="px-6 py-4">{item.AppName}</td>
                  <td className="px-6 py-4">{item.AppDescription}</td>
                  <td className="px-6 py-4">{item.Status}</td>
                  <td className="px-6 py-4 text-right flex items-center">
                   
                    <button
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline ml-5"
                    >
                      Del
                    </button>
                  </td>
                </tr>
              
            )}
          </tbody>
        </table>
      </div>
      <div className='my-1 p-2 flex justify-between items-center shadow '>
      <Select id='search' styles={customStyles}  options={selectedItem} className='w-[200px] my-1'   onChange={handleSelectDevision} />
      <button
        onClick={handleNewDevision}
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2 my-2 ml-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
      </div>
        </div>
    </div>
  )
}

export default Drivers