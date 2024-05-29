import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Select from "react-select";
import axios from "axios";

interface Data {
    id: string;
    AppName: string;
}

interface DivisionApplication {
    id: string;
    DivisonName: string;    
    Status: string;
}

interface DivisionList {
    DivisionId: string;
    DivisionName: string;    
    Status: string;
}


const Drivers = () => {
    const [datas, setDatas] = useState<Data[]>([]);

    const [selectedOption, setSelectedOption] = useState<string>("");

    const [selectedItem, setselectedItem] = useState<DivisionApplication[]>([]);

    const [Divisions, setDivisions] = useState<SelectOption[]>([]);

    const [dropDownVal, setdropDownVal] = useState<SelectOption[]>([
        { value: "chocolate", label: "Chocolate" },
    ]);

    interface SelectOption {
        value: string;
        label: string;
    }

    useEffect(() => {
        getDatas();
       
    }, []);

    const getDatas = async () => {
        
        axios.get("http://localhost:3001/users").then(({ data }) => {
            
            console.log(data);
            setDatas(data);
            var temp: SelectOption[] = [];
            for (let i = 0; i < data.length; i++) {
                temp.push({ value: data[i].ApplicationId, label: data[i].ApplicationName });
            }
            setdropDownVal(temp);
        });
    };
    
    const getDivisionList = async (a) => {
        alert('selectedOption',selectedOption);
        //setSelectedOption(a);
        var PreValues=[]
        axios.get('http://localhost:3001/Values').then(({data})=>{
            PreValues=data
            
        })
        

        axios.get("http://localhost:3001/Division").then(({ data }) => {
            console.log(data);
            setDatas(data);
            var temp: SelectOption[] = [];

            var warn = PreValues.filter(item => 
                data.some(value => item.DivisionName === value.DivisionName)
            );
            console.log('w',warn);
            

            for (let i = 0; i < warn.length; i++) {
                
                   
                   temp.push({ value: warn[i].DivisionId, label: warn[i].DivisionName });
                   
            }
            setDivisions(temp);
        });
    };

    const handleSelectChange = (selectedOption: SelectOption) => {
        
        const { value, label } = selectedOption;
        alert(value);
        setSelectedOption(value);
        getDevisions(value);        
        getDivisionList(value);
    };

    const getDevisions = (value: string) => {
      
       // alert(value);
        axios

            .get("http://localhost:3001/Values/" + value)
            .then((res) => {
                console.log(res);
                setselectedItem([res.data]);
            })
            .catch((err) => {
                if (err.message === "Request failed with status code 404") {
                    setselectedItem([]);
                }
            });
    };

    const customStyles = {
        menuList: (provided: any) => ({
            ...provided,
            maxHeight: "160px",
            overflowY: "auto",
        }),
    };

    const handleDelete = (id: string) => {
        axios.delete("http://localhost:3001/Values/" + id).then((res) => {
            getDevisions(id);
        });
    };

    const handleSelectDevision = (selected: SelectOption) => {
        
    };

    return (
        <div className="flex ">
            {" "}
            <Sidebar />{" "}
            <div className="mt-10 p-3 w-full">
                {" "}
                <div className="">
                    {" "}
                    <label htmlFor="search" className="py-2 text-gray-500">
                        Select the Application{" "}
                    </label>{" "}
                    <Select
                        id="search"
                        styles={customStyles}
                        options={dropDownVal}
                        className="w-[200px] my-1"
                        onChange={handleSelectChange}
                    />{" "}
                </div>{" "}
                <div className="w-full my-3 h-[360px] overflow-auto shadow-md sm:rounded-lg">
                    {" "}
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        {" "}
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            {" "}
                            <tr>
                                {" "}
                                <th scope="col" className="px-6 py-3">
                                    {" "}
                                    Division ID{" "}
                                </th>{" "}
                                <th scope="col" className="px-6 py-3">
                                    {" "}
                                    Division Name{" "}
                                </th>{" "}                               
                                <th scope="col" className="px-6 py-3">
                                    {" "}
                                    Status{" "}
                                </th>{" "}
                                <th scope="col" className="px-6 py-3">
                                    {" "}
                                    Actions{" "}
                                </th>{" "}
                            </tr>{" "}
                        </thead>{" "}
                        <tbody className="w-full overflow-y-scroll">
                            {" "}
                            {selectedItem.map((item, index) => (
                                
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    {" "}
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {" "}
                                        {item.id}{" "}
                                    </th>{" "}
                                    <td className="px-6 py-4">{item.DivisionName}</td>{" "}                                    
                                    <td className="px-6 py-4">{item.Status}</td>{" "}
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
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="my-1 p-2 flex justify-between items-center shadow ">
                    <Select
                        id="lstDivision"
                        styles={customStyles}
                        options={Divisions}
                        className="w-[200px] my-1"
                        onChange={handleSelectDevision}
                    />
                    <button
                        // onClick={handleNewEntry}
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2 my-2 ml-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Drivers;
