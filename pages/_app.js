import '@/styles/globals.css'
// import 'styles/tailwind.css'
import { useEffect, useState, createContext } from "react";
import Loader from "../src/components/loader";
import Toaster from "../src/components/toaster";
import Layout from '@/src/components/layouts';
import { useRouter } from 'next/router';

export const userContext = createContext();

export default function App({ Component, pageProps }) {
  // return <Component {...pageProps} />
  const [user, setUser] = useState({});
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState({
    type: "",
    message: "",
  });



  useEffect(() => {
    setToast(toast);
    if (!!toast.message) {
      setTimeout(() => {
        setToast({ type: "", message: "" });
      }, 5000);
    }
  }, [toast]);

  useEffect(() => {
    //console.log(localStorage.getItem('TravelUser'))
    let data = (localStorage.getItem('TravelUser'))
    if (data) {
      setUser(JSON.parse(data))
      // console.log(JSON.parse(data))
    } else {
      router.push('/login')
    }
  }, [])

  return (
    <userContext.Provider value={[user, setUser]}>
      <Loader open={open} />
      {/* <Html lang="en">
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Nunito:wght@200;300;400;500;600;700;800;900;1000&display=swap"
            rel="stylesheet"
          ></link> */}
      <div className="fixed right-5 top-20 min-w-max z-50">
        {!!toast.message && (
          <Toaster type={toast.type} message={toast.message} />
        )}
      </div>
      <Layout loader={setOpen} toaster={setToast}>
        <Loader open={open} />
        <div className="fixed right-5 top-20 min-w-max">
          {!!toast.message && (
            <Toaster type={toast.type} message={toast.message} />
          )}
        </div>
        <Component
          {...pageProps}
          loader={setOpen}
          toaster={setToast}
          user={user}
        />
      </Layout>
    </userContext.Provider>
  );
}
