import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

const MyFriendCode = ({code}) => {

    const [canvasContent, setCanvasContent] = useState(null);

    
      useEffect(() => {
        const generateQR = async text => {
            try {
                QRCode.toCanvas(`http://localhost:3000/qrcodelink/${code}`, { errorCorrectionLevel: 'H', width: 200 }, function (err, canv) {
                    if (err) throw err
                    document.getElementById('canvas-cont').appendChild(canv);
                  })
            } catch (err) {
              console.error(err)
            }
          };
          generateQR(code);

      }, []);


    return (<>
        <h5 className="my-4 text-center">
            My Temporary Friend code: <br/><br/> <strong>{code}</strong>
        </h5>
        <div id='canvas-cont'></div>
    </>)
};

export { MyFriendCode };