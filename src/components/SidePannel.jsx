
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { AiOutlineBulb, AiFillDatabase } from 'react-icons/ai'
import { MdDashboard } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'
import { FiPackage } from 'react-icons/fi'
import { FaSackDollar } from 'react-icons/fa6'
import { MdSupportAgent, MdContentPaste } from 'react-icons/md'
import { VscFeedback } from 'react-icons/vsc'
import { ImCross } from 'react-icons/im'
import { FaRegNewspaper } from "react-icons/fa";
import { userContext } from '@/pages/_app'
import { FaWhatsapp } from "react-icons/fa";
import { SiSololearn } from "react-icons/si";

const SidePannel = ({ setOpenTab, openTab }) => {
    // const user = {
    //     token: '666'
    // }
    const router = useRouter();
    const [user, setUser] = useContext(userContext);
    console.log(user)

    const logOutHandler = () => {
        localStorage.removeItem("PBuser")
        localStorage.removeItem("token")
        setUser({})
        router.push('/login')
    }

    const imageOnError = (event) => {
        event.currentTarget.src = '/userprofile.png';
        // event.currentTarget.className = "error";
    };


    return (
        <>
            <div className='xl:w-[300px] fixed top-0 left-0 z-20   md:w-[250px] sm:w-[200px] hidden sm:grid grid-rows-5 h-screen overflow-auto  bg-custom-blue'>
                <div className='py-10'>
                    <div className=' row-span-1 w-full h-full flex flex-col items-center justify-center cursor-pointer ' onClick={(() => router.push('/'))}>
                        <img src="/Logo.png" alt="" className='w-full h-full object-contain' />
                        <p className='text-custom-darkBlack text-2xl font-normal SonsieOne '>DiverX</p>
                    </div>
                </div>
                <div className='flex flex-col justify-between row-span-4  w-full h-full'>
                    <ul className='w-full h-full flex flex-col text-left '>
                        <Link href={'/'} className={`flex items-center  cursor-pointer group hover:bg-custom-yellow hover:text-custom-blue border-t-2 border-b-2 border-white ${router.pathname === ('/') ? 'bg-custom-yellow text-white' : 'text-custom-darkBlack'}`}>

                            <div className=' py-3 pl-6 font-normal flex items-center gap-4 MicrosoftSansSerif'>
                                <div className='w-6'>
                                    < MdDashboard className='text-3xl' />
                                </div>
                                Dashboard
                            </div>

                        </Link>
                        <Link href={'/user-management'} className={`flex items-center  cursor-pointer group hover:bg-custom-yellow hover:text-custom-blue border-b-2 border-white ${router.pathname.includes('user-management') ? 'bg-custom-yellow text-white' : 'text-custom-darkBlack'}`}>
                            <div className=' py-3 pl-6 font-normal flex items-center gap-4 MicrosoftSansSerif'>
                                <div className='w-6'>
                                    < FaUser className='text-3xl' />
                                </div>
                                User Management
                            </div>
                        </Link>
                        <Link href={'/package-pickup'} className={`flex items-center  cursor-pointer group hover:bg-custom-yellow hover:text-custom-blue border-b-2 border-white ${router.pathname.includes('package-pickup') ? 'bg-custom-yellow text-white' : 'text-custom-darkBlack'}`}>
                            <div className=' py-3 pl-6 font-normal flex items-center gap-4 MicrosoftSansSerif'>
                                <div className='w-6'>
                                    < FiPackage className='text-3xl' />
                                </div>
                                Service Management
                            </div>
                        </Link>
                        <Link href={'/poll-management'} className={`flex items-center  cursor-pointer group hover:bg-custom-yellow hover:text-custom-blue border-b-2 border-white ${router.pathname.includes('poll-management') ? 'bg-custom-yellow text-white' : 'text-custom-darkBlack'}`}>
                            <div className=' py-3 pl-6 font-normal flex items-center gap-4 MicrosoftSansSerif'>
                                <div className='w-6'>
                                    < FiPackage className='text-3xl' />
                                </div>
                                Poll Management
                            </div>
                        </Link>
                        {/* <Link href={'/travellplan'} className={`flex items-center  cursor-pointer group hover:bg-custom-yellow hover:text-custom-blue border-b-2 border-white ${router.pathname.includes('travellplan') ? 'bg-custom-yellow text-white' : 'text-custom-darkBlack'}`}>
                            <div className=' py-3 pl-6 font-normal flex items-center gap-4 MicrosoftSansSerif'>
                                <div className='w-6'>
                                    < FiPackage className='text-3xl' />
                                </div>
                                Travel Plan
                            </div>
                        </Link> */}
                        <Link href={'/payment-commission'} className={`flex items-center  cursor-pointer group hover:bg-custom-yellow hover:text-custom-blue border-b-2 border-white ${router.pathname.includes('payment-commission') ? 'bg-custom-yellow text-white' : 'text-custom-darkBlack'}`}>
                            <div className=' py-3 pl-6 font-normal flex items-center gap-4 MicrosoftSansSerif'>
                                <div className='w-6'>
                                    < FaSackDollar className='text-3xl' />
                                </div>
                                Payment
                            </div>
                        </Link>
                        {/* <Link href={'/reported-issue'} className={`flex items-center  cursor-pointer group hover:bg-custom-yellow hover:text-custom-blue border-b-2 border-white ${router.pathname.includes('reported-issue') ? 'bg-custom-yellow text-white' : 'text-custom-darkBlack'}`}>
                            <div className=' py-3 pl-6 font-normal flex items-center gap-4 MicrosoftSansSerif'>
                                <div className='w-6'>
                                    < AiOutlineBulb className='text-3xl' />
                                </div>
                                Reported issue
                            </div>
                        </Link> */}

                        {/* <Link href={'/feedback-ratings'} className={`flex items-center  cursor-pointer group hover:bg-custom-yellow hover:text-custom-blue border-b-2 border-white ${router.pathname.includes('feedback-ratings') ? 'bg-custom-yellow text-white' : 'text-custom-darkBlack'}`}>
                            <div className=' py-3 pl-6 font-normal flex items-center gap-4 MicrosoftSansSerif'>
                                <div className='w-6'>
                                    < VscFeedback className='text-3xl' />
                                </div>
                                Feedback and Ratings
                            </div>
                        </Link> */}
                        <Link href={'/support-help'} className={`flex items-center  cursor-pointer group hover:bg-custom-yellow hover:text-custom-blue border-b-2 border-white ${router.pathname.includes('support-help') ? 'bg-custom-yellow text-white' : 'text-custom-darkBlack'}`}>
                            <div className=' py-3 pl-6 font-normal flex items-center gap-4 MicrosoftSansSerif'>
                                <div className='w-6'>
                                    < MdSupportAgent className='text-3xl' />
                                </div>
                                Support and Help Center
                            </div>
                        </Link>
                        <Link href={'/content-management'} className={`flex items-center  cursor-pointer group hover:bg-custom-yellow hover:text-custom-blue border-b-2 border-white ${router.pathname.includes('content-management') ? 'bg-custom-yellow text-white' : 'text-custom-darkBlack'}`}>
                            <div className=' py-3 pl-6 font-normal flex items-center gap-4 MicrosoftSansSerif'>
                                <div className='w-6'>
                                    < MdContentPaste className='text-3xl' />
                                </div>
                                Content Management
                            </div>
                        </Link>
                        <Link href={'/notifications'} className={`flex items-center  cursor-pointer group hover:bg-custom-yellow hover:text-custom-blue border-b-2 border-white ${router.pathname.includes('notifications') ? 'bg-custom-yellow text-white' : 'text-custom-darkBlack'}`}>
                            <div className=' py-3 pl-6 font-normal flex items-center gap-4 MicrosoftSansSerif'>
                                <div className='w-6'>
                                    < MdContentPaste className='text-3xl' />
                                </div>
                                Notification
                            </div>
                        </Link>
                        <Link href={'/news'} className={`flex items-center  cursor-pointer group hover:bg-custom-yellow hover:text-custom-blue border-b-2 border-white ${router.pathname.includes('news') ? 'bg-custom-yellow text-white' : 'text-custom-darkBlack'}`}>
                            <div className=' py-3 pl-6 font-normal flex items-center gap-4 MicrosoftSansSerif'>
                                <div className='w-6'>
                                    < FaRegNewspaper className='text-3xl' />
                                </div>
                                News
                            </div>
                        </Link>
                        <Link href={'/whatsapp-management'} className={`flex items-center  cursor-pointer group hover:bg-custom-yellow hover:text-custom-blue border-b-2 border-white ${router.pathname.includes('whatsapp-management') ? 'bg-custom-yellow text-white' : 'text-custom-darkBlack'}`}>
                            <div className=' py-3 pl-6 font-normal flex items-center gap-4 MicrosoftSansSerif'>
                                <div className='w-6'>
                                    <FaWhatsapp className='text-3xl' />
                                </div>
                                Whatsapp Management
                            </div>
                        </Link>
                        <Link href={'/offline-earnings'} className={`flex items-center  cursor-pointer group hover:bg-custom-yellow hover:text-custom-blue border-b-2 border-white ${router.pathname.includes('offline-earnings') ? 'bg-custom-yellow text-white' : 'text-custom-darkBlack'}`}>
                            <div className=' py-3 pl-6 font-normal flex items-center gap-4 MicrosoftSansSerif'>
                                <div className='w-6'>
                                    <SiSololearn className='text-3xl' />
                                </div>
                                Offline Earnings
                            </div>
                        </Link>
                    </ul>
                </div>
            </div>

            <div className={`w-full absolute top-0 left-0 z-40 sm:hidden flex flex-col h-screen max-h-screen overflow-hidden bg-custom-blue ${openTab ? 'scale-x-100' : 'scale-x-0'} transition-all duration-300 origin-left`}>
                <div className=' row-span-1  w-full  relative text-white'>
                    <ImCross className='absolute top-4 right-4 z-40 text-2xl' onClick={() => setOpenTab(!openTab)} />
                    <div className='flex items-center gap-3 w-full  p-3 border-b-2 border-[#FFD93F]'>
                        <div className='w-12 h-12 rounded-full overflow-hidden'>
                            <img src={user?.profile} alt="" className='w-full h-full object-cover' onError={imageOnError} />
                        </div>
                        <div className='flex flex-col text-left justify-center'>
                            <p className='text-lg font-semibold'>DiverX</p>
                            <p className='-mt-2 text-sm'>{user?.email}</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-start row-span-2 h-full  w-full'>
                    <div className=' row-span-1 w-full flex items-center justify-center cursor-pointer' onClick={(() => router.push('/'))}>
                        <img src="/Logo.png" alt="" className='w-[200px]  object-contain' />
                    </div>
                    <ul className='w-full h-full flex flex-col text-left justify-start items-center '>
                        <li className='w-full flex items-center text-white cursor-pointer group hover:bg-custom-yellow hover:text-custom-blue border-t-2 border-b-2 border-white'>
                            <div className=' py-2 pl-6 font-semibold flex items-center gap-4 ' onClick={() => setOpenTab(!openTab)}>
                                <div className='w-6'>
                                    < MdDashboard className='text-2xl' />
                                </div>
                                <Link href={'/'}>Dashboard</Link>
                            </div>
                        </li>
                        <li className='w-full flex items-center text-white cursor-pointer group hover:bg-custom-yellow hover:text-custom-blue border-b-2 border-white'>
                            <div className=' py-2 pl-6 font-semibold flex items-center gap-4 ' onClick={() => setOpenTab(!openTab)}>
                                <div className='w-6'>
                                    < FaUser className='text-2xl' />
                                </div>
                                <Link href={'/user-management'}>User Management</Link>
                            </div>
                        </li>
                        <li className='w-full flex items-center text-white cursor-pointer group hover:bg-custom-yellow hover:text-custom-blue border-b-2 border-white'>
                            <div className=' py-2 pl-6 font-semibold flex items-center gap-4 ' onClick={() => setOpenTab(!openTab)}>
                                <div className='w-6'>
                                    < FiPackage className='text-2xl' />
                                </div>
                                <Link href={'/package-pickup'}>Service Management</Link>
                            </div>
                        </li>
                        <li className='w-full flex items-center text-white cursor-pointer group hover:bg-custom-yellow hover:text-custom-blue border-b-2 border-white'>
                            <div className=' py-2 pl-6 font-semibold flex items-center gap-4 ' onClick={() => setOpenTab(!openTab)}>
                                <div className='w-6'>
                                    < FiPackage className='text-2xl' />
                                </div>
                                <Link href={'/poll-management'}>Poll Management</Link>
                            </div>
                        </li>
                        <li className='w-full flex items-center text-white cursor-pointer group hover:bg-custom-yellow hover:text-custom-blue border-b-2 border-white'>
                            <div className=' py-2 pl-6 font-semibold flex items-center gap-4 ' onClick={() => setOpenTab(!openTab)}>
                                <div className='w-6'>
                                    < FaSackDollar className='text-2xl' />
                                </div>
                                <Link href={'/payment-commission'}>Payment</Link>
                            </div>
                        </li>
                        {/* <li className='w-full flex items-center text-white cursor-pointer group hover:bg-custom-yellow hover:text-custom-blue border-b-2 border-white'>
                            <div className=' py-2 pl-6 font-semibold flex items-center gap-4 ' onClick={() => setOpenTab(!openTab)}>
                                <div className='w-6'>
                                    < AiOutlineBulb className='text-2xl' />
                                </div>
                                <Link href={'/reported-issue'}>Reported issue</Link>
                            </div>
                        </li>

                        <li className='w-full flex items-center text-white cursor-pointer group hover:bg-custom-yellow hover:text-custom-blue border-b-2 border-white'>
                            <div className=' py-2 pl-6 font-semibold flex items-center gap-4 ' onClick={() => setOpenTab(!openTab)}>
                                <div className='w-6'>
                                    < VscFeedback className='text-2xl' />
                                </div>
                                <Link href={'/feedback-ratings'} >Feedback and Ratings</Link>
                            </div>
                        </li> */}
                        <li className='w-full flex items-center text-white cursor-pointer group hover:bg-custom-yellow hover:text-custom-blue border-b-2 border-white'>
                            <div className=' py-2 pl-6 font-semibold flex items-center gap-4 ' onClick={() => setOpenTab(!openTab)}>
                                <div className='w-6'>
                                    < MdSupportAgent className='text-2xl' />
                                </div>
                                <Link href={'/support-help'}>Support and Help Center</Link>
                            </div>
                        </li>
                        <li className='w-full flex items-center text-white cursor-pointer group hover:bg-custom-yellow hover:text-custom-blue border-b-2 border-white'>
                            <div className=' py-2 pl-6 font-semibold flex items-center gap-4 ' onClick={() => setOpenTab(!openTab)}>
                                <div className='w-6'>
                                    < MdContentPaste className='text-2xl' />
                                </div>
                                <Link href={'/content-management'}>Content Management</Link>
                            </div>
                        </li>
                        <li className='w-full flex items-center text-white cursor-pointer group hover:bg-custom-yellow hover:text-custom-blue border-b-2 border-white'>
                            <div className=' py-2 pl-6 font-semibold flex items-center gap-4 ' onClick={() => setOpenTab(!openTab)}>
                                <div className='w-6'>
                                    < MdContentPaste className='text-2xl' />
                                </div>
                                <Link href={'/notifications'}>Notification</Link>
                            </div>
                        </li>
                        <li className='w-full flex items-center text-white cursor-pointer group hover:bg-custom-yellow hover:text-custom-blue border-b-2 border-white'>
                            <div className=' py-2 pl-6 font-semibold flex items-center gap-4 ' onClick={() => setOpenTab(!openTab)}>
                                <div className='w-6'>
                                    < FaRegNewspaper className='text-2xl' />
                                </div>
                                <Link href={'/news'}>News</Link>
                            </div>
                        </li>
                        <li className='w-full flex items-center text-white cursor-pointer group hover:bg-custom-yellow hover:text-custom-blue border-b-2 border-white'>
                            <div className=' py-2 pl-6 font-semibold flex items-center gap-4 ' onClick={() => setOpenTab(!openTab)}>
                                <div className='w-6'>
                                    <FaWhatsapp className='text-2xl' />
                                </div>
                                <Link href={'/whatsapp-management'}>Whatsapp Management</Link>
                            </div>
                        </li>
                        <li className='w-full flex items-center text-white cursor-pointer group hover:bg-custom-yellow hover:text-custom-blue border-b-2 border-white'>
                            <div className=' py-2 pl-6 font-semibold flex items-center gap-4 ' onClick={() => setOpenTab(!openTab)}>
                                <div className='w-6'>
                                    <SiSololearn className='text-2xl' />
                                </div>
                                <Link href={'/offline-earnings'}>Offline Earnings</Link>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>

        </>
    )
}

export default SidePannel