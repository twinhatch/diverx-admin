import moment from "moment";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { BsGraphUp } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { products } from "@/utils/data";
import Table from "@/src/components/Table/table";
import { RxCross2 } from "react-icons/rx";
import { AiFillEye } from "react-icons/ai";
import { Api } from "@/utils/service";
import { useRouter } from "next/router";
import { userContext } from "./_app";

const News = (props) => {
  const [popup, setPopUp] = useState(false);
  const [popupservice, setPopUpservice] = useState(false);
  const [packagesData, setPackagesData] = useState([]);
  const [productPopup, setProductPopup] = useState(false);
  const [deleteid, setdeleteid] = useState(null);
  const [popUpData, setPopUpData] = useState({});
  const [popupPackage, setPopupPackage] = useState({});
  const [user, setUser] = useContext(userContext);
  const [mainList, setmainList] = useState([]);
  const [servicelist, setServiceList] = useState([]);
  const router = useRouter();
  const [data, setData] = useState({
    heading: "",
    image: "",
    newsLink: "",
    description: "",
  });
  useEffect(() => {
    getNews()
  }, []);
  const getNews = async () => {
    props.loader(true);
    Api("get", "/api/getallnews", "", router).then(
      (res) => {
        props.loader(false);
        console.log("res================>", res);
        setServiceList(res);
        // setmainList(res.data)
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  };
  const deleteService = async (id) => {
    props.loader(true);
    Api("delete", `/api/deletenews/${id}`, "", router).then(
      (res) => {
        props.loader(false);
        console.log("res================>", res);
        getNews();
        setProductPopup(false);
        setdeleteid(null);
        // setServiceList(res)
        // setmainList(res.data)
      },
      (err) => {
        props.loader(false);
        setProductPopup(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  };
  const submit = (e) => {
    e.preventDefault();
    console.log(data);
    let method = "post";
    let url = "/api/postnews";
    if (data._id) {
      url = `/api/updatenews/${data._id}`;
      method = "put";
    }

    Api(method, url, data, router).then(
      (res) => {
        console.log("Post service", res);
        setData({
          heading: "",
          image: "",
          newsLink: "",
          description: "",
        });
        getNews();
        setPopUpservice(false);
      },
      (err) => {
        console.log(err);
        props.loader(false);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  };

  const statusHandler = ({ value }) => {
    return (
      <div className=" p-4  flex items-center  justify-center">
        <p className="font-semibold text-md text-green-400">
          {value?.toString()}
        </p>
      </div>
    );
  };

  const nameHandler = ({ value }) => {
    return (
      <div className=" p-4  flex flex-col items-center  justify-center">
        <p className="font-semibold text-md ">{value}</p>
        {/* <p className="font-semibold text-md ">UserID #{value.userID}</p> */}
      </div>
    );
  };
  const typeHandler = ({ value }) => {
    return (
      <div className=" p-4  flex flex-col items-center  justify-center">
        <p className="font-semibold text-md ">{value}</p>
        {/* <p className="font-semibold text-md ">UserID #{value.userID}</p> */}
      </div>
    );
  };

  const iconHandler = ({ value, row }) => {
    return (
      <div className=" p-4  flex items-center  justify-center gap-4">
        {/* <p className="font-semibold text-md text-blue-400">{value}</p> */}
        <img src={value} className="h-[50px] w-[50px]" onError={imageOnError} />
        {/* <img src="https://png.pngtree.com/png-clipart/20190614/original/pngtree-info-vector-icon-png-image_3791375.jpg" className="h-[50px] w-[50px]"/> */}
      </div>
    );
  };
  const actionHandler = ({ value, row }) => {
    //console.log(row.original._id)
    return (
      <div className=" p-4  flex items-center  justify-center">
        <button
          className="h-[38px] w-[89px] bg-custom-blue text-custom-darkBlack text-base	font-normal Poppins"
          onClick={() => {
            setData(row.original), setPopUpservice(true);
          }}
        >
          Edit
        </button>
        <button
          className="h-[38px] w-[89px] bg-custom-blue text-custom-darkBlack text-base	font-normal Poppins ml-[20px]"
          //  onClick={() => {deleteService(row.original._id)}}
          onClick={() => {
            setProductPopup(true), setdeleteid(row.original._id);
          }}
        >
          Delete
        </button>
      </div>
    );
  };

  const popUpHandler = (id) => {
    console.log(id);
    setPopUp(!popup);
    setProductPopup(false);
    const data = packagesData.filter((pack) => id === pack._id);
    // console.log(usersList.filter((user) => id === user._id)[0])
    setPopUpData(data[0]);
    console.log(data);
    // console.log(popup)
  };
  const packagesPophandler = (id) => {
    console.log(id);
    setPopUp(false);
    setProductPopup(!productPopup);
    const data = packagesData.filter((pack) => id === pack._id);
    // console.log(usersList.filter((user) => id === user._id)[0])
    setPopupPackage(data[0]);
    console.log(data);
    // console.log(popup)
  };

  const verifyPackage = (status) => {
    props.loader(true);

    const requestBody = {
      status: status,
      package_id: popUpData._id,
    };

    Api("post", "/api/verifyPackage", requestBody, router).then(
      (res) => {
        props.loader(false);
        console.log("Verify Package Response:", res);

        if (status === "Rejected") {
          console.log("Package rejected");
          const updatedPackagesData = packagesData.map((packageItem) => {
            if (packageItem._id === popUpData._id) {
              return { ...packageItem, status: "Rejected" };
            }
            return packageItem;
          });
          setPackagesData(updatedPackagesData);
        }

        setPopUp(false);
        getPackages();
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  };

  console.log(popupPackage);

  const viewBtn = ({ value, row }) => {
    return (
      <div className=" p-4  flex items-center  justify-center">
        <button
          className="font-semibold text-lg text-black py-1 px-4 rounded-md bg-custom-yellow flex gap-1 items-center"
          onClick={() => {
            packagesPophandler(row.original._id);
          }}
        >
          <AiFillEye /> View
        </button>
      </div>
    );
  };

  const statussHandler = ({ value, row }) => {
    return (
      <div className="p-4   flex items-center  justify-center">
        <p className="font-semibold text-md text-black max-w-[400px] whitespace-normal  ">
          {value}
        </p>
      </div>
    );
  };

  const columns = [
    // {
    //   Header: "Post ID",
    //   accessor: "track_id",
    //   Cell: idHandler,
    // },
    // {
    //   Header: "Customer",
    //   accessor: "user",
    //   Cell: nameHandler,
    // },
    {
      Header: "Name",
      accessor: "heading",
      Cell: nameHandler,
    },
    {
      Header: "Icon",
      accessor: "image",
      Cell: iconHandler,
    },
    // {
    //   Header: "Type",
    //   accessor: "type",
    //   Cell: typeHandler,
    // },
    {
      Header: "Description",
      accessor: "description",
      Cell: statussHandler,
    },
    {
      Header: "Action",
      accessor: "more",
      Cell: actionHandler,
    },
  ];

  const getPackages = async () => {
    props.loader(true);
    Api("get", "/api/getpackages", "", router).then(
      (res) => {
        props.loader(false);
        console.log("res================>", res);
        setPackagesData(res.data);
        setmainList(res.data);
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  };

  //console.log(packagesData)

  // useEffect(() => {
  //   getPackages();
  // }, []);

  const filterData = (event) => {
    console.log(event);
    if (event?.target?.value.length > 0) {
      const newdata = mainList.filter((f) =>
        f.track_id.includes(event.target.value)
      );
      setPackagesData(newdata);
    } else {
      setPackagesData(mainList);
    }
  };

  const imageOnError = (event) => {
    event.currentTarget.src = '/userprofile.png';
    // event.currentTarget.className = "error";
  };

  return (
    <section className="p-5">
      {/* {popup && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/30 flex justify-center items-center z-50">
          <div className="w-[300px] md:w-[450px] h-[400px] bg-white border-2 border-custom-blue rounded-md m-auto">
            <div className="p-3 flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div className="rounded-full w-12 h-12">
                  <img
                    src={popUpData?.user?.profile}
                    className=" w-12 h-12 rounded-full object-center object-cover  border-2 border-black bg-white text-black"
                    alt=""
                  />
                </div>
                <div className="text-lg flex flex-col">
                  <div className="text-lg flex flex-col">
                    <p>{popUpData?.user?.fullName}</p>
                    <p className="text-sm -mt-2">{popUpData?.user?.email}</p>
                  </div>
                </div>
              </div>
              <div className="p-1 rounded-full bg-custom-blue text-white w-12 h-12 cursor-pointer">
                <RxCross2
                  onClick={() => setPopUp(!popup)}
                  className="h-full w-full font-semibold"
                />
              </div>
            </div>
            <div className="w-[250px] md:w-[300px] p-3 h-[200px] mx-auto flex items-center text-center">
              <p className="text-3xl font-semibold">
                Do you want to Reject the Product ?
              </p>
            </div>

            <div className="w-[250px] md:w-[300px] p-3 mx-auto flex justify-between items-center ">
              <button
                className="text-white text-lg bg-green-500 py-2 px-6 w-[100px] rounded-md"
                onClick={() => verifyPackage("Rejected")}
              >
                Reject
              </button>
              <button
                className="text-white text-lg bg-red-500 py-2  w-[100px] rounded-md"
                onClick={() => setPopUp(!popup)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )} */}
      {popupservice && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/30 flex justify-center items-center z-50">
          <div className="w-[300px] md:w-[450px] bg-white border-2 border-custom-blue rounded-md m-auto">
            <div className="p-3 flex justify-end items-center">
              <div className="p-1 rounded-full bg-custom-blue text-white w-12 h-12 cursor-pointer">
                <RxCross2
                  onClick={() => setPopUpservice(!popupservice)}
                  className="h-full w-full font-semibold"
                />
              </div>
            </div>
            <form className="px-[20px]" onSubmit={submit}>
              <div className="border-2 border-sky-500 rounded-[15px] overflow-hidden">
                <input
                  required
                  placeholder="Heading"
                  value={data.heading}
                  className="h-[50px] w-[100%] outline-none pl-[10px]"
                  onChange={(e) => {
                    setData({ ...data, heading: e.target.value });
                  }}
                />
              </div>

              <div className="border-2 border-sky-500 rounded-[15px] overflow-hidden mt-[10px] h-[60px] flex items-center justify-end">
                <input
                  // required
                  placeholder="Image url"
                  value={data.image}
                  className="h-[40px] w-[100%] outline-none px-[10px] "
                  onChange={(e) => {
                    setData({ ...data, image: e.target.value });
                  }}
                // type="file"
                />
                {/* <div className="flex justify-end">
                  <button className="h-[40px] w-[100px] bg-[#0D97AE] p-1 rounded-[10px] text-white  text-center mr-[5px]">
                    Upload
                  </button>
                </div> */}
              </div>

              <div className="border-2 border-sky-500 rounded-[15px] overflow-hidden mt-[10px] h-[60px] flex items-center justify-end">
                <input
                  // required
                  placeholder="News link"
                  value={data.newsLink}
                  className="h-[40px] w-[100%] outline-none px-[10px] "
                  onChange={(e) => {
                    setData({ ...data, newsLink: e.target.value });
                  }}
                />
              </div>

              <div className="border-2 border-sky-500 rounded-[15px] overflow-hidden mt-[10px]">
                <textarea
                  required
                  rows={4}
                  placeholder="Description"
                  value={data.description}
                  className=" w-[100%] outline-none pl-[10px] p-2"
                  onChange={(e) => {
                    setData({ ...data, description: e.target.value });
                  }}
                />
              </div>
              {/* <div className="border-2 border-sky-500 rounded-[15px] overflow-hidden mt-[10px]">
               
                <select className="h-[50px] w-[96%] outline-none px-[10px]"
                
                value={data.type}
                onChange={((e) => {
                  setData({ ...data, type: e.target.value })
              })}
                >
                  <option value="core">Core</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
              <div className="border-2 border-sky-500 rounded-[15px] overflow-hidden mt-[10px] h-[60px] flex items-center">
                <input
                  placeholder="Related images"
                
                  value={data.sample}
                  className="h-[40px] w-[100%] outline-none px-[10px]"
                 
                  onChange={((e) => {
                    setData({ ...data, sample: e.target.value })
                })}
                />
                <div className="flex justify-end">
                  <button className="h-[40px] w-[100px] bg-[#0D97AE] p-1 rounded-[10px] text-white  text-center mr-[5px]">
                    Upload
                  </button>
                </div>
              </div> */}
              <div className="flex justify-center">
                <button
                  className="h-[50px] w-[130px] bg-[#0D97AE] p-2 rounded-[10px] text-white my-[30px] text-center"
                  type="submit"
                // onClick={submit}
                >
                  {data._id ? "Update" : "Add News"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {productPopup && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/30 flex justify-center items-center z-50">
          <div className=" relative w-[300px] md:w-[550px] h-auto  bg-white border-2 border-custom-blue rounded-md m-auto">
            <div
              className=" absolute top-2 right-2 p-1 rounded-full bg-custom-blue text-white w-12 h-12 cursor-pointer"
              onClick={() => setProductPopup(!productPopup)}
            >
              <RxCross2 className="h-full w-full font-semibold" />
            </div>
            <h2 className="text-2xl font-semibold text-center mt-8">
              {popupPackage?.name}
            </h2>

            <div className=" w-full p-5 text-xl font-medium text-center ">
              <p>You want to delete ?</p>
            </div>
            <div className="flex justify-center">
              <button className="h-[50px] w-[130px] bg-[#b5301f] p-2 rounded-[10px] text-white my-[30px] text-center mx-[10px]">
                No
              </button>
              <button
                className="h-[50px] w-[130px] bg-[#0D97AE] p-2 rounded-[10px] text-white my-[30px] text-center mx-[10px]"
                onClick={() => {
                  deleteService(deleteid);
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      <div className=" w-full space-y-4">
        <div className="p-6 border-2 border-custom-blue rounded-2xl md:flex justify-between">
          <div>
            <p className="text-black text-2xl font-bold	MerriweatherSans">
              {`${moment(new Date()).format("DD-MMM-YYYY")} , ${moment(
                new Date()
              ).format("dddd")}`}
            </p>
            <h2 className="text-black text-4xl font-bold	MerriweatherSans">
              Hello <span className="text-custom-blue">{user.fullName}</span>
            </h2>
          </div>

          {/* <h6 className=' text-black'>
            Search: <input placeholder='Search By UserID' className='border border-black text-sm rounded-md px-5  py-1' onChange={filterData} />
          </h6> */}
        </div>
        <div className="flex justify-end mr-[20px]">
          <button
            className="bg-cyan-700 p-4 text-white"
            onClick={() => {
              setPopUpservice(true), setData("");
            }}
          >
            Add News
          </button>
        </div>
        <div className="border-2 border-black rounded-md">
          <Table columns={columns} data={servicelist} />
        </div>

        {/* <div className='border-2 border-black rounded-md'>
          <Table columns={columns} data={packagesData} />
        </div> */}
      </div>
    </section>
  );
};

export default News;
