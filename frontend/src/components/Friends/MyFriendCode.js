import QRCode from 'qrcode';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";

const MyFriendCode = ({code}) => {

    const [codeValue, setCodeValue] = useState(null);
    const [firstLoad, setFirstLoad] = useState(true);
    
      useEffect(() => {
        generateQR();
      }, []);

      const generateQR = async => {
        if (firstLoad) {
          setCodeValue(code);
          setFirstLoad(false);
        }
        try {
            QRCode.toCanvas(`http://192.168.0.121:3000/login/qrcodelink/${codeValue}`, { errorCorrectionLevel: 'H', width: 300 }, function (err, canv) {
                if (err) throw err
                let cont = document.getElementById('canvas-cont');
                if(cont.hasChildNodes()) {
                    const children = cont.childNodes;
                    cont.removeChild(children[0])
                }
                document.getElementById('canvas-cont').appendChild(canv);
              })
        } catch (err) {
          console.error(err)
        }
      };

      const handleRefreshButton = async () => {
        try {
          const response = await axios.get(`/friendship/refreshcode`);
          setCodeValue(response.data);
          generateQR();
          toast.success(`Friendship code updated`);
        } catch (error) {
          toast.error(error.response.data);
          console.log(error)
      }
    }



    return (<>
        <h5 className="my-1 my-md-3 text-center">
            <br/> <strong>{codeValue}</strong>
        </h5>
        <div id='canvas-cont'></div>

        <div className='mt-2 mt-md-4 d-flex flex-column align-items-center'>
          <h5 className='text-center'>To link your account to a friend's, either:</h5>
          <ul className='d-flex flex-column align-items-start' style={{"listStyle": "square"}}>
            <li>Let your friend scan your QR code</li>
            <li>Send your text code to a friend via sms/email</li>
          </ul>
          <p className='text-center'><small>Code will refresh at login or refresh below</small></p>
          <button className='btn btn-sm btn-secondary mb-3' onClick={handleRefreshButton}>Refresh code</button>
        </div>
    </>)
};

export { MyFriendCode };