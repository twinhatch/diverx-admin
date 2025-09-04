import moment from "moment";
import React, { useContext, useEffect, useMemo, useState, useRef } from "react";
import { BsGraphUp } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { products } from "@/utils/data";
import Table from "@/src/components/Table/table";
import { RxCross2 } from "react-icons/rx";
import { AiFillEye } from "react-icons/ai";
import { Api, ApiFormData } from "@/utils/service";
import { useRouter } from "next/router";
import { userContext } from "./_app";
import { IoCloseCircleOutline } from "react-icons/io5";
import { produce } from "immer"

const ServiceForm = (props) => {
  const [popup, setPopUp] = useState(false);
  const [popupservice, setPopUpservice] = useState(false);
  const [packagesData, setPackagesData] = useState([]);
  const [productPopup, setProductPopup] = useState(false);
  const [subserv, setsubserv] = useState(false);
  const [deleteid, setdeleteid] = useState(null);
  const [popUpData, setPopUpData] = useState({});
  const [popupPackage, setPopupPackage] = useState({});
  const [user, setUser] = useContext(userContext);
  const [mainList, setmainList] = useState([]);
  const [servicelist, setServiceList] = useState([]);
  const [subservicelist, setsubServiceList] = useState([
    {
      subtitle: "",
      subprice: "",
      subcontent: "",
    },
  ]);
  const router = useRouter();
  console.log(router);
  const serviceid = router.query.serviceid;
  console.log(serviceid);
  const [data, setData] = useState({
    title: "",
    icon: "",
    content: "",
    content: "",
    price: "",
    sample: [],
    type: "core",
    subservice: [],
    whatsapp_msg: "",
  });

  const [sampleUrl, setSampleUrl] = useState('')

  const f = useRef(null);

  useEffect(() => {
    if (router.query.serviceid) {
      getServicebyid();
    }
  }, []);

  const getServicebyid = async () => {
    props.loader(true);
    Api("get", `/api/getservice/${serviceid}`, "", router).then(
      (res) => {
        props.loader(false);
        console.log("res================>", res);
        // setServiceList(res);
        console.log(res);
        setData(res);
        setsubServiceList(res.subservice);
        // setmainList(res.data)
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  };

  const getService = async () => {
    props.loader(true);
    Api("get", "/api/getallservice", "", router).then(
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

  const submit = (e) => {
    e.preventDefault();
    const filterdata = subservicelist.filter((item) => item.subtitle || item.subcontent)
    console.log(filterdata)
    if (filterdata) {
      data.subservice = filterdata;
    }
    console.log(data);
    // console.log();
    console.log(subservicelist)
    let method = "post";
    let url = "/api/postservice";
    if (data._id) {
      url = `/api/updateservice/${data._id}`;
      method = "put";
    }

    Api(method, url, data, router).then(
      (res) => {
        console.log("Post service", res);
        router.push("/package-pickup");
        setData({
          title: "",
          icon: "",
          content: "",
          price: "",
          sample: [],
          type: "core",
          subservice: [],
          whatsapp_msg: "",
        });
        getService();
        setPopUpservice(false);
      },
      (err) => {
        console.log(err);
        props.loader(false);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  };

  let datas;
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    // const data = new FormData()
    // data.append('file', file)
    if (!file) return;
    const fileSizeInMb = file.size / (1024 * 1024);
    if (fileSizeInMb > 1) {
      setErrorMessage("Too large file. Please upload a smaller image");
      return;
    } else {
      setErrorMessage("");
      datas = new FormData();
      datas.append("file", file);
      props.loader(true);
    }
    props.loader(true);
    ApiFormData("post", "/api/user/fileupload", datas, router).then(
      (res) => {
        props.loader(false);
        console.log("res================>", res);
        if (res.status) {
          setSampleUrl(res.data.file)
          // setData({ ...data, img: res.data.file })
          props.toaster({ type: "success", message: res.data.message });
        }
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
    const reader = new FileReader();
    // let key = event.target.name;
    // reader.onloadend = () => {
    //   const base64 = reader.result;
    //   console.log(base64);
    //   // setData({ ...data, img: base64, profile: file });
    // };

    // if (file) {
    //   reader.readAsDataURL(file);
    // }
  };

  const closeIcon = (item, i) => {
    if (i > -1) { // only splice array when item is found
      data.sample.splice(i, 1); // 2nd parameter means remove one item only
    }
    setData({ ...data })
  }

  return (
    <section className="p-5">
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
        {/* <div className="flex justify-end mr-[20px]">
          <button
            className="bg-cyan-700 p-4 "
            onClick={() => {
              setPopUpservice(true), setData("");
            }}
          >
            Create Service
          </button>
        </div> */}
        <form className="" onSubmit={submit}>
          <div className="flex flex-row ">
            <div className="border-2 border-sky-500 h-[50px] w-[50%] rounded-[15px] overflow-hidden mr-[5px]">
              <input
                required
                placeholder="Service name"
                value={data.title}
                className="h-[50px] w-[100%] outline-none pl-[10px]"
                onChange={(e) => {
                  setData({ ...data, title: e.target.value });
                }}
              />
            </div>
            <div className="border-2 border-sky-500 h-[50px] w-[50%] rounded-[15px] overflow-hidden ml-[5px]">
              <select
                className="h-[50px] w-[96%] outline-none px-[10px]"
                value={data.type}
                onChange={(e) => {
                  setData({ ...data, type: e.target.value });
                }}
              >
                <option value="core">Core</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </div>
          <div className="border-2 border-sky-500 rounded-[15px] overflow-hidden mt-[10px] h-[60px] flex items-center justify-end">
            <input
              required
              placeholder="Image url"
              value={data.icon}
              className="h-[40px] w-[100%] outline-none px-[10px] "
              onChange={(e) => {
                setData({ ...data, icon: e.target.value });
              }}
            />
          </div>

          <div className="border-2 border-sky-500 rounded-[15px] overflow-hidden mt-[10px] h-[60px] flex items-center">
            <input
              type="number"
              placeholder="Price"
              className="h-[40px] w-[100%] outline-none px-[10px]"
              value={data.price}
              onChange={(e) => {
                setData({ ...data, price: e.target.value });
              }}
            />
          </div>

          <div className="border-2 border-sky-500 rounded-[15px] overflow-hidden mt-[10px]">
            <textarea
              rows={4}
              placeholder="Description"
              value={data.content}
              className=" w-[100%] outline-none pl-[10px] p-2"
              onChange={(e) => {
                setData({ ...data, content: e.target.value });
              }}
            />
          </div>

          {/* <div className="border-2 border-sky-500 rounded-[15px] overflow-hidden mt-[10px] h-[60px] flex items-center">
            <input
              placeholder="Image url"
              value={sampleUrl}
              className="h-[40px] w-[100%] outline-none px-[10px]"
              onChange={(e) => {
                setSampleUrl(e.target.value);
              }}
            />
            <div className="flex justify-end"
              onClick={() => {
                if (sampleUrl !== '') {
                  setData({ ...data, sample: [...data?.sample, sampleUrl] });
                  setSampleUrl('')
                }
              }}>
              <p className="h-[40px] w-[100px] bg-[#0D97AE] p-1 rounded-[10px] text-white  text-center mr-[5px]">
                Upload
              </p>
            </div>
          </div> */}

          <div className="border-2 border-sky-500 rounded-[15px] overflow-hidden mt-[10px] h-[60px] flex items-center">
            <input
              type="text"
              placeholder="Image url"
              className="h-[40px] w-[100%] outline-none px-[10px]"
              value={sampleUrl}
              onChange={(e) => {
                setSampleUrl(e.target.value);
              }}
            />

            <div className="flex justify-end">
              <p className="h-[40px] w-[100px] bg-[#0D97AE] p-[6px] rounded-[10px] text-white  text-center mr-[5px]"
                onClick={() => {
                  f.current.click();
                }}>
                <input type="file"
                  ref={f}
                  className="hidden"
                  onChange={handleImageChange}
                />
                Upload
              </p>
            </div>

          </div>

          {errorMessage && (
            <p className="mt-[10px] text-red-500 text-sm">
              {errorMessage}
            </p>
          )}

          <div className="flex justify-end">
            <p className="h-[40px] w-[100px] bg-[#0D97AE] pt-[6px] rounded-[10px] text-white  text-center mr-[5px] mt-[10px]" onClick={() => {
              if (sampleUrl !== '') {
                if (data?.sample.length > 0) {
                  setData({ ...data, sample: [...data?.sample, sampleUrl] });
                } else {
                  setData({ ...data, sample: [sampleUrl] });
                }
                setSampleUrl('')
              }
            }}>Add</p>
          </div>

          {data?.sample?.length > 0 && <div className="pt-1">
            <p>Samples</p>
            {/* {data?.sample?.map((item, i) => (
              <p className="w-[95%] relative flex items-center" key={i}>{i + 1}. {item}
                <IoCloseCircleOutline className='text-red-700 cursor-pointer h-5 w-5 absolute right-0 top-[3px]' onClick={() => { closeIcon(item, i) }} />
              </p>))} */}
            <div className='flex md:flex-row flex-wrap md:gap-5 gap-4 mt-[10px]'>
              {data?.sample?.map((item, i) => (<div className='relative' key={i}>
                <img className='md:w-20 w-[85px] h-20 object-contain' src={item} />
                <IoCloseCircleOutline className='text-red-700 cursor-pointer h-5 w-5 absolute  left-[5px] top-[10px]' onClick={() => { closeIcon(item, i) }} />
              </div>
              ))}

            </div>
          </div>}

          <div className="border-2 border-sky-500 rounded-[15px] overflow-hidden mt-[10px]">
            <textarea
              rows={4}
              placeholder="WhatsApp Message"
              value={data.whatsapp_msg}
              className=" w-[100%] outline-none pl-[10px] p-2"
              onChange={(e) => {
                setData({ ...data, whatsapp_msg: e.target.value });
              }}
            />
          </div>

          {
            subservicelist.map((item, i) => (
              <div className=" border-2 border-sky-500 p-[10px] mr-[10px] rounded-[10px] mt-[30px]">
                <p className="text-sky-500 text-lg my-[10px] ml-[10px]">
                  Subservice :-{i + 1}
                </p>

                <div className="border-2 border-sky-500 h-[50px] w-[50%] rounded-[15px] overflow-hidden mr-[5px]">
                  <input
                    placeholder="Subservice name"
                    value={item.subtitle}
                    className="h-[50px] w-[100%] outline-none pl-[10px]"
                    onChange={(e) => {
                      item.subtitle = e.target.value;
                      setsubServiceList([...subservicelist]);
                    }}
                  />
                </div>

                <div className="border-2 border-sky-500 rounded-[15px] overflow-hidden mt-[10px] h-[60px] flex items-center">
                  <input
                    type="number"
                    placeholder="Price"
                    className="h-[40px] w-[100%] outline-none px-[10px]"
                    value={item.subprice}
                    onChange={(e) => {
                      item.subprice = e.target.value;
                      setsubServiceList([...subservicelist]);
                    }}
                  />
                </div>
                <div className="border-2 border-sky-500 rounded-[15px] overflow-hidden mt-[10px]">
                  <textarea
                    rows={4}
                    placeholder="Description"
                    value={item.subcontent}
                    className="w-[100%] outline-none pl-[10px] p-2"
                    onChange={(e) => {
                      item.subcontent = e.target.value;
                      setsubServiceList([...subservicelist]);
                    }}
                  />
                </div>
              </div>
              //   )
            ))
          }
          <div className="flex flex-row justify-center my-[30px] ">
            <div className="mr-[10px]">
              <button
                className="h-[50px] w-[130px] bg-[#0D97AE] p-2 rounded-[10px] text-white  text-center"
                type="submit"
              >
                {data._id ? "Update" : "Save"}
              </button>
            </div>
            <div className="ml-[10px]">
              <button
                className="h-[50px] w-[130px] bg-[#0D97AE] p-2 rounded-[10px] text-white  text-center"
                onClick={() => {
                  setsubServiceList([
                    ...subservicelist,
                    {
                      subtitle: "",
                      subcontent: "",
                    },
                  ]);
                }}
              >
                Add Subservice
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ServiceForm;
