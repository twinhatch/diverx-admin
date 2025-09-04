import moment from 'moment/moment'
import React from 'react'
import { AiOutlineDollarCircle, AiOutlineStar } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { IoNewspaperOutline } from 'react-icons/io5'
import { GoCodeReview } from 'react-icons/go'
import { MdOutlineRateReview } from 'react-icons/md'
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'

function Index() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [

      {
        label: "Second dataset",
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: "#742774"
      }
    ],
  };
  const options = {
    scales: {
      x: {
        grid: {
          display: false, // Remove x-axis grid lines
        },
      },
      y: {
        grid: {
          display: false, // Remove y-axis grid lines
        },
      },
    },
  };

  return (
    <section className='p-5'>
      <div className=' w-full space-y-4'>
        <div className='p-6 border-2 border-custom-lightBlue rounded-[15px]'>
          <p className='text-black text-2xl font-bold	MerriweatherSans'>{`${moment(new Date()).format('DD-MMM-YYYY')} , ${moment(new Date()).format('dddd')}`}</p>
          <h2 className='text-black text-4xl font-bold	MerriweatherSans'>Hello <span className='text-custom-lightBlue'>Demomail</span></h2>
        </div>
        <div className=' grid md:grid-cols-3 gap-4 '>
          <div className='bg-custom-blue p-4 flex rounded-[14px] '>
            <div className='w-full'>
              <p className='text-custom-darkBlack text-2xl font-normal MicrosoftSansSerif'>Platform Performance</p>
              <p className='text-custom-darkBlack text-2xl font-normal MicrosoftSansSerif'>Total Users</p>
            </div>
            <div className='w-14 h-full flex justify-end items-start'>
              <BsGraphUp className='h-[35px] w-[35px] text-custom-darkBlack' />
            </div>
          </div>
          <div className='bg-custom-blue p-4 flex rounded-[14px]'>
            <div className='w-full'>
              <p className='text-custom-darkBlack text-2xl font-normal MicrosoftSansSerif'>Active users</p>
              <p className='text-custom-darkBlack text-2xl font-normal MicrosoftSansSerif'>60 Users</p>
            </div>
            <div className='w-14 h-full flex justify-end items-start'>
              <FaUser className='h-[35px] w-[35px] text-custom-darkBlack' />
            </div>
          </div>
          <div className='bg-custom-blue p-4 flex rounded-[14px]'>
            <div className='w-full'>
              <p className='text-custom-darkBlack text-2xl font-normal MicrosoftSansSerif'>Ongoing Transactions</p>
              <p className='text-custom-darkBlack text-2xl font-normal MicrosoftSansSerif'>60 Transactions</p>
            </div>
            <div className='w-14 h-full flex justify-end items-start'>
              <IoNewspaperOutline className='h-[35px] w-[35px] text-custom-darkBlack' />
            </div>
          </div>

          <div className='bg-custom-blue p-4 flex rounded-[14px]'>
            <p className='text-custom-darkBlack text-2xl font-normal MicrosoftSansSerif w-full text-center'>App Store user</p>
          </div>

          <div className='border-2 border-custom-blue p-4 flex rounded-[14px]'>
            <p className='text-custom-darkBlack text-2xl font-normal MicrosoftSansSerif w-full text-center'>Play Store user</p>
          </div>

        </div>
        <div>
          <div className='p-3 w-full bg-black rounded-md text-white text-2xl font-semibold'>
            <p>Graph</p>
          </div>
          <Line data={data} options={options} />
        </div>
      </div>
    </section>
  )
}

export default Index