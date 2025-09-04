import { Api } from '@/utils/service';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { userContext } from './_app';
import { validateMobileNumber } from '@/utils/validator';

const WhatsappManagement = (props) => {
    const router = useRouter()
    const [whatsappNumber, setWhatsappNumber] = useState({
        number: '',
        id: "",
        token:"",
        phoneID:""
    })

    const [user, setUser] = useContext(userContext);


    const getWhatsApp = () => {
        props.loader(true);
        Api("get", '/api/whatsapp/create', router).then(
            (res) => {
                console.log("res================>", res.data[0]);
                setWhatsappNumber({ number: res?.data[0]?.number, id: res?.data[0]?._id, token:res?.data[0]?.token, phoneID:res?.data[0]?.phoneID })
                props.loader(false);
            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.message });
            }
        );
    }
    const submit = () => {

        if (whatsappNumber.number) {
            // if(!validateMobileNumber(whatsappNumber.number, props.toaster)){
            //     return
            // }
            props.loader(true);
            Api("post", '/api/whatsapp/create', { ...whatsappNumber }, router).then(
                (res) => {
                    console.log("res================>", res);
                    props.loader(false);
                    getWhatsApp()
                    props.toaster({ type: "success", message: res?.message });
                },
                (err) => {
                    props.loader(false);
                    console.log(err);
                    props.toaster({ type: "error", message: err?.message });
                }
            );
        }
        else {
            props.toaster({ type: "error", message: "Number required" });
        }
    }
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("TravelUser"))) {
            router.push('/login')
        }
        getWhatsApp()
    }, [])
    return (
        <section className='md:px-6 px-5 md:pt-4 md:pb-4 pb-5  pt-5 bg-white relative '>
            <h2 className='upercase text-2xl md:text-3xl font-semibold mb-3'>WhatsApp Number Management</h2>
            <div className='w-[99%] mx-auto md:w-full bg-white h-full border-2 border-black rounded-[30px] p-5 md:p-6 flex flex-col overflow-auto space-y-4'>

                <div className='w-full h-full rounded-[30px] space-y-6'>
                    <div className='bg-white text-lg  font-semibold md:w-[400px] w-full'>
                        <input type="text" value={whatsappNumber.number} placeholder='9123xxxxxxxx' className='p-3 w-full bg-transparent border-2 border-custom-blue outline-0'
                            //  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                            onChange={(e) => {
                                // if (e.target.value.length <= 10) {
                                setWhatsappNumber({ ...whatsappNumber, number: e.target.value })
                                // }
                            }}
                        />
                    </div>
                    <div className='bg-white text-lg  font-semibold md:w-[400px] w-full'>
                        <input type="text" value={whatsappNumber.phoneID} placeholder='Phone ID' className='p-3 w-full bg-transparent border-2 border-custom-blue outline-0'
                            //  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                            onChange={(e) => {
                                // if (e.target.value.length <= 10) {
                                setWhatsappNumber({ ...whatsappNumber, phoneID: e.target.value })
                                // }
                            }}
                        />
                    </div>
                      <div className='bg-white text-lg  font-semibold md:w-[400px] w-full'>
                         <textarea type="text" value={whatsappNumber.token} placeholder='token' className='p-3 w-full bg-transparent border-2 border-custom-blue outline-0'
                            //  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                            onChange={(e) => {
                                // if (e.target.value.length <= 10) {
                                setWhatsappNumber({ ...whatsappNumber, token: e.target.value })
                                // }
                            }}
                        />
                    </div>
                    <div className='flex items-center 8 gap-10'>
                        <button className='px-4 py-3 text-black font-semibold text-2xl bg-custom-blue rounded-lg' onClick={submit}>Update</button>

                    </div>

                </div>
            </div>
        </section>
    )
}

export default WhatsappManagement