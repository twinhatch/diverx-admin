import moment from 'moment'
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { BsGraphUp } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { products } from '@/utils/data'
import Table from '@/src/components/Table/table'
import { RxCross2 } from 'react-icons/rx'
import { Api, ApiFormData } from '@/utils/service'
import { useRouter } from 'next/router'
import { Rating } from '@mui/material'
import { userContext } from './_app'
import ImageViewer from 'react-simple-image-viewer';
import { MdOutlineNavigateNext, MdClose } from "react-icons/md";
import { MultiSelect } from "react-multi-select-component";
import { IoMdCloseCircle } from "react-icons/io";
import { FaFileAlt } from "react-icons/fa";




const Usermanagement = (props) => {
  const [popup, setPopUp] = useState(false)
  const [uploadPopup, setUplpoadPopup] = useState(false)
  const [usersList, setUsersList] = useState([]);
  const [mainList, setmainList] = useState([]);
  const [popUpUser, setPopUpUser] = useState({});
  const [user, setUser] = useContext(userContext)
  const [activeTab, setActiveTab] = useState('userVerification');
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [images, setImages] = useState([]);
  const router = useRouter()
  const [allservices, setAllservices] = useState([]);
  const [servicerequest, setserviceRequest] = useState({
    type: '',
    services: [],
    expirydate: new Date(),
    amount: 0,
    pdf: '',
    user: ''
  })
  const learnRef = useRef()
  const cvRef = useRef()

  const [uploadList, setUploadList] = useState({
    learning_modules: '',
    cv: '',
    user: ''
  })



  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const statusHandler = ({ value }) => {
    let statusClass = '';
    let statusText = value;

    if (value === 'Access') {
      statusClass = 'text-green-500 ';
    } else if (value === 'Blocked') {
      statusClass = 'text-red-500 ';
    } else {
      statusClass = 'text-black';
    }

    return (
      <div className={`p-2 rounded-md flex items-center justify-center ${statusClass}`}>
        <p className='text-base	font-normal	Poppins'>{statusText}</p>
      </div>
    );
  }

  const nameHandler = ({ value }) => {
    return (
      <div className=' p-4  flex items-center  justify-center'>
        <p className='text-black text-base font-normal Poppins'>{value}</p>
      </div>
    )
  }

  const email = ({ value }) => {
    return (
      <div className='p-4  flex items-center  justify-center'>
        <p className='text-black text-base font-normal Poppins'>Demo@gmail.com</p>
      </div>
    )
  }

  const rating = ({ value }) => {
    return (
      <div className='p-4 flex items-center  justify-center'>
        <img className='w-[110px] h-[17px]' src='/image.png' />
      </div>
    )
  }

  const idHandler = ({ value }) => {
    return (
      <div className=' p-4  flex items-center  justify-center gap-4'>
        {/* <input type="checkbox" className='border-2 border-custom-blue text-custom-blue w-5 h-5' /> */}
        {/* <button className='text-black text-base	font-normal	w-[56px] h-[36px] bg-custom-darkGreen rounded-[2px] ml-2 Poppins'>View</button> */}
        <p className='text-custom-darkBlue text-base	font-normal Poppins'>#{value}</p>
      </div>
    )
  }

  const ratingHandler = ({ value }) => {
    return (
      <div className=' p-4  flex items-center  justify-center gap-4'>
        <Rating
          name='hover-feedback'
          value={value}
          precision={0.5}
          readOnly
        // onChangeActive={(event, newHover) => {
        //   setHoverValue(newHover);
        // }}
        />
        {/* <span className='font-semibold text-md text-gray-500'>
        {hoverValue !== -1 ? hoverValue : value}
      </span> */}
      </div>
    )
  }

  const actionHandler = ({ value, row }) => {
    //console.log(row.original._id)
    return (
      <div className=' p-4  flex items-center  justify-center gap-2'>
        <button className='h-[38px] px-2 bg-custom-blue text-custom-darkBlack text-base	font-normal Poppins' onClick={() => {
          popUpHandler(row.original._id);
          setserviceRequest({ ...servicerequest, user: row.original._id })
        }}>Service Request</button>
        <button className='h-[38px] px-2 bg-custom-blue text-custom-darkBlack text-base	font-normal Poppins' onClick={() => {
          popUpHandler2(row.original._id);
          // setUplpoadPopup(true)
          setUploadList({
            user: row.original._id, learning_modules: row?.original?.learning_modules || '',
            cv: row?.original?.cv || '',
          })
          // setserviceRequest({ ...servicerequest, user: row.original._id })
        }}>Upload Doc</button>
      </div>
    )
  }

  // const checkBox = ({ value }) => {
  //   return (
  //     <div className=' p-4  flex items-center  justify-center'>
  //       <input type="checkbox" className='border-2 border-custom-blue text-custom-blue w-5 h-5' />
  //     </div>
  //   )
  // }

  const popUpHandler = (id) => {
    console.log(id)
    setPopUp(!popup)
    const data = usersList.filter((user) => id === user._id)[0]
    console.log(usersList.filter((user) => id === user._id)[0])
    setPopUpUser(data)
    console.log(data)
    // console.log(popup)
  }
  const popUpHandler2 = (id) => {
    console.log(id)
    setUplpoadPopup(true)
    const data = usersList.filter((user) => id === user._id)[0]
    console.log(usersList.filter((user) => id === user._id)[0])
    setPopUpUser(data)
    console.log(data)
    // console.log(popup)
  }

  console.log(popUpUser)

  const columns = [
    {
      Header: "UserId",
      accessor: "userID",
      Cell: idHandler
    },
    // {
    //   Header: "Customer",
    //   accessor: "fullName",
    //   Cell: nameHandler
    // },
    {
      Header: "Contact No.",
      accessor: "phone",
      // Cell: nameHandler
    },
    {
      Header: "E-mail ID",
      accessor: "email",
      // Cell: email
    },
    // {
    //   Header: "Rating",
    //   Cell: rating
    // },
    // {
    //   Header: "ID Proof",
    //   accessor: "verified",
    //   Cell: checkBox
    // },
    {
      Header: "Status",
      accessor: "status",
      Cell: statusHandler
    },
    {
      Header: "Action",
      accessor: "more",
      Cell: actionHandler
    },
  ]

  const columnsAllUsers = [
    {
      Header: "UserId",
      accessor: "userID",
      Cell: idHandler
    },
    {
      Header: "Customer",
      accessor: "fullName",
      Cell: nameHandler
    },
    {
      Header: "Contact No.",
      accessor: "phone",
      // Cell: nameHandler
    },
    {
      Header: "Rating",
      accessor: "rate",
      Cell: ratingHandler
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: statusHandler
    },
    {
      Header: "Action",
      // accessor: "more",
      Cell: actionHandler
    },
  ];


  const getAllUsers = async () => {
    props.loader(true);
    Api("get", '/api/getUsers', '', router).then(
      (res) => {
        props.loader(false);
        console.log("res================>", res.data);
        setUsersList(res.data)
        setmainList(res.data)
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  }


  const getAllService = async (type) => {
    props.loader(true);
    Api("get", `/api/getallservice?type=${type}`, '', router).then(
      (res) => {
        props.loader(false);
        console.log("res================>", res);
        const newarray = res.map((m) => { return { ...m, label: m.title, value: m._id } })
        console.log(newarray)
        setAllservices(newarray)
        // setUsersList(res.data)
        // setmainList(res.data)
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  }

  const addrequest = async (e) => {
    e.preventDefault();
    if (servicerequest.services.length === 0) {
      props.toaster({ type: "error", message: 'Please select services from service list' })
      return
    }
    props.loader(true);
    Api("post", `/api/postservicerequest`, servicerequest, router).then(
      (res) => {
        props.loader(false);
        console.log("res================>", res);
        setserviceRequest({
          type: '',
          services: [],
          expirydate: new Date(),
          amount: 0,
          pdf: '',
          user: ''
        })
        setPopUp(false)
        // const newarray = res.map((m) => { return { ...m, label: m.title, value: m._id } })
        // console.log(newarray)
        // setAllservices(newarray)
        // setUsersList(res.data)
        // setmainList(res.data)
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  }

  const uploadDocFile = async (e) => {
    e.preventDefault();
    // if (servicerequest.services.length === 0) {
    //   props.toaster({ type: "error", message: 'Please select services from service list' })
    //   return
    // }
    props.loader(true);
    Api("post", `/api/updateProfileFromAdmin`, uploadList, router).then(
      (res) => {
        props.loader(false);
        console.log("res================>", res);
        setUploadList({
          learning_modules: "",
          cv: "",
          user: ''
        })
        cvRef.current.value == '';
        learnRef.current.value == ''
        setPopUpUser({})
        setUplpoadPopup(false)
        getAllUsers()
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  }

  const handleImageChange = (event, type) => {
    const file = event.target.files[0];
    const data = new FormData()
    data.append('file', file)
    props.loader(true);
    ApiFormData("post", "/api/user/fileupload", data, router).then(
      (res) => {
        props.loader(false);
        // setIsRequired(false)
        console.log("res================>", res);
        if (res.status) {
          if (type) {
            setUploadList({ ...uploadList, [type]: res.data.file })
          } else {
            setserviceRequest({ ...servicerequest, pdf: res.data.file })
          }
          props.toaster({ type: "success", message: res.data?.message });
        }
        // setOfferData(res.data);
      },
      (err) => {
        // setIsRequired(false)
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );


  };

  const verifyUser = (status) => {
    props.loader(true);
    Api("post", '/api/verifyUser', { status, user_id: popUpUser._id }, router).then(
      (res) => {
        props.loader(false);
        console.log("res================>", res);
        setPopUp(false);
        getAllUsers();
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };


  useEffect(() => {
    getAllUsers()
  }, [])

  const filterData = (event) => {
    console.log(event)
    if (event?.target?.value.length > 0) {
      const newdata = mainList.filter(f => f.userID.includes(event.target.value))
      setUsersList(newdata)
    } else {
      setUsersList(mainList)
    }
  }

  const imageOnError = (event) => {
    event.currentTarget.src = '/profile-default.png';
    // event.currentTarget.className = "error";
  };

  return (
    <section className=' p-5'>

      {
        popup &&
        <div className='fixed top-0 left-0 w-screen h-screen bg-black/30 flex justify-center items-center z-40'>
          <div className='w-[300px] md:w-[450px] h-[530px] bg-white border-2 border-custom-blue rounded-md m-auto'>
            <div className='p-3 flex justify-between items-center'>
              <div className='flex gap-2 items-center'>
                <div className='rounded-full  bg-white text-black w-12 h-12'
                >
                  {popUpUser?.profile && <img src={popUpUser?.profile} alt="" className='rounded-full w-12 h-12 border-2 border-black' onError={imageOnError} />}
                  {!popUpUser?.profile && <img src='/profile-default.png' alt="" className='rounded-full w-12 h-12 border-2 border-black' onError={imageOnError} />}

                </div>
                <div className='text-lg flex flex-col'>
                  <p>{popUpUser?.fullName}</p>
                  <p className='text-sm -mt-2'>{popUpUser?.email}</p>
                </div>
              </div>
              <div className='p-1 rounded-full bg-custom-blue text-white w-12 h-12 cursor-pointer' onClick={() => {
                setPopUp(false);
                setserviceRequest({
                  type: '',
                  services: [],
                  expirydate: new Date(),
                  amount: 0,
                  pdf: '',
                  user: ''
                })
              }}>
                <RxCross2 className='h-full w-full font-semibold' />
              </div>
            </div>
            <form className='w-full px-5' onSubmit={addrequest}>
              <div className='w-full '>
                <p>Service Type</p>
                <select required value={servicerequest.type} onChange={(text) => { setserviceRequest({ ...servicerequest, type: text.target.value, services: [] }); getAllService(text.target.value) }} className='w-full border border-black rounded-lg p-2'>
                  <option value=''>Select Service type</option>
                  <option value='core'>Core</option>
                  <option value='premium'>Premium</option>
                </select>
              </div>

              <div className='w-full mt-2 '>
                <p>Services</p>
                <MultiSelect
                  options={allservices}
                  value={servicerequest.services}
                  onChange={(text) => {
                    setserviceRequest({ ...servicerequest, services: text })
                  }}
                  labelledBy="Select Staff"
                  ClearSelectedIcon
                />
              </div>

              <div className='w-full mt-2'>
                <p>Amount</p>
                <input min={1} required value={servicerequest.amount} onChange={(text) => { setserviceRequest({ ...servicerequest, amount: text.target.value }) }} placeholder='Amount' type='number' className='w-full  border border-black rounded-lg p-2' />
              </div>

              <div className='w-full mt-2'>
                <p>Expiry Date</p>
                <input required value={servicerequest.expirydate} onChange={(text) => { setserviceRequest({ ...servicerequest, expirydate: text.target.value }) }} placeholder='Amount' type='datetime-local' className='w-full  border border-black rounded-lg p-2' />
              </div>

              <div className='w-full mt-2'>
                <p>Agreement PDF</p>
                <input required={!servicerequest.pdf} placeholder='Amount' type='file' className='w-full  border border-black rounded-lg p-2' onChange={(e) => { handleImageChange(e) }} />
                <p className="text-blue-500 text-sm truncate text-ellipsis cursor-pointer" onClick={() => { window.open(servicerequest.pdf) }}>{servicerequest.pdf}</p>
              </div>

              <div className='w-[250px] md:w-[300px] p-3 mx-auto flex justify-between items-center '>
                <button className='text-white text-lg bg-green-500 py-2 px-6 w-[100px] rounded-md' type="submit">Add</button>
                <button className='text-white text-lg bg-red-500 py-2  w-[100px] rounded-md' onClick={() => {
                  setPopUp(false);
                  setserviceRequest({
                    type: '',
                    services: [],
                    expirydate: new Date(),
                    amount: 0,
                    pdf: '',
                    user: ''
                  })
                }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      }

      {
        uploadPopup &&
        <div className='fixed top-0 left-0 w-screen h-screen bg-black/30 flex justify-center items-center z-40'>
          <div className='w-[300px] md:w-[450px] h-max bg-white border-2 border-custom-blue rounded-md m-auto'>
            <div className='p-3 flex justify-between items-center'>
              <div className='flex gap-2 items-center'>
                <div className='rounded-full  bg-white text-black w-12 h-12'
                >
                  {popUpUser?.profile && <img src={popUpUser?.profile} alt="" className='rounded-full w-12 h-12 border-2 border-black' onError={imageOnError} />}
                  {!popUpUser?.profile && <img src='/profile-default.png' alt="" className='rounded-full w-12 h-12 border-2 border-black' onError={imageOnError} />}

                </div>
                <div className='text-lg flex flex-col'>
                  <p>{popUpUser?.fullName}</p>
                  <p className='text-sm -mt-2'>{popUpUser?.email}</p>
                </div>
              </div>
              <div className='p-1 rounded-full bg-custom-blue text-white w-12 h-12 cursor-pointer' onClick={() => {
                setUplpoadPopup(false);
                setPopUpUser({})
                setUploadList({
                  learning_modules: '',
                  cv: '',
                  user: ''
                })
              }}>
                <RxCross2 className='h-full w-full font-semibold' />
              </div>
            </div>
            <form className='w-full px-5' onSubmit={uploadDocFile}>



              <div className='w-full mt-2'>
                <p>Upload CV (.pdf, .doc, .docx)</p>
                {/* required={!uploadList.cv}  */}
                <input ref={cvRef} placeholder='Amount' type='file' accept=".pdf, .doc, .docx" className='w-full  border border-black rounded-lg p-2' onChange={(e) => { handleImageChange(e, 'cv') }} />
                {uploadList?.cv && <div>
                  <div className='flex flex-col justify-center items-center mt-2'>
                    <IoMdCloseCircle className='text-xl' onClick={() => { setUploadList({ ...uploadList, cv: '' }); cvRef.current.value = '' }} />
                    <FaFileAlt className='text-7xl' onClick={() => { window.open(uploadList.cv) }} />
                    <p className="text-blue-500 text-sm truncate text-ellipsis cursor-pointer flex" onClick={() => { window.open(uploadList.cv) }}>{uploadList?.cv?.split('/')[uploadList?.cv?.split('/')?.length - 1]}</p>
                  </div>
                </div>}
              </div>

              <div className='w-full mt-2'>
                <p>Upload Learning Modules (.pdf)</p>
                {/* required={!uploadList.learning_modules} */}
                <input ref={learnRef} placeholder='Amount' type='file' className='w-full  border border-black rounded-lg p-2' onChange={(e) => { handleImageChange(e, 'learning_modules') }} />
                {uploadList?.learning_modules && <div>
                  <div className='flex flex-col justify-center items-center mt-2'>
                    <IoMdCloseCircle className='text-xl' onClick={() => { setUploadList({ ...uploadList, learning_modules: '' }); learnRef.current.value = '' }} />
                    <FaFileAlt className='text-7xl' onClick={() => { window.open(uploadList.learning_modules) }} />
                    <p className="text-blue-500 text-sm truncate text-ellipsis cursor-pointer flex" onClick={() => { window.open(uploadList.learning_modules) }}>{uploadList?.learning_modules?.split('/')[uploadList?.learning_modules?.split('/')?.length - 1]}</p>
                  </div>
                </div>}
              </div>

              <div className='w-[250px] md:w-[300px] p-3 mx-auto flex justify-between items-center '>
                <button className='text-white text-lg bg-green-500 py-2 px-6 w-[100px] rounded-md' type="submit">Submit</button>
                <button className='text-white text-lg bg-red-500 py-2  w-[100px] rounded-md' onClick={() => {
                  setUplpoadPopup(false);
                  setPopUpUser({})
                  setUploadList({
                    learning_modules: '',
                    cv: '',
                    user: ''
                  })
                }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      }

      <div className='w-full space-y-4'>
        <div className='p-6 border-2 border-custom-lightBlue rounded-[15px] md:flex justify-between'>
          <div>
            <p className='text-black text-2xl font-bold	MerriweatherSans'>
              {`${moment(new Date()).format('DD-MMM-YYYY')} , ${moment(new Date()).format('dddd')}`}
            </p>
            <h2 className='text-black text-4xl font-bold MerriweatherSans'>
              Hello <span className='text-custom-lightBlue'>{user.fullName}</span>
            </h2>
          </div>
        </div>
        <div className='border-2 border-black rounded-md'>
          <Table columns={columns} data={usersList} />
        </div>
      </div>
    </section >

  )
}

export default Usermanagement