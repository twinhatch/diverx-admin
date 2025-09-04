import React, { useEffect, useState, useMemo } from 'react'
// import { Api } from "../src/services/service";
import { useRouter } from "next/router";
import ReportsTable from "../src/components/reported/reportsTable";
import Table from "../src/components/reported/customTableAct";
import { Api, timeSince } from '@/utils/service';
import moment from 'moment'

function Reportedissue(props) {
  const router = useRouter();
  const [GetInTouchData, setGetInTouchData] = useState([]);
  const [mainList, setmainList] = useState([]);
  const [activitytype, setActiVityType] = useState("All");

  useEffect(() => {
    getReports();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Activity",
        Cell: ReportsTable,
      },
    ],
    []
  );

  useEffect(() => {
    if (activitytype === "All") {
      setGetInTouchData(mainList);
    } else {
      let d = [];
      if (activitytype === "Hour") {
        d = mainList.filter(
          (f) =>
            timeSince(f.createdAt).includes("Min") ||
            timeSince(f.createdAt).includes("Hour") ||
            timeSince(f.createdAt).includes("1 Day")
        );
      }
      if (activitytype === "Day") {
        d = mainList.filter(
          (f) =>
            timeSince(f.createdAt).includes("Min") ||
            timeSince(f.createdAt).includes("Hour") ||
            timeSince(f.createdAt).includes("Day") ||
            timeSince(f.createdAt).includes("1 Week")
        );
      }
      if (activitytype === "Week") {
        d = mainList.filter(
          (f) =>
            timeSince(f.createdAt).includes("Min") ||
            timeSince(f.createdAt).includes("Hour") ||
            timeSince(f.createdAt).includes("Day") ||
            timeSince(f.createdAt).includes("Week") ||
            timeSince(f.createdAt).includes("1 Month")
        );
      }

      setGetInTouchData(d);
    }
  }, [activitytype]);

  const getReports = () => {
    props.loader(true);
    Api("get", "/api/getAllReports", '', router).then(
      (res) => {
        console.log("res================>", res.data.incident);
        props.loader(false);

        if (res?.status) {
          console.log(res.data)
          setGetInTouchData(res.data)
          setmainList(res.data)
        } else {
          console.log(res?.data?.message);
          props.toaster({ type: "error", message: res?.data?.message });
        }
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.data?.message });
        props.toaster({ type: "error", message: err?.message });
      }
    );
  };


  return (
    <div className="w-full mx-auto p-5">
      {/* <div className='w-full space-y-4'> */}
      <div className='p-6 border-2 border-custom-lightBlue rounded-[15px] flex items-center justify-between'>
        <div className='w-full'>
          <p className='text-black text-2xl font-bold	MerriweatherSans'>{`${moment(new Date()).format('DD-MMM-YYYY')} , ${moment(new Date()).format('dddd')}`}</p>
          <h2 className='text-blac text-4xl font-bold	MerriweatherSans'>Hello <span className='text-custom-lightBlue'>Demomail</span></h2>
        </div>
      </div>
      <div className="md:grid grid-cols-2 bg-[#E9E9E9] md:px-5 p-4 rounded-xl border-t-8 border-custom-blue mt-4">
        <div className='md:mb-0 mb-3'>
          <p className="text-[28px] text-custom-black font-bold	">
            Report Issue
          </p>
        </div>
        <div className="flex justify-end items-center">
          <div className="flex rounded-lg w-60 bg-black">
            <button
              className={`text-white ${activitytype === "Hour" && "bg-custom-blue"
                } rounded-lg text-sm font-bold h-8  w-20 `}
              onClick={() => setActiVityType("Hour")}
            >
              Today
            </button>
            <button
              className={`text-white ${activitytype === "Day" && "bg-custom-blue"
                } rounded-lg text-sm font-bold h-8  w-20 `}
              onClick={() => setActiVityType("Day")}
            >
              Week
            </button>
            <button
              className={`text-white ${activitytype === "Week" && "bg-custom-blue"
                } rounded-lg text-sm font-bold h-8  w-20 `}
              onClick={() => setActiVityType("Week")}
            >
              Month
            </button>

            <button
              className={`text-white ${activitytype === "All" && "bg-custom-blue"
                } rounded-lg text-sm font-bold h-8  w-20 `}
              onClick={() => setActiVityType("All")}
            >
              All
            </button>
          </div>
        </div>


      </div>
      <div className="rounded-xl border-[2px] border-custom-blue md:px-5 px-3">
        <Table columns={columns} data={GetInTouchData} />
      </div>
      {/* </div> */}
    </div>
  );
}

export default Reportedissue