import QRCode from 'qrcode';
import { useEffect } from 'react';

const MyFriendCode = ({code}) => {
    
      useEffect(() => {
        const generateQR = async => {
            try {
                QRCode.toCanvas(`http://localhost:3000/qrcodelink/${code}`, { errorCorrectionLevel: 'H', width: 300 }, function (err, canv) {
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
        <h5 className="my-4 text-center">
            My Temporary Friend code: <br/><br/> <strong>{code}</strong>
        </h5>
        <div id='canvas-cont'></div>
    </>)
};

export { MyFriendCode };