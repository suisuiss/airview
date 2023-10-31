
import './noti.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const noti = ({ isSub , setIsSub}) => {

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
    fetch('http://localhost:4000/send', {
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

  // subscribe fx
  const subscribe = async () => {
    console.log('start sub f(x)')
    console.log('this current browser supports');
    console.log("Registering service worker...");
    
    // register sw
    await navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/service-worker.js`)
      .then((registration) => {
        console.log('(from noti.js)Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.warn('(from noti.js)Service Worker registration failed:', error);
      });
    
    // check status
    // const subscriptionSta = await navigator.serviceWorker.ready.then(function (serviceWorker) {
    //   return serviceWorker.pushManager.getSubscription();
    // });
    // console.log('status')
    // console.log(subscriptionSta)

    // check sw List
    // const swList = navigator.serviceWorker.getRegistrations()
    // console.log('list')
    // console.log(swList)

    // console.log("Registering service worker...");
    // const register = await navigator.serviceWorker.register("/sw.js", {
    // scope: "/"
    // });
    // console.log("Service Worker Registered...");

    // const sw = navigator.serviceWorker.register('/sw.js')
    // alert(sw)
    // const subscription = await navigator.serviceWorker.ready.then(function(serviceWorker) {
    // return serviceWorker.pushManager.getSubscription();
    // });

    // const register = await navigator.serviceWorker.register("/sw.js", {
    //   scope: "/"
    // });
    // console.log("Service Worker Registered...");
    // console.log(register);

    // const registration = await navigator.serviceWorker.ready;
    // const subscription = await registration.pushManager.subscribe({
    //   userVisibleOnly: true,
    //   applicationServerKey: publicKey
    // });
    // console.log('registered')
    // console.log("Sending Push...................");
    // const response = await fetch('http://localhost:4000/sub', {
    //   method: 'POST',
    //   body: JSON.stringify(subscription),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    // if (response.ok) {
    //   console.log('Request was successful.');
    // }
    // Optionally, you can also handle the server's response data here.
    // console.log('Subscription object:', subscription);
    setIsSub(true);
    console.log("Done sent!!!");
  };

  const unsub =()=>{
    setIsSub(false);
  }
  return (
    <div>
      <div className="noti">
        <span style={{ fontWeight: '600', fontSize: '2rem', letterSpacing: '0.7px' }}>Let us notify you </span><br />
        <span> <CheckCircleIcon style={{ color: "6599E8", fontSize: '30px' }} /> When There’s chance of raining </span>
        <span> <CheckCircleIcon style={{ color: "6599E8", fontSize: '30px' }} />  When AQI levels reach the unhealty level</span> <br />
        <button onClick={isSub? unsub : notify } className='noti-btn'> { isSub? <span> unsubcribed </span> : <span>  notify me </span> }</button>
      </div>
    </div>
  )
}

export default noti;