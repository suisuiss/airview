
import './noti.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const noti = ({ isSub, setIsSub }) => {

  const publicKey = 'BCS5nEpceVPUCj2GyPSEL0rOmhi4dfE_dYxTOY3pIm_C_o3NdE4_zLk7_7aAooWKCgEes9oAWmlTUcwb_t6Kfvo'
  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  const serverUrl = 'http://localhost:4000';
  let swUrl = '${process.env.PUBLIC_URL}/sw.js'
  const notify = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          new Notification('Airview', {
            body: 'Thank you for subscibing',
            icon: 'path/to/your/icon.png', // You can specify an icon
          });
          subscribe();
        } else if (permission === 'denied') {
          alert('You have blocked notifications. To enable notifications, go to your browser settings.');
        }
      });
    }
  }

  const sendNoti = () => {
    console.log('sending noti');
    fetch(`${serverUrl}/send`, {
      method: 'GET',
    })
      .then((response) => {
        if (response.ok) {
          console.log('Notification sent successfully');
        } else {
          console.error('Failed to send notification');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    console.log('noti-sent')
  }

  // subscribe
  const subscribe = async () => {
    // register sw
    if ('serviceWorker' in navigator) {
      console.log('browser support')
      try {
        await navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/service-worker.js`)
          .then((registration) => {
            console.log('(from noti.js)Service Worker registered with scope:', registration.scope);
          })
          .catch((error) => {
            console.warn('(from noti.js)Service Worker registration failed:', error);
          });
        //sending payload to server
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: publicKey,
        });
        console.log(subscription)
        const response = await fetch(`${serverUrl}/subscribe`, {
          method: 'POST',
          body: JSON.stringify(subscription),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          console.log('Request was successful.');
        }
        setIsSub(true);
        console.log('%c subscription saved', 'color:white;background :brown')
      } catch (e) {
        console.error('[subscribe]', e)
      }
    } else {
      console.log('browser does not support')
    }
  };

  //subscribe2
  const subscribe2 = async () =>{
    // setIsSub(true);
    // console.log('start subscribe function')
    // console.log('this current browser supports');
    // console.log("Registering service worker...");
    // // register sw
    // await navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/service-worker.js`)
    //   .then((registration) => {
    //     console.log('(from noti.js)Service Worker registered with scope:', registration.scope);
    //   })
    //   .catch((error) => {
    //     console.warn('(from noti.js)Service Worker registration failed:', error);
    //   });
    // //sending payload to server  
    // const registration = await navigator.serviceWorker.ready;
    // const subscription = await registration.pushManager.subscribe({
    //   userVisibleOnly: true,
    //   applicationServerKey: publicKey,
    // });
    // const response = await fetch('http://localhost:4000/subscribe', {
    //   method: 'POST',
    //   body: JSON.stringify(subscription),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    // if (response.ok) {
    //   console.log('Request was successful.');}
   
  }

  const unsub = async () => {
    console.log('unsubscribing...');
    try {
      const registration = await navigator.serviceWorker.ready;
      if (registration) {
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: publicKey,
        });
        const response = await fetch(`${serverUrl}/unsubscribe`, {
          method: 'POST',
          body: JSON.stringify(subscription),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        //remove service worker
        await navigator.serviceWorker.getRegistrations().then(function (registrations) {
          for (let registration of registrations) {
            registration.unregister();
          }
        });
        if (response.ok) {
          console.log('Request was successful.');
        }
        setIsSub(false);
        console.log('%c unsubscribed', 'background-color:green;color:white');



      } else {
        console.log('sw is not registered')
      }


    } catch (e) {
      console.error('[unsub] ', e)
    }
  }
  return (
    <div>
      <div className="noti">
        <span style={{ fontWeight: '600', fontSize: '2rem', letterSpacing: '0.7px' }}>Let us notify you </span><br />
        <span> <CheckCircleIcon style={{ color: "6599E8", fontSize: '30px' }} /> When There’s chance of raining </span>
        <span> <CheckCircleIcon style={{ color: "6599E8", fontSize: '30px' }} />  When AQI levels reach the unhealty level</span> <br />
        <button onClick={isSub ? unsub : notify} className='noti-btn'> {isSub ? <span> unsubcribe </span> : <span>  notify me </span>}</button>
      </div>
    </div>
  )
}

export default noti;