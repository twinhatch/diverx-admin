import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import { BiRupee } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa'
import { products } from '@/utils/data'
import Table from '@/src/components/Table/table'
import { RxCross2 } from 'react-icons/rx'
import { FaSackDollar } from 'react-icons/fa6'
import { FiEdit } from "react-icons/fi";
import { Api } from '@/utils/service'
import { useRouter } from 'next/router'
import { MdDeleteForever } from "react-icons/md";
import { MultiSelect } from "react-multi-select-component";

const PaymentCommission = (props) => {
    const router = useRouter()
    const [popup, setPopUp] = useState(false)
    const [myservies, setmyservices] = useState([]);
    const [productPopup, setProductPopup] = useState(false);
    const [popUpUser, setPopUpUser] = useState({});
    const [deleteid, setdeleteid] = useState(null);
    const [allservices, setAllservices] = useState([]);
    const [servicerequest, setserviceRequest] = useState({
        type: '',
        services: [],
        expirydate: new Date(),
        amount: 0,
        pdf: '',
        user: ''
    })

    useEffect(() => {
        getmyService()
    }, [])

    const statusHandler = ({ value }) => {
        return (
            <div className=' p-4  flex items-center  justify-center'>
                <p className='text-black text-base font-normal py-1 px-5 border border-custom-green rounded-[5px] Poppins'>{moment(value).format('DD/MM/YYYY hh:mm A')}</p>
            </div>
        )
    }

    const contactNumber = ({ value }) => {
        return (
            <div className=' p-4  flex items-center  justify-center'>
                <p className='text-black text-base font-normal py-1 px-5 border border-custom-green rounded-[5px] Poppins'>{value}</p>
            </div>
        )
    }


    const nameHandler = ({ value }) => {
        return (
            <div className=' p-4  flex items-center  justify-center'>
                <p className='text-black text-base	font-normal border border-custom-lightBlue py-1 px-5 rounded-[5px] Poppins'>{value.map((m) => (<span>{m.title},{' '}</span>))}</p>
            </div>
        )
    }

    const idHandler = ({ value }) => {
        return (
            <div className=' p-4  flex items-center  justify-center gap-4'>
                {/* <input type="checkbox" className='border-2 border-custom-blue text-custom-blue w-5 h-5' /> */}
                <p className='text-custom-green text-base font-bold Poppins'>#{value}</p>
            </div>
        )
    }

    const actionHandler = ({ value, row }) => {
        return (
            <div className=' p-4  flex items-center  justify-center gap-2'>
                <p className='h-[36px] w-[36px] bg-custom-darkGreen rounded-full flex justify-center items-center'><FiEdit className='h-[18px] w-[18px]' onClick={() => {
                    console.log()

                    getAllService(row.original.type, row)
                    setPopUp(true)
                    setPopUpUser(row.original.user)
                }} /></p>
                <p className='h-[36px] w-[36px] bg-custom-darkGreen rounded-full flex justify-center items-center'><MdDeleteForever className='h-[18px] w-[18px]' onClick={() => { setProductPopup(true), setdeleteid(row.original._id) }} /></p>
                {/* <button className='text-black text-base	font-normal	w-[76px] h-[36px] bg-custom-darkGreen rounded-[2px] ml-2 Poppins'>Submit</button> */}
            </div>
        )
    }

    const imageOnError = (event) => {
        event.currentTarget.src = '/profile-default.png';
        // event.currentTarget.className = "error";
    };

    const agreement = ({ value }) => {
        return (
            <div className=' p-4  flex items-center  justify-center'>
                <div className='h-[36px] w-[57px] bg-custom-darkGreen rounded-[2px] flex justify-center items-center cursor-pointer' onClick={() => { window.open(value) }} >
                    <img className='h-[18px] w-[18px]' src='/upload-fill.png' />
                </div>
            </div>
        )
    }

    const Refund = ({ value }) => {
        return (
            <div className=' p-4  flex items-center  justify-center'>
                <p className='text-black font-normal text-base py-1 px-5 border border-custom-green rounded-[5px] Poppins'>{value}</p>
            </div>
        )
    }

    const columns = useMemo(
        () => [
            {
                Header: "UserId",
                accessor: "user.userID",
                Cell: idHandler
            },
            {
                Header: "Service",
                accessor: "services",
                Cell: nameHandler
            },
            {
                Header: "Payment ($)",
                accessor: "amount",
                Cell: Refund
            },
            {
                Header: "Deadline",
                accessor: "expirydate",
                Cell: statusHandler
            },
            {
                Header: "Contact No.",
                accessor: "user.phone",
                Cell: contactNumber
            },
            {
                Header: "Agreement",
                accessor: "pdf",
                Cell: agreement
            },
            {
                Header: "Action",
                // accessor: "more",
                Cell: actionHandler
            },
        ],
        []
    );
    const getmyService = async (type) => {
        props.loader(true);
        Api("get", `/api/getallservicerequest`, '', router).then(
            (res) => {
                props.loader(false);
                console.log("res================>", res);
                const newarray = res.map((m) => { return { ...m, label: m.title, value: m._id } })
                console.log(newarray)
                setmyservices(newarray)
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

    const deleteService = async (id) => {
        props.loader(true);
        Api("delete", `/api/deleteservicerequest/${id}`, '', router).then(
            (res) => {
                props.loader(false);
                console.log("res================>", res);
                getAllService()
                setProductPopup(false)
                setdeleteid(null)
                // setServiceList(res)
                // setmainList(res.data)
            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.message });
            }
        );
    }


    const getAllService = async (type, row) => {
        props.loader(true);
        Api("get", `/api/getallservice?type=${type}`, '', router).then(
            (res) => {
                props.loader(false);
                console.log("res================>", res);
                const newarray = res.map((m) => { return { ...m, label: m.title, value: m._id } })
                console.log(newarray)
                setAllservices(newarray)
                if (row) {
                    console.log(row.original.services.map((m) => m._id))
                    setserviceRequest({
                        type: row.original.type,
                        services: row.original.services.map((m) => { return { label: m.title, value: m._id } }),
                        expirydate: moment(new Date(row.original.expirydate)).format('YYYY-MM-DDTHH:mm'),
                        amount: row.original.amount,
                        pdf: row.original.pdf,
                        user: row.original.user._id,
                        id: row.original._id
                    });
                }

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
        servicerequest.services = servicerequest.services.map(m => m.value)
        Api("put", `/api/updateservicerequest/${servicerequest.id}`, servicerequest, router).then(
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
                getmyService()
            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.message });
            }
        );
    }

    const handleImageChange = (event, i) => {
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
                    setserviceRequest({ ...servicerequest, pdf: res.data.file })
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
    return (
        <section className='p-5'>
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
                            {/* {popupPackage?.name} */}
                        </h2>

                        <div className=" w-full p-5 text-xl font-medium text-center ">
                            <p>You want to delete ?</p>
                        </div>
                        <div className="flex justify-center">
                            <button className="h-[50px] w-[130px] bg-[#b5301f] p-2 rounded-[10px] text-white my-[30px] text-center mx-[10px]" onClick={() => { setProductPopup(false) }}>No</button>
                            <button className="h-[50px] w-[130px] bg-[#0D97AE] p-2 rounded-[10px] text-white my-[30px] text-center mx-[10px]"
                                onClick={() => { deleteService(deleteid) }}
                            >Yes</button>
                        </div>
                    </div>
                </div>
            )}

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
                                        console.log(text)
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
                                <button className='text-white text-lg bg-green-500 py-2 px-6 w-[100px] rounded-md' type="submit">Update</button>
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
            <div className='  w-full space-y-4'>
                <div className='p-6 border-2 border-custom-lightBlue rounded-[15px] flex items-center justify-between'>
                    <div className='w-full'>
                        <p className='text-black text-2xl font-bold	MerriweatherSans'>{`${moment(new Date()).format('DD-MMM-YYYY')} , ${moment(new Date()).format('dddd')}`}</p>
                        <h2 className='text-blac text-4xl font-bold	MerriweatherSans'>Hello <span className='text-custom-lightBlue'>Demomail</span></h2>
                    </div>

                </div>
                <div className='border-2 border-black rounded-md'>
                    <Table columns={columns} data={myservies} />
                </div>
            </div>
        </section>
    )
}

export default PaymentCommission