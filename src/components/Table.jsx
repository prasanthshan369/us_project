import axios from "axios";
import React, { useEffect, useState } from "react";
// import { data } from '../helpers/application'

const Table = () => {
  const [appName, setAppName] = useState("");
  const [appDescription, setAppDescription] = useState("");
  const [appStatus, setAppStatus] = useState("");
  const [newEntry, setNewEntry] = useState(false);
  const [AppID, setAppID] = useState(0);
  const [editId, setEditId] = useState(-1);
  const [Datas, setDatas] = useState([]);

  useEffect(() => {
    getDatas();
  }, [editId]);
  const getDatas = async () => {
    axios.get("http://localhost:8000/users").then((res) => {
      console.log(res.data);
      setDatas(res.data);
    });
  };
  const handleUpdate = (id) => {
    setEditId(id);
    var val = Datas.filter((item, index) => item.AppID == id);
    // console.log();
    setNewEntry(false);
    setAppName(val[0].AppName);
    setAppDescription(val[0].AppDescription);
    setAppStatus(val[0].Status);
    setAppID(val[0].AppID);
  };
  const handleUpdated = () => {
    if (newEntry) {
      // setDatas((prev)=>{
      //     var temp={
      //         "AppID": Datas.length+1,
      //         "AppName": appName,
      //         "AppDescription":appDescription,
      //         "Status":appStatus
      //     }
      //     return[...prev,temp]
      // })
      axios
        .post("http://localhost:8000/users", {
          AppID: Datas.length + 1,
          AppName: appName,
          AppDescription: appDescription,
          Status: appStatus,
        })
        .then((res) => {
          console.log(res, "red----");
        });
      console.log(Datas);
      setEditId(-1);
      setNewEntry(false);
    } else {
      var val = Datas.filter((item, index) => item.AppID == editId);
      // val[0].AppName=appName
      // val[0].AppDescription=appDescription
      // val[0].Status=appStatus
      axios
        .put("http://localhost:8000/users/" + val[0].id, {
          AppName: appName,
          AppDescription: appDescription,
          Status: appStatus,
        })
        .then((res) => {
          console.log(res);
        });
      setEditId(-1);
      setNewEntry(false);
    }
  };
  const handleNewEntry = () => {
    setEditId(1);
    setNewEntry(true);
    setAppName("");
    setAppDescription("");
    setAppStatus("");
    setAppID(Datas.length + 1);
  };
  const handleDelete = (id) => {
    // var val=Datas.filter((item,index)=>item.AppID!=id)
    // setDatas(val)
    var val = Datas.filter((item, index) => item.AppID == id);
    axios.delete("http://localhost:3001/users/" + val[0].id).then((res) => {
      console.log(res);
      getDatas();
    });
  };
  return (
    <div>
      <button
        onClick={handleNewEntry}
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2 my-2 ml-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add New
      </button>

      <div className=" w-full mt-1 max-h-[520px] overflow-auto shadow-md sm:rounded-lg">
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
            {Datas.map((item, index) =>
              item.AppID == editId ? (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {AppID}
                  </th>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={appName}
                      onChange={(e) => {
                        setAppName(e.target.value);
                      }}
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      id="first_name"
                      value={appDescription}
                      onChange={(e) => setAppDescription(e.target.value)}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      id="first_name"
                      value={appStatus}
                      onChange={(e) => setAppStatus(e.target.value)}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => {
                        handleUpdated();
                      }}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      {newEntry ? "Add" : "Update"}
                    </button>
                  </td>
                </tr>
              ) : (
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
                        handleUpdate(item.AppID);
                      }}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(item.AppID);
                      }}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline ml-5"
                    >
                      Del
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
