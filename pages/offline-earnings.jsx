import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import Table from '@/src/components/Table/table'
import { RxCross2 } from 'react-icons/rx'
import { FiEdit } from "react-icons/fi";
import { Api } from '@/utils/service'
import { useRouter } from 'next/router'
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const OfflineEarnings = (props) => {
    const router = useRouter()
    const [popup, setPopUp] = useState(false)
    const [popUpUser, setPopUpUser] = useState({});
    const [offlineEarnData, setOfflineEarnData] = useState([]);

    useEffect(() => {
        getallOfflineEarn()
    }, [])

    const statusHandler = ({ value }) => {
        return (
            <div className=' p-4  flex items-center  justify-center'>
                <p className='text-black text-base font-normal py-1 px-5 border border-custom-green rounded-[5px] Poppins whitespace-break-spaces w-[300px]'>{value.map((m) => (<span>{m.name},{' '}</span>))}</p>
            </div>
        )
    }

    const nameHandler = ({ value }) => {
        return (
            <div className=' p-4  flex items-center  justify-center'>
                <p className='text-black text-base	font-normal border border-custom-lightBlue py-1 px-5 rounded-[5px] Poppins'>{value}</p>
            </div>
        )
    }

    const idHandler = ({ value }) => {
        return (
            <div className=' p-4  flex items-center  justify-center gap-4'>
                <p className='text-custom-green text-base font-bold Poppins'>#{value}</p>
            </div>
        )
    }

    const actionHandler = ({ value, row }) => {
        return (
            <div className=' p-4  flex items-center  justify-center gap-2'>
                <p className='h-[36px] w-[36px] bg-custom-darkGreen rounded-full flex justify-center items-center'><MdDeleteForever className='h-[18px] w-[18px]' onClick={() => deleteOfflineEarn(row.original._id)} /></p>
            </div>
        )
    }

    const imageOnError = (event) => {
        event.currentTarget.src = '/profile-default.png';
        // event.currentTarget.className = "error";
    };

    const agreement = ({ row, value }) => {
        console.log(row?.original?.cv)
        return (
            <div className=' p-4  flex items-center  justify-center'>
                <div className='h-[36px] w-[57px] bg-custom-darkGreen rounded-[2px] flex justify-center items-center cursor-pointer' onClick={() => { window.open(value) }} >
                    <img className='h-[18px] w-[18px]' src='/upload-fill.png' />
                </div>
            </div>
        )
    }

    const Refund = ({ row, value }) => {
        console.log(row.original.experience)
        return (
            <div className='flex justify-center items-center'>
                <div className='p-4  flex flex-col items-center  justify-center'>
                    <p className='text-black font-normal text-base Poppins pb-1'>Years</p>
                    <p className='text-black font-normal text-base py-1 px-5 border border-custom-green rounded-[5px] Poppins'>{row?.original?.experience?.year}</p>
                </div>
                <div className='p-4  flex flex-col items-center  justify-center'>
                    <p className='text-black font-normal text-base Poppins pb-1'>Months</p>
                    <p className='text-black font-normal text-base py-1 px-5 border border-custom-green rounded-[5px] Poppins'>{row?.original?.experience?.months}</p>
                </div>
            </div>
        )
    }

    const wallet = ({ row, value }) => {
        console.log(row.original.experience)
        return (
            <div className='flex justify-center items-center'>
                <div className='p-4  flex flex-col items-center  justify-center'>
                    <p className='text-black font-normal text-base py-1 px-5 border border-custom-green rounded-[5px] Poppins'>{row?.original?.user?.wallet}</p>
                </div>
                <div className='p-4 flex items-center  justify-center'>
                    <div className='h-[36px] w-[57px] bg-custom-darkGreen rounded-[2px] flex justify-center items-center cursor-pointer'
                        onClick={() => {
                            setPopUp(true);
                            setPopUpUser(row.original.user);
                        }}
                    >
                        <FiEdit className='h-[18px] w-[18px]' />
                    </div>
                </div>
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
                Header: "Profession",
                accessor: "profession",
                Cell: nameHandler
            },
            {
                Header: "Experience",
                // accessor: "amount",
                Cell: Refund
            },
            {
                Header: "Skills",
                accessor: "skills",
                Cell: statusHandler
            },
            {
                Header: "CV",
                accessor: "cv",
                Cell: agreement
            },
            {
                Header: "Learning Modules",
                accessor: "learning_modules",
                Cell: agreement
            },
            {
                Header: "Wallet",
                // accessor: "amount",
                Cell: wallet
            },
            {
                Header: "Action",
                // accessor: "more",
                Cell: actionHandler
            },
        ],
        []
    );

    const getallOfflineEarn = async (type) => {
        props.loader(true);
        Api("get", `/api/getallOfflineEarn`, '', router).then(
            (res) => {
                props.loader(false);
                console.log("res================>", res);
                setOfflineEarnData(res)
            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.message });
            }
        );
    }

    const deleteOfflineEarn = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to proceed with the deletion? change this to You want to proceed with the delete?",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete"
        })
            .then(function (result) {
                if (result.isConfirmed) {
                    // const data = {
                    //     _id,
                    // };
                    props.loader(true);
                    Api("delete", `/api/deleteOfflineEarn/${_id}`, '', router).then(
                        (res) => {
                            console.log("res================>", res.data?.meaasge);
                            props.loader(false);
                            getallOfflineEarn()
                            props.toaster({ type: "success", message: 'Offline Earnings account deleted successfully' });
                        },
                        (err) => {
                            props.loader(false);
                            console.log(err);
                            props.toaster({ type: "error", message: err?.data?.meaasge });
                            props.toaster({ type: "error", message: err?.meaasge });
                        }
                    );

                } else if (result.isDenied) {
                    // setFullUserDetail({})
                }
            });
    };

    const updateUser = async (popUpUser) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't to update this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!"
        }).then((result) => {
            if (result.isConfirmed) {
                props.loader(true);
                const data = {
                    wallet: popUpUser?.wallet,
                }
                Api("post", `/api/updateUser?id=${popUpUser?._id}`, data, router).then(
                    (res) => {
                        props.loader(false);
                        console.log("res================>", res);
                        getallOfflineEarn()
                        setPopUpUser({})
                        setPopUp(false)
                    },
                    (err) => {
                        props.loader(false);
                        console.log(err);
                        props.toaster({ type: "error", message: err?.message });
                    }
                );
            }
        });
    }

    return (
        <section className='p-5'>

            {popup && <div className='fixed top-0 left-0 w-screen h-screen bg-black/30 flex justify-center items-center z-50'>
                <div className='w-[300px] md:w-[450px]  bg-white border-2 border-custom-blue rounded-md m-auto'>
                    <div className='p-3 flex justify-between items-center'>
                        <div className='flex gap-2 items-center'>
                            <div className='rounded-full  bg-white text-black w-12 h-12'>
                                <img src={popUpUser?.profile} alt="" className='rounded-full w-12 h-12 border-2 border-black' />
                            </div>

                            <div className='text-lg flex flex-col'>
                                <p>{popUpUser?.fullName}</p>
                                <p>{popUpUser?.email}</p>
                            </div>
                        </div>
                        <div className='p-1 rounded-full bg-custom-blue text-white w-12 h-12 cursor-pointer' onClick={() => {
                            setPopUp(!popup);
                        }}>
                            <RxCross2 className='h-full w-full font-semibold' />
                        </div>
                    </div>


                    <div className='flex flex-col  justify-center gap-4 p-5'>

                        <div className='flex items-center gap-2'>
                            <p className='text-black w-20'>Wallet</p>
                            <input type='number' className='py-1 px-5 text-black border-2 border-custom-blue rounded-md w-28' value={popUpUser?.wallet}
                                onChange={async (text) => {
                                    setPopUpUser({
                                        ...popUpUser,
                                        wallet: text.target.value
                                    })
                                }}
                            />
                        </div>

                    </div>
                    <div className='w-[250px] md:w-[300px] p-3 mx-auto flex justify-between items-center '>
                        <button className='text-white text-lg bg-green-500 py-2 px-6 w-[100px] rounded-md' onClick={() => { updateUser(popUpUser) }}>Update</button>
                        <button className='text-white text-lg bg-red-500 py-2  w-[100px] rounded-md'
                            onClick={() => {
                                setPopUp(!popup)
                            }}>Cancel</button>
                    </div>

                </div>
            </div>}

            <div className='w-full space-y-4'>
                <div className='p-6 border-2 border-custom-lightBlue rounded-[15px] flex items-center justify-between'>
                    <div className='w-full'>
                        <p className='text-black text-2xl font-bold	MerriweatherSans'>{`${moment(new Date()).format('DD-MMM-YYYY')} , ${moment(new Date()).format('dddd')}`}</p>
                        <h2 className='text-blac text-4xl font-bold	MerriweatherSans'>Hello <span className='text-custom-lightBlue'>Demomail</span></h2>
                    </div>
                </div>

                <div className='border-2 border-black rounded-md'>
                    <Table columns={columns} data={offlineEarnData} />
                </div>
            </div>
        </section>
    )
}

export default OfflineEarnings