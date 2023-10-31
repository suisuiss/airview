
import './noti.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const noti =()=>{
   
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
    
    const notify =()=>{
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
     
    const sendNoti =()=>{
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
    const subscribe = async () => {
      if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js')
          .then((registration) => {
            console.warn('Service Worker registered with scope:', registration.scope);
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error);
          });
      };
      // const sw = navigator.serviceWorker.register('/sw.js')
      // alert(sw)
      // const subscription = await navigator.serviceWorker.ready.then(function(serviceWorker) {
      // return serviceWorker.pushManager.getSubscription();
        
      // });
          const registration = await navigator.serviceWorker.ready;
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: publicKey
          });
          console.log('registered')
          console.log("Sending Push...................");
          const response = await fetch('http://localhost:4000/sub', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            // The HTTP request was successful, and the server responded with a status code in the 200 range.
            console.log('Request was successful.'); }
            // Optionally, you can also handle the server's response data here.
          console.log('Subscription object:', subscription);
          console.log("Done sent!!!");    
          };
    return(
        <div >
        <div className="noti"> 
            <span style={{ fontWeight:'600', fontSize:'2rem' , letterSpacing:'0.7px'}}>Let us notify you </span><br/>
            <span> <CheckCircleIcon style={{ color:"6599E8",fontSize:'30px'}}/> When There’s chance of raining </span>
            <span> <CheckCircleIcon style={{ color:"6599E8",fontSize:'30px'}}/>  When AQI levels reach the unhealty level</span> <br/>
            <button onClick={notify} className='noti-btn'><span>  notify me </span> </button>
        </div>
        </div>
    )
}

export default noti;