import React, { useContext, useEffect, useMemo, useState } from 'react'
import { columns, columnsData } from '@/utils/Table/columns';
import { products } from '@/utils/data';
import { Api } from '@/utils/service';
import { useRouter } from 'next/router';
import moment from 'moment';
import { AiOutlineCheck } from 'react-icons/ai';
import { userContext } from './_app';
import Table from '@/src/components/Table/table';

const Notifications = (props) => {

    const router = useRouter()
    const [bookings, setBookings] = useState([])
    const [notification, setNotification] = useState('')
    const [SortedBookings, setSortedBookings] = useState([])
    const [donationNames, setDonationNames] = useState([])
    const [selected, setSelected] = useState([])
    const [allSelected, setAllSelected] = useState(false)
    const [mainList, setmainList] = useState([]);

    const [user, setUser] = useContext(userContext);


    const nameHandler = ({ value }) => {
        return (
            <div className=' p-4  flex items-center  justify-center'>
                <p className='font-semibold text-lg'>{value}</p>
            </div>
        )
    }
    const statusHandler = ({ value }) => {
        return (
            <div className=' p-4 flex items-center  justify-center'>
                <p className={`font-semibold text-lg `}>{value}</p>
            </div>
        )
    }

    useEffect(() => {
        let updated = SortedBookings.map((book) => {
            if (allSelected) {
                book.checked = true
                return book
            }
            else {
                book.checked = false
                return book
            }
        })
        setSortedBookings(updated)
    }, [allSelected])

    const checkBoxHandler = ({ value, row }) => {
        return (
            <div className=' p-4 flex items-center  justify-center'>

                <div className={`w-5 h-5 ${selected.includes(value) && 'bg-[#FFCD03]'} ${(row.original.checked) && 'bg-[#FFCD03]'} border border-[#FFCD03] flex items-center justify-center cursor-pointer`}
                    onClick={() => {
                        let updated = SortedBookings.map((book) => {
                            //console.log(book)
                            if (book._id === value) {
                                book.checked = !book.checked
                                return book
                            }
                            return book
                        })
                        setSortedBookings(updated)
                    }}
                >
                    <AiOutlineCheck className={`font-semibold  ${(row.original.checked) ? 'text-black' : 'text-white'}`} />
                </div>
                {' '}#{row.original.userID}
            </div>
        )
    }


    const columns = useMemo(() => [
        {
            Header: "UserID",
            accessor: "userID",
            Cell: checkBoxHandler
        },
        {
            Header: "NAME",
            accessor: "fullName",
            Cell: nameHandler
        },
        {
            Header: "NUMBER",
            accessor: "phone",
            Cell: nameHandler
        },
        {
            Header: "EMAIL",
            accessor: "email",
            Cell: statusHandler
        },
        {
            Header: "Status",
            accessor: "status",
            Cell: nameHandler
        },

    ], [SortedBookings, allSelected])

    useEffect(() => {
        getBookings()
    }, [])

    const getBookings = () => {
        props.loader(true);
        Api("get", '/api/getUsers', '', router).then(
            (res) => {
                console.log("res================>", res);
                props.loader(false);
                // res.data.forEach((i) => {
                //     i.checked = false
                // })
                setBookings(res.data)
                setSortedBookings(res.data)
                setmainList(res.data)
                let tickets = new Set(res.data.map((book) => book.ticket?.title))
                setDonationNames(Array.from(tickets))
            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.message });
            }
        );
    }

    const sendNotification = () => {
        let users = Array.from(new Set(
            SortedBookings.filter((user) => {
                if (user.checked) {
                    return user
                }
            })
                .map((user) => user?._id)
        ))
        // console.log(users)
        if (!notification) {
            props.toaster({ type: "error", message: "Notification Required" })
            return
        }
        if (users.length === 0) {
            props.toaster({ type: "error", message: "Select Bookings" })
            return
        }
        props.loader(true);
        Api("post", '/api/sendnotificationbyadmin', { notification, users: users }, router).then(
            (res) => {
                props.loader(false);
                console.log("res================>", res);
                setNotification('')
                setAllSelected(false)
                getBookings()
                props.toaster({ type: 'success', message: res.message });
            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.message });
            }
        );
    }

    const filterData = (event) => {
        console.log(event)
        if (event?.target?.value.length > 0) {
            const newdata = mainList.filter(f => f.userID.includes(event.target.value))
            setSortedBookings(newdata)
        } else {
            setSortedBookings(mainList)
        }
    }

    return (
        <section className='p-5'>
            <div className='md:px-6 md:py-4 bg-white relative'>
                <h2 className='upercase text-2xl md:text-3xl font-semibold mb-3'>Notification Broadcasting</h2>
                <div className='w-[99%] mx-auto md:w-full bg-white h-full border-2 border-black rounded-[30px] p-3 md:p-6 flex flex-col overflow-auto space-y-4'>
                    <h2 className='upercase text-2xl md:text-3xl font-semiboldtext-center md:text-left'>Notification:</h2>
                    <div className='p-3 md:p-4 bg-white text-sm  md:text-lg rounded-3xl font-semibold border border-custom-blue'>
                        <textarea type="text" className='w-full bg-transparent outline-none text-black' rows={5} value={notification}
                            placeholder='Write Something'
                            onChange={(e) => setNotification(e.target.value)} />
                    </div>
                    <div className='md:flex items-center  gap-10 justify-center md:justify-start'>
                        <button className='md:px-10 md:py-3 px-3 py-1 text-white font-semibold text-md md:text-2xl bg-custom-blue rounded-lg'
                            onClick={sendNotification}
                        >Send Notification</button>
                        <div className='flex items-center gap-2 md:py-0 py-5'>
                            <p className='text-lg font-medium'>Search:</p>
                            <input placeholder='Search By UserID' className='border border-black text-sm rounded-md px-5  py-1' onChange={filterData} />
                        </div>
                        <button className=' px-3 py-1 text-white  text-md bg-custom-blue rounded-lg' onClick={() => setAllSelected(!allSelected)}>{allSelected ? "Unselect all" : "Select All"}</button>
                    </div>
                    <div className='h-full w-full'>
                        <Table columns={columns} data={SortedBookings} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Notifications