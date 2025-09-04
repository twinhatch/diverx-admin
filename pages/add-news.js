import React from 'react'
import moment from 'moment'

function AddNews() {
    return (
        <div className="w-full mx-auto p-5">

            <div className='md:p-6 p-3 border-2 border-custom-blue rounded-2xl flex flex-col md:flex-row items-end justify-between gap-2 md:gap-0'>
                <div className='w-full text-center md:text-left'>
                    <p className='text-black text-2xl font-bold	MerriweatherSans'>{`${moment(new Date()).format('DD-MMM-YYYY')} , ${moment(new Date()).format('dddd')}`}</p>
                    <h2 className='text-black text-4xl font-bold MerriweatherSans'>Hello <span className='text-custom-lightBlue'>Demomail.</span></h2>
                </div>
                <button className='w-[220px] h-[44px] rounded-[5px] bg-custom-lightBlue text-white text-base font-normal MicrosoftSansSerif' onClick={() => router.push('/content-management')}>Content Management</button>
            </div>

            <div className="md:grid grid-cols-2 bg-[#E9E9E9] md:px-5 p-4 rounded-xl border-t-8 border-custom-blue mt-4">
                <div className='md:mb-0 mb-3'>
                    <p className="text-[28px] text-custom-black font-bold">
                        News add
                    </p>
                </div>
            </div>
            <section className='pb-4 relative'>
                <div className='w-[99%] mx-auto md:w-full bg-white h-full border-[2px] border-custom-blue rounded-lg p-3 md:p-8 flex flex-col overflow-auto space-y-4'>
                    <div className='flex justify-start items-center'>
                        <p className='text-custom-lightBlue text-2xl font-normal MicrosoftSansSerif w-[150px]'>Heading</p>
                        <input type='text' placeholder='heading' className='border-2 border-custom-lightBlue rounded-[12px] w-[370px] h-[64px] text-custom-gray text-base font-normal pl-5 ml-10' />
                    </div>
                    <div className='flex justify-start items-center'>
                        <p className='text-custom-lightBlue text-2xl font-normal MicrosoftSansSerif w-[150px]'>Upload Image</p>
                        <div className='border-2 border-custom-lightBlue rounded-[12px] w-[370px] h-[64px] text-custom-gray text-base font-normal px-5 ml-10 flex justify-between items-center' >
                            <p className='text-custom-gray text-base font-normal'>Upload image</p>
                            <img className='w-[24px] h-[24px]' src='/upload-fill-1.png' />
                        </div>
                    </div>
                    <div className='flex justify-start items-start'>
                        <p className='text-custom-lightBlue text-2xl font-normal MicrosoftSansSerif w-[150px] mt-5'>Description</p>
                        <textarea type='text' placeholder='Desc' rows={5} className='border-2 border-custom-lightBlue rounded-[12px] w-[370px] h-[64px] text-custom-gray text-base font-normal p-5 ml-10'></textarea>
                    </div>
                    <div className='ml-[190px]'>
                        <button className='w-[143px] h-[44px] rounded-[5px] bg-custom-lightBlue text-white text-base font-normal MicrosoftSansSerif'>Add News</button>
                    </div>
                </div>
            </section>

            <div className="md:grid grid-cols-2 bg-[#E9E9E9] md:px-5 p-4 rounded-xl border-t-8 border-custom-blue mt-4">
                <div className='md:mb-0 mb-3'>
                    <p className="text-[28px] text-custom-black font-bold">
                        Added news
                    </p>
                </div>
            </div>
            <section className='pb-4 relative'>
                <div className='w-[99%] mx-auto md:w-full bg-white h-full border-[2px] border-custom-blue rounded-lg p-3 md:p-8 flex flex-col overflow-auto space-y-4'>
                    <div className="bg-white md:px-3 p-2 rounded-xl border-t-8 border-2 border-custom-lightBlue relative">
                        <div className=" w-full">
                            <div className="rounded-[30px]  relative w-full">
                                <div className="flex flex-row items-center w-full">
                                    <div className="grid md:grid-cols-8 grid-cols-1 w-full gap-5">
                                        <img className='w-[78px] h-[75px]' src='/Logo.png' />
                                        <div className='col-span-7 w-full flex flex-col justify-start items-start'>
                                            <p className='text-custom-lightBlue text-2xl font-normal MicrosoftSansSerif'>Heading of the Topic that we enter</p>
                                            <p className='text-custom-lightBlue text-lg font-normal MicrosoftSansSerif'>Lorem ipsum dolor sit amet consectetur. Etiam vitae volutpat et ipsum dolor ut sit tortor proin. Nec molestie posuere bibendum ultrices nisl sed nisl mauris blandit. Mauris elementum sit nibh </p>
                                        </div>
                                    </div>
                                    <img className='h-[42px] w-[42px] absolute top-[-30px]; right-[-30px];' src='/close-icon.png' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AddNews