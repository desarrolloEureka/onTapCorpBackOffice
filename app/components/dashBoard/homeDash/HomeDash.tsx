import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});
import * as eDashBoard from "@/data/dashBoard";
import WorldMap from "react-svg-worldmap";
import Link from "next/link";

const HomeDash = () => {
    // const data = [
    //     { country: "cn", value: 1389618778 }, // china
    //     { country: "in", value: 1311559204 }, // india
    //     { country: "us", value: 331883986 }, // united states
    //     { country: "id", value: 264935824 }, // indonesia
    //     { country: "pk", value: 210797836 }, // pakistan
    //     { country: "br", value: 210301591 }, // brazil
    //     { country: "ng", value: 208679114 }, // nigeria
    //     { country: "bd", value: 161062905 }, // bangladesh
    //     { country: "ru", value: 141944641 }, // russia
    //     { country: "mx", value: 127318112 }, // mexico
    // ];
    return (
        <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-max-h-screen tw-h-[1440px]">
            <h3 className="tw-text-7xl tw-text-[#5696d3] text-center">
                {/* Mensaje de bienvenida */}
                Bienvenidos a
            </h3>
            <h3 className="tw-text-7xl tw-text-[#5696d3] text-center">
                {/* Mensaje de bienvenida */}
                One Tap Corp BackOffice
            </h3>
        </div>
        // <>
        //   <Row className='row-sm'>
        //     <div className='col-xxl-6 col-xl-12 col-md-12 col-lg-12'>
        //       <div className='card custom-card'>
        //         <div className='card-header border-bottom-0 pb-4'>
        //           <label className='main-content-label mb-2 pt-1'>
        //             Country Wise Sales
        //           </label>
        //           <p className='fs-12 mb-0 text-muted'>
        //             The global ecommerce sales in 2020 is expected to reach $4.453
        //             trillion this marks an increase of <b>22.5 %</b> percent from
        //             the previous year as the global ecommerce market.
        //           </p>
        //         </div>
        //         <div className='card-body'>
        //           <div className='row'>
        //             <div className='col-xl-8'>
        //               <div
        //                 id='users-map'
        //                 className='jvm-container d-flex justify-content-center'
        //                 style={{ backgroundColor: 'transparent' }}
        //               >
        //                 <WorldMap
        //                   color='#6259ca'
        //                   value-suffix='people'
        //                   size='md'
        //                   data={data}
        //                 />
        //               </div>
        //             </div>
        //             <div className='col-xl-4 col-md-12'>
        //               <div className='mb-3 pt-2'>
        //                 <h5 className='mb-2 d-block'>
        //                   <span className='fs-14'>Brazil</span>
        //                   <span className='float-end fs-14'>80%</span>
        //                 </h5>
        //                 <div className='progress ht-4 progress-md h-2'>
        //                   <div className='progress-bar progress-bar-animated progress-bar-striped bg-primary ht-4 wd-10p'></div>
        //                 </div>
        //               </div>
        //               <div className='mb-3'>
        //                 <h5 className='mb-2 d-block'>
        //                   <span className='fs-14'>Russia</span>
        //                   <span className='float-end fs-14'>72%</span>
        //                 </h5>
        //                 <div className='progress ht-4 progress-md'>
        //                   <div className='progress-bar progress-bar-animated progress-bar-striped bg-primary ht-4 wd-70p'></div>
        //                 </div>
        //               </div>
        //               <div className='mb-3'>
        //                 <h5 className='mb-2 d-block'>
        //                   <span className='fs-14'>Palestine</span>
        //                   <span className='float-end fs-14'>67%</span>
        //                 </h5>
        //                 <div className='progress progress-md  ht-4'>
        //                   <div className='progress-bar progress-bar-animated progress-bar-striped bg-primary ht-4 wd-60p'></div>
        //                 </div>
        //               </div>
        //               <div className='mb-3'>
        //                 <h5 className='mb-2 d-block'>
        //                   <span className='fs-14'>Canada</span>
        //                   <span className='float-end fs-14'>53%</span>
        //                 </h5>
        //                 <div className='progress progress-md  ht-4'>
        //                   <div className='progress-bar progress-bar-animated progress-bar-striped bg-primary ht-4 wd-50p'></div>
        //                 </div>
        //               </div>
        //               <div className='mb-3'>
        //                 <h5 className='mb-2 d-block'>
        //                   <span className='fs-14'>Greenland</span>
        //                   <span className='float-end fs-14'>75%</span>
        //                 </h5>
        //                 <div className='progress progress-md  ht-4'>
        //                   <div className='progress-bar progress-bar-animated  progress-bar-striped bg-primary ht-4 wd-40p'></div>
        //                 </div>
        //               </div>
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </Row>

        // </>
    );
};

export default HomeDash;
