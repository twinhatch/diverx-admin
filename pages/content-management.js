import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import { Api } from '@/utils/service';
import { useRouter } from 'next/router';
import moment from 'moment'
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
import { IoIosAdd } from "react-icons/io";
import FAQ from '@/src/components/Faq';


function ContentManagement(props) {
  const [terms, setTerms] = useState({
    termsAndConditions: ''
  })
  const [privacyPolicy, setPrivacyPolicy] = useState({
    privacy: ''
  })
  const router = useRouter();
  const [tab, setTab] = useState('CONTENT')

  useEffect(() => {
    getContent()
    getPrivacyPolicy()
  }, [])

  const getPrivacyPolicy = () => {
    props.loader(true);
    Api("get", "/api/privacy", router).then(
      (res) => {
        console.log("res================>", res.data);
        props.loader(false);

        if (res?.status && res?.data.length > 0) {
          setPrivacyPolicy(res?.data[0])
        }
        // else {
        //   console.log(res?.data?.message);
        //   props.toaster({ type: "error", message: res?.data?.message });
        // }
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.data?.message });
        props.toaster({ type: "error", message: err?.message });
      }
    );

  }

  const privacyPolicyUpdate = () => {
    props.loader(true);
    Api("post", "/api/privacy", { privacy: privacyPolicy.privacy, id: privacyPolicy._id }, router).then(
      (res) => {
        console.log("res================>", res.data);
        // incident
        console.log(res.data.content)
        props.loader(false);
        if (res?.status) {
          // console.log(res.data)
          props.toaster({ type: "success", message: res?.data?.message })
        } else {
          console.log(res?.data?.message);
          props.toaster({ type: "error", message: res?.data?.message });
        }
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.data?.message });
        props.toaster({ type: "error", message: err?.message });
      }
    );
  }



  const getContent = () => {
    props.loader(true);
    Api("get", "/api/content", router).then(
      (res) => {
        console.log("res================>", res.data.incident);
        props.loader(false);

        if (res?.status) {
          setTerms({ termsAndConditions: res?.data[0]?.termsAndConditions, id: res?.data[0]?._id })
        } else {
          console.log(res?.data?.message);
          props.toaster({ type: "error", message: res?.data?.message });
        }
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.data?.message });
        props.toaster({ type: "error", message: err?.message });
      }
    );
  };
  console.log(terms)
  const termsSubmit = () => {
    props.loader(true);
    Api("post", "/api/content", { termsAndConditions: terms.termsAndConditions, id: terms.id }, router).then(
      (res) => {
        console.log("res================>", res.data.incident);
        props.loader(false);
        if (res?.status) {
          // console.log(res.data)
          props.toaster({ type: "success", message: res?.data?.message })

        } else {
          console.log(res?.data?.message);
          props.toaster({ type: "error", message: res?.data?.message });
        }
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.data?.message });
        props.toaster({ type: "error", message: err?.message });
      }
    );
  }

  return (
    <div className="w-full mx-auto p-5">

      <div className='md:p-6 p-3 border-2 border-custom-blue rounded-2xl flex flex-col md:flex-row items-end justify-between gap-2 md:gap-0'>
        <div className='w-full text-center md:text-left'>
          <p className='text-black text-2xl font-bold	MerriweatherSans'>{`${moment(new Date()).format('DD-MMM-YYYY')} , ${moment(new Date()).format('dddd')}`}</p>
          <h2 className='text-black text-4xl font-bold MerriweatherSans'>Hello <span className='text-custom-lightBlue'>Demomail.</span></h2>
        </div>

        <div className='flex flex-col md:flex-row md:gap-4 gap-2 text-center'>
          <div className={` py-2 px-6 rounded-md  w-40 cursor-pointer ${tab === 'FAQ' ? 'bg-custom-blue text-white' : 'bg-white border-2 text-custom-blue border-custom-blue'}`}
            onClick={() => {
              setTab('FAQ');
            }}>
            <p> FAQ</p>
          </div>
          <div className={` py-2 px-6 rounded-md  w-60 cursor-pointer ${tab === 'CONTENT' ? 'bg-custom-blue text-white' : 'bg-white border-2 text-custom-blue border-custom-blue'}`}
            onClick={() => setTab('CONTENT')}>
            <p>Content Management</p>
          </div>
        </div>

        {/* <div className='relative' onClick={() => router.push('/add-news')}>
          <button className='w-[143px] h-[44px] rounded-[5px] bg-custom-lightBlue text-white text-base font-normal MicrosoftSansSerif'>Add News</button>
          <IoIosAdd className='h-[24px] w-[24px] text-white absolute top-[10px] right-[5px]' />
        </div> */}
      </div>

      {tab === 'CONTENT' && <div>
        <div className="md:grid grid-cols-2 bg-[#E9E9E9] md:px-5 p-4 rounded-xl border-t-8 border-custom-blue">
          <div className='md:mb-0 mb-3'>
            <p className="text-[28px] text-custom-black font-bold">
              Terms and Condition
            </p>
          </div>
          {/* <div className="flex justify-end items-center">
      <button className='text-white md:text-base text-xs	font-normal bg-custom-blue rounded border-[3px] border-custom-blue p-3'>Replay on Playstore</button>
      <select className='text-custom-darkBlack md:text-base text-xs	font-normal bg-[#E9E9E9] rounded border-[3px] border-custom-blue p-3 ml-5'><option>Sort by Date</option></select>
      </div> */}
        </div>
        {/* <div className="rounded border-[3px] border-custom-blue md:px-5 px-3">
        <Table columns={columns} data={GetInTouchData} />
      </div> */}

        <section className='pb-4 relative'>
          <div className='w-[99%] mx-auto md:w-full bg-white h-full border-[3px] border-custom-blue rounded-lg p-3 md:p-8 flex flex-col overflow-auto space-y-4'>

            <div className='w-full  text-sm md:text-md rounded-2xl  space-y-4 border-t-[10px] border-custom-blue'>
              <JoditEditor
                className="editor max-h-screen overflow-auto"
                rows={8}
                value={terms?.termsAndConditions}
                onChange={newContent => {
                  setTerms({
                    ...terms,
                    termsAndConditions: newContent,
                  });
                }}
              />
              {/* <textarea name="" id="" rows="15" className="w-full h-full bg-transparent outline-none"></textarea> */}
            </div>
            <div className="flex gap-10 items-center justify-center md:justify-start">
              <button className="text-lg text-white font-semibold  bg-custom-blue rounded-lg md:py-2 py-1 px-2 md:px-8" onClick={termsSubmit}>Update</button>
            </div>
          </div>
        </section>

        <div>
          <div className="md:grid grid-cols-2 bg-[#E9E9E9] md:px-5 p-4 rounded-xl border-t-8 border-custom-blue">
            <div className='md:mb-0 mb-3'>
              <p className="text-[28px] text-custom-black font-bold">
                Privacy Policy
              </p>
            </div>
          </div>

          <section className='pb-4 relative'>
            <div className='w-[99%] mx-auto md:w-full bg-white h-full border-[3px] border-custom-blue rounded-lg p-3 md:p-8 flex flex-col overflow-auto space-y-4'>
              <div className='w-full  text-sm md:text-md rounded-2xl  space-y-4 border-t-[10px] border-custom-blue'>
                <JoditEditor
                  className="editor max-h-screen overflow-auto"
                  rows={8}
                  value={privacyPolicy.privacy}
                  onChange={newContent => {
                    setPrivacyPolicy({
                      ...privacyPolicy,
                      privacy: newContent
                    });
                  }}
                />
              </div>
              <div className="flex gap-10 items-center justify-center md:justify-start">
                <button className="text-lg text-white font-semibold  bg-custom-blue rounded-lg md:py-2 py-1 px-2 md:px-8" onClick={privacyPolicyUpdate}>Update</button>
              </div>
            </div>
          </section>
        </div>
      </div>}

      {
        tab === 'FAQ' &&
        <div>
          <div className="md:grid grid-cols-2 bg-[#E9E9E9] md:px-5 p-4 rounded-xl border-t-8 mt-5 border-custom-blue">
            <div className='md:mb-0 mb-3'>
              <p className="text-custom-darkBlac font-bold md:text-3xl text-lg">
                FAQ
              </p>
            </div>
          </div>
          <FAQ props={props} />
        </div>
      }

    </div>
  );
}

export default ContentManagement