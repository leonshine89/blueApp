import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";
const apiSecret = process.env.NEXT_PUBLIC_API_SECRET || "";

export const pinJSONToIPFS = async (json: { [key: string]: any }) => {
    const data = JSON.stringify(json);
    const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

    return axios
        .post(url, data, {
            headers: {
                "Content-Type": "application/json",
                pinata_api_key: apiKey,
                pinata_secret_api_key: apiSecret,
            },
        })
        .then((response) => response.data.IpfsHash)
        .catch((error) => {
            throw error;
        });
};

export const parseURL = (url: string) => {
    if (!url) return "";
    const str = url.substring(0, 4);

    if (str === "http") {
        return url;
    } else {
        return `https://cyberconnect.mypinata.cloud/ipfs/${url}`;
    }
};

export const fetchFile = (Hash: string) => {
const ipfsHash = Hash;

const pinataUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
const headers = {
  'Content-Type': 'application/json',
  'pinata_api_key': apiKey,
  'pinata_secret_api_key': apiSecret
};

fetch(pinataUrl, { headers })
  .then(response => response.blob())
  .then(blob => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const fileData = fileReader.result;
      // Handle the file data here
    };
    fileReader.readAsArrayBuffer(blob);
    console.log(fileReader.readAsArrayBuffer(blob));
    
  })
  .catch(error => {
    console.error(error);
  });

}
export const getEssenceSVGData = () => {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" data-name="Layer 1" width="350" height="350" viewBox="0 0 1132.29792 790.67423"><title>viral tweet</title><path d="M325.73833,839.44712c-156.34852.72061-283.60636,3.82871-283.60636,3.82871S192.97608,550.44366,324.90825,659.33678,608.32006,840.66629,608.32006,840.66629,482.08685,838.72652,325.73833,839.44712Z" transform="translate(-33.85104 -54.66289)" fill="#e6e6e6"/><path d="M684.71689,798.39774c-207.78883.95772-376.92071,4.02781-376.92071,4.02781S508.836,536.12777,683.96291,634.78922s376.30318,164.16814,376.30318,164.16814S892.50572,797.44,684.71689,798.39774Z" transform="translate(-33.85104 -54.66289)" fill="#e6e6e6"/><path d="M317.46062,842.25C161.1122,842.97062,33.851,845.33711,33.851,845.33711S185.09109,638.42565,316.87471,715.11323s283.164,127.61428,283.164,127.61428S473.809,841.52938,317.46062,842.25Z" transform="translate(-33.85104 -54.66289)" fill="#f2f2f2"/><path d="M271.46316,410.38082v-5.56057a4.45,4.45,0,0,1,6.01527-4.16837c18.30032,6.85628,77.20433,24.072,160.82338.80352a8.73075,8.73075,0,0,1,11.09422,8.39271h0a8.201,8.201,0,0,1-4.97118,7.55057c-18.26048,7.78617-84.93559,31.128-168.46162-.5286A6.94974,6.94974,0,0,1,271.46316,410.38082Z" transform="translate(-33.85104 -54.66289)" fill="#3f3d56"/><path d="M271.46316,410.38082v-5.56057a4.45,4.45,0,0,1,6.01527-4.16837c18.30032,6.85628,77.20433,24.072,160.82338.80352a8.73075,8.73075,0,0,1,11.09422,8.39271h0a8.201,8.201,0,0,1-4.97118,7.55057c-18.26048,7.78617-84.93559,31.128-168.46162-.5286A6.94974,6.94974,0,0,1,271.46316,410.38082Z" transform="translate(-33.85104 -54.66289)" opacity="0.2"/><path d="M271.46316,400.93141v9.0691a3.20312,3.20312,0,0,0,4.37291,2.98616c16.57571-6.49178,79.17776-26.41464,168.9877.45048a3.55967,3.55967,0,0,0,4.57226-3.41481v-6.52559a8.72117,8.72117,0,0,0-5.32879-8.03766c-18.885-7.98478-86.004-31.07926-169.77172,1.319A4.4532,4.4532,0,0,0,271.46316,400.93141Z" transform="translate(-33.85104 -54.66289)" fill="#3f3d56"/><path d="M207.68507,595.39521c7.50077,7.3017,8.41694,18.52611,8.41694,18.52611s-11.245-.614-18.74576-7.91568-8.41694-18.52611-8.41694-18.52611S200.1843,588.09351,207.68507,595.39521Z" transform="translate(-33.85104 -54.66289)" fill="#EB5757"/><path d="M498.41584,588.255c-7.85338,6.921-19.115,6.977-19.115,6.977s1.47125-11.16522,9.32462-18.08626,19.115-6.977,19.115-6.977S506.26922,581.334,498.41584,588.255Z" transform="translate(-33.85104 -54.66289)" fill="#EB5757"/><path d="M548.41584,708.255c-7.85338,6.921-19.115,6.977-19.115,6.977s1.47125-11.16522,9.32462-18.08626,19.115-6.977,19.115-6.977S556.26922,701.334,548.41584,708.255Z" transform="translate(-33.85104 -54.66289)" fill="#EB5757"/><path d="M636.41584,713.255c-7.85338,6.921-19.115,6.977-19.115,6.977s1.47125-11.16522,9.32462-18.08626,19.115-6.977,19.115-6.977S644.26922,706.334,636.41584,713.255Z" transform="translate(-33.85104 -54.66289)" fill="#EB5757"/><path d="M142.17833,707.30688c-9.34053-4.72555-13.5702-15.16282-13.5702-15.16282s10.91433-2.77564,20.25486,1.94991,13.5702,15.16282,13.5702,15.16282S151.51886,712.03243,142.17833,707.30688Z" transform="translate(-33.85104 -54.66289)" fill="#EB5757"/><path d="M631.08063,122.54313a175.55084,175.55084,0,0,1-51.06942,8.18309,87.13763,87.13763,0,0,0,43.23886-43.60366,172.54158,172.54158,0,0,1-57.13413,14.91434A86.80809,86.80809,0,0,0,410.29119,144.615a85.01239,85.01239,0,0,0,.05973,19.94768A246.08325,246.08325,0,0,1,242.34843,54.66289a87.00617,87.00617,0,0,0,14.13416,118.31523,84.81135,84.81135,0,0,1-38.03874-15.10572l-.11777,1.06977a86.90974,86.90974,0,0,0,59.9461,92.31922,87.40933,87.40933,0,0,1-23.06713.52838,81.9167,81.9167,0,0,1-16.04873-3.391,86.97175,86.97175,0,0,0,74.07606,68.88071A174.09755,174.09755,0,0,1,201.911,342.46991a176.01845,176.01845,0,0,1-20.45644-3.51528,241.97329,241.97329,0,0,0,81.39459,43.89966c22.38606-19.73534,72.74434-29.86751,129.60332-23.60783a289.44394,289.44394,0,0,1,53.21038,10.8225C525.01957,331.00715,573.6741,250.57863,582.1345,173.72958c.41222-3.74434.73525-7.49844.95942-11.17329A176.76365,176.76365,0,0,0,631.08063,122.54313Z" transform="translate(-33.85104 -54.66289)" fill="#1da1f3"/><rect x="136.0697" y="553.25471" width="296.54059" height="2.00019" transform="translate(-325.68554 736.38418) rotate(-85.18293)" fill="#2f2e41"/><rect x="444.8036" y="403.85157" width="2.00003" height="300.80647" transform="translate(-129.6346 38.48175) rotate(-10.778)" fill="#2f2e41"/><rect x="180.99259" y="564.73818" width="272.67528" height="2.00006" transform="translate(-292.19133 810.0095) rotate(-88.15329)" fill="#2f2e41"/><rect x="406.62108" y="429.94965" width="1.99984" height="272.44577" transform="translate(-75.52709 -22.19287) rotate(-4.33998)" fill="#2f2e41"/><ellipse cx="339.07856" cy="647.34192" rx="107" ry="18" fill="#2f2e41"/><path d="M414.8872,752.3409l-7.33752,14.95727s-13.264-1.69328-7.902,15.8039c0,0-1.41106,13.264-4.23318,16.08612s2.2577,21.44816,12.41735,16.08612c5.7148-3.01615,6.072-6.47877,5.29066-8.93125a22.12923,22.12923,0,0,1-.68633-11.34444,51.64152,51.64152,0,0,1,6.11975-16.12974c6.49089-10.44186,12.69956-20.60152,12.69956-20.60152Z" transform="translate(-33.85104 -54.66289)" fill="#ffb8b8"/><path d="M396.54339,660.3396s-16.08612-3.951-21.44816-1.12886-21.166,3.10434-21.166,3.10434-13.264,21.44816-10.15965,32.45445,16.08612,17.77939,16.08612,17.77939l43.743.28222,7.05532-28.78569s-3.38656-19.75488-6.20868-20.88373S396.54339,660.3396,396.54339,660.3396Z" transform="translate(-33.85104 -54.66289)" fill="#3f3d56"/><circle cx="348.29951" cy="507.18451" r="23.98807" fill="#2f2e41"/><path d="M367.19328,582.44892s2.82212,11.85293-1.41107,13.264-7.90195,7.05532-7.90195,7.05532l6.20868,10.44186,21.16594,5.362,6.49089-6.20868,4.79762-13.264-4.79762-3.38655s-4.5154,1.41106-4.79761-3.10434a75.25315,75.25315,0,0,1,.28221-10.15965Z" transform="translate(-33.85104 -54.66289)" fill="#ffb8b8"/><path d="M367.19328,582.44892s2.82212,11.85293-1.41107,13.264-7.90195,7.05532-7.90195,7.05532l6.20868,10.44186,21.16594,5.362,6.49089-6.20868,4.79762-13.264-4.79762-3.38655s-4.5154,1.41106-4.79761-3.10434a75.25315,75.25315,0,0,1,.28221-10.15965Z" transform="translate(-33.85104 -54.66289)" opacity="0.1"/><circle cx="344.20742" cy="518.33191" r="17.21497" fill="#ffb8b8"/><path d="M377.07072,612.36345l-16.36833-14.95726s-7.33753,6.20867-8.18417,6.20867-11.85293,3.38656-12.13514,4.79762,9.59523,16.36833,9.59523,16.36833-2.2577,11.00629,0,15.8039.56442,25.39914.56442,25.39914,14.95727-5.362,22.85922-2.82213,31.04339,0,31.04339,0,3.38655-21.73037,1.97549-24.55249-1.69328-18.90825-1.69328-18.90825l12.13514-13.264s-2.53991-10.15965-12.13514-10.72408-15.52169-1.12885-15.52169-1.12885Z" transform="translate(-33.85104 -54.66289)" fill="#EB5757"/><path d="M357.88026,681.78775s-31.60781-14.39284-44.30738-21.16594-32.17223-1.41107-25.96355,13.82841S328.53015,704.647,328.53015,704.647s11.2885,8.46638,18.06161,8.18417,16.50943-.14111,16.50943-.14111Z" transform="translate(-33.85104 -54.66289)" fill="#3f3d56"/><path d="M406.703,683.76324s56.72473.56443,53.056,21.73037-25.39914,56.44252-29.35011,57.28916-18.34382-5.362-18.34382-7.33753,13.82842-38.38091,13.82842-38.38091L392.028,706.62246Z" transform="translate(-33.85104 -54.66289)" fill="#3f3d56"/><path d="M417.42712,620.54762s3.38655,32.45445,1.69327,37.53427-7.61974,18.90825-15.23948,25.68135-18.34382,40.92083-24.27028,24.5525,9.59523-25.39914,9.59523-25.39914l15.559-21.89047.14616-35.625Z" transform="translate(-33.85104 -54.66289)" fill="#ffb8b8"/><path d="M353.92928,688.56085s27.93905,9.87745,31.04339,8.46638,9.87744,3.66877,9.87744,3.66877a24.328,24.328,0,0,1,18.34382,3.38655c9.0308,5.92646,11.00629,12.69956,9.0308,12.98178s-9.0308-2.82213-9.0308-2.82213-10.72408-2.2577-17.215-.28221-14.95046-2.18935-14.95046-2.18935l-34.43674-7.68809Z" transform="translate(-33.85104 -54.66289)" fill="#ffb8b8"/><path d="M353.92928,688.56085s27.93905,9.87745,31.04339,8.46638,9.87744,3.66877,9.87744,3.66877a24.328,24.328,0,0,1,18.34382,3.38655c9.0308,5.92646,11.00629,12.69956,9.0308,12.98178s-9.0308-2.82213-9.0308-2.82213-10.72408-2.2577-17.215-.28221-14.95046-2.18935-14.95046-2.18935l-34.43674-7.68809Z" transform="translate(-33.85104 -54.66289)" opacity="0.1"/><path d="M410.93623,603.05044l5.92646,3.38655s2.2577,14.95727,3.38655,16.93276-13.82841,7.05531-16.08611,5.64425-3.38656-15.23948-3.38656-15.23948Z" transform="translate(-33.85104 -54.66289)" fill="#EB5757"/><path d="M315.68994,665.98385s17.215,7.33752,22.01258,8.46637,20.30358,14.33809,20.30358,14.33809l-10.58436,16.07255s-10.84807-1.34274-16.77453-2.47159-41.203-24.55249-35.27657-28.50347S315.68994,665.98385,315.68994,665.98385Z" transform="translate(-33.85104 -54.66289)" opacity="0.1"/><path d="M312.16182,665.98385s17.215,7.33752,22.01258,8.46637,23.70586,14.11063,23.70586,14.11063l-9.313,18.06161s-15.5217-3.10434-21.44816-4.23319-41.203-24.55249-35.27658-28.50347S312.16182,665.98385,312.16182,665.98385Z" transform="translate(-33.85104 -54.66289)" fill="#3f3d56"/><circle cx="352.95601" cy="490.95729" r="23.98807" fill="#2f2e41"/><circle cx="359.72912" cy="466.96922" r="11.2885" fill="#2f2e41"/><rect x="349.07856" y="590.42525" width="14" height="26.83333" rx="1.57874" fill="#2f2e41"/><circle cx="356.07856" cy="596.25859" r="2.33333" fill="#EB5757"/><path d="M340.38308,632.68276s.28221,34.99436,4.5154,39.22755,31.03111,2.0945,31.03111,2.0945,16.91748,2.73847,24-7c8-11-21-2-21-2s-20.71672,1.03951-21.896.1324c-3.66876-2.82213-4.5154-33.86551-4.5154-33.86551Z" transform="translate(-33.85104 -54.66289)" fill="#ffb8b8"/><path d="M344.05184,608.13027h-3.66876s-3.951,4.23318-3.66876,13.264-3.38655,14.675-1.12885,15.52169,13.519-3.63476,13.39152-2.3818,5.79893-1.00475,5.79893-1.00475l-3.951-14.95727Z" transform="translate(-33.85104 -54.66289)" fill="#EB5757"/><path d="M637.8467,440.03425c-46.27673.2133-83.94415.897-83.94415.897s44.77365-59.30728,83.77623-37.33435,83.80662,36.56194,83.80662,36.56194S684.12343,439.821,637.8467,440.03425Z" transform="translate(-33.85104 -54.66289)" fill="#f2f2f2"/><path d="M256.8467,527.03425c-46.27673.2133-83.94415.897-83.94415.897s44.77365-59.30728,83.77623-37.33435,83.80662,36.56194,83.80662,36.56194S303.12343,526.821,256.8467,527.03425Z" transform="translate(-33.85104 -54.66289)" fill="#f2f2f2"/><path d="M837.8467,586.03425c-46.27673.2133-83.94415.897-83.94415.897s44.77365-59.30728,83.77623-37.33435,83.80662,36.56194,83.80662,36.56194S884.12343,585.821,837.8467,586.03425Z" transform="translate(-33.85104 -54.66289)" fill="#f2f2f2"/><path d="M638.43974,840.66905c-156.34852.72062-283.61,3.03068-283.61,3.03068S506.1,643.32675,637.87242,717.56353,921.0178,841.09012,921.0178,841.09012,794.78827,839.94842,638.43974,840.66905Z" transform="translate(-33.85104 -54.66289)" fill="#f2f2f2"/><path d="M883.5705,838.91789c-156.34782.72061-283.60711,3.391-283.60711,3.391S751.04058,600.1884,882.88454,690.07334s283.26442,149.626,283.26442,149.626S1039.91833,838.19728,883.5705,838.91789Z" transform="translate(-33.85104 -54.66289)" fill="#f2f2f2"/></svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
};

export const timeout = async (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

// export const fetchQuery =async (params:object) => {
//   let query
//   try {
    
//   } catch (error) {
    
//   }
// }
