import QRCode from 'qrcode';
import { useEffect } from 'react';

const MyFriendCode = ({code}) => {
    
      useEffect(() => {
        const generateQR = async => {
            try {
                QRCode.toCanvas(`http://localhost:3000/login/qrcodelink/${code}`, { errorCorrectionLevel: 'H', width: 300 }, function (err, canv) {
                    if (err) throw err
                    document.getElementById('canvas-cont').appendChild(canv);
                  })
            } catch (err) {
              console.error(err)
            }
          };
          generateQR(code);
      }, [code]);


    return (<>
        <h5 className="my-1 my-md-3 text-center">
            <br/> <strong>{code}</strong>
        </h5>
        <div id='canvas-cont'></div>

        <div className='mt-2 mt-md-4'>
          <h5 className='text-center'>To link your account to a friend's, either:</h5>
          <ul className='d-flex flex-column align-items-start' style={{"listStyle": "square"}}>
            <li>Let your friend scan your QR code</li>
            <li>Send your text code to a friend via sms/email</li>
          </ul>
          <p className='text-center'><small>Code will refresh at login</small></p>
        </div>
    </>)
};

export { MyFriendCode };